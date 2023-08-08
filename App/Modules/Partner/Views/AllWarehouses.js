import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { GET_HEADER_TOKEN, URL_API, generateCustomId } from '../../../Helpers/API';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { ItemCodeScroll, ItemNameScroll, PaddingScrollHorizontal, SubTitleText, SubTitleTextWhite, contentScrollItem } from '../../Login/Style/style';
import { ItemContainerScrol, ItemCountScroll, RED_DIS, WHITE } from '../../Login/Style/css';
import { ALING_CENTER } from '../Style/Style';

const AllWarehouses = ({ route, navigation }) => {
    const { roles, Socket, TOKEN } = route.params;
    const [List, SetList] = React.useState([]);
    const [Loading, SetLoading] = React.useState(false);

    React.useEffect(() => {
        loadPage();
    }, []);

    const getListStore = async (token) => {
        try {
            const response = await axios.get(URL_API('partner/getWarehousesList'), GET_HEADER_TOKEN(token));
            if (response.data?.response) {
                return response.data.response;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };

    async function loadPage() {
        SetList(await getListStore(TOKEN));
        SetLoading(true);
    }

    if (Loading == false) {
        return (<LoadingPage />);
    } else {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={PaddingScrollHorizontal}>
                {
                    List.map((state) => {
                        return (
                            <View key={generateCustomId()} style={contentScrollItem}>
                                <View style={ItemContainerScrol}>
                                    <View style={[ItemCodeScroll, ALING_CENTER]}>
                                        <Text style={SubTitleTextWhite}>{state.almacen}</Text>
                                    </View>
                                    <View style={[ItemCountScroll, ALING_CENTER]}>
                                        {state.base == true && state.city == null && (<Text style={SubTitleText}>Almacen central</Text>)}
                                        {state.base == false && state.city == null && (<Text style={SubTitleText}>Almacen virtual</Text>)}
                                        {state.city != null && (<Text style={SubTitleText}>{state.city.name}</Text>)}
                                    </View>
                                    <View style={[ItemNameScroll, ALING_CENTER]}>
                                        <Text style={SubTitleTextWhite}>{state.name}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        );
    }
};

export default AllWarehouses;