import React, {useState} from 'react';
/** */
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const IconManagement = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<MaterialCommunityIcons name="account-child-circle" size={props.size} color={NavBars.focus} />);
    }else{
        return (<MaterialCommunityIcons name="account-child-outline" size={props.size} color={NavBars.nofocus} />);
    }
};
export default IconManagement;