import React, {useState} from 'react';
/** */
import { View, ActivityIndicator } from 'react-native';
import { JUSTIFY_CONTENT, Margin_Top_5, RED_DIS, ROW_SECTION } from '../Modules/Login/Style/css';

const LoadItem = (props) => {
    React.useEffect(() => {
        //
    }, []);
    
    return (
        <View style={[ROW_SECTION, Margin_Top_5,JUSTIFY_CONTENT]}>
            <ActivityIndicator color={RED_DIS} />
        </View>
    );
};
export default LoadItem;