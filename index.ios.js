'use strict';

import React from 'react-native';
const {
  AppRegistry
} = React;

import AppNavigator from './AppNavigator';
import AppStorage from './AppStorage';


class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

AppStorage.init();

AppRegistry.registerComponent('code', () => App);
