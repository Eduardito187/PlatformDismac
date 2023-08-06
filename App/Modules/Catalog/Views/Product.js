import React from 'react';
import { View, ScrollView } from 'react-native';
import { SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY, SCROLL_STYLE, Section_Content_Padding } from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { CREATE_BODY_SEARCH_ACCOUNT, URL_API, GET_HEADER_TOKEN, GET_VIEW_PRODUCTS } from '../../../Helpers/API';

/** Components */
import SearchBox from '../../../Components/Button/SearchBox';
import SearchInit from '../../Account/Helper/SearchInit';
import Searching from '../../Account/Helper/Searching';
import ListProduct from './Components/ListProduct';
import Header from '../../Home/Views/Components/Header';

const Product = (props) => {
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [id_category, SetIdCategory] = React.useState(props.id_category != null ? props.id_category : null);
    const [id_partner, SetIdPartner] = React.useState(props.id_partner != null ? props.id_partner : null);
    const [search, Setsearch] = React.useState("");
    const [searching, Setsearching] = React.useState(false);
    const [products, SetProducts] = React.useState([]);
    const [VIEW, SETVIEW] = React.useState("");

    React.useEffect(() => {
        getViewItems();
    }, []);

    async function getViewItems() {
        SETVIEW(await GET_VIEW_PRODUCTS());
    }

    function searchProduct(text) {
        Setsearch(text);
        Setsearching(text.length <= 4 ? false : true);
        sendQuery(text);
    }

    function thenSearch(response) {
        if (response === false) {
            clearProducts([]);
        } else {
            clearProducts(response);
        }
    }

    function clearProducts(productos) {
        Setsearching(false);
        SetProducts(productos);
    }

    function sendQuery(text) {
        if (text.length >= 4) {
            axios.post(URL_API("searchProduct"), CREATE_BODY_SEARCH_ACCOUNT(text, id_category, id_partner), GET_HEADER_TOKEN(TOKEN)).then(res => {
                if (res.data != null) {
                    thenSearch(res.data.response);
                } else {
                    thenSearch(false);
                }
            }).catch(err => {
                thenSearch(false);
            });
        } else {
            clearProducts([]);
        }
    }

    return (
        <View style={SCREEN_RELATIVE}>
            <View style={SCREEN_ABSOLUTE_HEADER}>
                <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} />
            </View>
            <View style={SCREEN_ABSOLUTE_BODY}>
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                    <View style={Section_Content_Padding}>
                        <SearchBox Label={"Productos"} ChangeText={(text) => searchProduct(text)} />
                    </View>
                    {searching == false && search.length == 0 && (<SearchInit />)}
                    {searching == true && (<Searching />)}
                    {searching == false && search.length > 0 && (<ListProduct TOKEN={TOKEN} Product={products} VIEW={VIEW} invitado={false} />)}
                </ScrollView>
            </View>
        </View>
    );
};

export default Product;