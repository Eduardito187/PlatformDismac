import React, {useState} from 'react';
/** */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const IconUpload = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<MaterialCommunityIcons name="upload-outline" size={props.size} color={NavBars.focus} />);
    }else{
        return (<MaterialCommunityIcons name="upload" size={props.size} color={NavBars.nofocus} />);
    }
};
export default IconUpload;