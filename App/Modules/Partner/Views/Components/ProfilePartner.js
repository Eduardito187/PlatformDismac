import React, {useState} from 'react';
import { View, Image, Animated, Easing, Text } from 'react-native';
import { windowWidth } from '../../../../Helpers/GetMobil';
import * as DocumentPicker from "expo-document-picker";
import axios from 'axios';
/** */
import ImagenAnimation from '../../../../Components/ImagenAnimation';
import { RED_DIS, WHITE } from '../../../Login/Style/css';
import { IconButton } from 'react-native-paper';
import { GET_HEADER_TOKEN_FILE, URL_API } from '../../../../Helpers/API';

const ProfilePartner = (props) => {
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
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
        if (result.type === 'success') {
            sentForm(result, "profile");
        }
    }

    async function changeCover() {
        let result = await DocumentPicker.getDocumentAsync({type: ["image/*"], copyToCacheDirectory: true, multiple: false});
        if (result.type === 'success') {
            sentForm(result, "cover");
        }
    }

    function sentForm(File, type) {
        if (File != null) {
            let formData = new FormData();
            formData.append('File', { uri: File.uri, name: File.name, type: File.mimeType });
            axios.post(URL_API(type == "cover" ? "changeCover" : "changeProfile"),formData,GET_HEADER_TOKEN_FILE(TOKEN)).then(res => {
                if (res.response) {
                    console.log(res.response);
                }
            }).catch(err => {
                //
            });
        }
    }

    return(
        <Animated.View style={{width: "100%", borderRadius: border, backgroundColor: "#FFFFFF", padding: 5}} >
            <View style={{width: "100%"}}>
                <ImagenAnimation style={{width: "100%", height: (windowWidth - 20)}} url={props.Partner.cover} animation={{border: 10, time: 1000}} />
                <View style={{position: "absolute", left: 10, bottom: 10}}>
                    <ImagenAnimation style={{width: 80, height: 80}} url={props.Partner.profile} animation={{border: 40, time: 1000}} />
                    <View style={{position: 'absolute', bottom: -8, right: -10}}>
                        <IconButton icon="camera" iconColor={RED_DIS} style={{backgroundColor: WHITE}} size={15} onPress={() => changeProfile()} />
                    </View>
                </View>
                <View style={{position: "absolute", left: 95, bottom: 35}}>
                    <Text style={{fontSize: 20, fontWeight: "900", color: "#EC2427", backgroundColor: "#FFFFFF", padding: 3, borderRadius: 5}}>{props.Partner.name}</Text>
                </View>
                <View style={{position: 'absolute', bottom: 10, right: 10}}>
                    <IconButton icon="camera" iconColor={RED_DIS} style={{backgroundColor: WHITE}} size={25} onPress={() => changeCover()} />
                </View>
            </View>
        </Animated.View>
    );
};
export default ProfilePartner;