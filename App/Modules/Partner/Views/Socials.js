import React, {useState} from 'react';
import { View, ScrollView } from 'react-native';
import { SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import { windowWidth } from '../../../Helpers/GetMobil';
import { GET_HEADER_TOKEN, URL_API, generateCustomId } from '../../../Helpers/API';
import axios from 'axios';

/** Components */
import { StatusBar } from 'expo-status-bar';
import { RED_DIS } from '../../Login/Style/css';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import SocialComponent from './Components/SocialComponent';
/** */

const Socials = ({route, navigation }) => {
    const { roles, Socket, TOKEN } = route.params;
    const widthView = windowWidth-20;
    const [LOADING, SETLOADING] = React.useState(false);
    const [Data, SetData] = React.useState(false);

    React.useEffect(() => {
        sendQuery();
    }, []);

    function sendQuery(){
        axios.get(URL_API("sociaList"),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SetData(res.data.response);
                SETLOADING(true);
            }
        }).catch(err => {});
    }

    if (LOADING == false){
        return (<LoadingPage />);
    }else{
        return (
            <View>
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                {
                    Data.map((state) => {
                        return (
                            <SocialComponent key={generateCustomId()} TOKEN={TOKEN} state={state} route={route} navigation={navigation} height={150} />
                        )
                    })
                }
                </ScrollView>
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </View>
        );
    }
};

export default Socials;