import React from 'react';  
import { View, Animated, Image, Easing, Text, ScrollView } from 'react-native';
import { BP_5, Page } from '../../../Themes/Dismac/ThemeDismac';
import { windowWidth } from '../../../Helpers/GetMobil';
import { Border_5, P_20, Section_50, Width_50 } from '../../Login/Style/css';

class Management extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style : props.style,
            data: props.data
        };
    }

    componentDidMount(){
        //
    }

    render() {
        return(
            <ScrollView showsVerticalScrollIndicator={false} style={P_20}>
                <View style={BP_5}>
                    <View style={[{width: (windowWidth - 20), borderColor: Page.fontSecondary}, Border_5]}>
                        <Image source={require("../../../../assets/dismac.png")} style={Section_50} />
                        <View style={Width_50}>
                            <Text>Juan Carlos Robles Paz</Text>
                            <Text>jcroble@dismac.com.bo</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
export default Management;