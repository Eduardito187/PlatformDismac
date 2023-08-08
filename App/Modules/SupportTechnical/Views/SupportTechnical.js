import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page, SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY, SCROLL_STYLE} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { FAB } from 'react-native-paper';

/** Components */
import Header from '../../Home/Views/Components/Header';
import { RED_DIS, WHITE } from '../../Login/Style/css';
import ProblemItem from '../../Catalog/Views/Components/ProblemItem';
import { GET_HEADER_TOKEN, URL_API, generateCustomId } from '../../../Helpers/API';

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
        getTicketsAccount();
    }

    function plusAction() {
        props.navigation.navigate("NewSupportTechnical", {"TOKEN":TOKEN, "onGoBack": onGoBackAction});
    }

    function onGoBackAction(){
        getTicketsAccount();
    }

    function getSupportTickets(url) {
        axios.get(URL_API(url),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SetItems(res.data.response);
            }
        }).catch(err => {
            //
        });
    }

    function getTicketsAccount(){
        getSupportTickets("currentAccount/getTicketsAccount");
    }
    function getTicketsPartner(){
        getSupportTickets("currentAccount/getTicketsPartner");
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
                            <ProblemItem key={generateCustomId()} Screen={""} TOKEN={props.TOKEN} Item={item} />
                        )
                    })
                }
                </ScrollView>
                <FAB.Group backdropColor={"rgba(0,0,0,0.5)"} color={RED_DIS} open={open} visible icon={open ? 'star' : 'plus'}
                    actions={[
                        {icon: 'plus',color: RED_DIS, onPress: () => plusAction() },
                        {icon: 'account',label: 'Propios',color: RED_DIS,labelTextColor: WHITE,onPress: () => getTicketsAccount()},
                        {icon: 'account-child-circle',label: 'Partner',color: RED_DIS,labelTextColor: WHITE,onPress: () => getTicketsPartner()},
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => accionOpen()}
                />
            </View>
        </View>
    );
};

export default SupportTechnical;