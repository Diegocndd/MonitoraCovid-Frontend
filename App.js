import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/pages/Home';
import Register from './src/pages/Register';
import Dashboard from './src/pages/Dashboard';
import Profile from './src/pages/Profile';
import Scanning from './src/pages/Scanning';
import Agendamento from './src/pages/Agendamento';
import Agendar from './src/pages/Agendar';

const Stack = createNativeStackNavigator();

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/reducers';

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='Dashboard' component={Dashboard} />
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='Scanning' component={Scanning} />
          <Stack.Screen name='Agendamento' component={Agendamento} />
          <Stack.Screen name='Agendar' component={Agendar} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
