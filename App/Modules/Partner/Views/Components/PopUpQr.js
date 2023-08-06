import React, {useState} from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import { modalContainerStyle,bordePlomo,modalInfo, Section_Max_Absolute, Flex_Section, RED_DIS, Button_Red_Dis } from '../../../Login/Style/css';
import { BarCodeScanner, BarCodeType } from 'expo-barcode-scanner';
import { windowHeight } from '../../../../Helpers/GetMobil';
import { BUTTON_CONTENT, TEXT_QR, Width_Max } from '../../../Login/Style/style';
import { Button, Text } from 'react-native-paper';
import Constants from "expo-constants";
/** */

const PopUpQr = (props) => {
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);
    const [Type, SetType] = React.useState("");
    const [Data, SetData] = React.useState("");
    
    React.useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);
    
    const handleBarCodeScanned = ({ type, data }) => {
        data = JSON.parse(data);
        console.log(data);
        if (validateVersion(data)){
            redirectScanner(data);
        }else{
            alert("Versíon no compatible.");
        }
        setScanned(true);
    };

    function redirectScanner(data){
        if (data.key == "product"){
            props.navigation.push("ViewProduct", {"id_product":data.value,"TOKEN":props.TOKEN});
        }
    }

    function validateVersion(data){
        if (data.version != null){
            if (data.version == Constants.expoConfig.version){
                return true;
            }else{
                return isNewerVersion(data.version, Constants.expoConfig.version)
            }
        }else{
            return false;
        }
    }

    function isNewerVersion (oldVer, newVer) {
        const oldParts = oldVer.split('.')
        const newParts = newVer.split('.')
        for (var i = 0; i < newParts.length; i++) {
            const a = ~~newParts[i]
            const b = ~~oldParts[i]
            if (a > b) return true
            if (a < b) return false
        }
        return false
    }

    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Section_Max_Absolute} onPress={() => props.closeModal()}>
                <View style={Flex_Section} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo,bordePlomo]}>
                        <View style={[Width_Max,{height: windowHeight*0.7}]}>
                            {hasPermission && scanned == false && (<BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />)}
                            {scanned && (
                                <View style={BUTTON_CONTENT}>
                                    <Button icon="qrcode" style={Button_Red_Dis} mode="contained" onPress={() => setScanned(false)}>
                                        <Text style={TEXT_QR}>Habilitar scanner</Text>
                                    </Button>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default PopUpQr;