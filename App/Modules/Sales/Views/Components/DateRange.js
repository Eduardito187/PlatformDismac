import React, {useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";
import { modalContainerStyle,bordePlomo,modalInfo } from '../../../Login/Style/css';
import { GET_FILTER_SALE_DATE, SAVE_FILTER_SALE_DATE } from '../../../../Helpers/API';
import { Modale_Date_Range, Separation_Flex, Width_Max } from '../../../Login/Style/style';
import { Button, Text } from 'react-native-paper';
/** */

const DateRange = (props) => {
    const [selectedRange, setRange] = React.useState({"firstDate": "", "secondDate": ""});
    const [datePicker, setDatePicker] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [dateEndPicker, setDateEndPicker] = React.useState(false);

    const [dateEnd, setEndDate] = React.useState(new Date(Date.now()));

    React.useEffect(() => {
        getRangeDate();
    }, []);

    async function getRangeDate() {
        let date = await GET_FILTER_SALE_DATE();
        setRange(date);
        props.changeValue(date);
    }

    async function changeRange(Range){
        console.log(Range);
        await SAVE_FILTER_SALE_DATE(Range);
        setRange(Range);
        props.changeValue(Range);
        props.closeModal();
    }

    function showDatePicker() {
        setDatePicker(true);
    };
 
    function showDateEndPicker() {
        setDateEndPicker(true);
    };

    function formattedDateTime(currentDate){
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    
    function onDateSelected(event, value) {
        setDatePicker(false);
        setDate(value);
    };

    function onDateEndSelected(event, value) {
        setDateEndPicker(false);
        setEndDate(value);
    };

    function applyChangesbtn() {
        let range = {"firstDate": formattedDateTime(date), "secondDate": formattedDateTime(dateEnd)};
        changeRange(range);
    }

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Modale_Date_Range} onPress={() => props.closeModal()}>
                <View style={Separation_Flex} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo,bordePlomo]}>
                        <View style={Width_Max}>
                            {datePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode={'date'}
                                    display={"spinner"}
                                    onChange={onDateSelected}
                                    style={{justifyContent: 'center',alignItems: 'flex-start',width: 320,height: 260,display: 'flex'}}
                                />
                            )}
                        
                            {dateEndPicker && (
                                <DateTimePicker
                                    value={dateEnd}
                                    mode={'date'}
                                    display={"spinner"}
                                    onChange={onDateEndSelected}
                                    style={{justifyContent: 'center',alignItems: 'flex-start',width: 320,height: 260,display: 'flex'}}
                                />
                            )}
                        
                            {!datePicker && (
                                <View style={{ margin: 10 }}>
                                    <Button mode="contained" onPress={() => showDatePicker()}>
                                        <Text>Show Date Ini Picker</Text>
                                    </Button>
                                </View>
                            )}
                        
                            {!dateEndPicker && (
                                <View style={{ margin: 10 }}>
                                    <Button mode="contained" onPress={() => showDateEndPicker()}>
                                        <Text>Show Date End Picker</Text>
                                    </Button>
                                </View>
                            )}
                            
                            <View style={{ margin: 10 }}>
                                <Button mode="contained" onPress={() => applyChangesbtn()}>
                                    <Text>Confirmar cambios</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default DateRange;