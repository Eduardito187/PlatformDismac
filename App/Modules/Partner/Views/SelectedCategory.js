import React, {useState} from 'react';
import { View, ScrollView } from 'react-native';
import { SCROLL_STYLE, Section_Content_Padding } from '../../../Themes/Dismac/ThemeDismac';
import { windowWidth } from '../../../Helpers/GetMobil';
import { CREATE_BODY_SEARCH_ACCOUNT, GET_HEADER_TOKEN, URL_API } from '../../../Helpers/API';
import axios from 'axios';

/** Components */
import { StatusBar } from 'expo-status-bar';
import { RED_DIS } from '../../Login/Style/css';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import SearchBox from '../../../Components/Button/SearchBox';
import SearchInit from '../../Account/Helper/SearchInit';
import Searching from '../../Account/Helper/Searching';
import ListCatalog from '../../Account/Helper/ListCatalog';
/** */

const SelectedCategory = ({route, navigation }) => {
    const { roles, Socket, TOKEN } = route.params;
    const widthView = windowWidth-20;
    const [LOADING, SETLOADING] = React.useState(false);
    const [search, Setsearch] = React.useState("");
    const [searching, Setsearching] = React.useState(false);
    const [categorys, SetCategory] = React.useState([]);

    React.useEffect(() => {
        SETLOADING(true);
    }, []);
    
    function HideAlertMessage() {
        SetMessage("");
    }

    function searchCatalog(text){
        Setsearch(text);
        Setsearching(text.length == 0 ? false : true);
        sendQuery(text);
    }

    function thenSearch(response, responseText){
        if (response === false) {
            SetMessage(responseText);
            SetCategory([]);
        }else{
            Setsearching(false);
            SetCategory(response);
        }
    }

    function sendQuery(text){
        if (text.length > 0) {
            axios.post(URL_API("search/category"),CREATE_BODY_SEARCH_ACCOUNT(text),GET_HEADER_TOKEN(TOKEN)).then(res => {
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

    if (LOADING == false){
        return (<LoadingPage />);
    }else{
        return (
            <View>
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                    <View style={Section_Content_Padding}>
                        <SearchBox Label={"Categorías"} ChangeText={(text) => searchCatalog(text)} /> 
                    </View>
                    {searching == false && search.length == 0 && (<SearchInit />)}
                    {searching == true && (<Searching />)}
                    {searching == false && search.length > 0 && (<ListCatalog route={route} navigation={navigation} TOKEN={TOKEN} Catalog={categorys} roles={roles} type={"SelectedCategory"} />)}
                </ScrollView>
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </View>
        );
    }
};

export default SelectedCategory;