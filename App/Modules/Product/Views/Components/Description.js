import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Margin_Bottom_18, PRODUCT_DESCRIPTION, PRODUCT_DESCRIPTION_SHOW, VER_MAS_TEXT } from '../../../Login/Style/css';
/** */

const Description = (props) => {
    const [Ver, SetVer] = React.useState(false);
    
    React.useEffect(() => {
        //
    }, []);

    return(
        <View style={[Margin_Bottom_18]}>
            <Text style={Ver ? PRODUCT_DESCRIPTION_SHOW : PRODUCT_DESCRIPTION}>{props.description}</Text>
            <Text onPress={() => SetVer(!Ver)} style={[VER_MAS_TEXT]}>{Ver ? 'Ver menos...' : 'Ver mas...'}</Text>
        </View>
    );
};
export default Description;