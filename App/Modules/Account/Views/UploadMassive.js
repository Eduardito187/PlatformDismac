import React from 'react';  
import { View, ScrollView } from 'react-native';
import {Page, SCREEN_ABSOLUTE_BODY, SCREEN_ABSOLUTE_HEADER, SCREEN_RELATIVE, SCROLL_STYLE} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from "expo-document-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

/** Components */
import Header from '../../Home/Views/Components/Header';
import { TitleSub } from '../../Login/Style/style';
import Subtitle from '../../../Components/Subtitle';
import TwoActionColumn from '../../Catalog/Views/Components/TwoActionColumn';
import { windowWidth } from '../../../Helpers/GetMobil';
import { Button } from 'react-native-paper';
import { RED_DIS } from '../../Login/Style/css';
import TwoRadio from '../../Catalog/Views/Components/TwoRadio';
import { GET_HEADER_TOKEN_FILE, URL_API } from '../../../Helpers/API';

const UploadMassive = (props) => {
    const [DateEjecute, SetDateEjecute] = React.useState(false);
    const [DateDuracion, SetDateDuracion] = React.useState(false);
    const [ejecucion, setEjecucion] = React.useState("AHORA");
    const [duracion, setDuracion] = React.useState("PERMANENTE");
    const widthView = windowWidth - 20;
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN);
    const [Disable, SetDisable] = React.useState(false);
    const [Open, SetOpen] = React.useState(false);
    const [Value, SetValue] = React.useState("");
    const [Items, SetItems] = React.useState([]);
    const [File, SetFile] = React.useState(null);
    const [FileName, SetFileName] = React.useState("");
    const [date, SetDate] = React.useState(new Date());
    const [FechaEjecucion, SetFechaEjecucion] = React.useState("");
    const [FechaDuracion, SetFechaDuracion] = React.useState("");
    
    React.useEffect(() => {
        setOptionSelect();
    }, []);

    const showDateEjecute = () => {
        SetDateEjecute(true);
    };

    const hideDateEjecute = () => {
        SetDateEjecute(false);
    };

    const confirmDateEjecucion = (d) => {
        var datestring = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        SetFechaEjecucion(datestring);
        hideDateEjecute();
    };

    const showDateDuracion = () => {
        SetDateDuracion(true);
    };

    const hideDateDuracion = () => {
        SetDateDuracion(false);
    };

    const confirmDateDuracion = (d) => {
        var datestring = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        SetFechaDuracion(datestring);
        hideDateDuracion();
    };

    function setOptionSelect(){
        let items = [
            {
                "label" : "Stock",
                "value" : "Stock"
            },
            {
                "label" : "Estados",
                "value" : "Estados"
            },
            {
                "label" : "Categorizar",
                "value" : "Categorizar"
            },
            {
                "label" : "Precios",
                "value" : "Precios"
            }
        ];
        SetItems(items);
    }

    async function selectFile() {
        let result = await DocumentPicker.getDocumentAsync({type: ["text/comma-separated-values"], copyToCacheDirectory: true, multiple: true});
        if (result.type === 'success') {
            SetFileName(result.name);
            SetFile(result);
        }else{
            SetFileName("");
            SetFile(null);
        }
    }

    function sentForm() {
        SetDisable(true);
        if (File != null) {
            let formData = new FormData();
            formData.append('File', { uri: File.uri, name: File.name, type: File.mimeType });
            formData.append('Type', Value);
            formData.append('Ejecucion', ejecucion);
            formData.append('Duracion', duracion);
            if (ejecucion == "PROGRAMAR") {
                formData.append('FechaEjecucion', FechaEjecucion);
            }
            if (duracion == "TEMPORAL") {
                formData.append('FechaDuracion', FechaDuracion);
            }
            axios.post(URL_API("uploadFile"),formData,GET_HEADER_TOKEN_FILE(TOKEN)).then(res => {
                if (res.response) {
                    SetDisable(false);
                }
            }).catch(err => {
                SetDisable(false);
            });
        }else{
            SetDisable(false);
        }
    }

    return (
        <View style={SCREEN_RELATIVE}>
            <View style={SCREEN_ABSOLUTE_HEADER}>
                <Header showMenu={props.showMenu} DrawerAction={(a) => props.DrawerAction(a)} />
            </View>
            <View style={SCREEN_ABSOLUTE_BODY}>
                <View style={{width: "100%", padding: 10}}>
                    <View style={{width: "100%"}}>
                        <Subtitle style={TitleSub} text={"Acción:"} />
                        <View style={{marginTop: 5}}>
                            <DropDownPicker open={Open} value={Value} items={Items} setOpen={(value) => SetOpen(value)} setValue={(value) => SetValue(value)} setItems={SetItems} />
                        </View>
                    </View>
                    <View style={{width: "100%", marginTop: 10}}>
                        <Subtitle style={TitleSub} text={"Data:"} />
                        <View style={{marginTop: 5}}>
                            <TwoActionColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Subír archivo'} label2={'Seleccionar'} Action={() => selectFile()} />    
                            {
                                FileName.length > 0 && (<Subtitle style={TitleSub} text={FileName} />)
                            }
                        </View>
                    </View>
                    <View style={{width: "100%", marginTop: 10}}>
                        <Subtitle style={TitleSub} text={"Ejecución:"} />
                        <View style={{marginTop: 5}}>
                            <TwoRadio label1={"Ahóra"} value={"AHORA"} select={ejecucion} setValue={(a) => setEjecucion(a)} />
                            <TwoRadio label1={"Programar"} value={"PROGRAMAR"} select={ejecucion} setValue={(a) => setEjecucion(a)} />
                            {
                                ejecucion == "PROGRAMAR" && (
                                    <TwoActionColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Fecha'} label2={'Seleccionar'} Action={() => showDateEjecute()} />    
                                )
                            }
                        </View>
                    </View>
                    <View style={{width: "100%", marginTop: 10}}>
                        <Subtitle style={TitleSub} text={"Duración:"} />
                        <View style={{marginTop: 5}}>
                            <TwoRadio label1={"Permanente"} value={"PERMANENTE"} select={duracion} setValue={(a) => setDuracion(a)} />
                            <TwoRadio label1={"Temporal"} value={"TEMPORAL"} select={duracion} setValue={(a) => setDuracion(a)} />
                            {
                                duracion == "TEMPORAL" && (
                                    <TwoActionColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} label1={'Fecha'} label2={'Seleccionar'} Action={() => showDateDuracion()} />    
                                )
                            }
                        </View>
                    </View>
                    <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <Button icon="upload" disabled={Disable} mode="contained" style={{backgroundColor: RED_DIS, width: 150}} onPress={() => sentForm()}>
                            Subir Data
                        </Button>
                    </View>
                </View>
            </View>
            <DateTimePickerModal isVisible={DateEjecute} is24Hour={true} mode="datetime" onConfirm={confirmDateEjecucion} onCancel={hideDateEjecute} />
            <DateTimePickerModal isVisible={DateDuracion} is24Hour={true} mode="datetime" onConfirm={confirmDateDuracion} onCancel={hideDateDuracion} />
        </View>
    );
};

export default UploadMassive;