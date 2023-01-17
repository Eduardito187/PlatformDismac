import { URL_API,GET_HEADERS,CREATE_BODY_VERIFICATE,GENERATE_CODE } from './API';
import axios from "axios";

export async function GenerateCode(email, type, ShowAlertMessage) {
    let difference = 99999 - 10000; 
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + 10000;
    setCodeEmail(email, rand, type, ShowAlertMessage);
    return await GENERATE_CODE(rand);
}
export function setCodeEmail(email, code, type, ShowAlertMessage) {
    console.log(email, code, type);
    axios.post(URL_API("sendcode"),CREATE_BODY_VERIFICATE(email, code, type),GET_HEADERS()).then(res => {
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