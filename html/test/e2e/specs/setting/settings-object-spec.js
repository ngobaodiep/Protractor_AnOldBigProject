(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainSettingsPage = require('./MainSettingsPage'),
    warnModal = require("./WarnModal"),
    infoModal = require("./InfoModal"),
    fs = require('fs'),
    glob = require("glob"),
    settingsObjectsPage = require('./SettingsObjectsPage');

  describe('on settings object', function() {
    var random_number,
     fileName,
     pathFolder,
     filesArray = [],
     files = [];
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsMobileassetsButton()));
      mainSettingsPage.clickSettingsMobileassetsButton();
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsMobileassetsView()));
    });

    describe('check objects list elements', function() {
      it('should have a create new object button', function() {
        expect(settingsObjectsPage.getCreateObjectBtn().isPresent()).toBe(true);
        expect(settingsObjectsPage.getCreateObjectBtn().isDisplayed()).toBe(true);
      });

      it('should have a pagination label', function() {
        expect(settingsObjectsPage.getPaginationLabel().isPresent()).toBe(true);
        expect(settingsObjectsPage.getPaginationLabel().isDisplayed()).toBe(true);
      });
    });

    describe('when object created', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        settingsObjectsPage.clickCreateObjectBtn();
        settingsObjectsPage.createObject(random_number);
        browser.wait(testUtils.until.visibilityOf(settingsObjectsPage.getSearchNameInput()));
        settingsObjectsPage.fillSearchNameInput('object ' + random_number);
        browser.wait(testUtils.until.stalenessOf(settingsObjectsPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(settingsObjectsPage.getGridRow(1)));
      });

      it('object should be found on list', function() {
        expect(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(2) span')).getText()).toEqual('object ' + random_number);
      });

      it('should have edit button', function() {
        expect(settingsObjectsPage.getGridRow(1).element(by.css('a.fi-pencil')).isPresent()).toBe(true);
      });

      it('should have delete button', function() {
        expect(settingsObjectsPage.getGridRow(1).element(by.css('a.fi-trash')).isPresent()).toBe(true);
      });
    });

    describe('when object edited', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsObjectsPage.getGridRow(1).element(by.css('a.fi-pencil'))));
        settingsObjectsPage.getGridRow(1).element(by.css('a.fi-pencil')).click();
        settingsObjectsPage.editObject(random_number);
        settingsObjectsPage.clickSearchNameClearBtn();
        browser.wait(testUtils.until.visibilityOf(settingsObjectsPage.getSearchNameInput()));
        settingsObjectsPage.fillSearchNameInput('edited object ' + random_number);
        browser.wait(testUtils.until.stalenessOf(settingsObjectsPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(settingsObjectsPage.getGridRow(1)));
      });

      it('new object should be found on list', function() {
        expect(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(2) span')).getText()).toEqual('edited object ' + random_number);
      });
    });

    describe('when object deleted', function() {
      beforeAll(function() {
        browser.executeScript("arguments[0].click();", settingsObjectsPage.getGridRow(1).element(by.css('a.fi-trash')).getWebElement());
        browser.wait(testUtils.until.presenceOf(settingsObjectsPage.getWarnModal()));
      });
      describe('on warn modal', function() {
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

        it('warn modal title should constain "Delete object"', function () {
          expect(warnModal.getWarnModalTitle().getText()).toBe("Delete object");
        });

        it('warn modal confirmation should be "You are about to delete an object"', function () {
          expect(warnModal.getWarnModalConfirmation().getText()).toBe("You are about to delete an object");
        });

        it('warn modal message should be "Are you sure you want to continue ?"', function () {
          expect(warnModal.getWarnModalMessage().getText()).toBe("Are you sure you want to continue ?");
        });

        describe('and then confirm button clicked', function() {
          beforeAll(function(){
            settingsObjectsPage.clickWarnModalDeleteBtn();
            browser.wait(testUtils.until.stalenessOf(settingsObjectsPage.getWarnModal()));
            browser.wait(testUtils.until.stalenessOf(settingsObjectsPage.getGridRow(1)));
          });

          it('object should not be found on list', function() {
            expect(settingsObjectsPage.getGridRow(1).isPresent()).toBe(false);
          });
        });
      });
    });

    describe("when import object from excel",function(){
      beforeAll(function(){
        settingsObjectsPage.importFile();
        browser.wait(testUtils.until.presenceOf(infoModal.getInfoModal()));
      });

      it('should have info modal', function () {
        expect(infoModal.getInfoModal().isPresent()).toBe(true);
      });

      it('should have info title', function () {
        expect(infoModal.getInfoModalTitle().isPresent()).toBe(true);
      });

      it('should have info text', function () {
        expect(infoModal.getInfoModalText().isPresent()).toBe(true);
      });

      it('title should be "Import success"', function () {
        expect(infoModal.getInfoModalTitle().getText()).toBe("Import success");
      });

      it('info message should be "Import success"', function () {
        expect(infoModal.getInfoModalText().getText()).toBe("Import success");
      });

      it('should have confirm button', function () {
        expect(infoModal.getInfoModalConfirmBtn().isPresent()).toBe(true);
      });

      describe('and confirm button clicked', function() {
        beforeAll(function(){
          browser.wait(testUtils.until.elementToBeClickable(infoModal.getInfoModalConfirmBtn()));
          infoModal.clickInfoModalConfirmBtn();
          browser.wait(testUtils.until.stalenessOf(infoModal.getInfoModal()));
          browser.wait(testUtils.until.elementToBeClickable(settingsObjectsPage.getSearchNameClearBtn()));
          settingsObjectsPage.clickSearchNameClearBtn();
          browser.wait(testUtils.until.stalenessOf(settingsObjectsPage.getLoadingMask()));
          browser.wait(testUtils.until.presenceOf(element(by.css('.mobileassets-list .k-grid-content tr'))));
        });
        it("shouldn't have info modal", function () {
          expect(infoModal.getInfoModal().isPresent()).toBe(false);
        });
        describe('then imported object filled', function() {
          beforeAll(function(){
            browser.wait(testUtils.until.elementToBeClickable(settingsObjectsPage.getSearchNameInput()));
            settingsObjectsPage.fillSearchReferenceInput("123456789");
            browser.wait(function(){
              return settingsObjectsPage.getObjectGridRow().count().then(function(count){
                return count == 1;
              });
            });
            browser.wait(testUtils.until.presenceOf(settingsObjectsPage.getGridRow(1).element(by.css("td:nth-child(1) span"))));
          });

          it('should have one row on grid table', function () {
            expect(settingsObjectsPage.getObjectGridRow().count()).toBe(1);
          });

          it('name should be "Object-123456789"', function () {
            expect(settingsObjectsPage.getGridRow(1).element(by.css("td:nth-child(2) span")).getText()).toBe("Object-123456789");
          });

          it('reference should be "123456789"', function () {
            expect(settingsObjectsPage.getGridRow(1).element(by.css("td:nth-child(1) span")).getText()).toBe("123456789");
          });
        });
      });
    });

    describe('when object list exported', function () {
      beforeAll(function(){
        browser.wait(testUtils.until.elementToBeClickable(settingsObjectsPage.getSearchReferenceClearBtn()));
        settingsObjectsPage.clickSearchReferenceClearBtn();
        browser.wait(testUtils.until.invisibilityOf(settingsObjectsPage.getSearchReferenceClearBtn()));
        pathFolder = process.cwd() + "/resources/test/export_file";
        fileName = pathFolder + "/*.xlsx";
        try {
          files = fs.readdirSync(pathFolder);
          for (var i = 0; i < files.length; i++) {
            if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
              fs.unlinkSync(pathFolder + "/" + files[i]);
            }
          }
          browser.wait(testUtils.until.elementToBeClickable(settingsObjectsPage.getExportBtn()));
          browser.executeScript("arguments[0].click();", settingsObjectsPage.getExportBtn());
          browser.driver.wait(function(){
            return warnModal.getWarnModal().isPresent();
          },1000)
          .then(function(){
            browser.wait(testUtils.until.elementToBeClickable(warnModal.getWarnModalConfirmBtn()));
            warnModal.clickWarnModalConfirmBtn();
          },function(){
          });
          browser.driver.wait(function() {
            filesArray = glob.sync(pathFolder + "/*.xlsx");
            if ((typeof filesArray != 'undefined') && (filesArray.length > 0)) {
              return filesArray;
            }
          }).then(function(arr) {
            fileName = arr[0];
          });
          browser.wait(testUtils.until.stalenessOf(settingsObjectsPage.getLoadderOverlayImport()));
        } catch (e) {
          console.log(e);
          return;
        }
      });

      it("file should be in download directory ", function() {
        expect(fs.existsSync(fileName)).toBe(true);
      });
    });

    describe('when pagination label clicked', function() {
      var totalOfObjects;
      beforeAll(function() {
        settingsObjectsPage.clickSearchReferenceClearBtn();
        browser.wait(testUtils.until.stalenessOf(settingsObjectsPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(element(by.css('.mobileassets-list .k-grid-content tr'))));
        settingsObjectsPage.clickPaginationLabel();
        browser.wait(testUtils.until.stalenessOf(settingsObjectsPage.getPagerNumber()));
      });

      it('the pager number should not be active', function() {
        expect(settingsObjectsPage.getPagerNumber().isPresent()).toBe(false);
      });

      it('number objects on list is equal to total objects', function() {
        settingsObjectsPage.getObjectIcon().getText().then(function(totalOfObjects) {
          expect(settingsObjectsPage.getObjectGridRow().count()).toEqual(parseInt(totalOfObjects));
        });
      });
    });

    describe('when imported object deleted', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsObjectsPage.getSearchReferenceInput()));
        settingsObjectsPage.fillSearchReferenceInput("123456789");
        browser.wait(function(){
          return settingsObjectsPage.getObjectGridRow().count().then(function(count){
            return count == 1;
          });
        });
        browser.wait(testUtils.until.presenceOf(settingsObjectsPage.getGridRow(1).element(by.css('a.fi-trash'))));
        browser.wait(testUtils.until.elementToBeClickable(settingsObjectsPage.getGridRow(1).element(by.css('a.fi-trash'))));
        browser.executeScript("arguments[0].click();", settingsObjectsPage.getGridRow(1).element(by.css('a.fi-trash')).getWebElement());
        browser.wait(testUtils.until.presenceOf(settingsObjectsPage.getWarnModal()));
      });
      describe('on warn modal', function() {
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

        it('warn modal title should constain "Delete object"', function () {
          expect(warnModal.getWarnModalTitle().getText()).toBe("Delete object");
        });

        it('warn modal confirmation should be "You are about to delete an object"', function () {
          expect(warnModal.getWarnModalConfirmation().getText()).toBe("You are about to delete an object");
        });

        it('warn modal message should be "Are you sure you want to continue ?"', function () {
          expect(warnModal.getWarnModalMessage().getText()).toBe("Are you sure you want to continue ?");
        });

        describe('and then confirm button clicked', function() {
          beforeAll(function(){
            settingsObjectsPage.clickWarnModalDeleteBtn();
            browser.wait(testUtils.until.stalenessOf(settingsObjectsPage.getWarnModal()));
            browser.wait(testUtils.until.stalenessOf(settingsObjectsPage.getGridRow(1)));
          });

          it('object should not be found on list', function() {
            expect(settingsObjectsPage.getGridRow(1).isPresent()).toBe(false);
          });
        });
      });
    });
  });
})();
