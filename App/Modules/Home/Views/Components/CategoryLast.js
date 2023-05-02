import React, {useState} from 'react';
import { ScrollView, Text } from 'react-navigation';
import { windowWidth } from '../../../../Helpers/GetMobil';
/** */


const CategoryLast = (props) => {
    React.useEffect(() => {
        //
    }, []);
    if (props.categorys.length > 0) {
        return(
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {
                props.categorys.map((category) => {
                    return (
                        <Text key={Math.random()+'_Category_Item_'+Math.random()}>HOLA</Text>
                    )
                })
            }
            </ScrollView>
        );
    }else{
        return(null);
    }
};
export default CategoryLast;