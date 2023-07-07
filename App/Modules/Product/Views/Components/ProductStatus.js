import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { COLOR_DIS, COLOR_GREEN, Margin_Bottom_18, PRODUCT_DESCRIPTION, PRODUCT_DESCRIPTION_SHOW, VER_MAS_TEXT } from '../../../Login/Style/css';
/** */

const ProductStatus = (props) => {
    const [Ver, SetVer] = React.useState(false);
    
    React.useEffect(() => {
        //
    }, []);

    return(
        <>
        {
            props.status
            ? (
                <View>
                    <Text style={[COLOR_GREEN]}>Habilitado</Text>
                </View>
            )
            : (
                <View>
                    <Text style={[COLOR_DIS]}>Inabilitado</Text>
                </View>
            )
        }
        </>
    );
};
export default ProductStatus;