import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { PADDING_BOTTOM_10, Margin_Bottom_5 } from '../../../Login/Style/css';
import Price from '../../../Catalog/Views/Components/Price';
import { Width_Max } from '../../../Login/Style/style';
import { alingContentStatus, label_1 } from '../../../Catalog/Style/Two';
import { generateCustomId } from '../../../../Helpers/API';
/** */

const ProductPrice = (props) => {
    
    React.useEffect(() => {
        //
    }, []);

    return(
        <View style={[Width_Max, alingContentStatus]}>
            <View style={[Width_Max, Margin_Bottom_5]}>
                <Text style={label_1}>Precio</Text>
            </View>
            <View style={[PADDING_BOTTOM_10]}>
                <Price key={generateCustomId()} Price={props.Precios.price} />
            </View>
        </View>
    );
};
export default ProductPrice;