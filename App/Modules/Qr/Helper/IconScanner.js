import React, {useState} from 'react';
/** */
import { FontAwesome } from '@expo/vector-icons'; 
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const IconScanner = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<FontAwesome name="qrcode" size={props.size} color={NavBars.focus} />);
    }else{
        return (<FontAwesome name="qrcode" size={props.size} color={NavBars.nofocus} />);
    }
};
export default IconScanner;