import React from 'react';
import { View, Text, FlatList, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { GET_HEADER_TOKEN, URL_API, generateCustomId } from '../../../Helpers/API';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { StyleReport } from '../../Login/Style/style';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const TypesReport = ({ route, navigation }) => {
    const { TOKEN, TYPE } = route.params;
    const [List, SetList] = React.useState([]);
    const scrollY = new Animated.Value(0);
    const [Loading, SetLoading] = React.useState(false);

    React.useEffect(() => {
        getListTypes();
    }, []);

    function selectEvent(code) {
        navigation.push("ReporteGraphics", { "TOKEN": TOKEN, "TYPE": TYPE, "CODE": code });
    }

    const renderItem = ({ item, index }) => {
        const translateY = scrollY.interpolate({
            inputRange: [(index - 1) * 100, index * 100, (index + 1) * 100],
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[StyleReport.itemContainer, { transform: [{ translateY }] }]}>
                <TouchableOpacity onPress={() => selectEvent(item.code)} style={StyleReport.item}>
                    <Text style={StyleReport.title}>{item.code}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const getItemLayout = (data, index) => ({
        length: 100,
        offset: 100 * index,
        index,
    });

    const getListAnalyticsEvent = async (type, token) => {
        try {
            const body = {
                type: type
            };

            const response = await axios.post(
                URL_API('partner/listAnalyticsEvent'),
                body,
                GET_HEADER_TOKEN(token)
            );

            if (response.data?.response) {
                const dataWithIds = response.data.response.map((item) => ({
                    ...item,
                    id: generateCustomId()
                }));
                return dataWithIds;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    async function getListTypes() {
        SetList(await getListAnalyticsEvent(TYPE, TOKEN));
        SetLoading(true);
    }

    if (Loading == false) {
        return (<LoadingPage />);
    } else {
        return (
            <View style={StyleReport.container}>
                <AnimatedFlatList data={List} keyExtractor={(item) => item.id} renderItem={renderItem}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                    showsVerticalScrollIndicator={false} contentContainerStyle={StyleReport.contentContainer}
                    style={StyleReport.flatList} initialScrollIndex={0} getItemLayout={getItemLayout}
                />
            </View>
        );
    }
};

export default TypesReport;