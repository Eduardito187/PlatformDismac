import React, {useState} from 'react';
/** */
import { Text, View } from 'react-native';
import { CONTIANER_LOADING, JUSTIFY_CONTENT, Margin_Top_5, RED_DIS, ROW_SECTION } from '../../../Login/Style/css';
import { IconButton } from 'react-native-paper';

const Header = (props) => {
    const [StatusDrawer, SetStatusDrawer] = React.useState(props.showMenu);
    const [Center, SetCenter] = React.useState(props.center != null ? props.center : null);
    const [Right, SetRight] = React.useState(props.right != null ? props.right : null);

    function showDrawer() {
        props.DrawerAction(StatusDrawer)
        SetStatusDrawer(!StatusDrawer);
    }

    React.useEffect(() => {
        //
    }, []);
    return(
        <View style={{width: "100%", height: 50, backgroundColor: "white", borderTopLeftRadius: StatusDrawer ? 15 : 0, borderTopRightRadius: StatusDrawer ? 15 : 0}}>
            <View style={[ROW_SECTION, Margin_Top_5,JUSTIFY_CONTENT]}>
                {Center}
            </View>
            <View style={{position: "absolute", zIndex: 10, left: 5}}>
                <IconButton icon={StatusDrawer ? "menu-open" : "menu"} onPress={() => showDrawer()} iconColor={RED_DIS} size={24} />
            </View>
            <View style={{position: "absolute", zIndex: 10, right: 5}}>
                {Right}
            </View>
        </View>
    );
};
export default Header;