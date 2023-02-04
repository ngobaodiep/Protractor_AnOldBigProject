/*
    FilterPanelPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/

(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
      mainPage = require('./MainPage');
  var FilterPanelPage = function() {
    var filter_panel = element(by.css('.filter-panel')),

      vehicles_switcher = element(by.css('.filter-panel .tabs-content label.switch-paddle[for="showVehicles"]')),
      machines_switcher = element(by.css('.filter-panel label.switch-paddle[for="showMachines"]')),
      standalones_switcher = element(by.css('.filter-panel label.switch-paddle[for="showStandalones"]')),
      workers_switcher = element(by.css('.filter-panel label.switch-paddle[for="showWorkers"]')),
      mobileassets_switcher = element(by.css('.filter-panel label.switch-paddle[for="showMobileassets"]')),
      geozones_switcher = element(by.css('.filter-panel label.switch-paddle[for="showGeozones"]')),

      general_tab = element(by.css('.filter-panel ul.tabs li[active="tabs.advanced"] > a')),
      groups_tab = element(by.css('.filter-panel .tabbable ul.tabs li[active="tabs.groups"] > a')),
      active_tab = element(by.css('.filter-panel  .tabs-content .tabs-panel.is-active')),

      filter_general_category = active_tab.element(by.css('div:nth-child(6).small-12.mobileassets .small-12.ng-scope:nth-child(1) .k-multiselect-wrap.k-floatwrap')),
      filter_general_status = active_tab.element(by.css('div:nth-child(6).small-12.mobileassets .small-12.ng-scope:nth-child(2) .k-multiselect-wrap.k-floatwrap')),

      geozones_category = active_tab.element(by.css('.columns.geozones div:nth-child(3) .k-widget.k-multiselect.k-header')),

      groups_tab_switcher = active_tab.element(by.css('.switch.small .switch-paddle[for="allGroup"]')),
      groups_tab_group_tree = active_tab.element(by.css('group-tree#groupsFilterTree')),
      closeFilterPanel = element(by.css("#filter-close-panel")),

      filter_clear_button = active_tab.element(by.css(' button.ok[ng-click="clearFilters()"]'));

    this.getFilterPanel = function() {
      return filter_panel;
    };

    this.getCloseFilterPanelButton = function(){
      return closeFilterPanel;
    };

    this.getFilterGeneralCategory = function() {
      return filter_general_category;
    };

    this.getFilterGeneralStatus = function() {
      return filter_general_status;
    };

    this.getGeneralTab = function() {
      return general_tab;
    };

    this.getGroupsTab = function() {
      return groups_tab;
    };

    this.getActiveTab = function() {
      return active_tab;
    };

    this.getVehiclesSwitcher = function() {
      return vehicles_switcher;
    };

    this.getVehiclesCategory = function() {
      return vehicles_category;
    };

    this.getVehiclesStatus = function() {
      return vehicles_status;
    };

    this.getMachinesSwitcher = function() {
      return machines_switcher;
    };

    this.getMachinesStatus = function() {
      return machines_status;
    };

    this.getMachinesCategory = function() {
      return machines_category;
    };

    this.getStandalonesSwitcher = function() {
      return standalones_switcher;
    };

    this.getStandalonesStatus = function() {
      return standalones_status;
    };

    this.getStandalonesCategory = function() {
      return standalones_category;
    };

    this.getWorkersSwitcher = function() {
      return workers_switcher;
    };

    this.getWorkersCategory = function() {
      return workers_category;
    };

    this.getMobileassetsSwitcher = function() {
      return mobileassets_switcher;
    };

    this.getMobileassetsCategory = function() {
      return mobileassets_category;
    };

    this.getGeozonesSwitcher = function() {
      return geozones_switcher;
    };

    this.getGeozonesCategory = function() {
      return geozones_category;
    };

    this.getFilterClearButton = function() {
      return filter_clear_button;
    };

    this.getFilterGroupsTabSwitcher = function() {
      return groups_tab_switcher;
    };

    this.getFilterGroupsTabGroupTree = function() {
      return groups_tab_group_tree;
    };

    this.getFilterClearGroupsButton = function() {
      return filter_clear_button;
    };

    this.clickFilterGeneralTab = function() {
      browser.executeScript("arguments[0].click();", general_tab.getWebElement());
    };

    this.clickFilterGroupsTab = function() {
      groups_tab.click();
    };

    this.clickFilterClearButton = function() {
      browser.executeScript("arguments[0].click();", filter_clear_button.getWebElement());
    };

    this.clickFilterClearGroupsButton = function() {
      browser.executeScript("arguments[0].click();", filter_clear_button.getWebElement());
    };

    this.clickVehiclesSwitcher = function() {
      browser.executeScript("arguments[0].click();", vehicles_switcher.getWebElement());
    };

    this.clickMachinesSwitcher = function() {
      browser.executeScript("arguments[0].click();", machines_switcher.getWebElement());
    };

    this.clickStandalonesSwitcher = function() {
      browser.executeScript("arguments[0].click();", standalones_switcher.getWebElement());
    };

    this.clickWorkersSwitcher = function() {
      browser.executeScript("arguments[0].click();", workers_switcher.getWebElement());
    };

    this.clickMobileassetsSwitcher = function() {
      browser.executeScript("arguments[0].click();", mobileassets_switcher.getWebElement());
    };

    this.clickGeozonesSwitcher = function() {
      browser.executeScript("arguments[0].click();", geozones_switcher.getWebElement());
    };

    this.turnOffAllFilter = function() {
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.visibilityOf(this.getFilterPanel()));
      browser.wait(testUtils.until.elementToBeClickable(this.getFilterClearButton()));
      this.clickFilterClearButton();
      browser.wait(testUtils.until.presenceOf(this.getFilterPanel().element(by.css('#showMobileassets.ng-not-empty'))));
      browser.wait(testUtils.until.presenceOf(this.getFilterPanel().element(by.css('#showVehicles.ng-not-empty'))));
      browser.wait(testUtils.until.presenceOf(this.getFilterPanel().element(by.css('#showMachines.ng-not-empty'))));
      browser.wait(testUtils.until.presenceOf(this.getFilterPanel().element(by.css('#showStandalones.ng-not-empty'))));
      browser.wait(testUtils.until.presenceOf(this.getFilterPanel().element(by.css('#showWorkers.ng-not-empty'))));
      browser.wait(testUtils.until.presenceOf(this.getFilterPanel().element(by.css('#showGeozones.ng-not-empty'))));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.invisibilityOf(this.getFilterPanel()));
    };
  };

  module.exports = new FilterPanelPage();
})();
