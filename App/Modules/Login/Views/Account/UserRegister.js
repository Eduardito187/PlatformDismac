import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { STYLE,ContentFORM,BottomNEXT,RowForm,AlingFormItem,AlingForm,TitleSub } from '../../Style/style';
import { settingRegister,GetRegister } from '../../../../Helpers/SettingRegister';
import { GenerateCode } from '../../../../Helpers/Code';
/** Components */
import Subtitle from '../../../../Components/Subtitle';
import Top from './../Component/Top';
import Next from './../Component/Next';
import MessageBox from '../../../../Components/MessageBox';
import Verify from '../Component/Verifiy';
import { Route } from '../../Interfaces/Route';
import { RED_DIS } from '../../Style/css';
/** */

const UserRegister = ({route, navigation }) => {
    const [Steps, SetSteps] = React.useState(Route.length);
    const [Step, SetStep] = React.useState(6);
    const [Name, SetName] = React.useState("");
    const [Email, SetEmail] = React.useState("");
    const [Username, SetUsername] = React.useState("");
    const [Disable, SetDisable] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [percent, SetPercent] = React.useState(false);
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Message, SetSetMessage] = React.useState("");
    const [REGISTER, SETREGISTER] = React.useState(null);
    React.useEffect(() => {
        getRegisterData();
    }, []);
    async function getRegisterData() {
        SETREGISTER(JSON.parse(await GetRegister()));
    }
    function generateCode() {
        if (REGISTER != null) {
            if (REGISTER.partner.email == Email) {
                ShowAlertMessage("El email se encuentra en uso, por favor introduzca otro.");
            }else{
                if (GenerateCode(Email, "account", false, ShowAlertMessage)) {
                    SetPercent(true);
                    setIsModalOpen(true);
                }else{
                    SetPercent(false);
                    setIsModalOpen(false);
                }
            }
        }
    }
    async function StepNext() {
        await settingRegister([Name,Email,Username], Step);
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
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Nombre."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Nombre" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Name} onChangeText={text => SetName(text)} maxLength={50} label={Name.length+"/50"} />
                            </View>
                        </View>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Correo electronico."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Correo electronico" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Email} onChangeText={text => changeEmailInput(text)} maxLength={50} label={Email.length+"/50"} />
                            </View>
                        </View>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Usuario."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Usuario" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Username} onChangeText={text => SetUsername(text)} maxLength={20} label={Username.length+"/20"} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={BottomNEXT}>
                    <Next Step={Step} Disable={Name.length > 0 && Disable == false && Username.length > 0 ? false : true} StepFUNCTION={() => generateCode()} StepNext={() => StepNext()} />
                </View>
            </View>
            <MessageBox ShowMessage={ShowMessage} CloseMessage={() => SetShowMessage(false)} Title={"Dismac"} Text={Message} />
            <Verify isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} Error={() => SetDisable(true)} Success={() => successVerify()} percent={percent} />
        </View>
    );
};

export default UserRegister;