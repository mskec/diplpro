'use strict';

import React from 'react-native';
const {
  AppRegistry
} = React;

import AppNavigator from './app/AppNavigator';
import AppStorage from './app/storage/AppStorage';


class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

AppRegistry.registerComponent('vibby', () => App);
