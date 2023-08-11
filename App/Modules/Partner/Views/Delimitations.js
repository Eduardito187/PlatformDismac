import React from 'react';  
import { View, SafeAreaView } from 'react-native';
import axios from 'axios';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { Flex_Section, RED_DIS } from '../../Login/Style/css';
import { StatusBar } from 'expo-status-bar';
import LoadingPage from '../../Home/Views/Components/LoadingPage';
import { Section_Flex } from '../../Login/Style/style';
import { getLocalization } from '../../../Helpers/Code';
import { GET_HEADER_TOKEN, URL_API, generateCustomId } from '../../../Helpers/API';

const Delimitations = ({route, navigation }) => {
    const { TOKEN, MiUbi } = route.params;
    const [loading, setLoading] = React.useState(false);
    const [Delimitations, SetDelimitations] = React.useState([]);
    const [Municipios, SetMunicipios] = React.useState([]);
    const [Poligonos, SetPoligonos] = React.useState(null);

    React.useEffect(() => {
        getDelimitations();
    }, []);

    async function getDelimitations() {
        axios.get(URL_API("partner/delimitations"),GET_HEADER_TOKEN(TOKEN)).then(res => {
            if(res.data != null){
                SetDelimitations(res.data.response.delimitation);
                setLoading(true);
                loadPolygons(res.data.response.municipios);
            }
        }).catch(err => {});
    }

    function loadPolygons(data){
        let poli = [];
        /*
        poli.push(<Polygon key={generateCustomId()} coordinates={data[0]} fillColor="rgba(100, 200, 255, 0.5)" strokeColor="black" strokeWidth={1}/>);
        poli.push(<Polygon key={generateCustomId()} coordinates={data[1]} fillColor="rgba(100, 200, 255, 0.5)" strokeColor="black" strokeWidth={1}/>);
        poli.push(<Polygon key={generateCustomId()} coordinates={data[2]} fillColor="rgba(100, 200, 255, 0.5)" strokeColor="black" strokeWidth={1}/>);
        poli.push(<Polygon key={generateCustomId()} coordinates={data[3]} fillColor="rgba(100, 200, 255, 0.5)" strokeColor="black" strokeWidth={1}/>);
        */
        data.forEach(element => {
            poli.push(<Polygon key={generateCustomId()} coordinates={element} fillColor="rgba(100, 200, 255, 0.5)" strokeColor="black" strokeWidth={1}/>);
        });
        /*
        for (let index = 0; index < data.length; index++) {
            poli.push(<Polygon key={generateCustomId()} coordinates={data} fillColor="rgba(100, 200, 255, 0.5)" strokeColor="black" strokeWidth={1}/>);
        }
        */
        SetPoligonos(poli);
    }

    if (loading === false) {
        return (<LoadingPage />);
    }else{
        return (
            <SafeAreaView style={Section_Flex}>
                <MapView style={Flex_Section} key={generateCustomId()} initialRegion={MiUbi} showsUserLocation={true}>
                    {
                        Delimitations.map((state) => {
                            return (<Marker key={generateCustomId()} coordinate={state} />)
                        })
                    }
                    {Poligonos}
                </MapView>
                <StatusBar backgroundColor={RED_DIS} style="light" />
            </SafeAreaView>
        );
    }
};

export default Delimitations;