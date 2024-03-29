import React from 'react';
import { View, ScrollView, Text, Animated, TouchableOpacity, FlatList, Image } from 'react-native';
import axios from 'axios';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { BLACK, Button_Red_Dis, CONTENT_ANIMATION_PICTURE, CONTENT_BODY, CONTENT_PICTURE, CONTENT_PICTURE_RENDER, CONTENT_PICTURE_RENDER_ITEM, CONTENT_PRICE, Height_30, ICON_LINK, JUSTIFY_CONTENT, LOCATE, Margin_5, Margin_L5, Margin_Top_5, NAME, Only_Height_40, PADDING_BOTTOM_10, PADDING_HORIZONTAL_16, PICTURE_ANIMATION, PRODUCT_CONTENT_INFORMATION, PRODUCT_DESCRIPTION, PRODUCT_INFORMATION, PRODUCT_NAME_CONTENT, RED_DIS, SECTION_BOTTOM, Section_Card_Title } from '../../Login/Style/css';
import { StatusBar } from 'expo-status-bar';
import { GET_HEADER_TOKEN, GET_STORES, URL_API_SHOW, generateCustomId } from '../../../Helpers/API';
import { SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import MedidasComerciales from './Components/MedidasComerciales';
import CaracteristicasUnicas from './Components/CaracteristicasUnicas';
import PartnerLink from './Components/PartnerLink';
import TwoColumnBg from '../../Catalog/Views/Components/TwoColumnBg';
import ModalStore from './Components/ModalStore';
import { displayFlex } from '../../Catalog/Style/Two';
import { Button } from 'react-native-paper';
import Name from './Components/Name';
import Description from './Components/Description';
import ProductIniciales from './Components/ProductIniciales';
import ProductMinicuotas from './Components/ProductMinicuotas';
import ProductPrice from './Components/ProductPrice';
import ProductStatus from './Components/ProductStatus';
/** Components */

const ViewProduct = ({ route, navigation }) => {
    const { TOKEN, id_product } = route.params;
    const widthView = windowWidth - 45;
    const [CurrentStore, SetCurrentStore] = React.useState("");
    const [Estados, SetEstados] = React.useState(null);
    const [Iniciales, SetIniciales] = React.useState(null);
    const [Precios, SetPrecios] = React.useState(null);
    const [Minicuotas, SetMinicuotas] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [Product, SetProduct] = React.useState(null);
    const [ToogleStore, SetToogleStore] = React.useState(false);
    const [PopUpStore, SetPopUpStore] = React.useState(false);
    const [StoresShow, SetStoresShow] = React.useState([]);
    const width = windowWidth;
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    const EventAnimated = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false });
    const ToogleModalStore = () => SetToogleStore(!ToogleStore);
    const renderProduct = ({ item, index }) => {
        return (
            <View key={generateCustomId()} style={[{ width: width }, CONTENT_PICTURE_RENDER]}>
                <Image key={generateCustomId()} source={{ uri: item.url }} style={CONTENT_PICTURE_RENDER_ITEM} />
            </View>
        );
    };

    React.useEffect(() => {
        setStores();
    }, []);

    async function setStores() {
        let array_store = await GET_STORES();
        SetStoresShow(array_store);
        getProduct(array_store);
    }

    function showPopUpStore() {
        SetPopUpStore(true);
    }

    function closePopUpStore() {
        SetPopUpStore(false);
    }

    function getProduct(array_store) {
        axios.get(URL_API_SHOW("product", +id_product), GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data != null) {
                let store_name = array_store[0]["name"];
                SetCurrentStore(store_name);
                loadHeaderPage(res.data.response, store_name);
                SetProduct(res.data.response);
                setLoading(true);
            }
        }).catch(err => {
            //
        });
    }

    function loadHeaderPage(producto, store_name) {
        navigation.setOptions({
            headerRight: () => (
                <View style={[{ marginRight: 15 }, displayFlex]}>
                    <Button style={[Button_Red_Dis]} onPress={() => showPopUpStore()}>
                        <Text style={NAME}>{store_name}</Text>
                    </Button>
                </View>)
        });
        changeValueMultiStore(producto, store_name);
    }

    function selectedStoreCustom(a) {
        if (a.length > 0) {
            let store_name = a[0];
            SetCurrentStore(store_name);
            loadHeaderPage(Product, store_name);
            closePopUpStore();
        }
    }

    function changeValueMultiStore(producto, store_name) {
        SetEstados(getStoreEstados(producto, store_name));
        SetIniciales(getStoreIniciales(producto, store_name));
        SetPrecios(getStorePrecios(producto, store_name));
        SetMinicuotas(getStoreMinicuotas(producto, store_name));
    }

    function getStoreEstados(producto, store_name) {
        for (let index = 0; index < producto.status.length; index++) {
            if (producto.status[index]["store_name"] == store_name) {
                return producto.status[index];
            }
        }
        return null;
    }

    function getStoreIniciales(producto, store_name) {
        for (let index = 0; index < producto.cuota_inicial.length; index++) {
            if (producto.cuota_inicial[index]["store_name"] == store_name) {
                return producto.cuota_inicial[index];
            }
        }
        return null;
    }

    function getStorePrecios(producto, store_name) {
        for (let index = 0; index < producto.prices.length; index++) {
            if (producto.prices[index]["store_name"] == store_name) {
                return producto.prices[index];
            }
        }
        return null;
    }

    function getStoreMinicuotas(producto, store_name) {
        for (let index = 0; index < producto.minicuotas.length; index++) {
            if (producto.minicuotas[index]["store_name"] == store_name) {
                return producto.minicuotas[index];
            }
        }
        return null;
    }

    if (loading === false) {
        return (<LoadingPage />);
    } else {
        return (
            <View key={generateCustomId()} style={CONTENT_BODY}>
                <StatusBar backgroundColor={RED_DIS} style="light" />
                <ScrollView key={generateCustomId()} showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                    <View key={generateCustomId()} style={CONTENT_PICTURE}>
                        <FlatList key={generateCustomId()} data={Product.pictures} horizontal renderItem={renderProduct} keyExtractor={item => item.id} showsHorizontalScrollIndicator={false} decelerationRate={0.8} snapToInterval={width} bounces={false} onScroll={EventAnimated} />
                        <View key={generateCustomId()} style={CONTENT_ANIMATION_PICTURE}>
                            {
                                Product.pictures.length > 1 && (
                                    Product.pictures.map((data, index) => {
                                        let opacity = position.interpolate({ inputRange: [index - 1, index, index + 1], outputRange: [0.2, 1, 0.2], extrapolate: 'clamp' });
                                        return (
                                            <Animated.View key={generateCustomId()} style={[PICTURE_ANIMATION, { backgroundColor: BLACK, opacity, width: parseInt(75 / Product.pictures.length) + "%" }]}></Animated.View>
                                        );
                                    })
                                )
                            }
                        </View>
                    </View>
                    <View style={[PRODUCT_INFORMATION, SECTION_BOTTOM]}>
                        {Estados != null && (<ProductStatus status={Estados.status} />)}
                        <Name name={Product.name} url={""} />
                    </View>
                    <View style={[PRODUCT_INFORMATION]}>
                        {Product.descripcion != null && (<Description description={Product.descripcion.description} />)}
                        {Precios != null && (<ProductPrice Precios={Precios} />)}
                        {Iniciales != null && (<ProductIniciales Iniciales={Iniciales} />)}
                        {Minicuotas != null && (<ProductMinicuotas Minicuotas={Minicuotas} />)}
                    </View>
                    <View style={[PRODUCT_INFORMATION, SECTION_BOTTOM]}>
                        <CaracteristicasUnicas CaracteristicasUnicas={Product.sheets} />
                        <MedidasComerciales MedidaComercial={Product.medidas_comerciales} />
                        {Product.brand != null && (<TwoColumnBg key={generateCustomId()} width={widthView} column1={widthView * 0.75} column2={widthView * 0.25} label1={'Marca'} label2={Product.brand.name} />)}
                        {Product.partner != null && (<PartnerLink Partner={Product.partner} TOKEN={TOKEN} Socket={null} />) }
                        <ModalStore closeModal={() => closePopUpStore()} selectedStore={(a) => selectedStoreCustom(a)} CurrentStore={CurrentStore} isModalVisible={PopUpStore} key={"modal_store"} type={"stores"} StoreSelect={StoresShow} />
                    </View>
                </ScrollView>
            </View>
        );
    }
};

export default ViewProduct;