import React, {useState} from 'react';
/** */
import Category from './Category';
import ResultNone from '../../../Account/Helper/ResultNone';

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
                            <Category key={Math.random()+'_Category_'+Math.random()} width={props.width} TOKEN={props.TOKEN} Category={category} />
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