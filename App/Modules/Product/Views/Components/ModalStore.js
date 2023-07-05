import React, {useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { windowHeight, windowWidth } from '../../../../Helpers/GetMobil';
import Constants from "expo-constants";
import Modal from "react-native-modal";
import QRCode from 'react-native-qrcode-svg';
import { modalContainerStyle,bordePlomo,modalInfo, Section_Max_Absolute, Flex_Section } from '../../../Login/Style/css';
import SelectedStore from '../../../Catalog/Views/Components/SelectedStore';
/** */

const ModalStore = (props) => {
    const [StoreSelect, SetStoreSelect] = React.useState([]);
    
    React.useEffect(() => {
        //
    }, []);

    function selectedStoreView(a) {
        console.log(a);
        SetStoreSelect(a);
        props.selectedStore(a);
    }

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Section_Max_Absolute} onPress={() => props.closeModal()}>
                <View style={Flex_Section} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo,bordePlomo]}>
                        <SelectedStore disabled={false} CurrentStore={props.CurrentStore} Action={(a) => selectedStoreView(a)} Type={"name"} value={props.StoreSelect} />
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default ModalStore;