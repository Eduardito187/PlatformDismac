import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { displayFlex, column, label1, label2, AlingRight } from '../../Style/Two';
import { Switch } from 'react-native-paper';
import { RED_DIS } from '../../../Login/Style/css';
/** */

const TwoSwitch = (props) => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    React.useEffect(() => {
        setIsSwitchOn(props.value);
    }, []);
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
            <View style={[{width:props.column2},column, AlingRight]}>
                <Switch disabled={props.disabled} style={label2} color={RED_DIS} value={isSwitchOn} onValueChange={chnageSwitch} />
            </View>
        </View>
    );
};
export default TwoSwitch;