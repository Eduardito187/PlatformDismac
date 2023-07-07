import React, {useState} from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import axios from 'axios';
import Modal from "react-native-modal";
import * as DocumentPicker from "expo-document-picker";
import { modalContainerStyle,bordePlomo,modalInfo, Section_Max_Absolute, Flex_Section, Button_Red_Dis, Border_Radius_5, Margin_Bottom_25, Margin_Top_25, Button_Plomo_Dis } from '../../../Login/Style/css';
import { Button, Card, Surface } from 'react-native-paper';
import { windowWidth } from '../../../../Helpers/GetMobil';
import Carousel from 'react-native-snap-carousel';
import { Surface_Style, Width_Max } from '../../../Login/Style/style';
import { alingContentCenter } from '../../Style/Two';
import { GET_HEADER_TOKEN_FILE, URL_API } from '../../../../Helpers/API';
import { setDataForm } from '../../../../Helpers/Code';
/** */

const ModalAddImage = (props) => {
    const [TOKEN, SETTOKEN] = React.useState(props.TOKEN);
    const [Sku, SetSku] = React.useState(props.value);
    const [Files, SetFiles] = React.useState(props.Files);
    const [Disable, SetDisable] = React.useState(false);
    
    React.useEffect(() => {
        //
    }, []);

    async function selectFile() {
        let result = await DocumentPicker.getDocumentAsync({type: ["image/*"], copyToCacheDirectory: true, multiple: true});
        if (result.type === 'success') {
            addPicture(result);
        }
    }

    function addPicture(file){
        let files = props.Files;
        files.push(file);
        SetFiles(files);
        props.sendFile(files);
    }

    function sendFilesApi(){
        SetDisable(true);
        let formData = new FormData();
        for (let index = 0; index < Files.length; index++) {
            let file = Files[index];
            formData = setDataForm(formData, 'File_'+index, { uri: file.uri, name: file.name, type: file.mimeType });
        }
        formData = setDataForm(formData, 'Long', Files.length);
        formData = setDataForm(formData, 'sku', Sku);
        axios.post(URL_API("uploadPictures"), formData, GET_HEADER_TOKEN_FILE(TOKEN)).then(res => {
            if (res.data.response) {
                SetDisable(false);
                props.reloadProduct(true);
            }
        }).catch(err => {
            //
        });
    }

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Section_Max_Absolute} onPress={() => props.closeModal()}>
                <View style={Flex_Section} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo,bordePlomo]}>
                        <View style={[Width_Max, alingContentCenter]}>
                                {
                                    Files.map((state, i) => {
                                        return (
                                            <Surface key={Math.random()+'_Product__Picture__'+Math.random()} style={[{width: windowWidth/4.5, margin: 5, height: windowWidth/4.5}, Surface_Style]} elevation={4}>
                                                <Image key={Math.random()+'_Text_'+i+'_Picture_'+Math.random()} style={[{width: "100%", height: "100%"}]} source={{uri: state.uri}} />
                                            </Surface>
                                        )
                                    })
                                }
                        </View>
                        {
                            Files.length > 0 && (
                                <Button icon="send" disabled={Disable} loading={Disable} style={[Button_Red_Dis, Margin_Bottom_25, Margin_Top_25]} mode="contained" onPress={() => sendFilesApi()}>
                                    Subir imagenes
                                </Button>
                            )
                        }
                        <Button icon="image" style={Button_Plomo_Dis} mode="contained" onPress={() => selectFile()}>
                            Seleccionar imagen
                        </Button>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default ModalAddImage;