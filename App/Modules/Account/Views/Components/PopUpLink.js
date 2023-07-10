import React, {useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modal";
import { modalContainerStyle,bordePlomo,modalInfo, Section_Max_Absolute, Flex_Section } from '../../../Login/Style/css';
import { WebView } from 'react-native-webview';
import { windowHeight } from '../../../../Helpers/GetMobil';
import { Width_Max } from '../../../Login/Style/style';
/** */

const PopUpLink = (props) => {
    
    React.useEffect(() => {
        //
    }, []);

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Section_Max_Absolute} onPress={() => props.closeModal()}>
                <View style={Flex_Section} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo,bordePlomo]}>
                        <View style={[Width_Max,{height: windowHeight*0.7}]}>
                            <WebView source={{uri: props.Link}} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default PopUpLink;