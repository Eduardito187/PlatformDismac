import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page, SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY, SCROLL_STYLE} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { FAB } from 'react-native-paper';

/** Components */
import Header from '../../Home/Views/Components/Header';
import { RED_DIS, WHITE } from '../../Login/Style/css';
import ProblemItem from '../../Catalog/Views/Components/ProblemItem';

const SupportTechnical = (props) => {
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
        let items = [
            {
                "id" : 1,
                "title" : "Error #1",
                "description" : "Descripcion #1",
                "account" : {
                    "id" : 1,
                    "name" : "Eduard Henslin Huallata Chavez",
                    "email" : "eduardchavez302@gmail.com"
                },
                "time" : "14 min"
            },
            {
                "id" : 2,
                "title" : "Error #2",
                "description" : "Descripcion #2",
                "account" : {
                    "id" : 1,
                    "name" : "Eduard Henslin Huallata Chavez",
                    "email" : "eduardchavez302@gmail.com"
                },
                "time" : "3 hrs"
            },
            {
                "id" : 3,
                "title" : "Error #3",
                "description" : "Descripcion #3",
                "account" : {
                    "id" : 1,
                    "name" : "Eduard Henslin Huallata Chavez",
                    "email" : "eduardchavez302@gmail.com"
                },
                "time" : "2 D"
            },
            {
                "id" : 4,
                "title" : "Error #4",
                "description" : "Descripcion #4",
                "account" : {
                    "id" : 1,
                    "name" : "Eduard Henslin Huallata Chavez",
                    "email" : "eduardchavez302@gmail.com"
                },
                "time" : "23 D"
            },
            {
                "id" : 5,
                "title" : "Error #5",
                "description" : "Descripcion #5",
                "account" : {
                    "id" : 1,
                    "name" : "Eduard Henslin Huallata Chavez",
                    "email" : "eduardchavez302@gmail.com"
                },
                "time" : "3 M"
            }
        ];
        SetItems(items);
    }

    function plusAction() {
        props.navigation.navigate("NewSupportTechnical", {"TOKEN":TOKEN, "onGoBack": onGoBackAction});
    }

    function onGoBackAction(){
        //
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
                        {icon: 'account',label: 'Propios',color: RED_DIS,labelTextColor: WHITE,onPress: () => console.log('Pressed star')},
                        {icon: 'account-child-circle',label: 'Partner',color: RED_DIS,labelTextColor: WHITE,onPress: () => console.log('Pressed email')},
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => accionOpen()}
                />
            </View>
        </View>
    );
};

export default SupportTechnical;