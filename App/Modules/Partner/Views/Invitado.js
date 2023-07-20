import React from 'react';  
import { View, ScrollView, LogBox, ActivityIndicator } from 'react-native';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';

/** Components */
import { RED_DIS, Section_Content_Custom, Section_Content_Flex } from '../../Login/Style/css';
import { StatusBar } from 'expo-status-bar';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { IconButton } from 'react-native-paper';
import { DELETE_TOKEN_INVITADO, GET_TOKEN } from '../../../Helpers/API';
import { ResetNavigation } from '../../../Helpers/Nav';
import PopUpQr from './Components/PopUpQr';

const Invitado = ({route, navigation }) => {
    const widthView = windowWidth-20;
    const [TOKEN, SetTOKEN] = React.useState(route.params.TOKEN);
    const [Status, SetStatus] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        loadScreen();
    }, []);

    function loadScreen(){
        navigation.setOptions({
            headerLeft: () => (<IconButton icon={"arrow-left"} iconColor={RED_DIS} onPress={() => cerrarSession()} />),
            headerRight: () => (<IconButton icon={"camera"} iconColor={RED_DIS} onPress={() => showModal()} />)
        });
        SetStatus(true);
    }

    async function cerrarSession() {
        if (await DELETE_TOKEN_INVITADO()) {
          ResetNavigation("Loading",{}, navigation);
        }
    }

    function showModal() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    if (Status === true) {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={Section_Content_Custom}>
                <PopUpQr closeModal={() => closeModal()} isModalVisible={isModalVisible} TOKEN={TOKEN} />
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </ScrollView>
        );
    }else{
        return(
            <LoadingPage />
        );
    }
};

export default Invitado;