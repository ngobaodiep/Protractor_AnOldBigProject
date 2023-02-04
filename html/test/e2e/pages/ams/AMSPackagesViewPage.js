(function() {
  "use strict";

  var testUtils = require("./TestUtils");
  var AMSPackagesViewPage = function() {
    var packages_grid = element(by.css(".packagings-view .packagings-list .k-grid")),
      create_package_button = element(by.css(".packagings-view h2.view-number-of-elements a.k-button.fi-plus-thin")),
      package_creation_form = element(by.css(".create-modal")),
      package_info_tab = element(by.css('.tabs-title[heading="Package info"] a')),
      general_tab = element(by.css('li.tabs-title[heading="General"] a')),
      map_tab = element(by.css('li.tabs-title[heading="Map"] a')),
      reports_tab = element(by.css('li.tabs-title[heading="Reports"] a')),
      settings_tab = element(by.css('li.tabs-title[heading="Settings"] a')),
      WoC_tab = element(by.css('li.tabs-title[heading="WoC"] a')),
      active_tab_content = package_creation_form.element(by.css(".tabs-content .tabs-panel.is-active")),
      switcher_list = active_tab_content.all(by.css("label.switch-paddle")),
      history_day = active_tab_content.element(by.css('div[field="feature.historyDays"] input[type="number"]')),
      number_user = active_tab_content.element(by.css('div[field="feature.maxUserNumber"] input[type="number"]')),
      number_geozone = active_tab_content.element(by.css('div[field="feature.maxGeozoneNumber"] input[type="number"]')),
      maxMaintenancePerVehicle = active_tab_content.element(by.css('div[field="feature.maxMaintenanceNumberByVehicle"] input[type="number"]')),
      maxNumberOfBusinessRules = active_tab_content.element(by.css('div[field="feature.maxNumberOfBusinessRule"] input[type="number"]')),
      unitPrice = active_tab_content.element(by.css('div[field="feature.unitPrice"] input[type="number"]')),

      loading_mask = element(by.css(".k-loading-mask")),
      warn_delete_button = element(by.css(".warn-modal.delete-confirmation-modal button.desktop-action-button")),
      form_cancel_button = package_creation_form.element(by.css(".desktop-secondary-action-button.cancel")),
      form_save_button = package_creation_form.element(by.css(".desktop-action-button.ams-button"));

    this.getPackagesGrid = function() {
      return packages_grid;
    };

    this.getPackageCreateButton = function() {
      return create_package_button;
    };

    this.getPackageCreationForm = function() {
      return package_creation_form;
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getPackageInfoTab = function() {
      return package_info_tab;
    };

    this.getGeneralTab = function() {
      return general_tab;
    };

    this.getMapTab = function() {
      return map_tab;
    };

    this.getReportsTab = function() {
      return reports_tab;
    };

    this.getSettingsTab = function() {
      return settings_tab;
    };

    this.getWorkerConnectTab = function() {
      return WoC_tab;
    };

    this.getPackageName = function(string) {
      return packages_grid.element(by.cssContainingText(".k-grid-header tr:nth-child(1) th.k-header span", string));
    };

    this.getLastPackage = function(n) {
      return packages_grid.all(by.css(".k-grid-header tr:nth-child(1) th.k-header")).last();
    };

    this.getPackageHeaders = function() {
      return packages_grid.all(by.css(".k-grid-header tr:nth-child(1) th.k-header"));
    };

    this.getFieldOfGrid = function(row, col) {
      return packages_grid.element(by.css('.k-grid-content tr:nth-child(' + row + ') td[role="gridcell"]:nth-child(' + col + ')'));
    };

    this.getFormCancelButton = function() {
      return form_cancel_button;
    };

    this.getFormSaveButton = function() {
      return form_save_button;
    };

    this.getSwitcherList = function() {
      return switcher_list;
    };

    this.getWarnDeleteButton = function() {
      return warn_delete_button;
    };

    this.clickCreateButton = function() {
      create_package_button.click();
    };

    this.clickGeneralTab = function() {
      browser.executeScript("arguments[0].click();", general_tab.getWebElement());
    };

    this.clickMapTab = function() {
      browser.executeScript("arguments[0].click();", map_tab.getWebElement());
    };

    this.clickReportsTab = function() {
      browser.executeScript("arguments[0].click();", reports_tab.getWebElement());
    };

    this.clickSettingsTab = function() {
      browser.executeScript("arguments[0].click();", settings_tab.getWebElement());
    };

    this.clickWoCTab = function() {
      browser.executeScript("arguments[0].click();", WoC_tab.getWebElement());
    };

    this.clickWarningDeleteButton = function() {
      browser.executeScript("arguments[0].click();", warn_delete_button.getWebElement());
    };

    this.clickFormSaveButton = function() {
      browser.wait(testUtils.until.elementToBeClickable(form_save_button));
      form_save_button.click();
    };

    this.clickGeozoneCategoriesSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(2).getWebElement());
    };

    this.clickAccountSharingSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(3).getWebElement());
    };

    this.clickExportSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(0).getWebElement());
    };

    this.clickSubscriptionSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(1).getWebElement());
    };

    this.clickAdvancedFiltersSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(2).getWebElement());
    };

    this.clickAddressSearchSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(2).getWebElement());
    };

    this.clickWhoWasThereSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(3).getWebElement());
    };

    this.clickActivityLogsSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(6).getWebElement());
    };

    this.clickJourneysSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(7).getWebElement());
    };

    this.clickExportSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(0).getWebElement());
    };

    this.clickActivateSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(0).getWebElement());
    };

    this.clickValidationReportSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(1).getWebElement());
    };

    this.clickEditTBSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(2).getWebElement());
    };

    this.clickDeleteTBSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(3).getWebElement());
    };

    this.clickExportExcelSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(4).getWebElement());
    };

    this.clickExportPDFSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(5).getWebElement());
    };

    this.clickCreateSiteSwitcher = function() {
      browser.executeScript("arguments[0].click();", switcher_list.get(6).getWebElement());
    };

    this.fillSettingsTab = function() {
      this.fillMaxNumberOfGeozones(3);
      this.fillMaxMaintenancePerVehicle(3);
      this.fillMaxNumberOfBusinessRules(3);
    };

    this.fillReportsTab = function() {
      this.clickExportSwitcher();
      this.clickSubscriptionSwitcher();
      this.clickAdvancedFiltersSwitcher();
    };

    this.fillWoCTab = function() {
      this.clickActivateSwitcher();
      this.fillUnitPrice(40);
      this.clickValidationReportSwitcher();
      this.clickEditTBSwitcher();
      this.clickDeleteTBSwitcher();
      this.clickExportExcelSwitcher();
      this.clickExportPDFSwitcher();
      this.clickCreateSiteSwitcher();
    };

    this.fillGeneralTab = function() {
      history_day.clear();
      history_day.sendKeys(3);
    };

    this.fillMapTab = function() {
      this.clickAddressSearchSwitcher();
      this.clickJourneysSwitcher();
    };

    this.fillPackageInfoTab = function(random_number) {
      active_tab_content.element(by.css('input[ng-model="packaging.name"]')).click();
      active_tab_content.element(by.css('input[ng-model="packaging.name"]')).clear().sendKeys("package " + random_number);
      active_tab_content.element(by.css('textarea[ng-model="packaging.description"]')).click();
      active_tab_content.element(by.css('textarea[ng-model="packaging.description"]')).clear().sendKeys("description " + random_number);
    };

    this.fillMaxNumberOfGeozones = function(number) {
      number_geozone.clear();
      number_geozone.sendKeys(number);
    };

    this.fillMaxMaintenancePerVehicle = function(number) {
      maxMaintenancePerVehicle.clear();
      maxMaintenancePerVehicle.sendKeys(number);
    };

    this.fillMaxNumberOfBusinessRules = function(number) {
      maxNumberOfBusinessRules.clear();
      maxNumberOfBusinessRules.sendKeys(number);
    };

    this.fillUnitPrice = function(number) {
      unitPrice.clear();
      unitPrice.sendKeys(number);
    };

    this.editGeneralTab = function() {
      history_day.clear();
      history_day.sendKeys(6);
      active_tab_content.element(by.css('div[field="feature.aPIAccess"] .switch.small label.switch-paddle')).click();
    };

    this.editMapTab = function() {
      this.clickWhoWasThereSwitcher();
      this.clickActivityLogsSwitcher();
    };

    this.editSettingsTab = function() {
      this.fillMaxNumberOfGeozones(1);
      this.fillMaxMaintenancePerVehicle(1);
      this.fillMaxNumberOfBusinessRules(1);
      this.clickAccountSharingSwitcher();
      this.clickGeozoneCategoriesSwitcher();
    };

    this.editWoCTab = function() {
      this.clickEditTBSwitcher();
      this.clickDeleteTBSwitcher();
      this.clickExportExcelSwitcher();
      this.clickExportPDFSwitcher();
      this.clickCreateSiteSwitcher();
    };
  };
  module.exports = new AMSPackagesViewPage();
})();
