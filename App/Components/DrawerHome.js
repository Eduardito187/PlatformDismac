import React from 'react';  
import { View, Animated, Image, Easing, ImageBackground, Text  } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import {DrawerContentScrollView,DrawerItemList,DrawerItem, DrawerContent} from '@react-navigation/drawer';

class DrawerHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_account : 1,
            props : props,
            active : ""
        };
    }

    componentDidMount(){
        //this.state.props.navigation.closeDrawer()
    }

    render() {
        return(
            <DrawerContentScrollView {...this.state.props} showsVerticalScrollIndicator={false}>
                <ImageBackground source={require("./../../assets/lg.png")} style={{justifyContent:"space-between",alignItems:"center",padding:20,marginBottom:10,backgroundColor:"rgb(0,0,0)",borderBottomWidth:2,borderColor: "red"}} imageStyle=
                    {{opacity:0.4}}>
                    <Image source={require("../../assets/dismac.png")} style={{width:70,height:70,borderRadius:35,borderWidth:2,borderColor: "white"}}/>
                    <Text style={{fontSize:20,fontWeight:"bold",color: "white"}}>{"Not Available"}</Text>
                    <Text style={{color: "#808080"}}>{"Not Available"}</Text>
                </ImageBackground>
                <DrawerItemList {...this.state.props} />
                <DrawerItem label="Close drawer" onPress={() => this.state.props.navigation.closeDrawer()} />
                <DrawerItem label="Toggle drawer" onPress={() => this.state.props.navigation.toggleDrawer()} />
            </DrawerContentScrollView>
        );
    }
}
export default DrawerHome;