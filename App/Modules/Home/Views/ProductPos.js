import React from 'react';  
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Flex_Content, JUSTIFY_CONTENT, Margin_Top_5, RED_DIS, ROW_SECTION } from '../../Login/Style/css';
import { StatusBar } from 'expo-status-bar';
import { GET_HEADER_TOKEN, URL_API_GET } from '../../../Helpers/API';
import { Padding_10_B_5, SCROLL_STYLE } from '../../../Themes/Dismac/ThemeDismac';
import LoadingPage from './Components/LoadingPage';
import { AlingFormItem, RowForm, RowFormFlex, SubTitleText, TitleSub } from '../../Login/Style/style';
import Subtitle from '../../../Components/Subtitle';
import PopUpLink from '../../Account/Views/Components/PopUpLink';

const ProductPos = ({route, navigation }) => {
    const { TOKEN, id_product } = route.params;
    const [loading, setLoading] = React.useState(false);
    const [LinkUrl, SetLinkUrl] = React.useState("");
    const [Clacom, SetClacom] = React.useState(null);
    const [Type, SetType] = React.useState(null);
    const [isModalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        getProductInfo();
    }, []);

    async function getProductInfo(){
        axios.get(URL_API_GET("product/pos/"+id_product),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if (res.data != null) {
                SetLinkUrl(res.data.response.url);
                SetClacom(res.data.response.clacom);
                SetType(res.data.response.type);
                thenLoading();
            }
        }).catch(err => {
            //
        });
    }

    function showModal() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    function thenLoading() {
        setLoading(true);
    }
    
    if (loading === false) {
        return (<LoadingPage />);
    }else{
        return (
            <SafeAreaView style={Flex_Content}>
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                    <View style={[ROW_SECTION, Margin_Top_5,JUSTIFY_CONTENT]}>
                        <View style={Padding_10_B_5}>
                            <View style={AlingFormItem}>
                                <View style={RowForm}>
                                    <Subtitle style={TitleSub} text={"Url."} />
                                </View>
                                <TouchableOpacity onPress={() => showModal()} style={RowFormFlex}>
                                    <Subtitle style={SubTitleText} text={LinkUrl} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[ROW_SECTION, Margin_Top_5,JUSTIFY_CONTENT]}>
                        <View style={Padding_10_B_5}>
                            <View style={AlingFormItem}>
                                <View style={RowForm}>
                                    <Subtitle style={TitleSub} text={"Clacom."} />
                                </View>
                                <View style={RowForm}>
                                    {Clacom != null && (<Subtitle style={SubTitleText} text={Clacom.label} />)}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[ROW_SECTION, Margin_Top_5,JUSTIFY_CONTENT]}>
                        <View style={Padding_10_B_5}>
                            <View style={AlingFormItem}>
                                <View style={RowForm}>
                                    <Subtitle style={TitleSub} text={"Tipo de producto."} />
                                </View>
                                <View style={RowForm}>
                                    {Type != null && (<Subtitle style={SubTitleText} text={Type.type} />)}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <PopUpLink closeModal={() => closeModal()} isModalVisible={isModalVisible} TOKEN={TOKEN} Link={LinkUrl} />
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </SafeAreaView>
        );
    }
};

export default ProductPos;