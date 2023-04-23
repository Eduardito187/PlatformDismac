import React, {useState} from 'react';
/** */
import CountResult from '../../../../Components/Result/CountResult';
import ProductComponent from './ProductComponent';
import ResultNone from '../../../Account/Helper/ResultNone';

const ListProduct = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.Product.length > 0) {
        return(
            <>
                <CountResult Count={props.Product.length} />
                {
                    props.Product.map((product) => {
                        return (
                            <ProductComponent key={Math.random()+'_Product_'+Math.random()} TOKEN={props.TOKEN} Product={product} />
                        )
                    })
                }
            </>
        );
    }else{
        return(<ResultNone />);
    }
};
export default ListProduct;