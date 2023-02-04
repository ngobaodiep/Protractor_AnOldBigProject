(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    settingsMachinesPage = require('./SettingsMachinesPage'),
    warnModal = require('./WarnModal'),
    settingsMachineCategoryPage = require('./SettingsMachineCategoryPage');

  describe('on the machines', function() {
    var random_number;
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(settingsMachinesPage.getCreateNewMachineBtn()));
      settingsMachinesPage.clickCreateNewMachineBtn();
      browser.wait(testUtils.until.presenceOf(settingsMachinesPage.getCreateModal()));
    });

    describe('when category created', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.visibilityOf(settingsMachinesPage.getGeneralCategoryBtn()));
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getGeneralCategoryBtn()));
        settingsMachinesPage.clickGeneralCategoryBtn();
        browser.wait(testUtils.until.presenceOf(settingsMachineCategoryPage.getCreateCategoryBtn()));
        settingsMachineCategoryPage.clickCreateCategoryBtn();
        browser.wait(testUtils.until.presenceOf(settingsMachineCategoryPage.getCategoryCreateModalForm()));
        browser.wait(testUtils.until.presenceOf(settingsMachineCategoryPage.getGeneralTab()));
        settingsMachineCategoryPage.clickGeneralTab();
        browser.wait(testUtils.until.presenceOf(settingsMachineCategoryPage.getIconList()));
      });

      describe('check category create modal elements', function() {
        it('should have category name input', function() {
          expect(settingsMachineCategoryPage.getCategoryNameInput().isDisplayed()).toBe(true);
        });

        it('should have picture icon', function() {
          expect(settingsMachineCategoryPage.getActiveTabContent().element(by.css('div:nth-child(1).medium-3.columns label.ng-binding')).getText()).toContain('Icon');
        });

        it('should display small size', function() {
          expect(settingsMachineCategoryPage.getSmallSizeBtn().isDisplayed()).toBe(true);
        });

        it('should display medium size', function() {
          expect(settingsMachineCategoryPage.getMediumSizeBtn().isDisplayed()).toBe(true);
        });

        it('should display large size', function() {
          expect(settingsMachineCategoryPage.getLargeSizeBtn().isDisplayed()).toBe(true);
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
          expect(settingsMachineCategoryPage.getCategorySaveBtn().isPresent()).toBe(true);
        });
      });

      describe('check category created', function() {
        beforeAll(function() {
          random_number = new Date().getTime();
          settingsMachineCategoryPage.createCategory('test car ' + random_number);
          browser.wait(testUtils.until.visibilityOf(settingsMachinesPage.getCancelBtn()));
          settingsMachinesPage.clickCancelButton();
          browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getCreateModal()));
          browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getLoadingMask()));
          browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getCreateNewMachineBtn()));
          settingsMachinesPage.clickCreateNewMachineBtn();
          browser.wait(testUtils.until.visibilityOf(settingsMachinesPage.getGeneralCategoryBtn()));
          browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getGeneralCategoryBtn()));
          settingsMachinesPage.clickGeneralCategoryBtn();
          settingsMachineCategoryPage.fillSearchCategoryInput('test car ' + random_number);
          settingsMachinesPage.waitCategoryListFilted(1);
          settingsMachinesPage.waitFiltedCategoryVisibilityWithString('test car ' + random_number);
        });

        it('should display created category', function() {
          expect(element(by.css('ul[aria-hidden="false"] li[data-offset-index="0"] div.medium-9.ng-binding')).getText()).toBe('test car ' + random_number);
        });

        it('should display delete category icon', function() {
          expect(settingsMachinesPage.getDeleteButtonOfCategoryListGridRow(1).isPresent()).toBe(true);
        });

        it('should display edit category icon', function() {
          expect(settingsMachinesPage.getEditButtonOfCategoryListGridRow(1).isPresent()).toBe(true);
        });
      });
    });

    describe('when category edited', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        // browser.wait(testUtils.until.visibilityOf(settingsMachinesPage.getGeneralCategoryBtn()));
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getGeneralCategoryBtn()));
        settingsMachinesPage.clickGeneralCategoryBtn();
        browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"]'))));
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getGeneralCategoryBtn()));
        settingsMachinesPage.clickGeneralCategoryBtn();
        browser.wait(testUtils.until.presenceOf(settingsMachinesPage.getEditButtonOfCategoryListGridRow(1)));
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getEditButtonOfCategoryListGridRow(1)));
        settingsMachinesPage.clickEditButtonOfCategoryListGridRow(1);
        settingsMachineCategoryPage.editCategory("edit car " + random_number);
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getCancelBtn()));
        settingsMachinesPage.clickCancelButton();
        browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getCreateModal()));
        browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getLoadingMask()));
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getCreateNewMachineBtn()));
        settingsMachinesPage.clickCreateNewMachineBtn();
        browser.wait(testUtils.until.visibilityOf(settingsMachinesPage.getGeneralCategoryBtn()));
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getGeneralCategoryBtn()));
        settingsMachinesPage.clickGeneralCategoryBtn();
        settingsMachineCategoryPage.fillSearchCategoryInput('edit car ' + random_number);
        settingsMachinesPage.waitCategoryListFilted(1);
        settingsMachinesPage.waitFiltedCategoryVisibilityWithString('edit car ' + random_number);
      });

      it('should display edited category name', function() {
        expect(settingsMachinesPage.getFilterdCategoryName().getText()).toBe("edit car " + random_number);
      });

      it('should display delete category icon', function() {
        expect(settingsMachinesPage.getDeleteButtonOfCategoryListGridRow(1).isPresent()).toBe(true);
      });

      it('should display edit category icon', function() {
        expect(settingsMachinesPage.getEditButtonOfCategoryListGridRow(1).isPresent()).toBe(true);
      });
    });

    describe('when category deleted', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getDeleteButtonOfCategoryListGridRow(1)));
        settingsMachinesPage.clickDeleteButtonOfCategoryListGridRow(1);
        browser.wait(testUtils.until.presenceOf(warnModal.getWarnModal()));
      });

      describe('on warn modal', function() {
        afterAll(function(){
          browser.wait(testUtils.until.elementToBeClickable(warnModal.getWarnModalConfirmBtn()));
          warnModal.clickWarnModalConfirmBtn();
          browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getCancelBtn()));
          settingsMachinesPage.clickCancelButton();
          browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getCreateModal()));
          browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getLoadingMask()));
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
          browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getCreateNewMachineBtn()));
          settingsMachinesPage.clickCreateNewMachineBtn();
          browser.wait(testUtils.until.presenceOf(settingsMachinesPage.getCreateModal()));
          browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getGeneralCategoryBtn()));
          settingsMachinesPage.clickGeneralCategoryBtn();
          settingsMachineCategoryPage.fillSearchCategoryInput("edit car " + random_number);
          browser.wait(testUtils.until.visibilityOf(settingsMachinesPage.getCategoryNodata()));
        });

        afterAll(function(){
          browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getCancelBtn()));
          settingsMachinesPage.clickCancelButton();
        });

        it('should not have category on list', function () {
          expect(settingsMachinesPage.getCategoryGridRow(1).isPresent()).toBe(false);
        });

        it('category list should be nodata', function () {
          expect(settingsMachinesPage.getCategoryNodata().isDisplayed()).toBe(true);
          expect(settingsMachinesPage.getCategoryNodata().getText()).toBe('NO DATA FOUND.');
        });
      });
    });
  });
})();
