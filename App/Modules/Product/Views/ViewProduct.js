import React from 'react';  
import { View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { Snackbar, List, TextInput, Button } from 'react-native-paper';
import { JUSTIFY_CONTENT, Margin_Top_5, RED_DIS, ROW_SECTION } from '../../Login/Style/css';
import { Section_Flex, style } from '../../Login/Style/style';
import { StatusBar } from 'expo-status-bar';
import { GET_HEADER_TOKEN, URL_API } from '../../../Helpers/API';
import { SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import LoadingPage from '../../Home/Views/Components/LoadingPage';

/** Components */

const ViewProduct = ({route, navigation }) => {
    const { TOKEN, id_product } = route.params;
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        thenLoading();
    }, []);

    function thenLoading() {
        setLoading(true);
    }

    if (loading === false) {
        return (<LoadingPage />);
    }else{
        return (
            <SafeAreaView style={Section_Flex}>
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                </ScrollView>
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </SafeAreaView>
        );
    }
};

export default ViewProduct;