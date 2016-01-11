'use strict';

import _ from 'underscore';

import Storage from './Storage';


class AppStorage extends Storage {
  constructor() {
    super('app');
  }

  state(key, value) {
    const stateKey = `state.${key}`;

    return (typeof value !== 'undefined') ? super.setItem(stateKey, value) : super.getItem(stateKey);
  }

  user() {
    return {
      setName: (name) => super.setItem('user.name', name),
      name: () => super.getItem('user.name'),

      setCategories: (categories) => {
        return super.setItem('user.categories', JSON.stringify(_.map(categories, (category) => category._id)));
      },
      categories: () => {
        return super.getItem('user.categories')
          .then((categoriesJSON) => {
            return categoriesJSON ? JSON.parse(categoriesJSON) : [];
          });
      }
    };
  }
}

export default new AppStorage;
