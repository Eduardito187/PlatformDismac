import React, {useState} from 'react';
import { View, Animated, Image, ActivityIndicator, ImageBackground, Text  } from 'react-native';
import {DrawerContentScrollView,DrawerItemList,DrawerItem, DrawerContent} from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DELETE_TOKEN_SESSION, URL_API, GET_HEADER_TOKEN } from '../Helpers/API';
import { ResetNavigation } from '../Helpers/Nav';
/** */
import { IconButton } from 'react-native-paper';
import { OPACITY, SECTION_DRAWER, IMAGE_PROFILE, NAME, MAIL, SECTION_CLOSE } from '../Modules/Login/Style/css';

const CustomDrawer = (props) => {
    React.useEffect(() => {
        //
    }, []);

    async function closeSession() {
        if (await DELETE_TOKEN_SESSION()) {
            ResetNavigation("Loading",{},props.navigation);
        }
    }
    return (
        <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
            <ImageBackground source={{uri: props.Account.cover}} style={SECTION_DRAWER} imageStyle={OPACITY}>
                <Image source={{uri: props.Account.profile}} style={IMAGE_PROFILE}/>
                <Text style={NAME}>{props.Account.name}</Text>
                <Text style={MAIL}>{props.Account.email}</Text>
                <View style={SECTION_CLOSE}>
                    <IconButton icon={() => <Ionicons name="exit-outline" size={24} color={'white'} />} onPress={() => closeSession()} />
                </View>
            </ImageBackground>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;