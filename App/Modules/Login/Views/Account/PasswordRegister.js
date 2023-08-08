import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { STYLE,ContentFORM,BottomNEXT,RowForm,AlingFormItem,AlingForm,TitleSub } from '../../Style/style';
import { settingRegister } from '../../../../Helpers/SettingRegister';
/** Components */
import Subtitle from '../../../../Components/Subtitle';
import Top from './../Component/Top';
import Next from './../Component/Next';
import { Route } from '../../Interfaces/Route';
import { RED_DIS } from '../../Style/css';
/** */

const PasswordRegister = ({route, navigation }) => {
    const [Steps, SetSteps] = React.useState(Route.length);
    const [Step, SetStep] = React.useState(7);

    const [password, setPassword] = React.useState("");
    const [pwdP, setpwdP] = React.useState(0);
    const [iconPWD, setIconPWD] = React.useState("eye");
    const [passwordV, setPasswordV] = React.useState("");
    const [pwdPV, setpwdPV] = React.useState(0);
    const [iconPWDV, setIconPWDV] = React.useState("eye");
    React.useEffect(() => {
        //
    }, []);
    async function StepNext() {
        await settingRegister(passwordV, Step);
        navigation.push(Route[Step-1]["Next"]);
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
                                <Subtitle style={TitleSub} text={"Contraseña."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput secureTextEntry={iconPWD == "eye" ? true : false} right={<TextInput.Icon icon={iconPWD} onPress={ iconPWD == "eye" ? () => setIconPWD("eye-off") : () => setIconPWD("eye")} />} mode='outlined' placeholder="Ingrese su contraseña" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={password} onChangeText={text => setPassword(text)} onFocus={() => setpwdP(2)} onBlur={() => setpwdP(0)} />
                            </View>
                        </View>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Verificar contraseña."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput secureTextEntry={iconPWDV == "eye" ? true : false} right={<TextInput.Icon icon={iconPWDV} onPress={ iconPWDV == "eye" ? () => setIconPWDV("eye-off") : () => setIconPWDV("eye")} />} mode='outlined' placeholder="Ingrese su contraseña" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={passwordV} onChangeText={text => setPasswordV(text)} onFocus={() => setpwdPV(2)} onBlur={() => setpwdPV(0)} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={BottomNEXT}>
                    <Next Step={Step} Disable={password == passwordV && password.length > 8 ? false : true} StepNext={() => StepNext()} />
                </View>
            </View>
        </View>
    );
};

export default PasswordRegister;