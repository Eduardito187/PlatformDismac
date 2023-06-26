import React from 'react';  
import { View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { Snackbar, Card, TextInput, Button } from 'react-native-paper';
import { Background_Red_Dis, Flex_Content, JUSTIFY_CONTENT, Margin_Top_5, RED_DIS, ROW_SECTION } from '../../Login/Style/css';
import { style } from '../../Login/Style/style';
import Tarea from '../../Catalog/Views/Components/Tarea';
import { StatusBar } from 'expo-status-bar';
import { GET_HEADER_TOKEN, URL_API } from '../../../Helpers/API';
import { SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import LoadingPage from './Components/LoadingPage';

/** Components */

const NewST = ({route, navigation }) => {
    const { TOKEN } = route.params;
    const widthView = windowWidth-10;
    const [Message, SetMessage] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
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

    function showMessage(msg){
        SetMessage(msg);
        SetShowMessage(true);
    }

    function hideMessaje(){
        SetMessage("");
        SetShowMessage(false);
    }

    function uploadFile() {
        
    }

    function sendTicketST() {
        SETLOADING(true);
        let body = {
            "title" : Title,
            "description" : Description
        };
        axios.post(URL_API("currentAccount/new/support"),body,GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                if (res.data.response) {
                    SetRegister(true);
                    showMessage(res.data.responseText);
                }else {
                    showMessage("No se pudo completar el registro.");
                }
            }else{
                showMessage("Algo salio mal.");
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
                    <View style={[ROW_SECTION, Margin_Top_5]}>
                        <TextInput mode='outlined' placeholder="Título" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Título" value={Title} onChangeText={text => SetTitle(text)} />
                    </View>
                    <View style={[ROW_SECTION, Margin_Top_5]}>
                        <TextInput mode='outlined' placeholder="Descripción" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Descripción" value={Description} onChangeText={text => SetDescription(text)} />
                    </View>
                    <View style={[ROW_SECTION, Margin_Top_5]}>
                        <Card>
                            <Card.Actions>
                                <Button icon={"plus"} onPress={() => uploadFile()}>Agregar archívo</Button>
                            </Card.Actions>
                        </Card>
                    </View>
                    <View style={[ROW_SECTION, Margin_Top_5,JUSTIFY_CONTENT]}>
                        <Button icon={"plus"} mode="contained" style={Background_Red_Dis} onPress={() => sendTicketST()}>Registrar ticket</Button>
                    </View>
                </ScrollView>
                <View style={style.FloatSnack}>    
                    <Snackbar visible={ShowMessage} onDismiss={() => hideMessaje()} action={{label: "Cerrar", onPress: Register ? () => goBackRegister() : () => hideMessaje()}}>
                        {Message}
                    </Snackbar>
                </View>
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </SafeAreaView>
        );
    }
};

export default NewST;