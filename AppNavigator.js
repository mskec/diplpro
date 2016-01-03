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
import AppStorage from './AppStorage';
import ExploreScreen from './ExploreScreen';
import WelcomeScreen from './WelcomeScreen';


const RouteMapper = (route, navigator) => {
  const routes = {
    Welcome: <WelcomeScreen navigator={navigator} />,
    Explore: <ExploreScreen navigator={navigator} />
  };

  const screen = routes[route.name];
  if (!screen) {
    return console.error('Unhandled route!', route);
  }

  return screen;
};


class AppNavigator extends React.Component {
  constructor() {
    super();

    this.state = {initialRoute: {}};
  }

  componentDidMount() {
    AppStorage.getItem('welcomeShown')
      .then((welcomeShown) => {
        const routeName = welcomeShown ? 'Explore' : 'Welcome';
        this.setState(Object.assign(this.state, {initialRoute: {name: routeName}}));
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
  }
});

AppRegistry.registerComponent('code', () => AppNavigator);

export default AppNavigator;
