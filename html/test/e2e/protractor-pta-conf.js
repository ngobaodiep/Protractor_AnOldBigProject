var failFast = require('protractor-fail-fast');

exports.config = {
  plugins: [
    failFast.init(),
  ],

  /*
      File by file list for first step deploy on pta (current)
      -> spec order execution is pertinent
  */
  specs: [
    // Login module
    'login-spec.js',

    // Main
    'login-main-spec.js',
    // TODO: all main tests here
    'navigation-main-spec.js',
    'geozone-panel-spec.js',
    'click-on-geozone-spec.js',
    'map-options-spec.js',
    'settings-account-spec.js',
    'settings-group-spec.js',
    'settings-persons-spec.js',
    'setting-role-spec.js',
    'settings-vehicle-spec.js',
    'settings-vehicle-category-spec.js',
    'settings-machine-spec.js',
    'settings-machine-category-spec.js',
    'settings-standalone-spec.js',
    'settings-object-spec.js',
    'settings-geozone-spec.js',
    'settings-business-rules-spec.js',
    'settings-business-rules-conditions-spec.js',
    'settings-payment-spec.js',//need refactor -> create persion actived -> active licenses in woc -> check paid
    'worker-connect-global-spec.js',
    'worker-connect-tasks-spec.js',
    'worker-connect-customers-spec.js',
    'worker-connect-sites-spec.js',
    'report-subcriptions-spec.js',
    'notifications-panel-spec.js',
    'journey-optimizer-panel-spec.js',
    'report-geozones-spec.js',
    'report-temperature-details-spec.js',
    'report-notifications-spec.js',
    'report-working-time-spec.js',
    'report-journeys-spec.js',
    'report-equipment-spec.js',
    'history-panel-spec.js',
    'tracking-geozone-panel-map-elements-spec.js',
    'worker-connect-report-spec.js',
    'worker-connect-licenses-report-spec.js',
    'report-machines-spec.js',
    'logout-main-spec.js',

    // Reset password
    // TODO: tests to be done, remove TODO when done*/
  ],
  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  directConnect: true,
  multiCapabilities: [{
      browserName: 'firefox',
      marionette: true,
      acceptInsecureCerts: true,
      'moz:firefoxOptions': {
        args: [
          "--headless",
        ],
        prefs: {
          'signon.rememberSignons': false,
          'services.sync.prefs.sync.signon.rememberSignons': false,
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
          'browser.helperApps.neverAsk.openFile': true,
          'pdfjs.disabled': true,
          'plugin.scan.plid.all': false,
          'plugin.scan.Acrobat': 99.0,
          'browser.helperApps.neverAsk.saveToDisk': 'application/pdf;text/plain;text/csv;application/csv;text/comma-separat‌​ed-values;application/excel;application/octet-stream;application/xlsx;application/xls;application/vnd.ms-excel;application/vnd.ms-excel.addin.macroenabled.12;application/vnd.ms-excel.sheet.binary.macroenabled.12;application/vnd.ms-excel.template.macroenabled.12;application/vnd.ms-excel.sheet.macroenabled.12;application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      }
    },

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
