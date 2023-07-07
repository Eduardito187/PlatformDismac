import React, {useState} from 'react';
import { BTNBlackText, Margin_Bottom_18, PADDING_CONTENT } from '../../../Login/Style/css';
import { View, Text } from 'react-native';
import { Width_Max } from '../../../Login/Style/style';
import { label_1 } from '../../../Catalog/Style/Two';
/** */

const CaracteristicasUnicas = (props) => {
    const [CaracteristicaUnica, SetCaracteristicaUnica] = React.useState(props.CaracteristicasUnicas);

    React.useEffect(() => {
        //
    }, []);

    if (CaracteristicaUnica.length > 0) {
        return(
            <View key={Math.random()+'_CaracteristicaUnica_'+Math.random()} style={Margin_Bottom_18}>
                <View style={[Width_Max]}>
                    <View style={[Width_Max]}>
                        <Text style={label_1}>Características Unicas</Text>
                    </View>
                    <View key={Math.random()+'_CaracteristicaUnica_Content_'+Math.random()} style={[Width_Max, PADDING_CONTENT]}>
                        {
                           CaracteristicaUnica.map((data, index) => {
                                return (
                                    <Text key={Math.random()+'_CaracteristicaUnica_Info_'+Math.random()}>{data.description}</Text>
                                );
                            })
                        }
                    </View>
                </View>
            </View>
        );
    }else{
        return(null);
    }
};
export default CaracteristicasUnicas;