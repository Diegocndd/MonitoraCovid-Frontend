import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';

import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const person = useSelector(state => state.dataUser); 

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [erroRegister, setErroRegister] = useState(false);

  if (Object.keys(person).length > 0) {
    navigation.navigate('Dashboard');
  };

  const loginUser = async () => {
    console.log(JSON.stringify({
      'username': username,
      'password': password,
      'email': email,
      'name': name,
      'is_admin': false,
    }));
    const responseLogin = await fetch('https://monitoracovid-backend.herokuapp.com/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'password': password,
        'email': email,
        'name': name,
        'is_admin': false,
      }),
    })
      .then(res => res.text())
      .then(data => {
        setErroRegister(false);
        navigation.navigate('Home');
      })
      .catch(err => {
        setErroRegister(true)
      });
  };

  return (
    <View style={{padding: 30, display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '100%'}}>
      <Input label='Nome Completo' text={name} onChangeText={setName} />
      <Input label='Nome de Usuário' text={username} onChangeText={setUsername} />
      <Input label='Email' text={email} onChangeText={setEmail} />
      <Input
        label='Senha'
        text={password}
        onChangeText={setPassword}
        password
      />
      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={() => loginUser()}
      >
        <Text style={styles.textLogin}>Criar conta</Text>
      </TouchableOpacity>

      {erroRegister &&
        <View style={styles.errorContainer}>
          <Text style={styles.errorLogin}>Ocorreu um erro ao criar uma conta!</Text>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  buttonLogin: {
    backgroundColor: '#7B6CD9',
    height: 40,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: 'transparent',
    paddingHorizontal: 13,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogin: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorLogin: {
    color: 'red',
  }
});

export default Register;
