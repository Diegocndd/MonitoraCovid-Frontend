import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

const homeIcon = <AntDesign name="home" size={30} color="#7B6CD9" />;
const personIcon = <Ionicons name="person-outline" size={30} color="#7B6CD9" />;
const qrcodeIcon = <AntDesign name="qrcode" size={50} color="#fff" />;
const clockIcon = <AntDesign name="clockcircleo" size={30} color="#7B6CD9" />;
const logoutIcon = <MaterialIcons name="logout" size={30} color="#7B6CD9" />;

const Footer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        {homeIcon}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        {personIcon}
      </TouchableOpacity>
      <TouchableOpacity style={styles.qrcodeContainer} onPress={() => navigation.navigate('Scanning')}>
        {qrcodeIcon}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Agendamento')}>
        {clockIcon}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch({ type: 'SET_USERDATA', payload: {} });
          navigation.navigate('Home');
        }}
      >
        {logoutIcon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    elevation: 3,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    // zIndex: 1,
    height: '6%',
    paddingBottom: 5,
  },
  qrcodeContainer: {
    backgroundColor: '#7B6CD9',
    borderRadius: 33,
    zIndex: 900,
    height: 66,
    width: 66,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Footer;
