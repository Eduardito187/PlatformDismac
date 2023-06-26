import React from 'react';  
import { View, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import { windowWidth } from '../../../Helpers/GetMobil';
import { PLO_DIS, RED_DIS, Section_Content_Back, Section_Content_One, Section_Content_Two, Section_Flex_Width, Text_Variant_Const, WHITE } from '../../Login/Style/css';
import { StatusBar } from 'expo-status-bar';
import { SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { Avatar, Divider, IconButton, Text } from 'react-native-paper';
import { GET_HEADER_TOKEN, URL_API_SHOW } from '../../../Helpers/API';
import TwoColumn from '../../Catalog/Views/Components/TwoColumn';
import { column, displayFlex } from '../../Catalog/Style/Two';
import OptionSale from '../../Catalog/Views/Components/OptionSale';
import ImagenAnimation from '../../../Components/ImagenAnimation';
import OptionTable from '../../Catalog/Views/Components/OptionTable';
import ProductOption from '../../Catalog/Views/Components/ProductOption';
import { Section_Flex, Section_Sale } from '../../Login/Style/style';

/** Components */

const ShowSale = ({route, navigation }) => {
    const { id_sale,socket,TOKEN } = route.params;
    const widthView = windowWidth-10;
    const [loading, setLoading] = React.useState(false);
    const [Venta, SetVenta] = React.useState(null);
    const [Customer, SetCustomer] = React.useState("");
    const [CustomerData, SetCustomerData] = React.useState(null);

    React.useEffect(() => {
        getDataApi();
    }, []);

    function getDataApi(){
        axios.get(URL_API_SHOW("order", id_sale),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                loadVenta(res.data.response);
                SetVenta(res.data.response);
                setLoading(true);
            }
        }).catch(err => {
            //
        });
    }

    function loadVenta(venta) {
        SetCustomerData(venta.customer);
        let customer = venta.customer.nombre+" "+venta.customer.apellido_paterno+" "+venta.customer.apellido_materno;
        SetCustomer(customer);
    }
    
    if (loading === false || Venta === null) {
        return (<LoadingPage />);
    }else{
        return (
            <SafeAreaView style={Section_Flex}>
                <View style={Section_Content_One}>
                    <View style={Section_Sale}>
                        <Text variant="titleMedium">{Venta.NroProforma}</Text>
                    </View>
                    <View style={Section_Sale}>
                        <Text variant="bodyMedium">{Venta.Total} Bs</Text>
                    </View>
                    <View style={Section_Content_Back}>
                        <IconButton icon={"arrow-left"} onPress={() => navigation.goBack()} size={24} iconColor={WHITE} />
                    </View>
                </View>
                <View style={Section_Content_Two}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text variant="titleMedium" style={Text_Variant_Const}>Datos de venta</Text>
                        <View style={Section_Sale}>
                            <View style={Section_Flex_Width}>
                                <OptionSale margin={true} icon={"ballot"} title={"Nro Control"} value={Venta.NroControl} />
                                <OptionSale margin={true} icon={"ballot"} title={"Nro Factura"} value={Venta.NroFactura} />
                                <OptionSale margin={null} icon={"ballot"} title={"Nro Proforma"} value={Venta.NroProforma} />
                            </View>
                        </View>
                        <Divider key={"separation_1"} bold={true} />
                        <Text variant="titleMedium" style={Text_Variant_Const}>Datos del cliente</Text>
                        <View style={Section_Sale}>
                            <View style={Section_Flex_Width}>
                                <OptionSale margin={true} icon={"account"} title={"Cliente"} value={Customer} />
                                <OptionSale margin={true} icon={"mail"} title={"Email"} value={CustomerData.email} />
                                <OptionSale margin={true} icon={"mail"} title={"Telefono"} value={CustomerData.num_telefono} />
                                <OptionSale margin={true} icon={"mail"} title={"Nro documento"} value={CustomerData.num_documento} />
                                <OptionSale margin={true} icon={"mail"} title={"Tipo de documento"} value={CustomerData.tipo_documento} />
                                <OptionSale margin={true} icon={"ip"} title={"Ip"} value={Venta.ip} />
                            </View>
                        </View>
                        <Divider key={"separation_3"} bold={true} />
                        <Text variant="titleMedium" style={Text_Variant_Const}>Detalles de venta</Text>
                        <View style={Section_Sale}>
                            {
                                Venta.detail_order != null && Venta.detail_order.length > 0 && (
                                    <OptionTable left={"Producto"} right={"Precio"} />
                                ) 
                            }
                            {
                                Venta.detail_order.map((item) => {
                                    return (
                                        <ProductOption key={Math.random()+'_Product_Item_'+Math.random()} Product={item} />
                                    )
                                })
                            }
                            <OptionTable left={"SubTotal"} right={Venta.SubTotal+" Bs"} />
                            <OptionTable left={"Descuentos"} right={"-"+Venta.Descuentos+" Bs"} />
                            <OptionTable left={"Total"} right={Venta.Total+" Bs"} />
                        </View>
                        <Divider key={"separation_2"} bold={true} />
                        <Text variant="titleMedium" style={Text_Variant_Const}>Dirección de envío</Text>
                        <View style={Section_Sale}>
                            <View style={Section_Flex_Width}>
                                <OptionSale margin={true} icon={"map"} title={"País"} value={Venta.address.Pais} />
                                <OptionSale margin={true} icon={"map"} title={"Ciudad"} value={Venta.address.Ciudad} />
                                <OptionSale margin={true} icon={"map"} title={"Municipio"} value={Venta.address.Municipio} />
                                <OptionSale margin={true} icon={"map"} title={"Dirección"} value={Venta.address.address_extra.address} />
                                <OptionSale margin={true} icon={"map"} title={"Dirección adicional"} value={Venta.address.address_extra.extra} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <StatusBar backgroundColor={"transparent"} style="light" />
            </SafeAreaView>
        );
    }
};

export default ShowSale;