import React, {useState} from 'react';
/** */
import { View,Text,ActivityIndicator } from 'react-native';
import { Section_Content_Center } from '../../Login/Style/css';
/** */

const Searching = (props) => {
    React.useEffect(() => {
        //
    }, []);
    return(
        <View style={Section_Content_Center}>
            <ActivityIndicator size="large" color="#EC2427" />
            <Text>Buscando...</Text>
        </View>
    );
};
export default Searching;