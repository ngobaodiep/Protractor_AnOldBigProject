/*
    WorkerConnectLicensesReportPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
  mainSettingsPage = require('./MainSettingsPage');
  var WorkerConnectLicensesReportPage = function() {
    var license_report_button = mainSettingsPage.getSettingsView().element(by.css('li:nth-child(5) > a')),
    tab_content_active = mainSettingsPage.getSettingsView().element(by.css(".tabs-content .tabs-panel.is-active")),
      license_report_grid = tab_content_active.element(by.css('.license-report .grid-x.grid-licenses')),
      license_users_grid = tab_content_active.element(by.className('license-report')),
      license_users_grid_content = tab_content_active.element(by.css('.license-report .users-list .k-grid .k-grid-content')),

      text_licenses = license_report_grid.element(by.css('span.textLicenses.ng-binding')),
      monthly_invoices = license_report_grid.element(by.css('.textSeeInvoice a[ng-click="seeInvoices()"]')),
      terms_conditions = license_report_grid.element(by.css('.textSeeInvoice a[ng-click="seeTermsAndConditions()"]')),
      popup_terms_conditions = element(by.css('.create-payment-modal .create-modal.terms-conditions')),
      close_conditions_button = popup_terms_conditions.element(by.css('.button.desktop-secondary-action-button')),

      paper_wrap = license_users_grid.element(by.css('.k-pager-wrap.k-grid-pager')),
      users_list_header = license_users_grid.element(by.className('k-grid-header')),
      worker_connect_licenses_filter = users_list_header.element(by.css('tr.k-filter-row  th:nth-child(3) span.k-dropdown-wrap')),
      search_login_input = users_list_header.element(by.css("tr.k-filter-row  th:nth-child(1) .k-textbox")),

      loading_mask = element(by.className("k-loading-mask")),

      current_month = tab_content_active.element(by.css('.license-report .k-grid-content tr:nth-of-type(1)'));

    this.getLicenseUsersGridContent = function() {
      return license_users_grid_content;
    };

    this.getLoadingMask = function(){
      return loading_mask;
    };

    this.getSearchLoginInput = function(){
      return search_login_input;
    };

    this.getLicensesFilterCloseBtn = function(){
      return this.getUserListHeader().element(by.css('.k-filter-row th:nth-child(3) span.k-i-close'));
    };

    this.getWorkerConnectLicensesFilter = function(){
      return worker_connect_licenses_filter;
    };

    this.getPaperWrap = function(){
      return paper_wrap;
    };

    this.getUserListHeader = function(){
      return users_list_header;
    };

    this.getTextLicense = function(){
      return text_licenses;
    };

    this.getMonthlyInvoices = function(){
      return monthly_invoices;
    };

    this.getTermsAndConditions = function(){
      return terms_conditions;
    };

    this.getPopupTermsAndConditions = function(){
      return popup_terms_conditions;
    };

    this.getLicenseReportGrid = function(){
      return license_report_grid;
    };

    this.getLicenseReportButton = function() {
      return license_report_button;
    };

    this.getCloseConditionsButton = function() {
      return close_conditions_button;
    };

    this.getContentGridRow = function(n){
      return license_users_grid_content.element(by.css('tr:nth-child('+n+')'));
    };

    this.clickCloseConditionsButton = function() {
      browser.executeScript("arguments[0].click();", close_conditions_button.getWebElement());
    };

    this.clickLicenseReportButton = function() {
      browser.executeScript("arguments[0].click();", license_report_button.getWebElement());
    };

    this.clickLicenseFilterCloseBtn = function(){
      browser.executeScript("arguments[0].click();", this.getUserListHeader().element(by.css('.k-filter-row th:nth-child(3) span.k-i-close')).getWebElement());
    };

    this.clickWorkerConnectLicensesFilter = function(){
      browser.executeScript("arguments[0].click();", this.getWorkerConnectLicensesFilter().getWebElement());
    };

    this.clickMonthlyInvooicesLink = function(){
      browser.executeScript("arguments[0].click();", monthly_invoices.getWebElement());
    };

    this.clickTermsAndConditions = function(){
      browser.executeScript("arguments[0].click();", terms_conditions.getWebElement());
    };

    this.getCurrentMonth = function() {
      return current_month;
    };

    this.selectActiveLicenses = function(){
      this.clickWorkerConnectLicensesFilter();
      browser.wait(testUtils.until.presenceOf(element(by.css('.k-animation-container ul[aria-hidden="false"] li:nth-child(2) button'))));
      browser.executeScript("arguments[0].click();", element(by.css('.k-animation-container ul[aria-hidden="false"] li:nth-child(2) button')).getWebElement());
      browser.wait(testUtils.until.stalenessOf(element(by.css('.k-animation-container ul[aria-hidden="false"] li:nth-child(2) button'))));
    };

    this.selectPendingLicenses = function(){
      this.clickWorkerConnectLicensesFilter();
      browser.wait(testUtils.until.presenceOf(element(by.css('.k-animation-container ul[aria-hidden="false"] li:nth-child(1) button'))));
      browser.executeScript("arguments[0].click();", element(by.css('.k-animation-container ul[aria-hidden="false"] li:nth-child(1) button')).getWebElement());
      browser.wait(testUtils.until.stalenessOf(element(by.css('.k-animation-container ul[aria-hidden="false"] li:nth-child(1) button'))));
    };
  };
  module.exports = new WorkerConnectLicensesReportPage();
})();
