import React, {useState} from 'react';
/** */
import { MaterialIcons } from '@expo/vector-icons'; 
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const IconSupport = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<MaterialIcons name="contact-support" size={props.size} color={NavBars.focus} />);
    }else{
        return (<MaterialIcons name="support" size={props.size} color={NavBars.nofocus} />);
    }
};
export default IconSupport;