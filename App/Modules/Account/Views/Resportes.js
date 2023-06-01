import React from 'react';  
import { View, ScrollView } from 'react-native';
import {Page, SCREEN_ABSOLUTE_BODY, SCREEN_ABSOLUTE_HEADER, SCREEN_RELATIVE, SCROLL_STYLE} from "./../../../Themes/Dismac/ThemeDismac";
import axios from 'axios';
import { windowWidth } from '../../../Helpers/GetMobil';

/** Components */
import Header from '../../Home/Views/Components/Header';
import ChartSale from '../../Home/Views/Components/ChartSale';
import ChartStock from '../../Home/Views/Components/ChartStock';
import ChartTarget from '../../Home/Views/Components/ChartTarget';

const Reportes = ({route, navigation }) => {
    const [TOKEN, SetTOKEN] = React.useState(route.params.TOKEN);
    
    React.useEffect(() => {
        //
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10,paddingBottom: 20,paddingLeft: 5, paddingRight: 5}}>
            <ChartSale width={windowWidth-20} height={250} navigation={navigation} TOKEN={TOKEN} categorys={[]} />
            <ChartStock width={windowWidth-20} height={250} navigation={navigation} TOKEN={TOKEN} categorys={[]} />
            <ChartTarget width={windowWidth-20} height={250} navigation={navigation} TOKEN={TOKEN} categorys={[]} />
        </ScrollView>
    );
};

export default Reportes;