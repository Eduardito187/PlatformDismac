import React, {useState} from 'react';
/** */
import { View,Text,ActivityIndicator } from 'react-native';
/** */

const Searching = (props) => {
    React.useEffect(() => {
        //
    }, []);
    return(
        <View style={{justifyContent: "center", alignItems: "center", padding: 10}}>
            <ActivityIndicator size="large" color="#EC2427" />
            <Text>Buscando...</Text>
        </View>
    );
};
export default Searching;