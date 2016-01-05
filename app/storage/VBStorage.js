'use strict';

import _ from 'underscore';
import Storage from './Storage';

class VBStorage extends Storage {
  constructor() {
    super('vb');

    this.initData();
  }

  initData() {
    return this.getCategories()
      .then((savedCategories) => {
        if (!savedCategories.length) {
          // TODO API_URL constant, create some wrapper module for API calls
          return fetch('https://staging.vibby.com/api/data/vibcategory', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then((res) => res.json())
            .then((categories) => this.saveCategories(categories));
        }
      });
  }

  getCategories() {
    return super.getItem('categories')
      .then((categoriesJSON) => {
        if (!categoriesJSON) {
          return [];
        }

        const categories = JSON.parse(categoriesJSON);
        return Promise.all(_.map(categories, (categoryId) => this.getCategory(categoryId)));
      })
      .then((categories) => {
        return _.map(categories, (categoryJSON) => JSON.parse(categoryJSON));
      });
  }

  getCategory(id) {
    return super.getItem(`categories.${id}`);
  }

  saveCategories(categories) {
    return super.multiSet(_.map(categories, (category) => [`categories.${category.shortId}`, JSON.stringify(category)]))
      .then(() => {
        return super.setItem('categories', JSON.stringify(categories.map((category) => category.shortId)));
      });
  }
}

export default new VBStorage;
