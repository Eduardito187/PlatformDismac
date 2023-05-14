import React, {useState} from 'react';
import { View, Text } from 'react-native';
/** */
import { Chip, IconButton } from 'react-native-paper';
import { COLUMN_ONE, COLUMN_TWO, CONTENT_LIST_VIEW, RED_DIS, ROW_SECTION_VIEW, SECTION_RIGHT_LIST, WHITE } from '../../../Login/Style/css';
import { column, displayFlex } from '../../../Catalog/Style/Two';
import { SAVE_VIEW_PRODUCTS } from '../../../../Helpers/API';
import { LISTA, MOSAICO } from '../../../../Helpers/Code';

const ListView = (props) => {
    const [VIEW, SETVIEW] = React.useState(props.VIEW);

    React.useEffect(() => {
        //
    }, []);

    async function changeViewItems(view){
        view = String(view);
        SETVIEW(view);
        props.ChangeView(view);
        await SAVE_VIEW_PRODUCTS(view);
    }

    return(
        <View style={CONTENT_LIST_VIEW}>
            <View style={SECTION_RIGHT_LIST}>
                <View style={[ROW_SECTION_VIEW,displayFlex]}>
                    <View style={[COLUMN_ONE,column]}>
                        <IconButton icon="format-list-bulleted-square" iconColor={VIEW == LISTA ? WHITE : RED_DIS} style={{backgroundColor: VIEW == LISTA ? RED_DIS : WHITE}} size={28} onPress={() => changeViewItems(LISTA)} />
                    </View>
                    <View style={[COLUMN_TWO,column]}>
                        <IconButton icon="apps" iconColor={VIEW == MOSAICO ? WHITE : RED_DIS} style={{backgroundColor: VIEW == MOSAICO ? RED_DIS : WHITE}} size={28} onPress={() => changeViewItems(MOSAICO)} />
                    </View>
                </View>
            </View>
        </View>
    );
};
export default ListView;