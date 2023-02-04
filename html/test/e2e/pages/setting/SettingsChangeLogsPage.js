(function () {
  'use strict';

  var SettingsChangeLogsPage = function () {
    var
    settingsChangelogsView = element(by.css(".setting-changelogs ")),
    appChangelogsTab = settingsChangelogsView.element(by.css("ul.tabs li:nth-child(1).tabs-title a")),
    brChangelogsTab = settingsChangelogsView.element(by.css("ul.tabs li:nth-child(2).tabs-title a"));

    this.getSettingsChangeLogsView = function () {
      return settingsChangelogsView;
    };

    this.getAppChangeLogsTab = function () {
      return appChangelogsTab;
    };

    this.getBrChangeLogsTab = function () {
      return brChangelogsTab;
    };
  };

  module.exports = new SettingsChangeLogsPage();

})();
