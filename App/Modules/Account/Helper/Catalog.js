import React, {useState} from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { windowWidth } from '../../../Helpers/GetMobil';
/** */

const Catalog = (props) => {
    const [catalog, SetCatalog] = React.useState(null);
    React.useEffect(() => {
        setLoader(null);
    }, []);
    function setLoader(val = null) {
        setTimeout(() => {
            SetCatalog(val == null ? props.Catalog : val);
        }, 500)
    }
    function selectCatalog() {
        
    }
    if (catalog == null) {
        return(<ActivityIndicator size="large" color="#EC2427" />);
    }else{
        return(
            <TouchableOpacity onPress={() => selectCatalog()} key={catalog.id.toString()+"_catalog"} style={{width: windowWidth-10, borderRadius: 5, backgroundColor: "#FFFFFF", marginTop: 10, marginBottom: 5, padding: 10}}>
                <View style={{width: (windowWidth-10)}}>
                    <Text style={{fontWeight: "bold", fontSize: 27, color: "#808080"}}>{catalog.name}</Text>
                    <Text style={{fontWeight: "bold", fontSize: 14.5, color: "#808080"}}>{catalog.code}</Text>
                </View>
            </TouchableOpacity>
        );
    }
};
export default Catalog;