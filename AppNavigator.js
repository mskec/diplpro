'use strict';

import React from 'react-native';
const {
  AppRegistry,
  Navigator,
  StyleSheet
} = React;

import appColors from './appColors';
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
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={this.props.initialRoute}
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

AppRegistry.registerComponent('code', () => AppNavigator);

export default AppNavigator;
