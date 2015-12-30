/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  Navigator
} = React;

import WelcomeScreen from './WelcomeScreen';
import appColors from './appColors';


const RouteMapper = (route, navigator) => {
  if (route.name === 'welcome') {
    return <WelcomeScreen />;
  }
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {initialRoute: {name: 'welcome'}};
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={this.state.initialRoute}
        renderScene={RouteMapper}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background
  }
});

AppRegistry.registerComponent('code', () => App);
