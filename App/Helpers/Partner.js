import { URL_API,GET_HEADERS,CREATE_BODY_CITY } from './API';
import axios from "axios";
export async function RegisterPartner(Body,EndAction) {
    axios.post(URL_API("partner"),Body,GET_HEADERS()).then(res => {
        if(res.data != null){
            EndAction(res.data.response, res.data.responseText);
        }else{
            EndAction(false, "Algo salio mal.");
        }
    }).catch(err => {
        EndAction(false, err);
    });
}