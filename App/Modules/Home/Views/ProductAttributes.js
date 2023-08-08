import React from 'react';  
import { View, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Background_Red_Dis, Flex_Content, JUSTIFY_CONTENT, Margin_Top_5, RED_DIS, ROW_SECTION } from '../../Login/Style/css';
import { StatusBar } from 'expo-status-bar';
import { GET_HEADER_TOKEN, URL_API, URL_API_GET, URL_API_POS, generateCustomId } from '../../../Helpers/API';
import { Padding_10_B_5, SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import LoadingPage from './Components/LoadingPage';
import { Button } from 'react-native-paper';
import { AlingFormItem } from '../../Login/Style/style';
import Attribute from '../../Product/Views/Components/Attributes';

const ProductAttributes = ({route, navigation }) => {
    const { TOKEN, id_product } = route.params;
    const [Attributes, SetAttributes] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [LOADING, SETLOADING] = React.useState(false);

    React.useEffect(() => {
        getProductInfo();
    }, []);

    async function getProductInfo(){
        axios.get(URL_API_GET("product/attributes/"+id_product),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data != null) {
                SetAttributes(res.data.response);
                thenLoading();
            }
        }).catch(err => {
            //
        });
    }

    function thenLoading() {
        setLoading(true);
    }

    function updateStatus() {
        SETLOADING(true);
        let body = {
            "attributes" : Attributes
        };
        axios.patch(URL_API_POS("product/attributes/", id_product),body,GET_HEADER_TOKEN(TOKEN)).then(res => {
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

    function changeCustomValue(code, value) {
        let data = Attributes;
        for (let index = 0; index < data.length; index++) {
            if (data[index]["custom"]["code"] == code){
                data[index]["value"] = value;
            }
        }
        SetAttributes(data);
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
                    <View style={[ROW_SECTION, Margin_Top_5,JUSTIFY_CONTENT]}>
                        {
                            Attributes.map((state, j) => {
                                return (
                                    <Attribute key={generateCustomId()} name={state.custom.name} value={state.value} code={state.custom.code} type={state.custom.type.type} disabled={false} setValue={(code, value) => changeCustomValue(code, value)} />
                                )
                            })
                        }
                    </View>
                    <View style={[ROW_SECTION, Margin_Top_5,JUSTIFY_CONTENT]}>
                        <Button disabled={LOADING} loading={LOADING} icon={"plus"} mode="contained" style={Background_Red_Dis} onPress={() => updateStatus()}>Modificar atributos</Button>
                    </View>
                </ScrollView>
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </SafeAreaView>
        );
    }
};

export default ProductAttributes;