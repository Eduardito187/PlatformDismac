import React from 'react';
import { View, Text, FlatList, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { windowWidth } from '../../../Helpers/GetMobil';
import axios from 'axios';
import { GET_HEADER_TOKEN, URL_API } from '../../../Helpers/API';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { v4 as uuidv4 } from 'uuid';
import { RandomBytes } from 'react-native-get-random-values';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const TypesReport = ({ route, navigation }) => {
    const { TOKEN, TYPE } = route.params;
    const [List, SetList] = React.useState([]);
    const scrollY = new Animated.Value(0);
    const [Loading, SetLoading] = React.useState(false);
    const generateUUID = () => {
        const uuid = uuidv4(null, RandomBytes);
        return uuid;
    };

    React.useEffect(() => {
        getListTypes();
    }, []);

    const renderItem = ({ item, index }) => {
        const translateY = scrollY.interpolate({
            inputRange: [(index - 1) * 100, index * 100, (index + 1) * 100],
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[styles.itemContainer, { transform: [{ translateY }] }]}>
                <TouchableOpacity style={styles.item}>
                <Text style={styles.title}>{item.code}</Text>
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
                    id: generateUUID()
                }));
                console.log(dataWithIds);
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

    if (Loading == false){
        return(<LoadingPage />);
    }else{
        return(
            <View style={styles.container}>
                <AnimatedFlatList data={List} keyExtractor={(item) => item.id} renderItem={renderItem}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }],{ useNativeDriver: true })}
                    showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}
                    style={styles.flatList} initialScrollIndex={0} getItemLayout={getItemLayout}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
  flatList: {
    width: '100%',
  },
  itemContainer: {
    width: '100%',
    alignItems: 'center',
  },
  item: {
    width: windowWidth-20,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    elevation: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8
  },
  title: {
    fontSize: 18,
  },
});

export default TypesReport;
