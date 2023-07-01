import React from 'react';  
import { View, ScrollView } from 'react-native';
import axios from 'axios';
import {SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY, SCROLL_STYLE} from "./../../../Themes/Dismac/ThemeDismac";
import { GET_HEADER_TOKEN, URL_API } from '../../../Helpers/API';
import LoadingPage from './Components/LoadingPage';
import { windowWidth } from '../../../Helpers/GetMobil';
import Campains from './Components/Campains';
import Header from './Components/Header';
import CategoryLast from './Components/CategoryLast';
import ProductLast from './Components/ProductLast';
import TwoActionColumn from '../../Catalog/Views/Components/TwoActionColumn';

const LandingHome = (props) => {
    const [Categorys, SetCategorys] = React.useState([]);
    const [Products, SetProducts] = React.useState([]);
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
        },
        {
            "ID":5,
            "Social":"Twitter"
        },
        {
            "ID":6,
            "Social":"Linkedin"
        }
    ]);
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [Navigation, SetNavigation] = React.useState(props.navigation);
    const [Load, SetLoad] = React.useState(false);
    
    React.useEffect(() => {
        getCategoryLast();
        getProductLast();
        SetLoad(true);
    }, []);

    function getCategoryLast(){
        axios.get(URL_API("partner/lastHistoryCategory"),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SetCategorys(res.data.response);
            }else{
                SetCategorys([]);
            }
        }).catch(err => {
            SetCategorys([]);
        });
    }

    function getProductLast(){
        axios.get(URL_API("partner/lastHistoryProducts"),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SetProducts(res.data.response);
            }else{
                SetProducts([]);
            }
        }).catch(err => {
            SetProducts([]);
        });
    }

    function viewProduct(id_product) {
        Navigation.push("ViewProduct", {"id_product":id_product,"TOKEN":TOKEN});
    }

    function redirectReportes() {
        Navigation.push("Reportes", {"TOKEN":TOKEN});
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
                        <TwoActionColumn width={windowWidth-20} column1={(windowWidth-20)*0.75} column2={(windowWidth-20)*0.25} label1={'Reportes'} label2={'Ver'} Action={() => redirectReportes()}  />
                        <Campains width={windowWidth-20} height={100} data={Campain} />
                        {Categorys.length > 0 && (<CategoryLast navigation={Navigation} TOKEN={TOKEN} categorys={Categorys} />)}
                        {Products.length > 0 && (<ProductLast navigation={Navigation} TOKEN={TOKEN} products={Products} />)}
                    </ScrollView>
                </View>
            </View>
        );
    }
};

export default LandingHome;