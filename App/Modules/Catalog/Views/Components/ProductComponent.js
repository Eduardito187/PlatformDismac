import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { CONTAIN_CENTER, ROW, R_30, R_70 } from '../../Style/Row';
import ImageUrl from '../../../../Components/ImageUrl';
import Price from './Price';
import LoadItem from '../../../../Components/LoadItem';
import { ACTION_RECENT, Height_30, ITEM_PRODUCT, PRODUCT_NAME, PRODUCT_SKU } from '../../../Login/Style/css';
import { Size_14_Bold } from '../../../Login/Style/style';
import { generateCustomId } from '../../../../Helpers/API';
/** */

const ProductComponent = (props) => {
    const navigation = useNavigation();
    const [VIEW, SETVIEW] = React.useState(props.VIEW);
    const [product, SetProduct] = React.useState(null);
    const [key, SetKey] = React.useState(generateCustomId());
    const [load, SetKeyLoad] = React.useState(generateCustomId());
    const [Invitado, SetInvitado] = React.useState(props.invitado);

    React.useEffect(() => {
        setLoader(null);
    }, []);

    function setLoader(val = null) {
        setTimeout(() => {
            SetProduct(val == null ? props.Product : val);
        }, 500)
    }

    function selectProduct(product) {
        if (Invitado){
            navigation.push("ViewProduct", {"id_product":product.id,"TOKEN":props.TOKEN});
        }else{
            navigation.push("ShowProduct", {"id_product":product.id,"TOKEN":props.TOKEN});
        }
    }
    
    if (product == null) {
        return(
            <View key={key+"_load"} style={[{width: props.SCREEN_WIDTH}, ITEM_PRODUCT]}>
                <LoadItem />
            </View>
        );
    }else{
        return(
            <TouchableOpacity onPress={() => selectProduct(product)} key={key} style={[{width: props.SCREEN_WIDTH}, ITEM_PRODUCT]}>
                <View style={ROW}>
                    <View style={[{width: props.COLUMN_ONE.toString()+'%'}, CONTAIN_CENTER]}>
                        <ImageUrl style={props.IMAGE} url={product.image} />
                    </View>
                    <View style={[{width: props.COLUMN_TWO.toString()+'%'}]}>
                        <Text style={PRODUCT_NAME}>{product.name}</Text>
                        <Text style={[PRODUCT_SKU, Size_14_Bold]}>{product.sku}</Text>
                        {
                            Invitado == false && product.frecuence_updated === null && (<Text style={ACTION_RECENT}>{product.frecuence_created}</Text>)
                        }
                        {
                            Invitado == false && product.frecuence_created === null && (<Text style={ACTION_RECENT}>{product.frecuence_updated}</Text>)
                        }
                        <View style={Height_30}>
                            <Price Price={product.price} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
};
export default ProductComponent;