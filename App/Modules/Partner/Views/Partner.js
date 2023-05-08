import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { GET_HEADER_TOKEN, GET_TOKEN_SESSION, URL_API } from '../../../Helpers/API';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

/** Components */
import ProfilePartner from './Components/ProfilePartner';
import SectionNumber from './Components/SectionNumber';
import { RED_DIS } from '../../Login/Style/css';
import axios from 'axios';
import { MT_10 } from '../Style/Style';
import { SCREEN_ABSOLUTE_BODY, SCREEN_ABSOLUTE_HEADER, SCREEN_RELATIVE, SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import Header from '../../Home/Views/Components/Header';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import LoadItem from '../../../Components/LoadItem';
import ModalQR from '../../Catalog/Views/Components/ModalQR';
import { IconButton } from 'react-native-paper';

const Partner = (props) => {
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [Load, SetLoad] = React.useState(false);
    const [Partner, SetPartner] = React.useState(null);
    const [isModalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        SetLoad(true);
        getInfoPartner();
    }, []);

    function showModal() {
        setModalVisible(true);
    }
    function closeModal() {
        setModalVisible(false);
    }

    function getInfoPartner(){
        axios.get(URL_API("partner"),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SetPartner(res.data.response);
            }
        }).catch(err => {});
    }

    if (Load !== true) {
        return (<LoadingPage />);
    }else{
        return (
            <View style={SCREEN_RELATIVE}>
                <View style={SCREEN_ABSOLUTE_HEADER}>
                    <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} right={(<IconButton icon={"qrcode"} onPress={() => showModal()} iconColor={RED_DIS} size={24} />)} />
                </View>
                <View style={SCREEN_ABSOLUTE_BODY}>
                    <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                        {
                            Partner != null
                            ? <ProfilePartner Partner={Partner} />
                            : <LoadItem />
                        }
                        <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countCampaignsPartner"} label={"Campañas"} icon={(<FontAwesome name={"calendar"} size={45} color={RED_DIS} />)} />
                        <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countSocialNetworkPartner"} label={"Redes sociales"} icon={(<FontAwesome name={"share-square"} size={45} color={RED_DIS} />)} />
                        <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countAccount"} label={"Cuentas"} icon={(<MaterialIcons name={"account-circle"} size={45} color={RED_DIS} />)} />
                        <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countProduct"} label={"Productos"} icon={(<FontAwesome name={"archive"} size={45} color={RED_DIS} />)} />
                        <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countWarehouse"} label={"Almacenes"} icon={(<FontAwesome name={"sitemap"} size={45} color={RED_DIS} />)} />
                        <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/countStorePartner"} label={"Tiendas"} icon={(<MaterialIcons name={"store"} size={45} color={RED_DIS} />)} />
                        <SectionNumber TOKEN={TOKEN} style={MT_10} api={"partner/valuePartner"} label={"Valor del inventario"} icon={(<Text style={{color: RED_DIS, fontSize: 34, fontWeight: "900", padding: 10}}>BOB</Text>)} />
                    </ScrollView>
                    <ModalQR closeModal={() => closeModal()} isModalVisible={isModalVisible} key={"partner"} type={"partner"} value={Partner != null ? Partner.id : 0} />
                </View>
            </View>
        );
    }
};

export default Partner;