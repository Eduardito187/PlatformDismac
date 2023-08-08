import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { STYLE,ContentFORM,BottomNEXT,RowForm,AlingFormItem,AlingForm,TitleSub } from '../Style/style';
import { settingRegister } from '../../../Helpers/SettingRegister';
/** Components */
import Subtitle from '../../../Components/Subtitle';
import Top from './Component/Top';
import Next from './Component/Next';
import { Route } from '../Interfaces/Route';
import { RED_DIS } from '../Style/css';
/** */

const Legal = ({route, navigation }) => {
    const [Steps, SetSteps] = React.useState(Route.length);
    const [Step, SetStep] = React.useState(3);
    const [Nit, SetNit] = React.useState("");
    const [Razon, SetRazon] = React.useState("");
    const [Representante, SetRepresentante] = React.useState("");
    React.useEffect(() => {
        //
    }, []);
    async function StepNext() {
        await settingRegister([Nit,Razon,Representante], Step);
        navigation.push(Route[Step-1]["Next"]);
    }

    return (
        <View style={STYLE.RegisterContainer}>
            <StatusBar backgroundColor={RED_DIS} style="light" />
            <View style={STYLE.SECCTION_TITLE}>
                <Top Step={Step} Steps={Steps} Title={Route[Step-1]["title"]} navigation={navigation} />
            </View>
            <View style={STYLE.SECCTION_FORM}>
                <View style={ContentFORM}>
                    <View style={AlingForm}>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Nit."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Nit" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Nit} onChangeText={text => SetNit(text)} maxLength={14} />
                            </View>
                        </View>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Razon social."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Razon social" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Razon} onChangeText={text => SetRazon(text)} label={Razon.length+"/50"} maxLength={50} />
                            </View>
                        </View>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Representante legal."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Representante legal" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Representante} onChangeText={text => SetRepresentante(text)} label={Representante.length+"/50"} maxLength={50} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={BottomNEXT}>
                    <Next Step={Step} Disable={Nit.length > 0 && Razon.length > 0 && Representante.length > 0 ? false : true} StepNext={() => StepNext()} />
                </View>
            </View>
        </View>
    );
};

export default Legal;