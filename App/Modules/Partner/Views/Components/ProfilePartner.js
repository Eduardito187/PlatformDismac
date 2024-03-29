import React, {useState} from 'react';
import { View, Image, Animated, Easing, Text } from 'react-native';
import { windowWidth } from '../../../../Helpers/GetMobil';
import * as DocumentPicker from "expo-document-picker";
import axios from 'axios';
/** */
import ImagenAnimation from '../../../../Components/ImagenAnimation';
import { Background_White, RED_DIS, Section_Max, Size_50, Size_80, Size_Absolute, Size_Background, Size_Bottom, Size_Left, Size_Left_30, Size_Right, Size_Text, Size_Text_No, WHITE } from '../../../Login/Style/css';
import { IconButton } from 'react-native-paper';
import { GET_HEADER_TOKEN_FILE, URL_API } from '../../../../Helpers/API';
import { emitSocket, setDataForm } from '../../../../Helpers/Code';

const ProfilePartner = (props) => {
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [Socket, SetSocket] = React.useState(props.Socket);
    const [border, SetBorder] = useState(new Animated.Value(0));

    React.useEffect(() => {
        animateLoader();
    }, []);
    
    function animateLoader() {
        Animated.timing(border, {
            toValue: 10,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    }

    async function changeProfile() {
        let result = await DocumentPicker.getDocumentAsync({type: ["image/*"], copyToCacheDirectory: true, multiple: false});
        if (result.canceled === false) {
            sentForm(result["assets"][0], "profile");
        }
    }

    async function changeCover() {
        let result = await DocumentPicker.getDocumentAsync({type: ["image/*"], copyToCacheDirectory: true, multiple: false});
        if (result.canceled === false) {
            sentForm(result["assets"][0], "cover");
        }
    }

    function sentForm(File, type) {
        if (File != null) {
            let formData = new FormData();
            formData = setDataForm(formData, 'File', { uri: File.uri, name: File.name, type: File.mimeType });
            axios.post(URL_API(type == "cover" ? "changeCover" : "changeProfile"),formData,GET_HEADER_TOKEN_FILE(TOKEN));;
        }
    }

    return(
        <Animated.View style={[Size_Background, {borderRadius: border}]} >
            <View style={Section_Max}>
                <ImagenAnimation style={[Section_Max, {height: (windowWidth / 2)}]} url={props.Partner.cover} animation={{border: 10, time: 1000}} />
                <View style={Size_Absolute}>
                    <ImagenAnimation style={[props.Edit ? Size_80 : Size_50]} url={props.Partner.profile} animation={{border: 40, time: 1000}} />
                    {
                        props.Edit && (
                            <View style={Size_Right}>
                                <IconButton icon="camera" iconColor={RED_DIS} style={Background_White} size={15} onPress={() => changeProfile()} />
                            </View>
                        )
                    }
                </View>
                <View style={[props.Edit ? Size_Left : Size_Left_30]}>
                    <Text style={[props.Edit ? Size_Text : Size_Text_No]}>{props.Partner.name}</Text>
                </View>
                {
                    props.Edit && (
                        <View style={Size_Bottom}>
                            <IconButton icon="camera" iconColor={RED_DIS} style={Background_White} size={25} onPress={() => changeCover()} />
                        </View>
                    )
                }
            </View>
        </Animated.View>
    );
};
export default ProfilePartner;