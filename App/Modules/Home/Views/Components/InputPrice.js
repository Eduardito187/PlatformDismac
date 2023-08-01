import React, {useState} from 'react';
/** */
import { Text, View } from 'react-native';
import { AlingFormItem, Margin_Top, RowFormNoPadding, TitleSub } from '../../../Login/Style/style';
import { Padding_10_B_5 } from '../../../../Themes/Dismac/ThemeDismac';
import Subtitle from '../../../../Components/Subtitle';
import { TextInput } from 'react-native-paper';

const InputPrice = (props) => {
    const [Store, SetStore] = React.useState("");
    const [Code, SetCode] = React.useState("");
    const [Price, SetPrice] = React.useState(0);
    const [SpecialPrice, SetSpecialPrice] = React.useState(0);
    const [PriceComponent, SetPriceComponent] = React.useState(null);
    const [SpecialPriceComponent, SetSpecialPriceComponent] = React.useState(null);

    React.useEffect(() => {
        loadAttributes();
    }, []);

    function loadAttributes() {
    }

    function updatePrice(value) {
        SetPrice(value);
    }

    function updateSpecialPrice(value) {
        SetSpecialPrice(value);
    }

    return(
        <View key={Math.random()+'_Prices_'+Math.random()} style={Padding_10_B_5}>
            <View style={AlingFormItem}>
                <View style={RowFormNoPadding}>
                    <Subtitle style={TitleSub} text={props.name} />
                </View>
                <View style={RowFormNoPadding}>
                    <TextInput keyboardType="phone-pad" mode="outlined" placeholder="Price" selectionColor="rgba(0, 0, 0, 0.5)" 
                        underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427" 
                        value={props.price} onChangeText={(text) => updatePrice(text)} />
                </View>
                <View style={[RowFormNoPadding, Margin_Top]}>
                    <TextInput keyboardType="phone-pad" mode="outlined" placeholder="Special Price" selectionColor="rgba(0, 0, 0, 0.5)" 
                        underlineColor="#EC2427" activeUnderlineColor="#EC2427" textColor="#EC2427" activeOutlineColor="#EC2427" 
                        value={props.special_price} onChangeText={(text) => updateSpecialPrice(text)} />
                </View>
            </View>
        </View>
    );
};
export default InputPrice;