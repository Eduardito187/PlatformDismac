import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { displayFlex, column, label1, label2 } from '../../Style/Two';
import { Switch } from 'react-native-paper';
import { RED_DIS } from '../../../Login/Style/css';
/** */

const TwoSwitch = (props) => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    function chnageSwitch() {
        let state = !isSwitchOn;
        setIsSwitchOn(state);
        props.Action(state);
    }
    return(
        <View style={[{width:props.width},displayFlex]}>
            <View style={[{width:props.column1},column]}>
                <Text style={label1}>{props.label1}</Text>
            </View>
            <View style={[{width:props.column2},column]}>
                <Switch style={label2} color={RED_DIS} value={isSwitchOn} onValueChange={chnageSwitch} />
            </View>
        </View>
    );
};
export default TwoSwitch;