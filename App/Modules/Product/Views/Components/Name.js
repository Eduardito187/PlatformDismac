import React, {useState} from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PRODUCT_CONTENT_INFORMATION, PRODUCT_NAME_CONTENT, ICON_LINK } from '../../../Login/Style/css';
/** */

const Name = (props) => {
    
    React.useEffect(() => {
        //
    }, []);

    return(
        <View style={PRODUCT_CONTENT_INFORMATION}>
            <Text style={PRODUCT_NAME_CONTENT}>
                {props.name}
            </Text>
            <Ionicons name="link-outline" style={ICON_LINK} />
        </View>
    );
};
export default Name;