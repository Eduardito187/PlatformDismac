import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Animated, SafeAreaView } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import axios from 'axios';
import { io } from 'socket.io-client';
import { ResetNavigation } from '../../../Helpers/Nav';
import { GET_TOKEN_SESSION, URL_API, GET_HEADER_TOKEN, SAVE_CURRENT_SESSION, DELETE_TOKEN_SESSION, GET_TOKEN_MOBILE, generateCustomId } from '../../../Helpers/API';
import { RED_DIS, containerScreen, DRAWER_CONTENT, SOLID_BG, UPLOAD_BTN } from '../../Login/Style/css';
import { Text_LandingHome, Text_Catalog, Text_SupportTechnical, Text_ScannerQR, Text_Improvements, Text_Management, Text_Cuentas, Text_Products, CLOSE_SESSION, Text_Ventas, Upload, Text_Category, Text_Ahorros } from '../../../Router/Route';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
/** Components */
import LandingHome from './LandingHome';
import Catalog from '../../Catalog/Views/Catalog';
import Improvements from '../../Improvements/Views/Improvements';
import SupportTechnical from '../../SupportTechnical/Views/SupportTechnical';
import IconImprovements from '../../Improvements/Helper/IconImprovements';
import IconSupport from '../../SupportTechnical/Helper/IconSupport';
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
import SaleIcon from '../../Account/Helper/SaleIcon';
import Sales from '../../Sales/Views/Sales';
import IconUpload from '../Helper/IconUpload';
import UploadMassive from '../../Account/Views/UploadMassive';
import TabAccount from './Components/TabAccount';
import { Grow_20, Top_Custom } from '../../Login/Style/style';
import IconCategory from '../../Catalog/Helper/IconCategory';
import IconCoupon from '../../Catalog/Helper/IconCoupon';
import CategorySearch from '../../Catalog/Views/CategorySearch';
import CouponSearch from '../../Catalog/Views/CouponSearch';
import ModalDisableComponen from './Components/ModalDisable';
import ModalCloseComponen from './Components/ModalClose';
import ModalVersionComponen from './Components/ModalVersion';
import { getTokenNotification, settingToken } from '../../../Helpers/Code';

