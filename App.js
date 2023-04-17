import { StatusBar } from 'react-native';
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
import UserRegister from './App/Modules/Login/Views/Account/UserRegister';
import PasswordRegister from './App/Modules/Login/Views/Account/PasswordRegister';
import SuccessRegister from './App/Modules/Login/Views/SuccessRegister';
import AddAccount from './App/Modules/Account/Views/AddAccount';
import AddCatalog from './App/Modules/Catalog/Views/AddCatalog';
import RestorePassword from './App/Modules/Login/Views/RestorePassword';
import RestorePwd from './App/Modules/Login/Views/Account/RestorePwd';
import ShowCatalog from './App/Modules/Catalog/Views/ShowCatalog';
import NewCategory from './App/Modules/Catalog/Views/NewCategory';
import ShowCategory from './App/Modules/Catalog/Views/ShowCategory';
import EditCategory from './App/Modules/Catalog/Views/EditCategory';
/** */

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Loading" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Inicio" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterLegal" component={Legal} />
        <Stack.Screen name="RegisterContact" component={Personal} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="AddressExtra" component={AddressExtra} />
        <Stack.Screen name="UserRegister" component={UserRegister} />
        <Stack.Screen name="PasswordRegister" component={PasswordRegister} />
        <Stack.Screen name="SuccessRegister" component={SuccessRegister} />
        <Stack.Screen name="AddAccount" component={AddAccount} options={{headerShown: true,title: "Registro de cuenta"}} />
        <Stack.Screen name="AddCatalog" component={AddCatalog} options={{headerShown: true,title: "Registro de catalogos"}} />
        <Stack.Screen name="RestorePassword" component={RestorePassword} />
        <Stack.Screen name="RestorePWD" component={RestorePwd} />
        <Stack.Screen name="ShowCatalog" component={ShowCatalog} options={{headerShown: true,title: ""}} />
        <Stack.Screen name="NewCategory" component={NewCategory} options={{headerShown: true,title: "Nueva categoría"}} />
        <Stack.Screen name="ShowCategory" component={ShowCategory} options={{headerShown: true,title: ""}} />
        <Stack.Screen name="EditCategory" component={EditCategory} options={{headerShown: true,title: "Editar categoría"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

