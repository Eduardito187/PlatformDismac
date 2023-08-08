import React from 'react';  
import { View, Text, StyleSheet } from 'react-native';
/** Components */
import { SCREEN_ABSOLUTE_BODY, SCREEN_ABSOLUTE_HEADER, SCREEN_RELATIVE } from '../../../Themes/Dismac/ThemeDismac';
import { BarCodeScanner, BarCodeType } from 'expo-barcode-scanner';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { BUTTON_CONTENT, Column_Center, TEXT_QR } from '../../Login/Style/style';
import Header from '../../Home/Views/Components/Header';
import Constants from "expo-constants";
import { Button_Red_Dis } from '../../Login/Style/css';
import { Button } from 'react-native-paper';

const Scanner = (props) => {
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);

    React.useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    

    function redirectScanner(data){
        if (data.key == "product"){
            props.navigation.push("ViewProduct", {"id_product" : data.value, "TOKEN" : props.TOKEN, "socket" : null});
        } else if (data.key == "SaleOrder"){
            props.navigation.push("ShowSale", {"id_sale" : data.value, "TOKEN" : props.TOKEN, "socket" : null});
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

    const handleBarCodeScanned = ({ type, data }) => {
        data = JSON.parse(data);
        if (validateVersion(data)){
            redirectScanner(data);
        }else{
            alert("Versíon no compatible.");
        }
        setScanned(true);
    };

    if (hasPermission === false || hasPermission === null) {
        return (<LoadingPage />);
    }else{
        return (
            <View style={SCREEN_RELATIVE}>
                <View style={SCREEN_ABSOLUTE_HEADER}>
                    <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} />
                </View>
                <View style={SCREEN_ABSOLUTE_BODY}>
                    <View style={Column_Center}>
                        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
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
        );
    }
};

export default Scanner;