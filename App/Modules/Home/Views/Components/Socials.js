import React, {useState} from 'react';
/** */
import { Text, View } from 'react-native';
import { Border_Radius_5, Size_20 } from '../../../Login/Style/css';
import Carousel from 'react-native-snap-carousel';
import { Card } from 'react-native-paper';
import IconSocial from '../../Helper/IconSocial';
import { P5 } from '../../../Login/Style/style';

const Socials = (props) => {
    React.useEffect(() => {
        //
    }, []);

    const _renderItem = ({item, index}) => {
        return (
            <Card key={Math.random()+'_Social_'+Math.random()} style={[{width: props.width, height: props.height}, Border_Radius_5]}>
                <Text style={Size_20}>{index}</Text>
                <Text style={Size_20}><IconSocial icon={item.Social} size={24} /> SOCIAL</Text>
            </Card>
        );
    };

    return(
        <View style={P5}>
            <Carousel data={props.data} renderItem={_renderItem} sliderWidth={props.width} itemWidth={props.width} />
        </View>
    );
};
export default Socials;