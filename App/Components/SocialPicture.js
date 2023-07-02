import React from 'react';  
import { Animated, Easing  } from 'react-native';

class SocialPicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style : props.style,
            border : new Animated.Value(0),
            path : "./../../assets/",
            social : props.social,
            extension : ".png"
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
            <Animated.Image style={[this.state.style,{borderRadius: this.state.border}]} source={require(this.state.path+this.state.social+this.state.extension)} />
        );
    }
}
export default SocialPicture;