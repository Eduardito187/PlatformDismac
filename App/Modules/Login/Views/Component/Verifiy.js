import * as React from 'react';
import {Text, Modal, View, Switch} from 'react-native';
import { Button } from 'react-native-paper';
import InputVerification from './InputVerification';
import TimePercent from '../../../../Components/TimePercent';
import { modalContainerStyle,modalStyle,titleStyle,bordePlomo,BTN,BTNText,h70,textLine } from '../../Style/css';

const Verify = ({isModalOpen, setIsModalOpen, Error, Success, percent}) => {
  const [helper, SetHelper] = React.useState(null);
  function ErrorOK() {
    SetHelper(true);
    setIsModalOpen(true);
    Error();
  }
  function SuccessOK() {
    SetHelper(false);
    setIsModalOpen(false);
    Success();
  }
  function loadInterval(a) {
    ErrorOK();
  }
  function cancelBTN() {
    setIsModalOpen(false);
    Error();
  }
  return (
    <>
      <Modal visible={isModalOpen} transparent={true} animationType={'slide'}>
        <View style={modalContainerStyle}>
          <View style={[modalStyle,bordePlomo]}>
            {
              percent && (<TimePercent End={(res) => loadInterval(res)} />)
            }
            <Text style={titleStyle}>Verificacion</Text>
            <Text style={textLine}>Se envio un codigo de confirmacion a su correo electronico, digitarlo para proceder con el registro.</Text>
            <View style={h70}>
              <InputVerification errorHelper={() => ErrorOK()} successHelper={() => SuccessOK()} />
            </View>
            {
              helper && (
                <Text style={textLine}>Codigo erroneo</Text>
              )
            }
            <Button mode="contained" style={BTN} onPress={() => cancelBTN()}>
              <Text style={BTNText}>Cancelar</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Verify;