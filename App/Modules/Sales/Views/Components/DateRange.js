import React, {useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import DateRangePicker from "rn-select-date-range";
import moment from "moment";
import Constants from "expo-constants";
import Modal from "react-native-modal";
import { modalContainerStyle,bordePlomo,modalInfo } from '../../../Login/Style/css';
/** */

const DateRange = (props) => {
    const [selectedRange, setRange] = React.useState({});

    React.useEffect(() => {
        //
    }, []);

    function changeRange(Range){
        setRange(Range);
        console.log(Range);
    }

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={{position: 'absolute', left:0,right: 0,top: 0, bottom:0}} onPress={() => props.closeModal()}>
                <View style={{ flex: 1,backgroundColor: 'rgba(0,0,0,.5)'}} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo,bordePlomo]}>
                        <View style={{width: "100%"}}>
                            <DateRangePicker onSelectDateRange={(range) => changeRange(range)} onConfirm={() => props.closeModal()} blockSingleDateSelection={true} responseFormat="YYYY-MM-DD" maxDate={moment().add(1, "days")} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default DateRange;