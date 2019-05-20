import {each, find} from 'lodash';
import storage from './storage';
import fibonacci from './fibonacci';

class TabManager {

  constructor() {
    this.tabsKey = 'winbonacci-tabs';
    this.nKey = 'winbonacci-n';
  }

  init() {
    storage.set(this.tabsKey, []);
    storage.set(this.nKey, 0);
  }

  add(tabId) {
    const tabs = storage.get(this.tabsKey);

    const memoization = this.memoize(tabs);
    const n = this.advanceN();
    const fibValue = fibonacci(n, memoization);

    const tab = {tabId, n, fibValue};
    tabs.push(tab);

    storage.set(this.tabsKey, tabs);
  }

  memoize(tabs = []) {
    const memoization = {};
    each(tabs, tab => {
      memoization[tab.number] = tab.fibValue;
    });

    return memoization;
  }

  get(tabId) {
    const tabs = storage.get(this.tabsKey);
    return find(tabs, {tabId});
  }

  remove(tabId) {
    const tabs = storage.get(this.tabsKey);
    storage.set(this.tabsKey, _.reject(tabs, {tabId}));
  }

  advanceN() {
    const currentN = storage.get(this.nKey);
    const nextN = currentN + 1;
    storage.set(this.nKey, nextN);

    return nextN;
  }

  update(tabId) {
    this.remove(tabId);
    this.add(tabId);
  }

}

export default new TabManager();