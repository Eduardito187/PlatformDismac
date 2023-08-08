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

const Personal = ({route, navigation }) => {
    const [Steps, SetSteps] = React.useState(Route.length);
    const [Step, SetStep] = React.useState(2);
    const [Name, SetName] = React.useState("");
    const [Preffix, SetPreffix] = React.useState("");
    React.useEffect(() => {
        //
    }, []);
    async function StepNext() {
        await settingRegister([Name,Preffix], Step);
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
                                <Subtitle style={TitleSub} text={"Nombre del Partner."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Nombre del Partner" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Name} onChangeText={text => SetName(text)} label={Name.length+"/30"} maxLength={30} />
                            </View>
                        </View>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Prefijo del partner."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Prefijo del partner" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={Preffix} onChangeText={text => SetPreffix(text)} label={Preffix.length+"/10"} maxLength={10} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={BottomNEXT}>
                    <Next Step={Step} Disable={Name.length > 0 && Preffix.length > 0 ? false : true} StepNext={() => StepNext()} />
                </View>
            </View>
        </View>
    );
};

export default Personal;