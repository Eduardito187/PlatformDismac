import React, { useState } from 'react';
import { View } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import { WHITE } from '../../../Login/Style/css';
import { P5, Style_Opacity } from '../../../Login/Style/style';
/** */

const ChartPie = (props) => {
  const [Data, SetData] = React.useState([]);

  React.useEffect(() => {
    const dataWithIds = props.data.map((item) => ({
      name: item.day,
      population: item.Total,
      color: getRandomHexColor(),
      legendFontColor: WHITE,
      legendFontSize: 12
    }));
    SetData(dataWithIds);
  }, []);

  function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <View style={P5}>
      <PieChart data={Data} width={props.width} height={props.height}
        chartConfig={{ color: (opacity = 1) => WHITE, labelColor: (opacity = 1) => WHITE }}
        accessor={"population"} backgroundColor={"rgba(0,0,0,0.5)"}
        center={[10, 10]} absolute style={Style_Opacity}
      />
    </View>
  );
};
export default ChartPie;