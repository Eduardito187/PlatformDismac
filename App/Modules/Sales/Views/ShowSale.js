import React from 'react';
import { View } from 'react-native';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { MaterialIcons } from '@expo/vector-icons';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { RED_DIS, WHITE } from '../../Login/Style/css';
import axios from 'axios';
import { GET_HEADER_TOKEN, URL_API_SHOW } from '../../../Helpers/API';
import ProductList from './ProductsList';
import Facturacion from './Facturacion';
import Cliente from './Cliente';
import Envio from './Envio';
import Maps from '../../Partner/Views/Maps';
import { column, displayFlex, sectionQr } from '../../Catalog/Style/Two';
import { IconButton } from 'react-native-paper';
import ModalQR from '../../Catalog/Views/Components/ModalQR';

const Tabs = AnimatedTabBarNavigator();

const ShowSale = ({route, navigation }) => {
    const { id_sale, socket, TOKEN } = route.params;
    const [loading, setLoading] = React.useState(false);
    const [Venta, SetVenta] = React.useState(null);
    const [map, SetMap] = React.useState(null);
    const [Customer, SetCustomer] = React.useState(null);
    const [Municipio, SetMunicipio] = React.useState(null);
    const [isModalVisible, setModalVisible] = React.useState(false);
    
    React.useEffect(() => {
        getDataApi();
    }, []);

    function showModal() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    function getDataApi(){
        axios.get(URL_API_SHOW("order", id_sale),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SetVenta(res.data.response);
                if (res.data.response.customer != null){
                    let customer = res.data.response.customer.nombre+" "+res.data.response.customer.apellido_paterno+" "+res.data.response.customer.apellido_materno;
                    SetCustomer(customer);
                }
                if (res.data.response.address != null){
                    SetMunicipio(res.data.response.address.Municipio);
                }
                SetMap({"latitude": parseFloat(res.data.response.address.Localizacion.latitud),"longitude": parseFloat(res.data.response.address.Localizacion.longitud),"latitudeDelta": 0.0922,"longitudeDelta": 0.0421});
                
                navigation.setOptions({
                    headerRight: () => (
                        <View style={[{width: 45,marginRight: 15},displayFlex]}>
                            <View style={[sectionQr,column]}>
                                <IconButton icon="qrcode" iconColor={RED_DIS} size={30} onPress={() => showModal()} />
                            </View>
                        </View>)
                });
                setLoading(true);
            }
        }).catch(err => {
            //
        });
    }

    if (loading === false) {
        return (<LoadingPage />);
    }else{
        return (
            <>
                <Tabs.Navigator tabBarOptions={{activeTintColor: WHITE,inactiveTintColor: RED_DIS,activeBackgroundColor: RED_DIS, inactiveBackgroundColor: WHITE }} tabBarBackground={RED_DIS}>
                    <Tabs.Screen name="Facturación" component={Facturacion} initialParams={{ Venta: Venta, socket : socket, TOKEN :  TOKEN }} options={{tabBarIcon: ({ focused, color, size }) => (<MaterialIcons name="ballot" size={size ? size : 24} color={focused ? color : RED_DIS} focused={focused} />)}}/>
                    <Tabs.Screen name="Productos" component={ProductList} initialParams={{ Venta: Venta, socket : socket, TOKEN :  TOKEN }} options={{tabBarIcon: ({ focused, color, size }) => (<MaterialIcons name="view-list" size={size ? size : 24} color={focused ? color : RED_DIS} focused={focused} />)}}/>
                    <Tabs.Screen name="Cliente" component={Cliente} initialParams={{ Venta: Venta, socket : socket, TOKEN :  TOKEN }} options={{tabBarIcon: ({ focused, color, size }) => (<MaterialIcons name="account-circle" size={size ? size : 24} color={focused ? color : RED_DIS} focused={focused} />)}}/>
                    <Tabs.Screen name="Envío" component={Envio} initialParams={{ Venta: Venta, socket : socket, TOKEN :  TOKEN }} options={{tabBarIcon: ({ focused, color, size }) => (<MaterialIcons name="directions" size={size ? size : 24} color={focused ? color : RED_DIS} focused={focused} />)}}/>
                    <Tabs.Screen name="Mapa" component={Maps} initialParams={{ map : map, socket : socket, TOKEN : TOKEN, Customer : Customer, Municipio : Municipio }} options={{tabBarIcon: ({ focused, color, size }) => (<MaterialIcons name="map" size={size ? size : 24} color={focused ? color : RED_DIS} focused={focused} />)}}/>
                </Tabs.Navigator>
                <ModalQR closeModal={() => closeModal()} isModalVisible={isModalVisible} key={"SaleOrder"} type={"SaleOrder"} value={id_sale} />
            </>
        );
    }
};

export default ShowSale;