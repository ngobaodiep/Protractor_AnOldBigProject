(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    fs = require('fs'),
    glob = require("glob"),
    timebookingPersonConfirmationModalPage = require("./TimebookingPersonConfirmationModalPage"),
    settingsPersonPage = require("./SettingsPersonsPage"),
    mainSettingsPage = require('./MainSettingsPage'),
    workerConnectLicensesReportPage = require('./WorkerConnectLicensesReportPage'),
    settingsPaymentPage = require('./SettingsPaymentPage');

  describe('on payment tab ', function() {
    var fileName;
    var pathFolder;
    var filesArray = [];
    var files = [];
    var random_number = new Date().getTime();
    beforeAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(mainSettingsPage.getSettingsPaymentButton()));
      mainSettingsPage.clickSettingsPaymentButton();
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getPaymentList()));
      browser.wait(testUtils.until.stalenessOf(settingsPaymentPage.getLoadingMask()));
      browser.wait(testUtils.until.presenceOf(settingsPaymentPage.getPaymentInfo()));
      browser.wait(testUtils.until.presenceOf(settingsPaymentPage.getPaymentCardNumber()));
    });
    describe('check payment list element', function() {
      it('should have payment list', function() {
        expect(settingsPaymentPage.getPaymentList().isPresent()).toBe(true);
      });
      it('should have payment header', function() {
        expect(settingsPaymentPage.getPaymentInfoHeader().isPresent()).toBe(true);
      });
      it('should have payment info', function() {
        expect(settingsPaymentPage.getPaymentInfo().isPresent()).toBe(true);
      });
      it('should have payment card number', function() {
        expect(settingsPaymentPage.getPaymentCardNumber().isPresent()).toBe(true);
      });
      it('should have payment icon', function() {
        expect(settingsPaymentPage.getPaymentBrand().isPresent()).toBe(true);
      });
      it('should have payment expiry', function() {
        expect(settingsPaymentPage.getPaymentExpirationDate().isPresent()).toBe(true);
      });
      it('should have payment user name', function() {
        expect(settingsPaymentPage.getPaymentName().isPresent()).toBe(true);
      });
      it('should have payment edit button', function() {
        expect(settingsPaymentPage.getPaymentEditButton().isPresent()).toBe(true);
      });
      it('should have payment delete button', function() {
        expect(settingsPaymentPage.getPaymentDeleteButton().isPresent()).toBe(true);
      });
      it('should have your invoice title', function() {
        expect(settingsPaymentPage.getInvoiceHeader().isPresent()).toBe(true);
      });
    });
    describe('when new user created', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(mainSettingsPage.getSettingsPersonsButton()));
        mainSettingsPage.getSettingsPersonsButton().click();
        browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsPersonsView()));
        browser.wait(testUtils.until.presenceOf(settingsPersonPage.getCreatePersonButton()));
        browser.wait(testUtils.until.elementToBeClickable(settingsPersonPage.getCreatePersonButton()));
        settingsPersonPage.getCreatePersonButton().click();
        settingsPersonPage.createNewUser(random_number);
        browser.wait(testUtils.until.elementToBeClickable(settingsPersonPage.getSearchLoginInput()));
        settingsPersonPage.fillSearchLoginInput("user" + random_number);
        browser.wait(testUtils.until.stalenessOf(settingsPersonPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(settingsPersonPage.getPersonListRow(1)));
      });
      it('should have person content row', function() {
        expect(settingsPersonPage.getPersonListRow(1).isPresent()).toBe(true);
      });
      it('login should be user' + random_number, function() {
        expect(settingsPersonPage.getPersonListRow(1).element(by.css("td:nth-child(2) span")).getText()).toBe("user" + random_number);
      });
      it('fullname should be firstname lastname', function() {
        expect(settingsPersonPage.getPersonListRow(1).element(by.css("td:nth-child(3) span")).getText()).toBe("firstname lastname");
      });
      it('should have email test@bitnemo.vn', function() {
        expect(settingsPersonPage.getPersonListRow(1).element(by.css("td:nth-child(5) span")).getText()).toBe("test@bitnemo.vn");
      });
      describe('and on settings worker connect', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(mainSettingsPage.getSettingsTimeBookingsButton()));
          mainSettingsPage.getSettingsTimeBookingsButton().click();
          browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsTimeBookingsView()));
          browser.wait(testUtils.until.presenceOf(workerConnectLicensesReportPage.getLicenseReportButton()));
          browser.wait(testUtils.until.elementToBeClickable(workerConnectLicensesReportPage.getLicenseReportButton()));
          workerConnectLicensesReportPage.getLicenseReportButton().click();
          browser.wait(testUtils.until.presenceOf(workerConnectLicensesReportPage.getSearchLoginInput()));
          browser.wait(testUtils.until.elementToBeClickable(workerConnectLicensesReportPage.getSearchLoginInput()));
          workerConnectLicensesReportPage.getSearchLoginInput().clear().sendKeys("user" + random_number);
          browser.wait(function() {
            return workerConnectLicensesReportPage.getLicenseUsersGridContent().all(by.css("tr")).count().then(function(count) {
              return count == 1;
            });
          });
          browser.wait(testUtils.until.stalenessOf(settingsPaymentPage.getLoadingMask()));
        });
        it('should have new user login', function() {
          expect(workerConnectLicensesReportPage.getContentGridRow(1).element(by.css("td:nth-child(1) span")).isPresent()).toBe(true);
        });
        it('new user login should be user' + random_number, function() {
          expect(workerConnectLicensesReportPage.getContentGridRow(1).element(by.css("td:nth-child(1) span")).getText()).toBe("user" + random_number);
        });
        it('fullname should be firstname lastname', function() {
          expect(workerConnectLicensesReportPage.getContentGridRow(1).element(by.css("td:nth-child(2) span")).getText()).toBe("firstname lastname");
        });
        it('should have button active status', function() {
          expect(workerConnectLicensesReportPage.getContentGridRow(1).element(by.className("button-license")).getText()).toBe("ACTIVATE");
        });
        describe('when user actived', function() {
          beforeAll(function(){
            browser.wait(testUtils.until.elementToBeClickable(workerConnectLicensesReportPage.getContentGridRow(1).element(by.className("button-license"))));
            workerConnectLicensesReportPage.getContentGridRow(1).element(by.className("button-license")).click();
            browser.wait(testUtils.until.presenceOf(timebookingPersonConfirmationModalPage.getTimebookingPersonConfirmationModal()));
          });
          it('should have timebooking person confirmamtion modal', function () {
            expect(timebookingPersonConfirmationModalPage.getTimebookingPersonConfirmationModal().isPresent()).toBe(true);
          });
          it('should have timebooking person confirm text', function () {
            expect(timebookingPersonConfirmationModalPage.getTimebookingPersonConfirmationModal().isPresent()).toBe(true);
          });
          it('should have cancel button', function () {
            expect(timebookingPersonConfirmationModalPage.getCancelButton().isPresent()).toBe(true);
          });
          it('should have confirm button', function () {
            expect(timebookingPersonConfirmationModalPage.getConfirmButton().isPresent()).toBe(true);
          });
          it('notice should have Thank you', function () {
            expect(timebookingPersonConfirmationModalPage.getContentNotice().getText()).toContain("Thank you");
          });
          describe('by clicking ACTIVATE button', function() {
            beforeAll(function(){
              browser.wait(testUtils.until.elementToBeClickable(timebookingPersonConfirmationModalPage.getConfirmButton()));
              timebookingPersonConfirmationModalPage.getConfirmButton().click();
              browser.wait(testUtils.until.stalenessOf(timebookingPersonConfirmationModalPage.getTimebookingPersonConfirmationModal()));
              browser.wait(testUtils.until.stalenessOf(workerConnectLicensesReportPage.getLoadingMask()));
              browser.wait(function(){
                return workerConnectLicensesReportPage.getContentGridRow(1).element(by.className("button-license")).getText().then(function(text){
                  return text.includes("REVOKE") == true;
                });
              });
              browser.wait(testUtils.until.stalenessOf(settingsPaymentPage.getLoadingMask()));
            });
          it('actived status button should have text REVOKE', function () {
            expect(workerConnectLicensesReportPage.getContentGridRow(1).element(by.className("button-license")).getText()).toBe("REVOKE");
          });
          });
        });
      });
      describe('and on payment list', function() {
        beforeAll(function(){
          browser.wait(testUtils.until.elementToBeClickable(mainSettingsPage.getSettingsPaymentButton()));
          mainSettingsPage.getSettingsPaymentButton().click();
          browser.wait(testUtils.until.presenceOf(settingsPaymentPage.getPaymentList()));
          browser.wait(testUtils.until.presenceOf(settingsPaymentPage.getPaymentCardInfo()));
          // browser.wait(testUtils.until.elementToBeClickable(settingsPaymentPage.getStatusSearchClearBtn()));
          // settingsPaymentPage.getStatusSearchClearBtn().click();
          browser.wait(testUtils.until.elementToBeClickable(settingsPaymentPage.getStatusSearchFilter()));
          settingsPaymentPage.clickStatusSearchFilter();
          settingsPaymentPage.fillStatusSearch('DRAFT');
          browser.wait(function() {
            return settingsPaymentPage.getPaymentGridRow(1).element(by.css('td:nth-child(1) span')).getText().then(function(txt) {
              return txt == 'DRAFT';
            });
          });
          browser.wait(testUtils.until.stalenessOf(settingsPaymentPage.getLoadingMask()));
        });
        it('should have getting pdf button', function() {
          expect(settingsPaymentPage.getPaymentGridRow(1).element(by.css('td:nth-child(7) a.fi-file-pdf.downloadPdf')).isPresent()).toBe(true);
        });
        describe('when payment getting pdf button clicked ', function() {
          beforeAll(function() {
            pathFolder = process.cwd() + "/resources/test/export_file";
            fileName = pathFolder + "/*.pdf";
            try {
              files = fs.readdirSync(pathFolder);
              for (var i = 0; i < files.length; i++) {
                if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
                  fs.unlinkSync(pathFolder + "/" + files[i]);
                }
              }
              browser.wait(testUtils.until.elementToBeClickable(settingsPaymentPage.getPaymentGridRow(1).element(by.css('td:nth-child(7) a.fi-file-pdf.downloadPdf'))));
              browser.executeScript("arguments[0].click();", settingsPaymentPage.getPaymentGridRow(1).element(by.css('td:nth-child(7) a.fi-file-pdf.downloadPdf')));
              browser.driver.wait(function() {
                filesArray = glob.sync(pathFolder + "/*.pdf");
                if ((typeof filesArray != 'undefined') && (filesArray.length > 0)) {
                  return filesArray;
                }
              }).then(function(arr) {
                fileName = arr[0];
              });
            } catch (e) {
              return;
            }
          });
          it("file should be in download directory ", function() {
            expect(fs.existsSync(fileName)).toBe(true);
          });
        });
      });
    });
  });
})();
