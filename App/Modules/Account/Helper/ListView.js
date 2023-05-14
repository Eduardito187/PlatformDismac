import React, {useState} from 'react';
/** */
import CountResult from '../../../Components/Result/CountResult';
import Account from './Account';
import ResultNone from './ResultNone';

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
                            <Account key={Math.random()+'_ACCOUNT_'+Math.random()} Account={account} />
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