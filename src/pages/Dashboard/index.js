import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Footer from '../../components/Footer';
import { useSelector, useDispatch } from 'react-redux';

const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

const Dashboard = () => {
  const person = useSelector(state => state.dataUser); 
  const isFocused = useIsFocused();

  const {
    id_user,
    name,
  } = person;

  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const [reservations, setReservations] = useState([]);
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
      await fetch(reservationsURL, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(data => {
          setRooms(data);
        })
        .catch(err => console.error(err));
    })();

    (async () => {
      const reservationsURL = `https://monitoracovid-backend.herokuapp.com/get-reservations?user=${id_user}`;
      await fetch(reservationsURL, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(data => {
          setReservations(data);
        })
        .catch(err => console.error(err));
    })();
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.dashboardContainer}>
        <View style={{padding: 10 }}>
          <Text style={styles.helloText}>Olá, {name}!</Text>
          <Text>Hoje é {days[new Date().getDay()]}</Text>
          <View style={styles.agendasContainer}>
            <Text style={styles.reservedTitle}>Salas Agendadas</Text>
            <View style={styles.reservas}>
              <ScrollView contentContainerStyle={styles.reservasScroll}>
                {reservations.length > 0 ? (
                  reservations.map(item => {
                    const {start_time, end_time} = item;
                    let dayStart = new Date(Number(start_time));
                    let dd = String(dayStart.getDate()).padStart(2, '0');
                    let mm = String(dayStart.getMonth() + 1).padStart(2, '0');
                    let yyyy = dayStart.getFullYear();
                    
                    dayStart = dd + '/' + mm + '/' + yyyy;

                    let dayEnd = new Date(Number(end_time));
                    dd = String(dayEnd.getDate()).padStart(2, '0');
                    mm = String(dayEnd.getMonth() + 1).padStart(2, '0');
                    yyyy = dayEnd.getFullYear();
                    
                    dayEnd = dd + '/' + mm + '/' + yyyy;

                    let hoursStart = new Date(Number(start_time));
                    hoursStart.setHours(hoursStart.getHours() + 3);
                    hoursStart = hoursStart.getHours();
                    const minutesStart = new Date(Number(start_time)).getMinutes();

                    let hoursEnd = new Date(Number(end_time));
                    hoursEnd.setHours(hoursEnd.getHours() + 3);
                    hoursEnd = hoursEnd.getHours();
                    const minutesEnd = new Date(Number(end_time)).getMinutes();
                  
                    return (
                      <View style={styles.reservationContainer}>
                        <Text style={styles.titleRoom}>{searchRoom(item.id_room)}</Text>
                        <Text style={styles.timeReservation}>Entrada: {dayStart} {hoursStart}:{minutesStart}{'\n'}
                        Saída: {dayEnd} {hoursEnd}:{minutesEnd}</Text>
                      </View>
                    );
                  })
                ) : (
                  <View style={{display: 'flex', justifyContent: 'center', marginTop: 100 }}>
                    <Text>Não há reservas no momento</Text>
                    <TouchableOpacity style={styles.buttonCreateReserva} onPress={() => navigation.navigate('Agendamento')}>
                      <Text style={styles.createReservaText}>Criar uma reserva</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardContainer: {
    height: '94%',
    padding: 10,
  },
  reservedTitle: {
    fontSize: 18,
    color: 'black'
  },
  reservationContainer: {
    backgroundColor: '#548C7C',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    // height: 100,
    height: 'auto',
  },
  titleRoom: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  timeReservation: {
    color: 'white',
    fontSize: 15,
    marginTop: 10,
  },
  helloText: {
    fontSize: 30,
    marginTop: 20,
    // color: 'black',
  },
  agendasContainer: {
    padding: 0,
    marginTop: 60,
    flexGrow: 1,
  },
  reservas: {
    padding: 30,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    marginTop: 20,
    // height: '72%',
    height: '85%',
    // flexGrow: 1,
  },
  reservasScroll: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCreateReserva: {
    backgroundColor: '#7B6CD9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 15,
    borderRadius: 20,
    elevation: 2,
  },
  createReservaText: {
    color: 'white',
    fontWeight: 'bold',
  },  
});

export default Dashboard;
