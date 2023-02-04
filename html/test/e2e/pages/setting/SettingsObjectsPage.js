/*
    SettingsObjectsPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
  remote = require('selenium-webdriver/remote'),
  fs = require('fs'),
  path = require("path");

  var SettingsObjectsPage = function() {
    var mobileassets_list = element(by.className("mobileassets-list")),
    create_object_btn = mobileassets_list.element(by.css('span.fi-plus-thin')),
      pagination_label = mobileassets_list.element(by.css('.k-pager-info.k-label')),
      objects_gridrow = mobileassets_list.all(by.css('.k-grid-content tbody[role="rowgroup"] tr')),
      object_icon = element(by.css('a[href="/settings/mobileassets"]')),
      reveal_overlay = element(by.className("reveal-overlay")),
      create_modal = reveal_overlay.element(by.className('create-modal')),
      objectCreationForm = create_modal.element(by.css('form[name="creationForm"]')),
      active_tab_content = objectCreationForm.element(by.css('.tabs-content .tabs-panel.is-active')),
      search_name_input = mobileassets_list.element(by.css('.k-grid .k-filter-row th:nth-child(2) input.k-textbox')),
      search_reference_input = mobileassets_list.element(by.css('.k-grid .k-filter-row th:nth-child(1) input.k-textbox')),
      grid_content = mobileassets_list.element(by.css(".k-grid .k-grid-content")),
      loading_mask = grid_content.element(by.css('.k-loading-mask')),

      search_name_clear_btn = element(by.css('.k-filter-row th:nth-child(2) span.k-i-close')),
      search_reference_clear_button = element(by.css('.k-filter-row th:nth-child(1) span.k-i-close')),
      pager_number = mobileassets_list.element(by.css('ul.k-pager-numbers[style="display: block;"]')),

      general_reference = active_tab_content.element(by.css('input[ng-model="mobileasset.reference"')),
      general_manufacturer = active_tab_content.element(by.css('input[name="manufacturer"]')),
      general_name = active_tab_content.element(by.css('input[name="name"]')),
      general_category_btn = active_tab_content.element(by.css('.row div:nth-child(5).medium-4 span.k-dropdown-wrap')),
      general_group = active_tab_content.element(by.css('.row div:nth-child(6).medium-4 span.k-dropdown-wrap')),
      group_list = element.all(by.css('div.medium-4:nth-child(6) group-tree .k-treeview span.k-in')),
      general_serialNumber = active_tab_content.element(by.css('.row div:nth-child(7).medium-4 span.k-dropdown-wrap')),
      description = active_tab_content.element(by.css('input[name="description"]')),

      getExcelTemplateButton = element(by.css("a[href=\"/lfr3/eg-services/mobileAssets/importTemplate\"]")),
      exportButton = element(by.css("a[ng-click=\"exportList()\"]")),
      importButton = element(by.css('input[name="files"]')),

      fileToImport = '../../resources/test/settings_object/import/template_import_mobileasset.xlsx',
      absolutePath,
      loader_overlay_import = element(by.className('import-loader')),

      warn_modal = element(by.css('.warn-modal')),
      save_button = create_modal.element(by.css('button.desktop-action-button'));

    this.getCreateObjectBtn = function() {
      return create_object_btn;
    };

    this.getLoadderOverlayImport = function(){
      return loader_overlay_import;
    };

    this.getExcelTemplateButton = function(){
      return getExcelTemplateButton;
    };

    this.getExportBtn = function(){
      return exportButton;
    };

    this.getImportButton = function(){
      return importButton;
    };

    this.getPaginationLabel = function() {
      return pagination_label;
    };

    this.getSearchNameInput = function() {
      return search_name_input;
    };

    this.getObjectIcon = function() {
      return object_icon;
    };

    this.getObjectGridRow = function() {
      return objects_gridrow;
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getWarnModal = function() {
      return warn_modal;
    };

    this.getPagerNumber = function() {
      return pager_number;
    };

    this.getSearchNameClearBtn = function(){
      return search_name_clear_btn;
    };

    this.getSearchReferenceClearBtn = function(){
      return search_reference_clear_button;
    };

    this.getSearchReferenceInput = function(){
      return search_reference_input;
    };

    this.getGridRow = function(n) {
      return element(by.css('.mobileassets-list .k-grid .k-grid-content tr:nth-child(' + n + ')'));
    };

    this.clickWarnModalDeleteBtn = function() {
      browser.executeScript("arguments[0].click();", warn_modal.element(by.css('button.desktop-action-button')).getWebElement());
    };

    this.clickCreateObjectBtn = function() {
      browser.executeScript("arguments[0].click();", create_object_btn.getWebElement());
    };

    this.clickGroupRow = function(n) {
      browser.executeScript("arguments[0].click();", group_list.get((n - 1)).getWebElement());
    };

    this.clickPaginationLabel = function() {
      browser.executeScript("arguments[0].click();", pagination_label.getWebElement());
    };

    this.clickSaveButton = function() {
      browser.wait(testUtils.until.elementToBeClickable(save_button));
      browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };

    this.clickSearchNameClearBtn = function() {
      browser.executeScript("arguments[0].click();", search_name_clear_btn.getWebElement());
    };

    this.clickSearchReferenceClearBtn = function(){
      browser.executeScript("arguments[0].click();", search_reference_clear_button.getWebElement());
    };

    this.fillGeneralReference = function(string) {
      browser.executeScript("arguments[0].click();", general_reference.getWebElement());
      general_reference.clear().sendKeys(string);
    };

    this.fillGeneralName = function(string) {
      browser.executeScript("arguments[0].click();", general_name.getWebElement());
      general_name.clear().sendKeys(string);
    };

    this.fillSearchNameInput = function(string) {
      browser.executeScript("arguments[0].click();", search_name_input.getWebElement());
      search_name_input.clear().sendKeys(string);
    };

    this.fillSearchReferenceInput = function(string){
      search_reference_input.click();
      search_reference_input.clear().sendKeys(string);
    };

    this.fillManufacturer = function(string) {
      browser.executeScript("arguments[0].click();", general_manufacturer.getWebElement());
      general_manufacturer.clear().sendKeys(string);
    };

    this.fillDesciption = function(string) {
      browser.executeScript("arguments[0].click();", description.getWebElement());
      description.clear().sendKeys(string);
    };

    this.selectCategory = function(index) {
      browser.executeScript("arguments[0].click();", general_category_btn.getWebElement());
      browser.wait(testUtils.until.presenceOf(element(by.css('.k-animation-container ul[aria-hidden="false"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + (index - 1) + '"]')).getWebElement());
    };

    this.selectGroup = function(n) {
      browser.wait(testUtils.until.elementToBeClickable(general_group));
      browser.executeScript("arguments[0].click();", general_group.getWebElement());
      this.clickGroupRow(n);
    };

    this.createObject = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.fillGeneralReference('reference ' + random_number);
      this.fillGeneralName('object ' + random_number);
      this.fillManufacturer('manufacturer');
      this.selectCategory(1);
      this.selectGroup(1);
      this.fillDesciption('description');
      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(create_modal));
    };

    this.editObject = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.fillGeneralReference('edited reference ' + random_number);
      this.fillGeneralName('edited object ' + random_number);
      this.selectCategory(2);
      this.selectGroup(2);
      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(create_modal));
    };

    this.importFile = function() {
      browser.setFileDetector(new remote.FileDetector());
      absolutePath = path.resolve(__dirname, fileToImport);
      // element(by.css('.vehicles-list span.download-button input:nth-child(1)[type="file"]')).sendKeys(absolutePath);
      importButton.sendKeys(absolutePath);
      // browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", element(by.css('.vehicles-list span.download-button input:nth-child(1)[type="file"]')).getWebElement());
      browser.wait(testUtils.until.stalenessOf(loader_overlay_import));
    };
  };
  module.exports = new SettingsObjectsPage();
})();
