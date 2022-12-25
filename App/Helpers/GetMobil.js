import { Dimensions } from 'react-native';

function getDim(width) {
    if (width < 400) {
        return 200;
    }else if (width >= 400 && width < 700) {
        return 300;
    }else{
        return 350;
    }
}

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const dimLoad = getDim(windowWidth);