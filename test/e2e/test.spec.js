const _ = require('lodash');
const assert = require('assert');
const {browser, element, by} = require('protractor');


describe('Wibonacci e2e tests', () => {

  const extensionId = 'fekagkeagpgcdcfgbnlnbmljglnmbohe';

  it('initializes fibonacci sequence on browser start', async () => {
    await loadPopupPage();

    await assertFibState(1, 1);
  });

  it('increments fibonacci sequence on new tab', async () => {
    await openTab();
    await switchToTab(1);

    await assertFibState(2, 1);
  });

  it('increments fibonacci sequence on page load' , async () => {
    await browser.get('https://google.com');

    await assertFibState(3, 2);
  });

  it('resets the sequence when reset button is clicked', async () => {
    await assertFibState(3, 2);

    await closeAllTabsExceptLast();
    element(by.id('resetButton')).click();

    await assertFibState(1, 1);
  });

  async function closeAllTabsExceptLast() {
    let lastTab = null;
    await browser.getAllWindowHandles().then(tabs => {
      lastTab = tabs[tabs.length-1];

      for(let i=0; i<tabs.length-1; i++) {
        browser.driver.switchTo().window(tabs[i]);
        browser.driver.close();
      }
    });

    browser.driver.switchTo().window(lastTab);
  }

  async function assertFibState(expectedN, expectedValue) {
    await loadPopupPage();
    const n = await getNValue();
    const value = await getFibValue();

    assert.strictEqual(n, expectedN);
    assert.strictEqual(value, expectedValue);
  }

  function switchToTab(tabIndex) {
    return browser.getAllWindowHandles().then(handles => {
      browser.driver.switchTo().window(handles[tabIndex]);
    });
  }

  async function getNValue() {
    const n = await element(by.id('fibN')).getText();
    return Number(n);
  }

  async function getFibValue() {
    const n = await element(by.id('fibValue')).getText();
    return Number(n);
  }

  function loadPopupPage() {
    return browser.get(`chrome-extension://${extensionId}/html/popup.html`);
  }

  function openTab() {
    return browser.executeScript('window.open()');
  }

});