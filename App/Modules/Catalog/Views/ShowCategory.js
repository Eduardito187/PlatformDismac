import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { Snackbar, List, TextInput, Button, IconButton } from 'react-native-paper';
import { Margin_Bottom_50, Margin_Top_5, RED_DIS, ROW_SECTION } from '../../Login/Style/css';
import { CREATE_BODY_SEARCH_ACCOUN, URL_API, GET_HEADER_TOKEN, URL_API_SHOW } from '../../../Helpers/API';
import { style } from '../../Login/Style/style';
import TwoSelectSku from './Components/TwoSelectSku';

/** Components */
import SelectedStore from './Components/SelectedStore';
import TwoSwitch from './Components/TwoSwitch';
import ListProducts from './Components/ListProducts';
import ModalQR from './Components/ModalQR';
import { Navigation } from '../../../Helpers/Nav';
import { column, displayFlex } from '../Style/Two';
import { StatusBar } from 'expo-status-bar';

const ShowCategory = ({route, navigation }) => {
    const { TOKEN, id_catalog, id_category, inheritance} = route.params;
    const widthView = windowWidth-20;
    const [Catalog, SetCatalog] = React.useState({});
    const [Category, SetCategory] = React.useState({});
    const [Message, SetMessage] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Status, SetStatus] = React.useState(false);
    const [Visible, SetVisible] = React.useState(false);
    const [Filtros, SetFiltros] = React.useState(false);
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
    const [loading, setLoading] = React.useState(false);
    const [ProductId, SetProductId] = React.useState([]);
    const [StoreSelect, SetStoreSelect] = React.useState([]);
    const [StoresShow , SetStoresShow] = React.useState([]);
    const [register, setRegister] = React.useState(false);
    const [isModalVisibleQR, setModalVisibleQR] = React.useState(false);
    const [IdCatalgo, SetIdCatalgo] = React.useState(null);

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (<ActivityIndicator color={RED_DIS} />)
        });
        getCategory();
    }, []);


    function showModalQR() {
        setModalVisibleQR(true);
    }

    function closeModalQR() {
        setModalVisibleQR(false);
    }

    const ToogleMetadata = () => SetMetadata(!Metadata);
    const ToogleLanding = () => SetLanding(!Landing);
    const ToogleCustom = () => SetCustom(!Custom);
    const ToogleStores = () => SetStores(!Stores);
    const ToogleProduct = () => SetProduct(!Product);

    function posRegister(){
        route.params.onGoBack();
        navigation.goBack();
    }

    function setData(Response){
        SetIdCatalgo(Response.id);
        SetStatus(Response.status);
        SetVisible(Response.in_menu);
        SetFiltros(Response.filtros);
        SetName(Response.name);
        SetIdPos(Response.id_pos);
        SetUrl(Response.url);
        SetTitulo(Response.landing.title);
        SetCodigo(Response.landing.code);
        SetCuerpo(Response.landing.body);
        SetTituloMeta(Response.metadata.titulo);
        SetDescripcionMeta(Response.metadata.descripcion);
        SetClavesMeta(Response.metadata.metadata);
        SetStoresShow(Response.stores);
        SetTableProduct(Response.products);
        setLoading(true);
    }

    function SetTableProduct(Response){
        let id_Products = ProductId;
        let products = Products;
        for (let index = 0; index < Response.length; index++) {
            if (!products.includes(Response[index]["id"])) {
                id_Products.push(Response[index]["id"]);
                products.push(Response[index]);
            }
        }
        SetProductId(id_Products);
        SetProducts(products);
    }
    
    function Navigate(){
        navigation.push("EditCategory", {"id_catalog":id_catalog,"id_category":id_category,"TOKEN":TOKEN,"onGoBack": onGoBackAction,"inheritance": null});
    }

    function onGoBackAction(a){
        if (a) {
            setLoading(false);
            getCategory();
        }
    }

    function getCategory(){
        axios.get(URL_API_SHOW("catalog/inventory/category", id_category+"/"+id_catalog),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data != null) {
                let Response = res.data.response;
                let ResponseText = res.data.responseText;
                SetCategory(Response);
                showMessage(ResponseText);
                navigation.setOptions({
                    title: Response.name,
                    headerRight: () => (
                    <View style={[{width: 90,marginRight: 15},displayFlex]}>
                        <View style={[{width: 40,paddingRight:10},column]}>
                            <IconButton icon="qrcode" iconColor={RED_DIS} size={30} onPress={() => showModalQR()} />
                        </View>
                        <View style={[{width: 40},column]}>
                            <IconButton icon="pencil" iconColor={RED_DIS} size={30} onPress={() => Navigate()} />
                        </View>
                    </View>)
                });
                setData(Response);
            }
        }).catch(err => {
            //
        });
    }

    function selectProduct(product){

    }

    function showMessage(msg){
        SetMessage(msg);
        SetShowMessage(true);
    }

    function hideMessaje(){
        SetMessage("");
        SetShowMessage(false);
    }
    
    if (loading === false) {
        return (<ActivityIndicator color={RED_DIS} size={'large'} />);
    }else{
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10,paddingBottom: 20,paddingLeft: 5, paddingRight: 5}}>
                <View style={ROW_SECTION}>
                    <TwoSwitch width={widthView} column1={widthView*0.75} column2={widthView*0.25} value={Status} label1={'Estado'} Action={(a) => SetStatus(a)} />
                </View>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <TwoSwitch width={widthView} column1={widthView*0.75} column2={widthView*0.25} value={Visible} label1={'Visible en menu'} Action={(a) => SetVisible(a)} />
                </View>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <TwoSwitch width={widthView} column1={widthView*0.75} column2={widthView*0.25} value={Filtros} label1={'Filtros visibles'} Action={(a) => SetFiltros(a)} />
                </View>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <TextInput disabled={true} mode='outlined' placeholder="Nombre de la categoría" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Nombre de la categoría" value={Name} onChangeText={text => SetName(text)} />
                </View>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <TextInput disabled={true} mode='outlined' placeholder="Id POS" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Id del POS" value={IdPos} onChangeText={text => SetIdPos(text)} />
                </View>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <TextInput disabled={true} mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Url de acceso" value={Url} onChangeText={text => SetUrl(text)} />
                </View>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <List.Accordion title="Productos en categorías" expanded={Product} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleProduct}>
                        <ListProducts Products={Products} Selected={(a) => selectProduct(a)} />
                    </List.Accordion>
                </View>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <List.Accordion title="Stores" expanded={Stores} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleStores}>
                        <View style={ROW_SECTION}>
                            <SelectedStore Action={(a) => SetStoreSelect(a)} value={StoresShow} />
                        </View>
                    </List.Accordion>
                </View>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <List.Accordion title="Landing Page" expanded={Landing} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleLanding}>
                        <View style={ROW_SECTION}>
                            <TextInput disabled={true} mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Título" value={Titulo} onChangeText={text => SetTitulo(text)} />
                        </View>
                        <View style={ROW_SECTION}>
                            <TextInput disabled={true} mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Codigo" value={Codigo} onChangeText={text => SetCodigo(text)} />
                        </View>
                        <View style={ROW_SECTION}>
                            <TextInput disabled={true} numberOfLines={5} multiline mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Cuerpo (HTML)" value={Cuerpo} onChangeText={text => SetCuerpo(text)} />
                        </View>
                    </List.Accordion>
                </View>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <List.Accordion title="Metadata" expanded={Metadata} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleMetadata}>
                        <View style={ROW_SECTION}>
                            <TextInput disabled={true} mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Título" value={TituloMeta} onChangeText={text => SetTituloMeta(text)} />
                        </View>
                        <View style={ROW_SECTION}>
                            <TextInput disabled={true} numberOfLines={5} multiline mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Descripción" value={DescripcionMeta} onChangeText={text => SetDescripcionMeta(text)} />
                        </View>
                        <View style={ROW_SECTION}>
                            <TextInput disabled={true} numberOfLines={5} multiline mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Palabras claves" value={ClavesMeta} onChangeText={text => SetClavesMeta(text)} />
                        </View>
                    </List.Accordion>
                </View>
                <View style={[ROW_SECTION, Margin_Top_5, Margin_Bottom_50]}>
                    <List.Accordion title="Custom Attributes" expanded={Custom} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleCustom}>
                    </List.Accordion>
                </View>
                
                <View style={style.FloatSnackScroll}>    
                    <Snackbar visible={ShowMessage} onDismiss={() => hideMessaje()} action={{label: "Cerrar", onPress: register ? () => posRegister() : () => hideMessaje()}}>
                        {Message}
                    </Snackbar>
                </View>
                <ModalQR closeModal={() => closeModalQR()} isModalVisible={isModalVisibleQR} key={"category"} type={"category"} value={IdCatalgo != null ? IdCatalgo : 0} />
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </ScrollView>
        );
    }
};

export default ShowCategory;