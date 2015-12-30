'use strict';

import React from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React;

import WelcomeScreen from './WelcomeScreen';
import appColors from './appColors';

class App extends React.Component {
  render() {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemWrapper: {
    backgroundColor: appColors.background
  }
});

AppRegistry.registerComponent('code', () => App);
