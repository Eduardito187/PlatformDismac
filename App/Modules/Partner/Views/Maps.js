import React from 'react';  
import { View, SafeAreaView } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import { Flex_Section, RED_DIS, Section_Content_Two } from '../../Login/Style/css';
import { StatusBar } from 'expo-status-bar';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { Section_Flex } from '../../Login/Style/style';

const Maps = ({route, navigation }) => {
    const { map, socket, TOKEN, Customer, Municipio } = route.params;
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        loadMap();
    }, []);

    function loadMap(){
        setLoading(true);
    }

    if (loading === false || map == null || Customer == null || Municipio == null) {
        return (<LoadingPage />);
    }else{
        return (
            <SafeAreaView style={Section_Flex}>
                <MapView style={Flex_Section} initialRegion={map} showsUserLocation={true}>
                    <Marker coordinate={map} title={Customer} description={Municipio} />
                </MapView>
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </SafeAreaView>
        );
    }
};

export default Maps;