import React, {useState} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { PageLoading, Page, SCROLL_STYLE, Padding_10_B_5 } from '../../../Themes/Dismac/ThemeDismac';
import { AlingFormItem, Centered, RowForm, TitleSub, Top_15_Red } from '../../Login/Style/style';
import { TextInput, Button } from 'react-native-paper';
import { windowWidth, windowHeight } from '../../../Helpers/GetMobil';
import { CREATE_BODY_SET_CATALOG, GET_HEADER_ACCOUNT, GET_HEADER_TOKEN, URL_API } from '../../../Helpers/API';
import axios from 'axios';

/** Components */
import Subtitle from '../../../Components/Subtitle';
import MessageBox from '../../../Components/MessageBox';
import { StatusBar } from 'expo-status-bar';
import { RED_DIS } from '../../Login/Style/css';
import TwoSwitch from '../../Catalog/Views/Components/TwoSwitch';
import TwoActionColumn from '../../Catalog/Views/Components/TwoActionColumn';
import DateTimePicker from '@react-native-community/datetimepicker';
/** */

const AddCampaign = ({route, navigation }) => {
    const { roles, Socket, TOKEN} = route.params;
    const widthView = windowWidth-20;
    const [Status, SetStatus] = React.useState(false);
    const [Name, SetName] = React.useState("");
    const [Url, SetUrl] = React.useState("");
    const [LOADING, SETLOADING] = React.useState(false);
    const [ShowMessage, SetShowMessage] = React.useState(false);
    const [Message, SetSetMessage] = React.useState("");
    const [datePicker, setDatePicker] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [dateEndPicker, setDateEndPicker] = React.useState(false);
    const [dateEnd, setEndDate] = React.useState(new Date(Date.now()));
    const [IdCategory, SetIdCategory] = React.useState(null);

    React.useEffect(() => {
        //
    }, []);

    async function registerCatalog() {
        if (Name.length > 5 && IdCategory != null) {
            SETLOADING(true);
            axios.post(URL_API("partner/create/campaign"),{
                "name" : Name,
                "url" : Url,
                "status" : Status,
                "id_category" : IdCategory,
                "from_at" : date,
                "to_at" : dateEnd
            }, GET_HEADER_TOKEN(TOKEN)).then(res => {
                if (res.data.response) {
                    route.params.onGoBack(true);
                    navigation.goBack();
                }
            }).catch(err => {});
        }else{
            SETLOADING(false);
        }
    }

    function ShowAlertMessage(text) {
        SetSetMessage(text);
        SetShowMessage(true);
        SETLOADING(false);
    }

    function showDatePicker() {
        setDatePicker(true);
    }
 
    function showDateEndPicker() {
        setDateEndPicker(true);
    }

    function onDateSelected(event, value) {
        setDatePicker(false);
        setDate(value);
    }

    function onDateEndSelected(event, value) {
        setDateEndPicker(false);
        setEndDate(value);
    }

    function selectedCategory(){
        navigation.push("SelectedCategory", {"roles" : roles, "Socket" : Socket, "TOKEN" : TOKEN,"onGoBack" : onGoBackAction});
    }
    
    function onGoBackAction(a, idCategory){
        if (a){
            SetIdCategory(idCategory);
        }
    }

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                <View style={[{width: windowWidth, height: windowHeight}]}>
                    <View style={Padding_10_B_5}>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Nombre."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Nombre" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Name} onChangeText={text => SetName(text)} label={Name.length+"/50"} maxLength={50} />
                            </View>
                        </View>
                    </View>
                    <View style={Padding_10_B_5}>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Url."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Url" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Url} onChangeText={text => SetUrl(text)} />
                            </View>
                        </View>
                    </View>
                    <View style={Padding_10_B_5}>
                        <View style={AlingFormItem}>
                            <TwoSwitch disabled={false} width={widthView} column1={widthView*0.75} column2={widthView*0.25} value={Status} label1={'Estado'} Action={(a) => SetStatus(a)} />
                        </View>
                    </View>
                    <View style={Padding_10_B_5}>
                        <View style={AlingFormItem}>
                            <TwoActionColumn disabled={false} width={widthView} column1={widthView*0.75} column2={widthView*0.25}label1={'Fecha de inicio.'} label2={'Seleccionar'} Action={() => showDatePicker()} />
                        </View>
                    </View>
                    <View style={Padding_10_B_5}>
                        <View style={AlingFormItem}>
                            <TwoActionColumn disabled={false} width={widthView} column1={widthView*0.75} column2={widthView*0.25}label1={'Fecha de finalizacion.'} label2={'Seleccionar'} Action={() => showDateEndPicker()} />
                        </View>
                    </View>
                    <View style={Padding_10_B_5}>
                        <View style={AlingFormItem}>
                            <TwoActionColumn disabled={false} width={widthView} column1={widthView*0.75} column2={widthView*0.25}label1={'Categoría.'} label2={'Seleccionar'} Action={() => selectedCategory()} />
                        </View>
                    </View>
                    {datePicker && (
                        <DateTimePicker value={date} mode={'date'} display={"spinner"} onChange={onDateSelected}
                            style={{justifyContent: 'center',alignItems: 'flex-start',width: 320,height: 260,display: 'flex'}}
                        />
                    )}
                        
                    {dateEndPicker && (
                        <DateTimePicker value={dateEnd} mode={'date'} display={"spinner"} onChange={onDateEndSelected}
                            style={{justifyContent: 'center',alignItems: 'flex-start',width: 320,height: 260,display: 'flex'}}
                        />
                    )}
                    {
                        Name.length > 5 && IdCategory != null && (
                            <View style={Centered}>
                                <Button icon="book" loading={LOADING} mode="contained" style={Top_15_Red} onPress={() => registerCatalog()}>
                                    Registrar campaña
                                </Button>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
            <MessageBox ShowMessage={ShowMessage} CloseMessage={() => SetShowMessage(false)} Title={"Dismac"} Text={Message} />
            <StatusBar backgroundColor={RED_DIS} style="light" />
        </View>
    );
};

export default AddCampaign;