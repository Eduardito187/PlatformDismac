import React, {useState} from 'react';
/** */
import CountResult from '../../../Components/Result/CountResult';
import Catalog from './Catalog';
import ResultNone from './ResultNone';
import { generateCustomId } from '../../../Helpers/API';

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
                            <Catalog key={generateCustomId()} route={props.route ?? null} navigation={props.navigation ?? null} roles={props.roles} TOKEN={props.TOKEN} Catalog={catalog} type={props.type} />
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