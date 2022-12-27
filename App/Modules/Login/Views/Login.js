import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet} from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';

/** Components */
import Circle from '../../../Components/Circle';
import Title from '../../../Components/Title';
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
    return (
        <View style={[styles.container,{backgroundColor: 'white'}]}>
            <View style={{position:'absolute', top: -(windowWidth / 4), backgroundColor:'transparent',left: -(windowWidth / 4)}}>
                <Circle size={(windowWidth * 0.8)} />
            </View>
            <View style={{position:'absolute', top: -50, backgroundColor:'transparent',right: -50}}>
                <Circle size={150} />
            </View>
            <View style={{position:'absolute', bottom: -50, backgroundColor:'transparent',right: -50}}>
                <Circle size={200} />
            </View>
            <View style={{position:'absolute', zIndex: 100, top: 0, bottom: 0, padding: 10}}>
                <View style={styles.container}>
                    <View style={{padding: 5, alignItems: 'center'}}>
                        <Title text={"Iniciar Sesión"} size={35} style={{fontWeight: '800', color: "#EC2427",backgroundColor: "white", padding: 5, borderRadius: 10}} />
                    </View>
                    <View style={{padding: 5}}>
                        <TextInput mode='outlined' left={<TextInput.Icon icon="account" onPress={() => InfoClickUsername()} />} style={{width: (windowWidth - 30), paddingTop: userP}} placeholder="Ingrese su usuario" selectionColor="rgba(0, 0, 0, 0.5)" 
                        underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427" label={<Text style={{fontWeight: '900', borderRadius: 5, backgroundColor: 'white'}}>Usuario</Text>} 
                        value={username} onChangeText={text => setUserName(text)} onFocus={() => setuserP(2)} onBlur={() => setuserP(0)} />
                        {
                            helperUser && (<HelperText type="info" visible={helperUser} style={{backgroundColor: "white", borderRadius: 5, fontWeight: '700',marginTop: 3}}>Prefijo de la empresa por delante del usuario, ejemplo: 'EMPRESA\Usuario'.</HelperText>)
                        }
                    </View>
                    <View style={{padding: 5}}>
                        <TextInput secureTextEntry={iconPWD == "eye" ? true : false} right={<TextInput.Icon icon={iconPWD} onPress={ iconPWD == "eye" ? () => setIconPWD("eye-off") : () => setIconPWD("eye")} />} mode='outlined' style={{width: (windowWidth - 30), paddingTop: pwdP}} placeholder="Ingrese su contraseña" selectionColor="rgba(0, 0, 0, 0.5)" 
                        underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427" label={<Text style={{fontWeight: '900', borderRadius: 5, backgroundColor: 'white'}}>Contraseña</Text>} 
                        value={password} onChangeText={text => setPassword(text)} onFocus={() => setpwdP(2)} onBlur={() => setpwdP(0)} />
                    </View>
                    <View style={{padding: 5, alignItems: 'flex-end',width: (windowWidth - 30)}}>
                        <Text style={{fontWeight: '700', color: '#808080'}}>Olvide mi contraseña</Text>
                    </View>
                    <View style={{padding: 5, alignItems: 'center'}}>
                        <Button icon="account" loading={loading} disabled={disable} style={{backgroundColor: "#EC2427"}} mode="contained" onPress={() => console.log('Pressed')}>
                            <Text style={{color: "white", fontWeight: "900"}}>Entrar a mi cuenta</Text>
                        </Button>
                    </View>
                    <View style={{padding: 5, alignItems: 'center'}}>
                        <Button icon="account-plus" style={{backgroundColor: "#808080"}} mode="contained" onPress={() => console.log('Pressed')}>
                            <Text style={{color: "white", fontWeight: "900"}}>Crear mi cuenta</Text>
                        </Button>
                    </View>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
});

export default Login;