import React, {useState} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NavBars } from '../../../../Themes/Dismac/ThemeDismac';
import { SOLID_BG, TEXT_OPTION_DRAWER } from '../../../Login/Style/css';
/** */

const TabButton = (currentTab, setCurrentTab, title, icon) => {
    function actionPress(){
        if (currentTab != title) {
            setCurrentTab(title);
        }
    }
    
    return (
        <TouchableOpacity onPress={() => actionPress()}>
            <View style={{flexDirection: "row",alignItems: 'center',paddingVertical: 4,backgroundColor: currentTab == title ? SOLID_BG : 'transparent',paddingLeft: 13,paddingRight: 35,borderRadius: 8,marginTop: 15}}>
                {icon}
                <Text style={[TEXT_OPTION_DRAWER,{color: currentTab == title ? NavBars.focus : NavBars.nofocus}]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}
export default TabButton;