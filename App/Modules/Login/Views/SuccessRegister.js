import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View,ActivityIndicator } from 'react-native';
import { SUCCESS } from '../Style/style';
import { GetRegister } from '../../../Helpers/SettingRegister';
import { RegisterPartner } from '../../../Helpers/Partner';
import { ResetNavigation } from '../../../Helpers/Nav';
import { DELETE_REGISTER } from '../../../Helpers/SettingRegister';
/** Components */
import Error from './Component/Error';
import Success from './Component/Success';
import { RED_DIS } from '../Style/css';
/** */

const SuccessRegister = ({route, navigation }) => {
    const [Created, SetCreated] = React.useState(null);
    const [Response, SetResponse] = React.useState("");
    React.useEffect(() => {
        setRegisterData();
    }, []);
    async function setRegisterData() {
        let account_register = JSON.parse(await GetRegister());
        RegisterPartner(account_register, registerAccount);
    }
    function registerAccount(status, response) {
        SetResponse(response);
        SetCreated(status);
    }
    async function setDeleteRegister() {
        await DELETE_REGISTER();
    }
    function InsiarSession() {
        setDeleteRegister();
        ResetNavigation("Loading", {}, navigation);
    }
    return (
        <View style={SUCCESS.Container}>
            <StatusBar backgroundColor={RED_DIS} style="light" />
            {
                Created == null && (<ActivityIndicator size="large" color="#EC2427" />)
            }
            {
                Created == true && (<Success Mostrar={() => console.log('Pressed')} Text={Response} Session={() => InsiarSession()} />)
            }
            {
                Created == false && (<Error goBack={() => navigation.goBack()} Text={Response} />)
            }
        </View>
    );
};

export default SuccessRegister;