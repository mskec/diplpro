'use strict';

const JSON_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const API_URL = 'https://staging.vibby.com';


class HttpUtils {
  get(path) {
    return fetch(API_URL + path, {method: 'GET', headers: JSON_HEADERS})
      .then((res) => res.json())
      .catch((err) => this.errorHandler(err));
  }

  errorHandler(err) {
    console.error(err);
    return err;
  }
}

export default new HttpUtils;
