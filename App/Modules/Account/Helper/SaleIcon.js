import React, {useState} from 'react';
/** */
import { MaterialIcons } from '@expo/vector-icons'; 
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const SaleIcon = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<MaterialIcons name="money" size={props.size} color={NavBars.focus} />);
    }else{
        return (<MaterialIcons name="money" size={props.size} color={NavBars.nofocus} />);
    }
};
export default SaleIcon;