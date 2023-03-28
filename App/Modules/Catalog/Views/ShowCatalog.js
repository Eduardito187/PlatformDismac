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
import ListCatalog from '../../Account/Helper/ListCatalog';

const ShowCatalog = ({route, navigation }) => {
    const [TOKEN, SetTOKEN] = React.useState("");
    const [Catalog, SetCatalog] = React.useState(route.params.Catalog);
    const [Message, SetMessage] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [searching, Setsearching] = React.useState(false);
    React.useEffect(() => {
        setToken();
        navigation.setOptions({
            title: Catalog.name
        });
    }, []);

    
    function HideAlertMessage() {
        SetShowMessage(false);
        SetMessage("");
    }

    function thenSearch(response, responseText){
        if (response === false) {
            SetMessage(responseText);
            SetShowMessage(true);
        }else{
            Setsearching(false);
        }
    }

    async function setToken(){
        SetTOKEN(await GET_TOKEN_SESSION());
    }

    function getCatalog(id_Catalog){
        axios.post(URL_API("search/inventory"),CREATE_BODY_SEARCH_ACCOUN(text),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                thenSearch(res.data.response, res.data.responseText);
            }else{
                thenSearch(false, "Algo salio mal.");
            }
        }).catch(err => {
            thenSearch(false, err);
        });
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10,paddingBottom: 20,paddingLeft: 5, paddingRight: 5}}>
        </ScrollView>
    );
};

export default ShowCatalog;