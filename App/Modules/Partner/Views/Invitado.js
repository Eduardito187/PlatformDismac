import React from 'react';  
import { View, ScrollView } from 'react-native';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import axios from 'axios';

/** Components */
import { RED_DIS, Section_Content_Custom, Section_Content_Flex } from '../../Login/Style/css';
import { StatusBar } from 'expo-status-bar';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { IconButton } from 'react-native-paper';
import { CREATE_BODY_SEARCH_ACCOUNT, DELETE_TOKEN_INVITADO, GET_HEADER_TOKEN, GET_TOKEN, GET_VIEW_PRODUCTS, URL_API } from '../../../Helpers/API';
import { ResetNavigation } from '../../../Helpers/Nav';
import PopUpQr from './Components/PopUpQr';
import SearchInit from '../../Account/Helper/SearchInit';
import Searching from '../../Account/Helper/Searching';
import ListProduct from '../../Catalog/Views/Components/ListProduct';
import SearchBox from '../../../Components/Button/SearchBox';
import { Section_Content_Padding } from '../../../Themes/Dismac/ThemeDismac';

const Invitado = ({route, navigation }) => {
    const widthView = windowWidth-20;
    const [TOKEN, SetTOKEN] = React.useState(null);
    const [Status, SetStatus] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [search, Setsearch] = React.useState("");
    const [searching, Setsearching] = React.useState(false);
    const [products, SetProducts] = React.useState([]);
    const [VIEW, SETVIEW] = React.useState("");

    React.useEffect(() => {
        SetTOKEN(GET_TOKEN());
        getViewItems();
        loadScreen();
    }, []);

    async function getViewItems(){
        SETVIEW(await GET_VIEW_PRODUCTS());
    }

    function loadScreen(){
        navigation.setOptions({
            headerLeft: () => (<IconButton icon={"arrow-left"} iconColor={RED_DIS} onPress={() => cerrarSession()} />),
            headerRight: () => (<IconButton icon={"camera"} iconColor={RED_DIS} onPress={() => showModal()} />)
        });
        SetStatus(true);
    }

    async function cerrarSession() {
        if (await DELETE_TOKEN_INVITADO()) {
          ResetNavigation("Loading",{}, navigation);
        }
    }

    function showModal() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    function searchProduct(text){
        Setsearch(text);
        Setsearching(text.length <= 4 ? false : true);
        sendQuery(text);
    }

    function thenSearch(response){
        if (response === false) {
            clearProducts([]);
        }else{
            clearProducts(response);
        }
    }

    function clearProducts(productos){
        Setsearching(false);
        SetProducts(productos);
    }

    function sendQuery(text){
        if (text.length >= 4) {
            axios.post(URL_API("searchProduct"),CREATE_BODY_SEARCH_ACCOUNT(text),GET_HEADER_TOKEN(TOKEN)).then(res => {
                if(res.data != null){
                    thenSearch(res.data.response);
                }else{
                    thenSearch(false);
                }
            }).catch(err => {
                thenSearch(false);
            });
        }else{
            clearProducts([]);
        }
    }

    if (Status === true) {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={Section_Content_Custom}>
                <PopUpQr closeModal={() => closeModal()} navigation={navigation} isModalVisible={isModalVisible} TOKEN={TOKEN} />
                <View style={Section_Content_Padding}>
                    <SearchBox Label={"Productos"} ChangeText={(text) => searchProduct(text)} />
                </View>
                {searching == false && search.length == 0 && (<SearchInit />)}
                {searching == true && (<Searching />)}
                {searching == false && search.length > 0 && (<ListProduct TOKEN={TOKEN} Product={products} VIEW={VIEW} invitado={true} />)}
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </ScrollView>
        );
    }else{
        return(
            <LoadingPage />
        );
    }
};

export default Invitado;