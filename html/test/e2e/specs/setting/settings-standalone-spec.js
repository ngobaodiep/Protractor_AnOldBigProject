(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainSettingsPage = require('./MainSettingsPage'),
    warnModal = require('./WarnModal'),
    settingsStandalonesPage = require('./SettingsStandalonesPage');

  describe('on settings standalone', function() {
    var random_number;
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsStandalonesButton()));
      mainSettingsPage.clickSettingsStandalonesButton();
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsStandalonesView()));
    });

    describe('check standalones list elements', function() {
      it('should have a create new standalone button', function() {
        expect(settingsStandalonesPage.getCreateStandaloneBtn().isPresent()).toBe(true);
        expect(settingsStandalonesPage.getCreateStandaloneBtn().isDisplayed()).toBe(true);
      });

      it('should have a pagination label', function() {
        expect(settingsStandalonesPage.getPaginationLabel().isPresent()).toBe(true);
        expect(settingsStandalonesPage.getPaginationLabel().isDisplayed()).toBe(true);
      });

      it('should have an export button', function() {
        expect(settingsStandalonesPage.getExportBtn().isPresent()).toBe(true);
        expect(settingsStandalonesPage.getExportBtn().isDisplayed()).toBe(true);
      });
    });

    describe('when standalone created', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        settingsStandalonesPage.clickCreateStandaloneBtn();
        settingsStandalonesPage.createStandalone(random_number);
        browser.wait(testUtils.until.stalenessOf(settingsStandalonesPage.getCreateModal()));
        browser.wait(testUtils.until.visibilityOf(settingsStandalonesPage.getSearchNameInput()));
        settingsStandalonesPage.fillSearchNameInput('standalone ' + random_number);
        browser.wait(testUtils.until.stalenessOf(settingsStandalonesPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.settings-view .panel .k-grid .k-grid-content tr:nth-of-type(1) td:nth-of-type(2) span', 'standalone ' + random_number))));
      });

      it('standalone should be found on list', function() {
        expect(settingsStandalonesPage.getGridRow(1).element(by.css('td:nth-of-type(2) span')).getText()).toEqual('standalone ' + random_number);
      });

      it('should have edit button', function() {
        expect(settingsStandalonesPage.getGridRow(1).element(by.css('a.fi-pencil.editStandalone')).isPresent()).toBe(true);
      });

      it('should have delete button', function() {
        expect(settingsStandalonesPage.getGridRow(1).element(by.css('a.fi-trash.deleteStandalone')).isPresent()).toBe(true);
      });
    });

    describe('when standalone edited', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsStandalonesPage.getEditStandaloneButtonGridRow(1)));
        settingsStandalonesPage.clickEditStandaloneButtonGridRow(1);
        settingsStandalonesPage.editStandalone(random_number);
        browser.wait(testUtils.until.stalenessOf(settingsStandalonesPage.getStandalonesCreationForm()));
        settingsStandalonesPage.clickSearchNameClearBtn();
        browser.wait(testUtils.until.visibilityOf(settingsStandalonesPage.getSearchNameInput()));
        settingsStandalonesPage.fillSearchNameInput('edited standalone ' + random_number);
        browser.wait(testUtils.until.stalenessOf(settingsStandalonesPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.settings-view .panel .k-grid .k-grid-content tr:nth-of-type(1) td:nth-of-type(2) span', 'edited standalone ' + random_number))));
      });

      it('new standalone should be found on list', function() {
        expect(settingsStandalonesPage.getGridRow(1).element(by.css('td:nth-of-type(2) span')).getText()).toEqual('edited standalone ' + random_number);
      });
    });

    describe('when pagination label clicked', function() {
      beforeAll(function() {
        settingsStandalonesPage.clickSearchNameClearBtn();
        browser.wait(testUtils.until.stalenessOf(settingsStandalonesPage.getLoadingMask()));
        browser.wait(testUtils.until.elementToBeClickable(settingsStandalonesPage.getPaginationLabel()));
        settingsStandalonesPage.clickPaginationLabel();
        browser.wait(testUtils.until.stalenessOf(settingsStandalonesPage.getPagerNumber()));
        browser.wait(testUtils.until.elementToBeClickable(settingsStandalonesPage.getPaginationLabel()));
      });

      it('the pager number should not be active', function() {
        expect(settingsStandalonesPage.getPagerNumber().isPresent()).toBe(false);
      });

      it('number standalones on list is equal to total standalones', function() {
        settingsStandalonesPage.getStandalonesIcon().getText().then(function(totalOfStandalones) {
          expect(settingsStandalonesPage.getStandaloneGridRow().count()).toEqual(parseInt(totalOfStandalones));
        });
      });
    });

    describe('when standalone deleted', function() {
      beforeAll(function() {
        settingsStandalonesPage.fillSearchNameInput('edited standalone ' + random_number);
        browser.wait(testUtils.until.stalenessOf(settingsStandalonesPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.settings-view .panel .k-grid .k-grid-content tr:nth-of-type(1) td:nth-of-type(2) span', 'edited standalone ' + random_number))));
        browser.wait(testUtils.until.elementToBeClickable(settingsStandalonesPage.getDeleteStandaloneButtonGridRow(1)));
        settingsStandalonesPage.clickDeleteStandaloneButtonGridRow(1);
        browser.wait(testUtils.until.presenceOf(warnModal.getWarnModal()));
      });

      it('should have warn modal', function() {
        expect(warnModal.getWarnModal().isPresent()).toBe(true);
      });

      it('should have warn title', function() {
        expect(warnModal.getWarnModalTitle().isPresent()).toBe(true);
      });

      it('should have warn confirmation', function() {
        expect(warnModal.getWarnModalConfirmation().isPresent()).toBe(true);
      });

      it('should have modal warning', function() {
        expect(warnModal.getWarnModalMessage().isPresent()).toBe(true);
      });

      it('should have modal confirm button', function() {
        expect(warnModal.getWarnModalConfirmBtn().isPresent()).toBe(true);
      });

      it('should have modal warn cancel button', function() {
        expect(warnModal.getWarnModalCancelBtn().isPresent()).toBe(true);
      });

      it('warn title should be Delete standalone', function() {
        expect(warnModal.getWarnModalTitle().getText()).toBe("Delete standalone");
      });

      it('warn confirmation should be You are about to delete a standalone', function() {
        expect(warnModal.getWarnModalConfirmation().getText()).toBe("You are about to delete a standalone");
      });

      describe('on warn modal', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(warnModal.getWarnModalConfirmBtn()));
          warnModal.clickWarnModalConfirmBtn();
          browser.wait(testUtils.until.stalenessOf(settingsStandalonesPage.getLoadingMask()));
          browser.wait(testUtils.until.stalenessOf(settingsStandalonesPage.getGridRow(1)));
        });

        afterAll(function() {
          settingsStandalonesPage.clickSearchNameClearBtn();
          browser.wait(testUtils.until.stalenessOf(settingsStandalonesPage.getLoadingMask()));
          browser.wait(testUtils.until.presenceOf(element(by.css('.standalones-list .k-grid-content tr'))));
        });

        it('standalone should not be found on list', function() {
          expect(settingsStandalonesPage.getGridRow(1).isPresent()).toBe(false);
        });
      });
    });
  });


})();
