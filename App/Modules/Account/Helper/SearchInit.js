import React, {useState} from 'react';
import { View,Text } from 'react-native';
import { PageLoading } from './../../../Themes/Dismac/ThemeDismac';
/** */
import ImgDis from '../../../Components/ImgDis';
import { Section_Content_Center } from '../../Login/Style/css';

const SearchInit = (props) => {
    React.useEffect(() => {
        //
    }, []);
    return(
        <View style={Section_Content_Center}>
            <ImgDis style={PageLoading.img} animation={PageLoading.animation} />
            <Text>Digite para buscar.</Text>
        </View>
    );
};
export default SearchInit;