import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_HOSTING,EXTEND_API,TOKEN_API,EXTEND_API_SHOW } from "../../Config";
export function URL_API(Controller) {
    return URL_HOSTING+EXTEND_API+Controller;
}
export function URL_API_POS(Controller, ID) {
    return URL_HOSTING+EXTEND_API+Controller+ID;
}
export function URL_API_SHOW(Controller, ID) {
    return URL_HOSTING+EXTEND_API+Controller+EXTEND_API_SHOW+ID;
}
export function URL_API_GET(Controller) {
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
export function GET_HEADER_TOKEN(token) {
    return {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "text/json"
        }
    };
}
export async function GET_HEADER_ACCOUNT() {
    return {
        headers: {
            "Authorization": `Bearer ${await GET_TOKEN_SESSION()}`,
            "Content-Type": "text/json"
        }
    };
}
export function CREATE_BODY_SALE_QUERY(query, status, date){
    return {
        "query":query,
        "status":status,
        "filters": {
            "date_ini":date.firstDate,
            "date_end":date.secondDate
        }
    };
}
export function CREATE_BODY_SET_CATALOG(name, code) {
    return {
        "name" : name,
        "code" : code
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
export function CREATE_BODY_SEARCH_ACCOUN(search) {
    return {
        "query" : search
    };
}
export function CREATE_BODY_STATUS_ACCOUNT(type, value) {
    return {
        "type" : type,
        "value" : value
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
export function CREATE_BODY_VERIFICATE(email, code, type, status) {
    return {
        "email" : email,
        "code" : code,
        "type" : type,
        "restore" : status ? "Si" : "No"
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
export async function GENERATE_CODE_EMAIL(EMAIL) {
    try {
        await AsyncStorage.setItem(
          '@EMAIL',
          EMAIL.toString()
        );
        return true;
    } catch (error) {
        return false;
    }
}
export async function GET_CODE_GENERATE_EMAIL() {
    try {
        const value = await AsyncStorage.getItem('@EMAIL');
        if (value !== null) {
            return value;
        }else{
            return null;
        }
    } catch (error) {
        return null;
    }
}
export async function SAVE_STORES(STORES) {
    try {
        await AsyncStorage.setItem(
          '@STORES',
          JSON.stringify(STORES)
        );
        for (let index = 0; index < STORES.length; index++) {
            STORES[index]["check"] = false;
        }
        SAVE_STORES_CHECK(STORES);
        return true;
    } catch (error) {
        return false;
    }
}
export async function GET_STORES() {
    try {
        const value = await AsyncStorage.getItem('@STORES');
        if (value !== null) {
            return JSON.parse(value);
        }else{
            return [];
        }
    } catch (error) {
        return [];
    }
}
export async function SAVE_STORES_CHECK(STORES) {
    try {
        await AsyncStorage.setItem(
          '@STORES_CHECK',
          JSON.stringify(STORES)
        );
        return true;
    } catch (error) {
        return false;
    }
}
export async function GET_STORES_CHECK() {
    try {
        const value = await AsyncStorage.getItem('@STORES_CHECK');
        if (value !== null) {
            return JSON.parse(value);
        }else{
            return [];
        }
    } catch (error) {
        return [];
    }
}
export async function SAVE_CURRENT_SESSION(SESSION) {
    try {
        await AsyncStorage.setItem(
          '@CURRENT_SESSION',
          JSON.stringify(SESSION)
        );
        return true;
    } catch (error) {
        return false;
    }
}
export async function GET_CURRENT_SESSION() {
    try {
        const value = await AsyncStorage.getItem('@CURRENT_SESSION');
        if (value !== null) {
            return JSON.parse(value);
        }else{
            return null;
        }
    } catch (error) {
        return null;
    }
}
export async function SAVE_VIEW_PRODUCTS(value) {
    try {
        await AsyncStorage.setItem(
          '@VIEW_PRODUCTS', value
        );
        return true;
    } catch (error) {
        return false;
    }
}
export async function GET_VIEW_PRODUCTS() {
    try {
        const value = await AsyncStorage.getItem('@VIEW_PRODUCTS');
        if (value == null) {
            return "list";
        }
        return value;
    } catch (error) {
        return "list";
    }
}
export async function GET_FILTER_SALE_DATE() {
    try {
        const value = await AsyncStorage.getItem('@FILTER_SALE_DATE');
        if (value == null) {
            return {"firstDate": "", "secondDate": ""};
        }
        else {
            return JSON.parse(value);
        }
    } catch (error) {
        return {"firstDate": "", "secondDate": ""};
    }
}
export async function SAVE_FILTER_SALE_DATE(value) {
    try {
        await AsyncStorage.setItem(
          '@FILTER_SALE_DATE', JSON.stringify(value)
        );
        return true;
    } catch (error) {
        return false;
    }
}