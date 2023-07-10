import React, {useState} from 'react';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { SCROLL_STYLE, Padding_10_B_5, SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY } from '../../../Themes/Dismac/ThemeDismac';
import { AlingFormItem, Centered, RowForm, TitleSub, Top_15_Red, Width_Max } from '../../Login/Style/style';
import { TextInput, Button } from 'react-native-paper';
import { windowWidth, windowHeight } from '../../../Helpers/GetMobil';
import { GET_HEADER_TOKEN, URL_API, URL_API_POS, URL_API_SHOW } from '../../../Helpers/API';
import axios from 'axios';
import MultiSelect from 'react-native-multiple-select';

/** Components */
import Subtitle from '../../../Components/Subtitle';
import { StatusBar } from 'expo-status-bar';
import { RED_DIS } from '../../Login/Style/css';
import Header from '../../Home/Views/Components/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
/** */

const EditAccount = ({route, navigation }) => {
    const {id_account,TOKEN} = route.params;
    const [heightBar, SetHeightBar] = React.useState(getStatusBarHeight());
    const [Name, SetName] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Message, SetSetMessage] = React.useState("");
    const [Account, SetAccount] = React.useState(null);
    const [LOADING, SETLOADING] = React.useState(false);
    const [Enable, SetEnable] = React.useState(false);
    const [Rols, SetRols] = React.useState([]);
    const [Roles, SetRoles] = React.useState([]);

    React.useEffect(() => {
        getAllRol();
        getAccount();
    }, []);

    function getAllRol(){
        axios.get(URL_API("allrol"),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SetRols(res.data.response);
            }
        }).catch(err => {
            //
        });
    }

    function getAccount() {
        axios.get(URL_API_SHOW("account", id_account),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SetAccount(res.data.response);
                SetName(res.data.response.name);
                SetEnable(true);
            }
        }).catch(err => {
            //
        });
    }
    
    function updateAccount() {
        let query = {
            "account" : {
                "name" : Name
            },
            "rol" : Roles
        };
        SETLOADING(true);
        axios.patch(URL_API_POS("account/edit/", id_account),query,GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data.response) {
                backAccount(true);
            }
        }).catch(err => {
            //
        });
    }

    function ShowAlertMessage(text) {
        SetSetMessage(text);
        SetShowMessage(true);
        SETLOADING(false);
    }

    function backAccount(a) {
        if (a){
            route.params.onGoBack(true);
        }
        navigation.goBack();
    }

    if (Enable == false) {
        return (<LoadingPage />);
    }else{
        return (
            <View style={[{marginTop: heightBar}]}>
                <View style={SCREEN_RELATIVE}>
                    <View style={SCREEN_ABSOLUTE_HEADER}>
                        <Header DrawerAction={() => backAccount(false)} />
                    </View>
                    <View style={SCREEN_ABSOLUTE_BODY}>
                        <SafeAreaView style={[Width_Max]}>
                            <View style={[{width: windowWidth}]}>
                                <View style={Padding_10_B_5}>
                                    <View style={AlingFormItem}>
                                        <View style={RowForm}>
                                            <Subtitle style={TitleSub} text={"Roles."} />
                                        </View>
                                        <SafeAreaView style={RowForm}>
                                            <MultiSelect
                                                hideTags
                                                items={Rols}
                                                uniqueKey="id"
                                                onSelectedItemsChange={SetRoles}
                                                selectedItems={Roles}
                                                selectText="Seleccione los roles"
                                                searchInputPlaceholderText="Busqueda de roles"
                                                tagRemoveIconColor="#CCC"
                                                tagBorderColor="#CCC"
                                                tagTextColor="#CCC"
                                                selectedItemTextColor={RED_DIS}
                                                selectedItemIconColor={RED_DIS}
                                                itemTextColor="#000"
                                                displayKey="name"
                                                searchInputStyle={{ color: RED_DIS }}
                                                submitButtonColor={RED_DIS}
                                                submitButtonText="Seleccionar roles"
                                            />
                                        </SafeAreaView>
                                    </View>
                                </View>
                                <View style={Padding_10_B_5}>
                                    <View style={AlingFormItem}>
                                        <View style={RowForm}>
                                            <Subtitle style={TitleSub} text={"Nombre."} />
                                        </View>
                                        <View style={RowForm}>
                                            <TextInput mode='outlined' placeholder="Nombre" selectionColor="rgba(0, 0, 0, 0.5)" 
                                            underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="black" activeOutlineColor="#EC2427"
                                            value={Name} onChangeText={text => SetName(text)} label={Name.length+"/50"} maxLength={50} />
                                        </View>
                                    </View>
                                </View>
                                <View style={Centered}>
                                    <Button icon="account" disabled={Name.length > 10 ? false : true} loading={LOADING} mode="contained" style={Top_15_Red} onPress={() => updateAccount()}>
                                        Editar cuenta
                                    </Button>
                                </View>
                            </View>
                        </SafeAreaView>
                    </View>
                    <StatusBar backgroundColor={RED_DIS} style="light" />
                </View>
            </View>
        );
    }
};

export default EditAccount;