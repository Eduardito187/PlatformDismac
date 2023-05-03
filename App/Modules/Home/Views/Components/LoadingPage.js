import React, {useState} from 'react';
/** */
import { ActivityIndicator, View } from 'react-native';
import { CONTIANER_LOADING, RED_DIS } from '../../../Login/Style/css';

const LoadingPage = (props) => {
    React.useEffect(() => {
        //
    }, []);
    return(
        <View style={CONTIANER_LOADING}>
            <ActivityIndicator color={RED_DIS} />
        </View>
    );
};
export default LoadingPage;