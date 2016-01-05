'use strict';

import React from 'react-native';
const {
  Platform,
  AlertIOS,
  ToastAndroid
} = React;


class Alert {
  show(message) {
    Platform.OS === 'ios' && AlertIOS.alert(message);
    Platform.OS === 'android' && ToastAndroid.show(message, ToastAndroid.SHORT);
  }
}

export default new Alert;
