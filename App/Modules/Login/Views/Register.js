import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { STYLE,ContentFORM,BottomNEXT,RowForm,AlingForm,TitleSub,Label,P5,SecondaryStyle,SecondaryText } from '../Style/style';
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
    const [ShowValidate, SetShowValidate] = React.useState(false);
    const [Disable, SetDisable] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [percent, SetPercent] = React.useState(false);
    React.useEffect(() => {
        //
    }, []);
    function generateCode() {
        if (GenerateCode(Email)) {
            SetPercent(true);
            setIsModalOpen(true);
        }else{
            SetPercent(false);
            setIsModalOpen(false);
        }
    }
    function StepNext() {
        navigation.push(Route[Step-1]["Next"]);
    }

    return (
        <View style={STYLE.RegisterContainer}>
            <StatusBar style="light" />
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
                            underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427" label={"Correo electronico"} 
                            value={Email} onChangeText={text => {
                                SetShowValidate(text.includes("@"));
                                SetEmail(text);
                            }} />
                        </View>
                        <View style={RowForm}>
                            <Subtitle style={Label} text={"Se enviara un codigo de verificacion para que pueda pasar al siguiente paso del registro."} />
                        </View>
                        {
                            ShowValidate && (
                                <View style={P5}>
                                    <SecondaryIcon style={SecondaryStyle} textStyle={SecondaryText} icon={"check"} text={"Verificar"} Action={() => generateCode()} />
                                </View>
                            )
                        }
                    </View>
                </View>
                <View style={BottomNEXT}>
                    <Next Disable={Disable} StepNext={() => StepNext()} />
                </View>
            </View>
            <Verify isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} Error={() => SetDisable(true)} Success={() => {
                SetDisable(false);
                SetShowValidate(false);
                }} percent={percent} />
        </View>
    );
};

export default Register;