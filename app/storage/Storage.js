'use strict';

import _ from 'underscore';
import React from 'react-native';
const {
  AsyncStorage
} = React;


class Storage {
  constructor(name) {
    this.name = name;
  }

  getItem(key: String) {
    return AsyncStorage.getItem(`${this.name}.${key}`);
  }

  setItem(key: String, value: String) {
    return AsyncStorage.setItem(`${this.name}.${key}`, value);
  }

  removeItem(key: String) {
    return AsyncStorage.removeItem(`${this.name}.${key}`);
  }

  multiSet(keyValuePairs: Array) {
    return AsyncStorage.multiSet(
      _.map(keyValuePairs, (keyValuePair) => [`${this.name}.${keyValuePair[0]}`, keyValuePair[1]])
    );
  }
}

export default Storage;
