import React, {useState} from 'react';
import { BTNText, Margin_Bottom_18, PADDING_HORIZONTAL_16, RED_DIS, Section_Content_Center } from '../../../Login/Style/css';
import { View, Text } from 'react-native';
import { Width_Max } from '../../../Login/Style/style';
import { displayFlex } from '../../../Catalog/Style/Two';
import { generateCustomId } from '../../../../Helpers/API';
/** */

const MedidasComerciales = (props) => {
    const [MedidaComercial, SetMedidaComercial] = React.useState(props.MedidaComercial);

    React.useEffect(() => {
        //
    }, []);

    if (MedidaComercial != null) {
        return(
            <View key={generateCustomId()} style={Margin_Bottom_18}>
                <View style={[Width_Max, {borderWidth: 2, borderColor: RED_DIS, borderRadius: 10}]}>
                    <View style={[{backgroundColor: RED_DIS, borderTopLeftRadius: 8, borderTopRightRadius: 8}, Section_Content_Center]}>
                        <Text style={[BTNText]}>Medidas comerciales</Text>
                    </View>
                    <View style={Width_Max}>
                        {
                            MedidaComercial.longitud != null && (
                                <View style={[Width_Max, displayFlex]}>
                                    <View style={[{width: "50%"}, Section_Content_Center]}>
                                        <Text>Longitud</Text>
                                    </View>
                                    <View style={[{width: "50%"}, Section_Content_Center]}>
                                        <Text>{MedidaComercial.longitud}</Text>
                                    </View>
                                </View>
                            )
                        }
                        {
                            MedidaComercial.ancho != null && (
                                <View style={[Width_Max, displayFlex]}>
                                    <View style={[{width: "50%"}, Section_Content_Center]}>
                                        <Text>Ancho</Text>
                                    </View>
                                    <View style={[{width: "50%"}, Section_Content_Center]}>
                                        <Text>{MedidaComercial.ancho}</Text>
                                    </View>
                                </View>
                            )
                        }
                        {
                            MedidaComercial.altura != null && (
                                <View style={[Width_Max, displayFlex]}>
                                    <View style={[{width: "50%"}, Section_Content_Center]}>
                                        <Text>Alto</Text>
                                    </View>
                                    <View style={[{width: "50%"}, Section_Content_Center]}>
                                        <Text>{MedidaComercial.altura}</Text>
                                    </View>
                                </View>
                            )
                        }
                        {
                            MedidaComercial.volumen != null && (
                                <View style={[Width_Max, displayFlex]}>
                                    <View style={[{width: "50%"}, Section_Content_Center]}>
                                        <Text>Volumen</Text>
                                    </View>
                                    <View style={[{width: "50%"}, Section_Content_Center]}>
                                        <Text>{MedidaComercial.volumen}</Text>
                                    </View>
                                </View>
                            )
                        }
                        {
                            MedidaComercial.peso != null && (
                                <View style={[Width_Max, displayFlex]}>
                                    <View style={[{width: "50%"}, Section_Content_Center]}>
                                        <Text>Peso</Text>
                                    </View>
                                    <View style={[{width: "50%"}, Section_Content_Center]}>
                                        <Text>{MedidaComercial.peso}</Text>
                                    </View>
                                </View>
                            )
                        }
                    </View>
                </View>
            </View>
        );
    }else{
        return(null);
    }
};
export default MedidasComerciales;