import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page, SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY, SCROLL_STYLE} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { BottomNavigation, IconButton } from 'react-native-paper';

/** Components */
import Header from '../../Home/Views/Components/Header';
import Realizadas from './Components/Realizadas';
import Pendientes from './Components/Pendientes';
import Canceladas from './Components/Canceladas';
import { PLO_DIS, RED_DIS } from '../../Login/Style/css';
import DateRange from './Components/DateRange';

const Sales = (props) => {
    const [state, setState] = React.useState({ open: false });
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'success', title: 'Realizadas', focusedIcon: 'check-circle', unfocusedIcon: 'check-circle-outline' },
        { key: 'pending', title: 'Pendientes', focusedIcon: 'clock-check', focusedIcon: 'clock-check-outline' },
        { key: 'cancel', title: 'Canceladas', focusedIcon: 'close-octagon', unfocusedIcon: 'close-octagon-outline' }
    ]);
    const [isModalVisible, setModalVisible] = React.useState(false);

    const renderScene = BottomNavigation.SceneMap({
        success: Realizadas,
        pending: Pendientes,
        cancel: Canceladas
    });

    React.useEffect(() => {
    }, []);

    function showModal() {
        setModalVisible(true);
    }
    function closeModal() {
        setModalVisible(false);
    }

    return (
        <View style={SCREEN_RELATIVE}>
            <View style={SCREEN_ABSOLUTE_HEADER}>
                <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} right={(
                    <View style={{width: 40,paddingRight:10}}>
                        <IconButton icon={"calendar"} iconColor={RED_DIS} size={24} onPress={() => showModal()} />
                    </View>)} />
            </View>
            <View style={SCREEN_ABSOLUTE_BODY}>
                <BottomNavigation navigationState={{ index, routes }} sceneAnimationEnabled={true} activeColor={RED_DIS} inactiveColor={PLO_DIS} sceneAnimationType={"shifting"} onIndexChange={setIndex} renderScene={renderScene} />
            </View>
            <DateRange closeModal={() => closeModal()} isModalVisible={isModalVisible} key={"Range_Date"} />
        </View>
    );
};

export default Sales;