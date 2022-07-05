import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Footer from '../../components/Footer';
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
  const {
    email,
    username,
    name,
  } = useSelector(state => state.dataUser); 

  return (
    <View>
      <View style={styles.profileContainer}>
        <Text style={styles.profileScreenTitle}>Perfil</Text>
        <View>
          <View style={styles.fieldCampo}>
            <Text style={styles.titleField}>Nome</Text>
            <Text>{name}</Text>
          </View>
          <View style={styles.fieldCampo}>
            <Text style={styles.titleField}>Nome de Usuário</Text>
            <Text>{username}</Text>
          </View>
          <View style={styles.fieldCampo}>
            <Text style={styles.titleField}>Email</Text>
            <Text>{email}</Text>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    height: '94%',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  profileScreenTitle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  titleField: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  fieldCampo: {
    marginTop: 20,
  },
});

export default Profile;
