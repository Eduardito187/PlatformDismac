import Animated, {
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { StyleSheet,Image,Text } from 'react-native';
const styles = StyleSheet.create({
    glowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 8,
        bottom: 0,
        left: 0,
        right: 4,
    },
});

const SuccessImage = (props) => {
    const glowAnimation = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withRepeat(
                    withSequence(
                        withTiming(1.2, { duration: 1500 }),
                        withTiming(1.6, { duration: 1500 })
                    ),
                    -1,
                    true
                ),
            },
        ],
    }));

    return (
        <>
            <Animated.View style={[styles.glowContainer, glowAnimation]}>
                <Text style={{fontWeight: "900",color: "#1bdc1b",fontSize: 23,letterSpacing: 0.5,lineHeight: 24,fontFamily: "Roboto"}}>FELICIDADES</Text>
                <Image source={require('./../../assets/success.png')} style={{ height: 150, aspectRatio: 1, resizeMode: 'contain' }} />
                <Text style={{fontWeight: "900",color: "#1bdc1b",fontSize: 19,letterSpacing: 0.5,lineHeight: 20,fontFamily: "Roboto"}}>{props.Text}</Text>
            </Animated.View>
        </>
    );
};
export default SuccessImage;