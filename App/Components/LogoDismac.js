import React from 'react';  
import { View, Animated, Image, Easing  } from 'react-native';

class LogoDismac extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style : props.style,
            border: new Animated.Value(0)
        };
    }

    componentDidMount(){
        Animated.timing(this.state.border, {
            toValue: 5,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true
          }).start();
    }

    render() {
        return(
            <Animated.Image style={[this.state.style,{borderRadius: this.state.border}]} source={require('./../../assets/dismac_.png')} />
        );
    }
}
export default LogoDismac;