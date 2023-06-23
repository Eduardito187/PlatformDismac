import React, {useState} from 'react';
import { ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import { IMAGE_BG, IMAGE_STYLE, PROFILE_PICTURE, TEXT_NAME } from '../../../Login/Style/css';
/** */

const TabAccount = (currentTab, setCurrentTab, title, Account) => {
    function actionPress(){
        if (currentTab != title) {
            setCurrentTab(title);
        }
    }
    
    return (
        <TouchableOpacity onPress={() => actionPress()}>
            <ImageBackground source={{uri: Account.cover}} style={IMAGE_BG} imageStyle={IMAGE_STYLE}>
                <Image source={{uri: Account.profile}} style={PROFILE_PICTURE} />
                <Text style={TEXT_NAME}>{Account.name}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}
export default TabAccount;