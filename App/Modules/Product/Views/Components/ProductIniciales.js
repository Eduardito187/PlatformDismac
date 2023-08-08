import React, {useState} from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Margin_Bottom_5 } from '../../../Login/Style/css';
import { Width_Max } from '../../../Login/Style/style';
import { alingContentStatus, label_1 } from '../../../Catalog/Style/Two';
/** */

const ProductIniciales = (props) => {
    
    React.useEffect(() => {
        //
    }, []);

    return(
        <View style={[Width_Max, alingContentStatus]}>
            <View style={[Width_Max, Margin_Bottom_5]}>
                <Text style={label_1}>Cuota inicial</Text>
            </View>
            <View style={[Width_Max, Margin_Bottom_5]}>
                <Text variant="titleMedium">{props.Iniciales.monto+" Bs"}</Text>
            </View>
        </View>
    );
};
export default ProductIniciales;