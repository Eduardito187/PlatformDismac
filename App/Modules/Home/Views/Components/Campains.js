import React, {useState} from 'react';
/** */
import { Text, View } from 'react-native';
import { CONTIANER_LOADING, RED_DIS } from '../../../Login/Style/css';
import Carousel from 'react-native-snap-carousel';

const Campains = (props) => {
    React.useEffect(() => {
        //
    }, []);

    const _renderItem = ({item, index}) => {
        return (
            <View key={Math.random()+'_Campains_'+Math.random()} style={{width: props.width, height: props.height, borderRadius: 5, backgroundColor: "red"}}>
                <Text style={{fontSize: 20}}>{index}</Text>
            </View>
        );
    };

    return(
        <View style={{}}>
            <Carousel
              data={props.data}
              renderItem={_renderItem}
              sliderWidth={props.width}
              itemWidth={props.width}
            />
        </View>
    );
};
export default Campains;