import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { Chip } from 'react-native-paper';
import { CREATE_BODY_SEARCH_ACCOUN, URL_API, URL_API_SHOW, GET_HEADER_TOKEN } from '../../../Helpers/API';

/** Components */
import Searching from '../../Account/Helper/Searching';
import ResultNone from '../../Account/Helper/ResultNone';
import CategoryList from './Components/CategoryList';
import { Background_Dismac, Color_White, Margin_5 } from '../../Login/Style/css';

const ShowCategory = ({route, navigation }) => {
    const [TOKEN, SetTOKEN] = React.useState(route.params.TOKEN);
    const [Catalog, SetCatalog] = React.useState({});
    const [Message, SetMessage] = React.useState("");
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Status, SetStatus] = React.useState(false);
    React.useEffect(() => {
        //
    }, []);

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

    
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10,paddingBottom: 20,paddingLeft: 5, paddingRight: 5}}>
            <View style={{backgroundColor: '#FFFFFF', padding: 5, borderRadius: 5}}>
                <View style={{width: windowWidth-20,flexDirection: 'row',flexWrap: 'wrap'}}>
                    <View style={{width: (windowWidth-20)*0.75, height: 40, flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text style={{color: "black", fontWeight: '700', fontSize: 16}}>
                            Lista de cateogías
                        </Text>
                    </View>
                    <View style={{width: (windowWidth-20)*0.25, height: 40, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Chip key={Math.random()+'_CREAR_'+Math.random()} style={[Background_Dismac]} onPress={() => console.log('Pressed')}>
                            <Text style={Color_White}>Crear</Text>
                        </Chip>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default ShowCategory;