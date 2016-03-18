'use strict';

import _ from 'underscore';
import React from 'react-native';
const {
  AppRegistry,
  AppState,
  BackAndroid,
  Navigator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

import {appColors} from './AppConstants';
import ExploreService from './services/ExploreService';
import ExploreScreen from './screens/ExploreScreen';
import WatchScreen from './screens/WatchScreen';
import DebugTools from './utils/DebugTools';
import Spinner from './Spinner';


class AppNavigator extends React.Component {
  constructor() {
    super();

    this.route = {};
    this.state = {
      isLoading: false,
      initialRoute: {name: 'Explore'}
    };

    this.onRouteChange = this.onRouteChange.bind(this);
    this.onBackAndroid = this.onBackAndroid.bind(this);
    this.onAppStateChange = this.onAppStateChange.bind(this);

    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    AppState.addEventListener('change', this.onAppStateChange)
  }

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  onRouteChange(route: Object, navigator: Object) {
    const routes = {
      Explore: <ExploreScreen navigator={navigator} />,
      Watch:   <WatchScreen navigator={navigator} vib={route.vib} />
    };

    let screen = routes[route.name];
    if (!screen) {
      return console.error('Unhandled route!', route);
    }

    this.route = route;
        //<DebugTools />
    return (
      <View style={s.screenWrapper}>
        {screen}
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

      return;
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
    if (!this._isOnMainScreen()) {
      this.refs.navigator.pop();
      return true;
    }

    return false;
  }

  onAppStateChange(appState) {
    if (appState === 'active') {
      ExploreService.shouldRefresh()
        .then((shouldRefresh) => {
          if (shouldRefresh) {
            this.setState(Object.assign(this.state, {isLoading: true}));
            return ExploreService.loadExplore()
              .then(() => this.setState(Object.assign(this.state, {isLoading: false})));
          }
        });
    }
  }

  render() {
    return this.state.isLoading ?
      this.renderLoading() :
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
      />;
  }

  renderLoading() {
    return (
      <View style={[s.container, s.containerLoading]}>
        <Spinner />
      </View>
    );
  }

  _isOnMainScreen() {
    return this.route.name === 'Explore';
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
  screenWrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 64 : 56,    // NavBar height
    justifyContent: 'space-between'
  }
};

const s = StyleSheet.create(Object.assign({}, navBarStyles, navigatorStyles));

AppRegistry.registerComponent('AppNavigator', () => AppNavigator);

export default AppNavigator;
