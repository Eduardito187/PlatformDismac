import React, {useState} from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Column_One, Column_Two, Option_Table } from '../../../Login/Style/css';
import { generateCustomId } from '../../../../Helpers/API';
/** */

const OptionTable = (props) => {
    return(
        <View key={generateCustomId()} style={Option_Table}>
            <View style={Column_One}>
                <Text variant="titleSmall">{props.left}</Text>
            </View>
            <View style={Column_Two}>
                <Text variant="titleSmall">{props.right}</Text>
            </View>
        </View>
    );
};
export default OptionTable;