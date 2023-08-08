import React, {useState} from 'react';
import { Margin_Bottom_18, PADDING_CONTENT } from '../../../Login/Style/css';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Width_Max } from '../../../Login/Style/style';
import { label_1 } from '../../../Catalog/Style/Two';
import { generateCustomId } from '../../../../Helpers/API';
/** */

const CaracteristicasUnicas = (props) => {
    const [CaracteristicaUnica, SetCaracteristicaUnica] = React.useState(props.CaracteristicasUnicas);

    React.useEffect(() => {
        //
    }, []);

    if (CaracteristicaUnica.length > 0) {
        return(
            <View key={generateCustomId()} style={Margin_Bottom_18}>
                <View style={[Width_Max]}>
                    <View style={[Width_Max]}>
                        <Text style={label_1}>Características Unicas</Text>
                    </View>
                    <View key={generateCustomId()} style={[Width_Max, PADDING_CONTENT]}>
                        {
                           CaracteristicaUnica.map((data, index) => {
                                return (
                                    <Text key={generateCustomId()} variant="titleSmall">{data.description}</Text>
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