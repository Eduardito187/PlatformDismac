import { URL_API,GET_HEADERS,CREATE_BODY_VERIFICATE,GENERATE_CODE } from './API';
import axios from "axios";

export function GenerateCode(email) {
    let difference = 99999 - 10000; 
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + 10000;
    setCodeEmail(email, rand);
    return GENERATE_CODE(rand);
}
export function setCodeEmail(email, code) {
    axios.post(URL_API("verificate"),CREATE_BODY_VERIFICATE(email, code),GET_HEADERS()).then(res => {
        if (res.data != null) {
            //
        }
    }).catch(err => {
        //
    });
}