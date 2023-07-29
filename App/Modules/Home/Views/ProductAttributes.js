import React from 'react';  
import { View, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Background_Red_Dis, Flex_Content, JUSTIFY_CONTENT, Margin_Top_5, RED_DIS, ROW_SECTION } from '../../Login/Style/css';
import { StatusBar } from 'expo-status-bar';
import { GET_HEADER_TOKEN, URL_API } from '../../../Helpers/API';
import { SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import LoadingPage from './Components/LoadingPage';
import { Button } from 'react-native-paper';

const ProductAttributes = ({route, navigation }) => {
    const { TOKEN } = route.params;
    const [Title, SetTitle] = React.useState("");
    const [Description, SetDescription] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [LOADING, SETLOADING] = React.useState(false);
    const [Register, SetRegister] = React.useState(false);

    React.useEffect(() => {
        thenLoading();
    }, []);

    function thenLoading() {
        setLoading(true);
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
                    <View style={[ROW_SECTION, Margin_Top_5,JUSTIFY_CONTENT]}>
                        <Button icon={"plus"} mode="contained" style={Background_Red_Dis} onPress={() => updateStatus()}>Modificar atributos</Button>
                    </View>
                </ScrollView>
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </SafeAreaView>
        );
    }
};

export default ProductAttributes;