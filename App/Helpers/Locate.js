import { URL_API,GET_HEADERS,CREATE_BODY_CITY } from './API';
import axios from "axios";

export async function GetCountry() {
    axios.get(URL_API("country"),GET_HEADERS()).then(res => {
        return res.data;
    }).catch(err => {
        return [];
    });
}

export async function GetCity() {
    axios.get(URL_API("city"),GET_HEADERS()).then(res => {
        return res.data;
    }).catch(err => {
        return [];
    });
}

export async function GetMunicipality() {
    axios.post(URL_API("municipality"),CREATE_BODY_CITY(),GET_HEADERS()).then(res => {
        return res.data;
    }).catch(err => {
        return [];
    });
}