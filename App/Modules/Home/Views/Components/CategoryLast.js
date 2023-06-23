import React, {useState} from 'react';
import { ScrollView, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CARD_CATEGORY, CONTENT_GRADIENT, DESGRADE_ARRAY, DESGRADE_CONTENT_CATEGORY, IMAGE_MAX, NAME_TEXT, RADIUS_PICTURE_IMAGE, RED_DIS, TITLE_SECTION } from '../../../Login/Style/css';
import { CONTENT_SECTION, SECTION_CONTENT } from '../../../Login/Style/style';
/** */


const CategoryLast = (props) => {
    const [Navigation, SetNavigation] = React.useState(props.navigation);
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN)

    React.useEffect(() => {
        //
    }, []);

    function selectCatalog(category) {
        Navigation.push("ShowCategory", {"id_catalog":0,"id_category":category.id,"TOKEN":props.TOKEN,"onGoBack": onGoBackAction,"inheritance": null});
    }

    function onGoBackAction(){
        //
    }
    
    return(
        <View style={CONTENT_SECTION}>
            <Text style={TITLE_SECTION}>Categorías {"("+props.categorys.length+")"}</Text>
            <View style={SECTION_CONTENT}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    props.categorys.map((category) => {
                        return (
                            <TouchableOpacity key={Math.random()+'_Categorys_'+Math.random()} style={CARD_CATEGORY} onPress={() => selectCatalog(category)}>
                                <ImageBackground source={{uri: category.image}} style={IMAGE_MAX} imageStyle={RADIUS_PICTURE_IMAGE}>
                                    <View style={DESGRADE_CONTENT_CATEGORY}>
                                        <LinearGradient colors={DESGRADE_ARRAY} style={CONTENT_GRADIENT}>
                                            <Text style={NAME_TEXT}>{category.name}</Text>
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
export default CategoryLast;