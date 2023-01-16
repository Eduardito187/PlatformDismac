import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { STYLE,ContentFORM,BottomNEXT,RowForm,AlingFormItem,AlingForm,TitleSub } from '../Style/style';

/** Components */
import Subtitle from '../../../Components/Subtitle';
import Top from './Component/Top';
import Next from './Component/Next';
import { Route } from '../Interfaces/Route';
/** */

const AddressExtra = ({route, navigation }) => {
    const [Steps, SetSteps] = React.useState(Route.length);
    const [Step, SetStep] = React.useState(5);
    const [ADRESS, SetADRESS] = React.useState("");
    const [ADRESSE, SetADRESSE] = React.useState("");
    React.useEffect(() => {
        //
    }, []);
    function StepNext() {
        navigation.push(Route[Step-1]["Next"]);
    }

    return (
        <View style={STYLE.RegisterContainer}>
            <StatusBar style="light" />
            <View style={STYLE.SECCTION_TITLE}>
                <Top Step={Step} Steps={Steps} Title={Route[Step-1]["title"]} navigation={navigation} />
            </View>
            <View style={STYLE.SECCTION_FORM}>
                <View style={ContentFORM}>
                    <View style={AlingForm}>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Direccion."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Direccion" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={ADRESS} onChangeText={text => SetADRESS(text)} maxLength={30} />
                            </View>
                        </View>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Direccion extra."} />
                            </View>
                            <View style={RowForm}>
                                <TextInput mode='outlined' placeholder="Direccion extra" selectionColor="rgba(0, 0, 0, 0.5)" 
                                underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427"
                                value={ADRESSE} onChangeText={text => SetADRESSE(text)} maxLength={20} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={BottomNEXT}>
                    <Next Step={Step} Disable={ADRESS.length > 0 && ADRESSE.length > 0 ? false : true} StepNext={() => StepNext()} />
                </View>
            </View>
        </View>
    );
};

export default AddressExtra;