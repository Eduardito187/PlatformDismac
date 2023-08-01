import React, {useState} from 'react';
/** */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavBars } from '../../../Themes/Dismac/ThemeDismac';

const IconCoupon = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.focus) {
        return (<MaterialCommunityIcons name="ticket-percent" size={props.size} color={NavBars.focus} />);
    }else{
        return (<MaterialCommunityIcons name="ticket-percent-outline" size={props.size} color={NavBars.nofocus} />);
    }
};
export default IconCoupon;