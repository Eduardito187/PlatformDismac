import React, {useState} from 'react';
/** */
import { View, Text } from 'react-native';
import { PRICE_AFTER, PRICE_BEFORE, PRICE_STYLE, ROW_PRICE } from '../../../Login/Style/css';

const Price = (props) => {
    React.useEffect(() => {
        //
    }, []);
    return(
        <View style={{width: '100%'}}>
            {
                props.Price.special_price > 0
                ? (
                    <View>
                        <View style={ROW_PRICE}>
                            <Text style={[PRICE_STYLE, PRICE_BEFORE]}>1{props.Price.price+'.50 Bs'}</Text>
                        </View>
                        <View style={PRICE_AFTER}>
                            <Text style={PRICE_STYLE}>{props.Price.special_price+' Bs'}</Text>
                        </View>
                    </View>
                )
                : (
                    <View style={ROW_PRICE}>
                        <Text style={PRICE_STYLE}>{props.Price.price+' Bs'}</Text>
                    </View>
                )
            }
        </View>
    );
};
export default Price;