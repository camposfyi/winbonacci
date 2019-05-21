function onResetClicked() {
  const message = {type: 'winbonacci-reset'};
  chrome.runtime.sendMessage(message, () => {
    const notificationElement = document.getElementById('resetNotification');
    notificationElement.style.display = 'block';

    updateWibonacciStats();

    setTimeout(() => {
      notificationElement.style.display = 'none';
    }, 750);
  });
}

function updateWibonacciStats() {
  chrome.tabs.query({active: true, windowType: 'normal', currentWindow: true}, tabs => {
    const activeTab = tabs[0];
    const message = {type: 'winbonacci-get-tab', tabId: activeTab.id};

    chrome.runtime.sendMessage(message, ({n = 0, value = 0}) => {
      setElementText('wibonacciN', n.toString());
      setElementText('wibonacciValue', value.toString());
    });

  });
}

function setElementText(elementId, text) {
  const element = document.getElementById(elementId);
  element.textContent = text;
}

document.addEventListener('DOMContentLoaded', () => {
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', onResetClicked);

  updateWibonacciStats();
});
