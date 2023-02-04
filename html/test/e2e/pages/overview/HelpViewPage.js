/*
    HelpViewPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var HelpViewPage = function() {
    var help_view = element(by.css('.help-view')),
      help_info = element(by.css('.help-view .fi-info')),
      help_api_doc_button = element(by.css('.help-view .fi-file-css.iconic-md')),
      help_api = element(by.css('.help-view .api')),
      help_releaseNotes = element(by.css('.help-view .icon-notebook')),
      help_workerConnect = element(by.css('.help-view .fi-timer'));

    this.getHelpView = function() {
      return help_view;
    };

    this.getHelpInfo = function() {
      return help_info;
    };

    this.getHelpReleaseNotes = function() {
      return help_releaseNotes;
    };

    this.getHelpAPI = function() {
      return help_api;
    };

    this.getHelpWoC = function() {
      return help_workerConnect;
    };

    this.clickHelpInfo = function() {
      browser.executeScript("arguments[0].click();", help_info.getWebElement());
    };

    this.clickHelpWoC = function() {
      browser.executeScript("arguments[0].click();", help_workerConnect.getWebElement());
    };

    this.clickHelpAPIButton = function() {
      browser.executeScript("arguments[0].click();", help_api_doc_button.getWebElement());
    };

  };
  module.exports = new HelpViewPage();
})();
