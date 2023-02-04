/*
    SettingsGeozonePage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var testUtils = require('./TestUtils');
  var SettingsGeozonePage = function() {

    var geozonesList = element(by.css(".categories-list")),
    create_geozone_btn = element(by.css('.settings-view .panel .categories-list span.fi-plus-thin')),
      pagination_label = element(by.css('.categories-list .k-pager-info.k-label')),
      document_btn = element(by.css('.categories-list span.fi-document')),
      import_btn = element(by.css('span.download-button input:nth-child(1)[type="file"]')),
      export_btn = element(by.css('span.icon-cloud-download')),

      geozone_form = element(by.css('.geozone-form-modal.edit .geozoneInfo .geozone-form form')),
      name = geozone_form.element(by.css('input[ng-model="place.name"]')),
      reference = geozone_form.element(by.css('input[ng-model="place.reference"]')),
      category_label = geozone_form.all(by.css('span.geozone-form-label')).get(3),
      selected_category = geozone_form.element(by.css('div.medium-11')),
      category_btn = geozone_form.element(by.css('span.k-dropdown-wrap')),
      radius = geozone_form.element(by.css('input.k-formatted-value.geozone-radius')),
      address = geozone_form.element(by.css('input[ng-model="place.address"]')),
      description = geozone_form.element(by.css('textarea[ng-model="place.description"]')),
      contact = geozone_form.element(by.css('input[ng-model="place.contact"]')),
      phone = geozone_form.element(by.css('input[ng-model="element"]')),
      email = geozone_form.element(by.css('input[ng-model="place.email"]')),
      search_name_input = element(by.css('.categories-list .k-grid .k-grid-header .k-filter-row th:nth-child(2) input.k-textbox')),
      search_name_clear_input = element(by.css('.categories-list .k-grid .k-grid-header .k-filter-row th:nth-child(2) .k-button')),
      regionsBelongingColumn = geozonesList.element(by.css(".k-grid-header tr:nth-child(1) th:nth-child(9)")),
      overlapWithGeozones = geozonesList.element(by.css(".k-grid-header tr:nth-child(1) th:nth-child(10)")),
      loading_mask = element(by.css('.categories-list .k-grid .k-grid-content .k-loading-mask')),
      loader_overlay_spinner = element(by.css('.lf-loader-overlay.report-loader .icon-spinner9')),
      loader_overlay_import = element(by.css('.lf-loader-overlay.import-loader')),
      loader_spinner = element(by.css(".lf-loader-overlay .icon-spinner9")),
      geozoneBusyLoad = element(by.css(".cg-busy-default-wrapper")),

      path = require('path'),
      fileToImport,
      absolutePath,
      remote = require('selenium-webdriver/remote'),

      warn_modal = element(by.css('.warn-modal')),
      info_modal = element(by.css('.info-modal ')),

      pager_number = element(by.css('ul.k-pager-numbers')),
      goToFirstPageBtn = element(by.css('.categories-list .k-grid .k-pager-wrap a:nth-child(1).k-pager-first')),
      goToPreviousPageBtn = element(by.css('.categories-list .k-grid .k-pager-wrap a:nth-child(2)')),
      goToNextPageBtn = element(by.css('.categories-list .k-grid .k-pager-wrap a:nth-child(4)')),
      goToLastPageBtn = element(by.css('.categories-list .k-grid .k-pager-wrap a:nth-child(5).k-pager-last')),

      detectGeozoneOverlap = element(by.css('[ng-click="getOverlapGeozones()"]')),


      save_button = geozone_form.element(by.css('button.ok'));

    this.getCreateGeozoneBtn = function() {
      return create_geozone_btn;
    };

    this.getLoadingSpinner2 = function(){
      return loader_spinner;
    };

    this.getLoadingSpinner = function(){
      return loader_overlay_spinner;
    };

    this.getGeozoneBusyLoad = function(){
      return geozoneBusyLoad;
    };

    this.getOverlapWithGeozones = function(){
      return overlapWithGeozones;
    };

    this.getRegionsBelongingColumn = function(){
      return regionsBelongingColumn;
    };

    this.getDetectGeozoneOverlap = function(){
      return detectGeozoneOverlap;
    };

    this.getGeozoneRowList = function(){
      return geozonesList.all(by.css(".k-grid-content tr"));
    };

    this.getGoToNextPageBtn = function(){
      return goToNextPageBtn;
    };

    this.getGoToPreviousPageBtn = function(){
      return goToPreviousPageBtn;
    };

    this.getGoToLastPageBtn = function(){
      return goToLastPageBtn;
    };

    this.getGoToFirstPageBtn = function(){
      return goToFirstPageBtn;
    };

    this.getSearchNameClearInput = function(){
      return search_name_clear_input;
    };

    this.getConfirmWarningBtn = function(){
      return warn_modal.element(by.css('button.desktop-action-button'));
    };

    this.getPaginationLabel = function() {
      return pagination_label;
    };

    this.getDocumentBtn = function() {
      return document_btn;
    };

    this.getImportBtn = function() {
      return import_btn;
    };

    this.getExportBtn = function() {
      return export_btn;
    };

    this.getSearchNameInput = function() {
      return search_name_input;
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getGridRow = function(n) {
      return element(by.css('.settings-view .panel .k-grid .k-grid-content tr:nth-of-type(' + n + ')'));
    };

    this.getPagerNumber = function() {
      return pager_number;
    };

    this.getCategoryLabel = function() {
      return category_label;
    };

    this.getWarnModal = function() {
      return warn_modal;
    };

    this.clickCreateGeozoneBtn = function() {
      browser.executeScript("arguments[0].click();", create_geozone_btn.getWebElement());
    };

    this.clickPaginationLabel = function() {
      browser.executeScript("arguments[0].click();", pagination_label.getWebElement());
    };

    this.clickImportBtn = function() {
      browser.executeScript("arguments[0].click();", import_btn.getWebElement());
    };

    this.clickRadius = function() {
      browser.executeScript("arguments[0].click();", radius.getWebElement());
    };

    this.clickSaveButton = function() {
      browser.wait(testUtils.until.elementToBeClickable(save_button));
      browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };

    this.clickSearchNameClearBtn = function() {
      browser.executeScript("arguments[0].click();", search_name_clear_input.getWebElement());
    };

    this.clickWarnModalDeleteBtn = function() {
      // browser.executeScript("arguments[0].click();", warn_modal.element(by.css('button.desktop-action-button')).getWebElement());
      warn_modal.element(by.css('button.desktop-action-button')).click();
    };

    this.clickInfoModalOkBtn = function() {
      browser.executeScript("arguments[0].click();", info_modal.element(by.css('button[ng-click="cancel()"]')).getWebElement());
    };

    this.fillName = function(string) {
      browser.executeScript("arguments[0].click();", name.getWebElement());
      name.clear().sendKeys(string);
    };

    this.fillReference = function(string) {
      browser.executeScript("arguments[0].click();", reference.getWebElement());
      reference.clear().sendKeys(string);
    };

    this.fillAddress = function(string) {
      browser.executeScript("arguments[0].click();", address.getWebElement());
      address.clear().sendKeys(string);
    };

    this.fillPhone = function(string) {
      browser.executeScript("arguments[0].click();", phone.getWebElement());
      phone.clear().sendKeys(string);
    };

    this.fillEmail = function(string) {
      browser.executeScript("arguments[0].click();", email.getWebElement());
      email.clear().sendKeys(string);
    };
    this.fillDescription = function(string) {
      browser.executeScript("arguments[0].click();", description.getWebElement());
      description.clear().sendKeys(string);
    };

    this.fillContact = function(string) {
      browser.executeScript("arguments[0].click();", contact.getWebElement());
      contact.clear().sendKeys(string);
    };

    this.fillSearchNameInput = function(string) {
      browser.executeScript("arguments[0].click();", search_name_input.getWebElement());
      search_name_input.clear().sendKeys(string);
    };

    this.createGeozone = function(random_number) {
      browser.wait(testUtils.until.presenceOf(geozone_form));
      this.fillName('geozone ' + random_number);
      this.fillReference('reference ' + random_number);
      browser.executeScript("arguments[0].scrollIntoView();", category_label.getWebElement());
      this.selectCategory(1);
      this.fillAddress('Feld 1, 3257 Grossaffoltern, CH');
      description.click();
      browser.wait(testUtils.until.presenceOf(element(by.css('.k-formatted-value.geozone-radius[aria-valuenow="150"]'))));
      this.fillDescription('description ' + random_number);
      this.fillContact('contact int-test-automated');
      this.fillPhone('01234566');
      this.fillEmail('bitnemo' + '@gmail.com');
      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(geozone_form));
    };

    this.editGeozone = function(random_number) {
      browser.wait(testUtils.until.presenceOf(geozone_form));
      this.fillName('edited geozone ' + random_number);
      this.fillReference('edited reference ' + random_number);
      browser.executeScript("arguments[0].scrollIntoView();", category_label.getWebElement());
      this.selectCategory(2);
      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(geozone_form));
    };

    this.selectCategory = function(index) {
      browser.executeScript("arguments[0].click();", category_btn.getWebElement());
      browser.wait(testUtils.until.presenceOf(element(by.css('.k-animation-container ul[aria-hidden="false"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('.k-animation-container ul[aria-hidden="false"] li[data-offset-index="' + (index - 1) + '"]')).getWebElement());
    };

    this.importFile = function() {
      browser.setFileDetector(new remote.FileDetector());
      fileToImport = '../../resources/test/settings_geozone/import_file/template_import_geozone.xlsx';
      absolutePath = path.resolve(__dirname, fileToImport);
      import_btn.sendKeys(absolutePath);
      browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", import_btn.getWebElement());
      browser.wait(testUtils.until.stalenessOf(loader_overlay_import));
      browser.wait(testUtils.until.presenceOf(info_modal));
      this.clickInfoModalOkBtn();
      browser.wait(testUtils.until.stalenessOf(info_modal));
    };
  };
  module.exports = new SettingsGeozonePage();
})();
