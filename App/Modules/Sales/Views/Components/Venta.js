import React from 'react';  
import { Card, Button, Text } from 'react-native-paper';

/** Components */
import LoadItem from '../../../../Components/LoadItem';
import TwoColumn from '../../../Catalog/Views/Components/TwoColumn';
import { windowWidth } from '../../../../Helpers/GetMobil';
import { Margin_5 } from '../../../Login/Style/css';

const Venta = (props) => {
    const widthView = windowWidth - 60;
    const [Load, SetLoad] = React.useState(false);
    const [Title, SetTitle] = React.useState("");
    const [SubTitle, SetSubTitle] = React.useState("");
    const [Venta, SetVenta] = React.useState(props.venta);
    const [Customer, SetCustomer] = React.useState("");

    React.useEffect(() => {
        loadParams();
    }, []);

    function loadParams() {
        let title = Venta.address.Pais+"/"+Venta.address.Ciudad+"/"+Venta.address.Municipio;
        SetSubTitle(title);
        SetTitle(Venta.NroProforma);
        let customer = Venta.customer.nombre+" "+Venta.customer.apellido_paterno+" "+Venta.customer.apellido_materno;
        SetCustomer(customer);
        SetLoad(true);
    }

    function showSale(id) {
        props.navigation.push("ShowSale", {"id_sale": id, "socket": props.socket, "TOKEN": props.TOKEN});
    }
    
    if (Load == false) {
        return (<LoadItem />);
    }else{
        return (
            <Card key={Math.random()+'_Sale_'+Math.random()} style={Margin_5} onPress={() => showSale(Venta.id)}>
                <Card.Title title={Title} subtitle={SubTitle} />
                <Card.Content>
                    <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} child={true} label1={'IP'} label2={Venta.ip} />
                    <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} child={true} label1={'Customer'} label2={Customer} />
                    <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} child={true} label1={'Nro Control'} label2={Venta.NroControl} />
                    <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} child={true} label1={'Nro Factura'} label2={Venta.NroFactura} />
                    <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} child={true} label1={'Nro Proforma'} label2={Venta.NroProforma} />
                    <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} child={true} label1={'SubTotal'} label2={Venta.SubTotal+" Bs"} />
                    <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} child={true} label1={'Descuentos'} label2={Venta.Descuentos+" Bs"} />
                    <TwoColumn width={widthView} column1={widthView*0.75} column2={widthView*0.25} child={true} label1={'Total'} label2={Venta.Total+" Bs"} />
                </Card.Content>
            </Card>
        );
    }
};

export default Venta;