import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { windowHeight, windowWidth } from '../../../../Helpers/GetMobil';
import { Chip,DataTable,Button, Badge } from 'react-native-paper';
import Modal from "react-native-modal";
import { modalContainerStyle,Background_Dismac,bordePlomo,modalInfo,Margin_5,Margin_Top_5, Color_White, Section_Max_Absolute, Flex_Section } from '../../../Login/Style/css';
/** */
import TwoColumn from './TwoColumn';

const CategoryModal = (props) => {
    const widthView = windowWidth-80;

    function ShowCategory(id){
        props.closeModal();
        props.navigation.push("ShowCategory", {"id_catalog":props.idCatalog,"id_category":id,"TOKEN":props.TOKEN,"onGoBack": onGoBackAction,"inheritance": null});
    }

    function onGoBackAction(){
    }

    if (props.category == null) {
        return(null);
    }else{
        return(
            <>
                <Modal isVisible={props.isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Section_Max_Absolute} onPress={() => props.closeModal()}>
                    <View style={Flex_Section} /></TouchableWithoutFeedback>} onSwipeComplete={() => props.closeModal()}>
                    <View style={[modalContainerStyle]}>
                        <View style={[modalInfo,bordePlomo]}>
                            <TwoColumn width={widthView} column1={widthView*.65} column2={widthView*.35} label1={'Nombre de categoría'} label2={props.category.name} />
                            <TwoColumn width={widthView} column1={widthView*.65} column2={widthView*.35} label1={'Código de categoría'} label2={props.category.code} />
                            <TwoColumn width={widthView} column1={widthView*.65} column2={widthView*.35} label1={'Estado'} label2={props.category.status == 1 ? "Activado" : "Desactivado"} />
                            <TwoColumn width={widthView} column1={widthView*.80} column2={widthView*.20} label1={'Cantidad de productos'} label2={props.category.products} />
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Ciudad</DataTable.Title>
                                    <DataTable.Title numeric>Cantidad de productos</DataTable.Title>
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
                            <Button mode="contained" style={[Background_Dismac, Margin_Top_5]} onPress={() => ShowCategory(props.category.id)}>
                                Ver mas
                            </Button>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
};
export default CategoryModal;