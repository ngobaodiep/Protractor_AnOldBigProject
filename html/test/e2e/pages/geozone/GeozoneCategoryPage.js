/*
    GeozoneCategoryPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/

(function() {
  'use strict';
  var GeozoneCategoryPage = function() {

    var selected_row_color = element(by.css('.k-colorpalette.k-state-border-up .k-palette tr:nth-of-type(2)')),
      category_create_button = element(by.css('ul[aria-hidden="false"] .geozone-create-category-dropdown-element[ng-click="createCategory($event)"]')),
      category_color_button = element(by.css('.reveal .create-modal form[name="categoryCreationForm"] .tabs-panel.is-active .k-select .k-icon')),
      category_edit_button = element(by.css('div.geozone-category-dropdown-element span.fi-pencil')),
      category_delete_button = element(by.css('div.geozone-category-dropdown-element span.fi-trash')),
      category_save_button = element(by.css('.reveal .create-modal button.desktop-action-button')),
      category_creation_form = element(by.css('.reveal .create-modal form[name="categoryCreationForm"]')),
      category_first_element = element(by.css('ul[aria-hidden="false"] li[data-offset-index="0"]')),
      category_list = element.all(by.css('ul.k-list[aria-hidden="false"] li')),
      category_name = element(by.css('.create-modal  input[ng-model="category.name"]')),
      selected_category = element(by.css('ul[aria-hidden="false"] li[data-offset-index="0"]')),
      search_category_input = element(by.css('.k-animation-container .k-list-filter .k-textbox')),
      category_dropdown = element(by.css('ul[aria-hidden="false"]'));

    this.getCategoryDropdown = function() {
      return category_dropdown;
    };

    this.getSelectedColor = function(n) {
      return selected_row_color.element(by.css('td:nth-of-type(' + n + ')'));
    };

    this.getSearchCategoryInput = function() {
      return search_category_input;
    };

    this.getCategoryCreateForm = function() {
      return category_creation_form;
    };

    this.getCategoryOnList = function() {
      return selected_category;
    };

    this.getCategoryNameOnList = function() {
      return selected_category.element(by.css('div.geozone-category-dropdown-element div.medium-9.columns'));
    };

    this.getCategoryColorOnList = function() {
      return selected_category.element(by.css('div.geozone-category-dropdown-element div.medium-1.columns:nth-child(1) span'));
    };

    this.getCategoryEditButton = function() {
      return category_edit_button;
    };

    this.getCategoryDeleteButton = function() {
      return category_delete_button;
    };

    this.getCategorySaveButton = function() {
      return category_save_button;
    };

    this.getCategoryList = function() {
      return category_list;
    };

    this.getCategorySelectLabel = function() {
      return element(by.css('.k-list-optionlabel'));
    };

    this.clickCategoryFirstElement = function() {
      browser.executeScript("arguments[0].click();", category_first_element.getWebElement());
    };

    this.clickSelectedColor = function(n) {
      browser.executeScript("arguments[0].click();", this.getSelectedColor(n).getWebElement());
    };

    this.clickCategoryDeleteButton = function() {
      browser.executeScript("arguments[0].click();", category_delete_button.getWebElement());
    };

    this.clickCategoryEditButton = function() {
      browser.executeScript("arguments[0].click();", element(by.css('li[data-offset-index="0"] div.geozone-category-dropdown-element span.fi-pencil')).getWebElement());
    };

    this.clickCategorySaveButton = function() {
      browser.executeScript("arguments[0].click();", category_save_button.getWebElement());
    };

    this.clickCreateCategoryButton = function() {
      browser.executeScript("arguments[0].click();", category_create_button.getWebElement());
    };

    this.clickSearchCategory = function() {
      browser.executeScript("arguments[0].click();", search_category_input.getWebElement());
    };

    this.clickCategoryColorButton = function() {
      browser.executeScript("arguments[0].click();", category_color_button.getWebElement());
    };

    this.clickCategorySelectLabel = function() {
      browser.executeScript("arguments[0].click();", element(by.css('.k-list-optionlabel')).getWebElement());
    };

    this.fillCategoryName = function(category) {
      browser.executeScript("arguments[0].click();", category_name.getWebElement());
      category_name.clear().sendKeys(category);
    };

  };
  module.exports = new GeozoneCategoryPage();
})();
