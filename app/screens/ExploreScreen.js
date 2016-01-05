'use strict';

import React from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

class ExploreScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          This is Explore screen
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

AppRegistry.registerComponent('ExploreScreen', () => ExploreScreen);

export default ExploreScreen;