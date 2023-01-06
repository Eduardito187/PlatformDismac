import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { TextInput, Button, HelperText, Snackbar, IconButton } from 'react-native-paper';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { STYLE } from '../Style/style';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import { URL_API,GET_HEADERS,SET_TOKEN_SESSION,CREATE_BODY_LOGIN } from '../../../Helpers/API';
import { NavigationBack } from '../../../Helpers/Nav';

/** Components */
import ProgressCircle from '../../../Components/ProgressCircle';
import Subtitle from '../../../Components/Subtitle';
/** */

const Verificate = ({route, navigation }) => {
    const [Steps, SetSteps] = React.useState(6);
    const [Step, SetStep] = React.useState(1);
    const [Email, SetEmail] = React.useState("");
    const [Disable, SetDisable] = React.useState(true);
    React.useEffect(() => {
        //
    }, []);
    const isEmail = () => {
        return Email.includes('@');
    };
    function generateCode() {
        
    }
    function StepNext() {
        
    }
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
                    <ProgressCircle thickness={2} color={"#FFFFFF"} style={STYLE} Step={Step} Steps={Steps} size={50} />
                </View>
                <View style={{position: "absolute", left: (windowWidth * 0.02),right: (windowWidth * 0.02),top: (windowWidth * 0.30)}}>
                            <Subtitle style={{fontWeight: "700",color: "#FFFFFF",fontSize: 16}} text={"Correo electronico"} />
                </View>
                <View style={{position: "absolute", left: (windowWidth * 0.5) - 50,top: 50}}>
                    <Image source={require('./../../../../pub/Dismac/dismac_.png')} style={{width: 100,height: 28,borderRadius: 3}} />
                </View>
            </View>
            <View style={STYLE.SECCTION_FORM}>
                <View style={{position: "absolute",top: 10,left: 10, right: 10,bottom: 55}}>
                    <View style={{justifyContent: "center",alignItems: "center",flex: 1}}>
                        <View style={{padding: 5, width: (windowWidth - 30)}}>
                            <Subtitle style={{fontWeight: "900",color: "#EC2427",fontSize: 15}} text={"Ingrese su correo electronico."} />
                        </View>
                        <View style={{padding: 5, width: (windowWidth - 30)}}>
                            <TextInput keyboardType={"email-address"} mode='outlined' placeholder="Correo electronico" selectionColor="rgba(0, 0, 0, 0.5)" 
                            underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427" label={"Correo electronico"} 
                            value={Email} onChangeText={text => SetEmail(text)} />
                        </View>
                        <View style={{padding: 5, width: (windowWidth - 30)}}>
                            <Subtitle style={{fontWeight: "500",color: "#808080",fontSize: 13}} text={"Se enviara un codigo de verificacion para que pueda pasar al siguiente paso del registro."} />
                        </View>
                        {
                            isEmail() && (
                                <View style={{padding: 5}}>
                                    <Button icon="check" mode="contained" style={{backgroundColor: "#808080", fontWeight: "900"}} onPress={() => generateCode()}>
                                        <Text style={{fontWeight: "900",color: "#FFFFFF",fontSize: 20}}>Verificar</Text>
                                    </Button>
                                </View>
                            )
                        }
                    </View>
                </View>
                <View style={{position: "absolute",bottom: 10,left: 10, right: 10}}>
                    <Button disabled={Disable} style={{backgroundColor: "#EC2427", fontWeight: "900"}} mode="contained" onPress={() => StepNext()}>
                        <Text style={{fontWeight: "900",color: "#FFFFFF",fontSize: 20}}>Siguente</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default Verificate;