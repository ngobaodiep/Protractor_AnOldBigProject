/*
    OverviewPanelPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var OverviewPanelPage = function() {
    var overview_panel = element(by.css('.tracking-view .overview-panel')),
    searchInputClearButton = element(by.css('[ng-click="clearFilter()"]')),
    searchInput = overview_panel.element(by.css("input#overviewInputSearch"));

    this.getOverviewPanel = function() {
      return overview_panel;
    };

    this.getSearchInputClearBtn = function () {
      return searchInputClearButton;
    };

    this.getSearchInput = function () {
      return searchInput;
    };

    this.getOverviewGridRow = function(n) {
      return overview_panel.element(by.css('.k-grid-content tr:nth-of-type(' + n + ') .map-element-info'));
    };

    this.getAllOverviewGridRow = function() {
      return overview_panel.all(by.css('.k-grid-content tr .map-element-info'));
    };

    this.getMapElementName = function(n) {
      return this.getOverviewGridRow(n).element(by.css('.map-element-name'));
    };

    this.getMapElementStatusIcon = function(n) {
      return this.getOverviewGridRow(n).element(by.css('.tooltip-icon-status-row .small-2 span.fi-shape-circle'));
    };

    this.getMapElementStatus = function(n) {
      return this.getOverviewGridRow(n).element(by.css('.tooltip-icon-status-row .small-10 strong.ng-binding'));
    };

    this.getMapElementStatusTime = function(n) {
      return this.getOverviewGridRow(n).element(by.css('.tooltip-icon-status-row .small-10 div.ng-binding.ng-scope'));
    };

    this.getMapElementCategoryFieldIcon = function(n) {
      return this.getOverviewGridRow(n).element(by.css('tracking-object-category-field span.iconic-md')); //.fi-tools.iconic-md
    };

    this.getMapElementCategoryField = function(n) {
      return this.getOverviewGridRow(n).element(by.css('tracking-object-category-field .small-10.ng-binding'));
    };

    this.getMapElementAddressIcon = function(n) {
      return this.getOverviewGridRow(n).element(by.css('.address-field div[ng-if="isValid(address)"] .fi-map-marker.iconic-md'));
    };

    this.getMapElementAddress = function(n) {
      return this.getOverviewGridRow(n).element(by.css('.address-field div[ng-if="isValid(address)"] .small-10 .ng-binding'));
    };

    this.getMapElementGeozonesList = function(n) {
      return this.getOverviewGridRow(n).all(by.css('div[ng-repeat="geozone in geozones"]'));
    };

    this.getMapElementTemperatureIcon = function(n) {
      return this.getOverviewGridRow(n).element(by.css('temperature-tags-field span.iconic-md:not(.tags-unknown)'));
    };

    this.getMapElementUnknownTemperatureIcon = function(n) {
      return this.getOverviewGridRow(n).element(by.css('temperature-tags-field span.iconic-md.tags-unknown'));
    };

    this.getMapElementTemperatureNumber = function(n) {
      return this.getOverviewGridRow(n).element(by.css('temperature-tags-field .small-10 .small-3.ng-binding'));
    };

    this.getMapElementTemperatureDescription = function(n) {
      return this.getOverviewGridRow(n).element(by.css('temperature-tags-field .small-10 .small-9.ng-binding'));
    };

    this.getMapElementUnknownTemperature = function(n) {
      return this.getOverviewGridRow(n).element(by.css('temperature-tags-field div.small-10.unknown.ng-binding'));
    };

    this.getMapElementOpenNotificationsBell = function(n) {
      return this.getOverviewGridRow(n).element(by.css('open-notifications span.fi-bell.iconic-md'));
    };

    this.getMapElementOpenNotificationsAlert = function(n) {
      return this.getOverviewGridRow(n).element(by.css('open-notifications span.alert-notifications.ng-binding'));
    };

    this.getMapElementOpenNotificationsWarning = function(n) {
      return this.getOverviewGridRow(n).element(by.css('open-notifications span.warning-notifications.ng-binding'));
    };

    this.getMapElementOpenNotificationsNoti = function(n) {
      return this.getOverviewGridRow(n).element(by.css('open-notifications span.notification-notifications.ng-binding'));
    };

    this.getMapElementOpenNotificationsCrossBell = function(n) {
      return this.getOverviewGridRow(n).element(by.css('open-notifications span.icon-bell-cross'));
    };

    this.getMapElementOpenNotificationsEyes = function(n) {
      return this.getOverviewGridRow(n).element(by.css('open-notifications span.fi-eye-open.iconic-md'));
    };

    this.getLastSeenIcon = function(n) {
      return this.getOverviewGridRow(n).element(by.css('.last-seen-by .small-2 .iconic-md'));
    };

    this.getLastSeen = function(n) {
      return this.getOverviewGridRow(n).element(by.css('.last-seen-by .small-10'));
    };

    this.getMapElementSpeedIcon = function(n) {
      return this.getOverviewGridRow(n).element(by.css('div.small-12.tooltip-speed span.iconic-md'));
    };

    this.getMapElementSpeed = function(n) {
      return this.getOverviewGridRow(n).element(by.css('div.small-12.tooltip-speed div.small-10.ng-binding'));
    };

    this.getEquipmentList = function(n) {
      return this.getOverviewGridRow(n).all(by.css('equipments div[ng-repeat="equipment in equipments"]'));
    };

    this.getMapElementDriverIcon = function(n) {
      return this.getOverviewGridRow(n).element(by.css('driver-field span.icon-steering-wheel.iconic-md'));
    };

    this.getMapElementDriver = function(n) {
      return this.getOverviewGridRow(n).element(by.css('driver-field div.small-10 span:nth-child(2).ng-binding'));
    };

    this.clickOverviewGridRow = function(n) {
      // browser.executeScript("arguments[0].click();", element(by.css('.overview-panel .k-grid-content tr:nth-of-type(' + n + ') map-element-info')).getWebElement());
      overview_panel.element(by.css('.k-grid-content tr:nth-of-type(' + n + ') map-element-info .map-element-name')).click();
    };
  };
  module.exports = new OverviewPanelPage();
})();
