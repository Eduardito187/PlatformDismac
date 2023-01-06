import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/** Import tamplates in modules */
import Loading from './App/Modules/Loader/Views/Loading';
import Home from './App/Modules/Home/Views/Home';
import Login from './App/Modules/Login/Views/Login';
import Register from './App/Modules/Login/Views/Register';
import Verificate from './App/Modules/Login/Views/Verificate';
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
        <Stack.Screen name="Verificate" component={Verificate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

