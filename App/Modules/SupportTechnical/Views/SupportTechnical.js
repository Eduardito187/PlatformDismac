import React from 'react';  
import { View, Animated, Image, Easing, Text  } from 'react-native';

class SupportTechnical extends React.Component {
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
                <Text>SupportTechnical</Text>
            </View>
        );
    }
}
export default SupportTechnical;