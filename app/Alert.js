'use strict';

import React from 'react-native';
const {
  Platform,
  AlertIOS,
  ToastAndroid
} = React;


export default class Alert {
  static show(message) {
    Platform.OS === 'ios' && AlertIOS.alert(message);
    Platform.OS === 'android' && ToastAndroid.show(message, ToastAndroid.SHORT);
  }
}
