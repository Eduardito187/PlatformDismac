import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page, SCREEN_ABSOLUTE_BODY, SCREEN_ABSOLUTE_HEADER, SCREEN_RELATIVE, SCROLL_STYLE} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { CREATE_BODY_SEARCH_ACCOUN, URL_API, GET_HEADER_TOKEN } from '../../../Helpers/API';

/** Components */
import SearchBox from '../../../Components/Button/SearchBox';
import SearchInit from '../Helper/SearchInit';
import Searching from '../Helper/Searching';
import MessageBox from '../../../Components/MessageBox';
import ListView from '../Helper/ListView';
import Header from '../../Home/Views/Components/Header';

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
            axios.post(URL_API("search/account"),CREATE_BODY_SEARCH_ACCOUN(text),GET_HEADER_TOKEN(TOKEN)).then(res => {
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

    return (
        <View style={SCREEN_RELATIVE}>
            <View style={SCREEN_ABSOLUTE_HEADER}>
                <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} />
            </View>
            <View style={SCREEN_ABSOLUTE_BODY}>
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                    <View style={{backgroundColor: Page.background, padding: 10,borderRadius: 5}}>
                        <SearchBox Label={"Cuentas"} ChangeText={(text) => searchAccount(text)} /> 
                    </View>
                    {searching == false && search.length == 0 && (<SearchInit />)}
                    {searching == true && (<Searching />)}
                    {searching == false && search.length > 0 && (<ListView Account={accounts} />)}
                    <MessageBox ShowMessage={ShowMessage} CloseMessage={() => HideAlertMessage()} Title={"Dismac"} Text={Message} />
                </ScrollView>
            </View>
        </View>
    );
};

export default ListAccount;