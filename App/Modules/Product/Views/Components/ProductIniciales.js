import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Margin_5, Only_Height_40, Height_30, Margin_Bottom_5 } from '../../../Login/Style/css';
import { MarginBottomM9, MarginContentChip, Size_15_Bold, Width_Max } from '../../../Login/Style/style';
import { alingContentStatus, label_1 } from '../../../Catalog/Style/Two';
import { Badge, Chip } from 'react-native-paper';
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
            <Chip key={Math.random()+'_Product_CuotaInicial_'+Math.random()} style={[Only_Height_40]} onPress={() => console.log('Pressed')}>
                <View style={[Width_Max, alingContentStatus]}>
                    <View style={[Height_30, MarginContentChip]}>
                        <Text style={Size_15_Bold}>{props.Iniciales.store_name}</Text>
                    </View>
                    <View style={[Height_30, MarginBottomM9]}>
                        <Badge>{props.Iniciales.monto+" Bs"}</Badge>
                    </View>
                </View>
            </Chip>
        </View>
    );
};
export default ProductIniciales;