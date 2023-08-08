import React, {useState} from 'react';
import { ScrollView, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CARD_PRODUCT, CONTENT_GRADIENT, DESGRADE_ARRAY, DESGRADE_CONTENT_LARGE, IMAGE_MAX, NAME_TEXT, RADIUS_PICTURE_IMAGE, RED_DIS, SKU_TEXT, TITLE_SECTION } from '../../../Login/Style/css';
import { CONTENT_SECTION, SECTION_CONTENT } from '../../../Login/Style/style';
import { generateCustomId } from '../../../../Helpers/API';
/** */


const ProductLast = (props) => {
    const [Navigation, SetNavigation] = React.useState(props.navigation);
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN)

    React.useEffect(() => {
        //
    }, []);
    
    function viewProduct(id_product) {
        Navigation.push("ShowProduct", {"id_product":id_product,"TOKEN":TOKEN});
    }
    
    return(
        <View style={CONTENT_SECTION}>
            <Text style={TITLE_SECTION}>Productos {"("+props.products.length+")"}</Text>
            <View style={SECTION_CONTENT}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    props.products.map((product) => {
                        return (
                            <TouchableOpacity onPress={() => viewProduct(product.id)} key={generateCustomId()} style={CARD_PRODUCT}>
                                <ImageBackground source={{uri: product.image}} style={IMAGE_MAX} imageStyle={RADIUS_PICTURE_IMAGE}>
                                    <View style={DESGRADE_CONTENT_LARGE}>
                                        <LinearGradient colors={DESGRADE_ARRAY} style={CONTENT_GRADIENT}>
                                            <Text style={NAME_TEXT}>{product.name}</Text>
                                            <Text style={SKU_TEXT}>{product.sku}</Text>
                                        </LinearGradient>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    })
                }
                </ScrollView>
            </View>
        </View>
    );
};
export default ProductLast;