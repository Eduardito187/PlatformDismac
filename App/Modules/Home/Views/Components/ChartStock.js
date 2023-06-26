import React, {useState} from 'react';
import { ScrollView, Text, View, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {LineChart,BarChart,PieChart,ProgressChart,ContributionGraph,StackedBarChart} from "react-native-chart-kit";
import { CARD_CATEGORY, CONTENT_GRADIENT, DESGRADE_ARRAY, DESGRADE_CONTENT_CATEGORY, IMAGE_MAX, NAME_TEXT, RADIUS_PICTURE_IMAGE, RED_DIS, TITLE_SECTION, WHITE } from '../../../Login/Style/css';
import { CONTENT_SECTION, P5, SECTION_CONTENT, Style_Opacity } from '../../../Login/Style/style';
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
  
const ChartStock = (props) => {
    const [Navigation, SetNavigation] = React.useState(props.navigation);
    const [TOKEN, SetTOKEN] = React.useState(props.TOKEN)

    React.useEffect(() => {
        //
    }, []);
    
    return(
        <View style={P5}>
            <PieChart
                data={data}
                width={props.width}
                height={props.height}
                chartConfig={{
                color: (opacity = 1) => WHITE,
                labelColor: (opacity = 1) => WHITE
                }}
                accessor={"population"}
                backgroundColor={"rgba(0,0,0,0.5)"}
                center={[10, 10]}
                absolute style={Style_Opacity}
            />
        </View>
    );
};
export default ChartStock;