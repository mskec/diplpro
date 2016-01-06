'use strict';

import _ from 'underscore';

import HttpUtils from '../utils/HttpUtils';
import Storage from './Storage';
import {calculateVibDuration} from '../utils/utils';

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

        const categories = JSON.parse(categoriesJSON);
        return Promise.all(_.map(categories, (categoryId) => this.getCategory(categoryId)));
      });
  }

  getCategory(id: String) {
    return super.getItem(`categories.${id}`)
      .then((categoryJSON) => {
        let category;
        if (categoryJSON) {
          category = JSON.parse(categoryJSON);
        }

        return category;
      });
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


  getExplore() {
    return super.getItem('explore')
      .then((vibsJSON) => {
        let vibs = vibsJSON ? JSON.parse(vibsJSON) : [];

        return Promise.all(_.map(vibs, (vibId) => this.getVib(vibId)));
      });
  }

  getVib(id: String) {
    return super.getItem(`vibs.${id}`)
      .then((vibJSON) => {
        return vibJSON ? JSON.parse(vibJSON) : vibJSON;
      });
  }

  loadExplore() {
    return HttpUtils.get('/api/data/story/explore?count=5')
      .then((vibs) => {
        const vibIds = [];

        _.each(vibs, (vib) => {
          vibIds.push(vib._id);
          vib.duration = calculateVibDuration(vib);
          delete vib.vibCategory;
          delete vib.impacts;
          delete vib.upvoters;
        });

        return Promise.all(
          super.setItem('explore', JSON.stringify(vibIds)),
          super.multiSet(_.map(vibs, (vib) => [`vibs.${vib._id}`, JSON.stringify(vib)]))
        );
      });
  }

}

export default new VBStorage;
