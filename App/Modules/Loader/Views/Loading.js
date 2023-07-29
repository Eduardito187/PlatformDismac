import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { PageLoading } from '../../../Themes/Dismac/ThemeDismac';
import Constants from "expo-constants";
import { GET_TOKEN_SESSION, URL_API_GET, GET_HEADER_TOKEN, SAVE_STORES, SAVE_TOKEN_INVITADO, GET_TOKEN_INVITADO, GET_TOKEN, SAVE_STORES_PARTNER } from '../../../Helpers/API';
import { ResetNavigation } from '../../../Helpers/Nav';
import axios from 'axios';

/** Components */
import ProgressDismac from '../../../Components/ProgressDismac';
import LogoDismac from '../../../Components/LogoDismac';
import ImgDis from '../../../Components/ImgDis';
import { getTokenNotification } from '../../../Helpers/Code';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
/** */

const Loading = ({route, navigation }) => {
  const [TOKEN, SetTOKEN] = React.useState(null);
  const [TokenNotify, SetTokenNotify] = React.useState("");
  const [Loader, SetLoarder] = React.useState(true);

  React.useEffect(() => {
    setToken();
  }, []);

  async function setToken(){
    let TOKEN_INVITADO = await GET_TOKEN_INVITADO();
    if (route.params != null && route.params.TOKEN != null){
      await SAVE_TOKEN_INVITADO("OK");
      getStores(route.params.TOKEN);
    }else if (TOKEN_INVITADO == true){
      getStores(GET_TOKEN());
    }else{
      let token = await GET_TOKEN_SESSION();
      SetTOKEN(token);
      if (token != null) {
        getStores(token);
      }
    }
  }

  function getStores(token){
    axios.get(URL_API_GET("getStores"),GET_HEADER_TOKEN(token)).then(res => {
      SAVE_STORES(res.data.response.store);
      SAVE_STORES_PARTNER(res.data.response.partner);
      SetLoarder(true);
    }).catch(err => {
      console.warn(err, "ERROR AL OBTENER LAS STORES");
    });
  }

  async function loadInterval(res) {
    if (res) {
      let TOKEN_INVITADO = await GET_TOKEN_INVITADO();
      if (route.params != null && route.params.TOKEN != null|| TOKEN_INVITADO === true){
        ResetNavigation("Invitado", {"TOKEN":route.params != null ? route.params.TOKEN : TOKEN_INVITADO}, navigation);
      }else{
        if (await GET_TOKEN_SESSION() != null) {
          const token_expo = await getTokenNotification();
          ResetNavigation("Inicio", {}, navigation);
        }else{
          navigation.navigate('Login');
        }
      }
    }
  }

  if (Loader === true){
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
  }else{
    <LoadingPage />
  }
};

export default Loading;