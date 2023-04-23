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
import ListProduct from './Components/ListProduct';

const Product = (props) => {
    const [TOKEN, SetTOKEN] = React.useState("");
    const [Message, SetMessage] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [search, Setsearch] = React.useState("");
    const [searching, Setsearching] = React.useState(false);
    const [style, Setstyle] = React.useState(props.style);
    const [data, Setdata] = React.useState(props.data);
    const [products, SetProducts] = React.useState([]);
    React.useEffect(() => {
        setToken();
    }, []);

    
    function HideAlertMessage() {
        SetShowMessage(false);
        SetMessage("");
    }

    function searchProduct(text){
        Setsearch(text);
        Setsearching(text.length <= 4 ? false : true);
        sendQuery(text);
    }

    function thenSearch(response, responseText){
        if (response === false) {
            SetMessage(responseText);
            SetShowMessage(true);
        }else{
            Setsearching(false);
            SetProducts(response);
        }
    }

    function clearProducts(){
        Setsearching(false);
        SetProducts([]);
    }

    async function setToken(){
        SetTOKEN(await GET_TOKEN_SESSION());
    }

    function sendQuery(text){
        if (text.length >= 4) {
            axios.post(URL_API("searchProduct"),CREATE_BODY_SEARCH_ACCOUN(text),GET_HEADER_TOKEN(TOKEN)).then(res => {
                if(res.data != null){
                    thenSearch(res.data.response, res.data.responseText);
                }else{
                    thenSearch(false, "Algo salio mal.");
                }
            }).catch(err => {
                thenSearch(false, err);
            });
        }else{
            clearProducts();
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10,paddingBottom: 20,paddingLeft: 5, paddingRight: 5}}>
            <View style={{backgroundColor: Page.background, padding: 10,borderRadius: 5}}>
                <SearchBox Label={"Productos"} ChangeText={(text) => searchProduct(text)} /> 
            </View>
            {searching == false && search.length == 0 && (<SearchInit />)}
            {searching == true && (<Searching />)}
            {searching == false && search.length > 0 && (<ListProduct TOKEN={TOKEN} Product={products} />)}
            <MessageBox ShowMessage={ShowMessage} CloseMessage={() => HideAlertMessage()} Title={"Dismac"} Text={Message} />
        </ScrollView>
    );
};

export default Product;