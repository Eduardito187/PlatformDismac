import React, { useState } from 'react';
import { View } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { RED_DIS, WHITE } from '../../../Login/Style/css';
import { P5, Style_Opacity } from '../../../Login/Style/style';
/** */

const ChartTarget = (props) => {
  const [Datas, SetDatas] = React.useState([]);
  const [Labels, SetLabels] = React.useState([]);

  React.useEffect(() => {
    let data = [];
    let label = [];
    for (let index = 0; index < props.data.length; index++) {
      data.push(props.data[index]["Total"] / 1000);
      label.push(props.data[index]["week"]);
    }
    SetLabels(label);
    SetDatas(data);
  }, []);

  return (
    <View style={P5}>
      <BarChart
        data={{
          labels: Labels,
          datasets: [
            {
              data: Datas
            }
          ]
        }} yAxisSuffix="k" width={props.width} height={props.height}
        chartConfig={{ backgroundColor: WHITE, backgroundGradientFrom: RED_DIS, backgroundGradientTo: "#EA4B4D", decimalPlaces: 1, color: (opacity = 1) => WHITE, labelColor: (opacity = 1) => WHITE, }} style={Style_Opacity}
      />
    </View>
  );
};
export default ChartTarget;