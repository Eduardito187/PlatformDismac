import React, {useState} from 'react';
/** */
import { Image } from 'react-native';
import { CONATIN_RESIZE } from '../Modules/Catalog/Style/Row';

const ImageUrl = (props) => {
    React.useEffect(() => {
        //
    }, []);
    return(
        <>
            <Image style={[props.style, CONATIN_RESIZE]} source={{uri: props.url}} />
        </>
    );
};
export default ImageUrl;