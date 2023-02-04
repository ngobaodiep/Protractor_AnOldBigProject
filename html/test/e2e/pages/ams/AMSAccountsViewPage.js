/*
    AMSAccountsViewPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var testUtils = require('../../TestUtils'),
    amsMainPage = require("./AMSMainPage");
  var AMSAccountsViewPage = function() {
    var accounts_grid = element(by.css('.accounts-view .accounts-list .k-grid')),
      create_startkid_account_button = element(by.css('a[ng-click="createAccountStarterKit($event);"]')),
      header_login = element(by.css('.k-filter-row th:nth-of-type(1) .k-textbox')),
      create_button = element(by.css('h2>a.fi-plus-thin.iconic-sm')),
      admin_email = element(by.css('input[ng-model="account.adminEmail"]')),
      adminFirstname = element(by.css('input[ng-model="account.adminFirstname"]')),
      adminLastname = element(by.css('input[ng-model="account.adminLastname"]')),
      display_name = element(by.css('input[ng-model="account.displayName"]')),
      description_field = element(by.css('input[ng-model="account.description"]')),
      address1 = element(by.css('input[ng-model="account.address1"]')),
      zip_code = element(by.css('input[ng-model="account.postCode"]')),
      city_field = element(by.css('input[ng-model="account.city"]')),
      selectors = element(by.css('.account-form .tabs-panel.is-active div:nth-child(10).small-12 .k-input')),
      country_list_entry = element(by.css('ul[aria-hidden="false"] li[data-offset-index="232"]')),
      package_selector = element(by.css('.account-form .tabs-panel.is-active div:nth-child(11).small-12 span.k-i-arrow-60-down')),
      package_list_entry = element(by.css('ul[aria-hidden="false"] li[data-offset-index="3"]')),
      contact_tab = element(by.css('form[name="accountCreationForm"]>div:nth-of-type(1)>div:nth-of-type(1)>ul>li:nth-of-type(2)>a')),
      notifications_tab = element(by.css('form[name="accountCreationForm"]>div:nth-of-type(1)>div:nth-of-type(1)>ul>li:nth-of-type(4)>a')),
      save_button = element(by.css('div.create-modal button.desktop-action-button.ams-button')),
      company_name_header = element(by.css('.accounts-view .accounts-list .k-grid-header thead tr:nth-child(1) th:nth-child(1) a')),
      company_name_sort_asc = company_name_header.element(by.css('span.k-i-sort-asc-sm')),
      company_name_sort_desc = company_name_header.element(by.css('span.k-i-sort-desc-sm')),
      company_name_filter = element(by.css('.accounts-view .accounts-list .k-grid-header thead .k-filter-row th:nth-child(1)>span>span>input')),
      company_name_clear_filter = element(by.css('.accounts-view .accounts-list .k-grid-header thead .k-filter-row th:nth-child(1)>span>span>button')),
      created_date_filter = element(by.css('.accounts-view .accounts-list .k-grid-header thead .k-filter-row th:nth-child(6)>span>span span:nth-child(1) input')),
      created_date_clear_filter = element(by.css('.accounts-view .accounts-list .k-grid-header thead .k-filter-row th:nth-child(6) button span')),
      create_modal_form = element(by.css('.create-modal form[name="accountCreationForm"]')),
      starterkid_package_selector = create_modal_form.element(by.css('div.small-12:nth-child(1) label>span')),
      loading_mask = element(by.css('.k-loading-mask')),
      create_modal = element(by.css('div.create-modal'));

    this.getAccountsGrid = function() {
      return accounts_grid;
    };

    this.getPackageSelector = function() {
      return package_selector;
    };

    this.getCompanyNameSortAsc = function() {
      return company_name_sort_asc;
    };

    this.getCompanyNameSortDesc = function() {
      return company_name_sort_desc;
    };

    this.getCompanyNameHeader = function() {
      return company_name_header;
    };

    this.getCompanyNameFilter = function() {
      return company_name_filter;
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getStarterKidPackageSelector = function() {
      return starterkid_package_selector;
    };

    this.getSaveButton = function() {
      return save_button;
    };

    this.getCreateModalForm = function() {
      return create_modal_form;
    };

    this.getCreatedDateFilter = function() {
      return created_date_filter;
    };

    this.getCreatedDateClearFilter = function() {
      return created_date_clear_filter;
    };

    this.getCreateStartKidAccountBtn = function() {
      return create_startkid_account_button;
    };

    this.getCompanyNameClearFilter = function() {
      return company_name_clear_filter;
    };

    this.filterGridByLogin = function(login) {
      header_login.click();
      header_login.clear().sendKeys(login);
    };

    this.getHeaderLogin = function() {
      return header_login;
    };

    this.getGridRow = function(n) {
      return accounts_grid.element(by.css('.k-grid-content tbody tr:nth-of-type(' + n + ')'));
    };

    this.getCreate = function() {
      return create_button;
    };

    this.getErrorModal = function() {
      return element(by.css('.error-modal'));
    };

    this.getClearFilterButtonColumn = function(n) {
      return element(by.css('tr.k-filter-row th:nth-child(' + n + ') button.k-button.k-button-icon'));
    };

    this.clickClearFilterButtonColumn = function(n) {
      element(by.css('tr.k-filter-row th:nth-child(' + n + ') button.k-button.k-button-icon')).click();
    };

    this.clickCompanyNameHeader = function() {
      company_name_header.click();
    };

    this.clickCreate = function() {
      create_button.click();
    };

    this.fillDisplayName = function(name) {
      display_name.click();
      display_name.clear().sendKeys(name);
    };

    this.fillAdminLastName = function(string) {
      adminLastname.click();
      adminLastname.clear().sendKeys(string);
    };

    this.fillDescription = function(description) {
      description_field.click();
      description_field.clear().sendKeys(description);
    };

    this.fillAddress1 = function(address) {
      address1.click();
      address1.clear().sendKeys(address);
    };

    this.fillZipCode = function(code) {
      zip_code.click();
      element(by.css('input[ng-model="account.postCode"]')).clear().sendKeys(code);
    };

    this.fillCity = function(city) {
      city_field.click();
      city_field.clear().sendKeys(city);
    };

    this.selectCountry = function() {
      selectors.click();
      browser.wait(testUtils.until.presenceOf(country_list_entry));
      browser.executeScript("arguments[0].click();", country_list_entry.getWebElement());
    };

    this.selectPackage = function() {
      browser.executeScript('arguments[0].scrollIntoView()', package_selector.getWebElement());
      package_selector.click();
      browser.wait(testUtils.until.presenceOf(package_list_entry));
      browser.executeScript("arguments[0].click();", package_list_entry.getWebElement());
    };

    this.fillAdminEmail = function(mail) {
      admin_email.click();
      admin_email.clear().sendKeys(mail);
    };

    this.fillCompanyNameFilter = function(string) {
      company_name_filter.sendKeys(string);
    };

    this.clickSaveButton = function() {
      save_button.click();
    };

    this.clickCreateStarterKidBtn = function() {
      create_startkid_account_button.click();
    };
    this.clickStarterkidPackageSelector = function() {
      starterkid_package_selector.click();
    };

    this.clickCreatedDateFilter = function() {
      created_date_filter.click();
    };

    this.clickCreatedDateClearFilter = function() {
      created_date_clear_filter.click();
    };

    this.clickCompanyNameFilter = function() {
      company_name_filter.click();
    };

    this.getCreateModal = function() {
      return create_modal;
    };

    this.clickOnEditAccountRow = function(n) {
      browser.executeScript("arguments[0].click();", element(by.css('div.accounts-list tbody[role="rowgroup"] tr[role="row"]:nth-of-type(' + n + ') td[role="gridcell"] a.fi-pencil.iconic-sm.editAccount[role="button"]')).getWebElement());
    };

    this.fillCreatedDateFilter = function(string) {
      created_date_filter.sendKeys(string);
    };

    this.fillAdminFirstName = function(string) {
      adminFirstname.click();
      adminFirstname.clear().sendKeys(string);
    };

    this.createStarterKid = function() {
      browser.wait(testUtils.until.elementToBeClickable(this.getStarterKidPackageSelector()));
      this.clickStarterkidPackageSelector();
      browser.wait(testUtils.until.presenceOf(element.all(by.css('ul[aria-hidden="false"] li'))));
      element.all(by.css('ul[aria-hidden="false"] li')).each(function(elm) {
        elm.getText().then(function(txt) {
          if (txt == "XL") {
            browser.executeScript("arguments[0].click();", elm.getWebElement());
          }
        });
      });
    };

    this.loginWithAccount = function(string) {
      var seft = this;
      browser.wait(testUtils.until.presenceOf(this.getHeaderLogin()));
      browser.wait(testUtils.until.elementToBeClickable(this.getHeaderLogin()));
      this.filterGridByLogin(string);
      browser.wait(function() {
        return seft.getAccountsGrid().all(by.css(".k-grid-content tbody tr")).count().then(function(count) {
          return count == 1;
        });
      });
      browser.wait(testUtils.until.stalenessOf(loading_mask));
      browser.wait(testUtils.until.elementToBeClickable(this.getAccountsGrid().element(by.css(".k-grid-content tr:nth-child(1) .fi-account-login"))));
      this.getAccountsGrid().element(by.css(".k-grid-content tr:nth-child(1) .fi-account-login")).click();
              browser.wait(testUtils.waitUrl(/lfr3/));
      browser.wait(testUtils.until.stalenessOf(amsMainPage.getOverlaySpinner()));
    };
  };
  module.exports = new AMSAccountsViewPage();
})();
