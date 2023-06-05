import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { displayFlex, column, label1 } from '../../Style/Two';
import { RadioButton } from 'react-native-paper';
import { RED_DIS } from '../../../Login/Style/css';
/** */

const TwoRadio = (props) => {
    return(
        <View style={[{width: "100%"},displayFlex]}>
            <View style={column}>
                <Text style={label1}>{props.label1}</Text>
            </View>
            <View style={[column,{alignItems: 'flex-end', paddingRight: 5}]}>
                <RadioButton color={RED_DIS} value={props.value} status={ props.select === props.value ? 'checked' : 'unchecked' } onPress={() => props.setValue(props.value)} />
            </View>
        </View>
    );
};
export default TwoRadio;