import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { windowWidth } from '../../../Helpers/GetMobil';
import { Size_14, Size_27, Top_Custom_Css } from '../../Login/Style/style';
import { generateCustomId } from '../../../Helpers/API';
/** */

const Catalog = (props) => {
    const navigation = useNavigation();
    const [catalog, SetCatalog] = React.useState(null);
    const [key, SetKey] = React.useState(generateCustomId());
    const [load, SetKeyLoad] = React.useState(generateCustomId());

    React.useEffect(() => {
        setLoader(null);
    }, []);

    function setLoader(val = null) {
        setTimeout(() => {
            SetCatalog(val == null ? props.Catalog : val);
        }, 500)
    }

    function selectCatalog(catalog) {
        if (props.type == "SelectedCategory"){
            props.route.params.onGoBack(true, catalog.id);
            props.navigation.goBack();
        }
        if (props.type == "catalog"){
            navigation.navigate("ShowCatalog", {"Catalog":catalog, "TOKEN":props.TOKEN, "roles":props.roles});
        }
        if (props.type == "category"){
            navigation.navigate("ShowCategory", {"id_catalog": 0,"id_category": catalog.id,"TOKEN": props.TOKEN,"roles":props.roles, inheritance: null});
        }
        if (props.type == "coupon"){
            navigation.navigate("ShowCategory", {"id_catalog": 0,"id_category": catalog.id,"TOKEN": props.TOKEN,"roles":props.roles, inheritance: null});
        }
    }
    
    if (catalog == null) {
        return(<ActivityIndicator key={load} size="large" color="#EC2427" />);
    }else{
        return(
            <TouchableOpacity onPress={() => selectCatalog(catalog)} key={key} style={[{width: windowWidth-10}, Top_Custom_Css]}>
                <View style={[{width: (windowWidth-10)}]}>
                    <Text style={Size_27}>{catalog.name}</Text>
                    {
                        props.type == "coupon"
                        ? <Text style={Size_14}>{catalog.coupon_code}</Text>
                        : <Text style={Size_14}>{catalog.code}</Text>
                    }
                </View>
            </TouchableOpacity>
        );
    }
};
export default Catalog;