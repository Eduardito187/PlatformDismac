import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page, SCREEN_RELATIVE, SCROLL_STYLE} from "./../../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';

/** Components */
import LoadingPage from '../../../Home/Views/Components/LoadingPage';

const Pendientes = (props) => {
    const [Items, SetItems] = React.useState([]);
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [Load, SetLoad] = React.useState(false);

    React.useEffect(() => {
        //
    }, []);
    
    if (Load == false) {
        return (<LoadingPage />);
    }else{
        return (
            <View style={SCREEN_RELATIVE}>
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                </ScrollView>
            </View>
        );
    }
};

export default Pendientes;