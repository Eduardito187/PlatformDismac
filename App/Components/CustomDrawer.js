import React, {useState} from 'react';
import { View, Animated, Image, Easing, ImageBackground, Text  } from 'react-native';
import {DrawerContentScrollView,DrawerItemList,DrawerItem, DrawerContent} from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { DELETE_TOKEN_SESSION, URL_API, GET_HEADER_TOKEN } from '../Helpers/API';
import { ResetNavigation } from '../Helpers/Nav';
import { Asset } from 'expo-asset';
/** */
import { IconButton } from 'react-native-paper';

const CustomDrawer = (props) => {
    const [currentAccount, SetCurrentAccount] = React.useState({
        "id" : 0,
        "name" : "",
        "email" : ""
    });
    React.useEffect(() => {
        getAccount();
    }, []);

    function thenSearch(response, responseText){
        if (response !== false) {
            SetCurrentAccount(response);
        }
    }

    function getAccount(){
        axios.get(URL_API("currentAccount"),GET_HEADER_TOKEN(props.TOKEN)).then(res => {
            console.warn(res.data);
            if(res.data != null){
                thenSearch(res.data.response, res.data.responseText);
            }else{
                thenSearch(false, "Algo salio mal.");
            }
        }).catch(err => {
            thenSearch(false, err);
        });
    }

    async function closeSession() {
        if (await DELETE_TOKEN_SESSION()) {
            ResetNavigation("Loading",{},props.navigation);
        }
    }
    return (
        <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
            <ImageBackground source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png"}} style={{justifyContent:"space-between",alignItems:"center",padding:20,marginTop: -10,marginBottom:10,backgroundColor:"rgb(0,0,0)",borderBottomWidth:2,borderColor: "red"}} imageStyle=
                {{opacity:0.4}}>
                <Image source={require("../../assets/dismac.png")} style={{width:70,height:70,borderRadius:35,borderWidth:2,borderColor: "white"}}/>
                <Text style={{fontSize: 15,fontWeight:"bold",color: "white"}}>{currentAccount.name}</Text>
                <Text style={{color: "#808080"}}>Activo</Text>
                <View style={{position: 'absolute', top: 10, right: 5}}>
                    <IconButton icon={() => <Ionicons name="exit-outline" size={24} color={'white'} />} onPress={() => closeSession()} />
                </View>
            </ImageBackground>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;