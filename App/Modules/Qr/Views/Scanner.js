import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { GET_TOKEN_SESSION } from '../../../Helpers/API';

/** Components */
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SCREEN_ABSOLUTE_BODY, SCREEN_ABSOLUTE_HEADER, SCREEN_RELATIVE } from '../../../Themes/Dismac/ThemeDismac';
import Header from '../../Home/Views/Components/Header';

const Scanner = (props) => {
    const [TOKEN, SetTOKEN] = React.useState("");
    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);
    React.useEffect(() => {
        setToken();

        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };
    
        getBarCodeScannerPermissions();
    }, []);

    async function setToken(){
        SetTOKEN(await GET_TOKEN_SESSION());
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={SCREEN_RELATIVE}>
            <View style={SCREEN_ABSOLUTE_HEADER}>
                <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} />
            </View>
            <View style={SCREEN_ABSOLUTE_BODY}>
                <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center'}}>
                    <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
                    {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                </View>
            </View>
        </View>
    );
};

export default Scanner;