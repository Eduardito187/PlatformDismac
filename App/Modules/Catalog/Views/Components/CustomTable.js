import * as React from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Margin_Top_5, ROW_SECTION } from '../../../Login/Style/css';

const CustomTable = (props) => {
    React.useEffect(() => {
        //
    }, []);

    function selectedRow(row) {
        console.log(row);
    }

    return (
        <View style={[ROW_SECTION, Margin_Top_5]}>
            <DataTable>
                <DataTable.Header>
                    {
                        props.header.map((row) => {
                            return (
                                <DataTable.Title key={Math.random()+'_ROW_'+props.key+'_ROW_'+Math.random()}>{row}</DataTable.Title>
                            )
                        })
                    }
                </DataTable.Header>
                {
                    props.body.map((row) => {
                        return (
                            <DataTable.Row key={Math.random()+'_COLUMN_'+props.key+'_ROW_'+Math.random()} onPress={() => selectedRow(row)}>
                                {
                                    row.map((item) => {
                                        return (<DataTable.Cell key={Math.random()+'_COLUMN_'+props.key+'_COLUMN_'+Math.random()}>{item}</DataTable.Cell>);
                                    })
                                }
                            </DataTable.Row>
                        )
                    })
                }
            </DataTable>
        </View>
    );
}

export default CustomTable;