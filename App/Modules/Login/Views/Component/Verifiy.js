import * as React from 'react';
import {Text, Modal, View, Button, Switch} from 'react-native';
import InputVerification from './InputVerification';

const Verify = ({isModalOpen, setIsModalOpen}) => {

  return (
    <>
      <Modal visible={isModalOpen} transparent={true} animationType={'slide'}>
        <View style={modalContainerStyle}>
          <View style={[modalStyle,{borderColor: '#808080',borderWidth: 1}]}>
            <Text style={titleStyle}>Verificacion</Text>
            <Text style={{color: 'black',fontSize: 13,fontWeight: '400'}}>Se envio un codigo de confirmacion a su correo electronico, digitarlo para proceder con el registro.</Text>
            <View style={{height: 70}}>
                <InputVerification />
            </View>
            <Button
              title="Close and save"
              onPress={() => setIsModalOpen(!setIsModalOpen)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};


const modalContainerStyle = {
    flex: 1,
    justifyContent: 'flex-end',
};
const modalStyle = {
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 20,
    borderRadius: 16,
    paddingHorizontal: 30,
    paddingVertical: 20,
    shadowColor: '#808080',
    shadowOffset: {width: 2, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
};
const titleStyle = {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
};
const optionTextStyle = {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
};
const optionContainer = {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
};

export default Verify;