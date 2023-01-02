import React, {useState} from 'react';
import { View, Animated, Image, Easing, ImageBackground, Text  } from 'react-native';
import {DrawerContentScrollView,DrawerItemList,DrawerItem, DrawerContent} from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DELETE_TOKEN_SESSION } from '../Helpers/API';
import { ResetNavigation } from '../Helpers/Nav';
/** */
import { IconButton } from 'react-native-paper';

const CustomDrawer = (props) => {
    React.useEffect(() => {
        //props.navigation.closeDrawer()
    }, []);
    async function closeSession() {
        if (await DELETE_TOKEN_SESSION()) {
            ResetNavigation("Loading",{},props.navigation);
        }
    }
    return (
        <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
            <ImageBackground source={require("./../../pub/Dismac/lg.png")} style={{justifyContent:"space-between",alignItems:"center",padding:20,marginBottom:10,backgroundColor:"rgb(0,0,0)",borderBottomWidth:2,borderColor: "red"}} imageStyle=
                {{opacity:0.4}}>
                <Image source={require("./../../pub/Dismac/dismac.png")} style={{width:70,height:70,borderRadius:35,borderWidth:2,borderColor: "white"}}/>
                <Text style={{fontSize:20,fontWeight:"bold",color: "white"}}>LG</Text>
                <Text style={{color: "#808080"}}>Inactivo</Text>
                <View style={{position: 'absolute', top: 0, right: 0}}>
                    <IconButton icon={() => <Ionicons name="exit-outline" size={24} color={'white'} />} onPress={() => closeSession()} />
                </View>
            </ImageBackground>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;