import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { windowHeight, windowWidth } from '../../../../Helpers/GetMobil';
import { Chip,DataTable,Button, Badge } from 'react-native-paper';
import Modal from "react-native-modal";
import { modalContainerStyle,Background_Dismac,bordePlomo,modalInfo,Margin_5,Margin_Top_5, Color_White } from '../../../Login/Style/css';
/** */
import TwoColumn from './TwoColumn';

const CategoryModal = (props) => {
    const widthView = windowWidth-80;
    return(
        <>
            <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={{position: 'absolute', left:0,right: 0,top: 0, bottom:0}} onPress={() => props.closeModal()}>
                <View style={{ flex: 1,backgroundColor: 'rgba(0,0,0,.5)'}} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                <View style={[modalContainerStyle]}>
                    <View style={[modalInfo,bordePlomo]}>
                        <TwoColumn width={widthView} column1={widthView*.65} column2={widthView*.35} label1={'Categoría'} label2={props.category.name} />
                        <TwoColumn width={widthView} column1={widthView*.65} column2={widthView*.35} label1={'Código'} label2={props.category.code} />
                        <TwoColumn width={widthView} column1={widthView*.65} column2={widthView*.35} label1={'Estado'} label2={props.category.status == 1 ? "Activado" : "Desactivado"} />
                        <TwoColumn width={widthView} column1={widthView*.65} column2={widthView*.35} label1={'Productos'} label2={props.category.products} />
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Ciudad</DataTable.Title>
                                <DataTable.Title numeric>Productos</DataTable.Title>
                            </DataTable.Header>
                            {
                                props.category.stores.map((store) => {
                                    return (
                                        <DataTable.Row key={Math.random()+'_Store_'+Math.random()}>
                                            <DataTable.Cell>{store.name}</DataTable.Cell>
                                            <DataTable.Cell numeric>{store.products}</DataTable.Cell>
                                        </DataTable.Row>
                                    )
                                })
                            }
                        </DataTable>
                        <Button mode="contained" style={[Background_Dismac, Margin_Top_5]} onPress={() => console.log('Pressed')}>
                            Ver mas
                        </Button>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default CategoryModal;