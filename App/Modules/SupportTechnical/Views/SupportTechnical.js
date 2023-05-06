import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page, SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY, SCROLL_STYLE} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { FAB } from 'react-native-paper';

/** Components */
import Header from '../../Home/Views/Components/Header';
import { RED_DIS, WHITE } from '../../Login/Style/css';

const SupportTechnical = (props) => {
    const [state, setState] = React.useState({ open: false });
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
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
                    <Text>HOLA</Text>
                </ScrollView>
                <FAB.Group backdropColor={"rgba(0,0,0,0.5)"} color={RED_DIS}
                    open={open}
                    visible
                    icon={open ? 'star' : 'plus'}
                    actions={[
                        {icon: 'plus',color: RED_DIS, onPress: () => console.log('Pressed add') },
                        {icon: 'account',label: 'Propios',color: RED_DIS,labelTextColor: WHITE,onPress: () => console.log('Pressed star')},
                        {icon: 'email',label: 'Partner',color: RED_DIS,labelTextColor: WHITE,onPress: () => console.log('Pressed email')},
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                        // do something if the speed dial is open
                        }
                    }}
                />
            </View>
        </View>
    );
};

export default SupportTechnical;