import React, {useState} from 'react';
/** */
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const IconExit = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<MaterialCommunityIcons name="exit-to-app" size={props.size} color={NavBars.focus} />);
    }else{
        return (<MaterialCommunityIcons name="exit-to-app" size={props.size} color={NavBars.nofocus} />);
    }
};
export default IconExit;