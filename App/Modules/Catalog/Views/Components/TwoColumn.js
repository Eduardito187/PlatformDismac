import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { displayFlex, column, label1, label2 } from '../../Style/Two';
/** */

const TwoColumn = (props) => {
    return(
        <View style={[{width:props.width},displayFlex]}>
            <View style={[{width:props.column1},column]}>
                <Text style={label1}>{props.label1}</Text>
            </View>
            <View style={[{width:props.column2},column]}>
                <Text style={label2}>{props.label2}</Text>
            </View>
        </View>
    );
};
export default TwoColumn;