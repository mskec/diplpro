'use strict';

import AppConstants from '../AppConstants';

const JSON_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};


class HttpUtils {
  get(path) {
    return fetch(AppConstants.API_URL + path, {method: 'GET', headers: JSON_HEADERS})
      .then((res) => res.json())
      .catch((err) => this.errorHandler(err));
  }

  errorHandler(err) {
    console.error(err);
    return err;
  }
}

export default new HttpUtils;
