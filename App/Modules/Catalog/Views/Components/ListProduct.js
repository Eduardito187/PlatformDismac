import React, {useState} from 'react';
import { View } from 'react-native';
/** */
import CountResult from '../../../../Components/Result/CountResult';
import ProductComponent from './ProductComponent';
import ResultNone from '../../../Account/Helper/ResultNone';
import ListView from '../../../Product/Views/Components/ListView';
import { windowWidth } from '../../../../Helpers/GetMobil';
import { LISTA, itemsListProductsWidth } from '../../../../Helpers/Code';
import { displayFlex } from '../../Style/Two';
import LoadItem from '../../../../Components/LoadItem';
import { generateCustomId } from '../../../../Helpers/API';

const ListProduct = (props) => {
    const [VIEW, SETVIEW] = React.useState(props.VIEW);
    const [WIDTH, SETWIDTH] = React.useState(0);
    const [Dimension, SetDimension] = React.useState(null);
    const [Invitado, SetInvitado] = React.useState(props.invitado);

    React.useEffect(() => {
        changeScreenDevice(VIEW);
    }, []);

    function changeScreenDevice(value) {
        let width = windowWidth-10;
        SETWIDTH(width);
        let COLUMN_ONE = 0;
        let COLUMN_TWO = 0;
        let image = {};
        if (value == LISTA) {
            width = width - 10;
            COLUMN_ONE = Math.round((100 * 100) / width);
            COLUMN_TWO = Math.round(((width-100) * 100) / width);
            image = {width: 80, height: 120};
        }else {
            width = itemsListProductsWidth(width);
            COLUMN_ONE = 100;
            COLUMN_TWO = 100;
            image = {width: "100%", height: 180};
        }
        SetDimension({
            "SCREEN_WIDTH" : width,
            "COLUMN_ONE" : COLUMN_ONE,
            "COLUMN_TWO" : COLUMN_TWO,
            "IMAGE" : image
        });
    }

    function changeViewList(a) {
        changeScreenDevice(a);
        SETVIEW(a);
    }

    if (props.Product.length > 0) {
        return(
            <View>
                <CountResult Count={props.Product.length} />
                <ListView VIEW={VIEW} ChangeView={(a) => changeViewList(a)} />
                {
                    Dimension == null
                    ? <LoadItem />
                    : (
                        <View style={[displayFlex,{width: WIDTH}]}>
                            {
                                props.Product.map((product) => {
                                    return (
                                        <ProductComponent key={generateCustomId()} invitado={Invitado} IMAGE={Dimension.IMAGE} SCREEN_WIDTH={Dimension.SCREEN_WIDTH} COLUMN_ONE={Dimension.COLUMN_ONE} COLUMN_TWO={Dimension.COLUMN_TWO} TOKEN={props.TOKEN} VIEW={VIEW} Product={product} />
                                    )
                                })
                            }
                        </View>
                    )
                }
            </View>
        );
    }else{
        return(<ResultNone />);
    }
};
export default ListProduct;