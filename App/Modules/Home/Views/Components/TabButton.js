import React, {useState} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NavBars } from '../../../../Themes/Dismac/ThemeDismac';
import { SOLID_BG, TEXT_OPTION_DRAWER } from '../../../Login/Style/css';
import { Section_One, Section_Two } from '../../../Login/Style/style';
/** */

const TabButton = (currentTab, setCurrentTab, title, icon) => {

    function actionPress(){
        if (currentTab != title) {
            setCurrentTab(title);
        }
    }
    
    return (
        <TouchableOpacity onPress={() => actionPress()}>
            <View style={[Section_One, {backgroundColor: currentTab == title ? SOLID_BG : 'transparent'}, Section_Two]}>
                {icon}
                <Text style={[TEXT_OPTION_DRAWER,{color: currentTab == title ? NavBars.focus : NavBars.nofocus}]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}
export default TabButton;