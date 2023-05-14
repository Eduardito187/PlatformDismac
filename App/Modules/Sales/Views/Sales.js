import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page, SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY, SCROLL_STYLE} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { FAB } from 'react-native-paper';

/** Components */
import Header from '../../Home/Views/Components/Header';
import { RED_DIS, WHITE } from '../../Login/Style/css';
import ProblemItem from '../../Catalog/Views/Components/ProblemItem';
import { GET_HEADER_TOKEN, URL_API } from '../../../Helpers/API';

const Sales = (props) => {
    const [state, setState] = React.useState({ open: false });
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    React.useEffect(() => {
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

export default Sales;