import {each, find} from 'lodash';
import tabManager from './lib/tabManager';

chrome.runtime.onInstalled.addListener(() => {
  initializeTabs();
});

chrome.runtime.onStartup.addListener(() => {
  initializeTabs();
});

chrome.tabs.onCreated.addListener(tab => {
  tabManager.add(tab.id);

  if (tab.active) {
    updateBadgeForTab(tab.id);
  }
});

chrome.tabs.onRemoved.addListener(tabId => {
  tabManager.remove(tabId);
});

chrome.tabs.onActivated.addListener(({tabId}) => {
  updateBadgeForTab(tabId);
});

chrome.tabs.onUpdated.addListener( (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && !tab.url.startsWith('chrome')) {
    tabManager.refresh(tab.id);

    if (tab.active) {
      updateBadgeForTab(tab.id);
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  switch (message.type) {

    case 'winbonacci-reset':
      initializeTabs();
      sendResponse(true);
      break;

    case 'winbonacci-get-tab':
      const tab = tabManager.get(message.tabId);
      sendResponse(tab);
      break;

    default:
      sendResponse('invalid message type');
      break;
  }
});

function initializeTabs() {
  tabManager.init();

  chrome.tabs.query({}, (tabs) => {
    each(tabs, tab => tabManager.add(tab.id));

    const activeTab = find(tabs, {active: true});
    updateBadgeForTab(activeTab.id);
  });
}

function updateBadgeForTab(tabId) {
  const tab = tabManager.get(tabId);
  chrome.browserAction.setBadgeText({text: tab.value.toString()});
}
