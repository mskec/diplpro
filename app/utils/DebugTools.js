'use strict';

import _ from 'underscore';
import React from 'react-native';
const {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;


class DebugTools extends React.Component {
  constructor() {
    super();

    this.onClearStorage = this.onClearStorage.bind(this);
    this.onLogStorage = this.onLogStorage.bind(this);
  }

  onClearStorage() {
    AsyncStorage.clear();
  }

  onLogStorage() {
    AsyncStorage.getAllKeys()
      .then((keys) => {
        console.log('Storage keys', keys);

        return AsyncStorage.multiGet(keys);
      })
      .then((keyValueArray) => {
        _.forEach(keyValueArray, (keyValue) => console.log(keyValue[0], keyValue[1]))
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.item} onPress={() => this.onClearStorage()}>
          <Text style={{color: '#FFF'}}>Clear storage</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => this.onLogStorage()}>
          <Text style={{color: '#FFF'}}>Log storage</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'row'
  },
  item: {
    marginRight: 5,
    backgroundColor: '#F44336',
    borderRadius: 5,
    padding: 5
  }
});

AppRegistry.registerComponent('DebugTools', () => DebugTools);

export default DebugTools;
