import React from 'react';  
import { View, Animated, Image, Easing  } from 'react-native';

class ImagenAnimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url : props.url,
            style : props.style,
            animation: props.animation,
            border: new Animated.Value(3)
        };
    }

    componentDidMount(){
        Animated.timing(this.state.border, {
            toValue: this.state.animation.border,
            duration: this.state.animation.time,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    }

    render() {
        return(
            <Animated.Image style={[this.state.style,{borderRadius: this.state.border}]} source={{uri: this.state.url}} />
        );
    }
}
export default ImagenAnimation;