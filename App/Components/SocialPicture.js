import * as React from 'react';
import { Animated, Easing  } from 'react-native';

const SocialPicture = (props) => {
    const border = new Animated.Value(0);
    const [Picture, SetPicture] = React.useState(props.picture);

    React.useEffect(() => {
        animateBorder();
    }, []);

    function animateBorder(){
        Animated.timing(border, {
            toValue: 5,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    }

    return (
        <Animated.Image style={[{width: props.height, height: props.height}, {borderRadius: border}, {resizeMode: "contain"}]} source={Picture} />
    );
}

export default SocialPicture;