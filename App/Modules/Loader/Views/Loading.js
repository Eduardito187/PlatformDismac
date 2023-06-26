import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { PageLoading } from '../../../Themes/Dismac/ThemeDismac';
import Constants from "expo-constants";
import { GET_TOKEN_SESSION, URL_API_GET, GET_HEADER_TOKEN, SAVE_STORES } from '../../../Helpers/API';
import { ResetNavigation } from '../../../Helpers/Nav';
import axios from 'axios';

/** Components */
import ProgressDismac from '../../../Components/ProgressDismac';
import LogoDismac from '../../../Components/LogoDismac';
import ImgDis from '../../../Components/ImgDis';
import { getTokenNotification } from '../../../Helpers/Code';
/** */

const Loading = ({route, navigation }) => {
  const [TOKEN, SetTOKEN] = React.useState(null);
  const [TokenNotify, SetTokenNotify] = React.useState("");
  React.useEffect(() => {
    setToken();
  }, []);
  async function setToken(){
    let token = await GET_TOKEN_SESSION();
    SetTOKEN(token);
    if (token != null) {
      getStores(token);
    }
  }

  function getStores(token){
    axios.get(URL_API_GET("store"),GET_HEADER_TOKEN(token)).then(res => {
      SAVE_STORES(res.data);
    }).catch(err => {
      console.warn(err, "ERROR AL OBTENER LAS STORES");
    });
  }

  async function loadInterval(res) {
    if (res) {
      if (await GET_TOKEN_SESSION() != null) {
        const token_expo = await getTokenNotification();
        ResetNavigation("Inicio", {}, navigation);
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