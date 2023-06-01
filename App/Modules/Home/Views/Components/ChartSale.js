  import React, {useState} from 'react';
import { ScrollView, Text, View, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {LineChart,BarChart,PieChart,ProgressChart,ContributionGraph,StackedBarChart} from "react-native-chart-kit";
import { CARD_CATEGORY, CONTENT_GRADIENT, DESGRADE_ARRAY, DESGRADE_CONTENT_CATEGORY, IMAGE_MAX, NAME_TEXT, RADIUS_PICTURE_IMAGE, RED_DIS, TITLE_SECTION, WHITE } from '../../../Login/Style/css';
import { CONTENT_SECTION, SECTION_CONTENT } from '../../../Login/Style/style';
/** */


const ChartSale = (props) => {
    const [Navigation, SetNavigation] = React.useState(props.navigation);
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN)

    React.useEffect(() => {
        //
    }, []);
    
    return(
        <View style={{padding: 5}}>
            <LineChart
                data={{
                labels: ["SCZ", "CBB", "LPZ", "SCR", "TRJ"],
                datasets: [{data: [128.47,70,90,20,10]}]
                }} width={props.width} height={props.height} yAxisLabel="BS " yAxisSuffix="k" yAxisInterval={2}
                chartConfig={{backgroundColor: WHITE,backgroundGradientFrom: RED_DIS,backgroundGradientTo: "#EA4B4D",decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {borderRadius: 10},
                propsForDots: {r: "4",strokeWidth: "2",stroke: WHITE}
                }} bezier style={{marginVertical: 8,borderRadius: 5}}
            />
        </View>
    );
};
export default ChartSale;