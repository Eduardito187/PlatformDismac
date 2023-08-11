import React, {useState} from 'react';
import { View } from 'react-native';
import { displayFlex } from '../../../Catalog/Style/Two';
import { Text } from 'react-native-paper';
/** */
import ProgressCircle from 'react-native-progress-circle'
import { Color_White, PLO_DIS, RED_DIS, WHITE } from '../../../Login/Style/css';

const ProgressIcon = (props) => {
    const [dateFrom, SetDateFrom] = React.useState(props.dateFrom);
    const [dateEnd, SetDateEnd] = React.useState(props.dateEnd);
    const [Components, SetComponents] = React.useState(null);
    const [Porcentaje, SetPorcentaje] = React.useState(0);

    React.useEffect(() => {
        loadingDate();
    }, []);

    function loadingDate(){
        const fechaCurrent = new Date();
        const fecha1 = new Date(dateFrom);
        const fecha2 = new Date(dateEnd);
        const diferenciaEnMilisegundos = fecha1 - fecha2;
        const diferenciaEnMinutos = parseInt(diferenciaEnMilisegundos / 60000);
        const diferenciaEnMilisegundosCurrent = fecha1 - fechaCurrent;
        const diferenciaEnMinutosCurrent = parseInt(diferenciaEnMilisegundosCurrent / 60000);

        let porcentajeCalc = parseInt((diferenciaEnMinutosCurrent / diferenciaEnMinutos) * 100);
        SetPorcentaje(porcentajeCalc > 100 ? 100 : porcentajeCalc);
    }

    return(
        <View style={[displayFlex]}>
            <ProgressCircle percent={Porcentaje} radius={40} borderWidth={4} color={WHITE} shadowColor={PLO_DIS} bgColor={RED_DIS}>
                <Text style={Color_White} variant="titleLarge">{Porcentaje+'%'}</Text>
            </ProgressCircle>
        </View>
    );
};
export default ProgressIcon;