import React, {useState} from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import axios from 'axios';
import Modal from "react-native-modal";
import { modalContainerStyle,bordePlomo,modalInfo, Section_Max_Absolute, Flex_Section, Button_Red_Dis, Border_Radius_5, Margin_Bottom_25, Margin_Top_25, Button_Plomo_Dis } from '../../../Login/Style/css';
import { Surface } from 'react-native-paper';
import { windowWidth } from '../../../../Helpers/GetMobil';
import { Surface_Style, Width_Max } from '../../../Login/Style/style';
import { alingContentCenter } from '../../Style/Two';
/** */

const ModalPicture = (props) => {
    const [TOKEN, SETTOKEN] = React.useState(props.TOKEN);
    
    React.useEffect(() => {
        //
    }, []);

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Section_Max_Absolute} onPress={() => props.closeModal()}>
                <View style={Flex_Section} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo,bordePlomo]}>
                        <View style={[Width_Max, alingContentCenter]}>
                            <Image key={Math.random()+'_Picture_Modal_'+Math.random()} style={[{width: windowWidth*0.7, height: windowWidth*0.7}]} source={{uri: props.file}} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default ModalPicture;