'use strict';

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
        return super.setItem('user.categories', JSON.stringify(categories.map((category) => category.shortId)));
      }
    };
  }
}

export default new AppStorage;
