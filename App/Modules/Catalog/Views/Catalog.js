import React from 'react';  
import { View, Animated, Image, Easing, Text, ScrollView  } from 'react-native';
import { Page } from '../../../Themes/Dismac/ThemeDismac';

class Catalog extends React.Component {
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
                <View style={{backgroundColor: Page.background, borderRadius: 5}}>
                    <Text>Catalog</Text>
                </View>
            </ScrollView>
        );
    }
}
export default Catalog;