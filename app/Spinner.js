'use strict';

import React from 'react-native';
const {
  AppRegistry,
  ActivityIndicatorIOS,
  Platform,
  ProgressBarAndroid,
  View
} = React;


class Spinner extends React.Component {
  render() {
    return (
      <View>
        {Platform.OS === 'ios' ?
          <ActivityIndicatorIOS /> :
          <ProgressBarAndroid />
        }
      </View>
    )
  }
}

AppRegistry.registerComponent('Spinner', () => Spinner);

export default Spinner;
