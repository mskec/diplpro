/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
const {
  AppRegistry
} = React;

import appColors from './appColors';
import AppNavigator from './AppNavigator';
import ExploreScreen from './ExploreScreen';
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
