import React, {useState} from 'react';
/** */
import CountResult from '../../../Components/Result/CountResult';
import Account from './Account';
import ResultNone from './ResultNone';
import { generateCustomId } from '../../../Helpers/API';

const ListView = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.Account.length > 0) {
        return(
            <>
                <CountResult Count={props.Account.length} />
                {
                    props.Account.map((account) => {
                        return (
                            <Account key={generateCustomId()} roles={props.roles} reloadAccounts={() => props.reloadAccounts()} TOKEN={props.TOKEN} navigation={props.navigation} Account={account} />
                        )
                    })
                }
            </>
        );
    }else{
        return(<ResultNone />);
    }
};
export default ListView;