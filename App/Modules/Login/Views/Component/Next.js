import React, {useState} from 'react';
import { Button,Text } from 'react-native-paper';
import { SButton,SText,DisButton } from '../../Style/css';
import { Route } from '../../Interfaces/Route';

const Next = (props) => {
    React.useEffect(() => {
        //
    }, []);
    function StepChange() {
        if (props.Step != null) {
            if (props.Step == 1 || props.Step == 6) {
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
                <Text style={SText}>
                    {
                        Route.length == props.Step
                        ? "Finalizar"
                        : "Siguente"
                    }
                </Text>
            </Button>
        </>
    );
};

export default Next;