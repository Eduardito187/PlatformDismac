import React from 'react';
import { ScrollView, View } from 'react-native';
import { Section_Sale } from '../../Login/Style/style';
import OptionSale from '../../Catalog/Views/Components/OptionSale';
import LoadingPage from '../../Home/Views/Components/LoadingPage';

const Cliente = ({route, navigation }) => {
    const { Venta } = route.params;
    const [loading, setLoading] = React.useState(false);
    const [Customer, SetCustomer] = React.useState("");
    const [CustomerData, SetCustomerData] = React.useState(null);

    React.useEffect(() => {
        getDataApi();
    }, []);

    function getDataApi(){
        SetCustomerData(Venta.customer);
        let customer = Venta.customer.nombre+" "+Venta.customer.apellido_paterno+" "+Venta.customer.apellido_materno;
        SetCustomer(customer);
        setLoading(true);
    }

    if (loading === false || Venta == null || CustomerData == null) {
        return (<LoadingPage />);
    }else{
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={Section_Sale}>
                    <OptionSale margin={true} icon={"account"} title={"Nombre completo"} value={Customer} />
                    <OptionSale margin={true} icon={"mail"} title={"Email"} value={CustomerData.email} />
                    <OptionSale margin={true} icon={"mail"} title={"Telefono"} value={CustomerData.num_telefono} />
                    <OptionSale margin={true} icon={"mail"} title={"Nro documento"} value={CustomerData.num_documento} />
                    <OptionSale margin={true} icon={"mail"} title={"Tipo de documento"} value={CustomerData.tipo_documento} />
                    <OptionSale margin={true} icon={"ip"} title={"Ip"} value={Venta.ip} />
                </View>
            </ScrollView>
        );
    }
};
export default Cliente;