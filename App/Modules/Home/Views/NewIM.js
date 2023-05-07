import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { Snackbar, List, TextInput, Button } from 'react-native-paper';
import { JUSTIFY_CONTENT, Margin_Top_5, RED_DIS, ROW_SECTION } from '../../Login/Style/css';
import { style } from '../../Login/Style/style';
import { StatusBar } from 'expo-status-bar';

/** Components */

const NewIM = ({route, navigation }) => {
    const { TOKEN } = route.params;
    const widthView = windowWidth-10;
    const [Message, SetMessage] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Title, SetTitle] = React.useState("");
    const [Description, SetDescription] = React.useState("");
    const [loading, setLoading] = React.useState(false);

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
    
    if (loading === false) {
        return (<ActivityIndicator color={RED_DIS} size={'large'} />);
    }else{
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10,paddingBottom: 20,paddingLeft: 5, paddingRight: 5}}>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <TextInput mode='outlined' placeholder="Nombre" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Nombre" value={Title} onChangeText={text => SetTitle(text)} />
                </View>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <TextInput mode='outlined' placeholder="Sku" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Sku" value={Description} onChangeText={text => SetDescription(text)} />
                </View>
                <View style={[ROW_SECTION, Margin_Top_5,JUSTIFY_CONTENT]}>
                    <Button icon={"plus"} mode="contained" style={{backgroundColor: RED_DIS}} onPress={() => uploadFile()}>Enviar formulario</Button>
                </View>
                <View style={style.FloatSnackScroll}>    
                    <Snackbar visible={ShowMessage} onDismiss={() => hideMessaje()} action={{label: "Cerrar", onPress: () => hideMessaje()}}>
                        {Message}
                    </Snackbar>
                </View>
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </ScrollView>
        );
    }
};

export default NewIM;