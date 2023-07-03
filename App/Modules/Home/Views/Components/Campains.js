import React, {useState} from 'react';
/** */
import { Text, View } from 'react-native';
import { Background_White, Border_Radius_5, Size_20 } from '../../../Login/Style/css';
import Carousel from 'react-native-snap-carousel';
import { Card } from 'react-native-paper';
import IconSocial from '../../Helper/IconSocial';
import { P5, Width_Max } from '../../../Login/Style/style';
import { label_1, label_nb_1 } from '../../../Catalog/Style/Two';

const Campains = (props) => {
    const [Width, SetWidth] = React.useState(props.width-10);
    React.useEffect(() => {
        //
    }, []);

    const _renderItem = ({item, index}) => {
        return (
            <Card key={Math.random()+'_Campains_'+Math.random()} style={[{width: Width, height: props.height}, Border_Radius_5]}>
                <Text style={[Size_20, P5]}><IconSocial icon={item.social.name} size={24} /> {item.social.name}</Text>
                <Text style={[label_1, P5]}>{item.name}</Text>
                <Text style={[P5]}><Text style={[label_nb_1]}>{item.products}</Text> <Text style={[label_1]}>{item.products > 0 ? "productos" : "producto"}</Text></Text>
            </Card>
        );
    };

    return(
        <View style={[Width_Max, P5]}>
            <View style={[Width_Max, P5, Background_White, Border_Radius_5]}>
                <View style={[Width_Max]}>
                    <Text style={label_1}>Campañas</Text>
                </View>
                <Carousel data={props.data} renderItem={_renderItem} sliderWidth={Width} itemWidth={Width} />
            </View>
        </View>
    );
};
export default Campains;