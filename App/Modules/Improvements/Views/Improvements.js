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

const Improvements = (props) => {
    const [Items, SetItems] = React.useState([]);
    const [state, setState] = React.useState({ open: false });
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    React.useEffect(() => {
        loadOptionsItems();
    }, []);

    function accionOpen() {
        if (open) {
            //
        }
    }

    function loadOptionsItems() {
        getImprovementsActive();
    }

    function plusAction() {
        props.navigation.navigate("NewImprovements", {"TOKEN":TOKEN, "onGoBack": onGoBackAction});
    }

    function onGoBackAction(){
        getImprovementsActive();
    }

    function getImprovements(url) {
        axios.get(URL_API(url),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SetItems(res.data.response);
            }
        }).catch(err => {
            //
        });
    }

    function getImprovementsActive(){
        getImprovements("currentAccount/getImprovementsActive");
    }
    
    function getImprovementsInactive(){
        getImprovements("currentAccount/getImprovementsInactive");
    }
    
    return (
        <View style={SCREEN_RELATIVE}>
            <View style={SCREEN_ABSOLUTE_HEADER}>
                <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} />
            </View>
            <View style={SCREEN_ABSOLUTE_BODY}>
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                {
                    Items.map((item) => {
                        return (
                            <ProblemItem key={Math.random()+'_PROBLEM_'+Math.random()} Screen={""} TOKEN={props.TOKEN} Item={item} />
                        )
                    })
                }
                </ScrollView>
                <FAB.Group backdropColor={"rgba(0,0,0,0.5)"} color={RED_DIS} open={open} visible icon={open ? 'star' : 'plus'}
                    actions={[
                        {icon: 'plus',color: RED_DIS, onPress: () => plusAction() },
                        {icon: 'check-all',label: 'Leidos',color: RED_DIS,labelTextColor: WHITE,onPress: () => getImprovementsInactive()},
                        {icon: 'check',label: 'Pendientes',color: RED_DIS,labelTextColor: WHITE,onPress: () => getImprovementsActive()}
                    ]} onStateChange={onStateChange} onPress={() => accionOpen()}
                />
            </View>
        </View>
    );
};

export default Improvements;