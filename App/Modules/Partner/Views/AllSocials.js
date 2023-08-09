import React from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { GET_HEADER_TOKEN, URL_API, generateCustomId } from '../../../Helpers/API';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { PaddingScrollHorizontal } from '../../Login/Style/style';
import SocialItem from './Components/SocialItem';

const AllSocials = ({ route, navigation }) => {
    const { roles, Socket, TOKEN } = route.params;
    const [List, SetList] = React.useState([]);
    const [Loading, SetLoading] = React.useState(false);

    React.useEffect(() => {
        loadPage();
    }, []);

    const getListStore = async (token) => {
        try {
            const response = await axios.get(URL_API('partner/socialNetworkPartner'), GET_HEADER_TOKEN(token));
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
                            <SocialItem key={generateCustomId()} TOKEN={TOKEN} state={state} navigation={navigation} height={150} />
                        )
                    })
                }
            </ScrollView>
        );
    }
};

export default AllSocials;