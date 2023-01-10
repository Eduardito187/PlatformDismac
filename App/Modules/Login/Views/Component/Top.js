import React, {useState} from 'react';
import { View, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { windowWidth } from '../../../../Helpers/GetMobil';
import { STYLE } from '../../Style/style';
import { NavigationBack } from '../../../../Helpers/Nav';

/** Components */
import ProgressCircle from '../../../../Components/ProgressCircle';
import Subtitle from '../../../../Components/Subtitle';
/** */

const Top = (props) => {
    React.useEffect(() => {
        //
    }, []);
    function goBack() {
        NavigationBack(props.navigation);
    }
    return (
        <>
            <View style={STYLE.SECTION_TOP_LEFT}>
                <IconButton icon="arrow-left" iconColor={"#FFFFFF"} size={28} onPress={() => goBack()} />
            </View>
            <View style={STYLE.SECTION_TOP_RIGHT}>
                <ProgressCircle thickness={2} color={"#FFFFFF"} style={STYLE} Step={props.Step} Steps={props.Steps} size={50} />
            </View>
            <View style={{position: "absolute", left: (windowWidth * 0.02),right: (windowWidth * 0.02),top: (windowWidth * 0.30)}}>
                <Subtitle style={{fontWeight: "700",color: "#FFFFFF",fontSize: 16}} text={props.Title} />
            </View>
            <View style={{position: "absolute", left: (windowWidth * 0.5) - 50,top: 50}}>
                <Image source={require('./../../../../../pub/Dismac/dismac_.png')} style={{width: 100,height: 28,borderRadius: 3}} />
            </View>
        </>
    );
};

export default Top;