import React, {useState} from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Margin_Bottom_5 } from '../../../Login/Style/css';
import { P5, Surface_Style, Width_Max } from '../../../Login/Style/style';
import { alingContentStatus, label_1 } from '../../../Catalog/Style/Two';
import { Surface } from 'react-native-paper';
import { windowWidth } from '../../../../Helpers/GetMobil';
import { generateCustomId } from '../../../../Helpers/API';
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
            <Surface key={generateCustomId()} style={[{width: widthView}, Surface_Style]} elevation={4}>
                {
                    props.Minicuotas.minicuotas.map((minicuota, i) => {
                        return (
                            <Text key={generateCustomId()} variant="titleMedium" style={P5}>{"Bs "+minicuota.monto+" x "+minicuota.meses+" meses"}</Text>
                        )
                    })
                }
            </Surface>
        </View>
    );
};
export default ProductMinicuotas;