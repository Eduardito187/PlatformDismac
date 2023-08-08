import React, {useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Text } from 'react-native-paper';
import { Color_White, WHITE } from '../../../Login/Style/css';
import { Width_120, Width_30, displayFlex } from '../../../Catalog/Style/Two';
/** */

const DateSection = (props) => {
    const [date, setDate] = React.useState(new Date());
    const [dateEnd, setDateEnd] = React.useState(props.date);
    const [DateText, SetDateText] = React.useState("");

    React.useEffect(() => {
        loadingDate();
    }, []);

    function loadingDate(){
        const fecha2 = new Date(dateEnd);
        const diferenciaEnMilisegundos = fecha2 - date;
        const diferenciaEnMinutos = parseInt(diferenciaEnMilisegundos / 60000);
        const diferenciaEnHoras = parseInt(diferenciaEnMinutos / 60);
        const diferenciaEnDias = parseInt(diferenciaEnHoras / 24);
        const diferenciaEnMes = parseInt(diferenciaEnDias / 30);

        let diferent = "";
        if (diferenciaEnMes >= 1){
            diferent = diferenciaEnMes + (diferenciaEnMes == 1 ? " mes" : " meses");
        } else if (diferenciaEnDias >= 1){
            diferent = diferenciaEnDias + (diferenciaEnDias == 1 ? " día" : " dias");
        } else if (diferenciaEnHoras >= 1){
            diferent = diferenciaEnHoras + (diferenciaEnHoras == 1 ? " hora" : " horas");
        } else if (diferenciaEnMinutos >= 1){
            diferent = diferenciaEnMinutos + (diferenciaEnMinutos == 1 ? " minuto" : " minutos");
        }else{
            diferent = "Expirado";
        }
        SetDateText(diferent);
    }

    return(
        <View style={[displayFlex]}>
            <View style={Width_30}>
                <MaterialCommunityIcons name="clock-outline" size={26} color={WHITE} />
            </View>
            <View style={Width_120}>
                <Text style={Color_White} variant="titleMedium">{DateText}</Text>
            </View>
        </View>
    );
};
export default DateSection;