const Home = ({ route, navigation }) => {
  const [heightBar, SetHeightBar] = React.useState(getStatusBarHeight());
  const [currentTab, setCurrentTab] = React.useState(Text_LandingHome);
  const [showMenu, setShowMenu] = React.useState(false);
  const offsetValue = React.useRef(new Animated.Value(0)).current;
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const closeButtonOffset = React.useRef(new Animated.Value(0)).current;
  const [SOCKET, SETSOCKET] = React.useState("");
  const [TOKEN, SetTOKEN] = React.useState("");
  const [Load, SetLoad] = React.useState(false);
  const [CurrentScreen, setCurrentScreen] = React.useState(null);
  const [currentAccount, SetCurrentAccount] = React.useState({"id": 0,"name": "","email": "","profile": "","cover": ""});
  const [TOKEN_MOBILE, SETTOKENMOBILE] = React.useState(null);
  const [ModalDisable, SetModalDisable] = React.useState(false);
  const [ModalClose, SetModalClose] = React.useState(false);
  const [ModalVersion, SetModalVersion] = React.useState(false);

  React.useEffect(() => {
    setToken();
  }, []);

  async function backgroundFetchTask(TOKEN_SESSIONS){
    try {
      const token_expo = await getTokenNotification(TOKEN_SESSIONS);
      await settingToken(TOKEN_SESSIONS, token_expo);
    } catch (error) {
      //
    }
};
  
  function showModalVersion() {
    SetModalVersion(true);
  }

  function closeModalVersion() {
    closeSession();
    SetModalVersion(false);
  }

  function showModalDisable() {
    SetModalDisable(true);
  }

  function closeModalDisable() {
    closeSession();
    SetModalDisable(false);
  }
  
  function showModalClose() {
    SetModalClose(true);
  }

  function closeModalClose() {
    closeSession();
    SetModalClose(false);
  }

  async function setSession(data, token) {
    const socket = io("http://62.72.9.102:3000", {autoConnect: true});
    //
    setCurrentTab(Text_LandingHome);
    setCurrentScreen(() => <LandingHome navigation={navigation} roles={data.roles} socket={socket} TOKEN={token} DrawerAction={(a) => animatedScreen(a)} showMenu={showMenu} />);
    //
    SETSOCKET(socket);
    SetCurrentAccount(data);
    SETTOKENMOBILE(await GET_TOKEN_MOBILE());
    await SAVE_CURRENT_SESSION(data);
    onSocket(socket, data.id, data.id_partner);
    SetLoad(true);
    backgroundFetchTask(token);
  }

  async function onSocket(socket, id_account, id_partner) {
    socket.on("CLOSE_"+id_account+"_ACCOUNT", (value) => {
      if (value != null && value.token != TOKEN_MOBILE) {
        showModalClose();
      }
    });
    socket.on("DISABLE_"+id_account+"_ACCOUNT", (value) => {
      if (value) {
        showModalDisable();
      }
    });
    socket.on("VERSION_"+id_account+"_APP", (value) => {
      if (value == false) {
        showModalVersion();
      }
    });
    socket.on("UPDATE_"+id_partner+"_PARTNER", (value) => {
      SetLoad(false);
      if (value) {
        getAccount(TOKEN, false);
      }
    });
  }

  function getAccount(token, status) {
    axios.get(URL_API("currentAccount"), GET_HEADER_TOKEN(token)).then(res => {
      if (res.data != null) {
        console.log(status, "Status");
        if (status == true) {
          setSession(res.data.response, token);
        } else {
          SetLoad(true);
        }
      } else {
        SetLoad(null);
      }
    }).catch(err => {
      //
    });
  }

  async function setToken() {
    let token = await GET_TOKEN_SESSION();
    SetTOKEN(token);
    getAccount(token, true);
  }

  function animatedScreen(status) {
    Animated.timing(scaleValue, {
      toValue: status ? 1 : 0.88,
      duration: 300,
      useNativeDriver: true
    }).start();

    Animated.timing(offsetValue, {
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
        setCurrentScreen(() => <LandingHome navigation={navigation} roles={currentAccount.roles} socket={SOCKET} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Catalog:
        setCurrentScreen(() => <Catalog navigation={navigation} roles={currentAccount.roles} socket={SOCKET} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Category:
        setCurrentScreen(() => <CategorySearch navigation={navigation} roles={currentAccount.roles} socket={SOCKET} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Products:
        setCurrentScreen(() => <Product navigation={navigation} roles={currentAccount.roles} socket={SOCKET} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Ventas:
        setCurrentScreen(() => <Sales navigation={navigation} roles={currentAccount.roles} socket={SOCKET} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Ahorros:
        setCurrentScreen(() => <CouponSearch navigation={navigation} roles={currentAccount.roles} socket={SOCKET} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_SupportTechnical:
        setCurrentScreen(() => <SupportTechnical navigation={navigation} roles={currentAccount.roles} socket={SOCKET} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_ScannerQR:
        setCurrentScreen(() => <Scanner navigation={navigation} roles={currentAccount.roles} socket={SOCKET} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Improvements:
        setCurrentScreen(() => <Improvements navigation={navigation} roles={currentAccount.roles} socket={SOCKET} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Management:
        setCurrentScreen(() => <Partner navigation={navigation} roles={currentAccount.roles} socket={SOCKET} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Text_Cuentas:
        setCurrentScreen(() => <ListAccount navigation={navigation} roles={currentAccount.roles} socket={SOCKET} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case Upload:
        setCurrentScreen(() => <UploadMassive navigation={navigation} roles={currentAccount.roles} socket={SOCKET} TOKEN={TOKEN} DrawerAction={(a) => animatedScreen(a)} showMenu={newState} />);
        break;
      case CLOSE_SESSION:
        closeSession();
        break;
    }
    animatedScreen(showMenu);
  }

  async function closeSession() {
    if (await DELETE_TOKEN_SESSION()) {
      ResetNavigation("Loading", {}, navigation);
    }
  }

  if (Load === false) {
    return (
      <LoadingPage />
    );
  } else {
    return (
      <SafeAreaView style={containerScreen}>
        <View style={DRAWER_CONTENT}>
          <View style={[{ marginTop: heightBar }]}>
            <TabAccount currentTab={currentTab} roles={currentAccount.roles} setCurrentTab={(a) => changeScreen(a)} title={Text_Management} Account={currentAccount} />
          </View>
          <View style={Grow_20}>
            {TabButton(currentTab, changeScreen, Text_LandingHome, <IconHome focus={currentTab == Text_LandingHome ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_Catalog, <IconCatalog focus={currentTab == Text_Catalog ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_Category, <IconCategory focus={currentTab == Text_Category ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_Products, <IconProduct focus={currentTab == Text_Products ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_Ventas, <SaleIcon focus={currentTab == Text_Ventas ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_Ahorros, <IconCoupon focus={currentTab == Text_Ahorros ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Upload, <IconUpload focus={currentTab == Upload ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_SupportTechnical, <IconSupport focus={currentTab == Text_SupportTechnical ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_Improvements, <IconImprovements focus={currentTab == Text_Improvements ? true : false} size={25} />)}
            {TabButton(currentTab, changeScreen, Text_Cuentas, <IconAccount focus={currentTab == Text_Cuentas ? true : false} size={25} />)}
          </View>
          <View>
            {TabButton(currentTab, changeScreen, CLOSE_SESSION, <IconExit focus={currentTab == CLOSE_SESSION ? true : false} size={25} />)}
          </View>
        </View>
        <Animated.View style={[Top_Custom, { top: heightBar, transform: [{ scale: scaleValue }, { translateX: offsetValue }] }]}>
          <Animated.View style={[{ transform: [{ translateY: closeButtonOffset }], backgroundColor: SOLID_BG, borderRadius: showMenu ? 10 : 0 }]}>
            {CurrentScreen}
          </Animated.View>
        </Animated.View>
        {showMenu && (
          <View style={UPLOAD_BTN}>
            {TabButton(currentTab, changeScreen, Text_ScannerQR, <IconScanner focus={currentTab == Text_ScannerQR ? true : false} size={25} />, true)}
          </View>)
        }
        <StatusBar backgroundColor={RED_DIS} style="light" />
        <ModalDisableComponen closeModal={() => closeModalDisable()} isModalVisible={ModalDisable} key={generateCustomId()} />
        <ModalCloseComponen closeModal={() => closeModalClose()} isModalVisible={ModalClose} key={generateCustomId()} />
        <ModalVersionComponen closeModal={() => closeModalVersion()} isModalVisible={ModalVersion} key={generateCustomId()} />
      </SafeAreaView>
    );
  }
};

export default Home;