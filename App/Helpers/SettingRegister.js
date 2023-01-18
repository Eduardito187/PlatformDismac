import AsyncStorage from '@react-native-async-storage/async-storage';
export async function settingRegister(value, step) {
    let data;
    if (step == 1) {
        data = {
            "partner" : {
                "email" : value
            }
        };
    }else if(step == 2){
        data = {
            "partner" : {
                "name" : value[0],
                "domain" : value[1]
            }
        };
    }else if(step == 3){
        data = {
            "partner" : {
                "nit" :value[0],
                "razon_social" : value[1],
                "legal_representative" : value[2]
            }
        };
    }else if(step == 4){
        data = {
            "partner" : {
                "address" : {
                    "id_country" : value[0],
                    "id_city" : value[1],
                    "id_municipality" : value[2]
                }
            }
        };
    }else if(step == 5){
        data = {
            "partner" : {
                "address" : {
                    "address_extra" : {
                        "address" : value[0],
                        "extra" : value[1]
                    }
                }
            }
        };
    }else if(step == 6){
        data = {
            "account" : {
                "name" : value[0],
                "email" : value[1],
                "username" : value[2]
            }
        };
    }else if(step == 7){
        data = {
            "account" : {
                "password" : value
            }
        };
    }
    if (await GetRegister() == null) {
        await CreateRegister(data);
    }else{
        await MergeRegister(data);
    }
}
export async function GetRegister() {
    try {
        const value = await AsyncStorage.getItem('@REGISTER');
        if (value !== null) {
            return value;
        }else{
            return null;
        }
    } catch (error) {
        return null;
    }
}
async function CreateRegister(Data) {
    try {
        await AsyncStorage.setItem(
            '@REGISTER',
            JSON.stringify(Data)
        );
        return true;
    } catch (error) {
        return false;
    }
}
async function MergeRegister(Data) {
    try {
        await AsyncStorage.mergeItem(
            '@REGISTER',
            JSON.stringify(Data)
        );
        return true;
    } catch (error) {
        return false;
    }
}
export async function DELETE_REGISTER() {
    try {
        await AsyncStorage.removeItem('@REGISTER');
        return true;
    } catch (error) {
        return false;
    }
}