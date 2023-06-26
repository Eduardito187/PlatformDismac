import React, {useState} from 'react';
import { ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import { IMAGE_BG, IMAGE_STYLE, PROFILE_PICTURE, TEXT_NAME } from '../../../Login/Style/css';
/** */

const TabAccount = (props) => {
    function actionPress(){
        if (props.currentTab != props.title) {
            props.setCurrentTab(props.title);
        }
    }
    
    return (
        <TouchableOpacity onPress={() => actionPress()}>
            <ImageBackground source={{uri: props.Account.cover}} style={IMAGE_BG} imageStyle={IMAGE_STYLE}>
                <Image source={{uri: props.Account.profile}} style={PROFILE_PICTURE} />
                <Text style={TEXT_NAME}>{props.Account.name}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}
export default TabAccount;