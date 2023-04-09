import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { Chip, List, TextInput } from 'react-native-paper';
import { RED_DIS, Margin_Top_5, ROW_SECTION } from '../../Login/Style/css';
import { CREATE_BODY_SEARCH_ACCOUN, URL_API, URL_API_SHOW, GET_HEADER_TOKEN } from '../../../Helpers/API';
import TwoSelectSku from './Components/TwoSelectSku';

/** Components */
import SelectedStore from './Components/SelectedStore';
import TwoSwitch from './Components/TwoSwitch';
import ListProducts from './Components/ListProducts';

const NewCategory = ({route, navigation }) => {
    const widthView = windowWidth-20;
    const [TOKEN, SetTOKEN] = React.useState(route.params.TOKEN);
    const [Catalog, SetCatalog] = React.useState({});
    const [Message, SetMessage] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Status, SetStatus] = React.useState(false);
    const [Name, SetName] = React.useState("");
    const [IdPos, SetIdPos] = React.useState("");
    const [Url, SetUrl] = React.useState("");
    const [Titulo, SetTitulo] = React.useState("");
    const [Codigo, SetCodigo] = React.useState("");
    const [Cuerpo, SetCuerpo] = React.useState("");
    const [TituloMeta, SetTituloMeta] = React.useState("");
    const [DescripcionMeta, SetDescripcionMeta] = React.useState("");
    const [ClavesMeta, SetClavesMeta] = React.useState("");
    const [Metadata, SetMetadata] = React.useState(false);
    const [Landing, SetLanding] = React.useState(false);
    const [Custom, SetCustom] = React.useState(false);
    const [Stores, SetStores] = React.useState(false);
    const [Products, SetProducts] = React.useState([]);
    const [Product, SetProduct] = React.useState(false);
    React.useEffect(() => {
        //
    }, []);

    const ToogleMetadata = () => SetMetadata(!Metadata);
    const ToogleLanding = () => SetLanding(!Landing);
    const ToogleCustom = () => SetCustom(!Custom);
    const ToogleStores = () => SetStores(!Stores);
    const ToogleProduct = () => SetProduct(!Product);

    function thenSearch(response, responseText){
        if (response === false) {
            SetMessage(responseText);
            SetShowMessage(true);
        }else{
            //
        }
    }

    function getCategory(){
        axios.post(URL_API_SHOW("partner/inventory/catalog", Catalog.id),GET_HEADER_TOKEN(TOKEN)).then(res => {
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

    function selectProduct(product){

    }

    function addSkuCategory(sku){
        console.log(sku);
    }

    function SelectedFile(){
        
    }
    
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10,paddingBottom: 20,paddingLeft: 5, paddingRight: 5}}>
            <View style={ROW_SECTION}>
                <TwoSwitch width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Estado'} Action={() => NewCategory()} />
            </View>
            <View style={[ROW_SECTION, Margin_Top_5]}>
                <TwoSwitch width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Visible en menu'} Action={() => NewCategory()} />
            </View>
            <View style={[ROW_SECTION, Margin_Top_5]}>
                <TwoSwitch width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Filtros visibles'} Action={() => NewCategory()} />
            </View>
            <View style={[ROW_SECTION, Margin_Top_5]}>
                <TextInput mode='outlined' placeholder="Nombre de la categoría" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Nombre de la categoría" value={Name} onChangeText={text => SetName(text)} />
            </View>
            <View style={[ROW_SECTION, Margin_Top_5]}>
                <TextInput mode='outlined' placeholder="Id POS" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Id del POS" value={IdPos} onChangeText={text => SetIdPos(text)} />
            </View>
            <View style={[ROW_SECTION, Margin_Top_5]}>
                <TextInput mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Url de acceso" value={Url} onChangeText={text => SetUrl(text)} />
            </View>
            <View style={[ROW_SECTION, Margin_Top_5]}>
                <List.Accordion title="Productos en categorías" expanded={Product} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleProduct}>
                    <TwoSelectSku width={widthView} label1={'Sku'} label2={'Archivo'} Action={(a) => addSkuCategory(a)} SelectedFile={() => SelectedFile()} />
                    <ListProducts Products={Products} Selected={(a) => selectProduct(a)} />
                </List.Accordion>
            </View>
            <View style={[ROW_SECTION, Margin_Top_5]}>
                <List.Accordion title="Stores" expanded={Stores} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleStores}>
                    <View style={ROW_SECTION}>
                        <SelectedStore />
                    </View>
                </List.Accordion>
            </View>
            <View style={[ROW_SECTION, Margin_Top_5]}>
                <List.Accordion title="Landing Page" expanded={Landing} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleLanding}>
                    <View style={ROW_SECTION}>
                        <TextInput mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Título" value={Titulo} onChangeText={text => SetTitulo(text)} />
                    </View>
                    <View style={ROW_SECTION}>
                        <TextInput mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Codigo" value={Codigo} onChangeText={text => SetCodigo(text)} />
                    </View>
                    <View style={ROW_SECTION}>
                        <TextInput numberOfLines={5} multiline mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Cuerpo (HTML)" value={Cuerpo} onChangeText={text => SetCuerpo(text)} />
                    </View>
                </List.Accordion>
            </View>
            <View style={[ROW_SECTION, Margin_Top_5]}>
                <List.Accordion title="Metadata" expanded={Metadata} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleMetadata}>
                    <View style={ROW_SECTION}>
                        <TextInput mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Título" value={TituloMeta} onChangeText={text => SetTituloMeta(text)} />
                    </View>
                    <View style={ROW_SECTION}>
                        <TextInput numberOfLines={5} multiline mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Descripción" value={DescripcionMeta} onChangeText={text => SetDescripcionMeta(text)} />
                    </View>
                    <View style={ROW_SECTION}>
                        <TextInput numberOfLines={5} multiline mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Palabras claves" value={ClavesMeta} onChangeText={text => SetClavesMeta(text)} />
                    </View>
                </List.Accordion>
            </View>
            <View style={[ROW_SECTION, Margin_Top_5]}>
                <List.Accordion title="Custom Attributes" expanded={Custom} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleCustom}>
                </List.Accordion>
            </View>
        </ScrollView>
    );
};

export default NewCategory;