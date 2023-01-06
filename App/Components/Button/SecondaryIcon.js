import React from 'react';  
import { Text  } from 'react-native';
import { Button } from 'react-native-paper';

class SecondaryIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style : props.style,
            textStyle: props.textStyle,
            icon: props.icon,
            text: props.text,
            ActionPress: props.Action
        };
    }

    componentDidMount(){
        //
    }

    render() {
        return(
            <Button icon={this.state.icon} mode="contained" style={this.state.style} onPress={() => this.state.ActionPress()}>
                <Text style={this.state.textStyle}>{this.state.text}</Text>
            </Button>
        );
    }
}
export default SecondaryIcon;