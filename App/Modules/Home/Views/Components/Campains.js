import React, {useState} from 'react';
/** */
import { Text, View } from 'react-native';
import { CONTIANER_LOADING, RED_DIS } from '../../../Login/Style/css';
import Carousel from 'react-native-snap-carousel';
import { Card } from 'react-native-paper';
import IconSocial from '../../Helper/IconSocial';

const Campains = (props) => {
    React.useEffect(() => {
        //
    }, []);

    const _renderItem = ({item, index}) => {
        return (
            <Card key={Math.random()+'_Campains_'+Math.random()} style={{width: props.width, height: props.height, borderRadius: 5}}>
                <Text style={{fontSize: 20}}>{index}</Text>
                <Text style={{fontSize: 20}}><IconSocial icon={item.Social} size={24} /> SOCIAL</Text>
            </Card>
        );
    };

    return(
        <View style={{padding: 5}}>
            <Carousel data={props.data} renderItem={_renderItem} sliderWidth={props.width} itemWidth={props.width} />
        </View>
    );
};
export default Campains;