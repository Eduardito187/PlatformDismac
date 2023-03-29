import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { CREATE_BODY_SEARCH_ACCOUN, URL_API, URL_API_SHOW, GET_HEADER_TOKEN } from '../../../Helpers/API';

/** Components */
import Searching from '../../Account/Helper/Searching';
import ResultNone from '../../Account/Helper/ResultNone';

const ShowCatalog = ({route, navigation }) => {
    const [TOKEN, SetTOKEN] = React.useState(route.params.TOKEN);
    const [Catalog, SetCatalog] = React.useState(route.params.Catalog);
    const [CatalogAPI, SetCatalogAPI] = React.useState([]);
    const [Message, SetMessage] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Status, SetStatus] = React.useState(false);
    React.useEffect(() => {
        navigation.setOptions({
            title: Catalog.name
        });
        getCatalog();
    }, []);

    function thenSearch(response, responseText){
        if (response === false) {
            SetMessage(responseText);
            SetShowMessage(true);
        }else{
            SetCatalogAPI(response);
        }
    }

    function getCatalog(){
        axios.get(URL_API_SHOW("partner/inventory/catalog", Catalog.id),GET_HEADER_TOKEN(TOKEN)).then(res => {
            console.log(res);
            if(res.data != null){
                thenSearch(res.data.response, res.data.responseText);
            }else{
                thenSearch(false, "Algo salio mal.");
            }
            SetStatus(true);
        }).catch(err => {
            thenSearch(false, err);
        });
    }

    if (Status === true) {
        if (ShowMessage === true) {
            return(
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <ResultNone />
                </View>
            );
        }else{
            return (
                <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10,paddingBottom: 20,paddingLeft: 5, paddingRight: 5}}>
                    <Text>{CatalogAPI.id}</Text>
                </ScrollView>
            );
        }
    }else{
        return(
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <ActivityIndicator size="large" color="#EC2427" />
            </View>
        );
    }
};

export default ShowCatalog;