'use strict';

import React from 'react-native';
const {
  AppRegistry,
  ActivityIndicatorIOS,
  Platform,
  ProgressBarAndroid,
  View
} = React;

import {appColors} from './AppConstants';

class Spinner extends React.Component {
  render() {
    return (
      <View>
        {Platform.OS === 'ios' ?
          <ActivityIndicatorIOS /> :
          <ProgressBarAndroid color={appColors.fontColor} />
        }
      </View>
    )
  }
}

AppRegistry.registerComponent('Spinner', () => Spinner);

export default Spinner;
