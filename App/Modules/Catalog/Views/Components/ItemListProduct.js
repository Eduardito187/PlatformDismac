import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { displayFlex, column, label1, label2 } from '../../Style/Two';
/** */

const ListProducts = (props) => {
    return(
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Codigo de producto</DataTable.Title>
                <DataTable.Title numeric>Stock</DataTable.Title>
            </DataTable.Header>
            {
                props.Products.map((product) => {
                    return (
                        <DataTable.Row key={Math.random()+'_Store_'+Math.random()} onPress={() =>selectCategory(category)}>
                            <DataTable.Cell>{category.name}</DataTable.Cell>
                            <DataTable.Cell numeric>{category.code}</DataTable.Cell>
                        </DataTable.Row>
                    )
                })
            }
        </DataTable>
    );
};
export default ListProducts;