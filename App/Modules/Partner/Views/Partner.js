import React from 'react';  
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { GET_HEADER_TOKEN, GET_TOKEN_SESSION, URL_API } from '../../../Helpers/API';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

/** Components */
import ProfilePartner from './Components/ProfilePartner';
import SectionNumber from './Components/SectionNumber';
import { Font_Bob, RED_DIS, WHITE } from '../../Login/Style/css';
import axios from 'axios';
import { MT_10 } from '../Style/Style';
import { SCREEN_ABSOLUTE_BODY, SCREEN_ABSOLUTE_HEADER, SCREEN_RELATIVE, SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import Header from '../../Home/Views/Components/Header';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import LoadItem from '../../../Components/LoadItem';
import ModalQR from '../../Catalog/Views/Components/ModalQR';
import { IconButton,Text } from 'react-native-paper';
import { column, contentOneSection, displayFlex } from '../../Catalog/Style/Two';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Partner = (props) => {
    const [Socket, SetSocket] = React.useState(props.socket);
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

    function navigateAction(url) {
        if (url != null){
            props.navigation.push(url, {"roles" : props.roles, "Socket" : Socket, "TOKEN" : TOKEN});
        }
    }

    if (Load !== true) {
        return (<LoadingPage />);
    }else{
        return (
            <View style={SCREEN_RELATIVE}>
                <View style={SCREEN_ABSOLUTE_HEADER}>
                    <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} right={(
                        <View style={[contentOneSection,displayFlex]}>
                            <View style={[contentOneSection,column]}>
                                <IconButton icon={"qrcode"} onPress={() => showModal()} iconColor={RED_DIS} size={24} />
                            </View>
                        </View>)} 
                    />
                </View>
                <View style={SCREEN_ABSOLUTE_BODY}>
                    <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                        {
                            Partner != null
                            ? <ProfilePartner TOKEN={TOKEN} Partner={Partner} Edit={true} Socket={Socket} />
                            : <LoadItem />
                        }
                        <TouchableOpacity style={{width: "100%", height: 150, borderRadius: 10, backgroundColor: RED_DIS, marginBottom: 0, marginTop: 10, position: "relative"}}>
                            <View style={{position: "absolute", zIndex: 10, left: 0, top: 0, bottom: 0, width: 90, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                                <MaterialCommunityIcons name="map" color={WHITE} size={70} />
                            </View>
                            <View style={{position: "absolute", zIndex: 10, right: 0, top: 0, bottom: 0, left: 90, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                                <Text variant="titleLarge" style={{fontWeight: "bold", color: WHITE, textAlign: "center"}}>Delimitaciones</Text>
                            </View>
                        </TouchableOpacity>
                        <SectionNumber Action={() => navigateAction("AllCampaigns")} TOKEN={TOKEN} style={MT_10} api={"partner/countCampaignsPartner"} label={"Campañas"} icon={(<FontAwesome name={"calendar"} size={45} color={RED_DIS} />)} />
                        <SectionNumber Action={() => navigateAction("AllSocials")} TOKEN={TOKEN} style={MT_10} api={"partner/countSocialNetworkPartner"} label={"Redes sociales"} icon={(<FontAwesome name={"share-square"} size={45} color={RED_DIS} />)} />
                        <SectionNumber Action={() => navigateAction(null)} TOKEN={TOKEN} style={MT_10} api={"partner/countAccount"} label={"Cuentas"} icon={(<MaterialIcons name={"account-circle"} size={45} color={RED_DIS} />)} />
                        <SectionNumber Action={() => navigateAction(null)} TOKEN={TOKEN} style={MT_10} api={"partner/countProduct"} label={"Productos"} icon={(<FontAwesome name={"archive"} size={45} color={RED_DIS} />)} />
                        <SectionNumber Action={() => navigateAction("AllWarehouses")} TOKEN={TOKEN} style={MT_10} api={"partner/countWarehouse"} label={"Almacenes"} icon={(<FontAwesome name={"sitemap"} size={45} color={RED_DIS} />)} />
                        <SectionNumber Action={() => navigateAction("AllSotres")} TOKEN={TOKEN} style={MT_10} api={"partner/countStorePartner"} label={"Tiendas"} icon={(<MaterialIcons name={"store"} size={45} color={RED_DIS} />)} />
                        <SectionNumber Action={() => navigateAction("AllStorePrices")} TOKEN={TOKEN} style={MT_10} api={"partner/valuePartner"} label={"Valor del inventario"} icon={(<Text style={Font_Bob}>BOB</Text>)} />
                    </ScrollView>
                    <ModalQR closeModal={() => closeModal()} isModalVisible={isModalVisible} key={"partner"} type={"partner"} value={Partner != null ? Partner.id : 0} />
                </View>
            </View>
        );
    }
};

export default Partner;