import React from 'react';  
import { View, Animated, Image, Easing, Text, ScrollView  } from 'react-native';
import {Page} from "./../../../Themes/Dismac/ThemeDismac";
import { Badge } from 'react-native-paper';

class LandingHome extends React.Component {
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
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 20,paddingBottom: 20,paddingLeft: 5, paddingRight: 5}}>
                <View style={{backgroundColor: Page.background, padding: 10, borderRadius: 5}}>
                    <View>
                        <Text style={{fontWeight: '800',fontSize: 24,color: Page.fontSecondary, position:'relative'}}>
                            Productos
                            <View style={{position: 'absolute',top: -20, right: -20}}>
                                <Badge style={{fontWeight: '900',color: "white", fontSize: 16, backgroundColor: Page.fontPrimary}}>5</Badge>
                            </View>
                        </Text>
                        <View style={{position: 'absolute', top: 3, right: 5}}>
                            <Text style={{fontWeight: '700', color: Page.fontSecondary, fontSize: 16}}>Ver mas</Text>
                        </View>
                    </View>
                    <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{width: 100, height: 100, backgroundColor: 'red', borderRadius: 5, marginRight: 5}}></View>
                            <View style={{width: 100, height: 100, backgroundColor: 'red', borderRadius: 5, marginRight: 5}}></View>
                            <View style={{width: 100, height: 100, backgroundColor: 'red', borderRadius: 5, marginRight: 5}}></View>
                            <View style={{width: 100, height: 100, backgroundColor: 'red', borderRadius: 5, marginRight: 5}}></View>
                            <View style={{width: 100, height: 100, backgroundColor: 'red', borderRadius: 5, marginRight: 5}}></View>
                        </ScrollView>
                    </View>
                </View>
                <View style={{backgroundColor: Page.background, padding: 10,borderRadius: 5}}>
                    <View>
                        <Text style={{fontWeight: '800',fontSize: 24,color: Page.fontSecondary, position:'relative'}}>
                            Categorias
                            <View style={{position: 'absolute',top: -20, right: -20}}>
                                <Badge style={{fontWeight: '900',color: "white", fontSize: 16, backgroundColor: Page.fontPrimary}}>5</Badge>
                            </View>
                        </Text>
                        <View style={{position: 'absolute', top: 3, right: 5}}>
                            <Text style={{fontWeight: '700', color: Page.fontSecondary, fontSize: 16}}>Ver mas</Text>
                        </View>
                    </View>
                    <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{width: 100, height: 100, backgroundColor: 'red', borderRadius: 5, marginRight: 5}}></View>
                            <View style={{width: 100, height: 100, backgroundColor: 'red', borderRadius: 5, marginRight: 5}}></View>
                            <View style={{width: 100, height: 100, backgroundColor: 'red', borderRadius: 5, marginRight: 5}}></View>
                            <View style={{width: 100, height: 100, backgroundColor: 'red', borderRadius: 5, marginRight: 5}}></View>
                            <View style={{width: 100, height: 100, backgroundColor: 'red', borderRadius: 5, marginRight: 5}}></View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
export default LandingHome;