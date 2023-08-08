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
import Country from './Component/Country';
import { RED_DIS } from '../Style/css';
/** */

const Address = ({route, navigation }) => {
    const [Steps, SetSteps] = React.useState(Route.length);
    const [Step, SetStep] = React.useState(4);
    const [Pais, SetPais] = React.useState(null);
    const [Departamento, SetDepartamento] = React.useState(null);
    const [Provincia, SetProvincia] = React.useState(null);
    const [Preffix, SetPreffix] = React.useState("");
    const [OpenDP, SetOpenDP] = React.useState(false);
    const [CountryHide, SetCountryHide] = React.useState(false);
    React.useEffect(() => {
        //
    }, []);

    async function StepNext() {
        await settingRegister([Pais,Departamento,Provincia], Step);
        navigation.push(Route[Step-1]["Next"]);
    }

    function selectDep(value){
        SetOpenDP(value);
        SetCountryHide(value);
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
                            {CountryHide == false && (<View style={RowForm}><Subtitle style={TitleSub} text={"Pais."} /></View>)}
                            <View style={RowForm}>
                                <Country hide={CountryHide} type={"CO"} Disable={true} changed={(val) => SetPais(val)} />
                            </View>
                        </View>
                        <View style={AlingFormItem}>
                            <View style={RowForm}>
                                <Subtitle style={TitleSub} text={"Departamento."} />
                            </View>
                            <View style={RowForm}>
                                <Country hide={false} type={"DP"} Open={(value) => selectDep(value)} Disable={false} changed={(val) => SetDepartamento(val)} />
                            </View>
                        </View>
                        {
                            OpenDP == false && (
                                <View style={AlingFormItem}>
                                    <View style={RowForm}><Subtitle style={TitleSub} text={"Provincia."} /></View>
                                    <View style={RowForm}><Country hide={false} type={"PV"} Query={Departamento} Disable={false} changed={(val) => SetProvincia(val)} /></View>
                                </View>
                            ) 
                        }
                    </View>
                </View>
                <View style={BottomNEXT}>
                    <Next Step={Step} Disable={Pais != null && Departamento != null && Provincia != null ? false : true} StepNext={() => StepNext()} />
                </View>
            </View>
        </View>
    );
};

export default Address;