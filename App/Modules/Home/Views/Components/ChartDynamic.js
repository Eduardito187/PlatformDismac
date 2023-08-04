  import React, {useState} from 'react';
import { View } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { RED_DIS, WHITE } from '../../../Login/Style/css';
import { P5, Style_Opacity } from '../../../Login/Style/style';
/** */


const ChartDynamic = (props) => {
    const [Data, SetData] = React.useState([]);
    const defaultValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    React.useEffect(() => {
        let data = [];
        for (let index = 0; index < props.data.length; index++) {
            data.push(props.data[index]["Total"] / 1000);
        }
        SetData(data);
    }, []);
    
    return(
        <View style={P5}>
            <LineChart
                data={{
                labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
                datasets: [{data: Data.length > 0 ? Data : defaultValue}]
                }} width={props.width} height={props.height} yAxisSuffix="k" yAxisInterval={2}
                chartConfig={{backgroundColor: WHITE,backgroundGradientFrom: RED_DIS,backgroundGradientTo: "#EA4B4D",decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {borderRadius: 10},
                propsForDots: {r: "4",strokeWidth: "2",stroke: WHITE}
                }} bezier style={Style_Opacity}
            />
        </View>
    );
};
export default ChartDynamic;