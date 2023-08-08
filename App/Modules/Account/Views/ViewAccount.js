import React, {useState} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { SCROLL_STYLE, Padding_10_B_5, SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY } from '../../../Themes/Dismac/ThemeDismac';
import { AlingFormItem, Centered, RowForm, SubTitleText, TitleSub, Top_15_Red, Width_Max } from '../../Login/Style/style';
import { TextInput, Button, IconButton, Chip } from 'react-native-paper';
import { windowWidth, windowHeight } from '../../../Helpers/GetMobil';
import { CREATE_BODY_NEW_ACCOUNT, GET_HEADER_TOKEN, URL_API, URL_API_POS, URL_API_SHOW, existPermission, generateCustomId } from '../../../Helpers/API';
import axios from 'axios';

/** Components */
import Subtitle from '../../../Components/Subtitle';
import { StatusBar } from 'expo-status-bar';
import { Margin_5, RED_DIS } from '../../Login/Style/css';
import Header from '../../Home/Views/Components/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Navigation } from '../../../Helpers/Nav';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { alingContentStatus, displayFlex } from '../../Catalog/Style/Two';
import ResetPassword from './Components/ResetPassword';
import TwoSwitch from '../../Catalog/Views/Components/TwoSwitch';
import PartnerLink from '../../Product/Views/Components/PartnerLink';
/** */

const ViewAccount = ({route, navigation }) => {
    const widthView = windowWidth-30;
    const {id_account,TOKEN,roles} = route.params;
    const [heightBar, SetHeightBar] = React.useState(getStatusBarHeight());
    const [Account, SetAccount] = React.useState(null);
    const [LOADING, SETLOADING] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [Status, SetStatus] = React.useState(false);
    const [BackAction, SetBackAction] = React.useState(false);

    React.useEffect(() => {
        getAccount();
    }, []);

    function showModal() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    function getAccount() {
        axios.get(URL_API_SHOW("account", id_account),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SetAccount(res.data.response);
                SetStatus(res.data.response.status);
                SETLOADING(true);
            }
        }).catch(err => {
            //
        });
    }
    
    function editAccount(){
        Navigation("EditAccount",{"id_account":id_account,"TOKEN":TOKEN,"onGoBack": onGoBackAction}, navigation);
    }

    function onGoBackAction(a){
        if (a){
            SetBackAction(true);
            getAccount();
        }
    }

    function backAccount() {
        if (BackAction){
            route.params.onGoBack(true);
        }
        navigation.goBack();
    }

    function changeStatusAccount(a){
        SetStatus(a);
        let query = {
            "account" : {
                "status" : a
            }
        };
        axios.patch(URL_API_POS("account/changeStatus/", id_account),query,GET_HEADER_TOKEN(TOKEN));
        SetBackAction(true);
    }

    if (LOADING == false){
        return (<LoadingPage />);
    }else{
        return (
            <View style={[{marginTop: heightBar}]}>
                <View style={SCREEN_RELATIVE}>
                    <View style={SCREEN_ABSOLUTE_HEADER}>
                        <Header DrawerAction={() => backAccount()} right={(
                            <View style={[displayFlex]}>
                                {
                                    existPermission(roles, "cod_00002") && (<IconButton icon="pencil" iconColor={RED_DIS} size={24} onPress={() => editAccount()} />)
                                }
                                {
                                    existPermission(roles, "cod_00005") && (<IconButton icon="shield" iconColor={RED_DIS} size={24} onPress={() => showModal()} />)
                                }
                            </View>
                        )} />
                    </View>
                    <View style={SCREEN_ABSOLUTE_BODY}>
                        <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                            <View style={[{width: windowWidth, height: windowHeight}]}>
                                <View style={Padding_10_B_5}>
                                    <View style={AlingFormItem}>
                                        <View style={RowForm}>
                                            <Subtitle style={TitleSub} text={"Nombre."} />
                                        </View>
                                        <View style={RowForm}>
                                            <Subtitle style={SubTitleText} text={Account.name} />
                                        </View>
                                    </View>
                                </View>
                                <View style={Padding_10_B_5}>
                                    <View style={AlingFormItem}>
                                        <View style={RowForm}>
                                            <Subtitle style={TitleSub} text={"Email."} />
                                        </View>
                                        <View style={RowForm}>
                                            <Subtitle style={SubTitleText} text={Account.email} />
                                        </View>
                                    </View>
                                </View>
                                <View style={Padding_10_B_5}>
                                    <View style={AlingFormItem}>
                                        <View style={RowForm}>
                                            <Subtitle style={TitleSub} text={"Estado."} />
                                        </View>
                                        <View style={RowForm}>
                                            {
                                                existPermission(roles, "cod_00003")
                                                ? <TwoSwitch disabled={false} width={widthView} column1={widthView*0.75} column2={widthView*0.25} value={Status} label1={Status == true ? "Habilitado" : "Inhabilitado"} Action={(a) => changeStatusAccount(a)} />
                                                : <Subtitle style={SubTitleText} text={Status == true ? "Habilitado" : "Inhabilitado"} />
                                            }
                                        </View>
                                    </View>
                                </View>
                                <View style={Padding_10_B_5}>
                                    <View style={AlingFormItem}>
                                        <View style={RowForm}>
                                            <Subtitle style={TitleSub} text={"Roles."} />
                                        </View>
                                        <View style={RowForm}>
                                            <View style={[Width_Max, alingContentStatus]}>
                                                {
                                                    Account.rol_account.length > 0 && (
                                                        Account.rol_account.map((state) => {
                                                            return (
                                                                <Chip icon={"check"} key={generateCustomId()} style={Margin_5} onPress={() => console.log('Pressed')}>{state.name}</Chip>
                                                            )
                                                        })
                                                    )
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {
                                    Account.partner != null && (
                                        <View style={Padding_10_B_5}>
                                            <View style={AlingFormItem}>
                                                <View style={RowForm}>
                                                    <Subtitle style={TitleSub} text={"Partner."} />
                                                </View>
                                                <View style={RowForm}>
                                                    <View style={[Width_Max, alingContentStatus]}>
                                                        <PartnerLink Partner={Account.partner} TOKEN={TOKEN} Socket={null} show={true} />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }
                            </View>
                        </ScrollView>
                    </View>
                    <ResetPassword closeModal={() => closeModal()} isModalVisible={isModalVisible} TOKEN={TOKEN} id_account={id_account} />
                    <StatusBar backgroundColor={RED_DIS} style="light" />
                </View>
            </View>
        );
    }
};

export default ViewAccount;