import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/** Import tamplates in modules */
import Loading from './App/Modules/Loader/Views/Loading';
import Home from './App/Modules/Home/Views/Home';
import Login from './App/Modules/Login/Views/Login';
import Register from './App/Modules/Login/Views/Register';
import Legal from './App/Modules/Login/Views/Legal';
import Personal from './App/Modules/Login/Views/Personal';
import Address from './App/Modules/Login/Views/Address';
import AddressExtra from './App/Modules/Login/Views/AddressExtra';
/** */

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterLegal" component={Legal} />
        <Stack.Screen name="RegisterContact" component={Personal} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="AddressExtra" component={AddressExtra} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

