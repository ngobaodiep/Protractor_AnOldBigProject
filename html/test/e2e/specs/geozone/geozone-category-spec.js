(function() {
  'use strict';

  var mainPage = require('../../MainPage'),
    geozonePanelPage = require('./GeozonePanelPage'),
    testUtils = require('../../TestUtils'),
    geozoneCategoryPage = require('./GeozoneCategoryPage.js');

  describe('On geozone category form', function() {
    var random_number_category = new Date().getTime(),
      col = parseInt(Math.random() * (10 - 1) + 1),
      selected_category_color,
      edit_color_category,
      category_count;

    describe('when category created', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.presenceOf(mainPage.getTrackingGeozoneButton()));

        mainPage.clickTrackingGeozoneButton();
        browser.wait(testUtils.until.presenceOf(geozonePanelPage.getGeozonesPanel()));

        geozonePanelPage.clickCreateGeozoneButton();
        browser.wait(testUtils.until.presenceOf(geozonePanelPage.getGeozoneForm()));

        geozonePanelPage.clickCategoryDropdownButton();
        browser.wait(testUtils.until.presenceOf(geozoneCategoryPage.getCategoryDropdown()));

        geozoneCategoryPage.clickCreateCategoryButton();
        browser.wait(testUtils.until.presenceOf(geozoneCategoryPage.getCategoryCreateForm()));

        geozoneCategoryPage.fillCategoryName('category ' + random_number_category);
        geozoneCategoryPage.clickCategoryColorButton();
        geozoneCategoryPage.clickSelectedColor(1);
        selected_category_color = geozoneCategoryPage.getSelectedColor(1).getCssValue('background-color');
        geozoneCategoryPage.clickCategorySaveButton();
        browser.wait(testUtils.until.stalenessOf(geozoneCategoryPage.getCategoryCreateForm()));

        geozonePanelPage.clickCategoryDropdownButton();
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('li[role="option"] .medium-9.columns', 'category ' + random_number_category))));
        browser.wait(testUtils.until.visibilityOf(geozoneCategoryPage.getSearchCategoryInput()));

        geozoneCategoryPage.clickSearchCategory();
        geozoneCategoryPage.getSearchCategoryInput().sendKeys('category ' + random_number_category);
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li[data-offset-index="0"] .medium-9.columns', 'category ' + random_number_category))));
      });

      it('name category should be found on list', function() {
        expect(geozoneCategoryPage.getCategoryNameOnList().getText()).toContain('category ' + random_number_category);
      });

      it('category color should be selected color', function() {
        expect(geozoneCategoryPage.getCategoryColorOnList(1).getCssValue('background-color')).toContain(selected_category_color);
      });

      it('category edit button should be present', function() {
        expect(geozoneCategoryPage.getCategoryEditButton().isPresent()).toBe(true);
      });

      it('category delete button should be present', function() {
        expect(geozoneCategoryPage.getCategoryDeleteButton().isPresent()).toBe(true);
      });
    });

    describe('when category deleted', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(geozoneCategoryPage.getCategoryDeleteButton()));
        geozoneCategoryPage.clickCategoryDeleteButton();
        browser.wait(testUtils.until.presenceOf(geozonePanelPage.getWarnDeleteModal()));
        geozonePanelPage.clickWarnDeleteButton();
        browser.wait(testUtils.until.stalenessOf(geozonePanelPage.getWarnDeleteModal()));
        geozonePanelPage.clickCategoryDropdownButton();
        browser.wait(testUtils.until.stalenessOf(element(by.cssContainingText('li[data-offset-index="0"] .medium-9.columns', 'category ' + random_number_category))));
      });

      it('name category should be not shown on list ', function() {
        expect(element(by.cssContainingText('li[data-offset-index="0"] .medium-9.columns', 'category ' + random_number_category)).isPresent()).toBe(false);
      });
    });

    describe('when category edited', function() {
      beforeAll(function() {
        geozonePanelPage.clickCancelButton();
        browser.wait(testUtils.until.presenceOf(geozonePanelPage.getGeozonesPanel()));
        geozonePanelPage.clickCreateGeozoneButton();
        browser.wait(testUtils.until.presenceOf(geozonePanelPage.getGeozoneForm()));
    
        geozonePanelPage.clickCategoryDropdownButton();
        browser.wait(testUtils.until.presenceOf(geozoneCategoryPage.getCategoryList()));
        geozoneCategoryPage.getCategoryList().count().then(function(count) {
          category_count = count;
          browser.wait(testUtils.until.presenceOf(geozoneCategoryPage.getCategoryEditButton()));
          browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + (category_count - 2) + '"] div.geozone-category-dropdown-element span.fi-pencil')).getWebElement());
        });
    
        browser.wait(testUtils.until.presenceOf(geozoneCategoryPage.getCategoryCreateForm()));
        geozoneCategoryPage.fillCategoryName('import geozone');
        geozoneCategoryPage.clickCategoryColorButton();
        geozoneCategoryPage.clickSelectedColor(col);
        edit_color_category = geozoneCategoryPage.getSelectedColor(col).getCssValue('background-color');
        geozoneCategoryPage.clickCategorySaveButton();
        browser.wait(testUtils.until.stalenessOf(geozoneCategoryPage.getCategoryCreateForm()));
    
        geozonePanelPage.clickCategoryDropdownButton();
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('li[role="option"] .medium-9.columns', 'import geozone'))));
      });
    
      it('edited category should be displayed in geozone category', function() {
        expect(element(by.cssContainingText('li[role="option"] .medium-9.columns', 'import geozone')).isPresent()).toBe(true);
      });
    
      it('edited color category should be displayed in geozone category', function() {
        expect(element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + (category_count - 2) + '"] div.medium-1:nth-child(1) span')).getCssValue('background-color')).toContain(edit_color_category);
      });
    
    });
  });
})();
