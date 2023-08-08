import React from 'react';
import { View, ScrollView } from 'react-native';
import axios from 'axios';
import { windowWidth } from '../../../Helpers/GetMobil';

/** Components */
import { RED_DIS, Scroll_Section, Section_Content_Flex } from '../../Login/Style/css';
import { Surface_Style, Width_Max } from '../../Login/Style/style';
import { alingContentCenter } from '../../Catalog/Style/Two';
import { Surface, Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { GET_HEADER_TOKEN, URL_API, generateCustomId } from '../../../Helpers/API';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Reportes = ({ route, navigation }) => {
    const { TOKEN } = route.params;
    const [Analytics, SetAnalytics] = React.useState([]);

    React.useEffect(() => {
        getAnalytics();
    }, []);

    function getAnalytics() {
        axios.get(URL_API("partner/listAnalytics"), GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data != null) {
                SetAnalytics(res.data.response);
            }
        }).catch(err => {
            //
        });
    }

    function selectedTypeAnalytics(type) {
        navigation.push("TypesReport", { "TOKEN": TOKEN, "TYPE": type.type });
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={Scroll_Section}>
            <View style={[Width_Max, alingContentCenter]}>
                {
                    Analytics.map((state, i) => {
                        return (
                            <Surface key={generateCustomId()} style={[{ width: windowWidth / 4.5, margin: 5, height: windowWidth / 4.5 }, Surface_Style]} elevation={4}>
                                <TouchableOpacity style={[Section_Content_Flex]} onPress={() => selectedTypeAnalytics(state)}>
                                    <MaterialCommunityIcons name="google-analytics" size={30} color={RED_DIS} />
                                    <Text>{state.type}</Text>
                                </TouchableOpacity>
                            </Surface>
                        )
                    })
                }
            </View>
        </ScrollView>
    );
};

export default Reportes;