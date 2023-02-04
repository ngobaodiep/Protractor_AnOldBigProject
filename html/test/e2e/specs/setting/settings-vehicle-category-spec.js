(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    settingsVehiclesPage = require('./SettingsVehiclesPage'),
    mainSettingsPage = require('./MainSettingsPage'),
    warnModal = require('./WarnModal'),
    settingsVehicleCategoryPage = require('./SettingsVehicleCategoryPage');

  describe('on the vehicle', function() {
    var random_number;
    beforeAll(function() {
      mainSettingsPage.clickSettingsVehiclesButton();
      browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getCreateVehicleBtn()));
      settingsVehiclesPage.clickCreateVehicleBtn();
      browser.wait(testUtils.until.presenceOf(settingsVehiclesPage.getRevealCreateModal()));
    });

    describe('when category created', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.visibilityOf(settingsVehiclesPage.getGeneralCategoryBtn()));
        browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getGeneralCategoryBtn()));
        settingsVehiclesPage.clickGeneralCategory();
        browser.wait(testUtils.until.presenceOf(settingsVehicleCategoryPage.getCreateCategoryBtn()));
        settingsVehicleCategoryPage.clickCreateCategoryBtn();
        browser.wait(testUtils.until.presenceOf(settingsVehicleCategoryPage.getCategoryCreateModalForm()));
        browser.wait(testUtils.until.presenceOf(settingsVehicleCategoryPage.getGeneralTab()));
        settingsVehicleCategoryPage.clickGeneralTab();
        browser.wait(testUtils.until.presenceOf(settingsVehicleCategoryPage.getIconList()));
      });

      describe('check category create modal elements', function() {
        it('should have category name input', function() {
          expect(settingsVehicleCategoryPage.getCategoryNameInput().isDisplayed()).toBe(true);
        });

        it('should have picture icon', function() {
          expect(settingsVehicleCategoryPage.getActiveTabContent().element(by.css('div:nth-child(1).medium-3.columns label.ng-binding')).getText()).toContain('Icon');
        });

        it('should display small size', function() {
          expect(settingsVehicleCategoryPage.getSmallSizeBtn().isDisplayed()).toBe(true);
        });

        it('should display medium size', function() {
          expect(settingsVehicleCategoryPage.getMediumSizeBtn().isDisplayed()).toBe(true);
        });

        it('should display large size', function() {
          expect(settingsVehicleCategoryPage.getLargeSizeBtn().isDisplayed()).toBe(true);
        });

        it('should have machine picture list', function() {
          expect(element(by.css('div[ng-show="showMachines"]')).isPresent()).toBe(true);
        });

        it('should have vehicle picture list', function() {
          expect(element(by.css('div[ng-show="showVehicles"]')).isPresent()).toBe(true);
        });

        it('should have tool picture list', function() {
          expect(element(by.css('div[ng-show="showTools"]')).isPresent()).toBe(true);
        });

        it('should have person picture list', function() {
          expect(element(by.css('div[ng-show="showPersons"]')).isPresent()).toBe(true);
        });

        it('should have others picture list', function() {
          expect(element(by.css('div[ng-show="showMisc"]')).isPresent()).toBe(true);
        });

        it('should have category save button', function() {
          expect(settingsVehicleCategoryPage.getCategorySaveBtn().isPresent()).toBe(true);
        });
      });

      describe('check created category', function() {
        beforeAll(function() {
          random_number = new Date().getTime();
          settingsVehicleCategoryPage.createCategory('test car ' + random_number);
          browser.wait(testUtils.until.visibilityOf(settingsVehiclesPage.getCancelBtn()));
          settingsVehiclesPage.clickCancelButton();
          browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getRevealCreateModal()));
          browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getLoadingMask()));
          browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getCreateVehicleBtn()));
          settingsVehiclesPage.clickCreateVehicleBtn();
          browser.wait(testUtils.until.presenceOf(settingsVehiclesPage.getGeneralCategoryBtn()));
          browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getGeneralCategoryBtn()));
          settingsVehiclesPage.clickGeneralCategory();
          settingsVehicleCategoryPage.fillSearchCategoryInput('test car ' + random_number);
          settingsVehicleCategoryPage.waitCategoryListFilted();
          settingsVehicleCategoryPage.waitFiltedCategoryVisibilityWithString('test car ' + random_number);
        });

        it('should display created category', function() {
          expect(settingsVehicleCategoryPage.getCategoryNameGridRow(1).getText()).toBe('test car ' + random_number);
        });
      });
    });

    describe('when category edited', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getGeneralCategoryBtn()));
        settingsVehiclesPage.clickGeneralCategory();
        browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"]'))));
        browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getGeneralCategoryBtn()));
        settingsVehiclesPage.clickGeneralCategory();
        browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"]'))));
        browser.wait(testUtils.until.elementToBeClickable(settingsVehicleCategoryPage.getCategoryEditButtonGridRow(1)));
        settingsVehicleCategoryPage.clickCategoryEditButtonGridRow(1);
        settingsVehicleCategoryPage.editCategory("edit car " + random_number);
        browser.wait(testUtils.until.visibilityOf(settingsVehiclesPage.getCancelBtn()));
        settingsVehiclesPage.clickCancelButton();
        browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getRevealCreateModal()));
        browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getLoadingMask()));
        browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getCreateVehicleBtn()));
        settingsVehiclesPage.clickCreateVehicleBtn();
        browser.wait(testUtils.until.visibilityOf(settingsVehiclesPage.getGeneralCategoryBtn()));
        browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getGeneralCategoryBtn()));
        settingsVehiclesPage.clickGeneralCategory();
        settingsVehicleCategoryPage.fillSearchCategoryInput("edit car " + random_number);
        settingsVehicleCategoryPage.waitCategoryListFilted();
        settingsVehicleCategoryPage.waitFiltedCategoryVisibilityWithString('edit car ' + random_number);
      });

      it('should display edited category name', function() {
        expect(settingsVehicleCategoryPage.getCategoryNameGridRow(1).getText()).toBe("edit car " + random_number);
      });

    });

    describe('when category deleted', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsVehicleCategoryPage.getDeleteButtonOfCategoryListGridRow(1)));
        settingsVehicleCategoryPage.clickDeleteButtonOfCategoryListGridRow(1);
        browser.wait(testUtils.until.presenceOf(warnModal.getWarnModal()));
      });

      describe('on warn modal', function() {
        afterAll(function(){
          browser.wait(testUtils.until.elementToBeClickable(warnModal.getWarnModalConfirmBtn()));
          warnModal.clickWarnModalConfirmBtn();
        });
        it('should have warn modal', function () {
          expect(warnModal.getWarnModal().isPresent()).toBe(true);
        });

        it('should have warn modal title', function () {
          expect(warnModal.getWarnModalTitle().isPresent()).toBe(true);
        });

        it('should have warn modal confirmation', function () {
          expect(warnModal.getWarnModalConfirmation().isPresent()).toBe(true);
        });

        it('should have warn modal message', function () {
          expect(warnModal.getWarnModalMessage().isPresent()).toBe(true);
        });

        it('should have warn modal confirm button', function () {
          expect(warnModal.getWarnModalConfirmBtn().isPresent()).toBe(true);
        });

        it('should have warn modal cancel button', function () {
          expect(warnModal.getWarnModalCancelBtn().isPresent()).toBe(true);
        });

        it('warn title should be Delete category', function () {
          expect(warnModal.getWarnModalTitle().getText()).toBe('Delete category');
        });

        it('warn confirmation should be You are about to delete a category', function () {
          expect(warnModal.getWarnModalConfirmation().getText()).toBe('You are about to delete a category');
        });

        it('warn title should be Are you sure you want to continue ?', function () {
          expect(warnModal.getWarnModalMessage().getText()).toBe('Are you sure you want to continue ?');
        });

        it('warn cancel button should have Cancel text', function () {
          expect(warnModal.getWarnModalCancelBtn().getText()).toBe('Cancel');
        });

        it('warn confirm button should have Delete text', function () {
          expect(warnModal.getWarnModalConfirmBtn().getText()).toBe('Delete');
        });
      });

      describe('on table content', function() {
        beforeAll(function(){
          browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getCancelBtn()));
          settingsVehiclesPage.clickCancelButton();
          browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getLoadingMask()));
          browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getCreateVehicleBtn()));
          settingsVehiclesPage.clickCreateVehicleBtn();
          browser.wait(testUtils.until.presenceOf(settingsVehiclesPage.getRevealCreateModal()));
          browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getGeneralCategoryBtn()));
          settingsVehiclesPage.clickGeneralCategory();
          settingsVehicleCategoryPage.fillSearchCategoryInput("edit car " + random_number);
          browser.wait(testUtils.until.visibilityOf(settingsVehicleCategoryPage.getCategoryNodata()));
        });

        afterAll(function(){
          browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getCancelBtn()));
          settingsVehiclesPage.clickCancelButton();
        });

        it('should have nodata on list', function () {
          expect(settingsVehicleCategoryPage.getCategoryNodata().isPresent()).toBe(true);
        });

        it('should have no data text on list', function () {
          expect(settingsVehicleCategoryPage.getCategoryNodata().element(by.css('div')).getText()).toBe('NO DATA FOUND.');
        });
      });
    });
  });
})();
