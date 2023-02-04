/*
    SettingsMachinePage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/

(function() {
  'use strict';

  var testUtils = require('./TestUtils');

  var SettingsMachinePage = function() {
    var settings_machine_button = element(by.css('.settings-view .lf-toolbar a .icon-lf_vibrating_plate')),
      machines_list = element(by.className('machines-list')),
      machines_gridrow = machines_list.all(by.css('.k-grid-content tbody[role="rowgroup"] tr')),
      create_new_machine_btn = machines_list.element(by.css('span.fi-plus-thin')),
      pagination_label = machines_list.element(by.css('.k-grid .k-pager-wrap .k-pager-info.k-label')),
      machines_icon = element(by.css('a[href="/settings/machines"]')),
      export_button = machines_list.element(by.css('span.icon-cloud-download')),
      pager_number = element(by.css('ul.k-pager-numbers')),
      goToFirstPageBtn = machines_list.element(by.css('.k-grid .k-pager-wrap a:nth-child(1).k-pager-first')),
      goToPreviousPageBtn = machines_list.element(by.css('.k-grid .k-pager-wrap a:nth-child(2)')),
      goToNextPageBtn = machines_list.element(by.css('.k-grid .k-pager-wrap a:nth-child(4)')),
      goToLastPageBtn = machines_list.element(by.css('.k-grid .k-pager-wrap a:nth-child(5).k-pager-last')),
      revealMachine = element(by.css('[index="0"]')),
      create_modal = revealMachine.element(by.className('create-modal')),
      machineCreationForm = element(by.name('machineCreationForm')),
      tabs_content = machineCreationForm.element(by.className('tabs-content')),
      active_tab_content = tabs_content.element(by.className('is-active')),

      general_reference = active_tab_content.element(by.name('reference')),
      general_name = active_tab_content.element(by.name('name')),
      general_licence_place = active_tab_content.element(by.name('licencePlate')),
      general_brand = active_tab_content.element(by.name('brand')),
      general_model = active_tab_content.element(by.name('model')),
      general_category_btn = active_tab_content.element(by.css('.row div:nth-child(6).medium-4 span.k-dropdown-wrap')),
      general_category = active_tab_content.element(by.css('.row div:nth-child(6).medium-4 span.k-dropdown-wrap .k-input')),
      general_sim = active_tab_content.element(by.name('sim')),
      general_group = active_tab_content.element(by.css('.row div:nth-child(9).medium-4 span.k-dropdown-wrap')),
      group_list = active_tab_content.all(by.css('drop-group-tree group-tree li.k-item span.k-in')),
      general_note = active_tab_content.element(by.name('note')),
      general_active_switcher = active_tab_content.element(by.css('.switch.small .switch-paddle[for="machineActive"]')),

      maintenance_tab = machineCreationForm.element(by.css('.tabs li.tabs-title:nth-child(2) a[ng-click="select()"]')),
      equipment_tab = machineCreationForm.element(by.css('.tabs li.tabs-title:nth-child(3) a[ng-click="select()"]')),
      maintenance_element_list = active_tab_content.all(by.css('.medium-6.columns')),
      equipment_create_btn = active_tab_content.element(by.css('[ng-click="addEquipment()"]')),
      equipment_switcher = active_tab_content.element(by.css('.switch.small .switch-paddle')),
      datetime = element(by.css('.k-calendar-container[aria-hidden="false"] table.k-month tbody tr:nth-of-type(6) td:nth-of-type(7) a.k-link')),
      search_name_input = element(by.css('.machines-list .k-grid .k-filter-row th:nth-of-type(2) input.k-textbox')),
      search_name_clear_btn = element(by.css('.machines-list .k-grid .k-filter-row th:nth-of-type(2) span.k-i-close')),

      list_dropdown = element(by.css('.k-animation-container ul[aria-hidden="false"]')),
      loading_mask = machines_list.element(by.className('k-loading-mask')),
      loading_overlay = element(by.className('lf-loader-overlay')),
      loader_overlay_import = element(by.className('import-loader')),

      remote = require('selenium-webdriver/remote'),
      path = require('path'),
      fs = require('fs'),
      fileToImport = '../../resources/test/settings_machine/import_file/template_import_machines.xlsx',
      absolutePath,
      import_button = element(by.name('files')),
      save_button = create_modal.element(by.css('[ng-click="save(machineCreationForm)"]')),
      cancel_button = create_modal.element(by.className('desktop-secondary-action-button'));

    this.getSettingsMachineButton = function() {
      return settings_machine_button;
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

    this.getLoadingOverlay = function() {
      return loading_overlay;
    };

    this.getMachineModel = function() {
      return general_model;
    };

    this.getMachineNote = function() {
      return general_model;
    };

    this.getMachinesList = function() {
      return machines_list;
    };

    this.getCreateNewMachineBtn = function() {
      return create_new_machine_btn;
    };

    this.getGeneralCategoryBtn = function() {
      return general_category_btn;
    };

    this.getGeneralCategory = function() {
      return general_category;
    };

    this.getGeneralLicencePlateInput = function() {
      return general_licence_place;
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

    this.getPagerNumber = function() {
      return pager_number;
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getSearchNameInput = function() {
      return search_name_input;
    };

    this.getCategoryGridRow = function(n){
      return list_dropdown.element(by.css('li:nth-child('+n+')'));
    };

    this.waitCategoryListFilted = function(n){
      browser.wait(function(){
        return list_dropdown.all(by.tagName('li')).count().then(function(count){
          return count == n;
        });
      });
    };

    this.waitFiltedCategoryVisibilityWithString = function(string){
      browser.wait(function(){
        return list_dropdown.element(by.css('li:nth-child(1) .medium-9')).getText().then(function(text){
          return text == string;
        });
      });
    };

    this.waitMachineTableFilted = function(n){
      browser.wait(function(){
        return machines_list.all(by.css('.machines-list .k-grid .k-grid-content tr')).count().then(function(count){
          return count == n;
        });
      });
    };

    this.getFilterdCategoryName = function(){
      return list_dropdown.element(by.css('li:nth-child(1) .medium-9'));
    };

    this.getCategoryNodata = function(){
      return element(by.css('.k-state-border-up .k-nodata'));
    };

    this.getEditButtonOfCategoryListGridRow = function(n){
      return list_dropdown.element(by.css('li:nth-child('+n+') [ng-click="editCategory($event)"]'));
    };

    this.getDeleteButtonOfCategoryListGridRow = function(n){
      return list_dropdown.element(by.css('li:nth-child('+n+') [ng-click="deleteCategory($event)"]'));
    };

    this.getGridRow = function(n) {
      return element(by.css('.machines-list .k-grid .k-grid-content tr:nth-of-type(' + n + ')'));
    };

    this.getEditButtonGridRow = function(n){
      return element(by.css('.machines-list .k-grid .k-grid-content tr:nth-of-type(' + n + ')')).element(by.className('editMachine'));
    };

    this.getDeleteButtonGridRow = function(n){
      return element(by.css('.machines-list .k-grid .k-grid-content tr:nth-of-type(' + n + ')')).element(by.className('deleteMachine'));
    };

    this.getMachineNameOfFirstRowWithString = function(string){
      return element(by.cssContainingText('.settings-view .panel .k-grid .k-grid-content tr:nth-of-type(1) td:nth-of-type(2) span', string));
    };

    this.waitMachineNameOfFirstRowWithString = function(string){
      browser.wait(function(){
        return element(by.css('.settings-view .panel .k-grid .k-grid-content tr:nth-of-type(1) td:nth-of-type(2) span')).getText().then(function(text){
          return text == string;
        });
      });
    };

    this.getMachineNameGridRow = function(n){
      return this.getGridRow(n).element(by.css('td:nth-of-type(2) span'));
    };

    this.getMachinesGridRow = function() {
      return machines_gridrow;
    };

    this.getSearchNameClearBtn = function() {
      return search_name_clear_btn;
    };

    this.getMachineIcon = function() {
      return machines_icon;
    };

    this.getMaintenanceElementList = function() {
      return maintenance_element_list;
    };

    this.getCancelBtn = function() {
      return cancel_button;
    };

    this.getMachineReferentInput = function() {
      return general_reference;
    };

    this.getMachineGroup = function() {
      return general_group;
    };

    this.getMachineBrand = function() {
      return general_brand;
    };

    this.clickGeneralCategoryBtn = function() {
      browser.executeScript("arguments[0].click();", general_category_btn.getWebElement());
    };

    this.clickSearchNameClearBtn = function() {
      browser.executeScript("arguments[0].click();", search_name_clear_btn.getWebElement());
    };

    this.clickPaginationLabel = function() {
      browser.executeScript("arguments[0].click();", pagination_label.getWebElement());
    };

    this.clickCreateNewMachineBtn = function() {
      browser.executeScript("arguments[0].click();", create_new_machine_btn.getWebElement());
    };

    this.clickSettingsMachineBtn = function() {
      browser.executeScript("arguments[0].click();", settings_machine_button.getWebElement());
    };

    this.clickGeneralSwitcher = function() {
      browser.executeScript("arguments[0].click();", general_active_switcher.getWebElement());
    };

    this.clickGroupRow = function(n) {
      browser.executeScript("arguments[0].click();", group_list.get((n - 1)).getWebElement());
    };

    this.clickMaintenanceTab = function() {
      browser.wait(testUtils.until.elementToBeClickable(maintenance_tab),3000,"clickMaintenanceTab b ");
      maintenance_tab.click();
    };

    this.clickMileage = function() {
      browser.wait(testUtils.until.visibilityOf(maintenance_element_list.get(0).element(by.css('span.k-i-arrow-60-up'))),3000,"huhu");
      browser.wait(testUtils.until.visibilityOf(maintenance_element_list.get(0).element(by.css('span.k-i-arrow-60-down'))));
      maintenance_element_list.get(0).element(by.css('span.k-i-arrow-60-up')).click();
      maintenance_element_list.get(0).element(by.css('span.k-i-arrow-60-up')).click();
      maintenance_element_list.get(0).element(by.css('span.k-i-arrow-60-down')).click();
    };

    this.clickTCMileage = function() {
      browser.wait(testUtils.until.visibilityOf(maintenance_element_list.get(1).element(by.css('span.k-i-arrow-60-up'))));
      browser.wait(testUtils.until.visibilityOf(maintenance_element_list.get(1).element(by.css('span.k-i-arrow-60-down'))));
      maintenance_element_list.get(1).element(by.css('span.k-i-arrow-60-up')).click();
      maintenance_element_list.get(1).element(by.css('span.k-i-arrow-60-up')).click();
      maintenance_element_list.get(1).element(by.css('span.k-i-arrow-60-down')).click();
    };

    this.clickCurrentHours = function() {
      browser.wait(testUtils.until.visibilityOf(maintenance_element_list.get(2).element(by.css('span.k-i-arrow-60-up'))));
      browser.wait(testUtils.until.visibilityOf(maintenance_element_list.get(2).element(by.css('span.k-i-arrow-60-down'))));
      maintenance_element_list.get(2).element(by.css('span.k-i-arrow-60-up')).click();
      maintenance_element_list.get(2).element(by.css('span.k-i-arrow-60-up')).click();
      maintenance_element_list.get(2).element(by.css('span.k-i-arrow-60-down')).click();
    };

    this.clickTCHours = function() {
      browser.wait(testUtils.until.visibilityOf(maintenance_element_list.get(3).element(by.css('span.k-i-arrow-60-up'))));
      browser.wait(testUtils.until.visibilityOf(maintenance_element_list.get(3).element(by.css('span.k-i-arrow-60-down'))));
      maintenance_element_list.get(3).element(by.css('span.k-i-arrow-60-up')).click();
      maintenance_element_list.get(3).element(by.css('span.k-i-arrow-60-up')).click();
      maintenance_element_list.get(3).element(by.css('span.k-i-arrow-60-down')).click();
    };

    this.clickEquipmentTab = function() {
      browser.executeScript("arguments[0].click();", equipment_tab.getWebElement());
    };

    this.clickCreateEquipmentBtn = function() {
      browser.executeScript("arguments[0].click();", equipment_create_btn.getWebElement());
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

    this.clickEditButtonOfCategoryListGridRow = function(n){
      browser.executeScript("arguments[0].click();", list_dropdown.element(by.css('li:nth-child('+n+') [ng-click="editCategory($event)"]')).getWebElement());
    };

    this.clickDeleteButtonOfCategoryListGridRow = function(n){
      browser.executeScript("arguments[0].click();", list_dropdown.element(by.css('li:nth-child('+n+') [ng-click="deleteCategory($event)"]')).getWebElement());
    };

    this.createNewMachine = function(random_number) {
      browser.wait(testUtils.until.presenceOf(machineCreationForm));
      this.createGeneralTab(random_number, 1);
      this.createMaintenanceTab();
      this.createEquipmentTab();
      this.clickSaveButton();
    };

    this.editMachine = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.clickGeneralSwitcher();
      this.fillGeneralReference('edited reference ' + random_number);
      this.fillGeneralName('edited machine ' + random_number);
      this.selectCategory(2);
      // this.selectGroup(2);
      this.createMaintenanceTab();
      this.clickSaveButton();
    };

    this.createGeneralTab = function(random_number, index) {
      browser.wait(testUtils.until.presenceOf(general_active_switcher));
      this.clickGeneralSwitcher();
      this.fillGeneralReference('reference ' + random_number);
      this.fillGeneralName('machine ' + random_number);
      this.selectCategory(index);
      this.fillGeneralLicencePlace('licence place ' + random_number);
      this.fillGeneralBrand('brand ' + random_number);
      this.selectGroup(index);
      this.fillGeneralModel('model ' + random_number);
      this.fillGeneralSim('0123456766');
      this.fillGeneralNote('note ' + random_number);
    };

    this.createMaintenanceTab = function() {
      this.clickMaintenanceTab();
      this.clickMileage();
      this.clickCurrentHours();
      this.clickTCMileage();
      this.clickTCHours();
      this.selectDateOfNextDevice();
    };

    this.createEquipmentTab = function() {
      this.clickEquipmentTab();
      this.clickCreateEquipmentBtn();
      this.fillTemperatureType();
    };

    this.editEquipmentTab = function() {
      this.clickEquipmentTab();
      browser.executeScript("arguments[0].click();", active_tab_content.element(by.css('.fi-trash')).getWebElement());
    };

    this.fillGeneralReference = function(string) {
      // browser.executeScript("arguments[0].click();", general_reference.getWebElement());
      // browser.wait(testUtils.until.elementToBeClickable(general_reference));
      general_reference.click();
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

    this.fillGeneralSim = function(string) {
      browser.executeScript("arguments[0].click();", general_sim.getWebElement());
      general_sim.clear().sendKeys(string);
    };

    this.fillTemperatureType = function() {
      browser.executeScript("arguments[0].click();", active_tab_content.element(by.name('equipment_reference')).getWebElement());
      active_tab_content.element(by.name('equipment_reference')).clear().sendKeys('temperature reference');
      browser.executeScript("arguments[0].click();", active_tab_content.element(by.name('equipment_name')).getWebElement());
      active_tab_content.element(by.name('equipment_name')).clear().sendKeys('equipment temperature');
      browser.executeScript("arguments[0].click();", active_tab_content.element(by.name('equipment_description')).getWebElement());
      active_tab_content.element(by.name('equipment_description')).clear().sendKeys('description temperature');
      browser.executeScript("arguments[0].click();", active_tab_content.element(by.css('.k-colorpicker .k-i-arrow-60-down')).getWebElement());
      browser.executeScript("arguments[0].click();", element(by.css('.k-animation-container .k-colorpalette.k-state-border-up tr[role="row"]:nth-of-type(1) td:nth-of-type(5)')).getWebElement());
      browser.executeScript("arguments[0].click();", equipment_switcher.getWebElement());
    };

    this.fillSearchNameInput = function(string) {
      browser.executeScript("arguments[0].click();", search_name_input.getWebElement());
      search_name_input.clear().sendKeys(string);
    };

    this.selectCategory = function(n) {
      browser.executeScript("arguments[0].click();", general_category_btn.getWebElement());
      browser.wait(testUtils.until.presenceOf(list_dropdown),3000,"dropdown list");
      browser.executeScript("arguments[0].click();", list_dropdown.element(by.css('li:nth-of-type(' + n + ')')).getWebElement());
    };

    this.selectGroup = function(n) {
      browser.executeScript("arguments[0].click();", general_group.getWebElement());
      this.clickGroupRow(n);
    };

    this.selectDateOfNextDevice = function() {
      browser.executeScript("arguments[0].click();", maintenance_element_list.get(4).element(by.css('span.k-i-calendar')).getWebElement());
      browser.wait(testUtils.until.presenceOf(datetime));
      browser.executeScript("arguments[0].click();", datetime.getWebElement());
    };

    this.importFile = function() {
      browser.setFileDetector(new remote.FileDetector());
      absolutePath = path.resolve(__dirname, fileToImport);
      import_button.sendKeys(absolutePath);
      // browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", import_button.getWebElement());
      browser.wait(testUtils.until.stalenessOf(loader_overlay_import));
    };
  };
  module.exports = new SettingsMachinePage();
})();
