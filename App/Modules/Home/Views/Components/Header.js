import React, {useState} from 'react';
/** */
import { Text, View } from 'react-native';
import { CONTIANER_LOADING, RED_DIS } from '../../../Login/Style/css';
import { IconButton } from 'react-native-paper';

const Header = (props) => {
    const [StatusDrawer, SetStatusDrawer] = React.useState(props.showMenu);

    function showDrawer() {
        props.DrawerAction(StatusDrawer)
        SetStatusDrawer(!StatusDrawer);
    }

    React.useEffect(() => {
        //
    }, []);
    return(
        <View style={{width: "100%", height: 50, backgroundColor: "white", borderTopLeftRadius: StatusDrawer ? 15 : 0, borderTopRightRadius: StatusDrawer ? 15 : 0}}>
            <IconButton icon={StatusDrawer ? "menu-open" : "menu"} onPress={() => showDrawer()} iconColor={RED_DIS} size={24} />
        </View>
    );
};
export default Header;