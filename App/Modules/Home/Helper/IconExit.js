import React, {useState} from 'react';
/** */
import { Ionicons } from '@expo/vector-icons';
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const IconExit = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<Ionicons name="exit-outline" size={props.size} color={NavBars.focus} />);
    }else{
        return (<Ionicons name="exit" size={props.size} color={NavBars.nofocus} />);
    }
};
export default IconExit;