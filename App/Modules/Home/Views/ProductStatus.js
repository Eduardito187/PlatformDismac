import React from 'react';  
import { View, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Background_Red_Dis, Flex_Content, JUSTIFY_CONTENT, Margin_Top_5, RED_DIS, ROW_SECTION } from '../../Login/Style/css';
import { StatusBar } from 'expo-status-bar';
import { GET_HEADER_TOKEN, GET_STORES_PARTNER, URL_API } from '../../../Helpers/API';
import { Padding_10_B_5, SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import LoadingPage from './Components/LoadingPage';
import { Button } from 'react-native-paper';
import { AlingFormItem, RowForm, RowFormNoPadding } from '../../Login/Style/style';
import { windowWidth } from '../../../Helpers/GetMobil';
import TwoSwitch from '../../Catalog/Views/Components/TwoSwitch';

const ProductStatus = ({route, navigation }) => {
    const widthView = windowWidth - 30;
    const { TOKEN } = route.params;
    const [Title, SetTitle] = React.useState("");
    const [Description, SetDescription] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [LOADING, SETLOADING] = React.useState(false);
    const [Register, SetRegister] = React.useState(false);
    const [Stores, SetStores] = React.useState([]);

    React.useEffect(() => {
        thenLoading();
    }, []);

    async function thenLoading() {
        let stores = await GET_STORES_PARTNER();
        setStores(stores);
        setLoading(true);
    }
    
    function setStores(stores) {
        for (let index = 0; index < stores.length; index++) {
            stores[index]["check"] = false;
        }
        SetStores(stores);
    }

    function updateStatus() {
        SETLOADING(true);
        let body = {
            "title" : Title,
            "description" : Description
        };
        axios.post(URL_API("currentAccount/new/support"),body,GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                if (res.data.response) {
                    goBackRegister();
                }
            }
            SETLOADING(false);
        }).catch(err => {
            //
        });
    }

    function changeStatus(value, code) {
        console.log(value, code);
    }

    function goBackRegister() {
        if (Register) {
            route.params.onGoBack(true);
            navigation.goBack();
        }
    }
    
    if (loading === false) {
        return (<LoadingPage />);
    }else{
        return (
            <SafeAreaView style={Flex_Content}>
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                    {
                        Stores.map((store, i) => {
                            return (
                                <View key={Math.random()+i+'_Status_'+Math.random()} style={Padding_10_B_5}>
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
                        <Button icon={"plus"} mode="contained" style={Background_Red_Dis} onPress={() => updateStatus()}>Modificar estados</Button>
                    </View>
                </ScrollView>
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </SafeAreaView>
        );
    }
};

export default ProductStatus;