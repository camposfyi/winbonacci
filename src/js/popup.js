document.addEventListener('DOMContentLoaded', () => {
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', () => {
    chrome.runtime.sendMessage('winbonacci-reset', () => {

      const notificationElement = document.getElementById('resetNotification');
      notificationElement.style.display = 'block';
      setTimeout(() => {
        window.close();
      }, 750);

    });
  });
});
