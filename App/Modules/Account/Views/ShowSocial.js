import React, {useState} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Padding_10_B_5, SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY } from '../../../Themes/Dismac/ThemeDismac';
import { AlingFormItem, RowForm, SubTitleText, TitleSub } from '../../Login/Style/style';
import { windowWidth, windowHeight } from '../../../Helpers/GetMobil';

/** Components */
import Subtitle from '../../../Components/Subtitle';
import { StatusBar } from 'expo-status-bar';
import { RED_DIS, TEXT_HEADER } from '../../Login/Style/css';
import Header from '../../Home/Views/Components/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import PopUpLink from './Components/PopUpLink';
/** */

const ShowSocial = ({route, navigation }) => {
    const {social,TOKEN,socket} = route.params;
    const [heightBar, SetHeightBar] = React.useState(getStatusBarHeight());
    const [LOADING, SETLOADING] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [LinkUrl, SetLinkUrl] = React.useState("");

    React.useEffect(() => {
        SETLOADING(true);
    }, []);

    function showModal(a) {
        SetLinkUrl(a);
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    function backAccount() {
        navigation.goBack();
    }

    if (LOADING == false){
        return (<LoadingPage />);
    }else{
        return (
            <View style={[{marginTop: heightBar}]}>
                <View style={SCREEN_RELATIVE}>
                    <View style={SCREEN_ABSOLUTE_HEADER}>
                        <Header DrawerAction={() => backAccount()} center={(<Text style={[TEXT_HEADER]}>{social.social.name}</Text>)} />
                    </View>
                    <View style={SCREEN_ABSOLUTE_BODY}>
                        <View style={[{width: windowWidth, height: windowHeight}]}>
                            <View style={Padding_10_B_5}>
                                <View style={AlingFormItem}>
                                    <View style={RowForm}>
                                        <Subtitle style={TitleSub} text={"Social link."} />
                                    </View>
                                    <TouchableOpacity onPress={() => showModal(social.social.url)} style={RowForm}>
                                        <Subtitle style={SubTitleText} text={social.social.url} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={Padding_10_B_5}>
                                <View style={AlingFormItem}>
                                    <View style={RowForm}>
                                        <Subtitle style={TitleSub} text={"Link de "+social.social.name+"."} />
                                    </View>
                                    <TouchableOpacity onPress={() => showModal(social.url)} style={RowForm}>
                                        <Subtitle style={SubTitleText} text={social.url} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <PopUpLink closeModal={() => closeModal()} isModalVisible={isModalVisible} TOKEN={TOKEN} Link={LinkUrl} />
                    <StatusBar backgroundColor={RED_DIS} style="light" />
                </View>
            </View>
        );
    }
};

export default ShowSocial;