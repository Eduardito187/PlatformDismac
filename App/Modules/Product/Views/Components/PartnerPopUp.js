import React, {useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modal";
import { modalContainerStyle,bordePlomo,modalInfo, Section_Max_Absolute, Flex_Section } from '../../../Login/Style/css';
import { Padding_10_B_5 } from '../../../../Themes/Dismac/ThemeDismac';
import { AlingFormItem, Centered, RowForm, RowFormFlex, TitleSub, Top_15_Red, Width_Max } from '../../../Login/Style/style';
import { Button, TextInput } from 'react-native-paper';
import Subtitle from '../../../../Components/Subtitle';
import axios from 'axios';
import { GET_HEADER_TOKEN, URL_API_POS } from '../../../../Helpers/API';
import ProfilePartner from '../../../Partner/Views/Components/ProfilePartner';
/** */

const PartnerPopUp = (props) => {
    
    React.useEffect(() => {
        //
    }, []);

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Section_Max_Absolute} onPress={() => props.closeModal()}>
                <View style={Flex_Section} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo,bordePlomo]}>
                        <View style={Width_Max}>
                            <ProfilePartner TOKEN={props.TOKEN} Edit={false} Partner={props.Partner} Socket={props.Socket} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default PartnerPopUp;