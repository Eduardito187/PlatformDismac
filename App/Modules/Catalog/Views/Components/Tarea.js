import React, {useState} from 'react';
import { windowWidth } from '../../../../Helpers/GetMobil';
import { Margin_Top_5, OUTLINE, RED_DIS, RGBA_05, ROW_PRICE } from '../../../Login/Style/css';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
/** */

const Tarea = (props) => {
    const [Name, SetName] = React.useState(props.name);
    const [Value, SetValue] = React.useState(props.value);
    
    return(
        <View>
            <TextInput disabled={props.disable} mode={OUTLINE} multiline numberOfLines={5} placeholder={Name} label={Name} value={Value} />
        </View>
    );
};
export default Tarea;