import React from 'react';
import { View, ScrollView } from 'react-native';
import axios from 'axios';
import { windowWidth } from '../../../Helpers/GetMobil';

/** Components */
import ChartDynamic from '../../Home/Views/Components/ChartDynamic';
import ChartPie from '../../Home/Views/Components/ChartPie';
import ChartTarget from '../../Home/Views/Components/ChartTarget';
import { Scroll_Section } from '../../Login/Style/css';
import { GET_HEADER_TOKEN, URL_API } from '../../../Helpers/API';
import LoadingPage from '../../Home/Views/Components/LoadingPage';

const ReporteGraphics = ({ route, navigation }) => {
    const { TOKEN, CODE, TYPE } = route.params;
    const [Semanal, SetSemanal] = React.useState([]);
    const [Mensual, SetMensual] = React.useState([]);
    const [Anual, SetAnual] = React.useState([]);
    const [Loading, SetLoading] = React.useState(false);

    React.useEffect(() => {
        getAnalytics();
    }, []);

    const getListAnalyticsEvent = async (code, type, token, url) => {
        try {
            const body = {
                type: type,
                code: code
            };

            const response = await axios.post(
                URL_API(url),
                body,
                GET_HEADER_TOKEN(token)
            );

            if (response.data?.response) {
                return response.data.response;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };

    async function getAnalytics() {
        SetSemanal(await getListAnalyticsEvent(CODE, TYPE, TOKEN, "partner/generateAnalyticsReportDays"));
        SetMensual(await getListAnalyticsEvent(CODE, TYPE, TOKEN, "partner/generateAnalyticsReportMonths"));
        SetAnual(await getListAnalyticsEvent(CODE, TYPE, TOKEN, "partner/generateAnalyticsReportYear"));
        SetLoading(true);
    }

    if (Loading == false) {
        return (<LoadingPage />);
    } else {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={Scroll_Section}>
                <ChartDynamic width={windowWidth - 20} height={250} navigation={navigation} TOKEN={TOKEN} data={Anual} />
                <ChartPie width={windowWidth - 20} height={250} navigation={navigation} TOKEN={TOKEN} data={Semanal} />
                <ChartTarget width={windowWidth - 20} height={250} navigation={navigation} TOKEN={TOKEN} data={Mensual} />
            </ScrollView>
        );
    }
};

export default ReporteGraphics;