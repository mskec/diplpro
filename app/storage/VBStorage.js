'use strict';

import _ from 'underscore';

import HttpUtils from '../utils/HttpUtils';
import Storage from './Storage';

class VBStorage extends Storage {
  constructor() {
    super('vb');
  }

  getCategories() {
    return super.getItem('categories')
      .then((categoriesJSON) => {
        if (!categoriesJSON) {
          return this.loadCategories()
            .then(() => this.getCategories());
        }

        return this.parseCategories(categoriesJSON);
      });
  }

  getCategory(id) {
    return super.getItem(`categories.${id}`);
  }

  loadCategories() {
    return HttpUtils.get('/api/data/vibcategory')
      .then((categories) => this.saveCategories(categories));
  }

  saveCategories(categories: Array) {
    return super.multiSet(_.map(categories, (category) => [`categories.${category._id}`, JSON.stringify(category)]))
      .then(() => {
        const categoriesJSON = JSON.stringify(_.map(categories, (category) => category._id));
        return super.setItem('categories', categoriesJSON);
      });
  }

  parseCategories(categoriesJSON: String) {
    const categories = JSON.parse(categoriesJSON);

    return Promise.all(_.map(categories, (categoryId) => this.getCategory(categoryId)))
      .then((categories) => {
        return _.map(categories, (categoryJSON) => JSON.parse(categoryJSON));
      });
  }
}

export default new VBStorage;
