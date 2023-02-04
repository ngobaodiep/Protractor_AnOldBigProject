/*
    SettingsVehiclesPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var testUtils = require('./TestUtils');
  var SettingsVehiclesPage = function() {
    var vehicles_grid = element(by.css('.settings-view .panel .k-grid')),
    vehicleCreationForm = element(by.name('vehicleCreationForm')),
      vehicles_list = element.all(by.css('.k-grid-content tbody[role="rowgroup"] tr')),
      vehicles_icon = element(by.css('a[href="/settings/vehicles"]')),
      create_new_vehicle_btn = element(by.css('a[ng-click="createVehicle()"]')),
      pagination_label = element(by.css('.vehicles-list .k-pager-info.k-label')),
      download_template_btn = element(by.css('span.fi-document.text-center')),
      import_button = element(by.css('span.download-button span.icon-cloud-upload')),
      import_input = element(by.name('files')),
      export_button = element(by.css('a[ng-click="exportList()"]')),
      share_button = element(by.css('a[ng-click="shareVehicles()"]')),
      create_modal = element(by.className('create-modal')),
      active_tab_content = vehicleCreationForm.element(by.css('.tabs-panel.is-active')),
      pager_number = element(by.css('ul.k-pager-numbers[style="display: block;"]')),
      maintenance_tab = vehicleCreationForm.element(by.css('ul.tabs li:nth-child(2) a[ng-click="select()"]')),
      equipment_tab = vehicleCreationForm.element(by.css('ul.tabs li:nth-child(3) a[ng-click="select()"]')),

      general_reference = active_tab_content.element(by.name('reference')),
      general_name = active_tab_content.element(by.name('name')),
      general_licence_place = active_tab_content.element(by.name('licencePlate')),
      general_active_switcher = active_tab_content.element(by.css('.switch.small .switch-paddle[for="vehicleActive"] ')),
      general_category_btn = active_tab_content.element(by.css('div.medium-4:nth-of-type(7) span.k-dropdown-wrap')),
      general_brand = active_tab_content.element(by.name('brand')),
      general_model = active_tab_content.element(by.name('model')),
      general_group = active_tab_content.element(by.css('div.medium-4:nth-child(10) span.k-dropdown-wrap')),
      group_list = active_tab_content.all(by.css('drop-group-tree group-tree li.k-item span.k-in')),
      general_stop_duration = active_tab_content.element(by.css('.switch.small .switch-paddle[for="idleToDelivery"]')),
      general_increase_min = active_tab_content.element(by.css('div.medium-3  span.k-i-arrow-60-up')),
      general_decrease_min = active_tab_content.element(by.css('div.medium-3  span.k-i-arrow-60-down')),
      general_note = active_tab_content.element(by.name('note')),
      list_dropdown = element(by.css('.k-animation-container ul[aria-hidden="false"]')),
      general_driver_label = active_tab_content.element(by.css('.row div:nth-child(11) label')),
      datetime = element(by.css('.k-calendar-container.k-state-border-up .k-widget >table >tbody tr:nth-of-type(6) td:nth-of-type(7) a.k-link')),

      maintenance_element_list = active_tab_content.all(by.css('div.medium-4.columns')),
      equipment_create_btn = active_tab_content.element(by.css('a[ng-click="addEquipment()"]')),

      selectors_equipment = active_tab_content.element(by.css('.medium-2 .k-input')),
      immobilization_entry = element(by.css('ul[aria-hidden="false"] li[data-offset-index="3"]')),

      search_name_input = vehicles_grid.element(by.css('.panel .k-grid .k-grid-header .k-filter-row th:nth-child(1) input.k-textbox')),
      search_name_clear_button = vehicles_grid.element(by.css('.panel .k-grid .k-grid-header .k-filter-row th:nth-child(1) span.k-i-close')),
      search_reference_input = vehicles_grid.element(by.css('.panel .k-grid .k-grid-header .k-filter-row th:nth-child(4) input.k-textbox')),
      search_reference_clear_button = vehicles_grid.element(by.css('.panel .k-grid .k-grid-header .k-filter-row th:nth-child(4) span.k-i-close')),

      loading_mask = element(by.className('k-loading-mask')),
      loader_overlay_spinner = element(by.css('.lf-loader-overlay.report-loader .icon-spinner9')),
      loader_overlay_import = element(by.className('import-loader')),

      remote = require('selenium-webdriver/remote'),
      path = require('path'),
      fs = require('fs'),
      fileToImport = '../../resources/test/settings_vehicle/import_file/template_import_vehicle.xlsx',
      updateFileToImport = '../../resources/test/settings_vehicle/import_file/template_update_import_vehicle.xlsx',
      absolutePath,

      save_button = element(by.css('[ng-click="save(vehicleCreationForm)"]')),
      cancel_button = element(by.css('[index="0"] button.desktop-secondary-action-button'));

    this.getCreateModal = function() {
      return create_modal;
    };

    this.getVehicleCreationForm = function(){
      return vehicleCreationForm;
    };

    this.getRevealCreateModal = function(){
      return element(by.css('[index="0"] .create-modal'));
    };

    this.getDeleteConfirmModal = function(){
      return delete_confirmation_modal;
    };

    this.getLoadderOverlayImport = function(){
      return loader_overlay_import;
    };

    this.getLoaderOverlaySpinner = function() {
      return loader_overlay_spinner;
    };

    this.getCreateVehicleBtn = function() {
      return create_new_vehicle_btn;
    };

    this.getPaginationLabel = function() {
      return pagination_label;
    };

    this.getImportButton = function() {
      return import_button;
    };

    this.getSearchNameClearBtn = function() {
      return search_name_clear_button;
    };

    this.getExportButton = function() {
      return export_button;
    };

    this.getDownloadTemplateBtn = function() {
      return download_template_btn;
    };

    this.getShareButton = function() {
      return share_button;
    };

    this.getCancelBtn = function() {
      return cancel_button;
    };

    this.getSearchNameInput = function() {
      return search_name_input;
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getGeneralNote = function() {
      return general_note;
    };

    this.getGridRow = function(n) {
      return element(by.css('.vehicles-list .k-grid .k-grid-content tbody tr:nth-of-type(' + n + ')'));
    };

    this.getVehicleNameOfFirstRowWithString = function(string){
      return this.getGridRow(1).element(by.cssContainingText('td:nth-child(1) span',string));
    };

    this.getVehicleList = function() {
      return vehicles_list;
    };

    this.getVehicleIcon = function() {
      return vehicles_icon;
    };

    this.getPagerNumber = function() {
      return pager_number;
    };

    this.getDeleteButton = function(n) {
      return this.getGridRow(n).element(by.css('[ng-click="deleteVehicle($event)"]'));
    };

    this.getEditButtonOfGridRow = function(n){
      return this.getGridRow(n).element(by.css('td:nth-child(9) a.editVehicle'));
    };

    this.getGeneralCategoryBtn = function() {
      return general_category_btn;
    };

    this.getGeneralBrandInput = function() {
      return general_brand;
    };

    this.getGeneralModelInput = function() {
      return general_model;
    };

    this.getMaintenanceCurrentMileage = function() {
      return maintenance_element_list.get(0);
    };

    this.getSearchReferenceInput = function(){
      return search_reference_input;
    };

    this.getSearchReferenceClearBtn = function () {
      return search_reference_clear_button;
    };

    this.clickPaginationLabel = function() {
      browser.executeScript("arguments[0].click();", pagination_label.getWebElement());
    };

    this.clickCreateVehicleBtn = function() {
      browser.executeScript("arguments[0].click();", create_new_vehicle_btn.getWebElement());
    };

    this.clickGeneralGroup = function() {
      browser.executeScript("arguments[0].click();", general_group.getWebElement());
    };

    this.clickSearchNameClearBtn = function() {
      browser.executeScript("arguments[0].click();", search_name_clear_button.getWebElement());
    };

    this.clickSearchReferenceClearBtn = function() {
      browser.executeScript("arguments[0].click();", search_reference_clear_button.getWebElement());
    };

    this.clickGeneralStopDuration = function() {
      browser.executeScript("arguments[0].click();", general_stop_duration.getWebElement());
    };

    this.clickDropdownListElement = function(n) {
      browser.executeScript("arguments[0].click();", list_dropdown.element(by.css('.k-list-scroller ul li:nth-of-type(' + n + ')')).getWebElement());
    };

    this.clickGeneralActiveSwitcher = function() {
      browser.executeScript("arguments[0].click();", general_active_switcher.getWebElement());
    };

    this.clickGeneralCategory = function() {
      browser.executeScript("arguments[0].click();", general_category_btn.getWebElement());
    };

    this.clickGroupRow = function(n) {
      browser.wait(testUtils.until.presenceOf(group_list));
      browser.wait(testUtils.until.elementToBeClickable(group_list.get((n - 1))));
      browser.executeScript("arguments[0].click();", group_list.get((n - 1)).getWebElement());
    };

    this.clickMaintenanceTab = function() {
      browser.executeScript("arguments[0].click();", maintenance_tab.getWebElement());
    };

    this.clickSaveButton = function() {
      browser.wait(testUtils.until.elementToBeClickable(save_button));
      browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };

    this.clickCancelButton = function() {
      browser.wait(testUtils.until.elementToBeClickable(cancel_button));
      browser.executeScript("arguments[0].click();", cancel_button.getWebElement());
    };

    this.clickTimeButton = function() {
      browser.wait(testUtils.until.visibilityOf(general_increase_min));
      browser.wait(testUtils.until.elementToBeClickable(general_increase_min));
      general_increase_min.click();
      general_increase_min.click();
      general_increase_min.click();
      general_decrease_min.click();
    };

    this.clickCurrentMileage = function() {
      browser.wait(testUtils.until.visibilityOf(maintenance_element_list.get(0).element(by.css('span.k-i-arrow-60-up'))));
      browser.wait(testUtils.until.visibilityOf(maintenance_element_list.get(0).element(by.css('span.k-i-arrow-60-down'))));
      maintenance_element_list.get(0).element(by.css('span.k-i-arrow-60-up')).click();
      maintenance_element_list.get(0).element(by.css('span.k-i-arrow-60-up')).click();
      maintenance_element_list.get(0).element(by.css('span.k-i-arrow-60-down')).click();
    };

    this.clickTCMileage = function() {
      browser.wait(testUtils.until.visibilityOf(maintenance_element_list.get(2).element(by.css('span.k-i-arrow-60-up'))));
      maintenance_element_list.get(2).element(by.css('span.k-i-arrow-60-up')).click();
      maintenance_element_list.get(2).element(by.css('span.k-i-arrow-60-up')).click();
      maintenance_element_list.get(2).element(by.css('span.k-i-arrow-60-down')).click();
    };

    this.clickEquipmentTab = function() {
      browser.executeScript("arguments[0].click();", equipment_tab.getWebElement());
    };

    this.clickEditButtonOfGridRow = function(n) {
      // browser.executeScript("arguments[0].click();", this.getGridRow(n).element(by.css('td:nth-child(9) a.editVehicle[ng-click="editVehicle($event)"]')).getWebElement());
       this.getGridRow(n).element(by.css('td:nth-child(9) a.editVehicle[ng-click="editVehicle($event)"]')).click();
    };

    this.clickDeleteButtonOfGridRow = function(n) {
      // browser.executeScript("arguments[0].click();", this.getGridRow(n).element(by.css('a.deleteVehicle')).getWebElement());
      this.getGridRow(n).element(by.css('td:nth-child(9)  a.deleteVehicle[ng-click="deleteVehicle($event)"]')).click();
    };

    this.fillGeneralReference = function(string) {
      // browser.executeScript("arguments[0].click();", general_reference.getWebElement());
      // general_reference.click();
      general_reference.clear().sendKeys(string);
    };

    this.fillGeneralName = function(string) {
      browser.executeScript("arguments[0].click();", general_name.getWebElement());
      general_name.clear().sendKeys(string);
    };

    this.fillGeneralLicencePlace = function(string) {
      browser.executeScript("arguments[0].click();", general_licence_place.getWebElement());
      general_licence_place.clear().sendKeys(string);
    };

    this.fillGeneralModel = function(string) {
      browser.executeScript("arguments[0].click();", general_model.getWebElement());
      general_model.clear().sendKeys(string);
    };

    this.fillGeneralBrand = function(string) {
      browser.executeScript("arguments[0].click();", general_brand.getWebElement());
      general_brand.clear().sendKeys(string);
    };

    this.fillGeneralNote = function(string) {
      browser.executeScript("arguments[0].click();", general_note.getWebElement());
      general_note.clear().sendKeys(string);
    };

    this.fillSearchNameInput = function(string) {
      search_name_input.click();
      search_name_input.clear().sendKeys(string);
    };

    this.fillSearchReferenceInput = function(string) {
      search_reference_input.click();
      search_reference_input.clear().sendKeys(string);
    };

    this.fillImmobilizationType = function() {
      browser.executeScript("arguments[0].click();", element(by.css('input[ng-model="equipment.reference"]')).getWebElement());
      element(by.css('input[ng-model="equipment.reference"]')).clear().sendKeys('Immobilization reference');
      browser.executeScript("arguments[0].click();", element(by.css('input[ng-model="equipment.name"]')).getWebElement());
      element(by.css('input[ng-model="equipment.name"]')).clear().sendKeys('Immobilization name');
      browser.executeScript("arguments[0].click();", element(by.css('input[ng-model="equipment.description"]')).getWebElement());
      element(by.css('input[ng-model="equipment.description"]')).clear().sendKeys('Immobilization description');
    };

    this.selectEquipmentType = function() {
      browser.wait(testUtils.until.presenceOf(equipment_create_btn));
      browser.executeScript("arguments[0].click();", equipment_create_btn.getWebElement());
      browser.executeScript("arguments[0].click();", selectors_equipment.getWebElement());
      browser.executeScript("arguments[0].click();", immobilization_entry.getWebElement());
    };

    this.selectDateOfNextDevice = function() {
      browser.wait(testUtils.until.presenceOf(element(by.css('span.k-i-calendar'))));
      browser.executeScript("arguments[0].click();", maintenance_element_list.get(1).element(by.css('span.k-i-calendar')).getWebElement());
      browser.wait(testUtils.until.presenceOf(datetime));
      browser.executeScript("arguments[0].click();", datetime.getWebElement());
    };

    this.selectCategory = function(n) {
      this.clickGeneralCategory();
      browser.wait(testUtils.until.presenceOf(list_dropdown));
      browser.executeScript("arguments[0].click();", list_dropdown.element(by.css('.k-list-scroller ul li:nth-of-type(' + n + ')')).getWebElement());
    };

    this.createGeneralTab = function(random_number) {
      this.fillGeneralReference('reference ' + random_number);
      this.fillGeneralName('vehicle ' + random_number);
      this.fillGeneralLicencePlace('licence place ' + random_number);
      this.clickGeneralActiveSwitcher();
      this.selectCategory(1);
      this.fillGeneralBrand('brand ' + random_number);
      this.clickGeneralGroup();
      this.clickGroupRow(1);
      browser.wait(testUtils.until.elementToBeClickable(general_model));
      this.fillGeneralModel('model ' + random_number);
      this.fillGeneralNote('note ' + random_number);
      this.clickGeneralStopDuration();
      this.clickTimeButton();
    };

    this.editGeneralTab = function(random_number) {
      browser.wait(testUtils.until.presenceOf(active_tab_content));
      browser.wait(testUtils.until.presenceOf(general_reference));
      this.fillGeneralReference('edited reference ' + random_number);
      this.fillGeneralName('edited vehicle ' + random_number);
      this.clickTimeButton();
      this.fillGeneralLicencePlace('edited licence place ' + random_number);
      this.clickGeneralActiveSwitcher();
      this.selectCategory(2);
      this.clickGeneralGroup();
      this.clickGroupRow(2);
      this.fillGeneralBrand('edited brand ' + random_number);
      this.fillGeneralModel('edited model ' + random_number);
      this.fillGeneralNote('edited note ' + random_number);
    };

    this.createMaintenanceTab = function() {
      this.clickMaintenanceTab();
      this.selectDateOfNextDevice();
      this.clickCurrentMileage();
      this.clickTCMileage();
    };

    this.createEquipmentTab = function() {
      this.clickEquipmentTab();
      this.selectEquipmentType();
      this.fillImmobilizationType();
    };

    this.editEquipmentTab = function() {
      this.clickEquipmentTab();
      browser.executeScript("arguments[0].click();", active_tab_content.element(by.css('a.fi-trash ')).getWebElement());
    };

    this.createVehicle = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.createGeneralTab(random_number);
      this.createMaintenanceTab();
      this.createEquipmentTab();
      this.clickSaveButton();
    };

    this.editVehicle = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.editGeneralTab(random_number);
      this.createMaintenanceTab();
      this.clickSaveButton();
    };

    this.importFile = function() {
      browser.setFileDetector(new remote.FileDetector());
      absolutePath = path.resolve(__dirname, fileToImport);
      // element(by.css('.vehicles-list span.download-button input:nth-child(1)[type="file"]')).sendKeys(absolutePath);
      import_input.sendKeys(absolutePath);
      // browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", element(by.css('.vehicles-list span.download-button input:nth-child(1)[type="file"]')).getWebElement());
      browser.wait(testUtils.until.stalenessOf(loader_overlay_import));
    };

    this.importFileUpdate = function() {
      browser.setFileDetector(new remote.FileDetector());
      absolutePath = path.resolve(__dirname, updateFileToImport);
      // element(by.css('.vehicles-list span.download-button input:nth-child(1)[type="file"]')).sendKeys(absolutePath);
      import_input.sendKeys(absolutePath);
      browser.wait(testUtils.until.stalenessOf(loader_overlay_import),10000,"x");
      // browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", element(by.css('.vehicles-list span.download-button input:nth-child(1)[type="file"]')).getWebElement());
    };
  };
  module.exports = new SettingsVehiclesPage();
})();
