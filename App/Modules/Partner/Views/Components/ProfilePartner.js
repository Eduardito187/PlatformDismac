import React, {useState} from 'react';
import { View, Image, Animated, Easing, Text } from 'react-native';
import { windowWidth } from '../../../../Helpers/GetMobil';
import { URL_PATH, URL_PATH_1 } from '../../Helper/Path';
/** */
import ImagenAnimation from '../../../../Components/ImagenAnimation';

const ProfilePartner = (props) => {
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
        <Animated.View style={{width: (windowWidth - 20), borderRadius: border, backgroundColor: "#FFFFFF", padding: 5}} >
            <View style={{width: (windowWidth - 30), height: (windowWidth - 30)}}>
                <ImagenAnimation style={{width: (windowWidth - 30), height: (windowWidth - 30)}} url={URL_PATH} animation={{border: 10, time: 1000}} />
                <View style={{position: "absolute", left: 10, bottom: 10}}>
                    <ImagenAnimation style={{width: 80, height: 80}} url={URL_PATH_1} animation={{border: 40, time: 1000}} />
                </View>
                <View style={{position: "absolute", left: 95, bottom: 35}}>
                    <Text style={{fontSize: 20, fontWeight: "900", color: "#EC2427", backgroundColor: "#FFFFFF", padding: 3, borderRadius: 5}}>Dismac S.A.</Text>
                </View>
            </View>
        </Animated.View>
    );
};
export default ProfilePartner;