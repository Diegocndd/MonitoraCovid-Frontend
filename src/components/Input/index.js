import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Input = ({
  label = '',
  password = false,
  onChangeText,
  text,
}) => {
  const navigation = useNavigation();

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={label}
          secureTextEntry={password}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelInput: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    backgroundColor: '#D3D3D3',
    height: 40,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: 'transparent',
    paddingHorizontal: 13,
    marginBottom: 10,
  },
});

export default Input;
