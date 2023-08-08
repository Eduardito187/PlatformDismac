import React from 'react';
import { ScrollView, View } from 'react-native';
import { Section_Sale } from '../../Login/Style/style';
import OptionTable from '../../Catalog/Views/Components/OptionTable';
import ProductOption from '../../Catalog/Views/Components/ProductOption';
import { generateCustomId } from '../../../Helpers/API';
import LoadingPage from '../../Home/Views/Components/LoadingPage';

const ProductList = ({route, navigation }) => {
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
                <View style={[Section_Sale]}>
                    {Venta.detail_order != null && Venta.detail_order.length > 0 && (<OptionTable left={"Producto"} right={"Precio"} />)}
                    {Venta.detail_order.map((item) => {return (<ProductOption key={generateCustomId()} Product={item} />)})}
                    <OptionTable left={"SubTotal"} right={Venta.SubTotal+" Bs"} />
                    <OptionTable left={"Descuentos"} right={"-"+Venta.Descuentos+" Bs"} />
                    <OptionTable left={"Total"} right={Venta.Total+" Bs"} />
                </View>
            </ScrollView>
        );
    }
};
export default ProductList;