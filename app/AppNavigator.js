'use strict';

import React from 'react-native';
const {
  AppRegistry,
  BackAndroid,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  View
} = React;

import {appColors} from './AppConstants';
import AppStorage from './storage/AppStorage';
import ExploreScreen from './screens/ExploreScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import WatchScreen from './screens/WatchScreen';
import DebugTools from './utils/DebugTools';


class AppNavigator extends React.Component {
  constructor() {
    super();

    this.route = {};
    this.state = {initialRoute: {}};

    this.onRouteChange = this.onRouteChange.bind(this);
    this.onBackAndroid = this.onBackAndroid.bind(this);
    this.isOnMainScreen = this.isOnMainScreen.bind(this);

    BackAndroid.addEventListener('hardwareBackPress', () => this.onBackAndroid());
  }

  componentDidMount() {
    AppStorage.state('welcomeShown')
      .then((welcomeShown) => {
        const name = welcomeShown ? 'Explore' : 'Welcome';
        this.setState(Object.assign(this.state, {initialRoute: {name}}));
      });
  }

  onRouteChange(route: Object, navigator: Object) {
    const routes = {
      Welcome: <WelcomeScreen navigator={navigator} />,
      Explore: <ExploreScreen navigator={navigator} />,
      Watch:   <WatchScreen navigator={navigator} vib={route.vib} />
    };

    let screen = routes[route.name];
    if (!screen) {
      return console.error('Unhandled route!', route);
    }

    if (route.name === 'Explore') {
      screen = <ScrollView>{screen}</ScrollView>;
    }

    this.route = route;
    return (
      <View style={styles.screenWrapper}>
        {screen}

      </View>
    );
  }

  onBackAndroid() {
    if (!this.isOnMainScreen()) {
      this.refs.navigator.pop();
      return true;
    }

    return false;
  }

  isOnMainScreen() {
    return this.route.name === 'Explore';
  }

  render() {
    return this.state.initialRoute.name ?
      <Navigator
        ref="navigator"
        style={styles.container}
        initialRoute={this.state.initialRoute}
        renderScene={this.onRouteChange}
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
