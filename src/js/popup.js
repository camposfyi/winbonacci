function onResetClicked () {
  const message = {type: 'winbonacci-reset'};
  chrome.runtime.sendMessage(message, () => {
    const notificationElement = document.getElementById('resetNotification');
    notificationElement.style.display = 'block';

    updateWithCurrentFibValue();

    setTimeout(() => {
      notificationElement.style.display = 'none';
    }, 750);
  });
}

function updateWithCurrentFibValue() {

  chrome.tabs.query({active:true, windowType: 'normal', currentWindow: true}, tabs => {
    const activeTab = tabs[0];
    const message = {type: 'winbonacci-get-tab', tabId: activeTab.id};

    chrome.runtime.sendMessage(message, (tab) => {
      setElementText('fibN', tab.n.toString());
      setElementText('fibValue', tab.fibValue.toString());
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

  updateWithCurrentFibValue();
});
