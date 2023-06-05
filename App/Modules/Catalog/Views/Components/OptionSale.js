import React, {useState} from 'react';
import { View } from 'react-native';
import { Text,Avatar } from 'react-native-paper';
import { RED_DIS } from '../../../Login/Style/css';
/** */

const OptionSale = (props) => {
    return(
        <View style={[{width: "100%", height: 45, marginBottom: props.margin != null ? 5 : 0}]}>
            <View style={{position: 'absolute', left: 0}}>
                <Avatar.Icon size={45} icon={props.icon} style={{backgroundColor: RED_DIS}} />
            </View>
            <View style={{position: 'absolute', left: 55, top: 0, bottom: 0}}>
                <Text variant="titleSmall">{props.title}</Text>
                <Text variant="bodyLarge" style={{height: 20}}>{props.value}</Text>
            </View>
        </View>
    );
};
export default OptionSale;