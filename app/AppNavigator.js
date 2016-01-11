'use strict';

import _ from 'underscore';
import React from 'react-native';
const {
  AppRegistry,
  BackAndroid,
  Navigator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

import {appColors} from './AppConstants';
import AppStorage from './storage/AppStorage';
import ExploreScreen from './screens/ExploreScreen';
import SettingsScreen from './screens/SettingsScreen';
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

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  onRouteChange(route: Object, navigator: Object) {
    const routes = {
      Welcome: <WelcomeScreen navigator={navigator} />,
      Explore: <ExploreScreen navigator={navigator} />,
      Watch:   <WatchScreen navigator={navigator} vib={route.vib} />,
      Settings: <SettingsScreen navigator={navigator} />
    };

    let screen = routes[route.name];
    if (!screen) {
      return console.error('Unhandled route!', route);
    }

    if (_.contains(['Explore', 'Settings'], route.name)) {
      screen = <ScrollView>{screen}</ScrollView>;
    }

    this.route = route;
    return (
      <View style={s.screenWrapper}>
        {screen}
        <DebugTools />
      </View>
    );
  }

  navBarRouteMapper = {
    LeftButton: function(route, navigator, index, navState) {
      if (Platform.OS === 'android' || index === 0) {
        return null;
      }

      return (
        <TouchableOpacity
          onPress={() => navigator.pop()}
          style={s.navBarLeftButton}
        >
          <Text style={s.navBarText}>
            Back
          </Text>
        </TouchableOpacity>
      );
    },

    RightButton: function(route, navigator, index, navState) {
      if (navState.routeStack.length > 1 || navState.routeStack[0].name !== 'Explore') {
        return null;
      }

      return (
        <TouchableOpacity
          onPress={() => navigator.push({name: 'Settings'})}
          style={s.navBarRightButton}
        >
          <Text style={s.navBarText}>
            Settings
          </Text>
        </TouchableOpacity>
      );
    },

    Title: function(route, navigator, index, navState) {
      return (
        <Text style={[s.navBarText, s.navBarTitleText]}>
          {route.name}
        </Text>
      );
    }
  };

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
        style={s.container}
        initialRoute={this.state.initialRoute}
        renderScene={this.onRouteChange}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={this.navBarRouteMapper}
            style={s.navBar}
          />
        }
      /> :
      this.renderLoading();
  }

  renderLoading() {
    return (
      <View style={[s.container, s.containerLoading]}>
        <Text style={s.loading}>Loading...</Text>
      </View>
    );
  }
}


const navBarStyles = {
  navBar: {
    backgroundColor: appColors.backgroundLighter
  },
  navBarText: {
    color: '#FFF',
    fontSize: 18,
    marginVertical: Platform.OS === 'ios' ? 10 : 15
  },
  navBarTitleText: {
    fontWeight: '500'
  },
  navBarLeftButton: {
    paddingLeft: 15
  },
  navBarRightButton: {
    paddingRight: 15
  }
};

// Shadows only for on iOS
if (Platform.OS === 'ios') {
  Object.assign(navBarStyles.navBar, {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 1
  });
} else {
  Object.assign(navBarStyles.navBar, {elevation: 2});
}

const navigatorStyles = {
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
    paddingTop: Platform.OS === 'ios' ? 64 : 56,    // NavBar height
    justifyContent: 'space-between'
  }
};

const s = StyleSheet.create(Object.assign({}, navBarStyles, navigatorStyles));

AppRegistry.registerComponent('AppNavigator', () => AppNavigator);

export default AppNavigator;
