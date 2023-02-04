/*
    MainSettingsPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var MainSettingsPage = function() {
    var settings_view = element(by.className('settings-view')),
      settings_account_view = settings_view.element(by.className('settings-account')),
      setting_account_button = settings_view.element(by.className('icon-cogs')),
      setting_persons_button = settings_view.element(by.className('fi-person-genderless')),
      settings_persons_view = settings_view.element(by.className('users-list')),
      setting_groups_button = settings_view.element(by.className('icon-tree6')),
      settings_groups_view = settings_view.element(by.className('groups-list')),
      setting_roles_button = settings_view.element(by.className('fi-key')),
      settings_roles_view = settings_view.element(by.className('roles-list')),
      setting_vehicles_button = settings_view.element(by.className('icon-lf_car')),
      settings_vehicles_view = settings_view.element(by.className('vehicles-list')),
      setting_machines_button = settings_view.element(by.className('icon-lf_vibrating_plate')),
      settings_machines_view = settings_view.element(by.className('machines-list')),
      setting_standalones_button = settings_view.element(by.className('icon-station')),
      settings_standalones_view = settings_view.element(by.className('standalones-list')),
      setting_mobileassets_button = settings_view.element(by.className('icon-hammer-wrench')),
      settings_mobileassets_view = settings_view.element(by.className('mobileassets-list')),
      setting_geozones_button = settings_view.element(by.className('icon-location3')),
      settings_geozones_view = settings_view.element(by.className('categories-list')),
      setting_business_rules_button = settings_view.element(by.className('fi-warning')),
      settings_business_rules_view = settings_view.element(by.className('businessrules-list')),
      setting_time_booking_button = settings_view.element(by.className('fi-timer')),
      settings_time_booking_view = element(by.className('settings-timebooking')),
      settings_payment_button = settings_view.element(by.className('icon-coin-dollar')),
      payment_list = settings_view.element(by.className('payments-list')),
      settings_changeLogs_button = settings_view.element(by.css('a span.icon-pencil7.iconic-md'));

    this.getSettingsView = function() {
      return settings_view;
    };

    this.getSettingsChangeLogsButton = function () {
      return settings_changeLogs_button;
    };

    this.getPaymentList = function(){
      return payment_list;
    };

    this.getSettingsPaymentButton = function(){
      return settings_payment_button;
    };

    this.getSettingsAccountView = function() {
      return settings_account_view;
    };

    this.clickSettingsAccountButton = function() {
      browser.executeScript("arguments[0].click();", setting_account_button.getWebElement());
    };

    this.getSettingsPersonsView = function() {
      return settings_persons_view;
    };

    this.clickSettingsPersonsButton = function() {
      browser.executeScript("arguments[0].click();", setting_persons_button.getWebElement());
    };

    this.getSettingsPersonsButton = function() {
      return setting_persons_button;
    };

    this.getSettingsGroupsView = function() {
      return settings_groups_view;
    };

    this.clickSettingGroupsButton = function() {
      browser.executeScript("arguments[0].click();", setting_groups_button.getWebElement());
    };

    this.getSettingsGroupsButton = function() {
      return setting_groups_button;
    };

    this.getSettingsRolesView = function() {
      return settings_roles_view;
    };

    this.clickSettingsRolesButton = function() {
      browser.executeScript("arguments[0].click();", setting_roles_button.getWebElement());
    };

    this.getSettingsRoleButton = function() {
      return setting_roles_button;
    };

    this.getSettingsVehiclesView = function() {
      return settings_vehicles_view;
    };

    this.getSettingsVehiclesButton = function() {
      return setting_vehicles_button;
    };

    this.clickSettingsVehiclesButton = function() {
      browser.executeScript("arguments[0].click();", setting_vehicles_button.getWebElement());
    };

    this.getSettingsMachinesView = function() {
      return settings_machines_view;
    };

    this.getSettingsMachinesButton = function() {
      return setting_machines_button;
    };

    this.clickSettingsMachinesButton = function() {
      browser.executeScript("arguments[0].click();", setting_machines_button.getWebElement());
    };

    this.getSettingsStandalonesView = function() {
      return settings_standalones_view;
    };

    this.getSettingsStandalonesButton = function() {
      return setting_standalones_button;
    };

    this.clickSettingsStandalonesButton = function() {
      browser.executeScript("arguments[0].click();", setting_standalones_button.getWebElement());
    };

    this.getSettingsMobileassetsView = function() {
      return settings_mobileassets_view;
    };

    this.getSettingsMobileassetsButton = function() {
      return setting_mobileassets_button;
    };

    this.clickSettingsPaymentButton = function(){
      return settings_payment_button.click();
    };

    this.clickSettingsMobileassetsButton = function() {
      browser.executeScript("arguments[0].click();", setting_mobileassets_button.getWebElement());
    };

    this.getSettingsGeozonesView = function() {
      return settings_geozones_view;
    };

    this.getSettingsGeozonesButton = function() {
      return setting_geozones_button;
    };

    this.clickSettingsGezonesButton = function() {
      browser.executeScript("arguments[0].click();", setting_geozones_button.getWebElement());
    };

    this.getSettingsBusinessRulesView = function() {
      return settings_business_rules_view;
    };

    this.getSettingsBusinessRulesButton = function() {
      return setting_business_rules_button;
    };

    this.clickSettingsBusinessRulesButton = function() {
      browser.executeScript("arguments[0].click();", setting_business_rules_button.getWebElement());
    };

    this.getSettingsTimeBookingsView = function() {
      return settings_time_booking_view;
    };

    this.getSettingsTimeBookingsButton = function() {
      return setting_time_booking_button;
    };

    this.clickSettingsWorkerConnectButton = function() {
      browser.executeScript("arguments[0].click();", setting_time_booking_button.getWebElement());
    };

  };
  module.exports = new MainSettingsPage();
})();
