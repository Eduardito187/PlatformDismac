import React from 'react';  
import { View, Animated, Image, TouchableOpacity, Text, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios';
import {Page, SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY, SCROLL_STYLE} from "./../../../Themes/Dismac/ThemeDismac";
import { Badge, DataTable, ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { GET_HEADER_ACCOUNT, GET_HEADER_TOKEN, URL_API } from '../../../Helpers/API';
import LoadingPage from './Components/LoadingPage';
import ImageUrl from '../../../Components/ImageUrl';
import { CARD_CATEGORY, CARD_PRODUCT, DESGRADE_ARRAY, DESGRADE_CONTENT, DESGRADE_CONTENT_CATEGORY, IMAGE_BG, IMAGE_MAX, IMAGE_STYLE, LINEAR_GRADIENT, NAME_TEXT, RED_DIS, SKU_TEXT } from '../../Login/Style/css';
import { windowWidth } from '../../../Helpers/GetMobil';
import { CONTAIN_CENTER, ROW } from '../../Catalog/Style/Row';
import Campains from './Components/Campains';
import Header from './Components/Header';

const LandingHome = (props) => {
    const [CategoryComponent, SetCategoryComponent] = React.useState(null);
    const [ProductComponent, SetProductComponent] = React.useState(null);
    const [Campain, SetCampain] = React.useState([
        {
            "ID":1,
            "Social":"Facebook"
        },
        {
            "ID":2,
            "Social":"Instagram"
        },
        {
            "ID":3,
            "Social":"You Tube"
        },
        {
            "ID":4,
            "Social":"Whatsapp"
        }
    ]);
    const [TotalsCatalog, SetTotalsCatalog] = React.useState(null);
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [Navigation, SetNavigation] = React.useState(props.navigation);
    const [Load, SetLoad] = React.useState(false);
    
    React.useEffect(() => {
        getCategoryLast();
        getProductLast();
        SetTotalsCatalogComponent();
        SetLoad(true);
    }, []);

    function getCategoryLast(){
        axios.get(URL_API("partner/lastHistoryCategory"),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                setCategoryComponent(res.data.response);
            }else{
                setCategoryComponent(null);
            }
        }).catch(err => {
            setCategoryComponent(null);
        });
    }

    function getProductLast(){
        axios.get(URL_API("partner/lastHistoryProducts"),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                setProductComponent(res.data.response);
            }else{
                setProductComponent(null);
            }
        }).catch(err => {
            setProductComponent(null);
        });
    }

    function viewProduct(id_product) {
        Navigation.push("ViewProduct", {"id_product":id_product,"TOKEN":TOKEN});
    }

    function setProductComponent(ProductsData){
        if (ProductsData.length > 0) {
            SetProductComponent((
                <View style={{backgroundColor: '#FFFFFF', width: windowWidth-10, padding: 10, borderRadius: 10, marginTop: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, color: RED_DIS}}>Productos {"("+ProductsData.length+")"}</Text>
                    <View style={{width: windowWidth-30, padding: 5}}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            ProductsData.map((product) => {
                                return (
                                    <TouchableOpacity onPress={() => viewProduct(product.id)} key={Math.random()+'_Products_'+Math.random()} style={CARD_PRODUCT}>
                                        <ImageBackground source={{uri: product.image}} style={IMAGE_MAX} imageStyle={{borderRadius: 10}}>
                                            <View style={DESGRADE_CONTENT}>
                                                <LinearGradient colors={DESGRADE_ARRAY} style={LINEAR_GRADIENT}>
                                                    <Text style={NAME_TEXT}>{product.name}</Text>
                                                    <Text style={SKU_TEXT}>{product.sku}</Text>
                                                </LinearGradient>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        </ScrollView>
                    </View>
                </View>
            ));
        }
    }

    function setCategoryComponent(CategorysData){
        if (CategorysData.length > 0) {
            SetCategoryComponent((
                <View style={{backgroundColor: '#FFFFFF', width: windowWidth-10, padding: 10, borderRadius: 10, marginTop: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, color: RED_DIS}}>Categorías {"("+CategorysData.length+")"}</Text>
                    <View style={{width: windowWidth-30, padding: 5}}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            CategorysData.map((category) => {
                                return (
                                    <View key={Math.random()+'_Categorys_'+Math.random()} style={CARD_CATEGORY}>
                                        <ImageBackground source={{uri: category.image}} style={IMAGE_MAX} imageStyle={{borderRadius: 10}}>
                                            <View style={DESGRADE_CONTENT_CATEGORY}>
                                                <LinearGradient colors={DESGRADE_ARRAY} style={LINEAR_GRADIENT}>
                                                    <Text style={NAME_TEXT}>{category.name}</Text>
                                                </LinearGradient>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                )
                            })
                        }
                        </ScrollView>
                    </View>
                </View>
            ));
        }
    }

    function SetTotalsCatalogComponent(){
        SetTotalsCatalog((
            <View key={Math.random()+'_Categorys_'+Math.random()} style={{marginTop: 20,width: windowWidth-20,borderRadius: 5, backgroundColor: "#FFFFFF", margin: 5,shadowColor: "#000",shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8, position: 'relative'}}>
                <View style={{padding: 5}}>
                    <View style={[ROW,{height: 50}]}>
                        <View style={[{width: '45%', padding: 5}]}>
                            <Text>Santa Cruz de la Sierra</Text>
                        </View>
                        <View style={{width: '55%', padding: 10}}>
                            <ProgressBar progress={0.5} style={{borderRadius:5}} color={RED_DIS} />
                        </View>
                    </View>
                    <View style={[ROW,{height: 50}]}>
                        <View style={[{width: '45%', padding: 5}]}>
                            <Text>Montero</Text>
                        </View>
                        <View style={{width: '55%', padding: 10}}>
                            <ProgressBar progress={0.5} style={{borderRadius:5}} color={RED_DIS} />
                        </View>
                    </View>
                </View>
            </View>
        ));
    }

    if (Load === false) {
        return (<LoadingPage />);
    }else{
        return (
            <View style={SCREEN_RELATIVE}>
                <View style={SCREEN_ABSOLUTE_HEADER}>
                    <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} />
                </View>
                <View style={SCREEN_ABSOLUTE_BODY}>
                    <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                        {TotalsCatalog}
                        <Campains width={windowWidth-20} height={100} data={Campain} />
                        {CategoryComponent}
                        {ProductComponent}
                    </ScrollView>
                </View>
            </View>
        );
    }
};

export default LandingHome;