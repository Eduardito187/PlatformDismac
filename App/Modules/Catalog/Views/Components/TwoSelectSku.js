import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { displayFlex, column, label1, label2 } from '../../Style/Two';
import { Chip, TextInput } from 'react-native-paper';
import { Background_Dismac,Color_White,ROW_SECTION,RED_DIS } from '../../../Login/Style/css';
/** */

const TwoSelectSku = (props) => {
    const [Sku, SetSku] = React.useState("");
    
    function changeSku(sku) {
        SetSku(sku);
    }

    function validateSku(){
        props.Action(Sku);
        SetSku("");
    }

    return(
        <View style={[displayFlex]}>
            <View style={column}>
                <TextInput mode='outlined' style={{width:props.width-100}} right={<TextInput.Icon icon={"check"} onPress={() => validateSku()} />} placeholder={props.label1} selectionColor="rgba(0, 0, 0, 0.5)" underlineColor="#EC2427" activeUnderlineColor="#EC2427" activeOutlineColor="#EC2427" label={props.label1} value={Sku} onChangeText={text => changeSku(text)} />
            </View>
            <View style={column}>
                <Chip key={Math.random()+'_ACTION_'+Math.random()} style={[Background_Dismac,label2,{width: 80}]} onPress={() => props.Action()}>
                    <Text style={[label2,Color_White]}>{props.label2}</Text>
                </Chip>
            </View>
        </View>
    );
};
export default TwoSelectSku;