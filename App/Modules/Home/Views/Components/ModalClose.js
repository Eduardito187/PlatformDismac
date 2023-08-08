import React, {useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { Text } from 'react-native-paper';
import { modalContainerStyle,bordePlomo,modalInfo, Section_Max_Absolute, Flex_Section, RED_DIS } from '../../../Login/Style/css';
import { alingContentCenter } from '../../../Catalog/Style/Two';
/** */

const ModalClose = (props) => {
    React.useEffect(() => {
        //
    }, []);

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Section_Max_Absolute} onPress={() => props.closeModal()}>
                <View style={Flex_Section} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo, bordePlomo, alingContentCenter]}>
                        <MaterialCommunityIcons name="close-outline" size={100} color={RED_DIS} />
                        <Text variant="titleLarge">Lo sentimos, pero hay otro dispositivo conectándose a su cuenta.</Text>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default ModalClose;