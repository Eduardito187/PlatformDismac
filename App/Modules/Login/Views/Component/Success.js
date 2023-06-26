import React, {useState} from 'react';
import { View,ActivityIndicator } from 'react-native';
import { SUCCESS } from '../../Style/style';
import { windowWidth,windowHeight } from '../../../../Helpers/GetMobil';
import { Button } from 'react-native-paper';
/** Components */
import SuccessImage from '../../../../Components/SuccessImage';
import { Bottom_Custom, Height_200, Red_Top_15 } from '../../Style/css';
/** */
const Success = (props) => {
    return (
        <>
            <View style={[{width: windowWidth}, Height_200]}>
                <SuccessImage />
            </View>
            <View style={[Bottom_Custom, {bottom: (windowHeight / 20)}]}>
                <Button icon="account" mode="contained" onPress={() => props.Mostrar()}>
                    Mostrar cuenta
                </Button>
                <Button icon="arrow-right" mode="contained" style={Red_Top_15} onPress={() => props.Session()}>
                    Iniciar Sesion
                </Button>
            </View>
        </>
    );
};
export default Success;