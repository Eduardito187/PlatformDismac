import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { displayFlex, column, label1, label2, AlingRight } from '../../Style/Two';
import { Chip } from 'react-native-paper';
import { Background_Dismac,Color_White } from '../../../Login/Style/css';
import { generateCustomId } from '../../../../Helpers/API';
/** */

const TwoActionColumn = (props) => {
    return(
        <View style={[{width:props.width},displayFlex]}>
            <View style={[{width:props.column1},column]}>
                <Text style={label1}>{props.label1}</Text>
            </View>
            <View style={[{width:props.column2},column,AlingRight]}>
                <Chip key={generateCustomId()} style={[Background_Dismac,label2]} onPress={() => props.Action()}>
                    <Text style={[label2,Color_White]}>{props.label2}</Text>
                </Chip>
            </View>
        </View>
    );
};
export default TwoActionColumn;