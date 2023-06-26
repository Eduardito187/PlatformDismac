import React, {useState} from 'react';
import { View,ActivityIndicator } from 'react-native';
import { windowWidth,windowHeight } from '../../../../Helpers/GetMobil';
import { Button } from 'react-native-paper';
/** Components */
import ErrorImage from '../../../../Components/ErrorImage';
import { Bottom_Custom, Height_200 } from '../../Style/css';
/** */
const Error = (props) => {
    return (
        <>
            <View style={[{width: windowWidth}, Height_200]}>
                <ErrorImage />
            </View>
            <View style={[Bottom_Custom, {bottom: (windowHeight / 20)}]}>
                <Button icon="account" mode="contained" onPress={() => props.goBack()}>
                    Volver Atrar
                </Button>
            </View>
        </>
    );
};
export default Error;