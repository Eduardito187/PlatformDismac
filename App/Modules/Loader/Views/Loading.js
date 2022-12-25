import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, StyleSheet} from 'react-native';

/** Components */
import ProgressDismac from '../../../Components/ProgressDismac';
import LogoDismac from '../../../Components/LogoDismac';
import ImgDis from '../../../Components/ImgDis';
/** */

const Loading = ({route, navigation }) => {
  React.useEffect(() => {
    //
  }, []);
  function loadInterval(res) {
    if (res) {
      navigation.navigate('Home')
    }
  }
    return (
        <View style={styles.container}>
          <ImgDis style={{width: 100,height: 100,marginBottom: 5}} animation={{border: 10, time: 2000}} />
          <ProgressDismac End={(res) => loadInterval(res)} />
          <View style={{position: 'absolute', bottom: 30}}>
            <LogoDismac style={{width: 150,height: 40}} />
          </View>
          <Text style={{position: 'absolute', bottom: 10, fontWeight: 'bold'}}>V 1.0</Text>
          <StatusBar style="auto" />
        </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
});

export default Loading;