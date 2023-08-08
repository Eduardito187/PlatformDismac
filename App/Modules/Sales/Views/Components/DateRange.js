import React, {useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";
import { modalContainerStyle,bordePlomo,modalInfo, Button_Red_Dis, Section_Card_Title, Color_White } from '../../../Login/Style/css';
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

    function readDateFilter(date){
        if (date == null || date == "" || date == 'undefined'){
            return new Date();
        }
        const [year, month, day] = date.split('-');
        return new Date(year, month - 1, day);
    }

    async function getRangeDate() {
        let date = await GET_FILTER_SALE_DATE();
        setDate(readDateFilter(date.firstDate));
        setEndDate(readDateFilter(date.secondDate));
        setRange(date);
        props.changeValue(date);
    }

    async function changeRange(Range){
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
                                    <Button mode="contained" style={[Button_Red_Dis]} onPress={() => showDatePicker()}>
                                        <Text style={[Section_Card_Title, Color_White]}>Fecha inicial</Text>
                                    </Button>
                                </View>
                            )}
                        
                            {!dateEndPicker && (
                                <View style={{ margin: 10 }}>
                                    <Button mode="contained" style={[Button_Red_Dis]} onPress={() => showDateEndPicker()}>
                                        <Text style={[Section_Card_Title, Color_White]}>Fecha final</Text>
                                    </Button>
                                </View>
                            )}
                            
                            <View style={{ margin: 10 }}>
                                <Button mode="contained" style={[Button_Red_Dis]} onPress={() => applyChangesbtn()}>
                                    <Text style={[Section_Card_Title, Color_White]}>Confirmar cambios</Text>
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