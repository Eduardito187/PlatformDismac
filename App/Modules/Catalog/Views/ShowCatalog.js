import React from 'react';  
import { View, ScrollView, LogBox, ActivityIndicator } from 'react-native';
import {Page} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { Badge, Chip, DataTable, IconButton } from 'react-native-paper';
import { CREATE_BODY_SEARCH_ACCOUNT, URL_API, URL_API_SHOW, GET_HEADER_TOKEN, existPermission, generateCustomId } from '../../../Helpers/API';

/** Components */
import Searching from '../../Account/Helper/Searching';
import CategoryModal from './Components/CategoryModal';
import ResultNone from '../../Account/Helper/ResultNone';
import { Background_Dismac, Color_White, Margin_5, RED_DIS, Section_Background, Section_Content_Custom, Section_Content_Flex } from '../../Login/Style/css';
import TwoColumn from './Components/TwoColumn';
import TwoActionColumn from './Components/TwoActionColumn';
import ModalQR from './Components/ModalQR';
import { StatusBar } from 'expo-status-bar';
import { column, contentOneSection, contentOneSectionRight, contentSection, displayFlex, sectionQr } from '../Style/Two';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const ShowCatalog = ({route, navigation }) => {
    const widthView = windowWidth-20;
    const [TOKEN, SetTOKEN] = React.useState(route.params.TOKEN);
    const [Catalog, SetCatalog] = React.useState(route.params.Catalog);
    const [CatalogAPI, SetCatalogAPI] = React.useState(null);
    const [Message, SetMessage] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Status, SetStatus] = React.useState(false);
    const [Store, SetStore] = React.useState(null);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [category, SetCategory] = React.useState(null);
    const [isModalVisibleQR, setModalVisibleQR] = React.useState(false);

    React.useEffect(() => {
        getCatalog();
    }, []);

    function showModalQR() {
        setModalVisibleQR(true);
    }

    function closeModalQR() {
        setModalVisibleQR(false);
    }

    function selectCategory(category) {
        SetCategory(category);
        setModalVisible(true);
    }
    function closeModal() {
        setModalVisible(false);
    }

    function NewCategory(){
        navigation.navigate("NewCategory", {"id_catalog":CatalogAPI.id, "TOKEN":TOKEN, "onGoBack": onGoBackAction, "inheritance": null});
    }

    function onGoBackAction(){
        SetShowMessage(false);
        SetStatus(false);
        getCatalog();
    }

    function thenSearch(response, responseText){
        if (response === false) {
            SetMessage(responseText);
            SetShowMessage(true);
        }else{
            SetCatalogAPI(response);
            let rolEdit = existPermission(route.params.roles, "cod_00007");
            navigation.setOptions({
                headerRight: () => (
                    <View style={[rolEdit == true ? contentSection : contentOneSectionRight,displayFlex]}>
                        <View style={[sectionQr,column]}>
                            <IconButton icon="qrcode" iconColor={RED_DIS} size={30} onPress={() => showModalQR()} />
                        </View>
                        {rolEdit && (<View style={[contentOneSection,column]}><IconButton icon="pencil" iconColor={RED_DIS} size={30} onPress={() => editCatalog()} /></View>)}
                    </View>
                )
            });
        }
    }

    function editCatalog(){
        navigation.navigate("EditCatalog", {"id_catalog":Catalog.id,"TOKEN":TOKEN,"onGoBack": onGoBackAction,"inheritance": null});
    }

    function getCatalog(){
        axios.get(URL_API_SHOW("partner/inventory/catalog", Catalog.id),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                thenSearch(res.data.response, res.data.responseText);
            }else{
                thenSearch(false, "Algo salio mal.");
            }
            SetStatus(true);
        }).catch(err => {
            thenSearch(false, err);
        });
    }

    if (Status === true) {
        if (ShowMessage === true) {
            return(
                <View style={Section_Content_Flex}>
                    <ResultNone />
                </View>
            );
        }else{
            return (
                <ScrollView showsVerticalScrollIndicator={false} style={Section_Content_Custom}>
                    <View style={Section_Background}>
                        <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Nombre del catálogo'} label2={CatalogAPI.name} />
                        <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Código del producto'} label2={CatalogAPI.code} />
                        <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Cantidad de Productos'} label2={CatalogAPI.products} />
                        {
                            existPermission(route.params.roles, "cod_00029") && (<TwoActionColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Categorías'} label2={'Crear'} Action={() => NewCategory()} />)
                        }
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Nombre de categorías</DataTable.Title>
                                <DataTable.Title numeric>Código</DataTable.Title>
                            </DataTable.Header>
                            {
                                CatalogAPI.categorias.map((category) => {
                                    return (
                                        <DataTable.Row key={generateCustomId()} onPress={() =>selectCategory(category)}>
                                            <DataTable.Cell>{category.name}</DataTable.Cell>
                                            <DataTable.Cell numeric>{category.code}</DataTable.Cell>
                                        </DataTable.Row>
                                    )
                                })
                            }
                        </DataTable>
                    </View>
                    <ModalQR closeModal={() => closeModalQR()} isModalVisible={isModalVisibleQR} key={"catalog"} type={"catalog"} value={CatalogAPI != null ? CatalogAPI.id : 0} />
                    <CategoryModal closeModal={() => closeModal()} roles={route.params.roles} isModalVisible={isModalVisible} navigation={navigation} TOKEN={TOKEN} category={category} idCatalog={CatalogAPI.id} />
                    <StatusBar backgroundColor={RED_DIS} style="light" />
                </ScrollView>
            );
        }
    }else{
        return(
            <View style={Section_Content_Flex}>
                <ActivityIndicator size="large" color="#EC2427" />
            </View>
        );
    }
};

export default ShowCatalog;