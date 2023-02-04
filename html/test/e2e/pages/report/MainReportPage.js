/*
    MainReportPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var testUtils = require('./TestUtils');
  var MainReportPage = function() {
    var report_view = element(by.className('reports-view')),
      reports_list_view = report_view.element(by.className('reports-list')),
      reports_list_button = report_view.element(by.css('.icon-file-presentation.iconic-md')),
      subscriptions_list_button = report_view.element(by.css('.icon-clock.iconic-md')),
      subscriptions_list_view = report_view.element(by.css('.subscriptions-list')),

      journeys = element(by.css('div[user-permissions="report.report.activity"]')),
      geozones = element(by.css('div[user-permissions="report.report.timeInGeozone"]')),
      machines = element(by.css('div[user-permissions="report.report.machine"]')),
      temperature_details = element(by.css('div[user-permissions="report.report.temperature"]')),
      notifications = element(by.css('div[user-permissions="report.report.notification"]')),
      working_time = element(by.css('div[user-permissions="report.report.workingTime"]')),
      equipment = element(by.css('div[user-permissions="report.report.equipment"]')),

      report_control_list = element.all(by.css('.report-control-panel div.medium-12:not(.ng-hide)')),
      report_title = element(by.css('.report-control-panel .report-title h3')),

      optionSelect = element(by.id("optionSelect")),

      time_frame_today = element(by.css('#reportTimeSelect label[for="timeframe-today"]')),
      time_frame_yesterday = element(by.css('#reportTimeSelect label[for="timeframe-yesterday"]')),
      time_frame_last7days = element(by.css('#reportTimeSelect label[for="timeframe-last7"]')),
      time_frame_custom = element(by.css('#reportTimeSelect label[for="timeframe-custom"]')),

      from_calendar = element(by.css('#reportTimeSelect div.medium-12:nth-of-type(2) .k-i-calendar')),
      from_time = element(by.css('#reportTimeSelect div.medium-12:nth-of-type(2) .k-i-clock')),
      to_calendar = element(by.css('#reportTimeSelect div.medium-12:nth-of-type(3) .k-i-calendar')),
      to_time = element(by.css('#reportTimeSelect div.medium-12:nth-of-type(3) .k-i-clock')),

      journey_show_advanced_settings = element(by.css('.report-control-panel .medium-12.time-intervals-advanced-toggle a:not(.ng-hide)')),
      add_time_interval = element(by.css('.report-control-panel .medium-12 multi-time-interval button.ok')),
      time_interval_list = element.all(by.css('.report-control-panel .medium-12 multi-time-interval div.conditions-list div.businessrule-module.time-interval')),

      temperature_range = element.all(by.css('.report-control-panel .medium-6:not(.ng-hide) .k-numerictextbox')),
      temperatureAllRangeSwitcher = element(by.css('.report-control-panel .medium-6:not(.ng-hide) label[for="detailedTemperatures"]')),

      today = element(by.css('.k-animation-container div[aria-hidden="false"] tr td.k-today a')),
      choose_day = element(by.css('.k-animation-container div[aria-hidden="false"] tr td.k-state-selected.k-state-focused[aria-selected="true"] a')),
      custom_day = element(by.css('.k-animation-container div[aria-hidden="false"] tr:nth-of-type(1) td:nth-of-type(1)')),

      subcrible_button = element(by.css('button[ng-click="createSubscription()"]')),
      reportControlPanel = element(by.css(".report-control-buttons")),
      loaderReportSpinner = element(by.css("report-viewer .lf-loader-overlay.report-loader")),
      expandAllButton = reportControlPanel.element(by.css('[ng-click="expandAll()"]')),
      reset_button = element(by.css('button[ng-click="reset()"]')),
      show_button = element(by.css('button[ng-click="getReport()"]'));

    this.getReportView = function() {
      return report_view;
    };

    this.getTemperatureAllRangeSwitcher = function () {
      return temperatureAllRangeSwitcher;
    };

    this.getExpandAllButton = function () {
      return expandAllButton;
    };

    this.getReportControlPanel = function () {
      return reportControlPanel;
    };

    this.getLoaderReportSpinner = function () {
      return loaderReportSpinner;
    };

    this.getOptionSelect = function(){
      return optionSelect;
    };

    this.getReportListView = function() {
      return reports_list_view;
    };

    this.getSubscriptionsListView = function() {
      return subscriptions_list_view;
    };

    this.getSubcriptionsListButton = function() {
      return subscriptions_list_button;
    };

    this.getToday = function() {
      return today;
    };

    this.getChooseDay = function() {
      return choose_day;
    };

    this.getCustomDay = function() {
      return custom_day;
    };

    this.getSubcribleButton = function() {
      return subcrible_button;
    };

    this.getResetButton = function() {
      return reset_button;
    };

    this.getShowButton = function() {
      return show_button;
    };

    this.getJourneyShowAdvancedSettings = function() {
      return journey_show_advanced_settings;
    };

    this.getAddTimeInterval = function() {
      return add_time_interval;
    };

    this.getTimeIntervalList = function() {
      return time_interval_list;
    };

    this.getJourneys = function() {
      return journeys;
    };

    this.getGeozones = function() {
      return geozones;
    };

    this.getTemperatureDetails = function() {
      return temperature_details;
    };

    this.getNotifications = function() {
      return notifications;
    };

    this.getWorkingTime = function() {
      return working_time;
    };

    this.getEquipment = function() {
      return equipment;
    };

    this.getReportTitle = function() {
      return report_title;
    };

    this.getReportControlList = function() {
      return report_control_list;
    };

    this.getTimeFrameToday = function() {
      return time_frame_today;
    };

    this.getTimeFrameYesterday = function() {
      return time_frame_yesterday;
    };

    this.getTimeFrameLast7days = function() {
      return time_frame_last7days;
    };

    this.getTimeFrameCustom = function() {
      return time_frame_custom;
    };

    this.getFromCalendar = function() {
      return from_calendar;
    };

    this.getFromTime = function() {
      return from_time;
    };

    this.getToCalendar = function() {
      return to_calendar;
    };

    this.getToTime = function() {
      return to_time;
    };

    this.getTemperatureRange = function() {
      return temperature_range;
    };

    this.clickShowAdvancedSettings = function() {
      browser.executeScript("arguments[0].click();", journey_show_advanced_settings.getWebElement());
    };

    this.clickAddTimeInterval = function() {
      browser.executeScript("arguments[0].click();", add_time_interval.getWebElement());
    };

    this.clickReportTitle = function() {
      browser.executeScript("arguments[0].click();", report_title.getWebElement());
    };

    this.clickJourneys = function() {
      browser.executeScript("arguments[0].click();", journeys.getWebElement());
    };

    this.clickTimeframeCustomDay = function(){
      time_frame_custom.click();
    };

    this.clickGeozones = function() {
      browser.executeScript("arguments[0].click();", geozones.getWebElement());
    };

    this.clickTemperatureDetails = function() {
      browser.executeScript("arguments[0].click();", temperature_details.getWebElement());
    };

    this.clickNotifications = function() {
      browser.executeScript("arguments[0].click();", notifications.getWebElement());
    };

    this.clickWorkingTime = function() {
      browser.executeScript("arguments[0].click();", working_time.getWebElement());
    };

    this.clickEquipment = function() {
      browser.executeScript("arguments[0].click();", equipment.getWebElement());
    };

    this.clickReportListButton = function() {
      browser.executeScript("arguments[0].click();", reports_list_button.getWebElement());
    };

    this.clickSubcriptionsListButton = function() {
      browser.executeScript("arguments[0].click();", subscriptions_list_button.getWebElement());
    };

    this.checkToClickYesterdayRadio = function() {
      browser.executeScript("arguments[0].click();", this.getTimeFrameYesterday().getWebElement());
      browser.executeScript("arguments[0].click();", this.getTimeFrameCustom().getWebElement());
      browser.wait(testUtils.until.elementToBeClickable(this.getFromCalendar()));
      browser.executeScript("arguments[0].click();", this.getFromCalendar().getWebElement());
      browser.wait(testUtils.until.visibilityOf(this.getChooseDay()));
    };

    this.checkToClickLast7Days = function() {
      browser.executeScript("arguments[0].click();", this.getTimeFrameLast7days().getWebElement());
      browser.executeScript("arguments[0].click();", this.getTimeFrameCustom().getWebElement());
      browser.wait(testUtils.until.elementToBeClickable(this.getFromCalendar()));
      browser.executeScript("arguments[0].click();", this.getFromCalendar().getWebElement());
      browser.wait(testUtils.until.visibilityOf(this.getChooseDay()));
    };

    this.checkToClickCustomRadio = function() {
      browser.executeScript("arguments[0].click();", this.getTimeFrameToday().getWebElement());
      browser.executeScript("arguments[0].click();", this.getTimeFrameCustom().getWebElement());
      browser.wait(testUtils.until.elementToBeClickable(this.getFromCalendar()));
      browser.executeScript("arguments[0].click();", this.getFromCalendar().getWebElement());
      browser.wait(testUtils.until.presenceOf(this.getCustomDay()));
      browser.executeScript("arguments[0].click();", this.getCustomDay().getWebElement());
      browser.wait(testUtils.until.elementToBeClickable(this.getFromCalendar()));
      browser.executeScript("arguments[0].click();", this.getFromTime().getWebElement());
      browser.executeScript("arguments[0].click();", this.getFromCalendar().getWebElement());
      browser.wait(testUtils.until.visibilityOf(this.getChooseDay()));
    };

    this.convertDateString = function(string) {
      var str = [],
        time = [];
      str = string.split(" ");
      time = str[0].split("/");
      return time[1] + "/" + time[0] + "/" + time[2] + " " + str[1];
    };

    this.clearString = function(elem, length) {
      length = length || 25;
      var backspaceSeries = '';
      backspaceSeries = Array(length).join(protractor.Key.BACK_SPACE);
      elem.sendKeys(backspaceSeries);
    };

    this.clearString2 = function(elem, length) {
      length = length || 25;
      var deleteSeries = '';
      deleteSeries = Array(length).join(protractor.Key.DELETE);
      elem.sendKeys(deleteSeries);
    };


  };
  module.exports = new MainReportPage();
})();
