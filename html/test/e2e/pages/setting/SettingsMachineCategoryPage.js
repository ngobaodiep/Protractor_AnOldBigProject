(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
  warnModal = require('./WarnModal');

  var SettingsCategoryMachinePage = function() {
    var create_category_btn = element(by.css('ul[aria-hidden="false"] li div[ng-click="createCategory($event)"]')),
      category_create_modal_form = element(by.name('creationForm')),
      tabs_content = category_create_modal_form.element(by.className('tabs-content')),
      general_tab = category_create_modal_form.element(by.css('.tabs li[heading="General"] a')),
      active_tab_content = tabs_content.element(by.className('is-active')),
      icon_list = active_tab_content.all(by.css('.cell.medium-12.text-left .icons-list .icon-item')),
      category_name_input = active_tab_content.element(by.name('name')),
      small_size = element(by.css('.cell.margin-bottom-0.text-right a.size-small')),
      medium_size = element(by.css('.cell.margin-bottom-0.text-right a.size-medium')),
      large_size = element(by.css('.cell.margin-bottom-0.text-right a.size-large')),
      category_create_modal = element(by.css('[index="1"] .create-modal')),
      category_save_btn = category_create_modal.element(by.className('desktop-action-button')),
      search_category_input = element(by.css('.k-animation-container .k-state-border-up .k-list-filter input.k-textbox'));

    this.getCreateCategoryBtn = function() {
      return create_category_btn;
    };

    this.getSmallSizeBtn = function() {
      return small_size;
    };

    this.getMediumSizeBtn = function() {
      return medium_size;
    };

    this.getLargeSizeBtn = function() {
      return large_size;
    };

    this.getCategoryCreateModalForm = function() {
      return category_create_modal_form;
    };
    this.getGeneralTab = function() {
      return general_tab;
    };

    this.getIconList = function() {
      return icon_list;
    };

    this.getSearchCategoryInput = function() {
      return search_category_input;
    };

    this.getActiveTabContent = function() {
      return active_tab_content;
    };

    this.getCategoryNameInput = function() {
      return category_name_input;
    };

    this.getCategorySaveBtn = function() {
      return category_save_btn;
    };

    this.clickCategorySaveBtn = function() {
      browser.executeScript("arguments[0].click();", category_save_btn.getWebElement());
    };

    this.clickCreateCategoryBtn = function() {
      browser.executeScript("arguments[0].click();", create_category_btn.getWebElement());
    };

    this.clickSearchCategoryInput = function() {
      browser.executeScript("arguments[0].click();", search_category_input.getWebElement());
    };

    this.clickSmallSizeBtn = function() {
      browser.executeScript("arguments[0].click();", small_size.getWebElement());
    };

    this.clickMediumSizeBtn = function() {
      browser.executeScript("arguments[0].click();", medium_size.getWebElement());
    };

    this.clickLargeSizeBtn = function() {
      browser.executeScript("arguments[0].click();", large_size.getWebElement());
    };

    this.clickGeneralTab = function() {
      browser.executeScript("arguments[0].click();", general_tab.getWebElement());
    };

    this.fillCategoryNameInput = function(string) {
      browser.executeScript("arguments[0].click();", category_name_input.getWebElement());
      category_name_input.clear().sendKeys(string);
    };

    this.createCategory = function(string) {
      this.clickSmallSizeBtn();
      browser.wait(testUtils.until.presenceOf(element(by.css('div[ng-show="showVehicles"] div:nth-child(1) span.icon-size-sm'))));
      browser.executeScript("arguments[0].click();", element(by.css('div[ng-show="showVehicles"] div:nth-child(1) span.icon-size-sm')).getWebElement());
      browser.wait(testUtils.until.presenceOf(active_tab_content.element(by.css('div:nth-child(1).medium-3 span.icon-size-sm.icon-lf_car_1'))));
      this.fillCategoryNameInput(string);
      browser.wait(testUtils.until.elementToBeClickable(category_save_btn));
      this.clickCategorySaveBtn();
      browser.wait(testUtils.until.stalenessOf(category_create_modal_form));
    };

    this.editCategory = function(string) {
      browser.wait(testUtils.until.presenceOf(category_create_modal_form));
      browser.wait(testUtils.until.presenceOf(large_size));
      this.clickLargeSizeBtn();
      browser.wait(testUtils.until.presenceOf(element(by.css('div[ng-show="showVehicles"] div:nth-child(2) span.icon-size-lg'))));
      browser.executeScript("arguments[0].click();", element(by.css('div[ng-show="showVehicles"] div:nth-child(2) span.icon-size-lg')).getWebElement());
      browser.wait(testUtils.until.presenceOf(active_tab_content.element(by.css('div:nth-child(1).medium-3 span.icon-size-lg'))));
      this.fillCategoryNameInput(string);
      browser.wait(testUtils.until.elementToBeClickable(category_save_btn));
      this.clickCategorySaveBtn();
      browser.wait(testUtils.until.stalenessOf(category_create_modal_form));
    };

    this.fillSearchCategoryInput = function(string) {
      browser.wait(testUtils.until.visibilityOf(search_category_input));
      this.clickSearchCategoryInput();
      search_category_input.clear().sendKeys(string);
      // browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li[role="option"] .medium-9.ng-binding', string))));
    };
  };

  module.exports = new SettingsCategoryMachinePage();
})();
