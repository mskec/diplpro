'use strict';

import React from 'react-native';
let {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React;

import WelcomeScreen from './WelcomeScreen';
import appColors from './appColors';

let App = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        titleTextColor="#ccc"
        barTintColor={appColors.background}
        itemWrapperStyle={styles.itemWrapper}
        initialRoute={{
          title: 'App name',
          component: WelcomeScreen
        }}
      />
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemWrapper: {
    backgroundColor: appColors.background
  }
});

AppRegistry.registerComponent('code', () => App);
