import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons'; 
import { IconButton } from 'react-native-paper';
import { Navigation } from '../../../Helpers/Nav';
const Drawer = createDrawerNavigator();
/** Components */
import LandingHome from './LandingHome';
import ImgDis from '../../../Components/ImgDis';
import Catalog from '../../Catalog/Views/Catalog';
import CustomDrawer from '../../../Components/CustomDrawer';
import Improvements from '../../Improvements/Views/Improvements';
import Management from '../../Management/Views/Management';
import SupportTechnical from '../../SupportTechnical/Views/SupportTechnical';
import IconImprovements from '../../Improvements/Helper/IconImprovements';
import IconSupport from '../../SupportTechnical/Helper/IconSupport';
import IconManagement from '../../Management/Helper/IconManagement';
import IconCatalog from '../../Catalog/Helper/IconCatalog';
import IconHome from '../Helper/IconHome';
import ListAccount from '../../Account/Views/ListAccount';
import IconAccount from '../../Account/Helper/IconAccount';
import AddAccount from '../../Account/Views/AddAccount';
/** */

const Home = ({route, navigation }) => {
    const LandingHOME = () => <LandingHome style={{}} data={{}} />;
    const CATALOG = () => <Catalog style={{}} data={{}} />;
    const IMPROVEMENTS = () => <Improvements style={{}} data={{}} />;
    const MANAGEMENT = () => <Management style={{}} data={{}} />;
    const SUPPORTTECHNICAL = () => <SupportTechnical style={{}} data={{}} />;
    const LogoDismac = () => <ImgDis style={{width: 30,height: 30}} animation={{border: 5, time: 1000}} />;
    const LISTACCOUNT = () => <ListAccount style={{}} data={{}} />;
    const ADDACCOUNT = () => <AddAccount style={{}} data={{}} />;
    React.useEffect(() => {
        //
    }, []);
    return (
        <Drawer.Navigator useLegacyImplementation drawerContent={(props) => <CustomDrawer {...props} />}>
          <Drawer.Screen name="LandingHome" options={({navigation}) => ({
                headerTitle: () => (<LogoDismac />),
                drawerLabel: "Inicio",
                drawerIcon: ({focused, size}) => (<IconHome focus={focused} size={size} />),
                drawerActiveTintColor : "#EC2427",
                drawerInactiveTintColor : "#808080" 
            })} component={LandingHOME} />
          <Drawer.Screen name="Catalog" options={({navigation}) => ({
                headerTitle: () => (<LogoDismac />),
                headerRight: () => (<IconButton icon="book" iconColor={"#EC2427"} size={30} onPress={() => Navigation("AddCatalog", {}, navigation)} />),
                drawerLabel: "Catalogo",
                drawerIcon: ({focused, size}) => (<IconCatalog focus={focused} size={size} />),
                drawerActiveTintColor : "#EC2427",
                drawerInactiveTintColor : "#808080" 
            })} component={CATALOG} />
          <Drawer.Screen name="SupportTechnical" options={({navigation}) => ({
                headerTitle: () => (<LogoDismac />),
                drawerLabel: "Soport tecnico",
                drawerIcon: ({focused, size}) => (<IconSupport focus={focused} size={size} />),
                drawerActiveTintColor : "#EC2427",
                drawerInactiveTintColor : "#808080" 
            })} component={SUPPORTTECHNICAL} />
          <Drawer.Screen name="Improvements" options={({navigation}) => ({
                headerTitle: () => (<LogoDismac />),
                drawerLabel: "Buzón de mejoras",
                drawerIcon: ({focused, size}) => (<IconImprovements focus={focused} size={size} />),
                drawerActiveTintColor : "#EC2427",
                drawerInactiveTintColor : "#808080" 
            })} component={IMPROVEMENTS} />
          <Drawer.Screen name="Management" options={({navigation}) => ({
                headerTitle: () => (<LogoDismac />),
                drawerLabel: "Mi Partner",
                drawerIcon: ({focused, size}) => (<IconManagement focus={focused} size={size} />),
                drawerActiveTintColor : "#EC2427",
                drawerInactiveTintColor : "#808080" 
            })} component={MANAGEMENT} />
          <Drawer.Screen name="Cuentas" options={({navigation}) => ({
                headerTitle: () => (<LogoDismac />),
                headerRight: () => (<IconButton icon="account-plus" iconColor={"#EC2427"} size={30} onPress={() => Navigation("AddAccount", {}, navigation)} />),
                drawerLabel: "Cuentas",
                drawerIcon: ({focused, size}) => (<IconAccount focus={focused} size={size} />),
                drawerActiveTintColor : "#EC2427",
                drawerInactiveTintColor : "#808080" 
            })} component={LISTACCOUNT} />
        </Drawer.Navigator>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
});

export default Home;