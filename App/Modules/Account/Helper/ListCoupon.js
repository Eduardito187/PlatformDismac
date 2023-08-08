import React, {useState} from 'react';
/** */
import { View, TouchableOpacity } from 'react-native';
import CountResult from '../../../Components/Result/CountResult';
import ResultNone from './ResultNone';
import { generateCustomId } from '../../../Helpers/API';
import { Background_Red_Dis, Content_Coupond_One, Content_Coupond_Two, Coupon_Content, Text_Coupons } from '../../Login/Style/css';
import { Text } from 'react-native-paper';

const ListCoupon = (props) => {

    React.useEffect(() => {
        //
    }, []);

    function selectSocial(state) {
        
    }

    if (props.Coupons.length > 0) {
        return(
            <>
                <CountResult Count={props.Coupons.length} />
                {
                    props.Coupons.map((state) => {
                        return (
                            <TouchableOpacity key={generateCustomId()} onPress={() => selectSocial(state)} style={[Coupon_Content, Background_Red_Dis]}>
                                <View style={[Content_Coupond_One]}>
                                    <Text variant="titleLarge" style={Text_Coupons}>{state.name}</Text>
                                </View>
                                <View style={Content_Coupond_Two}>
                                    <Text variant="titleSmall" style={Text_Coupons}>{state.coupon_code}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </>
        );
    }else{
        return(<ResultNone />);
    }
};
export default ListCoupon;