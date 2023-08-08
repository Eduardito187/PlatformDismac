import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page, SCREEN_ABSOLUTE_BODY, SCREEN_ABSOLUTE_HEADER, SCREEN_RELATIVE, SCROLL_STYLE, Section_Content_Padding} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { CREATE_BODY_SEARCH_ACCOUNT, URL_API, GET_HEADER_TOKEN, existPermission, generateCustomId } from '../../../Helpers/API';

/** Components */
import SearchBox from '../../../Components/Button/SearchBox';
import SearchInit from '../Helper/SearchInit';
import Searching from '../Helper/Searching';
import MessageBox from '../../../Components/MessageBox';
import ListView from '../Helper/ListView';
import Header from '../../Home/Views/Components/Header';
import { IconButton } from 'react-native-paper';
import { Navigation } from '../../../Helpers/Nav';
import { RED_DIS } from '../../Login/Style/css';

const ListAccount = (props) => {
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [Message, SetMessage] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [search, Setsearch] = React.useState("");
    const [searching, Setsearching] = React.useState(false);
    const [style, Setstyle] = React.useState(props.style);
    const [data, Setdata] = React.useState(props.data);
    const [accounts, Setaccounts] = React.useState([]);
    React.useEffect(() => {
        //
    }, []);

    
    function HideAlertMessage() {
        SetShowMessage(false);
        SetMessage("");
    }

    function searchAccount(text){
        Setsearch(text);
        Setsearching(text.length == 0 ? false : true);
        sendQuery(text);
    }

    function thenSearch(response, responseText){
        if (response === false) {
            SetMessage(responseText);
            SetShowMessage(true);
        }else{
            Setsearching(false);
            Setaccounts(response);
        }
    }

    function sendQuery(text){
        if (text.length > 0) {
            axios.post(URL_API("search/account"),CREATE_BODY_SEARCH_ACCOUNT(text),GET_HEADER_TOKEN(TOKEN)).then(res => {
                if(res.data != null){
                    thenSearch(res.data.response, res.data.responseText);
                }else{
                    thenSearch(false, "Algo salio mal.");
                }
            }).catch(err => {
                thenSearch(false, err);
            });
        }
    }

    function createAccount(){
        Navigation("AddAccount", {}, props.navigation);
    }

    function reloadAccounts() {
        sendQuery(search);
    }

    return (
        <View style={SCREEN_RELATIVE}>
            <View style={SCREEN_ABSOLUTE_HEADER}>
                <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} right={(existPermission(props.roles, "cod_00001") ? <IconButton icon="plus" iconColor={RED_DIS} size={24} onPress={() => createAccount()} /> : null)} />
            </View>
            <View style={SCREEN_ABSOLUTE_BODY}>
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                    <View style={Section_Content_Padding}>
                        <SearchBox Label={"Cuentas"} ChangeText={(text) => searchAccount(text)} /> 
                    </View>
                    {searching == false && search.length == 0 && (<SearchInit />)}
                    {searching == true && (<Searching />)}
                    {searching == false && search.length > 0 && (<ListView key={generateCustomId()} roles={props.roles} reloadAccounts={() => reloadAccounts()} TOKEN={TOKEN} navigation={props.navigation} Account={accounts} />)}
                    <MessageBox ShowMessage={ShowMessage} CloseMessage={() => HideAlertMessage()} Title={"Dismac"} Text={Message} />
                </ScrollView>
            </View>
        </View>
    );
};

export default ListAccount;