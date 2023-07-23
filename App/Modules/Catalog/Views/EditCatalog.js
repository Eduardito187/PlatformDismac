import React, {useState} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { PageLoading, Page, SCROLL_STYLE, Padding_10_B_5 } from '../../../Themes/Dismac/ThemeDismac';
import { AlingFormItem, Centered, RowForm, TitleSub, Top_15_Red } from '../../Login/Style/style';
import { TextInput, Button } from 'react-native-paper';
import { windowWidth, windowHeight } from '../../../Helpers/GetMobil';
import { CREATE_BODY_SET_CATALOG, GET_HEADER_ACCOUNT, GET_HEADER_TOKEN, URL_API, URL_API_POS } from '../../../Helpers/API';
import axios from 'axios';

/** Components */
import Subtitle from '../../../Components/Subtitle';
import { StatusBar } from 'expo-status-bar';
import { RED_DIS } from '../../Login/Style/css';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
/** */

const EditCatalog = ({route, navigation }) => {
    const {id_catalog, TOKEN} = route.params;
    const [Name, SetName] = React.useState("");
    const [Codigo, SetCodigo] = React.useState("");
    const [Catalog, SetCatalog] = React.useState(null);
    const [LOADING, SETLOADING] = React.useState(false);
    const [Loader, SetLoader] = React.useState(false);

    React.useEffect(() => {
        getCatalogInfo();
    }, []);

    function getCatalogInfo() {
        axios.get(URL_API("partner/inventory/catalog/info/"+id_catalog),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data.response != null){
                SetCatalog(res.data.response);
                SetName(res.data.response.name)
                SetCodigo(res.data.response.code)
                SetLoader(true);
            }
        }).catch(err => {
            //
        });
    }

    async function editCatalog() {
        if (Name.length > 0 && Codigo.length > 0) {
            SETLOADING(true);
            axios.patch(URL_API_POS("partner/inventory/catalog/"+id_catalog),CREATE_BODY_SET_CATALOG(Name, Codigo),GET_HEADER_TOKEN(TOKEN)).then(res => {
                if (res.data != null) {
                    route.params.onGoBack(true);
                    navigation.goBack();
                }
            }).catch(err => {
                //
            });
        }else{
            SETLOADING(false);
        }
    }

    if (Loader == false){
        return (<LoadingPage />);
    }else{
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
                                    <Button icon="book" loading={LOADING} mode="contained" style={Top_15_Red} onPress={() => editCatalog()}>
                                        Editar catálogo
                                    </Button>
                                </View>
                            )
                        }
                    </View>
                </ScrollView>
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </View>
        );
    }
};

export default EditCatalog;