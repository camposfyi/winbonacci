import {each, find} from 'lodash';
import storage from './storage';
import fibonacci from './fibonacci';

const tabsKey = 'winbonacci-tabs';
const nKey = 'winbonacci-n';

export default {

  init() {
    storage.setItem(tabsKey, []);
    storage.setItem(nKey, 0);
  },

  add(tabId) {
    const tabs = storage.getItem(tabsKey);

    const memoization = this.memoize(tabs);
    const n = this.advanceN();
    const value = fibonacci(n, memoization);

    const tab = {tabId, n, value};
    tabs.push(tab);

    storage.setItem(tabsKey, tabs);
  },

  memoize(tabs = []) {
    const memoization = {};
    each(tabs, tab => {
      memoization[tab.number] = tab.value;
    });

    return memoization;
  },

  get(tabId) {
    const tabs = storage.getItem(tabsKey);
    return find(tabs, {tabId});
  },

  remove(tabId) {
    const tabs = storage.getItem(tabsKey);
    storage.setItem(tabsKey, _.reject(tabs, {tabId}));
  },

  advanceN() {
    const currentN = storage.getItem(nKey);
    const nextN = currentN + 1;
    storage.setItem(nKey, nextN);

    return nextN;
  },

  update(tabId) {
    this.remove(tabId);
    this.add(tabId);
  }

}
