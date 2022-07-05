
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useSelector } from 'react-redux';

const Scanning = () => {  
  const [genericError, setGenericError] = useState(false);
  const [errorExpired, setErrorExpired] = useState(false);
  const [errorSemAgendamento, setErrorSemAgendamento] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const {id_user} = useSelector(state => state.dataUser); 

    const reader = async (res) => {
      const idRoom = res.data.split('confirm=')[1];

      await fetch('https://monitoracovid-backend.herokuapp.com/enter-room', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_room: idRoom,
          id_user: id_user,
        }),
      })
        .then(res => res.text())
        .then(data => {
          if (data === 'O prazo de entrada está expirado!') {
            setErrorExpired(true);
          } else if (data === 'Não existe reserva para esse usuário e essa sala!') {
            setErrorSemAgendamento(true);
          } else {
            setErrorSemAgendamento(false);
            setErrorExpired(false);
            setGenericError(false);
            setSuccessful(true);
          }
        })
        .catch(err => {
          setGenericError(true);
        });
    }

    return (
      <QRCodeScanner
        onRead={reader}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={
          <View>
            <Text>Posicione a câmera no QR Code da sala!</Text>
          </View>
        }
        bottomContent={
          <View>
            {errorExpired ? (
              <Text style={{color: 'red'}}>O prazo está expirado! Sua reserva foi deletada.</Text>
            ) : null}
            {successful ? (
              <Text style={{color: 'green'}}>Entrada liberada!</Text>
            ) : null}
            {genericError ? (
              <Text style={{color: 'red'}}>Ocorreu um erro. Tente ler o QR Code novamente!</Text>
            ): null}
            {errorSemAgendamento ? (
              <Text style={{color: 'red'}}>Não existe reserva para esse usuário e essa sala!</Text>
            ): null}
          </View>
        }
      />
    );
};

const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
  });

export default Scanning;