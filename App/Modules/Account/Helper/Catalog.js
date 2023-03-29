import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { windowWidth } from '../../../Helpers/GetMobil';
/** */

const Catalog = (props) => {
    const navigation = useNavigation();
    const [catalog, SetCatalog] = React.useState(null);
    const [key, SetKey] = React.useState(Math.random()+'_Catalog_'+Math.random());
    const [load, SetKeyLoad] = React.useState(Math.random()+'_Load_'+Math.random());
    React.useEffect(() => {
        setLoader(null);
    }, []);
    function setLoader(val = null) {
        setTimeout(() => {
            SetCatalog(val == null ? props.Catalog : val);
        }, 500)
    }
    function selectCatalog(catalog) {
        navigation.navigate("ShowCatalog", {"Catalog":catalog, "TOKEN":props.TOKEN});
    }
    if (catalog == null) {
        return(<ActivityIndicator key={load} size="large" color="#EC2427" />);
    }else{
        return(
            <TouchableOpacity onPress={() => selectCatalog(catalog)} key={key} style={{width: windowWidth-10, borderRadius: 5, backgroundColor: "#FFFFFF", marginTop: 10, marginBottom: 5, padding: 10}}>
                <View style={{width: (windowWidth-10)}}>
                    <Text style={{fontWeight: "bold", fontSize: 27, color: "#808080"}}>{catalog.name}</Text>
                    <Text style={{fontWeight: "bold", fontSize: 14.5, color: "#808080"}}>{catalog.code}</Text>
                </View>
            </TouchableOpacity>
        );
    }
};
export default Catalog;