(function() {

  'use strict';

  var testUtils = require('../../TestUtils'),    
    errorModal = require("../../ErrorModal.js"),
    warnModal = require("../../WarnModal"),
    infoModal = require('../../InfoModal'),
    fs = require('fs'),
    glob = require("glob"),
    timeBookingsCustomersPage = require('../../TimeBookingsCustomersPage');

  describe('on settings time booking', function() {
    var random_number;
    var fileName;
    var pathFolder;
    var files = [];
    var filesArray = [];

    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(timeBookingsCustomersPage.getCustomersTimeBookingsButton()));
      timeBookingsCustomersPage.clickCustomersTimeBookingsButton();
      browser.wait(testUtils.until.presenceOf(timeBookingsCustomersPage.getCreateCustomerButton()));
    });

    describe('check list of customer elements', function() {

      it('should have a create new customer button', function() {
        expect(timeBookingsCustomersPage.getCreateCustomerButton().isPresent()).toBe(true);
        expect(timeBookingsCustomersPage.getCreateCustomerButton().isDisplayed()).toBe(true);
      });

      it('should have toogle options button', function() {
        expect(timeBookingsCustomersPage.getToogleOptionsButton().isPresent()).toBe(true);
        expect(timeBookingsCustomersPage.getToogleOptionsButton().isDisplayed()).toBe(true);
      });

      it('should have table name title', function() {
        expect(timeBookingsCustomersPage.getTableNameTitle().isPresent()).toBe(true);
        expect(timeBookingsCustomersPage.getTableNameTitle().isDisplayed()).toBe(true);
      });

      it('should have table reference title', function() {
        expect(timeBookingsCustomersPage.getTableReferenceTitle().isPresent()).toBe(true);
        expect(timeBookingsCustomersPage.getTableReferenceTitle().isDisplayed()).toBe(true);
      });

      it('should have table description title', function() {
        expect(timeBookingsCustomersPage.getTableDescriptionTitle().isPresent()).toBe(true);
        expect(timeBookingsCustomersPage.getTableDescriptionTitle().isDisplayed()).toBe(true);
      });

      it('should have table binding address title', function() {
        expect(timeBookingsCustomersPage.getTableBillingAddressTitle().isPresent()).toBe(true);
        expect(timeBookingsCustomersPage.getTableBillingAddressTitle().isDisplayed()).toBe(true);
      });

      it('should have table search name input', function() {
        expect(timeBookingsCustomersPage.getTableSearchNameInput().isPresent()).toBe(true);
        expect(timeBookingsCustomersPage.getTableSearchNameInput().isDisplayed()).toBe(true);
      });

      it('should have table search reference input', function() {
        expect(timeBookingsCustomersPage.getTableSearchReferenceInput().isPresent()).toBe(true);
        expect(timeBookingsCustomersPage.getTableSearchReferenceInput().isDisplayed()).toBe(true);
      });

      it('should have table search description input', function() {
        expect(timeBookingsCustomersPage.getTableSearchDescriptionInput().isPresent()).toBe(true);
        expect(timeBookingsCustomersPage.getTableSearchDescriptionInput().isDisplayed()).toBe(true);
      });

      it('should have table search binding address input', function() {
        expect(timeBookingsCustomersPage.getTableSearchBillingAddressInput().isPresent()).toBe(true);
        expect(timeBookingsCustomersPage.getTableSearchBillingAddressInput().isDisplayed()).toBe(true);
      });

      describe('and when toogle options button clicked', function() {

        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getToogleOptionsButton()));
          timeBookingsCustomersPage.getToogleOptionsButton().click();
          browser.wait(testUtils.until.presenceOf(timeBookingsCustomersPage.getExportButton()));
        });

        afterAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getToogleOptionsButton()));
          timeBookingsCustomersPage.getToogleOptionsButton().click();
          browser.wait(testUtils.until.stalenessOf(timeBookingsCustomersPage.getExportButton()));
        });

        it('should have download excel template', function() {
          expect(timeBookingsCustomersPage.getDownloadExcelTemplate().isPresent()).toBe(true);
        });

        it('should have import button', function() {
          expect(timeBookingsCustomersPage.getImportButton().isPresent()).toBe(true);
        });

        it('should have export button', function() {
          expect(timeBookingsCustomersPage.getExportButton().isPresent()).toBe(true);
        });
      });
    });

    describe('check form of customer creation', function() {

      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getCreateCustomerButton()));
        timeBookingsCustomersPage.clickCreateCustomerButton();
        browser.wait(testUtils.until.presenceOf(timeBookingsCustomersPage.getCreateModal()));
      });

      it('should have reference title', function() {
        expect(timeBookingsCustomersPage.getCreateModalReferenceTitle().isPresent()).toBe(true);
      });

      it('should have reference input', function() {
        expect(timeBookingsCustomersPage.getCreateModalReferenceInput().isPresent()).toBe(true);
      });

      it('reference field should be required', function() {
        expect(timeBookingsCustomersPage.getCreateModalReferenceRequired().getText()).toEqual('This field is required');
      });

      it('name should be required', function() {
        expect(timeBookingsCustomersPage.getCreateModalNameRequired().getText()).toEqual('This field is required');
      });

      it('should have name title', function() {
        expect(timeBookingsCustomersPage.getCreateModalNameInput().isPresent()).toBe(true);

      });

      it('should have name title', function() {
        expect(timeBookingsCustomersPage.getCreateModalNameTitle().isPresent()).toBe(true);

      });

      it('should have description title', function() {
        expect(timeBookingsCustomersPage.getCreateModalDescriptionTitle().isPresent()).toBe(true);

      });

      it('should have description input', function() {
        expect(timeBookingsCustomersPage.getCreateModalDescriptionInput().isPresent()).toBe(true);

      });

      it('should have billing address title', function() {
        expect(timeBookingsCustomersPage.getCreateModalBillingAddressTitle().isPresent()).toBe(true);

      });

      it('should have billing address input', function() {
        expect(timeBookingsCustomersPage.getCreateModalBillingAddressInput().isPresent()).toBe(true);

      });

      it('should have cancel button', function() {
        expect(timeBookingsCustomersPage.getCancelButton().isPresent()).toBe(true);

      });

      it('should have save button', function() {
        expect(timeBookingsCustomersPage.getSaveButton().isPresent()).toBe(true);

      });
    });

    describe('when a customer created', function() {

      beforeAll(function() {
        random_number = new Date().getTime();
        timeBookingsCustomersPage.createNewCustomer(random_number);
        browser.wait(testUtils.until.visibilityOf(timeBookingsCustomersPage.getTableSearchNameInput()));
        timeBookingsCustomersPage.fillSearchNameInput('customer' + random_number);

        browser.wait(testUtils.until.stalenessOf(timeBookingsCustomersPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(timeBookingsCustomersPage.getGridRow(1)));
      });

      it('customer should be found on list', function() {
        expect(timeBookingsCustomersPage.getCustomerListRow(1).element(by.css('td:nth-child(1) span')).getText()).toEqual('customer' + random_number);
      });

      it('should have edit button', function() {
        expect(timeBookingsCustomersPage.getCustomerListRow(1).element(by.css('td:nth-child(5) a.fi-pencil')).isPresent()).toBe(true);
      });

      it('should have delete button', function() {
        expect(timeBookingsCustomersPage.getCustomerListRow(1).element(by.css('td:nth-child(5) a.fi-trash')).isPresent()).toBe(true);
      });
    });

    describe('when input same name customer', function() {

      beforeAll(function() {
        timeBookingsCustomersPage.clickCreateCustomerButton();
        browser.wait(testUtils.until.presenceOf(timeBookingsCustomersPage.getCreateModal()));
        timeBookingsCustomersPage.fillNameInput('customer' + random_number);
        timeBookingsCustomersPage.fillReferenceInput('reference' + random_number);
        browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getSaveButton()));

        timeBookingsCustomersPage.clickSaveButton();
        browser.wait(testUtils.until.presenceOf(errorModal.getErrorModal()));
      });

      it('should have error modal', function() {
        expect(errorModal.getErrorModal().isPresent()).toBe(true);
      });

      it('should have error modal title', function() {
        expect(errorModal.getErrorModalTitle().isPresent()).toBe(true);
        expect(errorModal.getErrorModalTitle().getCssValue("background-color")).toBe("rgb(202, 27, 27)");
      });

      it('should have error modal message', function() {
        expect(errorModal.getErrorModalMessage().isPresent()).toBe(true);
        expect(errorModal.getErrorModalMessage().getText()).toBe("The customer name already exists.");
      });

      it('should have error modal confirm button', function() {
        expect(errorModal.getErrorModalConfirmButton().isPresent()).toBe(true);
      });

      it('should have error modal cross button', function() {
        expect(errorModal.getErrorModalCrossButton().isPresent()).toBe(true);
      });
    });

    describe('when customer edited', function() {

      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(errorModal.getErrorModalConfirmButton()));
        errorModal.getErrorModalConfirmButton().click();
        browser.wait(testUtils.until.stalenessOf(errorModal.getErrorModal()));
        timeBookingsCustomersPage.clickCancelButton();
        browser.wait(testUtils.until.stalenessOf(timeBookingsCustomersPage.getLoadingMask()));

        browser.wait(testUtils.until.presenceOf(timeBookingsCustomersPage.getGridRow(1)));
        browser.executeScript("arguments[0].click();", timeBookingsCustomersPage.getCustomerListRow(1).element(by.css('td:nth-child(5) a.fi-pencil')).getWebElement());
        timeBookingsCustomersPage.editCustomer(random_number);
        browser.wait(testUtils.until.stalenessOf(timeBookingsCustomersPage.getCreateModal()));
        browser.wait(testUtils.until.visibilityOf(timeBookingsCustomersPage.getTableSearchNameInput()));

        timeBookingsCustomersPage.fillSearchNameInput('editedCustomer' + random_number);
        browser.wait(testUtils.until.stalenessOf(timeBookingsCustomersPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(timeBookingsCustomersPage.getGridRow(1)));
      });

      it('new customer should be found on list', function() {
        expect(timeBookingsCustomersPage.getCustomerListRow(1).element(by.css('td:nth-of-type(1) span')).getText()).toEqual('editedCustomer' + random_number);
      });
    });

    describe('when customer deleted', function() {

      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getCustomerListRow(1).element(by.css('td:nth-child(5) a.fi-trash'))));
        browser.executeScript("arguments[0].click();", timeBookingsCustomersPage.getCustomerListRow(1).element(by.css('td:nth-child(5) a.fi-trash')).getWebElement());
        browser.wait(testUtils.until.presenceOf(warnModal.getWarnModal()));
      });

      it('should have warn modal', function() {
        expect(warnModal.getWarnModal().isPresent()).toBe(true);
      });

      it('should have warn modal title', function() {
        expect(warnModal.getWarnModalTitle().isPresent()).toBe(true);
        expect(warnModal.getWarnModalTitle().getCssValue("background-color")).toBe("rgba(0, 0, 0, 0)");
      });

      it('should have warn modal message', function() {
        expect(warnModal.getWarnModalMessage().isPresent()).toBe(true);
        expect(warnModal.getWarnModalMessage().getText()).toBe("Are you sure you want to continue ?");

      });

      it('should have warn modal confirmation', function() {
        expect(warnModal.getWarnModalConfirmation().isPresent()).toBe(true);
        expect(warnModal.getWarnModalConfirmation().getText()).toBe("Your are about to delete a customer.");

      });

      it('should have warn modal confirm button', function() {
        expect(warnModal.getWarnModalConfirmBtn().isPresent()).toBe(true);

      });

      it('should have warn modal cross button', function() {
        expect(warnModal.getWarnModalCrossBtn().isPresent()).toBe(true);

      });

      describe('and warn confirm button clicked', function() {

        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(warnModal.getWarnModalConfirmBtn()));
          warnModal.getWarnModalConfirmBtn().click();
          browser.wait(testUtils.until.stalenessOf(warnModal.getWarnModal()));
          browser.wait(testUtils.until.stalenessOf(timeBookingsCustomersPage.getGridRow(1)));
        });

        afterAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getSearchNameClearBtn()));
          timeBookingsCustomersPage.getSearchNameClearBtn().click();
          browser.wait(testUtils.until.invisibilityOf(timeBookingsCustomersPage.getSearchNameClearBtn()));
        });

        it('customer should not be found on list', function() {
          expect(timeBookingsCustomersPage.getGridRow(1).isPresent()).toBe(false);
        });
      });
    });

    describe('when download excel template button clicked', function() {
      beforeAll(function () {
        try {
          pathFolder = process.cwd() + "/resources/test/export_file";
          fileName = pathFolder + "/*.*";
          files = fs.readdirSync(pathFolder);
          for (var i = 0; i < files.length; i++) {
            if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
              fs.unlinkSync(pathFolder + "/" + files[i]);
            }
          }

          browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getToogleOptionsButton()));
          timeBookingsCustomersPage.getToogleOptionsButton().click();
          browser.wait(testUtils.until.presenceOf(timeBookingsCustomersPage.getDownloadExcelTemplate()));
          timeBookingsCustomersPage.getDownloadExcelTemplate().click();

          browser.driver.wait(function() {
            filesArray = glob.sync(pathFolder + "/*.xlsx");
            if (typeof filesArray != 'undefined' && filesArray.length > 0) {
              return filesArray;
            }
          }).then(function(arr) {
            fileName = arr[0];
            console.log(fileName);
          });
        } catch (e) {
          console.log("\nSwoc customer download template error : ",e,"\n");
          return;
        }
      });

      afterAll(function () {
        browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getToogleOptionsButton()));
        timeBookingsCustomersPage.getToogleOptionsButton().click();
        browser.wait(testUtils.until.stalenessOf(timeBookingsCustomersPage.getDownloadExcelTemplate()));
      });

      it('should have template file', function() {
        expect(fs.existsSync(fileName)).toBe(true);
        expect(fileName).toContain("template_import_customer.xlsx");
      });
    });

    describe('when customer imported', function() {

      beforeAll(function() {

        try {

          fileName = process.cwd() + "/resources/test/woc_customer/import_customer.xlsx";
          browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getToogleOptionsButton()));
          timeBookingsCustomersPage.getToogleOptionsButton().click();
          browser.wait(testUtils.until.presenceOf(timeBookingsCustomersPage.getImportButton()));
          browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getImportButton()));

          timeBookingsCustomersPage.getImportButton().element(by.css('input[name="files"]')).sendKeys(fileName);
          browser.wait(testUtils.until.stalenessOf(timeBookingsCustomersPage.getImportLoaderSpinner()));
          browser.wait(testUtils.until.presenceOf(infoModal.getInfoModal()));

        } catch (e) {
          return;
        }
      });

      it('should have info modal', function() {
        expect(infoModal.getInfoModal().isPresent()).toBe(true);
      });

      it('should have info modal title', function() {
        expect(infoModal.getInfoModalTitle().isPresent()).toBe(true);
      });

      it('should have info modal text', function() {
        expect(infoModal.getInfoModalText().isPresent()).toBe(true);
      });

      it('should have info modal confirm button', function() {
        expect(infoModal.getInfoModalConfirmBtn().isPresent()).toBe(true);
      });

      describe('and info modal confirm button clicked', function() {

        beforeAll(function() {

          try {
            browser.wait(testUtils.until.elementToBeClickable(infoModal.getInfoModalConfirmBtn()));
            infoModal.getInfoModalConfirmBtn().click();
            browser.wait(testUtils.until.stalenessOf(infoModal.getInfoModal()));

            browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getToogleOptionsButton()));
            timeBookingsCustomersPage.getToogleOptionsButton().click();
            browser.wait(testUtils.until.stalenessOf(timeBookingsCustomersPage.getImportButton()));

            browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getTableSearchReferenceInput()));
            timeBookingsCustomersPage.getTableSearchReferenceInput().click();
            timeBookingsCustomersPage.getTableSearchReferenceInput().sendKeys("Import123");

            browser.wait(function() {
              return timeBookingsCustomersPage.getGridContent().all(by.css("tr")).count().then(function(count) {
                return count == 1;
              });
            });

          } catch (e) {
            console.log(e);
            return;
          }
        });

        afterAll(function() {

          try {
            browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getCustomerListRow(1).element(by.css(".deleteCustomer"))));
            timeBookingsCustomersPage.getCustomerListRow(1).element(by.css(".deleteCustomer")).click();
            browser.wait(testUtils.until.presenceOf(warnModal.getWarnModal()));
            browser.wait(testUtils.until.elementToBeClickable(warnModal.getWarnModalConfirmBtn()));
            warnModal.getWarnModalConfirmBtn().click();

            browser.wait(testUtils.until.stalenessOf(warnModal.getWarnModal()));
            browser.wait(testUtils.until.stalenessOf(timeBookingsCustomersPage.getLoadingMask()));
            browser.wait(testUtils.until.stalenessOf(timeBookingsCustomersPage.getCustomerListRow(1)));
            browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getSearchReferenceClearBtn()));
            timeBookingsCustomersPage.getSearchReferenceClearBtn().click();

            browser.wait(testUtils.until.invisibilityOf(timeBookingsCustomersPage.getSearchReferenceClearBtn()));

          } catch (e) {} finally {}
        });

        it('should have data on table', function() {
          expect(timeBookingsCustomersPage.getCustomerListRow(1).isPresent()).toBe(true);
        });

        it('should have imported customer name', function() {
          expect(timeBookingsCustomersPage.getGridRow(1).isPresent()).toBe(true);
          expect(timeBookingsCustomersPage.getGridRow(1).getText()).toBe("importedCustomer");
        });

        it('should have imported customer reference', function() {
          expect(timeBookingsCustomersPage.getCustomerListRow(1).element(by.css('td:nth-child(2) span')).isPresent()).toBe(true);
          expect(timeBookingsCustomersPage.getCustomerListRow(1).element(by.css('td:nth-child(2) span')).getText()).toBe("Import123");
        });

        it('should have imported customer description', function() {
          expect(timeBookingsCustomersPage.getCustomerListRow(1).element(by.css('td:nth-child(3) span')).isPresent()).toBe(true);
          expect(timeBookingsCustomersPage.getCustomerListRow(1).element(by.css('td:nth-child(3) span')).getText()).toBe("imported");
        });

        it('should have imported customer billing address', function() {
          expect(timeBookingsCustomersPage.getCustomerListRow(1).element(by.css('td:nth-child(4) span')).isPresent()).toBe(true);
          expect(timeBookingsCustomersPage.getCustomerListRow(1).element(by.css('td:nth-child(4) span')).getText()).toBe("18 Khuc Thua Du Street, Dich Vong, Ha Noi, Viet Nam");
        });
      });
    });

    describe('when customer file exported', function() {

      beforeAll(function() {
        try {
          pathFolder = process.cwd() + "/resources/test/export_file";
          fileName = pathFolder + "/*.*";
          files = fs.readdirSync(pathFolder);
          for (var i = 0; i < files.length; i++) {
            if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
              fs.unlinkSync(pathFolder + "/" + files[i]);
            }
          }

          browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getToogleOptionsButton()));
          timeBookingsCustomersPage.getToogleOptionsButton().click();
          browser.wait(testUtils.until.presenceOf(timeBookingsCustomersPage.getExportButton()));
          browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getExportButton()));
          browser.executeScript("arguments[0].click();", timeBookingsCustomersPage.getExportButton().getWebElement());

          browser.driver.wait(function() {
            filesArray = glob.sync(pathFolder + "/*.xlsx");
            if (typeof filesArray != 'undefined' && filesArray.length > 0) {
              return filesArray;
            }
          }).then(function(arr) {
            fileName = arr[0];
          });

        } catch (e) {
          return;
        }
        browser.wait(testUtils.until.stalenessOf(element(by.css('.lf-loader-overlay.import-loader'))));
        browser.wait(testUtils.until.stalenessOf(timeBookingsCustomersPage.getImportLoaderSpinner()));
      });

      it('should exist downloaded file in directory', function() {
        expect(fs.existsSync(fileName)).toBe(true);
        expect(fileName).toContain("customers-exported");
      });
    });

  });
})();
