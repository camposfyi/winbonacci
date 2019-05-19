/* global chrome */
import {each, find} from 'lodash';
import tabManager from './lib/tabManager';

chrome.runtime.onInstalled.addListener(() => {
  tabManager.init();

  chrome.tabs.query({}, (tabs) => {
    each(tabs, tab => tabManager.add(tab.id));

    const activeTab = find(tabs, {active: true});
    updateBadgeForTab(activeTab.id);
  });
});

chrome.tabs.onCreated.addListener(tab => {
  tabManager.add(tab.id);
  updateBadgeForTab(tab.id);
});

chrome.tabs.onRemoved.addListener(tabId => {
  tabManager.remove(tabId);
});

chrome.tabs.onActivated.addListener(({tabId}) => {
  updateBadgeForTab(tabId);
});

chrome.tabs.onUpdated.addListener( (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    tabManager.update(tab.id);
    updateBadgeForTab(tab.id);
  }
});

function updateBadgeForTab(tabId) {
  const tab = tabManager.get(tabId);
  chrome.browserAction.setBadgeText({text: tab.value.toString()});
}
