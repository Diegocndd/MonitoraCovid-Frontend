import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Footer';
import { useSelector, useDispatch } from 'react-redux';

const Agendamento = () => {
  const person = useSelector(state => state.dataUser); 

  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);

  const searchRoom = (idRoom) => {
    let name = '';

    rooms.forEach(item => {
      if (item.id_room === idRoom) {
        name = item.name;
      }
    });

    return name;
  }

  useEffect(() => {
    (async () => {
      const reservationsURL = `https://monitoracovid-backend.herokuapp.com/get-rooms`;
      console.log(reservationsURL);
      await fetch(reservationsURL, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(data => {
          setRooms(data);
        })
        .catch(err => console.error(err));
    })();
  }, []);

  const getColorAvailabel = (item) => {
    if (Number(item.actual_amount) === 0) {
      return 'gray';
    }

    return '#7B6CD9';
  }

  const goToAgendar = (item) => {
    if (Number(item.actual_amount) === 0 && typeof item.actual_amount === 'number') {
      return;
    }

    navigation.navigate('Agendar', {room: item});
  }

  return (
    <View>
      <View style={styles.agendamentoContainer}>
        <Text style={styles.agendamentoTitle}>Selecione uma sala</Text>
        {rooms.map(item => {
          console.log(item);
          return (
            <TouchableOpacity
              style={[{backgroundColor: item.actual_amount || item.actual_amount === 0 ? getColorAvailabel(item) : '#7B6CD9'}, styles.salaBox]}
              onPress={() => goToAgendar(item)}
            >
              <Text style={styles.nameRoom}>{item.name}</Text>
              <Text style={styles.qtyMax}>Quantidade máxima: {item.max_amount}</Text>
              {item.actual_amount || item.actual_amount === 0 ? (
                <Text style={styles.qtyMax}>Reservas disponíveis: {item.actual_amount}</Text>
              ) : null}
            </TouchableOpacity>
          )
        })}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  agendamentoContainer: {
    height: '94%',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  agendamentoTitle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  reservedTitle: {
    fontSize: 18,
    color: 'black'
  },
  salaBox: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    marginTop: 40,
  },
  nameRoom: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  qtyMax: {
    color: 'white',
    marginTop: 7,
  }
});

export default Agendamento;
