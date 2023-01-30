import React, {useState} from 'react';
import { View, Text } from 'react-native';
/** */
import { Chip } from 'react-native-paper';

const CountResult = (props) => {
    React.useEffect(() => {
        //
    }, []);
    return(
        <>
            <Text style={{width: 160,marginBottom: 5, marginTop: 5}}>
                <Chip icon="information" style={{width: 200,maxHeight: 40}}>
                    <View style={{width: 170,maxHeight: 40}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{width: 100,maxHeight: 40}}>
                                <Text style={{color: "#808080",fontWeight: "bold",fontSize: 18}}>Resultados: </Text>
                            </View>
                            <View style={{width: 60,maxHeight: 40}}>
                                <Text style={{color: "#EC2427",fontWeight: "bold",fontSize: 18, textAlign: "center"}}>{props.Count}</Text>
                            </View>
                        </View>
                    </View>
                </Chip>
            </Text>
        </>
    );
};
export default CountResult;