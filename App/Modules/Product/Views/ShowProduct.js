import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { Snackbar, List, TextInput, Button, IconButton } from 'react-native-paper';
import { Margin_Bottom_50, Margin_Top_5, RED_DIS, ROW_SECTION } from '../../Login/Style/css';
import { CREATE_BODY_SEARCH_ACCOUN, URL_API, GET_HEADER_TOKEN, URL_API_SHOW } from '../../../Helpers/API';
import { style } from '../../Login/Style/style';
import TwoColumnBg from '../../Catalog/Views/Components/TwoColumnBg';
import Tarea from '../../Catalog/Views/Components/Tarea';
import CustomTable from '../../Catalog/Views/Components/CustomTable';

/** Components */

const ShowProduct = ({route, navigation }) => {
    const { TOKEN, id_product } = route.params;
    const widthView = windowWidth-10;
    const [Product, SetProduct] = React.useState({});
    const [Message, SetMessage] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Name, SetName] = React.useState("");
    const [Sku, SetSku] = React.useState("");
    const [Brand, SetBrand] = React.useState(null);
    const [Clacom, SetClacom] = React.useState(null);
    const [Type, SetType] = React.useState(null);
    const [Status, SetStatus] = React.useState(null);
    const [Prices, SetPrices] = React.useState(null);
    const [Categorys, SetCategorys] = React.useState(null);
    const [CuotaInicial, SetCuotaInicial] = React.useState(null);
    const [DataSheet, SetDataSheet] = React.useState(null);
    const [Description, SetDescription] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (<ActivityIndicator color={RED_DIS} />)
        });
        getProduct();
    }, []);

    function setData(Response){
        SetName(Response.name);
        SetSku(Response.sku);
        SetBrand(Response.brand);
        SetClacom(Response.clacom);
        SetType(Response.type);
        SetDescription(Response.descripcion == null ? "" : Response.descripcion.description);
        setStatusTable(Response.status);
        setPricesTable(Response.prices);
        setCuotaInicialTable(Response.cuota_inicial);
        setCategoryTable(Response.categorias);
        setDataSheetTable(Response.sheets);
        setLoading(true);
    }

    function setDataSheetTable(sheet) {
        let Header = ["Descripción única"];
        let Body = [];
        for (let index = 0; index < sheet.length; index++) {
            Body.push([sheet[index]["description"]]);
        }
        if (Body.length == 0) {
            SetDataSheet(null);
        }else{
            SetDataSheet({
                "Header" : Header,
                "Body" : Body
            });
        }
    }

    function setCategoryTable(categorys) {
        let Header = ["Nombre de categoría", "Código de categoría"];
        let Body = [];
        for (let index = 0; index < categorys.length; index++) {
            Body.push([categorys[index]["name"], categorys[index]["code"]]);
        }
        if (Body.length == 0) {
            SetCategorys(null);
        }else{
            SetCategorys({
                "Header" : Header,
                "Body" : Body
            });
        }
    }

    function setCuotaInicialTable(cuota_inicial) {
        let Header = ["Ciudad", "Monto"];
        let Body = [];
        for (let index = 0; index < cuota_inicial.length; index++) {
            Body.push([cuota_inicial[index]["store_name"], cuota_inicial[index]["monto"]]);
        }
        if (Body.length == 0) {
            SetCuotaInicial(null);
        }else{
            SetCuotaInicial({
                "Header" : Header,
                "Body" : Body
            });
        }
    }

    function setPricesTable(Prices){
        let Header = ["Ciudad", "Precio", "Oferta"];
        let Body = [];
        for (let index = 0; index < Prices.length; index++) {
            let store = Prices[index]["store_name"];
            let price = Prices[index]["price"] == null ? 0 : Prices[index]["price"]["price"];
            let special = Prices[index]["price"] == null ? 0 : Prices[index]["price"]["special_price"];
            Body.push([store, price, special]);
        }
        if (Body.length == 0) {
            SetPrices(null);
        }else{
            SetPrices({
                "Header" : Header,
                "Body" : Body
            });
        }
    }

    function setStatusTable(Status){
        let Header = ["Ciudad", "Estado"];
        let Body = [];
        for (let index = 0; index < Status.length; index++) {
            Body.push([Status[index]["store_name"], Status[index]["status"] ? "Activo" : "Desactivado"]);
        }
        if (Body.length == 0) {
            SetStatus(null);
        }else{
            SetStatus({
                "Header" : Header,
                "Body" : Body
            });
        }
    }
    
    function Navigate(){
        navigation.push("EditProduct", {"id_product":id_product,"TOKEN":TOKEN,"onGoBack": onGoBackAction});
    }

    function onGoBackAction(a){
        if (a) {
            setLoading(false);
            getProduct();
        }
    }

    function getProduct(){
        axios.get(URL_API_SHOW("product", +id_product),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data != null) {
                let Response = res.data.response;
                let ResponseText = res.data.responseText;
                SetProduct(Response);
                showMessage(ResponseText);
                navigation.setOptions({
                    title: Response.name,
                    headerRight: () => (<IconButton icon="pencil" iconColor={RED_DIS} size={30} onPress={() => Navigate()} />)
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
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <TextInput disabled mode='outlined' placeholder="Nombre" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Nombre" value={Name} onChangeText={text => SetName(text)} />
                </View>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <TextInput disabled mode='outlined' placeholder="Sku" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Sku" value={Sku} onChangeText={text => SetSku(text)} />
                </View>
                { Status!=null && (<CustomTable body={Status.Body} header={Status.Header} />) }
                { Prices!=null && (<CustomTable body={Prices.Body} header={Prices.Header} />) }
                { CuotaInicial!=null && (<CustomTable body={CuotaInicial.Body} header={CuotaInicial.Header} />) }
                { Categorys!=null && (<CustomTable body={Categorys.Body} header={Categorys.Header} />) }
                { DataSheet!=null && (<CustomTable body={DataSheet.Body} header={DataSheet.Header} />) }
                { Brand != null && (<TwoColumnBg width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Marca'} label2={Brand.name} />) }
                { Clacom != null && (<TwoColumnBg width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Clacom'} label2={Clacom.label} />) }
                { Type != null && (<TwoColumnBg width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Tipo'} label2={Type.type} />) }
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <Tarea name={"Descripción"} value={Description} disable={true} />
                </View>
                <View style={style.FloatSnackScroll}>    
                    <Snackbar visible={ShowMessage} onDismiss={() => hideMessaje()} action={{label: "Cerrar", onPress: () => hideMessaje()}}>
                        {Message}
                    </Snackbar>
                </View>
            </ScrollView>
        );
    }
};

export default ShowProduct;