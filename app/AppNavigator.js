'use strict';

import React from 'react-native';
const {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View
} = React;

import appColors from './appColors';
import AppStorage from './storage/AppStorage';
import ExploreScreen from './screens/ExploreScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import WatchScreen from './screens/WatchScreen';
import DebugTools from './utils/DebugTools';


const RouteMapper = (route, navigator) => {
  const routes = {
    Welcome: <WelcomeScreen navigator={navigator} />,
    Explore: <ExploreScreen navigator={navigator} />,
    Watch:   <WatchScreen navigator={navigator} />
  };

  const screen = routes[route.name];
  if (!screen) {
    return console.error('Unhandled route!', route);
  }

  return (
    <View style={styles.screenWrapper}>
      {screen}
      <DebugTools />
    </View>
  );
};


class AppNavigator extends React.Component {
  constructor() {
    super();

    this.state = {initialRoute: {}};
  }

  componentDidMount() {
    AppStorage.state('welcomeShown')
      .then((welcomeShown) => {
        const name = welcomeShown ? 'Explore' : 'Welcome';
        this.setState(Object.assign(this.state, {initialRoute: {name}}));
      });
  }

  render() {
    return this.state.initialRoute.name ?
      <Navigator
        style={styles.container}
        initialRoute={this.state.initialRoute}
        renderScene={RouteMapper}
      /> :
      this.renderLoading();
  }

  renderLoading() {
    return (
      <View style={[styles.container, styles.containerLoading]}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background
  },
  containerLoading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff'
  },
  screenWrapper: {
    flex: 1,
    justifyContent: 'space-between'
  }
});

AppRegistry.registerComponent('AppNavigator', () => AppNavigator);

export default AppNavigator;
