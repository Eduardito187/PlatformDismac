import React, {useState} from 'react';
/** */
import { Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const IconCategory = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<MaterialCommunityIcons name="folder-star" size={props.size} color={NavBars.focus} />);
    }else{
        return (<MaterialCommunityIcons name="folder-star-outline" size={props.size} color={NavBars.nofocus} />);
    }
};
export default IconCategory;