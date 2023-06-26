import React, {useState} from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import ImagenAnimation from '../../../../Components/ImagenAnimation';
import { Column_Content, Column_Detail, Column_Image, Column_Price, Height_135, Max_Content_Center } from '../../../Login/Style/css';
/** */

const ProductOption = (props) => {
    const [item, SetItem] = React.useState(props.Product);

    return(
        <View key={Math.random()+'_Product_Detail_'+Math.random()+item.id} style={Column_Content}>
            <View style={Column_Image}>
                <ImagenAnimation style={Height_135} url={item.image} animation={{border: 5, time: 1000}} />
            </View>
            <View style={Column_Detail}>
                <Text variant="titleSmall">{item.name}</Text>
                <Text variant="bodySmall">{item.sku}</Text>
                <View style={Max_Content_Center}>
                    <Text variant="titleLarge">{item.Qty}</Text>
                </View>
            </View>
            <View style={Column_Price}>
                <Text variant="titleSmall">{item.SubTotal} Bs</Text>
            </View>
        </View>
    );
};
export default ProductOption;