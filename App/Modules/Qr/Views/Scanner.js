import React from 'react';  
import { View, StyleSheet, Button } from 'react-native';
/** Components */
import { SCREEN_ABSOLUTE_BODY, SCREEN_ABSOLUTE_HEADER, SCREEN_RELATIVE } from '../../../Themes/Dismac/ThemeDismac';
import { BarCodeScanner, BarCodeType } from 'expo-barcode-scanner';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { Column_Center } from '../../Login/Style/style';
import Header from '../../Home/Views/Components/Header';

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
                        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                    </View>
                </View>
            </View>
        );
    }
};

export default Scanner;