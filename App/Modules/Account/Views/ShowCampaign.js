import React, {useState} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Padding_10_B_5, SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY } from '../../../Themes/Dismac/ThemeDismac';
import { AlingFormItem, RowForm, SubTitleText, TitleSub, Width_Max } from '../../Login/Style/style';
import { windowWidth, windowHeight } from '../../../Helpers/GetMobil';

/** Components */
import Subtitle from '../../../Components/Subtitle';
import { StatusBar } from 'expo-status-bar';
import { RED_DIS, TEXT_HEADER } from '../../Login/Style/css';
import Header from '../../Home/Views/Components/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import PopUpLink from './Components/PopUpLink';
import IconSocial from '../../Home/Helper/IconSocial';
import { displayFlex } from '../../Catalog/Style/Two';
import TwoActionColumn from '../../Catalog/Views/Components/TwoActionColumn';
import { Navigation } from '../../../Helpers/Nav';
/** */

const ShowCampaign = ({route, navigation }) => {
    const widthView = windowWidth - 30;
    const {campaign,TOKEN,socket} = route.params;
    const [heightBar, SetHeightBar] = React.useState(getStatusBarHeight());
    const [LOADING, SETLOADING] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [LinkUrl, SetLinkUrl] = React.useState("");

    React.useEffect(() => {
        SETLOADING(true);
    }, []);

    function showModal(a) {
        SetLinkUrl(a);
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    function backAccount() {
        navigation.goBack();
    }

    function verProductos(ID_CATEGORY){
        Navigation("ProductCategory", {"SOCKET":socket,"TOKEN":TOKEN,"ID_CATEGORY":ID_CATEGORY}, navigation);
    }

    if (LOADING == false){
        return (<LoadingPage />);
    }else{
        return (
            <View style={[{marginTop: heightBar}]}>
                <View style={SCREEN_RELATIVE}>
                    <View style={SCREEN_ABSOLUTE_HEADER}>
                        <Header DrawerAction={() => backAccount()} center={(<Text style={[TEXT_HEADER]}>{campaign.name}</Text>)} />
                    </View>
                    <View style={SCREEN_ABSOLUTE_BODY}>
                        <View style={[{width: windowWidth, height: windowHeight}]}>
                            <View style={Padding_10_B_5}>
                                <View style={AlingFormItem}>
                                    <View style={RowForm}>
                                        <Subtitle style={TitleSub} text={"Link de campaña."} />
                                    </View>
                                    <TouchableOpacity onPress={() => showModal(campaign.url)} style={RowForm}>
                                        <Subtitle style={SubTitleText} text={campaign.url} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {
                                campaign.category != null && (
                                    <>
                                        <View style={Padding_10_B_5}>
                                            <View style={AlingFormItem}>
                                                <View style={RowForm}>
                                                    <Subtitle style={TitleSub} text={"Nombre de categoría."} />
                                                </View>
                                                <View style={RowForm}>
                                                    <Subtitle style={SubTitleText} text={campaign.category.name} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={Padding_10_B_5}>
                                            <View style={AlingFormItem}>
                                                <View style={RowForm}>
                                                    <Subtitle style={TitleSub} text={"Código de categoría."} />
                                                </View>
                                                <View style={RowForm}>
                                                    <Subtitle style={SubTitleText} text={campaign.category.code} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={Padding_10_B_5}>
                                            <View style={AlingFormItem}>
                                                <View style={RowForm}>
                                                    <TwoActionColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Productos.'} label2={'Ver mas'} Action={() => verProductos(campaign.category.id)} />    
                                                </View>
                                            </View>
                                        </View>
                                    </>
                                )
                            }
                            {
                                campaign.social.map((item, j) => {
                                    return (
                                        <View key={Math.random()+j+'_Campain_Social_'+Math.random()} style={Padding_10_B_5}>
                                            <View style={AlingFormItem}>
                                                <View style={RowForm}>
                                                    <Subtitle style={TitleSub} text={item.social.name+"."} />
                                                </View>
                                                <TouchableOpacity onPress={() => showModal(item.url)} style={RowForm}>
                                                    <View style={[Width_Max, displayFlex]}>
                                                        <IconSocial key={Math.random()+j+'_ICON_SOCIAL_'+Math.random()} icon={item.social.name} size={24} />
                                                        <Subtitle style={SubTitleText} text={item.url} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <PopUpLink closeModal={() => closeModal()} isModalVisible={isModalVisible} TOKEN={TOKEN} Link={LinkUrl} />
                    <StatusBar backgroundColor={RED_DIS} style="light" />
                </View>
            </View>
        );
    }
};

export default ShowCampaign;