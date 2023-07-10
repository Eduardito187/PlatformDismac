import React, {useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modal";
import { modalContainerStyle,bordePlomo,modalInfo, Section_Max_Absolute, Flex_Section } from '../../../Login/Style/css';
import { Padding_10_B_5 } from '../../../../Themes/Dismac/ThemeDismac';
import { AlingFormItem, Centered, RowForm, RowFormFlex, TitleSub, Top_15_Red, Width_Max } from '../../../Login/Style/style';
import { Button, TextInput } from 'react-native-paper';
import Subtitle from '../../../../Components/Subtitle';
import axios from 'axios';
import { GET_HEADER_TOKEN, URL_API_POS } from '../../../../Helpers/API';
/** */

const ResetPassword = (props) => {
    const [Password, SetPassword] = React.useState("");
    const [Password_, SetPassword_] = React.useState("");
    const [pwdP, setpwdP] = React.useState(0);
    const [iconPWD, setIconPWD] = React.useState("eye");
    const [pwdPV, setpwdPV] = React.useState(0);
    const [iconPWDV, setIconPWDV] = React.useState("eye");
    const [LOADING, SETLOADING] = React.useState(false);
    
    React.useEffect(() => {
        //
    }, []);

    function updatePassword() {
        let query = {
            "account" : {
                "password" : Password
            }
        };
        SETLOADING(true);
        axios.patch(URL_API_POS("account/updatePassword/", props.id_account),query,GET_HEADER_TOKEN(props.TOKEN)).then(res => {
            if (res.data.response) {
                props.closeModal();
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Section_Max_Absolute} onPress={() => props.closeModal()}>
                <View style={Flex_Section} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo,bordePlomo]}>
                        <View style={Width_Max}>
                            <View style={AlingFormItem}>
                                <View style={RowFormFlex}>
                                    <Subtitle style={TitleSub} text={"Contraseña."} />
                                </View>
                                <View style={RowFormFlex}>
                                    <TextInput secureTextEntry={iconPWD == "eye" ? true : false} right={<TextInput.Icon icon={iconPWD} onPress={ iconPWD == "eye" ? () => setIconPWD("eye-off") : () => setIconPWD("eye")} />} mode='outlined' placeholder="Ingrese su contraseña" selectionColor="rgba(0, 0, 0, 0.5)" 
                                    underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="black" activeOutlineColor="#EC2427"
                                    value={Password} onChangeText={text => SetPassword(text)} onFocus={() => setpwdP(2)} onBlur={() => setpwdP(0)} />
                                </View>
                            </View>
                        </View>
                        <View style={Width_Max}>
                            <View style={AlingFormItem}>
                                <View style={RowFormFlex}>
                                    <Subtitle style={TitleSub} text={"Verificar contraseña."} />
                                </View>
                                <View style={RowFormFlex}>
                                    <TextInput secureTextEntry={iconPWDV == "eye" ? true : false} right={<TextInput.Icon icon={iconPWDV} onPress={ iconPWDV == "eye" ? () => setIconPWDV("eye-off") : () => setIconPWDV("eye")} />} mode='outlined' placeholder="Ingrese su contraseña" selectionColor="rgba(0, 0, 0, 0.5)" 
                                    underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="black" activeOutlineColor="#EC2427"
                                    value={Password_} onChangeText={text => SetPassword_(text)} onFocus={() => setpwdPV(2)} onBlur={() => setpwdPV(0)} />
                                </View>
                            </View>
                        </View>
                        <View style={[Centered]}>
                            <Button icon="account" disabled={Password == Password_ && Password.length > 8 ? false : true} loading={LOADING} mode="contained" style={Top_15_Red} onPress={() => updatePassword()}>
                                Acturalizar contraseña
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default ResetPassword;