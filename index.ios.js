'use strict';

import React from 'react-native';
const {
  AppRegistry
} = React;

import appColors from './appColors';
import AppNavigator from './AppNavigator';
import WelcomeScreen from './WelcomeScreen';

class App extends React.Component {
  constructor() {
    super();

    this.state = {initialRoute: {name: 'Welcome'}};
  }

  render() {
    return (
      <AppNavigator initialRoute={this.state.initialRoute} />
    );
  }
}

AppRegistry.registerComponent('code', () => App);
