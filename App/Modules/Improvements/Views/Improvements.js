import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page, SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY, SCROLL_STYLE} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';

/** Components */
import Header from '../../Home/Views/Components/Header';

const Improvements = (props) => {
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    React.useEffect(() => {
        //
    }, []);
    
    return (
        <View style={SCREEN_RELATIVE}>
            <View style={SCREEN_ABSOLUTE_HEADER}>
                <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} />
            </View>
            <View style={SCREEN_ABSOLUTE_BODY}>
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                </ScrollView>
            </View>
        </View>
    );
};

export default Improvements;