import React, {useState} from 'react';
/** */
import { View, Text } from 'react-native';
import { PRICE_AFTER, PRICE_BEFORE, PRICE_STYLE, ROW_PRICE } from '../../../Login/Style/css';
import { displayFlex } from '../../Style/Two';

const Price = (props) => {
    React.useEffect(() => {
        //
    }, []);
    return(
        <View style={{width: '100%'}}>
            {
                props.Price.special_price > 0
                ? (
                    <View style={displayFlex}>
                        <View style={[ROW_PRICE, {width: "auto", marginRight: 5}]}>
                            <Text style={[PRICE_STYLE, PRICE_BEFORE]}>{props.Price.price+'.50 Bs'}</Text>
                        </View>
                        <View style={[PRICE_AFTER, {width: "auto"}]}>
                            <Text style={PRICE_STYLE}>{props.Price.special_price+' Bs'}</Text>
                        </View>
                    </View>
                )
                : (
                    <View style={displayFlex}>
                        <View style={ROW_PRICE}>
                            <Text style={PRICE_STYLE}>{props.Price.price+' Bs'}</Text>
                        </View>
                    </View>
                )
            }
        </View>
    );
};
export default Price;