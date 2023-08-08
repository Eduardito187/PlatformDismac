import React, {useState} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
/** */
import { ItemCodeScrollLeft, SubTitleText, SubTitleTextWhite, contentScrollItem } from '../../../Login/Style/style';
import { Color_White, ItemContainerScrollItem, ItemCountScrollSection, PADDING_LEFT, PADDING_TOP, PADDINT_CAMPAIGN_SECTION_ONE, PADDINT_CAMPAIGN_SECTION_TREE, PADDINT_CAMPAIGN_SECTION_TWO, SECTION_COUNT_PRODUCT, WHITE } from '../../../Login/Style/css';
import { ALING_CENTER, ALING_LEFT } from '../../Style/Style';
import SocialIcons from './SocialIcons';
import DateSection from './DateSection';
import ProgressIcon from './ProgressIcon';
import { generateCustomId } from '../../../../Helpers/API';
import { Navigation } from '../../../../Helpers/Nav';

const CampaignContent = (props) => {
    const [Campaign, SetCampaign] = React.useState(props.Campaign);

    React.useEffect(() => {
        //
    }, []);
    
    function selectCampaign() {
        Navigation("ShowCampaign",{"campaign":Campaign,"TOKEN":props.TOKEN,"socket":null}, props.navigation);
    }

    return(
        <View key={generateCustomId()} style={contentScrollItem}>
            <TouchableOpacity style={ItemContainerScrollItem} onPress={() => selectCampaign()}>
                <View style={[ItemCodeScrollLeft, ALING_LEFT]}>
                    <Text style={SubTitleTextWhite}>{Campaign.name}</Text>
                </View>
                <View style={[ItemCountScrollSection, ALING_CENTER]}>
                    <View style={[SECTION_COUNT_PRODUCT, ALING_CENTER]}>
                        <Text style={SubTitleText}>{Campaign.products}</Text>
                    </View>
                </View>
                <View style={PADDINT_CAMPAIGN_SECTION_ONE}>
                    <View style={PADDING_LEFT}>
                        <Text variant="labelMedium" style={Color_White}>Redes sociales</Text>
                        <View style={PADDING_TOP}>
                            <SocialIcons items={Campaign.social} />
                        </View>
                    </View>
                </View>
                <View style={PADDINT_CAMPAIGN_SECTION_TWO}>
                    <View style={PADDING_LEFT}>
                        <DateSection date={Campaign.to_at} />
                    </View>
                </View>
                <View style={PADDINT_CAMPAIGN_SECTION_TREE}>
                    <ProgressIcon dateFrom={Campaign.from_at} dateEnd={Campaign.to_at} />
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default CampaignContent;