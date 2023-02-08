import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
/** */

const ResultNone = (props) => {
    React.useEffect(() => {
        //
    }, []);
    return(
        <View style={{width: windowWidth, height: windowWidth, justifyContent: "center", alignItems: "center", flex: 1}}>
            <Text style={{color: "#808080",fontWeight: "bold", fontSize: 24}}>Resultados encontrados</Text>
            <Text style={{color: "#EC2427",fontWeight: "bold", fontSize: 30}}>0</Text>
        </View>
    );
};
export default ResultNone;