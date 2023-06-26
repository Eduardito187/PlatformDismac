import { TextInput, View } from "react-native";
import React,{ useRef } from "react";
import { Section_Content_Flex, Section_Row, inputValidate } from "../../Style/css";
import { GET_CODE_GENERATE } from "../../../../Helpers/API";

const InputVerification = (props) => {
    const oneInput = useRef();
    const twoInput = useRef();
    const treeInput = useRef();
    const forInput = useRef();
    const fiveInput = useRef();

    
    const [OneInput, SetOneInput] = React.useState("");
    const [TwoInput, SetTwoInput] = React.useState("");
    const [TreeInput, SetTreeInput] = React.useState("");
    const [ForInput, SetForInput] = React.useState("");

    async function validateCode(text) {
        let code = "";
        code += OneInput;
        code += TwoInput;
        code += TreeInput;
        code += ForInput;
        code += text;
        let C_code = await GET_CODE_GENERATE();
        if (C_code != null) {
            if (code == C_code) {
                props.successHelper();
            }else{
                props.errorHelper();
            }
        }
    }

    return(
        <View style={Section_Content_Flex}>
            <View style={Section_Row}>
                <TextInput style={inputValidate} onChangeText={ text => {
                    SetOneInput(text);
                    text.length > 0 ?twoInput.current.focus() :oneInput.current.blur();
                } }
                ref={oneInput} keyboardType={"number-pad"} maxLength={1} />

                <TextInput style={inputValidate} onChangeText={ text => {
                    SetTwoInput(text);
                    text.length > 0 ?treeInput.current.focus() :oneInput.current.focus();
                } }
                ref={twoInput} keyboardType={"number-pad"} maxLength={1} />

                <TextInput style={inputValidate} onChangeText={ text => {
                    SetTreeInput(text);
                    text.length > 0 ?forInput.current.focus() :twoInput.current.focus();
                } }
                ref={treeInput} keyboardType={"number-pad"} maxLength={1} />

                <TextInput style={inputValidate} onChangeText={ text => {
                    SetForInput(text);
                    text.length > 0 ?fiveInput.current.focus() :treeInput.current.focus();
                } }
                ref={forInput} keyboardType={"number-pad"} maxLength={1} />
                
                <TextInput style={inputValidate} onChangeText={ text => {
                    text.length > 0 ?validateCode(text) :forInput.current.focus();
                } }
                ref={fiveInput} keyboardType={"number-pad"} maxLength={1} />
            </View>
        </View>
    );
};

export default InputVerification;