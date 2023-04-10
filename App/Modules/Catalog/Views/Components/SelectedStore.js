import React, {useState} from 'react';
import { View } from 'react-native';
import { Chip, Checkbox } from 'react-native-paper';
import { RED_DIS } from '../../../Login/Style/css';
import { GET_STORES_CHECK } from '../../../../Helpers/API';
/** */

const SelectedStore = (props) => {
    const [STORES, SETSTORES] = React.useState([]);
    React.useEffect(() => {
        GetStores();
    }, []);
    function gestionStore(id) {
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
                Stores.push(stores[index]["id"]);
            }
        }
        props.Action(Stores);
    }
    async function GetStores(){
        SETSTORES(await GET_STORES_CHECK());
    }
    return(
        <View>
            {
                STORES.map((item) => {
                    return (
                        <Checkbox.Item 
                            key={Math.random()+'_STORE_'+Math.random()} label={item.name} color={RED_DIS} 
                            status={item.check ? 'checked' : 'unchecked'} onPress={() => gestionStore(item.id)} 
                        />
                    )
                })
            }
        </View>
    );
};
export default SelectedStore;