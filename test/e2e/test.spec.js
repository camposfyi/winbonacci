const _ = require('lodash');
const assert = require('assert');
const {browser, element, by} = require('protractor');


describe('Wibonacci e2e tests', () => {

  const extensionId = 'fekagkeagpgcdcfgbnlnbmljglnmbohe';

  it('initializes wibonacci sequence on browser start', async () => {
    await loadPopupPage();

    await assertWibonacciState(1, 1);
  });

  it('increments wibonacci sequence on new tab', async () => {
    await openTab();
    await switchToTab(1);

    await assertWibonacciState(2, 1);
  });

  it('increments wibonacci sequence on page load' , async () => {
    await browser.get('https://google.com');

    await assertWibonacciState(3, 2);
  });

  it('resets the sequence when reset button is clicked', async () => {
    await assertWibonacciState(3, 2);

    await closeAllTabsExceptLast();
    element(by.id('resetButton')).click();

    await assertWibonacciState(1, 1);
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

  async function assertWibonacciState(expectedN, expectedValue) {
    await loadPopupPage();
    const n = await getWibonacciN();
    const value = await getWibonacciValue();

    assert.strictEqual(n, expectedN);
    assert.strictEqual(value, expectedValue);
  }

  function switchToTab(tabIndex) {
    return browser.getAllWindowHandles().then(handles => {
      browser.driver.switchTo().window(handles[tabIndex]);
    });
  }

  async function getWibonacciN() {
    const n = await element(by.id('wibonacciN')).getText();
    return Number(n);
  }

  async function getWibonacciValue() {
    const n = await element(by.id('wibonacciValue')).getText();
    return Number(n);
  }

  function loadPopupPage() {
    return browser.get(`chrome-extension://${extensionId}/html/popup.html`);
  }

  function openTab() {
    return browser.executeScript('window.open()');
  }

});