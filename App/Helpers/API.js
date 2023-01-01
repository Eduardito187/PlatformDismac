import { URL_HOSTING,EXTEND_API,TOKEN_API } from "../../Config";
export function URL_API(Controller) {
    return URL_HOSTING+EXTEND_API+Controller;
}
export function GET_TOKEN() {
    return TOKEN_API;
}
export const METHOD_POST = "POST";