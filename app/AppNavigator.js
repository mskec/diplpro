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
import WatchScreen from './screens/WatchScreen';
import DebugTools from './utils/DebugTools';


class AppNavigator extends React.Component {
  constructor() {
    super();

    this.route = {};
    this.state = {initialRoute: {name: 'Explore'}};

    this.onRouteChange = this.onRouteChange.bind(this);
    this.onBackAndroid = this.onBackAndroid.bind(this);
    this.isOnMainScreen = this.isOnMainScreen.bind(this);

    BackAndroid.addEventListener('hardwareBackPress', () => this.onBackAndroid());
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

    if (_.contains(['Explore'], route.name)) {
      screen = <ScrollView>{screen}</ScrollView>;
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
