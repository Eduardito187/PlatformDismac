import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { PageLoading } from '../../../Themes/Dismac/ThemeDismac';
import Constants from "expo-constants";
import { GET_TOKEN_SESSION } from '../../../Helpers/API';
import { ResetNavigation } from '../../../Helpers/Nav';

/** Components */
import ProgressDismac from '../../../Components/ProgressDismac';
import LogoDismac from '../../../Components/LogoDismac';
import ImgDis from '../../../Components/ImgDis';
/** */

const Loading = ({route, navigation }) => {
  React.useEffect(() => {
    //
  }, []);
  async function loadInterval(res) {
    if (res) {
      if (await GET_TOKEN_SESSION() != null) {
        ResetNavigation("Home",{},navigation);
      }else{
        navigation.navigate('Login');
      }
    }
  }
    return (
        <View style={PageLoading.container}>
          <ImgDis style={PageLoading.img} animation={PageLoading.animation} />
          <ProgressDismac End={(res) => loadInterval(res)} />
          <View style={PageLoading.posLogo}>
            <LogoDismac style={PageLoading.logo} />
          </View>
          <Text style={PageLoading.version}>V {Constants.manifest.version}</Text>
          <StatusBar style="auto" />
        </View>
    );
};

export default Loading;