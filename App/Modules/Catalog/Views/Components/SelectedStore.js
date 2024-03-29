import React, {useState} from 'react';
import { View } from 'react-native';
import { Chip, Checkbox } from 'react-native-paper';
import { RED_DIS } from '../../../Login/Style/css';
import { GET_STORES_CHECK, generateCustomId } from '../../../../Helpers/API';
/** */

const SelectedStore = (props) => {
    const [CurrentStore, SetCurrentStore] = React.useState(props.CurrentStore != null ? props.CurrentStore : null);
    const [Type, SetType] = React.useState(props.Type != null ? "name" : "id");
    const [STORES, SETSTORES] = React.useState([]);

    React.useEffect(() => {
        GetStores(props.value);
    }, []);

    function clearOptions(){
        let stores = STORES.map((store) => {
            store.check = false;
            return store;
        });
        SETSTORES(stores);
    }

    function gestionStore(id) {
        if (Type == "name"){
            clearOptions();
        }
        let stores = STORES.map((store) => {
            if (id === store.id) {
                store.check = !store.check;
            }
            return store;
        });
        SETSTORES(stores);
        emitStores(stores);
    }

    function emitStores(stores){
        let Stores = [];
        for (let index = 0; index < stores.length; index++) {
            if (stores[index]["check"]) {
                Stores.push(stores[index][Type]);
            }
        }
        props.Action(Stores);
    }

    function ifExistStore(value, id){
        for (let index = 0; index < value.length; index++) {
            if (value[index]["id"] == id) {
                if (value[index]["products"] > 0) {
                    return true;
                }else{
                    return false;
                }
            }
        }
        return false;
    }

    async function GetStores(value){
        let store_array = await GET_STORES_CHECK();
        let stores = store_array.map((store) => {
            if (Type == "id"){
                store.check = ifExistStore(value, store.id);
            }
            if (Type == "name" && CurrentStore != null){
                store.check = verifyNameStore(store.name);
            }
            return store;
        });
        SETSTORES(stores);
    }

    function verifyNameStore(name){
        if (CurrentStore == name){
            return true;
        }
        return false;
    }

    return(
        <View>
            {
                STORES.map((item) => {
                    return (
                        <Checkbox.Item 
                            key={generateCustomId()} label={item.name} color={RED_DIS} 
                            status={item.check ? 'checked' : 'unchecked'} disabled={props.disabled} onPress={() => gestionStore(item.id)} 
                        />
                    )
                })
            }
        </View>
    );
};
export default SelectedStore;