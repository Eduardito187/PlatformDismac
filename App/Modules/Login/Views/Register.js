import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { STYLE,ContentFORM,BottomNEXT,RowForm,AlingForm,TitleSub,Label,P5,SecondaryStyle,SecondaryText } from '../Style/style';
import { GenerateCode } from '../../../Helpers/Code';
import { settingRegister } from '../../../Helpers/SettingRegister';
/** Components */
import Subtitle from '../../../Components/Subtitle';
import Top from './Component/Top';
import Next from './Component/Next';
import { Route } from '../Interfaces/Route';
import Verify from './Component/Verifiy';
import MessageBox from '../../../Components/MessageBox';
import { RED_DIS } from '../Style/css';
/** */

const Register = ({route, navigation }) => {
    const [Steps, SetSteps] = React.useState(Route.length);
    const [Step, SetStep] = React.useState(1);
    const [Email, SetEmail] = React.useState("");
    const [Disable, SetDisable] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [percent, SetPercent] = React.useState(false);
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Message, SetSetMessage] = React.useState("");
    React.useEffect(() => {
        //
    }, []);
    function generateCode() {
        if (GenerateCode(Email, "partner", false, ShowAlertMessage)) {
            SetPercent(true);
            setIsModalOpen(true);
        }else{
            SetPercent(false);
            setIsModalOpen(false);
        }
    }
    async function StepNext() {
        await settingRegister(Email, Step);
        navigation.push(Route[Step-1]["Next"]);
    }
    function successVerify() {
        SetDisable(false);
        StepNext();
    }
    function changeEmailInput(text) {
        SetDisable(!text.includes("@"));
        SetEmail(text);
    }
    function ShowAlertMessage(text) {
        SetSetMessage(text);
        SetShowMessage(true);
        SetPercent(false);
        setIsModalOpen(false);
    }
    return (
        <View style={STYLE.RegisterContainer}>
            <StatusBar backgroundColor={RED_DIS} style="light" />
            <View style={STYLE.SECCTION_TITLE}>
                <Top Step={Step} Steps={Steps} Title={Route[Step-1]["title"]} navigation={navigation} />
            </View>
            <View style={STYLE.SECCTION_FORM}>
                <View style={ContentFORM}>
                    <View style={AlingForm}>
                        <View style={RowForm}>
                            <Subtitle style={TitleSub} text={"Ingrese su correo electronico."} />
                        </View>
                        <View style={RowForm}>
                            <TextInput keyboardType={"email-address"} mode='outlined' placeholder="Correo electronico" selectionColor="rgba(0, 0, 0, 0.5)" 
                            underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                            value={Email} onChangeText={text => changeEmailInput(text)} maxLength={50} label={Email.length+"/50"} />
                        </View>
                        <View style={RowForm}>
                            <Subtitle style={Label} text={"Se enviara un codigo de verificacion para que pueda pasar al siguiente paso del registro."} />
                        </View>
                    </View>
                </View>
                <View style={BottomNEXT}>
                    <Next Step={Step} Disable={Disable} StepFUNCTION={() => generateCode()} StepNext={() => StepNext()} />
                </View>
            </View>
            <MessageBox ShowMessage={ShowMessage} CloseMessage={() => SetShowMessage(false)} Title={"Dismac"} Text={Message} />
            <Verify isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} Error={() => SetDisable(true)} Success={() => successVerify()} percent={percent} />
        </View>
    );
};

export default Register;