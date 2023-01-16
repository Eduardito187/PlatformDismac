import React, {useState} from 'react';
import { Button,Text } from 'react-native-paper';
import { SButton,SText,DisButton } from '../../Style/css';

const Next = (props) => {
    React.useEffect(() => {
        //
    }, []);
    function StepChange() {
        if (props.Step != null) {
            if (props.Step == 1) {
                if (props.StepFUNCTION != null) {
                    props.StepFUNCTION();
                }
            }else{
                props.StepNext();
            }
        }
    }
    return (
        <>
            <Button disabled={props.Disable} style={props.Disable ? DisButton : SButton} mode="contained" onPress={() => StepChange()}>
                <Text style={SText}>Siguente</Text>
            </Button>
        </>
    );
};

export default Next;