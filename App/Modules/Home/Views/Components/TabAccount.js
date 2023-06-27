import React, {useState} from 'react';
import { ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import { IMAGE_BG, IMAGE_STYLE, PROFILE_PICTURE, TEXT_NAME } from '../../../Login/Style/css';

class TabAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab : props.currentTab,
            title : props.title,
            setCurrentTab : (a) => props.setCurrentTab(a),
            Account : props.Account
        };
        this.handleForceupdateMethod = this.handleForceupdateMethod.bind(this);
    }

    handleForceupdateMethod() {
        this.forceUpdate();
    };
    
    componentDidUpdate(prevProps, prevState, snapshot){
        //
    }

    componentDidMount(){
    }

    componentWillUnmount(){
    }

    actionPress(){
        if (this.state.currentTab != this.state.title) {
            this.state.setCurrentTab(this.state.title);
        }
    }

    render() {
        return(
            <TouchableOpacity onPress={() => this.actionPress()}>
                <ImageBackground source={{uri: this.state.Account.cover}} style={IMAGE_BG} imageStyle={IMAGE_STYLE}>
                    <Image source={{uri: this.state.Account.profile}} style={PROFILE_PICTURE} />
                    <Text style={TEXT_NAME}>{this.state.Account.name}</Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}
export default TabAccount;