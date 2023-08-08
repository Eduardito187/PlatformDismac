import React from 'react';
import { ScrollView, View } from 'react-native';
import { Section_Sale } from '../../Login/Style/style';
import Timeline from 'react-native-timeline-flatlist'
import OptionSale from '../../Catalog/Views/Components/OptionSale';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { PLO_DIS, RED_DIS } from '../../Login/Style/css';

const Facturacion = ({route, navigation }) => {
    const { Venta } = route.params;
    const [loading, setLoading] = React.useState(false);
    const [TimeLine, SetTimeLine] = React.useState([]);

    React.useEffect(() => {
        getDataApi();
    }, []);

    function getDataApi(){
        let time = [];
        for (let index = 0; index < Venta.history_status.length; index++) {
            time.push({time: Venta.history_status[index]["created_at"], title: "Estado", description: Venta.history_status[index]["status"]});
        }
        SetTimeLine(time);
        setLoading(true);
    }

    if (loading === false || Venta == null) {
        return (<LoadingPage />);
    }else{
        return (
            <>
                <View style={Section_Sale}>
                    <OptionSale margin={true} icon={"ballot"} title={"Nro Control"} value={Venta.NroControl} />
                    <OptionSale margin={true} icon={"ballot"} title={"Nro Factura"} value={Venta.NroFactura} />
                    <OptionSale margin={true} icon={"ballot"} title={"Nro Proforma"} value={Venta.NroProforma} />
                    <OptionSale margin={true} icon={"ballot"} title={"SubTotal"} value={Venta.SubTotal+" Bs"} />
                    <OptionSale margin={true} icon={"ballot"} title={"Descuentos"} value={Venta.Descuentos+" Bs"} />
                    <OptionSale margin={true} icon={"ballot"} title={"Total"} value={Venta.Total+" Bs"} />
                </View>
                <Timeline circleSize={20} circleColor={RED_DIS} lineColor={PLO_DIS} timeContainerStyle={{minWidth:52, marginTop: 5}} timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}} descriptionStyle={{color:'gray'}} data={TimeLine} />
            </>
        );
    }
};
export default Facturacion;