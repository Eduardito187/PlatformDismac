import React, {useState} from 'react';
import { View } from 'react-native';
import { Text,Avatar } from 'react-native-paper';
import { Absolte_Left, Absolute_55, Background_Red_Dis, Height_20, Height_45 } from '../../../Login/Style/css';
/** */

const OptionSale = (props) => {
    return(
        <View style={[Height_45, {marginBottom: props.margin != null ? 5 : 0}]}>
            <View style={Absolte_Left}>
                <Avatar.Icon size={45} icon={props.icon} style={Background_Red_Dis} />
            </View>
            <View style={Absolute_55}>
                <Text variant="titleSmall">{props.title}</Text>
                <Text variant="bodyLarge" style={Height_20}>{props.value}</Text>
            </View>
        </View>
    );
};
export default OptionSale;