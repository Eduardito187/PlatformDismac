import React from 'react';
import { ScrollView, View } from 'react-native';
import { Section_Sale } from '../../Login/Style/style';
import { Section_Flex_Width } from '../../Login/Style/css';
import OptionSale from '../../Catalog/Views/Components/OptionSale';
import LoadingPage from '../../Home/Views/Components/LoadingPage';

const Envio = ({route, navigation }) => {
    const { Venta } = route.params;
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        getDataApi();
    }, []);

    function getDataApi(){
        setLoading(true);
    }

    if (loading === false || Venta == null) {
        return (<LoadingPage />);
    }else{
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={Section_Sale}>
                    <OptionSale margin={true} icon={"map"} title={"País"} value={Venta.address.Pais} />
                    <OptionSale margin={true} icon={"map"} title={"Ciudad"} value={Venta.address.Ciudad} />
                    <OptionSale margin={true} icon={"map"} title={"Municipio"} value={Venta.address.Municipio} />
                    <OptionSale margin={true} icon={"map"} title={"Dirección"} value={Venta.address.address_extra.address} />
                    <OptionSale margin={true} icon={"map"} title={"Dirección adicional"} value={Venta.address.address_extra.extra} />
                </View>
            </ScrollView>
        );
    }
};
export default Envio;