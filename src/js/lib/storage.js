import {isUndefined} from 'lodash';

class Storage {

  set(itemKey, itemValue) {
    if (isUndefined(itemKey) || isUndefined(itemValue)) {
      throw new Error('must provide key and value');
    }

    localStorage.setItem(itemKey, JSON.stringify(itemValue));
  }

  get(itemKey = '') {
    const value = localStorage.getItem(itemKey);
    return value ? JSON.parse(value) : null;
  }
}

export default new Storage();