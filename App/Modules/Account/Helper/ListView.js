import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
/** */
import CountResult from '../../../Components/Result/CountResult';
import Account from './Account';

const ListView = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.Account.length > 0) {
        return(
            <>
                <CountResult Count={props.Account.length} />
                {
                    props.Account.map((account) => {
                        return (
                            <Account Account={account} />
                        )
                    })
                }
            </>
        );
    }else{
        return(
            <View style={{width: windowWidth, height: windowWidth, justifyContent: "center", alignItems: "center", flex: 1}}>
                <Text style={{color: "#808080",fontWeight: "bold", fontSize: 24}}>Resultados encontrados</Text>
                <Text style={{color: "#EC2427",fontWeight: "bold", fontSize: 30}}>0</Text>
            </View>
        );
    }
};
export default ListView;