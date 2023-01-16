import React, {useState} from 'react';
import { URL_API,GET_HEADERS,CREATE_BODY_CITY } from '../../../../Helpers/API';
import axios from "axios";
/** Components */
import DropDownPicker from 'react-native-dropdown-picker';
/** */

const Country = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    function convertGetAPI(obj) {
        let items = [];
        for (let index = 0; index < obj.length; index++) {
            items.push({
                "label" : obj[index]["name"],
                "value" : obj[index]["id"]
            });
        }
        setItems(items);
    }
    async function getTypeApi() {
        if (props.type == "CO") {
            axios.get(URL_API("country"),GET_HEADERS()).then(res => {
                convertGetAPI(res.data);
                setValue(res.data[0]["id"]);
                if (props.changed != null) {
                    props.changed(res.data[0]["id"]);
                }
            }).catch(err => {
                convertGetAPI([]);
            });
        }else if (props.type == "DP") {
            axios.get(URL_API("city"),GET_HEADERS()).then(res => {
                convertGetAPI(res.data);
            }).catch(err => {
                convertGetAPI([]);
            });
        }else if (props.type == "PV" && props.Query != null) {
            axios.post(URL_API("municipality"),CREATE_BODY_CITY(props.Query),GET_HEADERS()).then(res => {
                convertGetAPI(res.data);
            }).catch(err => {
                convertGetAPI([]);
            });
        }
    }
    function openDropDown(val){
        if (props.Open != null) {
            props.Open(val);
        }
        setOpen(val);
    }
    function selectOption(val) {
        //val is function
        setValue(val);
        if (props.changed != null) {
            props.changed(val());
        }
    }
    React.useEffect(() => {
        getTypeApi();
    }, []);
    return (
        <>
            {
                props.hide == false && (
                    <DropDownPicker disabled={props.Disable} open={open} value={value} items={items} setOpen={(value) => openDropDown(value)} setValue={(value) => selectOption(value)} setItems={setItems} />
                )
            }
        </>
    );
};

export default Country;