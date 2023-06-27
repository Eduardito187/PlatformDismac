import React, {useState} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Avatar, Card, IconButton, Badge } from 'react-native-paper';
import { Margin_Bottom_5, RED_DIS } from '../../../Login/Style/css';
/** */

const ProblemItem = (props) => {
    const [Label, SetLabel] = React.useState("");
    const [Item, SetItem] = React.useState(props.Item);

    React.useEffect(() => {
        if (Item.account != null) {
            SetLabel(Item.account.name);
        }else{
            SetLabel("--");
        }
    }, []);

    function selectionCard() {
        //
    }

    if (Item != null) {
        return(
            <Card key={Math.random()+'_PROBLEM_'+Item.id+'_CARD_'+Math.random()} style={Margin_Bottom_5} onPress={() => selectionCard()}>
                <Card.Title title={Item.title} subtitle={Item.description} left={() => <Avatar.Text size={40} label={Label} />} right={() => <Badge>{Item.time}</Badge>} />
            </Card>
        );
    }else{
        return(<ActivityIndicator size="large" color={RED_DIS} />);
    }
};
export default ProblemItem;