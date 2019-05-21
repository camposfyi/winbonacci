import {isUndefined} from 'lodash';

export default {

  setItem(itemKey, itemValue) {
    if (isUndefined(itemKey) || isUndefined(itemValue)) {
      throw new Error('must provide key and value');
    }

    localStorage.setItem(itemKey, JSON.stringify(itemValue));
  },

  getItem(itemKey = '') {
    const value = localStorage.getItem(itemKey);
    return value ? JSON.parse(value) : null;
  }
}
