import React from 'react';  
import { View, ScrollView, Text, Animated, TouchableOpacity, FlatList, Image } from 'react-native';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
import { Snackbar, List, TextInput, Button } from 'react-native-paper';
import { ARROW_RIGHT, BLACK, CONTENT_ANIMATION_PICTURE, CONTENT_BODY, CONTENT_DIRECTION, CONTENT_DIRECTION_BODY, CONTENT_ICON_LOCATE, CONTENT_PICTURE, CONTENT_PICTURE_RENDER, CONTENT_PICTURE_RENDER_ITEM, CONTENT_PRICE, ICON_LINK, JUSTIFY_CONTENT, LOCATE, Margin_Top_5, PADDING_HORIZONTAL_16, PICTURE_ANIMATION, PRODUCT_CONTENT_INFORMATION, PRODUCT_DESCRIPTION, PRODUCT_INFORMATION, PRODUCT_NAME_CONTENT, RED_DIS, ROW_SECTION } from '../../Login/Style/css';
import { Section_Flex, style } from '../../Login/Style/style';
import { StatusBar } from 'expo-status-bar';
import { GET_HEADER_TOKEN, URL_API, URL_API_SHOW } from '../../../Helpers/API';
import { SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import LoadingPage from '../../Home/Views/Components/LoadingPage';

/** Components */
const COLOURS = {
    white: '#ffffff',
    black: '#000000',
    green: '#00AC76',
    red: '#C04345',
    blue: '#0043F9',
    backgroundLight: '#F0F0F3',
    backgroundMedium: '#B9B9B9',
    backgroundDark: '#777777',
};

const ViewProduct = ({route, navigation }) => {
    const { TOKEN, id_product } = route.params;
    const [loading, setLoading] = React.useState(false);
    const [Product, SetProduct] = React.useState(null);
    const [product, setProduct] = React.useState({
        id: 3,
        category: 'accessory',
        productName: 'boAt Airdopes 441',
        productPrice: 1999,
        description:
          'Bluetooth: It has Bluetooth v5.0 with a range of 10m and is compatible with Android & iOS',
        isOff: true,
        offPercentage: 18,
        productImage: require('./../../../../assets/Social/Facebook.png'),
        isAvailable: true,
        productImageList: [
          require('./../../../../assets/Social/Facebook.png'),
          require('./../../../../assets/Social/Instagram.png'),
          require('./../../../../assets/Social/Twitter.png'),
        ],
    });
    const width = windowWidth;
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    const EventAnimated = Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],{useNativeDriver: false});
    const renderProduct = ({item, index}) => {
        return (
          <View style={[{width: width}, CONTENT_PICTURE_RENDER]}>
            <Image source={{uri: item.url}} style={CONTENT_PICTURE_RENDER_ITEM} />
          </View>
        );
    };

    React.useEffect(() => {
        getProduct();
    }, []);

    function getProduct(){
        axios.get(URL_API_SHOW("product", +id_product),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data != null) {
                SetProduct(res.data.response);
                setLoading(true);
            }
        }).catch(err => {
            //
        });
    }

    if (loading === false) {
        return (<LoadingPage />);
    }else{
        return (
            <View style={CONTENT_BODY}>
                <StatusBar backgroundColor={RED_DIS} style="light" />
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                    <View style={CONTENT_PICTURE}>
                        <FlatList data={Product.pictures} horizontal renderItem={renderProduct} showsHorizontalScrollIndicator={false} decelerationRate={0.8} snapToInterval={width} bounces={false} onScroll={EventAnimated} />
                        <View style={CONTENT_ANIMATION_PICTURE}>
                            {
                                Product.pictures && (
                                    Product.pictures.map((data, index) => {
                                        let opacity = position.interpolate({inputRange: [index - 1, index, index + 1],outputRange: [0.2, 1, 0.2],extrapolate: 'clamp'});
                                        return (
                                            <Animated.View key={index} style={[PICTURE_ANIMATION, {backgroundColor: BLACK,opacity}]}></Animated.View>
                                        );
                                    })
                                )
                            }
                        </View>
                    </View>
                    <View style={PRODUCT_INFORMATION}>
                        <View style={PRODUCT_CONTENT_INFORMATION}>
                            <Text style={PRODUCT_NAME_CONTENT}>
                                {Product.name}
                            </Text>
                            <Ionicons name="link-outline" style={ICON_LINK} />
                        </View>
                        <Text style={PRODUCT_DESCRIPTION}>
                            {product.description}
                        </Text>
                        <View style={CONTENT_DIRECTION_BODY}>
                            <View style={CONTENT_DIRECTION}>
                                <View style={CONTENT_ICON_LOCATE}>
                                    <Entypo name="location-pin" style={LOCATE}/>
                                </View>
                                <Text> Rustaveli Ave 57,{'\n'}17-001, Batume</Text>
                            </View>
                            <Entypo name="chevron-right" style={ARROW_RIGHT}/>
                        </View>
                        <View style={PADDING_HORIZONTAL_16}>
                            <Text style={CONTENT_PRICE}>
                                {product.productPrice}.00
                            </Text>
                            <Text>
                                Tax Rate 2%~ &#8377;{product.productPrice / 20} (&#8377;
                                {product.productPrice + product.productPrice / 20})
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

export default ViewProduct;