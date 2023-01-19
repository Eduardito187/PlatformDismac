import React from 'react';  
import { View, Animated, Image, Easing, Text, ScrollView } from 'react-native';
import { Page } from '../../../Themes/Dismac/ThemeDismac';
import { windowWidth } from '../../../Helpers/GetMobil';

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
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 20,paddingBottom: 20,paddingLeft: 5, paddingRight: 5}}>
                <View style={{backgroundColor: Page.background, borderRadius: 5,padding: 5}}>
                    <View style={{width: (windowWidth - 20), borderWidth: 0.5, borderColor: Page.fontSecondary,padding: 5, borderRadius: 5, display: 'flex'}}>
                        <Image source={require("../../../../assets/dismac.png")} style={{width: 50, height: 50, borderRadius: 25}} />
                        <View style={{width: 50}}>
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