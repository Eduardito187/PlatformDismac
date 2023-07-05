import React, {useState} from 'react';
import { Image } from 'react-native';
import { ARROW_RIGHT, CONTENT_DIRECTION, CONTENT_DIRECTION_BODY, CONTENT_ICON_LOCATE, LOCATE, PICTURE_PARTNER } from '../../../Login/Style/css';
import { View, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
/** */

const PartnerLink = (props) => {
    const [Partner, SetPartner] = React.useState(props.Partner);

    React.useEffect(() => {
        //
    }, []);

    if (Partner != null) {
        return(
            <View key={Math.random()+'_Partner_'+Math.random()} style={CONTENT_DIRECTION_BODY}>
                <View key={Math.random()+'_Content_'+Math.random()} style={CONTENT_DIRECTION}>
                    <View  key={Math.random()+'_Partner_Picture_Content_'+Math.random()} style={CONTENT_ICON_LOCATE}>
                        <Image key={Math.random()+'_Partner_Picture_'+Math.random()} source={{uri: Partner.url}} style={PICTURE_PARTNER} />
                    </View>
                    <Text key={Math.random()+'_Partner_Name_'+Math.random()} style={LOCATE}> {Partner.name}</Text>
                </View>
                <Entypo key={Math.random()+'_Partner_Link_'+Math.random()} name="chevron-right" style={ARROW_RIGHT}/>
            </View>
        );
    }else{
        return(null);
    }
};
export default PartnerLink;