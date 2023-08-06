import React, {useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { windowHeight, windowWidth } from '../../../../Helpers/GetMobil';
import Constants from "expo-constants";
import Modal from "react-native-modal";
import QRCode from 'react-native-qrcode-svg';
import { modalContainerStyle,bordePlomo,modalInfo, Section_Max_Absolute, Flex_Section } from '../../../Login/Style/css';
/** */

const ModalQR = (props) => {
    const [Code, SetCode] = React.useState("");
    
    React.useEffect(() => {
        SetCode(JSON.stringify({"key": props.type,"value": props.value,"version": Constants.expoConfig.version}));
    }, []);

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Section_Max_Absolute} onPress={() => props.closeModal()}>
                <View style={Flex_Section} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo,bordePlomo]}>
                        <QRCode value={Code} size={windowWidth*0.6} />
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default ModalQR;