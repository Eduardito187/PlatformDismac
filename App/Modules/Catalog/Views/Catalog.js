import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { GET_TOKEN_SESSION, CREATE_BODY_SEARCH_ACCOUN, URL_API, GET_HEADER_TOKEN } from '../../../Helpers/API';

/** Components */
import SearchBox from '../../../Components/Button/SearchBox';
import SearchInit from '../../Account/Helper/SearchInit';
import Searching from '../../Account/Helper/Searching';
import MessageBox from '../../../Components/MessageBox';
import ListView from '../../Account/Helper/ListView';

const Catalog = (props) => {
    const [TOKEN, SetTOKEN] = React.useState("");
    const [Message, SetMessage] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [search, Setsearch] = React.useState("");
    const [searching, Setsearching] = React.useState(false);
    const [style, Setstyle] = React.useState(props.style);
    const [data, Setdata] = React.useState(props.data);
    const [accounts, Setaccounts] = React.useState([]);
    React.useEffect(() => {
        setSocket();
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

    async function setSocket(){
        SetTOKEN(await GET_TOKEN_SESSION());
    }

    function sendQuery(text){
        if (text.length > 0) {
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10,paddingBottom: 20,paddingLeft: 5, paddingRight: 5}}>
            <View style={{backgroundColor: Page.background, padding: 10,borderRadius: 5}}>
                <SearchBox Label={"Catalogos"} ChangeText={(text) => searchAccount(text)} /> 
            </View>
            {searching == false && search.length == 0 && (<SearchInit />)}
            {searching == true && (<Searching />)}
            {searching == false && search.length > 0 && (<ListView Account={accounts} />)}
            <MessageBox ShowMessage={ShowMessage} CloseMessage={() => HideAlertMessage()} Title={"Dismac"} Text={Message} />
        </ScrollView>
    );
};

export default Catalog;