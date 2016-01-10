'use strict';

import React from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = React;


class SettingsScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log('settings|render');
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Settings screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: '#FFF'
  }
});

AppRegistry.registerComponent('SettingsScreen', () => SettingsScreen);

export default SettingsScreen;
