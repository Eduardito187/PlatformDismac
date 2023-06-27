import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { windowWidth } from '../../../Helpers/GetMobil';
import { Snackbar, List, TextInput, IconButton, Chip, Badge } from 'react-native-paper';
import { Height_30, Margin_5, Margin_Top_5, Only_Height_40, RED_DIS, ROW_SECTION, WHITE } from '../../Login/Style/css';
import { GET_HEADER_TOKEN, URL_API_SHOW } from '../../../Helpers/API';
import { MarginBottomM7, MarginBottomM9, MarginContentChip, Section_Scroll, Size_15_Bold, Width_Max, style } from '../../Login/Style/style';
import TwoColumnBg from '../../Catalog/Views/Components/TwoColumnBg';
import Tarea from '../../Catalog/Views/Components/Tarea';
import CustomTable from '../../Catalog/Views/Components/CustomTable';
import ModalQR from '../../Catalog/Views/Components/ModalQR';
import { StatusBar } from 'expo-status-bar';
import { alingContentStatus, column, displayFlex } from '../../Catalog/Style/Two';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import Price from '../../Catalog/Views/Components/Price';
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
    const [state, SetState] = React.useState(false);
    const [price, SetPrice] = React.useState(false);
    const [initial, SetInitial] = React.useState(false);
    const [category, SetCategory] = React.useState(false);
    const [sheet, SetSheet] = React.useState(false);
    const [medidas, SetMedidas] = React.useState(false);
    const [MEDIDAS, SETMEDIDAS] = React.useState(null);
    const [Minicuotas, SetMinicuotas] = React.useState(null);
    const [mini, SetMini] = React.useState(false);
    const [Warehouse, SetWarehouse] = React.useState(null);
    const [whs, SetWhs] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);
    
    const ToogleState = () => SetState(!state);
    const TooglePrice = () => SetPrice(!price);
    const ToogleInitials = () => SetInitial(!initial);
    const ToogleCategory = () => SetCategory(!category);
    const ToogleSheet = () => SetSheet(!sheet);
    const ToogleMedidas = () => SetMedidas(!medidas);
    const ToogleMini = () => SetMini(!mini);
    const ToogleWhs = () => SetWhs(!whs);

    function showModal() {
        setModalVisible(true);
    }
    function closeModal() {
        setModalVisible(false);
    }

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
        setMedidasComerciales(Response.medidas_comerciales);
        setMinicuotasTable(Response.minicuotas);
        setWarehouseTable(Response.warehouses);
        setLoading(true);
    }

    function setWarehouseTable(warehouses){
        let Header = ["Ciudad", "Nombre almacen", "Código almacen", "Stock almacen"];
        let Body = [];
        for (let index = 0; index < warehouses.length; index++) {
            for (let j = 0; j < warehouses[index]["warehouse"].length; j++) {
                let wh = warehouses[index]["warehouse"][j];
                Body.push([warehouses[index]["store_name"], wh["name"], wh["code"], wh["stock"]]);
            }
        }
        if (Body.length == 0) {
            SetWarehouse(null);
        }else{
            SetWarehouse({
                "Header" : Header,
                "Body" : Body
            });
        }
    }

    function setMinicuotasTable(minicuotas) {
        let Header = ["Ciudad", "Meses", "Cuotas", "Monto"];
        let Body = [];
        for (let index = 0; index < minicuotas.length; index++) {
            for (let j = 0; j < minicuotas[index]["minicuotas"].length; j++) {
                let mini = minicuotas[index]["minicuotas"][j];
                Body.push([minicuotas[index]["store_name"], mini["meses"], mini["cuotas"], mini["monto"]]);
            }
        }
        if (Body.length == 0) {
            SetMinicuotas(null);
        }else{
            SetMinicuotas({
                "Header" : Header,
                "Body" : Body
            });
        }
    }

    function setMedidasComerciales(medidas_comerciales){
        if (medidas_comerciales != null) {
            let Header = ["Medida", "Valor"];
            let Body = [];
            if (medidas_comerciales.longitud != null){
                Body.push(["Longitud", medidas_comerciales.longitud]);
            }
            if (medidas_comerciales.ancho != null){
                Body.push(["Ancho", medidas_comerciales.ancho]);
            }
            if (medidas_comerciales.altura != null){
                Body.push(["Alto", medidas_comerciales.altura]);
            }
            if (medidas_comerciales.volumen != null){
                Body.push(["Volumen", medidas_comerciales.volumen]);
            }
            if (medidas_comerciales.peso != null){
                Body.push(["Peso", medidas_comerciales.peso]);
            }
            if (Body.length == 0) {
                SETMEDIDAS(null);
            }else{
                SETMEDIDAS({
                    "Header" : Header,
                    "Body" : Body
                });
            }
        }
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
        SetCuotaInicial(cuota_inicial);
    }

    function setPricesTable(Prices){
        SetPrices(Prices);
    }

    function setStatusTable(Status){
        SetStatus(Status);
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

    function viewProduct() {
        navigation.push("ViewProduct", {"id_product":id_product,"TOKEN":TOKEN});
    }

    function getProduct(){
        axios.get(URL_API_SHOW("product", +id_product),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data != null) {
                let Response = res.data.response;
                let ResponseText = res.data.responseText;
                SetProduct(Response);
                showMessage(ResponseText);
                navigation.setOptions({
                    headerRight: () => (
                        <View style={[{width: 140,marginRight: 15},displayFlex]}>
                            <View style={[{width: 40,paddingRight:10},column]}>
                                <IconButton icon="qrcode" iconColor={RED_DIS} size={30} onPress={() => showModal()} />
                            </View>
                            <View style={[{width: 40,paddingRight:10},column]}>
                                <IconButton icon="eye" iconColor={RED_DIS} size={30} onPress={() => viewProduct()} />
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
        return (<LoadingPage />);
    }else{
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={Section_Scroll}>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <TextInput disabled mode='outlined' placeholder="Nombre" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Nombre" value={Name} />
                </View>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <TextInput disabled mode='outlined' placeholder="Sku" selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label="Sku" value={Sku} />
                </View>
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <Tarea name={"Descripción"} value={Description} disable={true} />
                </View>
                { Brand != null && (<TwoColumnBg width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Marca'} label2={Brand.name} />) }
                { Clacom != null && (<TwoColumnBg width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Clacom'} label2={Clacom.label} />) }
                { Type != null && (<TwoColumnBg width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Tipo'} label2={Type.type} />) }
                { Status!=null && (
                    <View style={[ROW_SECTION, Margin_Top_5]}>
                        <List.Accordion title="Estados del producto" expanded={state} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleState}>
                            <View style={[Width_Max, alingContentStatus]}>
                                {
                                    Status.map((state) => {
                                        return (
                                            <Chip icon={state.status ? "check" : "close"} key={Math.random()+'_Product_Status_'+Math.random()} style={Margin_5} onPress={() => console.log('Pressed')}>{state.store_name}</Chip>
                                        )
                                    })
                                }
                            </View>
                        </List.Accordion>
                    </View>
                ) }
                { Prices!=null && (
                    <View style={[ROW_SECTION, Margin_Top_5]}>
                        <List.Accordion title="Precios del producto" expanded={price} left={props => <List.Icon {...props} icon="information" />} onPress={TooglePrice}>
                            <View style={[Width_Max, alingContentStatus]}>
                                {
                                    Prices.map((state) => {
                                        return (
                                            <Chip key={Math.random()+'_Product_Prices_'+Math.random()} style={[Margin_5, Only_Height_40]} onPress={() => console.log('Pressed')}>
                                                <View style={[Width_Max, alingContentStatus]}>
                                                    <View style={[Height_30, MarginContentChip]}>
                                                        <Text style={Size_15_Bold}>{state.store_name}</Text>
                                                    </View>
                                                    <View style={[Height_30, MarginBottomM7]}>
                                                        <Price Price={state.price} />
                                                    </View>
                                                </View>
                                            </Chip>
                                        )
                                    })
                                }
                            </View>
                        </List.Accordion>
                    </View>
                ) }
                { CuotaInicial!=null && (
                    <View style={[ROW_SECTION, Margin_Top_5]}>
                        <List.Accordion title="Cuotas iniciales del producto" expanded={initial} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleInitials}>
                            <View style={[Width_Max, alingContentStatus]}>
                                {
                                    CuotaInicial.map((state) => {
                                        return (
                                            <Chip key={Math.random()+'_Product_CuotaInicial_'+Math.random()} style={[Margin_5, Only_Height_40]} onPress={() => console.log('Pressed')}>
                                                <View style={[Width_Max, alingContentStatus]}>
                                                    <View style={[Height_30, MarginContentChip]}>
                                                        <Text style={Size_15_Bold}>{state.store_name}</Text>
                                                    </View>
                                                    <View style={[Height_30, MarginBottomM9]}>
                                                        <Badge>{state.monto+" Bs"}</Badge>
                                                    </View>
                                                </View>
                                            </Chip>
                                        )
                                    })
                                }
                            </View>
                        </List.Accordion>
                    </View>
                ) }
                { Categorys!=null && (
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <List.Accordion title="Categorías del producto" expanded={category} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleCategory}>
                        <CustomTable key={Math.random()+"Categorys"+Math.random()} body={Categorys.Body} header={Categorys.Header} />
                    </List.Accordion>
                </View>
                ) }
                { DataSheet!=null && (
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <List.Accordion title="Descripciones unicas del productos" expanded={sheet} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleSheet}>
                        <CustomTable key={"DataSheet"} body={DataSheet.Body} header={DataSheet.Header} />
                    </List.Accordion>
                </View>
                ) }
                { MEDIDAS!=null && (
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <List.Accordion title="Medidas comerciales" expanded={medidas} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleMedidas}>
                        <CustomTable key={"MEDIDAS"} body={MEDIDAS.Body} header={MEDIDAS.Header} />
                    </List.Accordion>
                </View>
                ) }
                { Minicuotas!=null && (
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <List.Accordion title="Minicuotas" expanded={mini} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleMini}>
                        <CustomTable key={"Minicuotas"} body={Minicuotas.Body} header={Minicuotas.Header} />
                    </List.Accordion>
                </View>
                ) }
                { Warehouse!=null && (
                <View style={[ROW_SECTION, Margin_Top_5]}>
                    <List.Accordion title="Almacenes" expanded={whs} left={props => <List.Icon {...props} icon="information" />} onPress={ToogleWhs}>
                        <CustomTable key={"Warehouse"} body={Warehouse.Body} header={Warehouse.Header} />
                    </List.Accordion>
                </View>
                ) }
                <View style={style.FloatSnackScroll}>    
                    <Snackbar visible={ShowMessage} onDismiss={() => hideMessaje()} action={{label: "Cerrar", onPress: () => hideMessaje()}}>
                        {Message}
                    </Snackbar>
                </View>
                <ModalQR closeModal={() => closeModal()} isModalVisible={isModalVisible} key={"product"} type={"product"} value={Sku} />
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </ScrollView>
        );
    }
};

export default ShowProduct;