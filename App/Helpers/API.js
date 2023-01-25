import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_HOSTING,EXTEND_API,TOKEN_API } from "../../Config";
export function URL_API(Controller) {
    return URL_HOSTING+EXTEND_API+Controller;
}
export function GET_TOKEN() {
    return TOKEN_API;
}
export function GET_HEADERS() {
    return {
        headers: {
            "Authorization": `Bearer ${GET_TOKEN()}`,
            "Content-Type": "text/json"
        }
    };
}
export async function GET_HEADER_ACCOUNT() {
    console.log(GET_TOKEN_SESSION());
    return {
        headers: {
            "Authorization": `Bearer ${await GET_TOKEN_SESSION()}`,
            "Content-Type": "text/json"
        }
    };
}
export function CREATE_BODY_NEW_ACCOUNT(name, email, username, password) {
    return {
        "name" : name,
        "email" : email,
        "username" : username,
        "password" : password
    };
}
export function CREATE_BODY_LOGIN(username, password) {
    return {
        "username" : username,
        "password" : password
    };
}
export const NULLABLE = {};
export function CREATE_BODY_CITY(city) {
    return {
        "id_city" : city
    };
}
export function CREATE_BODY_VERIFICATE(email, code, type) {
    return {
        "email" : email,
        "code" : code,
        "type" : type
    };
}
export async function SET_TOKEN_SESSION(TOKEN) {
    try {
        await AsyncStorage.setItem(
          '@TOKEN_SESSION:key',
          TOKEN
        );
        return true;
    } catch (error) {
        return false;
    }
}
export async function GENERATE_CODE(CODE) {
    try {
        await AsyncStorage.setItem(
          '@CODE',
          CODE.toString()
        );
        return true;
    } catch (error) {
        return false;
    }
}
export async function GET_CODE_GENERATE() {
    try {
        const value = await AsyncStorage.getItem('@CODE');
        if (value !== null) {
            return value;
        }else{
            return null;
        }
    } catch (error) {
        return null;
    }
}
export async function GET_TOKEN_SESSION() {
    try {
        const value = await AsyncStorage.getItem('@TOKEN_SESSION:key');
        if (value !== null) {
            return value;
        }else{
            return null;
        }
    } catch (error) {
        return null;
    }
}
export async function DELETE_TOKEN_SESSION() {
    try {
        await AsyncStorage.removeItem('@TOKEN_SESSION:key');
        return true;
    } catch (error) {
        return false;
    }
}
export const METHOD_POST = "POST";