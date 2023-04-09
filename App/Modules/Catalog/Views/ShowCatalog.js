import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { Badge, Chip, DataTable } from 'react-native-paper';
import { CREATE_BODY_SEARCH_ACCOUN, URL_API, URL_API_SHOW, GET_HEADER_TOKEN } from '../../../Helpers/API';

/** Components */
import Searching from '../../Account/Helper/Searching';
import CategoryModal from './Components/CategoryModal';
import ResultNone from '../../Account/Helper/ResultNone';
import { Background_Dismac, Color_White, Margin_5 } from '../../Login/Style/css';
import TwoColumn from './Components/TwoColumn';
import TwoActionColumn from './Components/TwoActionColumn';

const ShowCatalog = ({route, navigation }) => {
    const widthView = windowWidth-20;
    const [TOKEN, SetTOKEN] = React.useState(route.params.TOKEN);
    const [Catalog, SetCatalog] = React.useState(route.params.Catalog);
    const [CatalogAPI, SetCatalogAPI] = React.useState([]);
    const [Message, SetMessage] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Status, SetStatus] = React.useState(false);
    const [Store, SetStore] = React.useState(null);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [category, SetCategory] = React.useState(null);

    React.useEffect(() => {
        /*
        navigation.setOptions({
            title: Catalog.name
        });
        */
        getCatalog();
    }, []);

    function selectCategory(category) {
        SetCategory(category);
        setModalVisible(true);
    }
    function closeModal() {
        setModalVisible(false);
    }

    function NewCategory(){
        navigation.navigate("NewCategory", {"id_catalog":CatalogAPI.id, "TOKEN":TOKEN,onGoBack: onGoBackAction()});
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
        }
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
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <ResultNone />
                </View>
            );
        }else{
            return (
                <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10,paddingBottom: 20,paddingLeft: 5, paddingRight: 5}}>
                    <View style={{backgroundColor: '#FFFFFF', padding: 5, borderRadius: 5}}>
                        <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Nombre del catálogo'} label2={CatalogAPI.name} />
                        <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Código del producto'} label2={CatalogAPI.code} />
                        <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Cantidad de Productos'} label2={CatalogAPI.products} />
                        <TwoActionColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Categorías'} label2={'Crear'} Action={() => NewCategory()} />
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Nombre de categorías</DataTable.Title>
                                <DataTable.Title numeric>Código</DataTable.Title>
                            </DataTable.Header>
                            {
                                CatalogAPI.categorias.map((category) => {
                                    return (
                                        <DataTable.Row key={Math.random()+'_Store_'+Math.random()} onPress={() =>selectCategory(category)}>
                                            <DataTable.Cell>{category.name}</DataTable.Cell>
                                            <DataTable.Cell numeric>{category.code}</DataTable.Cell>
                                        </DataTable.Row>
                                    )
                                })
                            }
                        </DataTable>
                    </View>
                    <CategoryModal closeModal={() => closeModal()} isModalVisible={isModalVisible} category={category} /> 
                </ScrollView>
            );
        }
    }else{
        return(
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <ActivityIndicator size="large" color="#EC2427" />
            </View>
        );
    }
};

export default ShowCatalog;