import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { TextInput, Button, HelperText, Snackbar, IconButton } from 'react-native-paper';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { STYLE } from '../Style/style';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import { URL_API,GET_HEADERS,SET_TOKEN_SESSION,CREATE_BODY_LOGIN } from '../../../Helpers/API';
import { NavigationBack } from '../../../Helpers/Nav';

/** Components */
/** */

const Register = ({route, navigation }) => {
    const [Steps, SetSteps] = React.useState(6);
    const [Step, SetStep] = React.useState(1);
    React.useEffect(() => {
        //
    }, []);
    function goBack() {
        NavigationBack(navigation);
    }

    return (
        <View style={STYLE.RegisterContainer}>
            <StatusBar style="light" />
            <View style={STYLE.SECCTION_TITLE}>
                <View style={STYLE.SECTION_TOP_LEFT}>
                    <IconButton icon="arrow-left" iconColor={"#FFFFFF"} size={28} onPress={() => goBack()} />
                </View>
                <View style={STYLE.SECTION_TOP_RIGHT}>
                    <Progress.Circle color={"#FFFFFF"} size={50} style={STYLE.PROGRESS_CIRCLE} progress={((1 / 6) * Step)} thickness={2} showsText={false} >
                        <View style={STYLE.ABSOLUTE}>
                            <Text style={STYLE.FONT_PROGRESS}>{Step}/{Steps}</Text>
                        </View>
                    </Progress.Circle>
                </View>
                <View style={{position: "absolute", left: (windowWidth * 0.02),right: (windowWidth * 0.02),top: (windowWidth * 0.30)}}>
                    <Text style={{fontWeight: "600",color: "#FFFFFF",fontSize: 15}}>Mensaje para registrar una nueva cuenta.</Text>
                </View>
            </View>
            <View style={STYLE.SECCTION_FORM}></View>
        </View>
    );
};

export default Register;