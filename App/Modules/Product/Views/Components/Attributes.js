import React, {useState} from 'react';
import { windowWidth } from '../../../../Helpers/GetMobil';
import { Border_Radius_5, Margin_Top_5, OUTLINE, RED_DIS, RGBA_05, ROW_SECTION } from '../../../Login/Style/css';
import { View } from 'react-native';
import TwoSwitch from '../../../Catalog/Views/Components/TwoSwitch';
import { Width_Max } from '../../../Login/Style/style';
import { Surface, TextInput } from 'react-native-paper';
/** */

const Attribute = (props) => {
    const widthView = windowWidth - 10;
    const [Name, SetName] = React.useState(props.name);
    const [Value, SetValue] = React.useState(props.value);
    const [Code, SetCode] = React.useState(props.code);
    const [Type, SetType] = React.useState(props.type);
    const [Status, SetStatus] = React.useState(props.disabled);
    const [AttributeView, SetAttributeView] = React.useState(null);

    React.useEffect(() => {
        loatAttribute();
    }, []);

    function loatAttribute(){
        let attr = null;
        if (Type == "string"){
            attr = (
                <Surface key={Math.random()+'_Product_Attribute_'+Math.random()} style={[Width_Max, ROW_SECTION, Border_Radius_5, Margin_Top_5]} elevation={4}>
                    <TextInput disabled={Status} mode={OUTLINE} placeholder={Name} selectionColor={RGBA_05} underlineColor={RED_DIS}
                    activeUnderlineColor={RED_DIS} activeOutlineColor={RED_DIS} label={Name} defaultValue={Value} onChangeText={text => changeValue(text)} />
                </Surface>
            );
        } else if(Type == "int" || Type == "float" || Type == "decimal" || Type == "lts" || Type == "gigabyte"){
            attr = (
                <Surface key={Math.random()+'_Product_Attribute_'+Math.random()} style={[Width_Max, ROW_SECTION, Border_Radius_5, Margin_Top_5]} elevation={4}>
                    <TextInput keyboardType='numeric' disabled={Status} mode={OUTLINE} placeholder={Name} selectionColor={RGBA_05} underlineColor={RED_DIS}
                    activeUnderlineColor={RED_DIS} activeOutlineColor={RED_DIS} label={Name} defaultValue={Value} onChangeText={text => changeValue(text)} />
                </Surface>
            );
        } else if (Type == "array" || Type == "object"){
            attr = (
                <Surface key={Math.random()+'_Product_Attribute_'+Math.random()} style={[Width_Max, ROW_SECTION, Border_Radius_5, Margin_Top_5]} elevation={4}>
                    <TextInput disabled={Status} multiline numberOfLines={5} mode={OUTLINE} placeholder={Name} selectionColor={RGBA_05} underlineColor={RED_DIS}
                    activeUnderlineColor={RED_DIS} activeOutlineColor={RED_DIS} label={Name} defaultValue={Value} onChangeText={text => changeValue(text)} />
                </Surface>
            );
        } else if (Type == "bool"){
            attr = (
                <Surface key={Math.random()+'_Product_Attribute_'+Math.random()} style={[Width_Max, ROW_SECTION, Border_Radius_5, Margin_Top_5]} elevation={4}>
                    <TwoSwitch disabled={Status} width={widthView} column1={widthView*0.75} column2={widthView*0.25} value={Value} label1={Name} Action={(a) => changeValue(a)} />
                </Surface>
            );
        }
        SetAttributeView(attr);
    }

    function changeValue(val){
        SetValue(val);
        props.setValue(Code, val);
    }

    return(AttributeView);

};
export default Attribute;