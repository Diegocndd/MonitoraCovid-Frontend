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
import Input from '../../components/Input';

const Agendar = (props) => {
  const person = useSelector(state => state.dataUser); 
  const {room} = props.route.params;
  console.log(room);
  const navigation = useNavigation();
  const [dayStart, setDayStart] = useState('');
  const [dayEnd, setDayEnd] = useState('');
  const [hourStart, setHourStart] = useState('');
  const [hourEnd, setHourEnd] = useState('');

  const searchRoom = (idRoom) => {
    let name = '';

    rooms.forEach(item => {
      if (item.id_room === idRoom) {
        name = item.name;
      }
    });

    return name;
  }
  console.log(person);
  const realizarAgendamento = async () => {
    if (dayStart === '' || dayEnd === '' || hourEnd === '' || hourStart === '') {
      return;
    }

    let p = dayStart;
    let x = `${p.split('/')[2]}-${p.split('/')[1]}-${p.split('/')[0]}T00:00:00-03:00`;
    let y = hourStart;
    let z = new Date(x);
    z.setHours(Number(y.split('h')[0]), Number(y.split('h')[1]), 0);
    z.setHours(z.getHours() - 3);
    const startTime = new Date(z).getTime();

    p = dayEnd;
    x = `${p.split('/')[2]}-${p.split('/')[1]}-${p.split('/')[0]}T00:00:00-03:00`;
    y = hourEnd;
    z = new Date(x);
    z.setHours(Number(y.split('h')[0]), Number(y.split('h')[1]), 0);
    z.setHours(z.getHours() - 3);
    const endTime = new Date(z).getTime();

    if (startTime && endTime) {
      await fetch('https://monitoracovid-backend.herokuapp.com/create-reservation', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          start_time: startTime,
          end_time: endTime,
          id_room: room.id_room,
          id_user: person.id_user,
        }),
      })
        .then(res => res.text())
        .then(data => {
          // setErrorLogin(false);
          navigation.navigate('Dashboard');
        })
        .catch(err => console.log(err));
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     const reservationsURL = `https://monitoracovid-backend.herokuapp.com/get-rooms`;
  //     console.log(reservationsURL);
  //     await fetch(reservationsURL, {
  //       method: 'GET',
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         setRooms(data);
  //       })
  //       .catch(err => console.error(err));
  //   })();
  // }, []);
  
  console.log(dayStart);

  function parseDate(str) {
    var m = str.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    console.log( (m) ? new Date(m[3], m[2]-1, m[1]) : null);
  }

  return (
    <View>
      <View style={styles.agendamentoContainer}>
        <Text style={styles.agendamentoTitle}>Agendar</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.salaLabel}>Sala</Text>
            <Text>{room.name}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Input label='Dia de entrada (dd/mm/aaaa)' onChangeText={setDayStart} />
            <Input label='Hora de entrada (hh:mm)' onChangeText={setHourStart} />
          </View>
          <View style={styles.inputContainer}>
            <Input label='Dia de Saída (dd/mm/aaaa)' onChangeText={setDayEnd} />
            <Input label='Hora de Saída (hh:mm)' onChangeText={setHourEnd} />
          </View>

          <TouchableOpacity style={styles.buttonAgendar} onPress={() => realizarAgendamento()}>
            <Text style={styles.textAgendar}>Agendar</Text>
          </TouchableOpacity>
        </View>
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
  salaLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    paddingVertical: 30,
  },
  inputContainer: {
    paddingVertical: 17,
  },
  buttonAgendar: {
    backgroundColor: '#7B6CD9',
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 3,
  },
  textAgendar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default Agendar;
