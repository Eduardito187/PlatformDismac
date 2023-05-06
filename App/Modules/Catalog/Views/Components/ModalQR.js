import React, {useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { windowHeight, windowWidth } from '../../../../Helpers/GetMobil';
import Modal from "react-native-modal";
import QRCode from 'react-native-qrcode-svg';
import { modalContainerStyle,bordePlomo,modalInfo } from '../../../Login/Style/css';
/** */

const ModalQR = (props) => {
    const [Code, SetCode] = React.useState("");
    React.useEffect(() => {
        console.log(props);
        SetCode(JSON.stringify({"key": props.type,"value": props.value}));
    }, []);

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={{position: 'absolute', left:0,right: 0,top: 0, bottom:0}} onPress={() => props.closeModal()}>
                <View style={{ flex: 1,backgroundColor: 'rgba(0,0,0,.5)'}} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
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