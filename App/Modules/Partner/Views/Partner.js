import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { GET_HEADER_TOKEN, GET_TOKEN_SESSION, URL_API } from '../../../Helpers/API';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

/** Components */
import ProfilePartner from './Components/ProfilePartner';
import Valor from './Components/Valor';
import SectionNumber from './Components/SectionNumber';
import Social from './Components/Social';
import Campain from './Components/Campain';
import { RED_DIS } from '../../Login/Style/css';
import axios from 'axios';
import { MT_10 } from '../Style/Style';

const Partner = (props) => {
    const [TOKEN, SetTOKEN] = React.useState("");
    const [Load, SetLoad] = React.useState(false);
    const [Partner, SetPartner] = React.useState(null);
    React.useEffect(() => {
        setToken();
    }, []);

    async function setToken(){
        let token = await GET_TOKEN_SESSION();
        SetTOKEN(token);
        getInfoPartner(token);
    }

    function getInfoPartner(token){
        axios.get(URL_API("partner"),GET_HEADER_TOKEN(token)).then(res => {
            if(res.data != null){
                SetPartner(res.data.response);
                SetLoad(true);
            }else{
                SetLoad(null);
            }
        }).catch(err => {});
    }

    if (Load == null) {
        return (
            <>
                <Text>NO</Text>
            </>
        );
    }else if (Load === false) {
        return (
            <>
                <ActivityIndicator color={RED_DIS} size={"large"} />
            </>
        );
    }else{
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10,paddingLeft: 10, paddingRight: 10}}>
                <ProfilePartner Partner={Partner} />
                <Social TOKEN={TOKEN} style={{marginTop: 10}} />
                <Campain TOKEN={TOKEN} style={{marginTop: 10}} />
                <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countAccount"} label={"Cuentas"} icon={(<MaterialIcons name={"account-circle"} size={45} color={"#EC2427"} />)} />
                <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countProduct"} label={"Productos"} icon={(<FontAwesome name={"archive"} size={45} color={"#EC2427"} />)} />
                <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countWarehouse"} label={"Almacenes"} icon={(<FontAwesome name={"sitemap"} size={45} color={RED_DIS} />)} />
                <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countStorePartner"} label={"Tiendas"} icon={(<MaterialIcons name={"store"} size={45} color={"#EC2427"} />)} />
                <Valor TOKEN={TOKEN} style={{marginTop: 10, marginBottom: 20}} />
            </ScrollView>
        );
    }
};

export default Partner;