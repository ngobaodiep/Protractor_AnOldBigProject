/*
    SettingsStandalonePage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var testUtils = require('./TestUtils');
  var SettingsStandalonePage = function() {
    var standalones_list = element(by.className('standalones-list')),
    create_standalone_btn = standalones_list.element(by.className('fi-plus-thin')),
      pagination_label = standalones_list.element(by.className('k-pager-info')),
      standalones_gridrow = element.all(by.css('.k-grid-content tbody[role="rowgroup"] tr')),
      standalones_icon = element(by.css('a[href="/settings/standalones"]')),
      export_button = standalones_list.element(by.className('icon-cloud-download')),
      create_modal = element(by.className('create-modal')),
      standaloneCreationForm = create_modal.element(by.name('standaloneCreationForm')),
      tabs_content = standaloneCreationForm.element(by.className('tabs-content')),
      active_tab_content = tabs_content.element(by.className('is-active')),
      k_grid_header = standalones_list.element(by.className('k-grid-header')),
      k_grid_content = standalones_list.element(by.className('k-grid-content')),
      search_name_input = k_grid_header.element(by.css('.k-filter-row th:nth-child(2) input.k-textbox')),
      loading_mask = standalones_list.element(by.className('k-loading-mask')),
      search_name_clear_btn = k_grid_header.element(by.css('.k-filter-row th:nth-child(2) span.k-i-close')),
      pager_number = element(by.css('ul.k-pager-numbers[style="display: block;"]')),

      general_reference = active_tab_content.element(by.name('reference')),
      general_name = active_tab_content.element(by.name('name')),
      general_category_btn = active_tab_content.element(by.css('.row div:nth-child(5).medium-4 span.k-dropdown-wrap')),
      general_group = active_tab_content.element(by.css('.row div:nth-child(6).medium-4 span.k-dropdown-wrap')),
      group_list = active_tab_content.all(by.css('drop-group-tree group-tree li.k-item span.k-in')),
      general_note = active_tab_content.element(by.name('note')),
      general_active_switcher = active_tab_content.element(by.css('.switch.small .switch-paddle[for="standaloneActive"')),

      save_button = create_modal.element(by.className('desktop-action-button')),
      cancel_button = create_modal.element(by.className('desktop-secondary-action-button'));

    this.getCreateStandaloneBtn = function() {
      return create_standalone_btn;
    };

    this.getStandalonesCreationForm = function(){
      return standaloneCreationForm;
    };

    this.getPaginationLabel = function() {
      return pagination_label;
    };

    this.getExportBtn = function() {
      return export_button;
    };

    this.getCreateModal = function() {
      return create_modal;
    };

    this.getSearchNameInput = function() {
      return search_name_input;
    };

    this.getStandalonesIcon = function() {
      return standalones_icon;
    };

    this.getStandaloneGridRow = function() {
      return standalones_gridrow;
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getPagerNumber = function() {
      return pager_number;
    };

    this.getGridRow = function(n) {
      return k_grid_content.element(by.css('tbody tr:nth-child(' + n + ')'));
    };

    this.getEditStandaloneButtonGridRow = function(n){
      return this.getGridRow(n).element(by.css('td:nth-child(4) a.editStandalone'));
    };

    this.getDeleteStandaloneButtonGridRow = function(n){
      return this.getGridRow(n).element(by.css('td:nth-child(4) a.deleteStandalone'));
    };

    this.clickCreateStandaloneBtn = function() {
      browser.executeScript("arguments[0].click();", create_standalone_btn.getWebElement());
    };

    this.clickGeneralSwitcher = function() {
      browser.executeScript("arguments[0].click();", general_active_switcher.getWebElement());
    };

    this.clickGroupRow = function(n) {
      browser.executeScript("arguments[0].click();", group_list.get((n - 1)).getWebElement());
    };

    this.clickPaginationLabel = function() {
      browser.executeScript("arguments[0].click();", pagination_label.getWebElement());
    };

    this.clickSaveButton = function() {
      browser.wait(testUtils.until.elementToBeClickable(save_button));
      // browser.executeScript("arguments[0].click();", save_button.getWebElement());
      save_button.click();
    };

    this.clickCancelButton = function() {
      browser.wait(testUtils.until.elementToBeClickable(cancel_button));
      browser.executeScript("arguments[0].click();", cancel_button.getWebElement());
    };

    this.clickSearchNameClearBtn = function() {
      browser.executeScript("arguments[0].click();", search_name_clear_btn.getWebElement());
    };

    this.clickEditStandaloneButtonGridRow = function(n){
      this.getEditStandaloneButtonGridRow(n).click();
    };

    this.clickDeleteStandaloneButtonGridRow = function(n){
      this.getDeleteStandaloneButtonGridRow(n).click();
    };

    this.createStandalone = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.createGeneralTab(random_number);
      this.clickSaveButton();
    };

    this.editStandalone = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      browser.wait(testUtils.until.elementToBeClickable(general_reference));
      this.fillGeneralReference('edited reference ' + random_number);
      this.fillGeneralName('edited standalone ' + random_number);
      this.selectCategory(2);
      this.selectGroup(2);
      this.clickSaveButton();
    };

    this.createGeneralTab = function(random_number) {
      browser.wait(testUtils.until.elementToBeClickable(general_reference));
      this.fillGeneralReference('reference ' + random_number);
      this.fillGeneralName('standalone ' + random_number);
      this.selectCategory(1);
      this.selectGroup(1);
      this.fillGeneralNote('note ' + random_number);
      this.clickGeneralSwitcher();
    };

    this.fillGeneralReference = function(string) {
      browser.executeScript("arguments[0].click();", general_reference.getWebElement());
      general_reference.clear().sendKeys(string);
    };

    this.fillGeneralName = function(string) {
      browser.executeScript("arguments[0].click();", general_name.getWebElement());
      general_name.clear().sendKeys(string);
    };

    this.fillGeneralNote = function(string) {
      browser.executeScript("arguments[0].click();", general_note.getWebElement());
      general_note.clear().sendKeys(string);
    };

    this.fillSearchNameInput = function(string) {
      browser.executeScript("arguments[0].click();", search_name_input.getWebElement());
      search_name_input.clear().sendKeys(string);
    };

    this.selectCategory = function(index) {
      browser.executeScript("arguments[0].click();", general_category_btn.getWebElement());
      browser.wait(testUtils.until.presenceOf(element(by.css('.k-animation-container ul[aria-hidden="false"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('.k-animation-container ul[aria-hidden="false"] li[data-offset-index="' + (index - 1) + '"]')).getWebElement());
    };

    this.selectGroup = function(n) {
      browser.executeScript("arguments[0].click();", general_group.getWebElement());
      this.clickGroupRow(n);
    };
  };

  module.exports = new SettingsStandalonePage();
})();
