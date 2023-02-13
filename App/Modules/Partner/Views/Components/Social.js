import React, {useState} from 'react';
import { View, Image, Animated, Easing, Text } from 'react-native';
import { windowWidth } from '../../../../Helpers/GetMobil';
/** */
import { FontAwesome } from '@expo/vector-icons';

const Social = (props) => {
    const [border, SetBorder] = useState(new Animated.Value(0));

    React.useEffect(() => {
        animateLoader();
    }, []);
    
    function animateLoader() {
        Animated.timing(border, {
            toValue: 10,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    }

    return(
        <Animated.View style={[{width: (windowWidth - 20), borderRadius: border, backgroundColor: "#FFFFFF", padding: 5}, props.style]}>
            <View style={{position: "absolute", zIndex: 100, left: 10}}>
                <Text style={{color: "#EC2427", fontSize: 16, fontWeight: "900"}}>
                    Redes sociales
                </Text>
            </View>
            <View style={{width: (windowWidth - 30), height: 80, flex: 1, flexDirection: 'row', alignContent: 'space-between'}}>
                <View style={{width: 95, justifyContent: "center", alignItems: "center"}}>
                    <FontAwesome name={"share-square"} size={45} color={"#EC2427"} />
                </View>
                <View style={{width: (windowWidth - 125), justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "#808080", fontSize: 30, fontWeight: "900", padding: 5, alignSelf: "flex-end", textAlign: "right"}}>0</Text>
                </View>
            </View>
        </Animated.View>
    );
};
export default Social;