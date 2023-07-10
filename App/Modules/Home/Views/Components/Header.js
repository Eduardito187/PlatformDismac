import React, {useState} from 'react';
/** */
import { Text, View } from 'react-native';
import { Absolute_Left_5, Absolute_Right_5, Height_50_White, JUSTIFY_CONTENT, Margin_Top_5, RED_DIS, ROW_SECTION } from '../../../Login/Style/css';
import { IconButton } from 'react-native-paper';

const Header = (props) => {
    const [isHome, SetIsHome] = React.useState(props.showMenu == null ? false : true);
    const [StatusDrawer, SetStatusDrawer] = React.useState(props.showMenu == null ? false : props.showMenu);
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
        <View style={[Height_50_White, {borderTopLeftRadius: StatusDrawer ? 15 : 0, borderTopRightRadius: StatusDrawer ? 15 : 0}]}>
            <View style={[ROW_SECTION, Margin_Top_5,JUSTIFY_CONTENT]}>
                {Center}
            </View>
            <View style={Absolute_Left_5}>
                {
                    isHome && (<IconButton icon={StatusDrawer ? "menu-open" : "menu"} onPress={() => showDrawer()} iconColor={RED_DIS} size={24} />)
                }
                {
                    !isHome && (<IconButton icon={"arrow-left"} onPress={() => props.DrawerAction()} iconColor={RED_DIS} size={24} />)
                }
                
            </View>
            <View style={Absolute_Right_5}>
                {Right}
            </View>
        </View>
    );
};
export default Header;