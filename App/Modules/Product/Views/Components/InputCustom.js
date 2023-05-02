import React, {useState} from 'react';
import { windowWidth } from '../../../../Helpers/GetMobil';
import { Margin_Top_5, OUTLINE, RED_DIS, RGBA_05, ROW_PRICE } from '../../../Login/Style/css';
import { TextInput, View } from 'react-native';
/** */

const InputCustom = (props) => {
    const [Name, SetName] = React.useState(props.name);
    const [Value, SetValue] = React.useState(props.value);
    const [Status, SetStatus] = React.useState(props.status);
    React.useEffect(() => {
        //
    }, []);
    function changeValue(val){
        SetValue(val);
        props.setValue(val);
    }
    if (props.show == true) {
        return(
            <>
                <View style={[ROW_PRICE, Margin_Top_5,{width: '100%'}]}>
                    <TextInput disabled={Status} mode={OUTLINE} placeholder={Name} selectionColor={RGBA_05} underlineColor={RED_DIS}
                    activeUnderlineColor={RED_DIS} activeOutlineColor={RED_DIS} label={Name} value={Value} onChangeText={text => changeValue(text)} />
                </View>
            </>
        );
    }else{
        return(null);
    }
};
export default InputCustom;