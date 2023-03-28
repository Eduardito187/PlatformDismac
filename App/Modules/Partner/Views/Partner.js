import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { GET_TOKEN_SESSION } from '../../../Helpers/API';

/** Components */
import ProfilePartner from './Components/ProfilePartner';
import Valor from './Components/Valor';
import Cuentas from './Components/Cuentas';
import Productos from './Components/Productos';
import Almacenes from './Components/Almacenes';
import Tiendas from './Components/Tiendas';
import Social from './Components/Social';
import Campain from './Components/Campain';

const Partner = (props) => {
    const [TOKEN, SetTOKEN] = React.useState("");
    React.useEffect(() => {
        setToken();
    }, []);


    async function setToken(){
        SetTOKEN(await GET_TOKEN_SESSION());
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10,paddingLeft: 10, paddingRight: 10}}>
            <ProfilePartner TOKEN={TOKEN} />
            <Social TOKEN={TOKEN} style={{marginTop: 10}} />
            <Campain TOKEN={TOKEN} style={{marginTop: 10}} />
            <Cuentas TOKEN={TOKEN} style={{marginTop: 10}} />
            <Productos TOKEN={TOKEN} style={{marginTop: 10}} />
            <Almacenes TOKEN={TOKEN} style={{marginTop: 10}} />
            <Tiendas TOKEN={TOKEN} style={{marginTop: 10}} />
            <Valor TOKEN={TOKEN} style={{marginTop: 10, marginBottom: 20}} />
        </ScrollView>
    );
};

export default Partner;