
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

// import {Camera} from 'react-native-vision-camera'

const Scanning = () => {
    // onSuccess = e => {
    //   Linking.openURL(e.data).catch(err =>
    //     console.error('An error occured', err)
    //   );
    // };
  
    const reader = (res) => {
      console.log('res', res);
    }

    return (
      <View>
      </View>
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