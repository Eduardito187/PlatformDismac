import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Section_Card_Title, Margin_L5, Margin_Bottom_5 } from '../../../Login/Style/css';
import { P5, Surface_Style, Width_Max } from '../../../Login/Style/style';
import { alingContentStatus, label_1 } from '../../../Catalog/Style/Two';
import { Surface } from 'react-native-paper';
import { windowWidth } from '../../../../Helpers/GetMobil';
/** */

const ProductMinicuotas = (props) => {
    const widthView = windowWidth-45;
    
    React.useEffect(() => {
        //
    }, []);

    return(
        <View style={[Width_Max, alingContentStatus]}>
            <View style={[Width_Max, Margin_Bottom_5]}>
                <Text style={label_1}>Minicuotas</Text>
            </View>
            <Surface key={Math.random()+'_Product_Minicuotas_'+Math.random()} style={[{width: widthView}, Surface_Style]} elevation={4}>
                <Text style={[Section_Card_Title, Margin_L5]}>{props.Minicuotas.store_name}</Text>
                <View style={[Width_Max, P5]}>
                    {
                        props.Minicuotas.minicuotas.map((minicuota, i) => {
                            return (
                                <Text key={Math.random()+'_Text_'+i+'_Minicuota_'+Math.random()}>{"Bs "+minicuota.monto+" x "+minicuota.meses+" meses"}</Text>
                            )
                        })
                    }
                </View>
            </Surface>
        </View>
    );
};
export default ProductMinicuotas;