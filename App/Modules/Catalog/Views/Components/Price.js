import React, {useState} from 'react';
/** */
import { View, Text } from 'react-native';
import { PRICE_AFTER, PRICE_BEFORE, PRICE_STYLE, ROW_PRICE, Section_Max, Window_Auto, Window_Auto_MR_5 } from '../../../Login/Style/css';
import { displayFlex } from '../../Style/Two';

const Price = (props) => {
    React.useEffect(() => {
        //
    }, []);
    return(
        <View style={Section_Max}>
            {
                props.Price.special_price > 0
                ? (
                    <View style={displayFlex}>
                        <View style={[ROW_PRICE, Window_Auto_MR_5]}>
                            <Text style={[PRICE_STYLE, PRICE_BEFORE]}>{props.Price.price+'.50 Bs'}</Text>
                        </View>
                        <View style={[PRICE_AFTER, Window_Auto]}>
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