import { TextInput, View } from "react-native";
import React,{ useRef } from "react";
import { inputValidate } from "../../Style/css";

const InputVerification = (props) => {
    const oneInput = useRef();
    const twoInput = useRef();
    const treeInput = useRef();
    const forInput = useRef();
    const fiveInput = useRef();

    return(
        <View style={{flex: 1, justifyContent: "center", alignContent: "center"}}>
            <View style={{flexDirection: "row"}}>
                <TextInput style={inputValidate} onChangeText={ text => {
                    text.length > 0 ?twoInput.current.focus() :oneInput.current.blur();
                } }
                ref={oneInput} keyboardType={"number-pad"} maxLength={1} />

                <TextInput style={inputValidate} onChangeText={ text => {
                    text.length > 0 ?treeInput.current.focus() :oneInput.current.focus();
                } }
                ref={twoInput} keyboardType={"number-pad"} maxLength={1} />

                <TextInput style={inputValidate} onChangeText={ text => {
                    text.length > 0 ?forInput.current.focus() :twoInput.current.focus();
                } }
                ref={treeInput} keyboardType={"number-pad"} maxLength={1} />

                <TextInput style={inputValidate} onChangeText={ text => {
                    text.length > 0 ?fiveInput.current.focus() :treeInput.current.focus();
                } }
                ref={forInput} keyboardType={"number-pad"} maxLength={1} />
                
                <TextInput style={inputValidate} onChangeText={ text => {
                    text.length > 0 ?console.log("ok") :forInput.current.focus();
                } }
                ref={fiveInput} keyboardType={"number-pad"} maxLength={1} />
            </View>
        </View>
    );
};

export default InputVerification;