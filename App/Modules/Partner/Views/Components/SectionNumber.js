import React, {useState} from 'react';
import { View, TouchableOpacity, Animated, Easing, Text } from 'react-native';
import { windowWidth } from '../../../../Helpers/GetMobil';
/** */
import axios from 'axios';
import { GET_HEADER_TOKEN, URL_API } from '../../../../Helpers/API';
import { ALING_CENTER, ROW_SECTION, SECTION_ICON, SECTION_NUMBER, SECTION_ONE, SECTION_TEXT, TEXT_COUNT } from '../../Style/Style';
import LoadItem from '../../../../Components/LoadItem';

const SectionNumber = (props) => {
    const [border, SetBorder] = useState(new Animated.Value(0));
    const [Count, SetCount] = React.useState(0);
    const [Load, SetLoad] = React.useState(false);

    React.useEffect(() => {
        getDataCount();
    }, []);

    function setResponse(count){
        SetCount(count);
        SetLoad(true);
    }

    function getDataCount(){
        axios.get(URL_API(props.api),GET_HEADER_TOKEN(props.TOKEN)).then(res => {
            if(res.data != null){
                setResponse(res.data.response);
            }else{
                setResponse(0);
            }
            animateLoader();
        }).catch(err => {});
    }
    
    function animateLoader() {
        Animated.timing(border, {toValue: 10,duration: 1000,easing: Easing.linear,useNativeDriver: true}).start();
    }

    if (Load === false) {
        return (<LoadItem />);
    }else{
        return(
            <Animated.View style={[{width: "100%", borderRadius: border}, ROW_SECTION, props.style]}>
                <View style={SECTION_ONE}>
                    <Text style={SECTION_TEXT}>{props.label}</Text>
                </View>
                <TouchableOpacity style={[{width: (windowWidth - 30)}, SECTION_NUMBER]} onPress={() => props.Action()}>
                    <View style={SECTION_ICON}>{props.icon}</View>
                    <View style={[{width: (windowWidth - 125)}, ALING_CENTER]}>
                        <Text style={TEXT_COUNT}>{Count}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    }
};
export default SectionNumber;