import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { TextInput, Button, HelperText, Snackbar } from 'react-native-paper';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { style } from '../Style/style';
import axios from 'axios';
import { URL_API,METHOD_POST,GET_TOKEN } from '../../../Helpers/API';

/** Components */
import Circle from '../../../Components/Circle';
import Title from '../../../Components/Title';
import CircleRedirect from '../../../Components/CircleRedirect';
/** */

const Login = ({route, navigation }) => {
    const [username, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [userP, setuserP] = React.useState(0);
    const [pwdP, setpwdP] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [disable, setDisable] = React.useState(false);
    const [helperUser, sethelperUser] = React.useState(false);
    const [iconPWD, setIconPWD] = React.useState("eye");
    const [login, setLogin] = React.useState(false);
    const [response, SetRes] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    React.useEffect(() => {
        //
    }, []);
    function InfoClickUsername() {
        if (helperUser) {
            sethelperUser(false);
        }else{
            sethelperUser(true);
            setTimeout(() => {
                sethelperUser(false);
            }, 5000)
        }
    }
    function pressOK() {
        console.log("OK");
    }
    function toHome() {
        setLogin(false);
    }
    function rerificateLogin() {
        if (username.length > 0 && password.length > 0) {
            setLoading(true);
            setDisable(true);
            axios.post(URL_API("login"),{
                "username" : username,
                "password" : password
            },{
                headers: {
                    "Authorization": `Bearer ${GET_TOKEN()}`,
                    "Content-Type": "text/json"
                }
            }).then(res => {
                if (res.data != null) {
                    if (res.data.status == true) {
                        setLogin(true);
                    }
                    SetRes(res.data.text);
                    openSnack();
                }
                setLoading(false);
                setDisable(false);
            }).catch(err => {
                setLoading(false);
                setDisable(false);
                SetRes(err);
                openSnack();
            });
        }else{

        }
    }
    function openSnack() {
        setVisible(true);
    }
    function dismissSnack() {
        setVisible(false);
    }

    return (
        <View style={style.container}>
            <View style={style.circleOne}>
                <Circle size={(windowWidth * 0.8)} />
            </View>
            <View style={style.circleTwo}>
                <Circle size={150} />
            </View>
            <View style={style.circleTree}>
                <Circle size={200} />
            </View>
            <View style={style.FloatLogin}>
                <View style={style.containerTransparent}>
                    <View style={style.TitleContainer}>
                        <Title text={"Iniciar Sesión"} size={35} style={style.Title} />
                    </View>
                    <View style={style.padding5}>
                        <TextInput mode='outlined' left={<TextInput.Icon icon="account" onPress={() => InfoClickUsername()} />} style={{width: (windowWidth - 30), paddingTop: userP}} placeholder="Ingrese su usuario" selectionColor="rgba(0, 0, 0, 0.5)" 
                        underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427" label={<Text style={style.LabelButton}>Usuario</Text>} 
                        value={username} onChangeText={text => setUserName(text)} onFocus={() => setuserP(2)} onBlur={() => setuserP(0)} />
                        {
                            helperUser && (<HelperText type="info" visible={helperUser} style={style.helperText}>Prefijo de la empresa por delante del usuario, ejemplo: 'EMPRESA@Usuario'.</HelperText>)
                        }
                    </View>
                    <View style={style.padding5}>
                        <TextInput secureTextEntry={iconPWD == "eye" ? true : false} right={<TextInput.Icon icon={iconPWD} onPress={ iconPWD == "eye" ? () => setIconPWD("eye-off") : () => setIconPWD("eye")} />} mode='outlined' style={{width: (windowWidth - 30), paddingTop: pwdP}} placeholder="Ingrese su contraseña" selectionColor="rgba(0, 0, 0, 0.5)" 
                        underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427" label={<Text style={style.LabelButton}>Contraseña</Text>} 
                        value={password} onChangeText={text => setPassword(text)} onFocus={() => setpwdP(2)} onBlur={() => setpwdP(0)} />
                    </View>
                    <View style={style.TextPwd}>
                        <Text style={style.labelPwd}>Olvide mi contraseña</Text>
                    </View>
                    <View style={style.containButton}>
                        <Button icon="account" loading={loading} disabled={disable} style={style.fondoRojo} mode="contained" onPress={() => rerificateLogin()}>
                            <Text style={style.FontButton}>Entrar a mi cuenta</Text>
                        </Button>
                    </View>
                    <View style={style.containButton}>
                        <Button icon="account-plus" style={style.fondoPlomo} mode="contained" onPress={() => console.log('Pressed')}>
                            <Text style={style.FontButton}>Crear mi cuenta</Text>
                        </Button>
                    </View>
                </View>
            </View>
            {
                login && (
                    <View style={style.ViewFixed}>
                        <View style={style.containerTransparent}>
                            <CircleRedirect size={windowHeight * 2} toHome={() => toHome()} />
                        </View>
                    </View>
                )
            }
            <View style={style.FloatSnack}>    
                <Snackbar visible={visible} onDismiss={() => dismissSnack()} action={{label: "Cerrar", onPress: () => pressOK()}}>
                    {response}
                </Snackbar>
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

export default Login;