/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
let {
  AppRegistry,
  StyleSheet,
  Navigator
} = React;

import WelcomeScreen from './WelcomeScreen';
import appColors from './appColors';


let RouteMapper = (route, navigator) => {
  if (route.name === 'welcome') {
    return <WelcomeScreen />;
  }
};

let App = React.createClass({
  getInitialState: function() {
    return {
      initialRoute: {name: 'welcome'}
    };
  },

  render: function() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={this.state.initialRoute}
        renderScene={RouteMapper}
      />
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background
  }
});

AppRegistry.registerComponent('code', () => App);
