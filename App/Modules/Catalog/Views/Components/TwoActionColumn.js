import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { displayFlex, column, label1, label2 } from '../../Style/Two';
import { Chip } from 'react-native-paper';
import { Background_Dismac,Color_White } from '../../../Login/Style/css';
/** */

const TwoActionColumn = (props) => {
    return(
        <View style={[{width:props.width},displayFlex]}>
            <View style={[{width:props.column1},column]}>
                <Text style={label1}>{props.label1}</Text>
            </View>
            <View style={[{width:props.column2},column]}>
                <Chip key={Math.random()+'_ACTION_'+Math.random()} style={[Background_Dismac]} onPress={() => props.Action()}>
                    <Text style={[label2,Color_White]}>{props.label2}</Text>
                </Chip>
            </View>
        </View>
    );
};
export default TwoActionColumn;