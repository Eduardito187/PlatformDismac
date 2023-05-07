import React, {useState} from 'react';
/** */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { RED_DIS } from '../../Login/Style/css';

const IconSocial = (props) => {
    const [Icon, SetIcon] = React.useState(null);
    React.useEffect(() => {
        getIconByName(props.icon);
    }, []);

    function getIconByName(name) {
        switch (name) {
            case "Facebook":
                SetIcon("facebook");
                break;
            case "Instagram":
                SetIcon("instagram");
                break;
            case "Twitter":
                SetIcon("twitter");
                break;
            case "Linkedin":
                SetIcon("linkedin");
                break;
            case "You Tube":
                SetIcon("youtube");
                break;
            case "Whatsapp":
                SetIcon("whatsapp");
                break;
            case "Twitch":
                SetIcon("twitch");
                break;
        }
    }
    
    if (Icon == null) {
        return (<ActivityIndicator color={RED_DIS} />);
    }else{
        return (<MaterialCommunityIcons name={Icon} size={props.size} color={RED_DIS} />);
    }
};
export default IconSocial;