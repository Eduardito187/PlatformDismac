import React, {useState} from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { displayFlex, column, label1, label2, columnChild, AlingRight } from '../../Style/Two';
/** */

const TwoColumn = (props) => {
    const [style, SetStyle] = React.useState(props.child != null ? columnChild : column);
    return(
        <View style={[{width:props.width},displayFlex]}>
            <View style={[{width:props.column1},style]}>
                <Text variant="bodyMedium" style={label1}>{props.label1}</Text>
            </View>
            <View style={[{width:props.column2},style, AlingRight]}>
                <Text variant="bodyMedium" style={label2}>{props.label2}</Text>
            </View>
        </View>
    );
};
export default TwoColumn;