import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { NONE_COUNT, NONE_TEXT } from '../../Catalog/Style/Two';
/** */

const ResultNone = (props) => {
    React.useEffect(() => {
        //
    }, []);
    return(
        <View style={{width: windowWidth, height: windowWidth, justifyContent: "center", alignItems: "center", flex: 1}}>
            <Text style={NONE_TEXT}>Resultados encontrados</Text>
            <Text style={NONE_COUNT}>0</Text>
        </View>
    );
};
export default ResultNone;