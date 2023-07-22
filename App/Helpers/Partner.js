import { URL_API,GET_HEADERS,CREATE_BODY_SEARCH_ACCOUNT,GET_HEADER_ACCOUNT } from './API';
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
export async function RestorePasswordAction(Body,EndAction) {
    axios.post(URL_API("partner/account/restore"),Body,GET_HEADERS()).then(res => {
        if(res.data != null){
            EndAction(res.data.response, res.data.responseText);
        }else{
            EndAction(false, "Algo salio mal.");
        }
    }).catch(err => {
        EndAction(false, err);
    });
}
export async function searchAccountAPI(Search,EndAction) {
    axios.post(URL_API("search/account"),CREATE_BODY_SEARCH_ACCOUNT(Search),GET_HEADER_ACCOUNT()).then(res => {
        if(res.data != null){
            EndAction(res.data.response, res.data.responseText);
        }else{
            EndAction(false, "Algo salio mal.");
        }
    }).catch(err => {
        EndAction(false, err);
    });
}