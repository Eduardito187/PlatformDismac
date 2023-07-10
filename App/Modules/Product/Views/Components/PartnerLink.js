import React, {useState} from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ARROW_RIGHT, CONTENT_DIRECTION, CONTENT_DIRECTION_BODY, CONTENT_DIRECTION_BODY_NOW, CONTENT_DIRECTION_NOW, CONTENT_ICON_LOCATE, LOCATE, PICTURE_PARTNER } from '../../../Login/Style/css';
import { View, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import PartnerPopUp from './PartnerPopUp';
/** */

const PartnerLink = (props) => {
    const [Partner, SetPartner] = React.useState(props.Partner);
    const [isModalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        //
    }, []);

    function showModal() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    if (Partner != null) {
        return(
            <TouchableOpacity onPress={() => showModal()} key={Math.random()+'_Partner_'+Math.random()} style={[props.show != null ? CONTENT_DIRECTION_BODY_NOW : CONTENT_DIRECTION_BODY]}>
                <View key={Math.random()+'_Content_'+Math.random()} style={[props.show != null ? CONTENT_DIRECTION_NOW : CONTENT_DIRECTION]}>
                    <View  key={Math.random()+'_Partner_Picture_Content_'+Math.random()} style={CONTENT_ICON_LOCATE}>
                        <Image key={Math.random()+'_Partner_Picture_'+Math.random()} source={{uri: Partner.profile}} style={PICTURE_PARTNER} />
                    </View>
                    <Text key={Math.random()+'_Partner_Name_'+Math.random()} style={LOCATE}> {Partner.name}</Text>
                </View>
                <Entypo key={Math.random()+'_Partner_Link_'+Math.random()} name="chevron-right" style={ARROW_RIGHT}/>
                <PartnerPopUp closeModal={() => closeModal()} isModalVisible={isModalVisible} TOKEN={props.TOKEN} Partner={props.Partner} Socket={props.Socket} />
            </TouchableOpacity>
        );
    }else{
        return(null);
    }
};
export default PartnerLink;