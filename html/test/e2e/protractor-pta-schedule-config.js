var failFast = require('protractor-fail-fast');

exports.config = {
  plugins: [
    failFast.init(),
  ],

  specs: [
    //test with data
    'login-demo-main-spec.js',
    'filter-panel-general-list-view-spec.js',
    'pta-check-overview-objects-status-spec.js',
    'pta-check-overview-machines-status-spec.js',
    'pta-schedule-report-journeys-spec.js',
    'pta-schedule-report-machines-spec.js',

     'schedule-performance-dashboard-spec.js',
     'pta-compare-data-history-and-journeys-report-spec.js',
     'pta-check-objects-status-spec.js',
     'logout-main-spec.js'

  ],
  directConnect: true,
  multiCapabilities: [
  {
    browserName: 'firefox',
    marionette: true,
    acceptInsecureCerts: true,
    'moz:firefoxOptions': {
      args: [
        "--headless"
      ],
      prefs: {
        'browser.download.folderList': 2,
        'browser.download.dir': process.cwd() + "/resources/test/export_file",
        'services.sync.prefs.sync.browser.download.useDownloadDir': true,
        'browser.download.useDownloadDir': true,
        'browser.download.manager.alertOnEXEOpen': false,
        'browser.download.manager.closeWhenDone': true,
        'browser.download.manager.focusWhenStarting': false,
        'browser.download.manager.showWhenStarting': false,
        'browser.helperApps.alwaysAsk.force': false,
        'browser.download.manager.showAlertOnComplete': false,
        'browser.download.manager.useWindow': false,
        'browser.helperApps.neverAsk.saveToDisk': 'text/plain;text/csv;application/csv;text/comma-separat‌​ed-values;application/excel;application/octet-stream;application/xlsx;application/xls;application/vnd.ms-excel;application/vnd.ms-excel.addin.macroenabled.12;application/vnd.ms-excel.sheet.binary.macroenabled.12;application/vnd.ms-excel.template.macroenabled.12;application/vnd.ms-excel.sheet.macroenabled.12;application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    }
  },
    // {
    //   browserName: 'chrome',
    //   acceptInsecureCerts: true,
    //   chromeOptions: {
    //     args: [
    //       "--headless",
    //     ],
    //     prefs: {
    //       'download': {
    //         'prompt_for_download': false,
    //         'directory_upgrade': true,
    //         'default_directory': process.cwd() + "/resources/test/export_file/",
    //       },
    //
    //     },
    //   },
    // }
  ],
  baseUrl: 'https://pta.logifleet360.ch',
  framework: 'jasmine',
  onPrepare: function() {
    browser.driver.manage().window().setSize(1920, 1080);
    browser.waitForAngularEnabled(false);
  },

  afterLaunch: function() {
    failFast.clean(); // Removes the fail file once all test runners have completed.
  }
};
