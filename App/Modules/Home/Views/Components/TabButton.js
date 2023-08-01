import React, {useState} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NavBars } from '../../../../Themes/Dismac/ThemeDismac';
import { SOLID_BG, TEXT_OPTION_DRAWER } from '../../../Login/Style/css';
import { Section_One, Section_Two, Section_Two_Footer } from '../../../Login/Style/style';
/** */

const TabButton = (currentTab, setCurrentTab, title, icon, footer = false) => {

    function actionPress(){
        if (currentTab != title) {
            setCurrentTab(title);
        }
    }
    
    return (
        <TouchableOpacity onPress={() => actionPress()}>
            <View style={[Section_One, {backgroundColor: currentTab == title ? SOLID_BG : 'transparent'}, footer == false ? Section_Two : Section_Two_Footer]}>
                {icon}
                {footer == false && (<Text style={[TEXT_OPTION_DRAWER,{color: currentTab == title ? NavBars.focus : NavBars.nofocus}]}>{title}</Text>)}
            </View>
        </TouchableOpacity>
    );
}
export default TabButton;