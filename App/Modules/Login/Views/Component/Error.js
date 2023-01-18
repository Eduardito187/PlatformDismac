import React, {useState} from 'react';
import { View,ActivityIndicator } from 'react-native';
import { SUCCESS } from '../../Style/style';
import { windowWidth,windowHeight } from '../../../../Helpers/GetMobil';
import { Button } from 'react-native-paper';
/** Components */
import ErrorImage from '../../../../Components/ErrorImage';
/** */
const Error = (props) => {
    return (
        <>
            <View style={{width: windowWidth, height: 200}}>
                <ErrorImage />
            </View>
            <View style={{position: "absolute",bottom: (windowHeight / 20), left: 0, right: 0,justifyContent: "center", alignItems: "center"}}>
                <Button icon="account" mode="contained" onPress={() => props.goBack()}>
                    Volver Atrar
                </Button>
            </View>
        </>
    );
};
export default Error;