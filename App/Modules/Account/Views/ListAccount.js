import React from 'react';  
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import {Page} from "./../../../Themes/Dismac/ThemeDismac";
import { Badge } from 'react-native-paper';

/** Components */
import SearchBox from '../../../Components/Button/SearchBox';
import SearchInit from '../Helper/SearchInit';
import Searching from '../Helper/Searching';

class ListAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style : props.style,
            data: props.data,
            accounts: [],
            search: "",
            searching: false
        };
    }

    componentDidMount(){
        //
    }
    
    searchAccount(text){
        this.setState({
            search: text,
            searching: text.length == 0 ? false : true
        });
    }

    render() {
        return(
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 20,paddingBottom: 20,paddingLeft: 5, paddingRight: 5}}>
                <View style={{backgroundColor: Page.background, padding: 10,borderRadius: 5}}>
                    <SearchBox Label={"Cuentas"} ChangeText={(text) => this.searchAccount(text)} /> 
                </View>
                {this.state.searching == false && this.state.search.length == 0 && (<SearchInit />)}
                {this.state.searching == true && (<Searching />)}
            </ScrollView>
        );
    }
}
export default ListAccount;