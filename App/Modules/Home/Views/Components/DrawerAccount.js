import React, {useState} from 'react';
/** */
import { ImageBackground, Image, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { IMAGE_BG, IMAGE_STYLE, MAIL_TEXT, PROFILE_PICTURE, TEXT_NAME } from '../../../Login/Style/css';

const DrawerAccount = (props) => {
    const [Account, SetAccount] = React.useState(props.Account);

    React.useEffect(() => {
        //
    }, []);
    
    return (
        <TouchableOpacity>
            <ImageBackground source={{uri: Account.cover}} style={IMAGE_BG} imageStyle={IMAGE_STYLE}>
                <Image source={{uri: Account.profile}} style={PROFILE_PICTURE} />
                <Text style={TEXT_NAME}>{Account.name}</Text>
                <TouchableOpacity>
                    <Text style={MAIL_TEXT}>{Account.email}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </TouchableOpacity>
    );
};
export default DrawerAccount;