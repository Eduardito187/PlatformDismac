import React, {useState} from 'react';
/** */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const IconHome = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<MaterialCommunityIcons name="home-outline" size={props.size} color={NavBars.focus} />);
    }else{
        return (<MaterialCommunityIcons name="home" size={props.size} color={NavBars.nofocus} />);
    }
};
export default IconHome;