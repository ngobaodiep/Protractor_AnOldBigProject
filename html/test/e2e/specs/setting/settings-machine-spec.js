(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    fs = require('fs'),
    glob = require("glob"),
    warnModal = require('./WarnModal'),
    infoModal = require('./InfoModal'),
    settingsMachinesPage = require('./SettingsMachinesPage'),
    mainSettingsPage = require('./MainSettingsPage');

  describe('on settings machine', function() {
    var random_number;

    beforeAll(function() {
      mainSettingsPage.clickSettingsMachinesButton();
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsMachinesView()));
    });

    describe('check machines list elements', function() {
      it('should have a create new machine button', function() {
        expect(settingsMachinesPage.getCreateNewMachineBtn().isPresent()).toBe(true);
      });

      it('should have a pagination label', function() {
        expect(settingsMachinesPage.getPaginationLabel().isPresent()).toBe(true);
      });

      it('should have an export button', function() {
        expect(settingsMachinesPage.getExportBtn().isPresent()).toBe(true);
      });
    });

    describe('when machine created', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        settingsMachinesPage.clickCreateNewMachineBtn();
        settingsMachinesPage.createNewMachine(random_number);
        browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getCreateModal()));
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getSearchNameInput()));
        settingsMachinesPage.fillSearchNameInput('machine ' + random_number);
        browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getLoadingMask()));
        settingsMachinesPage.waitMachineTableFilted(1);
        settingsMachinesPage.waitMachineNameOfFirstRowWithString('machine ' + random_number);
      });

      it('machine should be found on list', function() {
        expect(settingsMachinesPage.getMachineNameGridRow(1).getText()).toEqual('machine ' + random_number);
      });

      it('should have edit button', function() {
        expect(settingsMachinesPage.getEditButtonGridRow(1).isPresent()).toBe(true);
      });

      it('should have delete button', function() {
        expect(settingsMachinesPage.getDeleteButtonGridRow(1).isPresent()).toBe(true);
      });
    });

    describe('when machine edited', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getEditButtonGridRow(1)));
        settingsMachinesPage.getEditButtonGridRow(1).click();
        settingsMachinesPage.editMachine(random_number);
        browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getCreateModal()));
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getSearchNameClearBtn()));
        settingsMachinesPage.clickSearchNameClearBtn();
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getSearchNameInput()));
        settingsMachinesPage.fillSearchNameInput('edited machine ' + random_number);
        browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getLoadingMask()));
        settingsMachinesPage.waitMachineTableFilted(1);
        settingsMachinesPage.waitMachineNameOfFirstRowWithString('edited machine ' + random_number);
      });

      it('new machine should be found on list', function() {
        expect(settingsMachinesPage.getMachineNameGridRow(1).getText()).toEqual('edited machine ' + random_number);
      });
    });

    describe('when machine deleted', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getDeleteButtonGridRow(1)));
        settingsMachinesPage.getDeleteButtonGridRow(1).click();
        browser.wait(testUtils.until.presenceOf(warnModal.getWarnModal()));
        warnModal.clickWarnModalConfirmBtn();
        browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getGridRow(1)));
      });

      afterAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getSearchNameClearBtn()));
        settingsMachinesPage.clickSearchNameClearBtn();
        browser.wait(testUtils.until.presenceOf(settingsMachinesPage.getMachinesGridRow()));
      });

      it('machine should not be found on list', function() {
        expect(settingsMachinesPage.getGridRow(1).isPresent()).toBe(false);
      });
    });

    describe('when machine imported', function() {
      beforeAll(function() {
        settingsMachinesPage.importFile();
        browser.wait(testUtils.until.presenceOf(infoModal.getInfoModal()));
      });

      it('should have info modal', function() {
        expect(infoModal.getInfoModal().isPresent()).toBe(true);
      });

      it('should have ok button', function() {
        expect(infoModal.getInfoModalConfirmBtn().isPresent()).toBe(true);
      });

      it('should have info text', function() {
        expect(infoModal.getInfoModalText().isPresent()).toBe(true);
      });

      it('info text should be import sucess', function() {
        expect(infoModal.getInfoModalText().getText()).toBe('Import success');
      });

      describe('on table content', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(infoModal.getInfoModalConfirmBtn()));
          infoModal.clickInfoModalConfirmBtn();
          browser.wait(testUtils.until.visibilityOf(settingsMachinesPage.getSearchNameInput()));
          settingsMachinesPage.fillSearchNameInput('machine 123456789');
          browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getLoadingMask()));
          settingsMachinesPage.waitMachineTableFilted(1);
          settingsMachinesPage.waitMachineNameOfFirstRowWithString('machine 123456789');
        });

        it('machine should be found on list', function() {
          expect(settingsMachinesPage.getGridRow(1).isPresent()).toBe(true);
        });

        it('machine should have imported name', function() {
          settingsMachinesPage.getMachineNameGridRow(1).getText().then(function(txt) {
            expect(txt).toBe("machine 123456789");
          });
        });
      });
    });
  });

  describe('when pagination label clicked', function() {
    beforeAll(function() {
      settingsMachinesPage.clickSearchNameClearBtn();
      browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getLoadingMask()));
      browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getPaginationLabel()));
      settingsMachinesPage.clickPaginationLabel();
      browser.wait(testUtils.until.invisibilityOf(settingsMachinesPage.getPagerNumber()));
    });
    afterAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getPaginationLabel()));
      settingsMachinesPage.clickPaginationLabel();
      browser.wait(testUtils.until.visibilityOf(settingsMachinesPage.getPagerNumber()));
      browser.wait(testUtils.until.visibilityOf(settingsMachinesPage.getGoToFirstPageBtn()));
      browser.wait(testUtils.until.visibilityOf(settingsMachinesPage.getGoToPreviousPageBtn()));
      browser.wait(testUtils.until.visibilityOf(settingsMachinesPage.getGoToNextPageBtn()));
      browser.wait(testUtils.until.visibilityOf(settingsMachinesPage.getGoToLastPageBtn()));
      browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getDeleteButtonGridRow(1)));
    });

    it('the pager should not be active', function() {
      expect(settingsMachinesPage.getPagerNumber().isDisplayed()).toBe(false);
    });

    it('number machines on list is equal to total machines', function() {
      settingsMachinesPage.getMachineIcon().getText().then(function(totalOfmachines) {
        expect(settingsMachinesPage.getMachinesGridRow().count()).toEqual(parseInt(totalOfmachines));
      });
    });

    it('goToFirstPageBtn should be inviable', function() {
      expect(settingsMachinesPage.getGoToFirstPageBtn().isDisplayed()).toBe(false);
    });

    it('goToPreviousPageBtn should be inviable', function() {
      expect(settingsMachinesPage.getGoToPreviousPageBtn().isDisplayed()).toBe(false);
    });

    it('goToNextPageBtn should be inviable', function() {
      expect(settingsMachinesPage.getGoToNextPageBtn().isDisplayed()).toBe(false);
    });

    it('goToLastPageBtn should be inviable', function() {
      expect(settingsMachinesPage.getGoToLastPageBtn().isDisplayed()).toBe(false);
    });
  });

  describe('when imported machine deleted', function() {
    beforeAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getPagerNumber()));
      browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getSearchNameInput()));
      settingsMachinesPage.fillSearchNameInput('machine 123456789');
      settingsMachinesPage.waitMachineNameOfFirstRowWithString('machine 123456789');
      browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getDeleteButtonGridRow(1)));
      browser.executeScript("arguments[0].click();", settingsMachinesPage.getDeleteButtonGridRow(1).getWebElement());
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

    it('should have warn message', function() {
      expect(warnModal.getWarnModalMessage().isPresent()).toBe(true);
    });

    it('should have warn confirm button', function() {
      expect(warnModal.getWarnModalConfirmBtn().isPresent()).toBe(true);
    });

    it('should have warn cancel button', function() {
      expect(warnModal.getWarnModalCancelBtn().isPresent()).toBe(true);
    });

    it('title should be delete machine', function() {
      expect(warnModal.getWarnModalTitle().getText()).toBe('Delete machine');
    });

    it('confirmation should be You are about to delete a machine', function() {
      expect(warnModal.getWarnModalConfirmation().getText()).toBe('You are about to delete a machine');
    });

    it('warn message should be Are you sure you want to continue ?', function() {
      expect(warnModal.getWarnModalMessage().getText()).toBe('Are you sure you want to continue ?');
    });

    describe('on table content', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(warnModal.getWarnModalConfirmBtn()));
        warnModal.clickWarnModalConfirmBtn();
        browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getLoadingMask()));
        browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getGridRow(1)));
      });

      afterAll(function(){
        settingsMachinesPage.clickSearchNameClearBtn();
      });

      it('should be deleted', function() {
        expect(settingsMachinesPage.getGridRow(1).isPresent()).toBe(false);
      });
    });
  });
})();
