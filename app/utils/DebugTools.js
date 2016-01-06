'use strict';

import React from 'react-native';
const {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity
} = React;

class DebugTools extends React.Component {

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => AsyncStorage.clear()}>
        <Text style={{color: '#FFF'}}>Clear storage</Text>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10
  }
});

AppRegistry.registerComponent('DebugTools', () => DebugTools);

export default DebugTools;
