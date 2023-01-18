import React, {useState} from 'react';
import { View,ActivityIndicator } from 'react-native';
import { SUCCESS } from '../../Style/style';
import { windowWidth,windowHeight } from '../../../../Helpers/GetMobil';
import { Button } from 'react-native-paper';
/** Components */
import SuccessImage from '../../../../Components/SuccessImage';
/** */
const Success = (props) => {
    return (
        <>
            <View style={{width: windowWidth, height: 200}}>
                <SuccessImage />
            </View>
            <View style={{position: "absolute",bottom: (windowHeight / 20), left: 0, right: 0,justifyContent: "center", alignItems: "center"}}>
                <Button icon="account" mode="contained" onPress={() => props.Mostrar()}>
                    Mostrar cuenta
                </Button>
                <Button icon="arrow-right" mode="contained" style={{backgroundColor: "#EC2427",marginTop: 15}} onPress={() => props.Session()}>
                    Iniciar Sesion
                </Button>
            </View>
        </>
    );
};
export default Success;