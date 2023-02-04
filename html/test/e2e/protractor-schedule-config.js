var failFast = require("protractor-fail-fast");

exports.config = {
  plugins: [failFast.init()],

  /*
      File by file list for first step deploy on int (current)
      -> spec order execution is pertinent
  */
  specs: [
    //test with data
    'login-demo-main-spec.js',
    'schedule-machines-report-spec.js',
    'settings-region-overlap-geozones-spec.js',
    'compare-temperature-on-overview-panel-and-report-spec.js',
    'check-overview-vehicles-spec.js',
    'check-overview-machines-spec.js',
    'filter-panel-general-list-view-spec.js',
    'check-overview-objects-status-spec.js',
    'check-overview-machines-status-spec.js',
    'check-overview-vehicles-status-spec.js',
    'click-on-vehicle-main-spec.js',
    'click-on-machine-main-spec.js',
    'click-on-mobile-assets-spec.js',
    'list-view-vehicle-spec.js',
    'list-view-machine-spec.js',
    'list-view-object-spec.js',
    'filter-general-vehicle-history-by-resouce-spec.js',//  =>refactor test
    'check-overview-timesince-livetracking-spec.js',
    'schedule-business-rules-notifications-spec.js',
    'history-panel-activity-logs-spec.js',
    'history-panel-journeys-spec.js',
    'schedule-report-journeys-spec.js',// reports have no data
    'schedule-report-machines-spec.js',
    // 'schedule-report-geozones-spec.js',choose wednesday but render many days
    'schedule-performance-dashboard-spec.js',
    'compare-data-history-and-journeys-report-spec',
    'logout-main-spec.js',
    'login-int-annguyen-spec.js',
    'tracking-notifications-show-on-map-spec.js',
    'logout-main-spec.js',

    // Reset password
    // TODO: tests to be done, remove TODO when done*/
  ],
  directConnect: true,
  multiCapabilities: [
    {
      browserName: "firefox",
      marionette: true,
      acceptInsecureCerts: true,
      "moz:firefoxOptions": {
        args: ["--headless"],
        prefs: {
          "time-zone": "Europe/Zurich",
          "browser.download.folderList": 2,
          "browser.download.dir": process.cwd() + "/resources/test/export_file",
          "services.sync.prefs.sync.browser.download.useDownloadDir": true,
          "browser.download.useDownloadDir": true,
          "browser.download.manager.alertOnEXEOpen": false,
          "browser.download.manager.closeWhenDone": true,
          "browser.download.manager.focusWhenStarting": false,
          "browser.download.manager.showWhenStarting": false,
          "browser.helperApps.alwaysAsk.force": false,
          "browser.download.manager.showAlertOnComplete": false,
          "browser.download.manager.useWindow": false,
          "browser.helperApps.neverAsk.saveToDisk":
            "text/plain;text/csv;application/csv;text/comma-separat‌​ed-values;application/excel;application/octet-stream;application/xlsx;application/xls;application/vnd.ms-excel;application/vnd.ms-excel.addin.macroenabled.12;application/vnd.ms-excel.sheet.binary.macroenabled.12;application/vnd.ms-excel.template.macroenabled.12;application/vnd.ms-excel.sheet.macroenabled.12;application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      },
    },
    {
      browserName: 'chrome',
      acceptInsecureCerts: true,
      chromeOptions: {
        args: [
          "--headless",
        ],
        prefs: {
          'download': {
            'prompt_for_download': false,
            'directory_upgrade': true,
            'default_directory': process.cwd() + "/resources/test/export_file/",
          },
    
        },
      },
    }
  ],
  baseUrl: "https://int.logifleet360.ch",
  framework: "jasmine",
  onPrepare: function () {
    browser.driver.manage().window().setSize(1920, 1080);
    browser.waitForAngularEnabled(false);
  },

  afterLaunch: function () {
    failFast.clean(); // Removes the fail file once all test runners have completed.
  },
};
