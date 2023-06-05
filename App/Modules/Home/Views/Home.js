import React, {useState,useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ImageBackground, Animated, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import axios from 'axios';
import { Navigation, ResetNavigation } from '../../../Helpers/Nav';
import { GET_TOKEN_SESSION, URL_API, GET_HEADER_TOKEN, SAVE_CURRENT_SESSION, DELETE_TOKEN_SESSION } from '../../../Helpers/API';
import { RED_DIS, PLO_DIS, containerScreen, TEXT_NAME, PROFILE_PICTURE, DRAWER_CONTENT, SOLID_BG, OPACITY, IMAGE_BG, IMAGE_STYLE, MAIL_TEXT, UPLOAD_BTN } from '../../Login/Style/css';
import { Text_LandingHome, Text_Catalog, Text_SupportTechnical, Text_ScannerQR, Text_Improvements, Text_Management, Text_Cuentas, Text_Products, CLOSE_SESSION, Text_Ventas, Upload } from '../../../Router/Route';
const Drawer = createDrawerNavigator();
/** Components */
import LandingHome from './LandingHome';
import ImgDis from '../../../Components/ImgDis';
import Catalog from '../../Catalog/Views/Catalog';
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
import Product from '../../Catalog/Views/Product';
/** */
import TabButton from './Components/TabButton';
import LoadingPage from './Components/LoadingPage';
import IconExit from '../Helper/IconExit';
import DrawerAccount from './Components/DrawerAccount';
import SaleIcon from '../../Account/Helper/SaleIcon';
import Sales from '../../Sales/Views/Sales';
import IconUpload from '../Helper/IconUpload';
import UploadMassive from '../../Account/Views/UploadMassive';

const Home = ({route, navigation }) => {
  const {socket} = route.params;
  const [heightBar, SetHeightBar] = React.useState(getStatusBarHeight());

  const [currentTab, setCurrentTab] = React.useState(Text_LandingHome);
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = React.useState(false);
  // Animated Properties...
  const offsetValue = React.useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const closeButtonOffset = React.useRef(new Animated.Value(0)).current;

  const [TOKEN, SetTOKEN] = React.useState("");
  const [Load, SetLoad] = React.useState(false);
  const [CurrentScreen, setCurrentScreen]= React.useState(null);
  const [currentAccount, SetCurrentAccount] = React.useState({
    "id" : 0,
    "name" : "",
    "email" : "",
    "profile": "",
    "cover": ""
  });

  React.useEffect(() => {
    setToken();
  }, []);
  
  async function setSession(data){
    socket.connect();
    SetCurrentAccount(data);
    await SAVE_CURRENT_SESSION(data);
    SetLoad(true);
  }

  function getAccount(token){
    axios.get(URL_API("currentAccount"),GET_HEADER_TOKEN(token)).then(res => {
      console.log(res.data);
      if(res.data != null){
        setSession(res.data.response);
        setCurrentTab(Text_LandingHome);
        setCurrentScreen(() => <LandingHome navigation={navigation} socket={socket} TOKEN={token} DrawerAction={(a) => animatedScreen(a)} showMenu={showMenu} />);
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

  function animatedScreen(status){
    Animated.timing(scaleValue, {
      toValue: status ? 1 : 0.88,
      duration: 300,
      useNativeDriver: true
    }).start();

    Animated.timing(offsetValue, {
      // YOur Random Value...
      toValue: status ? 0 : 230,
      duration: 300,
      useNativeDriver: true
    }).start();

    Animated.timing(closeButtonOffset, {
      toValue: !status ? -30 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();

    setShowMenu(!status);
  }

  function changeScreen(name) {
    let newState = !showMenu;
    setCurrentTab(name);
    switch (name) {
      case Text_LandingHome:
        setCurrentScreen(() => <LandingHome navigation={navigation} socket={socket} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Catalog:
        setCurrentScreen(() => <Catalog navigation={navigation} socket={socket} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Products:
        setCurrentScreen(() => <Product navigation={navigation} socket={socket} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Ventas:
        setCurrentScreen(() => <Sales navigation={navigation} socket={socket} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_SupportTechnical:
        setCurrentScreen(() => <SupportTechnical navigation={navigation} socket={socket} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_ScannerQR:
        setCurrentScreen(() => <Scanner navigation={navigation} socket={socket} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Improvements:
        setCurrentScreen(() => <Improvements navigation={navigation} socket={socket} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Management:
        setCurrentScreen(() => <Partner navigation={navigation} socket={socket} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Cuentas:
        setCurrentScreen(() => <ListAccount navigation={navigation} socket={socket} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Upload:
        setCurrentScreen(() => <UploadMassive navigation={navigation} socket={socket} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case CLOSE_SESSION:
        closeSession();
        break;
    }
    animatedScreen(showMenu);
  }

  async function closeSession() {
    if (await DELETE_TOKEN_SESSION()) {
      ResetNavigation("Loading",{}, navigation);
    }
  }

  if (Load === false) {
    return (
      <LoadingPage />
    );
  }else{
    return (
      <SafeAreaView style={containerScreen}>
        <View style={DRAWER_CONTENT}>
          <View style={{marginTop: heightBar}}>
            <DrawerAccount Account={currentAccount} />
          </View>
          <View style={{ flexGrow: 1, marginTop: 20 }}>
            {TabButton(currentTab, changeScreen, Text_LandingHome, <IconHome focus={currentTab == Text_LandingHome ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_Catalog, <IconCatalog focus={currentTab == Text_Catalog ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_Products, <IconProduct focus={currentTab == Text_Products ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_Ventas, <SaleIcon focus={currentTab == Text_Ventas ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Upload, <IconUpload focus={currentTab == Upload ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_ScannerQR, <IconScanner focus={currentTab == Text_ScannerQR ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_SupportTechnical, <IconSupport focus={currentTab == Text_SupportTechnical ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_Improvements, <IconImprovements focus={currentTab == Text_Improvements ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_Cuentas, <IconAccount focus={currentTab == Text_Cuentas ? true : false} size={25} />)}
          </View>
          <View>
            {TabButton(currentTab, changeScreen, CLOSE_SESSION, <IconExit focus={currentTab == CLOSE_SESSION ? true : false} size={25} />)}
          </View>
        </View>
        <Animated.View style={{flexGrow: 1,position: 'absolute',top: heightBar,bottom: 0,left: 0,right: 0,transform: [{ scale: scaleValue },{ translateX: offsetValue }]}}>
          <Animated.View style={{transform: [{translateY: closeButtonOffset}],backgroundColor:SOLID_BG, borderRadius: showMenu ? 10 : 0}}>
            {CurrentScreen}
          </Animated.View>
        </Animated.View>
        
        {
          showMenu && (<View style={UPLOAD_BTN}>{TabButton(currentTab, changeScreen, Text_Management, <IconManagement focus={currentTab == Text_Management ? true : false} size={25} />)}</View>)
        }
        <StatusBar backgroundColor={RED_DIS} style="light" />
      </SafeAreaView>
    );
  }
};

export default Home;