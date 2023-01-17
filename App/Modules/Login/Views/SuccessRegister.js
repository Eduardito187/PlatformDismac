import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View,Text } from 'react-native';
import { SUCCESS } from '../Style/style';
import { GetRegister } from '../../../Helpers/SettingRegister';
import { windowWidth } from '../../../Helpers/GetMobil';
/** Components */
import SuccessImage from '../../../Components/SuccessImage';
/** */

const SuccessRegister = ({route, navigation }) => {
    React.useEffect(() => {
        getRegisterData();
    }, []);
    async function getRegisterData() {
        console.log(await GetRegister());
    }

    return (
        <View style={SUCCESS.Container}>
            <StatusBar style="light" />
            <View style={{width: windowWidth, height: 200}}>
                <SuccessImage />
            </View>
        </View>
    );
};

export default SuccessRegister;