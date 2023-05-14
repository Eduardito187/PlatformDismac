import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { windowWidth } from '../../../../Helpers/GetMobil';
import { CONTAIN_CENTER, ROW, R_30, R_70 } from '../../Style/Row';
import ImagenAnimation from '../../../../Components/ImagenAnimation';
import ImageUrl from '../../../../Components/ImageUrl';
import Price from './Price';
/** */

const ProductComponent = (props) => {
    const SCREEN_WIDTH = windowWidth-10;
    const COLUMN_ONE = Math.round((100 * 100) / SCREEN_WIDTH);
    const COLUMN_TWO = Math.round(((SCREEN_WIDTH-100) * 100) / SCREEN_WIDTH);
    const navigation = useNavigation();
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
        return(<ActivityIndicator key={load} size="large" color="#EC2427" />);
    }else{
        return(
            <TouchableOpacity onPress={() => selectProduct(product)} key={key} style={{width: SCREEN_WIDTH, borderRadius: 5, backgroundColor: "#FFFFFF", marginTop: 10, marginBottom: 5, padding: 10}}>
                <View style={ROW}>
                    <View style={[{width: COLUMN_ONE.toString()+'%'}, CONTAIN_CENTER]}>
                        <ImageUrl style={{width: 80, height: 120}} url={product.image} />
                    </View>
                    <View style={{width: COLUMN_TWO.toString()+'%'}}>
                        <Text style={{fontSize: 15, color: "#808080"}}>{product.name}</Text>
                        <Text style={{fontWeight: "bold", fontSize: 13, color: "#808080"}}>{product.sku}</Text>
                        {
                            product.frecuence_updated === null
                            ? (<Text style={{fontWeight: "bold", fontSize: 13, color: "#808080", marginTop: 5, marginBottom: 5}}>{product.frecuence_created}</Text>)
                            : (<Text style={{fontWeight: "bold", fontSize: 13, color: "#808080", marginTop: 5, marginBottom: 5}}>{product.frecuence_updated}</Text>)
                        }
                        <Price Price={product.price} />
                    </View>
                </View>
                <View style={{width: (windowWidth-10)}}>
                </View>
            </TouchableOpacity>
        );
    }
};
export default ProductComponent;