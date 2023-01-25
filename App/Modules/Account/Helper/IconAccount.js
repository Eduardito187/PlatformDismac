import React, {useState} from 'react';
/** */
import { MaterialIcons } from '@expo/vector-icons'; 
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const IconAccount = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<MaterialIcons name="account-circle" size={props.size} color={NavBars.focus} />);
    }else{
        return (<MaterialIcons name="account-box" size={props.size} color={NavBars.nofocus} />);
    }
};
export default IconAccount;