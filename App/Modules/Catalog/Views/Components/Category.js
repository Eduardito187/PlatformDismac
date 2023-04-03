import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { windowHeight, windowWidth } from '../../../../Helpers/GetMobil';
import { Chip,DataTable,Button, Badge } from 'react-native-paper';
import Modal from "react-native-modal";
import { modalContainerStyle,Background_Dismac,bordePlomo,modalInfo,Margin_5,Margin_Top_5, Color_White } from '../../../Login/Style/css';
/** */

const Category = (props) => {
    const navigation = useNavigation();
    const [category, SetCategory] = React.useState(null);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [key, SetKey] = React.useState(Math.random()+'_Category_'+Math.random());
    const [load, SetKeyLoad] = React.useState(Math.random()+'_LoadCat_'+Math.random());
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
            <TouchableOpacity onPress={() => selectCategory(category)} key={key} style={{width: props.width-10, borderRadius: 5, backgroundColor: "#FFFFFF", marginBottom: 5, padding: 5}}>
                <View style={{width: (props.width-10),flexDirection: 'row',flexWrap: 'wrap'}}>
                    <View style={{width:(props.width-10)*0.75, height: 50, flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: "bold", fontSize: 24, color: "#808080"}}>{category.name}</Text>
                    </View>
                    <View style={{width:(props.width-10)*0.25, height: 50, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Text style={{fontWeight: "bold", fontSize: 14, color: "#808080"}}>{category.code}</Text>
                    </View>
                </View>
                <Modal isVisible={isModalVisible} swipeDirection={'down'} customBackdrop={<TouchableWithoutFeedback style={{position: 'absolute', left:0,right: 0,top: 0, bottom:0}} onPress={() => closeModal()}>
                    <View style={{ flex: 1,backgroundColor: 'rgba(0,0,0,.5)'}} /></TouchableWithoutFeedback>} onSwipeComplete={() => closeModal()}>
                    <View style={[modalContainerStyle]}>
                        <View style={[modalInfo,bordePlomo]}>
                            <View style={{width: (windowWidth-80),flexDirection: 'row',flexWrap: 'wrap'}}>
                                <View style={{width:(windowWidth-80)*0.75, height: 50, flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <Text style={{fontWeight: "bold", fontSize: 24, color: "#808080"}}>{category.name}</Text>
                                </View>
                                <View style={{width:(windowWidth-80)*0.25, height: 50, justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <Text style={{fontWeight: "bold", fontSize: 14, color: "#808080"}}>{category.code}</Text>
                                </View>
                            </View>
                            <View style={{width: (windowWidth-80),flexDirection: 'row',flexWrap: 'wrap'}}>
                                <View style={{width:(windowWidth-80)*0.60, height: 50, flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <Text style={{fontWeight: "bold", fontSize: 20, color: "#808080"}}>Estado</Text>
                                </View>
                                <View style={{width:(windowWidth-80)*0.40, height: 50, justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <Chip key={Math.random()+'_Status_'+Math.random()} style={[Margin_5,Background_Dismac]} onPress={() => console.log('Pressed')}>
                                        <Text style={Color_White}>{category.status == 1 ? "Activado" : "Desactivado"}</Text>
                                    </Chip>
                                </View>
                            </View>
                            <View style={{width: (windowWidth-80),flexDirection: 'row',flexWrap: 'wrap'}}>
                                <View style={{width:(windowWidth-80)*0.60, height: 50, flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <Text style={{fontWeight: "bold", fontSize: 20, color: "#808080"}}>Productos</Text>
                                </View>
                                <View style={{width:(windowWidth-80)*0.40, height: 50, justifyContent: 'center', alignItems: 'flex-end'}}>
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
            </TouchableOpacity>
        );
    }
};
export default Category;