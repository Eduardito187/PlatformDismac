import React, {useState} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { displayFlex, column, label1, label2 } from '../../Style/Two';
import { RED_DIS } from '../../../Login/Style/css';
import { DataTable } from 'react-native-paper';
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
                        <DataTable.Row key={Math.random()+'_PRODUCT_'+Math.random()} onPress={() => showInfoProduct(product)}>
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