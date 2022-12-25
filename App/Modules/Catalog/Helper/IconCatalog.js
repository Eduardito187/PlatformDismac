import React, {useState} from 'react';
/** */
import { Foundation, Ionicons } from '@expo/vector-icons';
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const IconCatalog = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<Ionicons name="book-outline" size={props.size} color={NavBars.focus} />);
    }else{
        return (<Foundation name="book-bookmark" size={props.size} style={{marginLeft: 5}} color={NavBars.nofocus} />);
    }
};
export default IconCatalog;