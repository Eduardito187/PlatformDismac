import React, {useState} from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { windowWidth } from '../../../Helpers/GetMobil';
import { IconButton, Card, Chip } from 'react-native-paper';
import axios from 'axios';
import { URL_API,CREATE_BODY_STATUS_ACCOUNT,GET_HEADER_TOKEN,GET_TOKEN_SESSION } from '../../../Helpers/API';
import { RED_DIS, GREEN_PRICE, Section_Card, Section_Card_Title, Margin_5 } from '../../Login/Style/css';
import LoadItem from '../../../Components/LoadItem';
import ModalQR from '../../Catalog/Views/Components/ModalQR';
import { Width_Max } from '../../Login/Style/style';
import { alingContentStatus } from '../../Catalog/Style/Two';
import { Navigation } from '../../../Helpers/Nav';
/** */

const Account = (props) => {
    const [account, Setaccount] = React.useState(null); 
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [isModalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        setLoader(null);
    }, []);

    function showModal() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    function setLoader(val = null) {
        setTimeout(() => {
            Setaccount(val == null ? props.Account : val);
        }, 500)
    }

    async function changeStateAccount(bool) {
        axios.post(URL_API(bool ? "partner/account/disable" : "partner/account/enable"),CREATE_BODY_STATUS_ACCOUNT("email", account.email),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data.response != null) {
                confirmMessage(res.data.responseText, false);
                let accountVar = account;
                Setaccount(null);
                if (res.data.responseText == "Cuenta habilitada.") {
                    accountVar.status = true;
                }else{
                    accountVar.status = false;
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
        if (account.status) {
            msg = "Deseas desactivar esta cuenta?";
        }else{
            msg = "Deseas activar esta cuenta?";
        }
        confirmMessage(msg, true);
    }
    function confirmMessage(msg, accept) {
        let content = [];
        if (accept) {
            content.push({text: "Confirmar",onPress: () => changeStateAccount(account.status)});
        }
        content.push({text: accept ? "Cancelar" : "OK",onPress: () => console.log("Cancelar"),style: 'cancel'});
        Alert.alert("Dismac", msg, content);
    }

    function selectAccount(){
        Navigation("ViewAccount", {"id_account":account.id,"TOKEN":TOKEN,"onGoBack": onGoBackAction}, props.navigation);
    }
    
    function onGoBackAction(a){
        if (a){
            props.reloadAccounts();
        }
    }

    if (account == null) {
        return(<LoadItem />);
    }else{
        return(
            <Card key={account.id.toString()+"_account"} style={[{window:windowWidth-10}, Section_Card]} onPress={() => selectAccount()}>
                <Card.Title title={account.name} subtitle={account.email} right={() => <Text style={[Section_Card_Title, {color: account.status ? "green" : "red"}]}>{account.status ? "Habilitada" : "Inhabilitada"}</Text>} />
                <Card.Content>
                    <View style={[Width_Max, alingContentStatus]}>
                        {
                            account.rol_account.length > 0 && (
                                account.rol_account.map((state) => {
                                    return (
                                        <Chip icon={"check"} key={Math.random()+'_Product_Status_'+Math.random()} style={Margin_5} onPress={() => console.log('Pressed')}>{state.name}</Chip>
                                    )
                                })
                            )
                        }
                        {account.rol_account.length == 0 && (<Chip icon="information" onPress={() => console.log('Pressed')}>SIN ROLES</Chip>)}
                    </View>
                </Card.Content>
                <Card.Actions>
                    <IconButton icon={"qrcode"} iconColor={RED_DIS} onPress={() => showModal()} />
                    <IconButton icon={"account"} iconColor={account.status ? GREEN_PRICE : RED_DIS} onPress={() => openModal()} />
                </Card.Actions>
                <ModalQR closeModal={() => closeModal()} isModalVisible={isModalVisible} key={"account"} type={"account"} value={account != null ? account.id : 0} />
            </Card>
        );
    }
};
export default Account;