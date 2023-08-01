import React from 'react';  
import { View, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Background_Red_Dis, Flex_Content, JUSTIFY_CONTENT, Margin_Top_5, RED_DIS, ROW_SECTION } from '../../Login/Style/css';
import { StatusBar } from 'expo-status-bar';
import { GET_HEADER_TOKEN, GET_STORES_PARTNER, URL_API, URL_API_GET, URL_API_POS } from '../../../Helpers/API';
import { Padding_10_B_5, SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import LoadingPage from './Components/LoadingPage';
import { Button, TextInput } from 'react-native-paper';
import { AlingFormItem, Margin_Top, PADDING_BOTTOM_20, RowForm, RowFormNoPadding, TitleSub, marginBottom10 } from '../../Login/Style/style';
import { windowWidth } from '../../../Helpers/GetMobil';
import TwoSwitch from '../../Catalog/Views/Components/TwoSwitch';
import Subtitle from '../../../Components/Subtitle';
import InputPrice from './Components/InputPrice';

const ProductPrices = ({route, navigation }) => {
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
                return API[index]["price"];
            }
        }
        return null;
    }
    
    function setStores(stores, API) {
        for (let index = 0; index < stores.length; index++) {
            let value = getApiByCode(API, stores[index]["id"]);
            if (value == null){
                stores[index]["price"] = 0;
                stores[index]["special_price"] = 0;
            }else{
                stores[index]["price"] = value["price"] == null ? 0 : value["price"];
                stores[index]["special_price"] = value["special_price"] == null ? 0 : value["special_price"];
            }
        }
        SetStores(stores);
    }

    async function getProductInfo(){
        let stores = await GET_STORES_PARTNER();
        axios.get(URL_API_GET("product/prices/"+id_product),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data != null) {
                setStores(stores, res.data.response);
                setLoading(true);
            }
        }).catch(err => {
            //
        });
    }

    function updatePrices() {
        SETLOADING(true);
        let body = {
            "stores" : Stores
        };
        console.log(body);
        axios.patch(URL_API_POS("product/prices/", id_product),body,GET_HEADER_TOKEN(TOKEN)).then(res => {
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

    function changeStatus(column, value, code) {
        let data = Stores;
        for (let index = 0; index < data.length; index++) {
            if (data[index]["code"] == code){
                data[index][column] = value;
                console.log(data[index]);
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
                <ScrollView showsVerticalScrollIndicator={false} style={[SCROLL_STYLE, PADDING_BOTTOM_20]}>
                    <View style={[marginBottom10]}>
                        {
                            Stores.map((store, i) => {
                                return (
                                    <View key={Math.random()+i+'_Prices_'+Math.random()} style={Padding_10_B_5}>
                                        <View style={AlingFormItem}>
                                            <View style={RowFormNoPadding}>
                                                <Subtitle style={TitleSub} text={store.name} />
                                            </View>
                                            <View style={RowFormNoPadding}>
                                                <TextInput keyboardType="decimal-pad" mode='outlined' placeholder="Price" label={"Price"} selectionColor="rgba(0, 0, 0, 0.5)" 
                                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                                defaultValue={store.price.toString()} onChangeText={text => changeStatus("price", text, store.code)} />
                                            </View>
                                            <View style={[RowFormNoPadding, Margin_Top]}>
                                                <TextInput keyboardType="decimal-pad" mode='outlined' placeholder="Special Price" label={"Special Price"} selectionColor="rgba(0, 0, 0, 0.5)" 
                                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                                defaultValue={store.special_price.toString()} onChangeText={text => changeStatus("special_price", text, store.code)} />
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        <View style={[ROW_SECTION, Margin_Top_5,JUSTIFY_CONTENT]}>
                            <Button disabled={LOADING} loading={LOADING} icon={"plus"} mode="contained" style={Background_Red_Dis} onPress={() => updatePrices()}>Modificar precios</Button>
                        </View>
                    </View>
                </ScrollView>
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </SafeAreaView>
        );
    }
};

export default ProductPrices;