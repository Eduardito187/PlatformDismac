import React, {useState} from 'react';
/** */
import CountResult from '../../../Components/Result/CountResult';
import Catalog from './Catalog';
import ResultNone from './ResultNone';

const ListCatalog = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.Catalog.length > 0) {
        return(
            <>
                <CountResult Count={props.Catalog.length} />
                {
                    props.Catalog.map((catalog) => {
                        return (
                            <Catalog key={Math.random()+'_Catalog_'+Math.random()} roles={props.roles} TOKEN={props.TOKEN} Catalog={catalog} type={props.type} />
                        )
                    })
                }
            </>
        );
    }else{
        return(<ResultNone />);
    }
};
export default ListCatalog;