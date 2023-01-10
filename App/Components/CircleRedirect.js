import React from 'react';  
import { Animated, Easing } from 'react-native';

class CircleRedirect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toHome: props.toHome,
            size: props.size,
            width: new Animated.Value(0),
            style: {
                backgroundColor: '#EC2427'
            }
        };
    }

    componentDidMount(){
        Animated.timing(this.state.width, {
            toValue: this.state.size,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false
        }).start(({ finished }) => {
            this.state.toHome();
        });
    }

    componentWillUnmount(){
        Animated.timing(this.state.width, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
    }

    render() {
        return(
            <Animated.View style={[this.state.style,{width: this.state.width, height: this.state.width, borderRadius: (this.state.size / 2)}]} ></Animated.View>
        );
    }
}
export default CircleRedirect;