import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { displayFlex, column, label1, label2, AlingRight } from '../../Style/Two';
import { Margin_Top_5, ROW_SECTION } from '../../../Login/Style/css';
/** */

const TwoColumnBg = (props) => {
    return(
        <View style={[{width:props.width},displayFlex,ROW_SECTION, Margin_Top_5]}>
            <View style={[{width:props.column1},column]}>
                <Text style={label1}>{props.label1}</Text>
            </View>
            <View style={[{width:props.column2},column, AlingRight]}>
                <Text style={label2}>{props.label2}</Text>
            </View>
        </View>
    );
};
export default TwoColumnBg;