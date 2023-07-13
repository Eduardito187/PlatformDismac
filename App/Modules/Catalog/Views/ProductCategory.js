import React, {useState} from 'react';
import { Text, View } from 'react-native';

/** Components */
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import Product from './Product';
/** */

const ProductCategory = ({route, navigation }) => {
    const {SOCKET,TOKEN,ID_CATEGORY} = route.params;
    const [heightBar, SetHeightBar] = React.useState(getStatusBarHeight());
    const [LOADING, SETLOADING] = React.useState(false);

    React.useEffect(() => {
        SETLOADING(true);
    }, []);
    
    function backAccount(a) {
        navigation.goBack();
    }

    if (LOADING == false){
        return (<LoadingPage />);
    }else{
        return (
            <View style={[{marginTop: heightBar}]}>
                <Product navigation={navigation} id_category={ID_CATEGORY} socket={SOCKET} TOKEN={TOKEN} DrawerAction={(a) => backAccount(a)} showMenu={null} />
            </View>
        );
    }
};

export default ProductCategory;