import React from 'react';  
import { View, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Background_Red_Dis, Flex_Content, JUSTIFY_CONTENT, Margin_Top_5, RED_DIS, ROW_SECTION } from '../../Login/Style/css';
import { StatusBar } from 'expo-status-bar';
import { GET_HEADER_TOKEN, GET_STORES_PARTNER, URL_API, URL_API_GET, URL_API_POS, generateCustomId } from '../../../Helpers/API';
import { Padding_10_B_5, SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import LoadingPage from './Components/LoadingPage';
import { Button } from 'react-native-paper';
import { AlingFormItem, RowForm, RowFormNoPadding, marginBottom10 } from '../../Login/Style/style';
import { windowWidth } from '../../../Helpers/GetMobil';
import TwoSwitch from '../../Catalog/Views/Components/TwoSwitch';

const ProductStatus = ({route, navigation }) => {
    const widthView = windowWidth - 30;
    const { TOKEN, id_product } = route.params;
    const [Title, SetTitle] = React.useState("");
    const [Description, SetDescription] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [LOADING, SETLOADING] = React.useState(false);
    const [Register, SetRegister] = React.useState(false);
    const [Stores, SetStores] = React.useState([]);

    React.useEffect(() => {
        getProductInfo();
    }, []);

    function getApiByCode(API, storeId){
        for (let index = 0; index < API.length; index++) {
            if (API[index]["id_store"] == storeId){
                return API[index]["status"];
            }
        }
        return null;
    }
    
    function setStores(stores, API) {
        for (let index = 0; index < stores.length; index++) {
            let value = getApiByCode(API, stores[index]["id"]);
            stores[index]["check"] = value == null ? false : value;
        }
        SetStores(stores);
    }

    async function getProductInfo(){
        let stores = await GET_STORES_PARTNER();
        axios.get(URL_API_GET("product/status/"+id_product),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data != null) {
                setStores(stores, res.data.response);
                setLoading(true);
            }
        }).catch(err => {
            //
        });
    }

    function updateStatus() {
        SETLOADING(true);
        let body = {
            "stores" : Stores
        };
        axios.patch(URL_API_POS("product/status/", id_product),body,GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SETLOADING(false);
                if (res.data.response) {
                    goBackRegister();
                }
            }
        }).catch(err => {
            //
        });
    }

    function changeStatus(value, code) {
        let data = Stores;
        for (let index = 0; index < data.length; index++) {
            if (data[index]["code"] == code){
                data[index]["check"] = value;
            }
        }
        SetStores(data);
    }

    function goBackRegister() {
        route.params.onGoBack(true);
        navigation.goBack();
    }
    
    if (loading === false) {
        return (<LoadingPage />);
    }else{
        return (
            <SafeAreaView style={Flex_Content}>
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                    <View style={[marginBottom10]}>
                        {
                            Stores.map((store, i) => {
                                return (
                                    <View key={generateCustomId()} style={Padding_10_B_5}>
                                        <View style={AlingFormItem}>
                                            <View style={RowFormNoPadding}>
                                                <TwoSwitch disabled={false} width={widthView} column1={widthView*0.75} column2={widthView*0.25} value={store.check} label1={store.name} Action={(a) => changeStatus(a, store.code)} />
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        <View style={[ROW_SECTION, Margin_Top_5,JUSTIFY_CONTENT]}>
                            <Button disabled={LOADING} loading={LOADING} icon={"plus"} mode="contained" style={Background_Red_Dis} onPress={() => updateStatus()}>Modificar estados</Button>
                        </View>
                    </View>
                </ScrollView>
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </SafeAreaView>
        );
    }
};

export default ProductStatus;