import React, {useState} from 'react';
import { DataTable } from 'react-native-paper';
import { generateCustomId } from '../../../../Helpers/API';
/** */

const ListProducts = (props) => {
    function showInfoProduct(product){

    }
    return(
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Codigo de producto</DataTable.Title>
                <DataTable.Title numeric>Stock</DataTable.Title>
            </DataTable.Header>
            {
                props.Products.map((product) => {
                    return (
                        <DataTable.Row key={generateCustomId()} onPress={() => showInfoProduct(product)}>
                            <DataTable.Cell>{product.sku}</DataTable.Cell>
                            <DataTable.Cell numeric>{product.stock}</DataTable.Cell>
                        </DataTable.Row>
                    )
                })
            }
        </DataTable>
    );
};
export default ListProducts;