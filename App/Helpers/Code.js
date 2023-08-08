import { URL_API,GET_HEADERS,CREATE_BODY_VERIFICATE,GENERATE_CODE,CREATE_BODY_STATUS_ACCOUNT, GET_HEADER_ACCOUNT, GET_HEADER_TOKEN, SAVE_TOKEN_MOBILE } from './API';
import axios from "axios";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';

export const LISTA = "list";
export const MOSAICO = "mosaico";

export function emitSocket(socket, channel, value) {
    socket.emit(channel, value);
}
export function setDataForm(form, param, value){
    form.append(param, value);
    return form;
}
export async function GenerateCode(email, type, bool, ShowAlertMessage) {
    let difference = 99999 - 10000; 
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + 10000;
    setCodeEmail(email, rand, type, ShowAlertMessage, bool);
    return await GENERATE_CODE(rand);
}
export function setCodeEmail(email, code, type, ShowAlertMessage, bool) {
    axios.post(URL_API("sendcode"),CREATE_BODY_VERIFICATE(email, code, type, bool),GET_HEADERS()).then(res => {
        if (res.data.status != null) {
            if (res.data.status == false) {
                ShowAlertMessage("Este correo ya se encuentra en uso.");
            }
        }else{
            ShowAlertMessage("Error en el envio del codigo.");
        }
    }).catch(err => {
        //
    });
}
export function disableAccount(type, value) {
    axios.post(URL_API("partner/account/disable"),CREATE_BODY_STATUS_ACCOUNT(type, value),GET_HEADER_ACCOUNT()).then(res => {
        if (res.data.response != null) {
            if (res.data.response == false) {
                alert(res.data.responseText);
            }
        }else{
            alert("Error interno.");
        }
    }).catch(err => {
        alert(err);
    });
}
export function enableAccount(type, value) {
    axios.post(URL_API("partner/account/enable"),CREATE_BODY_STATUS_ACCOUNT(type, value),GET_HEADER_ACCOUNT()).then(res => {
        if (res.data.response != null) {
            if (res.data.response == false) {
                alert(res.data.responseText);
            }
        }else{
            alert("Error interno.");
        }
    }).catch(err => {
        alert(err);
    });
}
export function itemsListProductsWidth(width){
    if (width <= 550) {
        return ((width - 20) / 2);
    }else if (width <= 850) {
        return ((width - 30) / 3);
    }else {
        return ((width - 40) / 4);
    }
}
export async function getTokenNotification(TOKEN) {
    let token = "";
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getDevicePushTokenAsync() ?? await Notifications.getExpoPushTokenAsync()).data;
    }
    return token;
}
export async function settingToken(TOKEN, tokenMobil){
    axios.post(URL_API("currentAccount/registerToken"),{"token":tokenMobil},GET_HEADER_TOKEN(TOKEN));
    await SAVE_TOKEN_MOBILE(TOKEN);
}
export async function getLocalization(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        return "";
    }
    let location = await Location.getCurrentPositionAsync({});
    return location;
}