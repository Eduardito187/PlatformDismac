import React, {useState} from 'react';
import { View, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { windowWidth } from '../../../../Helpers/GetMobil';
import { STYLE,SUBTITLE,IMGLogo,SubTitle,LOGO } from '../../Style/style';
import { NavigationBack } from '../../../../Helpers/Nav';
import { ColorApp } from '../../../../Themes/Dismac/ThemeDismac';

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
                <IconButton icon="arrow-left" iconColor={ColorApp.White} size={28} onPress={() => goBack()} />
            </View>
            <View style={STYLE.SECTION_TOP_RIGHT}>
                <ProgressCircle thickness={2} color={ColorApp.White} style={STYLE} Step={props.Step} Steps={props.Steps} size={50} />
            </View>
            <View style={SUBTITLE}>
                <Subtitle style={SubTitle} text={props.Title} />
            </View>
            <View style={LOGO}>
                <Image source={require('./../../../../../assets/dismac_.png')} style={IMGLogo} />
            </View>
        </>
    );
};

export default Top;