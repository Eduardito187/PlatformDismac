import React, {useState} from 'react';
import { Text, View, TextInput, ActivityIndicator } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import { IconButton } from 'react-native-paper';
import { Navigation } from '../../../Helpers/Nav';
import { GET_TOKEN_SESSION, URL_API, GET_HEADER_TOKEN, SAVE_CURRENT_SESSION } from '../../../Helpers/API';
import { RED_DIS, PLO_DIS } from '../../Login/Style/css';
import { Text_LandingHome, Text_Catalog, Text_SupportTechnical, Text_ScannerQR, Text_Improvements, Text_Management, Text_Cuentas, Text_Products } from '../../../Router/Route';
const Drawer = createDrawerNavigator();
/** Components */
import LandingHome from './LandingHome';
import ImgDis from '../../../Components/ImgDis';
import Catalog from '../../Catalog/Views/Catalog';
import CustomDrawer from '../../../Components/CustomDrawer';
import Improvements from '../../Improvements/Views/Improvements';
import SupportTechnical from '../../SupportTechnical/Views/SupportTechnical';
import IconImprovements from '../../Improvements/Helper/IconImprovements';
import IconSupport from '../../SupportTechnical/Helper/IconSupport';
import IconManagement from '../../Management/Helper/IconManagement';
import IconCatalog from '../../Catalog/Helper/IconCatalog';
import IconHome from '../Helper/IconHome';
import ListAccount from '../../Account/Views/ListAccount';
import IconAccount from '../../Account/Helper/IconAccount';
import Partner from '../../Partner/Views/Partner';
import Scanner from '../../Qr/Views/Scanner';
import IconScanner from '../../Qr/Helper/IconScanner';
import IconProduct from '../../Catalog/Helper/IconProduct';
/** */

const Home = ({route, navigation }) => {
  const [TOKEN, SetTOKEN] = React.useState("");
  const [Load, SetLoad] = React.useState(false);
  const [currentAccount, SetCurrentAccount] = React.useState({
    "id" : 0,
    "name" : "",
    "email" : "",
    "profile": "",
    "cover": ""
  });
  const LandingHOME = () => <LandingHome style={{}} data={{}} />;
  const CATALOG = () => <Catalog style={{}} data={{}} />;
  const IMPROVEMENTS = () => <Improvements style={{}} data={{}} />;
  const SCANNER_QR = () => <Scanner style={{}} data={{}} />;
  const MANAGEMENT = () => <Partner style={{}} data={{}} />;
  const SUPPORTTECHNICAL = () => <SupportTechnical style={{}} data={{}} />;
  const LogoDismac = () => <ImgDis style={{width: 30,height: 30}} animation={{border: 5, time: 1000}} />;
  const LISTACCOUNT = () => <ListAccount style={{}} data={{}} />;

  React.useEffect(() => {
    setToken();
  }, []);
  
  async function setSession(data){
    SetCurrentAccount(data);
    await SAVE_CURRENT_SESSION(data);
    SetLoad(true);
  }

  function getAccount(token){
    axios.get(URL_API("currentAccount"),GET_HEADER_TOKEN(token)).then(res => {
      if(res.data != null){
        setSession(res.data.response);
      }else{
        SetLoad(null);
      }
    }).catch(err => {
      //
    });
  }

  async function setToken(){
    let token = await GET_TOKEN_SESSION();
    SetTOKEN(token);
    getAccount(token);
  }

  if (Load === false) {
    return (
      <>
        <ActivityIndicator color={RED_DIS} size={"large"} />
      </>
    );
  }else{
    return (
      <Drawer.Navigator useLegacyImplementation drawerContent={(props) => <CustomDrawer {...props} TOKEN={TOKEN} Account={currentAccount} />}>
        <Drawer.Screen name={Text_LandingHome} options={({navigation}) => ({headerTitle: () => (<LogoDismac />), drawerLabel: "Inicio", drawerIcon: ({focused, size}) => (<IconHome focus={focused} size={size} />), drawerActiveTintColor : RED_DIS,drawerInactiveTintColor : PLO_DIS})} component={LandingHOME} />
        <Drawer.Screen name={Text_Catalog} options={({navigation}) => ({headerTitle: () => (<LogoDismac />), headerRight: () => (<IconButton icon="book" iconColor={RED_DIS} size={30} onPress={() => Navigation("AddCatalog", {}, navigation)} />), drawerLabel: "Catálogo", drawerIcon: ({focused, size}) => (<IconCatalog focus={focused} size={size} />), drawerActiveTintColor : RED_DIS,drawerInactiveTintColor : PLO_DIS})} component={CATALOG} />
        <Drawer.Screen name={Text_Products} options={({navigation}) => ({headerTitle: () => (<LogoDismac />), headerRight: () => (<IconButton icon="plus" iconColor={RED_DIS} size={30} onPress={() => Navigation("AddCatalog", {}, navigation)} />), drawerLabel: "Productos", drawerIcon: ({focused, size}) => (<IconProduct focus={focused} size={size} />), drawerActiveTintColor : RED_DIS,drawerInactiveTintColor : PLO_DIS})} component={CATALOG} />
        <Drawer.Screen name={Text_SupportTechnical} options={({navigation}) => ({ headerTitle: () => (<LogoDismac />), drawerLabel: "Sopórte tecnico", drawerIcon: ({focused, size}) => (<IconSupport focus={focused} size={size} />), drawerActiveTintColor : RED_DIS,drawerInactiveTintColor : PLO_DIS})} component={SUPPORTTECHNICAL} />
        <Drawer.Screen name={Text_ScannerQR} options={({navigation}) => ({headerTitle: () => (<LogoDismac />), drawerLabel: "Scanner QR", drawerIcon: ({focused, size}) => (<IconScanner focus={focused} size={size} />), drawerActiveTintColor : RED_DIS,drawerInactiveTintColor : PLO_DIS})} component={SCANNER_QR} />
        <Drawer.Screen name={Text_Improvements} options={({navigation}) => ({headerTitle: () => (<LogoDismac />), drawerLabel: "Buzón de mejoras", drawerIcon: ({focused, size}) => (<IconImprovements focus={focused} size={size} />), drawerActiveTintColor : RED_DIS,drawerInactiveTintColor : PLO_DIS})} component={IMPROVEMENTS} />
        <Drawer.Screen name={Text_Management} options={({navigation}) => ({headerTitle: () => (<LogoDismac />), drawerLabel: "Mi Partner", drawerIcon: ({focused, size}) => (<IconManagement focus={focused} size={size} />), drawerActiveTintColor : RED_DIS,drawerInactiveTintColor : PLO_DIS})} component={MANAGEMENT} />
        <Drawer.Screen name={Text_Cuentas} options={({navigation}) => ({headerTitle: () => (<LogoDismac />), headerRight: () => (<IconButton icon="account-plus" iconColor={RED_DIS} size={30} onPress={() => Navigation("AddAccount", {}, navigation)} />), drawerLabel: "Cuentas", drawerIcon: ({focused, size}) => (<IconAccount focus={focused} size={size} />), drawerActiveTintColor : RED_DIS,drawerInactiveTintColor : PLO_DIS})} component={LISTACCOUNT} />
      </Drawer.Navigator>
    );
  }
};

export default Home;