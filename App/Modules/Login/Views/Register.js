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
import { GenerateCode } from '../../../Helpers/Code';

/** Components */
import Subtitle from '../../../Components/Subtitle';
import SecondaryIcon from '../../../Components/Button/SecondaryIcon';
import Top from './Component/Top';
import Next from './Component/Next';
import { Route } from '../Interfaces/Route';
import Verify from './Component/Verifiy';
/** */

const Register = ({route, navigation }) => {
    const [Steps, SetSteps] = React.useState(6);
    const [Step, SetStep] = React.useState(1);
    const [Email, SetEmail] = React.useState("");
    const [Disable, SetDisable] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    React.useEffect(() => {
        //
    }, []);
    const isEmail = () => {
        return Email.includes('@');
    };
    function generateCode() {
        if (GenerateCode(Email)) {
            setIsModalOpen(true);
        }else{
            setIsModalOpen(false);
        }
    }
    function StepNext() {
        
    }

    return (
        <View style={STYLE.RegisterContainer}>
            <StatusBar style="light" />
            <View style={STYLE.SECCTION_TITLE}>
                <Top Step={Step} Steps={Steps} Title={Route[Step-1]["title"]} navigation={navigation} />
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
                                    <SecondaryIcon style={{backgroundColor: "#808080", fontWeight: "900"}} textStyle={{fontWeight: "900",color: "#FFFFFF",fontSize: 20}} icon={"check"} text={"Verificar"} Action={() => generateCode()} />
                                </View>
                            )
                        }
                    </View>
                </View>
                <View style={{position: "absolute",bottom: 10,left: 10, right: 10}}>
                    <Next Disable={Disable} StepNext={() => StepNext()} />
                </View>
            </View>
            <Verify isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </View>
    );
};

export default Register;