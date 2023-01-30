import React, {useState} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { PageLoading, Page } from '../../../Themes/Dismac/ThemeDismac';
import { AlingFormItem, RowForm, TitleSub } from '../../Login/Style/style';
import { TextInput, Button } from 'react-native-paper';
import { windowWidth, windowHeight } from '../../../Helpers/GetMobil';
import { CREATE_BODY_NEW_ACCOUNT, GET_HEADER_ACCOUNT, URL_API } from '../../../Helpers/API';
import axios from 'axios';

/** Components */
import Subtitle from '../../../Components/Subtitle';
import MessageBox from '../../../Components/MessageBox';
/** */

const AddAccount = ({route, navigation }) => {
    const [Name, SetName] = React.useState("");
    const [Email, SetEmail] = React.useState("");
    const [UserName, SetUserName] = React.useState("");
    const [Password, SetPassword] = React.useState("");
    const [Password_, SetPassword_] = React.useState("");
    const [Disable, SetDisable] = React.useState(true);
    const [pwdP, setpwdP] = React.useState(0);
    const [iconPWD, setIconPWD] = React.useState("eye");
    const [pwdPV, setpwdPV] = React.useState(0);
    const [iconPWDV, setIconPWDV] = React.useState("eye");
    const [LOADING, SETLOADING] = React.useState(false);
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Message, SetSetMessage] = React.useState("");
    React.useEffect(() => {
        //
    }, []);
    function changeEmailInput(text) {
        SetDisable(!text.includes("@"));
        SetEmail(text);
    }
    async function registerAccount() {
        if (Name.length > 0 && Email.length > 0 && UserName.length > 0) {
            SETLOADING(true);
            axios.post(URL_API("register/account"),CREATE_BODY_NEW_ACCOUNT(Name, Email, UserName, Password),await GET_HEADER_ACCOUNT()).then(res => {
                if (res.data != null) {
                    ShowAlertMessage(res.data.responseText);
                }
            }).catch(err => {
                ShowAlertMessage(err);
            });
        }else{
            SETLOADING(false);
        }
    }
    function ShowAlertMessage(text) {
        SetSetMessage(text);
        SetShowMessage(true);
        SETLOADING(false);
    }
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingLeft: 5, paddingRight: 5}}>
                <View style={{width: windowWidth, height: windowHeight}}>
                    <View style={{backgroundColor: Page.background, padding: 10,borderRadius: 5,marginBottom: 5}}>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Nombre."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Nombre" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Name} onChangeText={text => SetName(text)} label={Name.length+"/50"} maxLength={50} />
                            </View>
                        </View>
                    </View>
                    <View style={{backgroundColor: Page.background, padding: 10,borderRadius: 5,marginBottom: 5}}>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Correo electronico."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Correo electronico" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Email} onChangeText={text => changeEmailInput(text)} label={Email.length+"/50"} maxLength={50} />
                            </View>
                        </View>
                    </View>
                    <View style={{backgroundColor: Page.background, padding: 10,borderRadius: 5,marginBottom: 5}}>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Username."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Username" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={UserName} onChangeText={text => SetUserName(text)} label={UserName.length+"/20"} maxLength={20} />
                            </View>
                        </View>
                    </View>
                    <View style={{backgroundColor: Page.background, padding: 10,borderRadius: 5,marginBottom: 5}}>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Contraseña."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput secureTextEntry={iconPWD == "eye" ? true : false} right={<TextInput.Icon icon={iconPWD} onPress={ iconPWD == "eye" ? () => setIconPWD("eye-off") : () => setIconPWD("eye")} />} mode='outlined' placeholder="Ingrese su contraseña" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Password} onChangeText={text => SetPassword(text)} onFocus={() => setpwdP(2)} onBlur={() => setpwdP(0)} />
                            </View>
                        </View>
                    </View>
                    <View style={{backgroundColor: Page.background, padding: 10,borderRadius: 5,marginBottom: 5}}>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Verificar contraseña."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput secureTextEntry={iconPWDV == "eye" ? true : false} right={<TextInput.Icon icon={iconPWDV} onPress={ iconPWDV == "eye" ? () => setIconPWDV("eye-off") : () => setIconPWDV("eye")} />} mode='outlined' placeholder="Ingrese su contraseña" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Password_} onChangeText={text => SetPassword_(text)} onFocus={() => setpwdPV(2)} onBlur={() => setpwdPV(0)} />
                            </View>
                        </View>
                    </View>
                    {
                        !Disable && (
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <Button icon="account" disabled={Password == Password_ && Password.length > 8 ? false : true} loading={LOADING} mode="contained" style={{backgroundColor: "#EC2427",marginTop: 15}} onPress={() => registerAccount()}>
                                    Registrar cuenta
                                </Button>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
            <MessageBox ShowMessage={ShowMessage} CloseMessage={() => SetShowMessage(false)} Title={"Dismac"} Text={Message} />
        </View>
    );
};

export default AddAccount;