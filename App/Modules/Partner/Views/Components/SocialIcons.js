import React, {useState} from 'react';
import { View } from 'react-native';
import { displayFlex } from '../../../Catalog/Style/Two';
import IconSocial from '../../../Home/Helper/IconSocial';
import { generateCustomId } from '../../../../Helpers/API';
/** */

const SocialIcons = (props) => {
    const [Items, SetItems] = React.useState(props.items);
    const [Components, SetComponents] = React.useState(null);

    React.useEffect(() => {
        loadingDate();
    }, []);

    function loadingDate(){
        let components = [];
        if (Items.length > 0){
            for (let j = 0; j < Items.length; j++) {
                components.push(<IconSocial key={generateCustomId()} icon={Items[j]["social"]["name"]} size={24} />);
            }
        }
        SetComponents(components);
    }

    return(
        <View style={[displayFlex]}>
            {Components}
        </View>
    );
};
export default SocialIcons;