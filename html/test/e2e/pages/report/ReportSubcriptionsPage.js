(function() {
  'use strict';

  var testUtils = require('./TestUtils');
  var ReportSubcriptionsPage = function() {
    var reportView = element(by.css('.reports-view')),
      subcriptionList = reportView.element(by.className("subscriptions-list")),
      create_subcription_btn = subcriptionList.element(by.css('.fi-plus-thin')),
      create_modal = element(by.css(".create-modal")),
      subcriptionForm = create_modal.element(by.css(".subscription-form")),
      active_tab_content = subcriptionForm.element(by.css('.tabs-content .tabs-panel.is-active')),
      report_options_tab = create_modal.element(by.css('li.tabs-title:nth-of-type(2) a')),
      distribution_tab = create_modal.element(by.css('li.tabs-title:nth-of-type(3) a')),

      general_name_input = active_tab_content.element(by.css('input[ng-model="subscription.name"]')),
      active_switcher = active_tab_content.element(by.css('.switch.small .switch-paddle[for="subscriptionActive"]')),
      includes_weekend = active_tab_content.element(by.css('.switch.small .switch-paddle[for="includeWeekends"]')),
      general_periodicity = active_tab_content.element(by.css('.medium-6:nth-child(3) .k-widget.k-dropdown')),

      general_report_selector = active_tab_content.element(by.css('div.medium-6:nth-child(1) label .k-header')),
      report_options_status = active_tab_content.element(by.css('div:nth-child(3).medium-12 .k-multiselect.k-header')),
      report_options_severity = active_tab_content.element(by.css('div:nth-child(4).medium-12 .k-multiselect.k-header')),
      report_options_bussiness_rule = active_tab_content.element(by.css('div:nth-child(5).medium-12 .k-multiselect.k-header')),
      report_options_machines = active_tab_content.element(by.css('div:nth-child(8).medium-12 .k-multiselect.k-header')),
      report_options_tracked = active_tab_content.element(by.css('div:nth-child(9).medium-12 .k-multiselect.k-header')),
      report_options_vehicles = active_tab_content.element(by.css('div:nth-child(6).medium-12 .k-multiselect.k-header')),

      detailed_switcher = element(by.css('.switch.small .switch-paddle[for="detailed"]')),
      email_subject = element(by.css('input[ng-model="subscription.emailSubject"]')),
      email_content = element(by.css('textarea[ng-model="subscription.emailBody"]')),
      recipients = active_tab_content.element(by.css('div:nth-child(5) .medium-12 div.k-multiselect.k-header')),

      search_name_input = element(by.css('.subscriptions-list .k-filter-row th:nth-of-type(1) input.k-textbox')),
      loading_mask = element(by.css('.k-loading-mask .k-loading-image')),
      clear_search_name_btn = element(by.css('.subscriptions-list .k-grid .k-grid-header .k-filter-row th:nth-child(1) button.k-button')),

      subcription_ftphost = element(by.css('input[ng-model="subscription.ftpHost"]')),
      subcription_ftpport = element(by.css('input[ng-model="subscription.ftpPort"]')),
      subcription_ftpfolder = element(by.css('input[ng-model="subscription.ftpFolder"]')),
      sfpt_switcher = element(by.css('.switch.small .switch-paddle[for="sftp"]')),
      subcription_user = element(by.css('input[ng-model="subscription.ftpUser"]')),
      subcription_pass = element(by.css('input[ng-model="subscription.ftpPassword"]')),

      cancel_button = create_modal.element(by.css(".desktop-secondary-action-button.cancel")),
      save_button = create_modal.element(by.css('button.desktop-action-button[ng-click="save(subscriptionCreationForm)"]'));

    this.getCreateSubcriptionBtn = function() {
      return create_subcription_btn;
    };

    this.getCancelButton = function(){
      return cancel_button;
    };

    this.getSubcriptionForm = function(){
      return subcriptionForm;
    };

    this.getRecipients = function() {
      return recipients;
    };

    this.getGeneralPeriodicity = function() {
      return general_periodicity;
    };

    this.getClearSearchNameBtn = function() {
      return clear_search_name_btn;
    };

    this.getDistributionTab = function() {
      return distribution_tab;
    };

    this.getGeneralReportSelector = function() {
      return general_report_selector;
    };

    this.getActiveTabContent = function() {
      return active_tab_content;
    };

    this.getCreateModal = function() {
      return create_modal;
    };

    this.getReportOptionsBussinessRule = function() {
      return report_options_bussiness_rule;
    };

    this.getReportOptionsVehicles = function() {
      return report_options_vehicles;
    };

    this.getReportOptionsSeverity = function() {
      return report_options_severity;
    };

    this.getReportOptionsStatus = function() {
      return report_options_status;
    };

    this.getReportOptionsTracked = function() {
      return report_options_tracked;
    };

    this.getReportOptionsMachines = function() {
      return report_options_machines;
    };

    this.getRadioLabel = function(index) {
      return active_tab_content.all(by.css('label.k-radio-label:not(.ng-hide)')).get(index - 1);
    };

    this.getSearchNameInput = function() {
      return search_name_input;
    };

    this.getGeneralNameInput = function() {
      return general_name_input;
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getGridRow = function(n) {
      return element(by.css('.subscriptions-list .k-grid .k-grid-content tbody tr:nth-child(' + n + ')'));
    };

    this.clickCreateSubcriptionBtn = function() {
      browser.executeScript("arguments[0].click();", create_subcription_btn.getWebElement());
    };

    this.clickActiveSwitcher = function() {
      browser.executeScript("arguments[0].click();", active_switcher.getWebElement());
    };

    this.clickReportOptionsTab = function() {
      // browser.executeScript("arguments[0].click();", report_options_tab.getWebElement());
      report_options_tab.click();
    };

    this.clickDistributionTab = function() {
      browser.executeScript("arguments[0].click();", distribution_tab.getWebElement());
    };

    this.clickInclucdesWeekend = function() {
      browser.executeScript("arguments[0].click();", includes_weekend.getWebElement());
    };

    this.clickDetailed = function() {
      browser.executeScript("arguments[0].click();", detailed_switcher.getWebElement());
    };

    this.clickSaveButton = function() {
      browser.wait(testUtils.until.elementToBeClickable(save_button));
      browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };

    this.clickSearchNameClearBtn = function() {
      browser.executeScript("arguments[0].click();", clear_search_name_btn.getWebElement());
    };

    this.fillGeneralName = function(string) {
      browser.executeScript("arguments[0].click();", general_name_input.getWebElement());
      general_name_input.clear().sendKeys(string);
    };

    this.fillEmailSubject = function(string) {
      browser.executeScript("arguments[0].click();", email_subject.getWebElement());
      email_subject.clear().sendKeys(string);
    };

    this.fillEmailContent = function(string) {
      browser.executeScript("arguments[0].click();", email_content.getWebElement());
      email_content.clear().sendKeys(string);
    };

    this.fillSearchNameInput = function(string) {
      browser.executeScript("arguments[0].click();", search_name_input.getWebElement());
      search_name_input.clear().sendKeys(string);
    };

    this.selectGeneralReportNotifications = function() {
      browser.wait(testUtils.until.elementToBeClickable(this.getGeneralReportSelector()));
      this.getGeneralReportSelector().click();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(5)'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(5)')).getWebElement());
    };

    this.selectReportOptionsStatus = function(index) {
      browser.wait(testUtils.until.elementToBeClickable(report_options_status));
      report_options_status.click();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(' + index + ')'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(' + index + ')')).getWebElement());
    };

    this.selectReportOptionsSeverity = function(n) {
      browser.wait(testUtils.until.elementToBeClickable(report_options_severity));
      report_options_severity.click();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')')).getWebElement());
    };

    this.selectReportOptionsBusinessRule = function(n) {
      browser.wait(testUtils.until.elementToBeClickable(report_options_bussiness_rule));
      report_options_bussiness_rule.click();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')')).getWebElement());
    };

    this.selectReportOptionsMachines = function(n) {
      browser.wait(testUtils.until.elementToBeClickable(report_options_machines));
      report_options_machines.click();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')')).getWebElement());
    };

    this.selectReportOptionsVehicles = function(n) {
      browser.wait(testUtils.until.elementToBeClickable(report_options_vehicles));
      report_options_vehicles.click();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')')).getWebElement());
    };

    this.selectReportOptionsTracked = function(n) {
      browser.wait(testUtils.until.elementToBeClickable(report_options_tracked.element(by.css('input'))));
      report_options_tracked.element(by.css('input')).click();
      // browser.executeScript("arguments[0].click();", report_options_tracked.element(by.css('input')).getWebElement());
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')')).getWebElement());

    };

    this.selectListElement = function(index) {
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(' + index + ')'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(' + index + ')')).getWebElement());
    };

    this.selectHNRecipients = function() {
      var seft = this;
      browser.wait(testUtils.until.presenceOf(active_tab_content.element(by.css('div.medium-12.multiselect .k-widget.k-multiselect .k-input[aria-disabled="false"]'))), 1000, "ak1");
      active_tab_content.element(by.css('div.medium-12.multiselect .k-widget.k-multiselect .k-input[aria-disabled="false"]')).click();
      browser.wait(testUtils.until.presenceOf(element.all(by.css('ul[aria-hidden="false"] li'))));
      element.all(by.css('ul[aria-hidden="false"] li')).each(function(elm, index) {
        elm.getText().then(function(txt) {
          if (txt == "test-automated") {
            elm.click();
          }
        });
      });
      seft.fillEmailContent('Email');
    };

    this.selectSubcription = function(index) {
      active_tab_content.all(by.css('.medium-6 span.k-i-arrow-60-down')).get(0).click();
      this.selectListElement(index);
    };

    this.selectPeriodicity = function(index) {
      browser.executeScript("arguments[0].click();", active_tab_content.all(by.css('span.k-i-arrow-60-down')).get(1).getWebElement());
      this.selectListElement(index);
    };

    this.selectVehicle = function(index) {
      active_tab_content.all(by.css('div.medium-12.multiselect:not(.ng-hide) .k-widget.k-multiselect')).get(0).click();
      this.selectListElement((index + 1));
    };

    this.selectRadioLabel = function(index) {
      browser.executeScript("arguments[0].click();", this.getRadioLabel(index).getWebElement());
    };

    this.selectRecipients = function(index) {
      browser.wait(testUtils.until.presenceOf(active_tab_content.element(by.css('div.medium-12.multiselect .k-widget.k-multiselect .k-input[aria-disabled="false"]'))));
      active_tab_content.element(by.css('div.medium-12.multiselect .k-widget.k-multiselect .k-input[aria-disabled="false"]')).click();
      this.selectListElement(index);
    };

    this.selectDriver = function(index) {
      active_tab_content.all(by.css('div.medium-12.columns:not(.ng-hide) .k-widget.k-multiselect')).get(1).click();
      this.selectListElement(index);
    };

    this.selectGeozone = function(index) {
      active_tab_content.all(by.css('div.medium-12.multiselect:not(.ng-hide) .k-widget.k-multiselect')).get(2).click();
      this.selectListElement(index);
    };

    this.createSubcription = function(random_number, index) {
      browser.wait(testUtils.until.presenceOf(element(by.css('.create-modal'))));
      this.createGeneralTab(random_number, index);
      this.createDistribution(index);
      this.createReportOption(index);
      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(element(by.css('.create-modal'))));
    };

    this.createGeneralTab = function(random_number, index) {
      this.selectSubcription(index);
      this.fillGeneralName('subcription ' + random_number);
      this.selectPeriodicity(index);
      this.clickActiveSwitcher();
      this.clickInclucdesWeekend();
    };

    this.createReportOption = function(index) {
      this.clickReportOptionsTab();
      this.selectRadioLabel(index + 1);
      this.clickDetailed();
      this.selectVehicle(index);
      this.clickReportOptionsTab();
    };

    this.createDistribution = function(index) {
      this.clickDistributionTab();
      this.selectRecipients(index);
      this.fillEmailSubject('bitnemovn@gmail.com');
      this.fillEmailContent('Email content');
    };

    this.editSubcription = function(random_number, index) {
      browser.wait(testUtils.until.presenceOf(element(by.css('.create-modal'))));
      this.editGeneralTab(random_number, index);
      this.editDistribution(index);
      this.editReportOptions(index);
      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(element(by.css('.create-modal'))));
    };

    this.editGeneralTab = function(random_number, index) {
      this.selectSubcription(index);
      this.fillGeneralName('edited scr ' + random_number);
      this.selectPeriodicity(index);
      this.clickActiveSwitcher();
    };

    this.editReportOptions = function(index) {
      this.clickReportOptionsTab();
      this.clickDetailed();
    };

    this.editDistribution = function(index) {
      this.clickDistributionTab();
      browser.wait(testUtils.until.presenceOf(element(by.css('.medium-12.format label.k-radio-label[for="format-xls"]'))));
      browser.executeScript("arguments[0].click();", active_tab_content.element(by.css('.medium-12.format label.k-radio-label[for="format-xls"]')).getWebElement());
      this.selectRecipients(index);
      this.fillEmailSubject('test@bitnemo.vn');
      this.fillEmailContent('Edited email content');
    };

    this.deleteSubcription = function() {
      // browser.executeScript("arguments[0].click();", this.getGridRow(1).element(by.css('.fi-trash')).getWebElement());
      this.getGridRow(1).element(by.css('a.fi-trash.deleteSubscription')).click();
      browser.wait(testUtils.until.presenceOf(element(by.css('.warn-modal'))));
      browser.executeScript("arguments[0].click();", element(by.css('.warn-modal button.desktop-action-button')).getWebElement());
      // browser.wait(testUtils.until.stalenessOf(element(by.css('.warn-modal'))));
    };

    this.waitElementTextPresent = function(actual) {
      return actual.getText().then(function(actualText) {
        return actualText == "Notifications";
      });
    };
  };
  module.exports = new ReportSubcriptionsPage();
})();
