import { CommonActions } from '@react-navigation/native';

export function ResetNavigation(URL, PARAMS, navigation) {
    navigation.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [
                {
                    name: URL,
                    params: PARAMS
                }
            ]
        })
    );
}