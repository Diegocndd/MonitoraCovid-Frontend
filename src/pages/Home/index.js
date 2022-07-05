import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Input from '../../components/Input';

import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const person = useSelector(state => state.dataUser); 
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);

  useEffect(() => {
    if (Object.keys(person).length > 0) {
      navigation.navigate('Dashboard');
    };
  }, [isFocused]);

  const loginUser = async () => {
    const responseLogin = await fetch('https://monitoracovid-backend.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: login, password: password }),
    })
      .then(res => res.json())
      .then(data => {
        setErrorLogin(false);
        dispatch({ type: 'SET_USERDATA', payload: data });
        navigation.navigate('Dashboard');
      })
      .catch(err => setErrorLogin(true));
  };

  return (
    <View style={{padding: 30, display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '100%'}}>
      <Input label='Usuário' text={login} onChangeText={setLogin} />
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
        <Text style={styles.textLogin}>Entrar</Text>
      </TouchableOpacity>

      {errorLogin &&
        <View style={styles.errorContainer}>
          <Text style={styles.errorLogin}>Usuário ou senha incorretos!</Text>
        </View>
      }

      <TouchableOpacity
        style={styles.createAccountContainer}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.createAccountText}>Criar uma conta</Text>
      </TouchableOpacity>
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
  },
  createAccountText: {
    color: '#7B6CD9',
    fontWeight: 'bold',
  },
  createAccountContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});

export default Home;
