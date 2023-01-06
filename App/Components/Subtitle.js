import React from 'react';  
import { Text  } from 'react-native';

class Subtitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style : props.style,
            text: props.text
        };
    }

    componentDidMount(){
        //
    }

    render() {
        return(
            <Text style={this.state.style}>{this.state.text}</Text>
        );
    }
}
export default Subtitle;