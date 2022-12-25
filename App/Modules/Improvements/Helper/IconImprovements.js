import React, {useState} from 'react';
/** */
import { MaterialIcons } from '@expo/vector-icons'; 
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const IconImprovements = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<MaterialIcons name="markunread" size={props.size} color={NavBars.focus} />);
    }else{
        return (<MaterialIcons name="markunread-mailbox" size={props.size} color={NavBars.nofocus} />);
    }
};
export default IconImprovements;