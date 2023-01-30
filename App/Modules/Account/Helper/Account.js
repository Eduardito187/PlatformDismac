import React, {useState} from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { windowWidth } from '../../../Helpers/GetMobil';
import { IconButton } from 'react-native-paper';
import axios from 'axios';
import { URL_API,CREATE_BODY_STATUS_ACCOUNT,GET_HEADER_TOKEN,GET_TOKEN_SESSION } from '../../../Helpers/API';
/** */

const Account = (props) => {
    const [account, Setaccount] = React.useState(null); 
    const [TOKEN, SetTOKEN] = React.useState("");
    React.useEffect(() => {
        setSocket();
        setLoader(null);
    }, []);
    function setLoader(val = null) {
        setTimeout(() => {
            Setaccount(val == null ? props.Account : val);
        }, 500)
    }
    function setModal(bool, text) {
        SetMessage(text);
        SetShowMessage(bool);
    }
    async function setSocket(){
        SetTOKEN(await GET_TOKEN_SESSION());
    }
    async function changeStateAccount(bool) {
        axios.post(URL_API(bool ? "partner/account/disable" : "partner/account/enable"),CREATE_BODY_STATUS_ACCOUNT("email", account.email),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data.response != null) {
                confirmMessage(res.data.responseText, false);
                let accountVar = account;
                Setaccount(null);
                if (res.data.responseText == "Cuenta habilitada.") {
                    accountVar.account_status.status = true;
                }else{
                    accountVar.account_status.status = false;
                }
                setLoader(accountVar);
            }else{
                confirmMessage("Error interno.", false);
            }
        }).catch(err => {
            confirmMessage(err, false);
        });
    }
    function openModal() {
        let msg = "";
        if (account.account_status.status) {
            msg = "Deseas desactivar esta cuenta?";
        }else{
            msg = "Deseas activar esta cuenta?";
        }
        confirmMessage(msg, true);
    }
    function confirmMessage(msg, accept) {
        let content = [];
        if (accept) {
            content.push({text: "Confirmar",onPress: () => changeStateAccount(account.account_status.status)});
        }
        content.push({text: accept ? "Cancelar" : "OK",onPress: () => console.log("Cancelar"),style: 'cancel'});
        Alert.alert("Dismac", msg, content);
    }
    if (account == null) {
        return(<ActivityIndicator size="large" color="#EC2427" />);
    }else{
        return(
            <View key={account.id.toString()+"_account"} style={{width: windowWidth-10, borderRadius: 5, backgroundColor: "#FFFFFF", marginTop: 10, marginBottom: 5, padding: 10}}>
                <View style={{width: (windowWidth-10)}}>
                    <Text style={{fontWeight: "bold", fontSize: 14.5, color: "#808080"}}>{account.name}</Text>
                    <Text style={{fontWeight: "bold", fontSize: 14.5, color: "#808080"}}>{account.email}</Text>
                    <Text style={{fontWeight: "bold", fontSize: 14.5, color: account.account_status.status ? "green" : "red"}}>{account.account_status.status ? "Habilitada" : "Inhabilitada"}</Text>
                    {account.rol_account.length > 0 && (<Text style={{fontWeight: "bold", fontSize: 14.5, color: "green"}}>{account.rol_account.length} ROLES</Text>)}
                    {account.rol_account.length == 0 && (<Text style={{fontWeight: "bold", fontSize: 14.5, color: "red"}}>SIN ROLES</Text>)}
                </View>
                <View style={{position: "absolute",zIndex: 100,right: 10,top: 10}}>
                    <View style={{width: 50, height: 50}}>
                        <IconButton icon={"account"} iconColor={account.account_status.status ? "green" : "red"} onPress={() => openModal()} />
                    </View>
                </View>
            </View>
        );
    }
};
export default Account;