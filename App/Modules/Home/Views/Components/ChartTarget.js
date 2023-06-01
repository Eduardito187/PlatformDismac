import React, {useState} from 'react';
import { ScrollView, Text, View, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {LineChart,BarChart,PieChart,ProgressChart,ContributionGraph,StackedBarChart} from "react-native-chart-kit";
import { CARD_CATEGORY, CONTENT_GRADIENT, DESGRADE_ARRAY, DESGRADE_CONTENT_CATEGORY, IMAGE_MAX, NAME_TEXT, RADIUS_PICTURE_IMAGE, RED_DIS, TITLE_SECTION, WHITE } from '../../../Login/Style/css';
import { CONTENT_SECTION, SECTION_CONTENT } from '../../../Login/Style/style';
/** */

const data = [
    {
      name: "SCZ",
      population: 45690,
      color: "#9AB643",
      legendFontColor: WHITE,
      legendFontSize: 12
    },
    {
      name: "CBB",
      population: 22365,
      color: "#C37221",
      legendFontColor: WHITE,
      legendFontSize: 12
    },
    {
      name: "LPZ",
      population: 24560,
      color: "#1AB4E5",
      legendFontColor: WHITE,
      legendFontSize: 12
    },
    {
      name: "SCR",
      population: 1300,
      color: "#8D381C",
      legendFontColor: WHITE,
      legendFontSize: 12
    },
    {
      name: "TRJ",
      population: 1000,
      color: "#7D29D1",
      legendFontColor: WHITE,
      legendFontSize: 12
    }
];
  
const ChartTarget = (props) => {
    const [Navigation, SetNavigation] = React.useState(props.navigation);
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN)

    React.useEffect(() => {
        //
    }, []);
    
    return(
        <View style={{padding: 5}}>
            <BarChart
                data={{labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
                datasets: [
                  {
                    data: [20, 45, 28, 80]
                  }
                ]}} yAxisLabel="BS " yAxisSuffix="k"
                width={props.width}
                height={props.height}
                chartConfig={{backgroundColor: WHITE,backgroundGradientFrom: RED_DIS,backgroundGradientTo: "#EA4B4D",decimalPlaces: 1,color: (opacity = 1) => WHITE,labelColor: (opacity = 1) => WHITE,}} style={{marginVertical: 8,borderRadius: 5}}
            />
        </View>
    );
};
export default ChartTarget;