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
import ShowProduct from './App/Modules/Product/Views/ShowProduct';
import NewST from './App/Modules/Home/Views/NewST';
import NewIM from './App/Modules/Home/Views/NewIM';
import ViewProduct from './App/Modules/Product/Views/ViewProduct';
import Reportes from './App/Modules/Account/Views/Reportes';
import ShowSale from './App/Modules/Sales/Views/ShowSale';
import ViewAccount from './App/Modules/Account/Views/ViewAccount';
import EditAccount from './App/Modules/Account/Views/EditAccount';
import ShowSocial from './App/Modules/Account/Views/ShowSocial';
import ShowCampaign from './App/Modules/Account/Views/ShowCampaign';
import ProductCategory from './App/Modules/Catalog/Views/ProductCategory';
import Invitado from './App/Modules/Partner/Views/Invitado';
import EditCatalog from './App/Modules/Catalog/Views/EditCatalog';
import ProductStatus from './App/Modules/Home/Views/ProductStatus';
import ProductPrices from './App/Modules/Home/Views/ProductPrices';
import ProductPos from './App/Modules/Home/Views/ProductPos';
import ProductAttributes from './App/Modules/Home/Views/ProductAttributes';
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
        <Stack.Screen name="Invitado" component={Invitado} options={{headerShown: true,title: ""}} />
        <Stack.Screen name="ShowCatalog" component={ShowCatalog} options={{headerShown: true,title: ""}} />
        <Stack.Screen name="NewCategory" component={NewCategory} options={{headerShown: true,title: "Nueva categoría"}} />
        <Stack.Screen name="ShowCategory" component={ShowCategory} options={{headerShown: true,title: ""}} />
        <Stack.Screen name="EditCategory" component={EditCategory} options={{headerShown: true,title: "Editar categoría"}} />
        <Stack.Screen name="ShowProduct" component={ShowProduct} options={{headerShown: true,title: ""}} />
        <Stack.Screen name="NewSupportTechnical" component={NewST} options={{headerShown: true,title: "Ticket de Soporte"}} />
        <Stack.Screen name="NewImprovements" component={NewIM} options={{headerShown: true,title: "Buzón de mejoras"}} />
        <Stack.Screen name="ViewProduct" component={ViewProduct} options={{headerShown: true,title: ""}} />
        <Stack.Screen name="Reportes" component={Reportes} options={{headerShown: true,title: ""}} />
        <Stack.Screen name="ShowSale" component={ShowSale} options={{headerShown: false,title: ""}} />
        <Stack.Screen name="ViewAccount" component={ViewAccount} options={{headerShown: false,title: ""}} />
        <Stack.Screen name="EditAccount" component={EditAccount} options={{headerShown: false,title: ""}} />
        <Stack.Screen name="ShowSocial" component={ShowSocial} options={{headerShown: false,title: ""}} />
        <Stack.Screen name="ShowCampaign" component={ShowCampaign} options={{headerShown: false,title: ""}} />
        <Stack.Screen name="ProductCategory" component={ProductCategory} options={{headerShown: false,title: ""}} />
        <Stack.Screen name="EditCatalog" component={EditCatalog} options={{headerShown: true,title: "Editar catálogo"}} />
        <Stack.Screen name="ProductStatus" component={ProductStatus} options={{headerShown: true,title: ""}} />
        <Stack.Screen name="ProductPrices" component={ProductPrices} options={{headerShown: true,title: ""}} />
        <Stack.Screen name="ProductPos" component={ProductPos} options={{headerShown: true,title: ""}} />
        <Stack.Screen name="ProductAttributes" component={ProductAttributes} options={{headerShown: true,title: ""}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}