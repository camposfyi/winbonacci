const path = require('path');
const extensionPath = path.join(__dirname, '..', '..', 'build', 'dev');

exports.config = {
  allScriptsTimeout: 111000,
  specs: [
    './*.spec.js'
  ],
  seleniumAddress: 'http://localhost:4444/wd/hub',
  SELENIUM_PROMISE_MANAGER: false,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--system-developer-mode',
        `--load-extension=${extensionPath}`
      ]
    }
  },
  directConnect: true,
  framework: 'mocha',
  mochaOpts: {
    reporter: "spec",
    slow: 111000,
    ui: 'bdd',
    timeout: 111000
  },
  beforeLaunch: () => {

  },
  onPrepare: function () {
    browser.ignoreSynchronization = true;
  }
};