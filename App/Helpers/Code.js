import { URL_API,GET_HEADERS,CREATE_BODY_VERIFICATE,GENERATE_CODE,CREATE_BODY_STATUS_ACCOUNT, GET_HEADER_ACCOUNT } from './API';
import axios from "axios";

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
        console.log(err);
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