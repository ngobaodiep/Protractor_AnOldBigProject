(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    fs = require('fs'),
    glob = require("glob"),
    mainPage = require('./MainPage'),
    warnModal = require('./WarnModal'),
    infoModal = require('./InfoModal'),
    settingsVehiclesPage = require('./SettingsVehiclesPage'),
    mainSettingsPage = require('./MainSettingsPage');

  describe('on settings vehicles', function() {
    var random_number;
    var fileName;
    var pathFolder;
    var filesArray = [];
    var files = [];
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsVehiclesButton()));
      mainSettingsPage.clickSettingsVehiclesButton();
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsVehiclesView()));
    });

    describe('check vehicle list elements', function() {
      it('should have a create new vehicle button', function() {
        expect(settingsVehiclesPage.getCreateVehicleBtn().isPresent()).toBe(true);
        expect(settingsVehiclesPage.getCreateVehicleBtn().isDisplayed()).toBe(true);
      });

      it('should have a pagination label', function() {
        expect(settingsVehiclesPage.getPaginationLabel().isPresent()).toBe(true);
        expect(settingsVehiclesPage.getPaginationLabel().isDisplayed()).toBe(true);
      });

      it('should have a download template button', function() {
        expect(settingsVehiclesPage.getDownloadTemplateBtn().isPresent()).toBe(true);
        expect(settingsVehiclesPage.getDownloadTemplateBtn().isDisplayed()).toBe(true);
      });

      it('should have an import button', function() {
        expect(settingsVehiclesPage.getImportButton().isPresent()).toBe(true);
        expect(settingsVehiclesPage.getImportButton().isDisplayed()).toBe(true);
      });

      it('should have an export button', function() {
        expect(settingsVehiclesPage.getExportButton().isPresent()).toBe(true);
        expect(settingsVehiclesPage.getExportButton().isDisplayed()).toBe(true);
      });

      it('should have a share button', function() {
        expect(settingsVehiclesPage.getShareButton().isPresent()).toBe(true);
        expect(settingsVehiclesPage.getShareButton().isDisplayed()).toBe(true);
      });
    });

    describe('when vehicle created', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        settingsVehiclesPage.clickCreateVehicleBtn();
        settingsVehiclesPage.createVehicle(random_number);
        browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getVehicleCreationForm()));
        browser.wait(testUtils.until.visibilityOf(settingsVehiclesPage.getSearchNameInput()));
        settingsVehiclesPage.fillSearchNameInput('vehicle ' + random_number);
        browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(settingsVehiclesPage.getVehicleNameOfFirstRowWithString('vehicle ' + random_number)));
      });

      it('vehicle should be found on list', function() {
        expect(settingsVehiclesPage.getGridRow(1).element(by.css('td:nth-of-type(1)')).getText()).toEqual('vehicle ' + random_number);
      });

      it('should have edit button', function() {
        expect(settingsVehiclesPage.getGridRow(1).element(by.css('a.fi-pencil')).isPresent()).toBe(true);
      });

      it('should have delete button', function() {
        expect(settingsVehiclesPage.getGridRow(1).element(by.css('a.fi-trash')).isPresent()).toBe(true);
      });

    });

    describe('when vehicle edited', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getEditButtonOfGridRow(1)));
        settingsVehiclesPage.clickEditButtonOfGridRow(1);
        settingsVehiclesPage.editVehicle(random_number);
        browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getVehicleCreationForm()));
        browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getSearchNameClearBtn()));
        settingsVehiclesPage.clickSearchNameClearBtn();
        browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getSearchNameInput()));
        settingsVehiclesPage.fillSearchNameInput('edited vehicle ' + random_number);
        browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(settingsVehiclesPage.getVehicleNameOfFirstRowWithString('vehicle ' + random_number)));
      });

      it('new vehicle should be found on list', function() {
        expect(settingsVehiclesPage.getGridRow(1).element(by.css('td:nth-of-type(1)')).getText()).toEqual('edited vehicle ' + random_number);
      });
    });

    describe('when vehicle deleted', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getDeleteButton(1)));
        settingsVehiclesPage.clickDeleteButtonOfGridRow(1);
        browser.wait(testUtils.until.presenceOf(warnModal.getWarnModal()));
      });
      describe('on warn modal', function() {
        it('should have warn modal', function() {
          expect(warnModal.getWarnModal().isPresent()).toBe(true);
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

        it('warn title should have text', function() {
          expect(warnModal.getWarnModalTitle().getText()).toBe("Delete vehicle");
        });

        it('warn confirmation should have text', function() {
          expect(warnModal.getWarnModalConfirmation().getText()).toBe("Your are about to delete a vehicle.");
        });

        it('warn message should have text', function() {
          expect(warnModal.getWarnModalMessage().getText()).toBe("Are you sure you want to continue ?");
        });
      });
      describe('when confirm button clicked', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(warnModal.getWarnModalConfirmBtn()));
          warnModal.clickWarnModalConfirmBtn();
          warnModal.getWarnModalConfirmBtn().isPresent().then(function(isPresent) {
            if (isPresent) {
              warnModal.clickWarnModalConfirmBtn();
            }
          });
          browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getLoadingMask()));
          browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getGridRow(1)));
        });

        it('vehicle should not be found on list', function() {
          expect(settingsVehiclesPage.getGridRow(1).isPresent()).toBe(false);
        });
      });
    });

    describe('when vehicle from file imported', function() {
      beforeAll(function() {
        settingsVehiclesPage.importFile();
        browser.wait(testUtils.until.presenceOf(infoModal.getInfoModal()));
      });

      it('should have info modal', function() {
        expect(infoModal.getInfoModal().isPresent()).toBe(true);
      });

      it('should have info text', function() {
        expect(infoModal.getInfoModal().element(by.css('.modal-content span')).isPresent()).toBe(true);
      });

      it('info text should be import success', function() {
        expect(infoModal.getInfoModal().element(by.css('.modal-content span')).getText()).toBe('Import success');
      });

      describe('on table content ', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(infoModal.getInfoModalConfirmBtn()));
          infoModal.clickInfoModalConfirmBtn();
          browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getSearchNameClearBtn()));
          settingsVehiclesPage.clickSearchNameClearBtn();
          settingsVehiclesPage.fillSearchNameInput('vehicle 123456789');
          browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getLoadingMask()));
          browser.wait(testUtils.until.presenceOf(settingsVehiclesPage.getVehicleNameOfFirstRowWithString('vehicle 123456789')));
        });

        it('vehicle should be found on list', function() {
          expect(settingsVehiclesPage.getGridRow(1).element(by.css('td:nth-child(1) span')).getText()).toEqual('vehicle 123456789');
        });
      });
    });

    describe('when pagination label clicked', function() {
      beforeAll(function() {
        settingsVehiclesPage.clickSearchNameClearBtn();
        browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(element(by.css('.k-grid-content tbody[role="rowgroup"] tr'))));
        settingsVehiclesPage.clickPaginationLabel();
        browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getPagerNumber()));
      });

      afterAll(function() {
        settingsVehiclesPage.clickPaginationLabel();
        browser.wait(testUtils.until.visibilityOf(settingsVehiclesPage.getPagerNumber()));
      });

      it('the pager should not be active', function() {
        expect(settingsVehiclesPage.getPagerNumber().isPresent()).toBe(false);
      });

      it('number vehicles on list is equal to total vehicles', function() {
        settingsVehiclesPage.getVehicleIcon().getText().then(function(totalOfvehicles) {
          expect(settingsVehiclesPage.getVehicleList().count()).toEqual(parseInt(totalOfvehicles));
        });
      });
    });

    describe('when vehicle file exported', function() {
      beforeAll(function() {
        pathFolder = process.cwd() + "/resources/test/export_file";
        fileName = pathFolder + "/*.xlsx";
        try {
          files = fs.readdirSync(pathFolder);
          for (var i = 0; i < files.length; i++) {
            if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
              fs.unlinkSync(pathFolder + "/" + files[i]);
            }
          }
          browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getExportButton()));
          browser.executeScript("arguments[0].click();", settingsVehiclesPage.getExportButton());
          browser.sleep(1000);
          warnModal.getWarnModal().isPresent().then(function(isPresent) {
            if (isPresent) {
              warnModal.clickWarnModalConfirmBtn();
              console.log("clickWarnModalConfirmBtn");
            }
          });
          browser.driver.wait(function() {
            filesArray = glob.sync(pathFolder + "/*.xlsx");
            if ((typeof filesArray != 'undefined') && (filesArray.length > 0)) {
              return filesArray;
            }
          }).then(function(arr) {
            fileName = arr[0];
          });
          browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getLoadderOverlayImport()));
        } catch (e) {
          console.log(e);
          return;
        }
      });

      it("file should be in download directory ", function() {
        expect(fs.existsSync(fileName)).toBe(true);
      });
    });

    describe('when vehicle from import file updated', function() {
      beforeAll(function() {
        settingsVehiclesPage.importFileUpdate();
        browser.wait(testUtils.until.presenceOf(infoModal.getInfoModal()));
      });
      it('should have info modal', function() {
        expect(infoModal.getInfoModal().isPresent()).toBe(true);
      });

      it('should have info text', function() {
        expect(infoModal.getInfoModal().element(by.css('.modal-content span')).isPresent()).toBe(true);
      });

      it('info text should be import success', function() {
        expect(infoModal.getInfoModal().element(by.css('.modal-content span')).getText()).toBe('Import success');
      });

      describe('on table content ', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(infoModal.getInfoModalConfirmBtn()));
          infoModal.clickInfoModalConfirmBtn();
          browser.wait(testUtils.until.visibilityOf(settingsVehiclesPage.getSearchNameInput()));
          settingsVehiclesPage.clickSearchNameClearBtn();
          settingsVehiclesPage.fillSearchNameInput('vehicle 987654321');
          browser.wait(testUtils.until.presenceOf(settingsVehiclesPage.getVehicleNameOfFirstRowWithString('vehicle 987654321')));
        });

        it('updated vehicle should be found on list', function() {
          expect(settingsVehiclesPage.getGridRow(1).element(by.css('td:nth-child(1) span')).getText()).toEqual('vehicle 987654321');
        });
      });
    });

    describe('when vehicle from import file deleted', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getDeleteButton(1)));
        settingsVehiclesPage.clickDeleteButtonOfGridRow(1);
        browser.wait(testUtils.until.presenceOf(warnModal.getWarnModal()));
        browser.wait(testUtils.until.elementToBeClickable(warnModal.getWarnModalConfirmBtn()));
        warnModal.clickWarnModalConfirmBtn();
        browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getLoadingMask()));
        browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getGridRow(1)));
      });

      it('vehicle should not be found on list', function() {
        expect(settingsVehiclesPage.getGridRow(1).isPresent()).toBe(false);
      });
    });
  });
})();
