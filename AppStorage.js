'use strict';

import React from 'react-native';
const {
  AsyncStorage
} = React;


// TODO this will be replaced with categories from server
const categories = [
  {label: 'Comedy'},
  {label: 'Sports'},
  {label: 'Technology'},
  {label: 'Education'},
  {label: 'Music'},
  {label: 'Film & TV'},
  {label: 'Gaming'}
];

class AppStorage {
  init() {

    AsyncStorage.getItem('app.categories')
      .then(function(categoriesJSON) {
        if (!categoriesJSON) {
          AsyncStorage.setItem('app.categories', JSON.stringify(categories));
        }
      });
  }

  getItem(key: String) {
    return AsyncStorage.getItem('app.' + key);
  }

  setItem(key: String, value: String) {
    return AsyncStorage.setItem('app.' + key, value);
  }

  removeItem(key: String) {
    return AsyncStorage.removeItem('app.' + key);
  }
}

export default new AppStorage;
