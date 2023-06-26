import React from 'react';  
import { View, ScrollView } from 'react-native';
import {SCREEN_RELATIVE, SCREEN_ABSOLUTE_HEADER, SCREEN_ABSOLUTE_BODY, SCROLL_STYLE} from "./../../../Themes/Dismac/ThemeDismac";
import { IconButton, FAB, Text } from 'react-native-paper';
import axios from 'axios';

/** Components */
import Header from '../../Home/Views/Components/Header';
import { RED_DIS, WHITE } from '../../Login/Style/css';
import DateRange from './Components/DateRange';
import Venta from './Components/Venta';
import { CREATE_BODY_SALE_QUERY, GET_HEADER_TOKEN, URL_API } from '../../../Helpers/API';
import ResultNone from '../../Account/Helper/ResultNone';
import { Icon_Section } from '../../Login/Style/style';

const Sales = (props) => {
    const [status, SetStatus] = React.useState("PENDIENTE");
    const [query, SetQuery] = React.useState("");
    const [Date, SetDate] = React.useState({"firstDate": "", "secondDate": ""});
    const [Items, SetItems] = React.useState([]);
    const [state, setState] = React.useState({ open: false });
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [socket, SetSocket] = React.useState(props.socket);
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    React.useEffect(() => {
        //
    }, []);

    function accionOpen() {
        if (open) {
            //
        }
    }

    function showModal() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    function changeValue(a) {
        SetDate(a);
        getDataApi(query, status, a);
    }

    function getDataApi(query, estado, date){
        axios.post(URL_API("order/search"),CREATE_BODY_SALE_QUERY(query, estado, date),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SetItems(res.data.response);
            }
        }).catch(err => {
            //
        });
    }

    function selectStatusQuery(estado){
        SetStatus(estado);
        getDataApi(query, estado, Date);
    }

    return (
        <View style={SCREEN_RELATIVE}>
            <View style={SCREEN_ABSOLUTE_HEADER}>
                <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} right={(
                    <View style={Icon_Section}>
                        <IconButton icon={"calendar"} iconColor={RED_DIS} size={24} onPress={() => showModal()} />
                    </View>)} />
            </View>
            <View style={SCREEN_ABSOLUTE_BODY}>
                <ScrollView showsVerticalScrollIndicator={false} style={SCROLL_STYLE}>
                    {
                        Items.map((item) => {
                            return (
                                <Venta key={Math.random()+'_Sale_'+Math.random()+item.id} navigation={props.navigation} socket={socket} TOKEN={TOKEN} venta={item} />
                            )
                        })
                    }
                    { Items.length == 0 && (<ResultNone />) }
                </ScrollView>
                <DateRange closeModal={() => closeModal()} changeValue={(a) => changeValue(a)} socket={socket} isModalVisible={isModalVisible} key={"Range_Date"} />
                <FAB.Group backdropColor={"rgba(0,0,0,0.5)"} color={RED_DIS} open={open} visible icon={open ? 'star' : 'plus'}
                    actions={[
                        {icon: 'check-circle',label: 'Realizadas',color: RED_DIS, labelTextColor: WHITE, onPress: () => selectStatusQuery("COMPLETADA") },
                        {icon: 'clock-check',label: 'Pendientes',color: RED_DIS, labelTextColor: WHITE, onPress: () => selectStatusQuery("PENDIENTE")},
                        {icon: 'close-octagon',label: 'Canceladas',color: RED_DIS, labelTextColor: WHITE, onPress: () => selectStatusQuery("CANCELADA")},
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => accionOpen()}
                />
            </View>
        </View>
    );
};

export default Sales;