import React from 'react';  
import { View, Animated, Image, Easing, Text, ScrollView  } from 'react-native';
import axios from 'axios';
import {Page, SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY, SCROLL_STYLE} from "./../../../Themes/Dismac/ThemeDismac";
import { Badge, DataTable, ProgressBar } from 'react-native-paper';
import { GET_HEADER_ACCOUNT, GET_HEADER_TOKEN, URL_API } from '../../../Helpers/API';
import LoadingPage from './Components/LoadingPage';
import ImageUrl from '../../../Components/ImageUrl';
import { RED_DIS } from '../../Login/Style/css';
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
                                    <View key={Math.random()+'_Products_'+Math.random()} style={{width: 100, height: 150, borderRadius: 5, backgroundColor: "white", margin: 5,shadowColor: "#000",shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8, position: 'relative'}}>
                                        <View style={{position: 'absolute',left: 0, right: 0, top: 0, bottom: 120}}>
                                            <ImageUrl style={{width: 100, height: 120}} url={product.image} />
                                        </View>
                                        <View style={{position: 'absolute',left: 0, right: 0, top: 120, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{fontWeight: 'bold', color: RED_DIS, fontSize: 10}}>{product.sku}</Text>
                                        </View>
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
                                    <View key={Math.random()+'_Categorys_'+Math.random()} style={{width: 100, height: 150, borderRadius: 5, backgroundColor: "white", margin: 5,shadowColor: "#000",shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8, position: 'relative'}}>
                                        <View style={{position: 'absolute',left: 0, right: 0, top: 0, bottom: 120}}>
                                            <ImageUrl style={{width: 100, height: 120}} url={category.image} />
                                        </View>
                                        <View style={{position: 'absolute',left: 0, right: 0, top: 120, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{fontWeight: 'bold', color: RED_DIS}}>{category.name}</Text>
                                        </View>
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
                        <Campains width={windowWidth-10} height={100} data={Campain} />
                        {CategoryComponent}
                        {ProductComponent}
                    </ScrollView>
                </View>
            </View>
        );
    }
};

export default LandingHome;