import React, {useState} from 'react';
/** */
import { Ionicons } from '@expo/vector-icons';
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const IconHome = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<Ionicons name="home-outline" size={props.size} color={NavBars.focus} />);
    }else{
        return (<Ionicons name="home" size={props.size} color={NavBars.nofocus} />);
    }
};
export default IconHome;