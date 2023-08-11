import React from 'react';
import { View, ScrollView } from 'react-native';
import axios from 'axios';
import { GET_HEADER_TOKEN, URL_API, generateCustomId } from '../../../Helpers/API';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { PaddingScrollHorizontal } from '../../Login/Style/style';
import CampaignContent from './Components/CampaignContent';
import { column, contentOneSectionRight, displayFlex, sectionQr } from '../../Catalog/Style/Two';
import { IconButton } from 'react-native-paper';
import { RED_DIS } from '../../Login/Style/css';

const AllCampaigns = ({ route, navigation }) => {
    const { roles, Socket, TOKEN } = route.params;
    const [List, SetList] = React.useState([]);
    const [Loading, SetLoading] = React.useState(false);

    React.useEffect(() => {
        loadPage();
    }, []);

    const getListStore = async (token) => {
        try {
            const response = await axios.get(URL_API('partner/campaignsPartner'), GET_HEADER_TOKEN(token));
            if (response.data?.response) {
                return response.data.response;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };

    function createCampaign() {
        navigation.push("AddCampaign", {"roles" : roles, "Socket" : Socket, "TOKEN" : TOKEN, "onGoBack" : onGoBackAction});
    }
    
    function onGoBackAction(a){
        if (a){
            loadPage();
        }
    }

    async function loadPage() {
        navigation.setOptions({
            headerRight: () => (
                <View style={[contentOneSectionRight,displayFlex]}>
                    <View style={[sectionQr,column]}>
                        <IconButton icon="plus" iconColor={RED_DIS} size={30} onPress={() => createCampaign()} />
                    </View>
                </View>
            )
        });
        SetList(await getListStore(TOKEN));
        SetLoading(true);
    }

    if (Loading == false) {
        return (<LoadingPage />);
    } else {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={PaddingScrollHorizontal}>
                {
                    List.map((state) => {return (<CampaignContent key={generateCustomId()} Campaign={state} navigation={navigation} />)})
                }
            </ScrollView>
        );
    }
};

export default AllCampaigns;