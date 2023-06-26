import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { windowWidth } from '../../../../Helpers/GetMobil';
import { CONTAIN_CENTER, ROW, R_30, R_70 } from '../../Style/Row';
import ImagenAnimation from '../../../../Components/ImagenAnimation';
import ImageUrl from '../../../../Components/ImageUrl';
import Price from './Price';
import LoadItem from '../../../../Components/LoadItem';
import { LISTA } from '../../../../Helpers/Code';
import { column } from '../../Style/Two';
import { ACTION_RECENT, Height_30, ITEM_PRODUCT, PRODUCT_NAME, PRODUCT_SKU, WHITE } from '../../../Login/Style/css';
/** */

const ProductComponent = (props) => {
    const navigation = useNavigation();
    const [VIEW, SETVIEW] = React.useState(props.VIEW);
    const [product, SetProduct] = React.useState(null);
    const [key, SetKey] = React.useState(Math.random()+'_Product_'+Math.random());
    const [load, SetKeyLoad] = React.useState(Math.random()+'_Load_'+Math.random());

    React.useEffect(() => {
        setLoader(null);
    }, []);

    function setLoader(val = null) {
        setTimeout(() => {
            SetProduct(val == null ? props.Product : val);
        }, 500)
    }

    function selectProduct(product) {
        navigation.push("ShowProduct", {"id_product":product.id,"TOKEN":props.TOKEN});
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
                        <Text style={PRODUCT_SKU}>{product.sku}</Text>
                        {
                            product.frecuence_updated === null
                            ? (<Text style={ACTION_RECENT}>{product.frecuence_created}</Text>)
                            : (<Text style={ACTION_RECENT}>{product.frecuence_updated}</Text>)
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