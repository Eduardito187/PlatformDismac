import React, {useState} from 'react';
import { View,Text } from 'react-native';
import { PageLoading } from './../../../Themes/Dismac/ThemeDismac';
/** */
import ImgDis from '../../../Components/ImgDis';

const SearchInit = (props) => {
    React.useEffect(() => {
        //
    }, []);
    return(
        <View style={{justifyContent: "center", alignItems: "center", padding: 10}}>
            <ImgDis style={PageLoading.img} animation={PageLoading.animation} />
            <Text>Digite para buscar.</Text>
        </View>
    );
};
export default SearchInit;