import React, {useState} from 'react';
import { Button,Text } from 'react-native-paper';
import { SButton,SText } from '../../Style/css';

const Next = (props) => {
    React.useEffect(() => {
        //
    }, []);
    return (
        <>
            <Button disabled={props.Disable} style={SButton} mode="contained" onPress={() => props.StepNext()}>
                <Text style={SText}>Siguente</Text>
            </Button>
        </>
    );
};

export default Next;