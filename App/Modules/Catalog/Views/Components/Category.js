import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { windowHeight, windowWidth } from '../../../../Helpers/GetMobil';
import { Chip,DataTable,Button, Badge } from 'react-native-paper';
import Modal from "react-native-modal";
import { modalContainerStyle,Background_Dismac,bordePlomo,modalInfo,Margin_5,Margin_Top_5, Color_White, Section_Max_Absolute, Flex_Section } from '../../../Login/Style/css';
import { Flex_Row, Height_50_Centered, Height_50_Centered_N_Flex, Size_14_Bold, Size_20_Bold, Size_24_Bold, Top_Radius_5 } from '../../../Login/Style/style';
import { generateCustomId } from '../../../../Helpers/API';
/** */

const Category = (props) => {
    const navigation = useNavigation();
    const [category, SetCategory] = React.useState(null);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [key, SetKey] = React.useState(generateCustomId());
    const [load, SetKeyLoad] = React.useState(generateCustomId());
    React.useEffect(() => {
        setLoader(null);
    }, []);
    function setLoader(val = null) {
        setTimeout(() => {
            SetCategory(val == null ? props.Category : val);
        }, 500)
    }
    function selectCategory(category) {
        setModalVisible(true);
        //navigation.navigate("ShowCategory", {"Category":category, "TOKEN":props.TOKEN});
    }
    function closeModal() {
        setModalVisible(false);
    }
    if (category == null) {
        return(<ActivityIndicator key={load} size="large" color="#EC2427" />);
    }else{
        return(
            <TouchableOpacity onPress={() => selectCategory(category)} key={key} style={[{width: props.width-10}, Top_Radius_5]}>
                <View style={[{width: (props.width-10)}, Flex_Row]}>
                    <View style={[{width:(props.width-10)*0.75}, Height_50_Centered]}>
                        <Text style={Size_24_Bold}>{category.name}</Text>
                    </View>
                    <View style={[{width:(props.width-10)*0.25}, Height_50_Centered_N_Flex]}>
                        <Text style={Size_14_Bold}>{category.code}</Text>
                    </View>
                </View>
                <Modal isVisible={isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={Section_Max_Absolute} onPress={() => closeModal()}>
                    <View style={Flex_Section} /></TouchableWithoutFeedback>} onSwipeComplete={() => closeModal()}>
                    <View style={[modalContainerStyle]}>
                        <View style={[modalInfo,bordePlomo]}>
                            <View style={[{width: (windowWidth-80)}, Flex_Row]}>
                                <View style={[{width:(windowWidth-80)*0.75}, Height_50_Centered]}>
                                    <Text style={Size_24_Bold}>{category.name}</Text>
                                </View>
                                <View style={[{width:(windowWidth-80)*0.25}, Height_50_Centered_N_Flex]}>
                                    <Text style={Size_14_Bold}>{category.code}</Text>
                                </View>
                            </View>
                            <View style={[{width: (windowWidth-80)}, Flex_Row]}>
                                <View style={[{width:(windowWidth-80)*0.60}, Height_50_Centered]}>
                                    <Text style={Size_20_Bold}>Estado</Text>
                                </View>
                                <View style={[{width:(windowWidth-80)*0.40}, Height_50_Centered_N_Flex]}>
                                    <Chip key={generateCustomId()} style={[Margin_5,Background_Dismac]} onPress={() => console.log('Pressed')}>
                                        <Text style={Color_White}>{category.status == 1 ? "Activado" : "Desactivado"}</Text>
                                    </Chip>
                                </View>
                            </View>
                            <View style={[{width: (windowWidth-80)}, Flex_Row]}>
                                <View style={[{width:(windowWidth-80)*0.60}, Height_50_Centered]}>
                                    <Text style={Size_20_Bold}>Productos</Text>
                                </View>
                                <View style={[{width:(windowWidth-80)*0.40}, Height_50_Centered_N_Flex]}>
                                    <Badge style={[Margin_5,Background_Dismac]} size={30}>{category.products}</Badge>
                                </View>
                            </View>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Ciudad</DataTable.Title>
                                    <DataTable.Title numeric>Productos</DataTable.Title>
                                </DataTable.Header>
                                {
                                    category.stores.map((store) => {
                                        return (
                                            <DataTable.Row key={generateCustomId()}>
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
            </TouchableOpacity>
        );
    }
};
export default Category;