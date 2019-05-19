import {find} from 'lodash';
import storage from './storage';
import fibonacci from './fibonacci';

class TabManager {

  constructor() {
    this.tabsKey = 'winbonacci-tabs';
    this.incrementerKey = 'winbonacci-incrementer';
  }

  init() {
    storage.set(this.tabsKey, []);
    storage.set(this.incrementerKey, 0);
  }

  add(tabId) {
    const tabs = storage.get(this.tabsKey);
    const tab = {id: tabId, value: fibonacci(this.increment())};

    tabs.push(tab);
    storage.set(this.tabsKey, tabs);
  }

  get(tabId) {
    const tabs = storage.get(this.tabsKey);
    return find(tabs, {id: tabId});
  }

  remove(tabId) {
    const tabs = storage.get(this.tabsKey);
    storage.set(this.tabsKey, _.reject(tabs, {id: tabId}));
  }

  increment() {
    const current = storage.get(this.incrementerKey);
    const next = current + 1;
    storage.set(this.incrementerKey, next);

    return next;
  }

  update(tabId) {
    this.remove(tabId);
    this.add(tabId);
  }

}

export default new TabManager();