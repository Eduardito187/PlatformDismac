import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { windowWidth } from '../../../Helpers/GetMobil';
import { Size_14, Size_27, Top_Custom_Css } from '../../Login/Style/style';
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
        navigation.navigate("ShowCatalog", {"Catalog":catalog, "TOKEN":props.TOKEN, "roles":props.roles});
    }
    
    if (catalog == null) {
        return(<ActivityIndicator key={load} size="large" color="#EC2427" />);
    }else{
        return(
            <TouchableOpacity onPress={() => selectCatalog(catalog)} key={key} style={[{width: windowWidth-10}, Top_Custom_Css]}>
                <View style={[{width: (windowWidth-10)}]}>
                    <Text style={Size_27}>{catalog.name}</Text>
                    <Text style={Size_14}>{catalog.code}</Text>
                </View>
            </TouchableOpacity>
        );
    }
};
export default Catalog;