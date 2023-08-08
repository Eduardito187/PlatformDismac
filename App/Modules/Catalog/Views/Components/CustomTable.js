import * as React from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Margin_Top_5, ROW_SECTION } from '../../../Login/Style/css';
import { generateCustomId } from '../../../../Helpers/API';

const CustomTable = (props) => {
    React.useEffect(() => {
        //
    }, []);

    function selectedRow(row) {
        //
    }

    return (
        <View style={[ROW_SECTION, Margin_Top_5]}>
            <DataTable>
                <DataTable.Header>
                    {
                        props.header.map((row) => {
                            return (
                                <DataTable.Title key={generateCustomId()}>{row}</DataTable.Title>
                            )
                        })
                    }
                </DataTable.Header>
                {
                    props.body.map((row) => {
                        return (
                            <DataTable.Row key={generateCustomId()} onPress={() => selectedRow(row)}>
                                {
                                    row.map((item) => {
                                        return (<DataTable.Cell key={generateCustomId()}>{item}</DataTable.Cell>);
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