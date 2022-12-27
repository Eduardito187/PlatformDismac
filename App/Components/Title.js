import React from 'react';  
import { View, Animated, Text, Easing } from 'react-native';

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxSize: props.size,
            size: new Animated.Value(0),
            style: props.style,
            text: props.text
        };
    }

    componentDidMount(){
        Animated.timing(this.state.size, {
            toValue: this.state.maxSize + 5,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false
        }).start(({ finished }) => {
            Animated.timing(this.state.size, {
                toValue: this.state.maxSize,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: false
            }).start();
        });
    }

    componentWillUnmount(){
        Animated.timing(this.state.size, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
    }

    render() {
        return(
            <Animated.View>
                <Animated.Text style={[this.state.style,{fontSize: this.state.size}]} >{this.state.text}</Animated.Text>
            </Animated.View>
        );
    }
}
export default Title;