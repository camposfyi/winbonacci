/* global chrome, window */

chrome.tabs.onCreated.addListener(function() {
  window.alert('tab created...3');
});