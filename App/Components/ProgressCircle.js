import React from 'react';  
import { Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

class ProgressCircle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Step: props.Step,
            Steps: props.Steps,
            size: props.size,
            thickness: props.thickness,
            color: props.color,
            STYLE: props.style
        };
    }

    componentDidMount(){
    }

    componentWillUnmount(){
    }

    render() {
        return(
            <Progress.Circle color={this.state.color} size={this.state.size} style={this.state.STYLE.PROGRESS_CIRCLE} progress={((1 / 6) * this.state.Step)} thickness={this.state.thickness} showsText={false} >
                <View style={this.state.STYLE.ABSOLUTE}>
                    <Text style={this.state.STYLE.FONT_PROGRESS}>{this.state.Step}/{this.state.Steps}</Text>
                </View>
            </Progress.Circle>
        );
    }
}
export default ProgressCircle;