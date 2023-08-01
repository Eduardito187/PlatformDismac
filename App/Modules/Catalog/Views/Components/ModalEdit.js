import React, {useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { windowHeight, windowWidth } from '../../../../Helpers/GetMobil';
import Constants from "expo-constants";
import Modal from "react-native-modal";
import { modalContainerStyle,bordePlomo,modalInfo, Section_Max_Absolute, Flex_Section } from '../../../Login/Style/css';
import { Button, Text } from 'react-native-paper';
import { Top_15_Red } from '../../../Login/Style/style';
/** */

const ModalEdit = (props) => {
    
    React.useEffect(() => {
        //
    }, []);

    function selectecAction(a) {
        props.closeModal();
        props.actionEdit(a);
    }

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Section_Max_Absolute} onPress={() => props.closeModal()}>
                <View style={Flex_Section} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo,bordePlomo]}>
                        <Button mode="contained" style={[Top_15_Red]} onPress={() => selectecAction("ProductStatus")}>
                            Estados
                        </Button>
                        <Button mode="contained" style={[Top_15_Red]} onPress={() => selectecAction("ProductPrices")}>
                            Precios
                        </Button>
                        <Button mode="contained" style={[Top_15_Red]} onPress={() => selectecAction("ProductPos")}>
                            Valores no editables
                        </Button>
                        <Button mode="contained" style={[Top_15_Red]} onPress={() => selectecAction("ProductAttributes")}>
                            Atributos
                        </Button>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default ModalEdit;