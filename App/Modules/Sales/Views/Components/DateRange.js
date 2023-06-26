import React, {useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import DateRangePicker from "rn-select-date-range";
import moment from "moment";
import Constants from "expo-constants";
import Modal from "react-native-modal";
import { modalContainerStyle,bordePlomo,modalInfo } from '../../../Login/Style/css';
import { GET_FILTER_SALE_DATE, SAVE_FILTER_SALE_DATE } from '../../../../Helpers/API';
import { Modale_Date_Range, Separation_Flex, Width_Max } from '../../../Login/Style/style';
/** */

const DateRange = (props) => {
    const [selectedRange, setRange] = React.useState({});

    React.useEffect(() => {
        getRangeDate();
    }, []);

    async function getRangeDate() {
        let date = await GET_FILTER_SALE_DATE();
        setRange(date);
        props.changeValue(date);
    }

    async function changeRange(Range){
        await SAVE_FILTER_SALE_DATE(Range);
        setRange(Range);
        props.changeValue(Range);
        props.closeModal();
    }

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Modale_Date_Range} onPress={() => props.closeModal()}>
                <View style={Separation_Flex} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo,bordePlomo]}>
                        <View style={Width_Max}>
                            <DateRangePicker onSelectDateRange={(range) => changeRange(range)} onConfirm={() => props.closeModal()} blockSingleDateSelection={true} responseFormat="YYYY-MM-DD" maxDate={moment().add(1, "days")} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default DateRange;