import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { GET_HEADER_TOKEN, GET_TOKEN_SESSION, URL_API } from '../../../Helpers/API';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

/** Components */
import ProfilePartner from './Components/ProfilePartner';
import SectionNumber from './Components/SectionNumber';
import Campain from './Components/Campain';
import { RED_DIS } from '../../Login/Style/css';
import axios from 'axios';
import { MT_10 } from '../Style/Style';
import { SCREEN_ABSOLUTE_BODY, SCREEN_ABSOLUTE_HEADER, SCREEN_RELATIVE, SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import Header from '../../Home/Views/Components/Header';
import LoadingPage from '../../Home/Views/Components/LoadingPage';

const Partner = (props) => {
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [Load, SetLoad] = React.useState(false);
    const [Partner, SetPartner] = React.useState(null);
    React.useEffect(() => {
        getInfoPartner();
    }, []);

    function getInfoPartner(){
        axios.get(URL_API("partner"),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SetPartner(res.data.response);
                SetLoad(true);
            }else{
                SetLoad(null);
            }
        }).catch(err => {});
    }

    if (Load !== true) {
        return (<LoadingPage />);
    }else{
        return (
            <View style={SCREEN_RELATIVE}>
                <View style={SCREEN_ABSOLUTE_HEADER}>
                    <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} />
                </View>
                <View style={SCREEN_ABSOLUTE_BODY}>
                    <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                        <ProfilePartner Partner={Partner} />
                        <Campain TOKEN={TOKEN} style={{marginTop: 10}} />
                        <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countSocialNetworkPartner"} label={"Redes socialestas"} icon={(<FontAwesome name={"share-square"} size={45} color={"#EC2427"} />)} />
                        <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countAccount"} label={"Cuentas"} icon={(<MaterialIcons name={"account-circle"} size={45} color={"#EC2427"} />)} />
                        <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countProduct"} label={"Productos"} icon={(<FontAwesome name={"archive"} size={45} color={"#EC2427"} />)} />
                        <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countWarehouse"} label={"Almacenes"} icon={(<FontAwesome name={"sitemap"} size={45} color={RED_DIS} />)} />
                        <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countStorePartner"} label={"Tiendas"} icon={(<MaterialIcons name={"store"} size={45} color={"#EC2427"} />)} />
                        <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/valuePartner"} label={"Valor del inventario"} icon={(<Text style={{color: "#EC2427", fontSize: 34, fontWeight: "900", padding: 10}}>BOB</Text>)} />
                    </ScrollView>
                </View>
            </View>
        );
    }
};

export default Partner;