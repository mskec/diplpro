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

import appColors from './appColors';
import ExploreScreen from './ExploreScreen';
import WelcomeScreen from './WelcomeScreen';

const RouteMapper = (route, navigator) => {
  if (route.name === 'Welcome') {
    return <WelcomeScreen navigator={navigator} />;
  } else if (route.name === 'Explore') {
    return <ExploreScreen navigator={navigator} />
  } else {
    console.error('Unhandled route!', route);
  }
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {initialRoute: {name: 'Welcome'}};
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
