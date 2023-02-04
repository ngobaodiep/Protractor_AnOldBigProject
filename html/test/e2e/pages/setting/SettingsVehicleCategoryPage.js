(function() {
  'use strict';
  var testUtils = require('./TestUtils');

  var SettingsCategoryVehiclePage = function() {
    var create_category_btn = element(by.css('ul[aria-hidden="false"] li div[ng-click="createCategory($event)"]')),
      category_create_modal_form = element(by.name('creationForm')),
      general_tab = category_create_modal_form.element(by.css('.tabs li[heading="General"] a')),
      active_tab_content = category_create_modal_form.element(by.css('.tabs-content .tabs-panel.is-active')),
      icon_list = active_tab_content.all(by.css('.cell.medium-12.text-left .icons-list .icon-item')),
      category_name_input = category_create_modal_form.element(by.name('name')),
      small_size = element(by.css('.cell.margin-bottom-0.text-right a.size-small')),
      medium_size = element(by.css('.cell.margin-bottom-0.text-right a.size-medium')),
      large_size = element(by.css('.cell.margin-bottom-0.text-right a.size-large')),
      category_save_btn = element(by.css('[index="1"] .desktop-action-button')),
      search_category_input = element(by.css('.k-animation-container .k-state-border-up .k-list-filter input.k-textbox')),
      category_nodata = element(by.css('.k-state-border-up .k-nodata')),
      category_cancel_btn = element(by.css('[index="1"] .desktop-secondary-action-button'));

    this.getCreateCategoryBtn = function() {
      return create_category_btn;
    };

    this.getCategoryCancelBtn = function(){
      return category_cancel_btn;
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

    this.getCategoryEditButtonGridRow = function(n){
      return element(by.css('ul[aria-hidden="false"] li:nth-child('+n+') .medium-1 span[ng-click="editCategory($event)"]'));
    };

    this.getCategoryNameGridRow = function(n){
      return element(by.css('ul[aria-hidden="false"] li:nth-child('+n+') .medium-9'));
    };

    this.getDeleteButtonOfCategoryListGridRow = function(n){
      return element(by.css('ul[aria-hidden="false"] li:nth-child('+n+') [ng-click="deleteCategory($event)"]'));
    };

    this.getEditButtonOfCategoryListGridRow = function(n){
      return element(by.css('ul[aria-hidden="false"] li:nth-child('+n+') [ng-click="editCategory($event)"]'));
    };

    this.waitCategoryListFilted = function(){
      browser.wait(function(){
        return element.all(by.css('ul[aria-hidden="false"] li')).count().then(function(count){
          return count == 1;
        });
      });
    };

    this.waitFiltedCategoryVisibilityWithString = function(string){
      browser.wait(function(){
        return element(by.css('[aria-hidden="false"] li:nth-child(1) .medium-9')).getText().then(function(text){
          return text == string;
        });
      });
    };

    this.getCategoryNodata = function(){
      return category_nodata;
    };

    this.clickDeleteButtonOfCategoryListGridRow = function(n){
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child('+n+') [ng-click="deleteCategory($event)"]')).getWebElement());
    };

    this.clickCategoryEditButtonGridRow = function(n){
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child('+n+') [ng-click="editCategory($event)"]')).getWebElement());
    };

    this.clickCategoryCancelBtn = function(){
      category_cancel_btn.click();
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
      // browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li[role="option"] .medium-9.ng-binding', string))));
      browser.wait(testUtils.until.visibilityOf(search_category_input));
      this.clickSearchCategoryInput();
      search_category_input.clear().sendKeys(string);
      // browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li[data-offset-index="0"] div.medium-9.ng-binding', string))));
    };

    this.deleteCategory = function() {
      // browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li[data-offset-index="0"] .fi-trash'))));
      browser.wait(testUtils.until.elementToBeClickable(element(by.css('ul[aria-hidden="false"] li[data-offset-index="0"] .fi-trash'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li[data-offset-index="0"] .fi-trash')).getWebElement());
      browser.wait(testUtils.until.presenceOf(this.getWarnModalDeleteBtn()));
      this.clickWarnModalDeleteBtn();
      browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"] li[data-offset-index="0"] div.medium-9.ng-binding'))));
    };
  };

  module.exports = new SettingsCategoryVehiclePage();
})();
