import React, {useState} from 'react';
/** */
import Category from './Category';
import ResultNone from '../../../Account/Helper/ResultNone';
import { generateCustomId } from '../../../../Helpers/API';

const CategoryList = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.Categorys.length > 0) {
        return(
            <>
                {
                    props.Categorys.map((category) => {
                        return (
                            <Category key={generateCustomId()} width={props.width} TOKEN={props.TOKEN} Category={category} />
                        )
                    })
                }
            </>
        );
    }else{
        return(<ResultNone />);
    }
};
export default CategoryList;