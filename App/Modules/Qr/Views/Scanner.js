import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
/** Components */
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SCREEN_ABSOLUTE_BODY, SCREEN_ABSOLUTE_HEADER, SCREEN_RELATIVE } from '../../../Themes/Dismac/ThemeDismac';
import Header from '../../Home/Views/Components/Header';
import LoadingPage from '../../Home/Views/Components/LoadingPage';

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

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(type, data);
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
                    <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center'}}>
                        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
                        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                    </View>
                </View>
            </View>
        );
    }
};

export default Scanner;