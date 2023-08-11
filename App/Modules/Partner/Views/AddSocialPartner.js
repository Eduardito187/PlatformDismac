import React, {useState} from 'react';
import { View, ScrollView } from 'react-native';
import { SCROLL_STYLE, Padding_10_B_5 } from '../../../Themes/Dismac/ThemeDismac';
import { AlingFormItem, Centered, RowForm, TitleSub, Top_15_Red } from '../../Login/Style/style';
import { TextInput, Button } from 'react-native-paper';
import { windowWidth, windowHeight } from '../../../Helpers/GetMobil';
import { GET_HEADER_TOKEN, URL_API } from '../../../Helpers/API';
import axios from 'axios';

/** Components */
import Subtitle from '../../../Components/Subtitle';
import { StatusBar } from 'expo-status-bar';
import { RED_DIS } from '../../Login/Style/css';
import TwoActionColumn from '../../Catalog/Views/Components/TwoActionColumn';
/** */

const AddSocialPartner = ({route, navigation }) => {
    const { roles, Socket, TOKEN} = route.params;
    const widthView = windowWidth-20;
    const [Url, SetUrl] = React.useState("");
    const [LOADING, SETLOADING] = React.useState(false);
    const [IdSocial, SetIdSocial] = React.useState(null);

    React.useEffect(() => {
        //
    }, []);

    async function registerCatalog() {
        if (Url.length > 5) {
            SETLOADING(true);
            axios.post(URL_API("partner/create/socials"),{
                "url" : Url,
                "id_social_network" : IdSocial
            }, GET_HEADER_TOKEN(TOKEN)).then(res => {
                if (res.data.response) {
                    route.params.onGoBack(true);
                    navigation.goBack();
                }
            }).catch(err => {});
        }else{
            SETLOADING(false);
        }
    }

    function SelectedSocial(){
        navigation.push("Socials", {"roles" : roles, "Socket" : Socket, "TOKEN" : TOKEN,"onGoBack" : onGoBackAction});
    }
    
    function onGoBackAction(a, idCategory){
        if (a){
            SetIdSocial(idCategory);
        }
    }

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                <View style={[{width: windowWidth, height: windowHeight}]}>
                    <View style={Padding_10_B_5}>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Url."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Url} onChangeText={text => SetUrl(text)} />
                            </View>
                        </View>
                    </View>
                    <View style={Padding_10_B_5}>
                        <View style={AlingFormItem}>
                            <TwoActionColumn disabled={false} width={widthView} column1={widthView*0.75} column2={widthView*0.25}label1={'Red social.'} label2={'Seleccionar'} Action={() => SelectedSocial()} />
                        </View>
                    </View>
                    {
                        Url.length > 5 && (
                            <View style={Centered}>
                                <Button icon="book" loading={LOADING} mode="contained" style={Top_15_Red} onPress={() => registerCatalog()}>
                                    Registrar red social
                                </Button>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
            <StatusBar backgroundColor={RED_DIS} style="light" />
        </View>
    );
};

export default AddSocialPartner;