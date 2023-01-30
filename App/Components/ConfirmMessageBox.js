import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';

const ConfirmMessageBox = (props) => {
    return (
        <Provider>
            <View>
                <Portal>
                <Dialog visible={props.ShowMessage} onDismiss={() => props.CloseMessage()}>
                    <Dialog.Title>{props.Title}</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{props.Text}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => props.Cancelar()}>Cancelar</Button>
                        <Button onPress={() => props.Confirmar()}>Confirmar</Button>
                    </Dialog.Actions>
                </Dialog>
                </Portal>
            </View>
        </Provider>
    );
};

export default ConfirmMessageBox;