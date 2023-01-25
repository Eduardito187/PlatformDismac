import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBox = (props) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
        <Searchbar placeholder={props.Label} onChangeText={(text) => {
            setSearchQuery(text);
            props.ChangeText(text);
        }} value={searchQuery} />
    );
};

export default SearchBox;