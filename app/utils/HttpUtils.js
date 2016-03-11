'use strict';

import AppConstants from '../AppConstants';

const JSON_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};


export default class HttpUtils {
  static get(path) {
    return fetch(AppConstants.API_URL + path, {method: 'GET', headers: JSON_HEADERS})
      .then((res) => res.json())
      .catch((err) => HttpUtils.errorHandler(err));
  }

  static errorHandler(err) {
    console.error(err);
    return err;
  }
}
