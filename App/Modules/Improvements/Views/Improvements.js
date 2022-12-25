import React from 'react';  
import { View, Animated, Image, Easing, Text  } from 'react-native';

class Improvements extends React.Component {
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
            <View>
                <Text>Improvements</Text>
            </View>
        );
    }
}
export default Improvements;