import React, {useState} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { PageLoading, Page, SCROLL_STYLE, Padding_10_B_5 } from '../../../Themes/Dismac/ThemeDismac';
import { AlingFormItem, Centered, RowForm, TitleSub, Top_15_Red } from '../../Login/Style/style';
import { TextInput, Button } from 'react-native-paper';
import { windowWidth, windowHeight } from '../../../Helpers/GetMobil';
import { CREATE_BODY_SET_CATALOG, GET_HEADER_ACCOUNT, URL_API } from '../../../Helpers/API';
import axios from 'axios';

/** Components */
import Subtitle from '../../../Components/Subtitle';
import MessageBox from '../../../Components/MessageBox';
import { StatusBar } from 'expo-status-bar';
import { RED_DIS } from '../../Login/Style/css';
/** */

const AddCatalog = ({route, navigation }) => {
    const [Name, SetName] = React.useState("");
    const [Codigo, SetCodigo] = React.useState("");
    const [LOADING, SETLOADING] = React.useState(false);
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Message, SetSetMessage] = React.useState("");

    React.useEffect(() => {
        //
    }, []);

    async function registerCatalog() {
        if (Name.length > 0 && Codigo.length > 0) {
            SETLOADING(true);
            axios.post(URL_API("partner/inventory/catalog"),CREATE_BODY_SET_CATALOG(Name, Codigo),await GET_HEADER_ACCOUNT()).then(res => {
                if (res.data != null) {
                    ShowAlertMessage(res.data.responseText);
                }
            }).catch(err => {
                ShowAlertMessage(err);
            });
        }else{
            SETLOADING(false);
        }
    }

    function ShowAlertMessage(text) {
        SetSetMessage(text);
        SetShowMessage(true);
        SETLOADING(false);
    }

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                <View style={[{width: windowWidth, height: windowHeight}]}>
                    <View style={Padding_10_B_5}>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Nombre."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Nombre" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Name} onChangeText={text => SetName(text)} label={Name.length+"/50"} maxLength={50} />
                            </View>
                        </View>
                    </View>
                    <View style={Padding_10_B_5}>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Codigo."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Codigo" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Codigo} onChangeText={text => SetCodigo(text)} label={Codigo.length+"/20"} maxLength={20} />
                            </View>
                        </View>
                    </View>
                    {
                        Name.length > 5 && Codigo.length > 4 && (
                            <View style={Centered}>
                                <Button icon="book" loading={LOADING} mode="contained" style={Top_15_Red} onPress={() => registerCatalog()}>
                                    Registrar catalogo
                                </Button>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
            <MessageBox ShowMessage={ShowMessage} CloseMessage={() => SetShowMessage(false)} Title={"Dismac"} Text={Message} />
            <StatusBar backgroundColor={RED_DIS} style="light" />
        </View>
    );
};

export default AddCatalog;