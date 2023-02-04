(function() {
  'use strict';

  var amsMainPage = require('./AMSMainPage'),
    amsAccountsViewPage = require('./AMSAccountsViewPage'),
    fs = require('fs'),
    glob = require("glob"),
    testUtils = require('../TestUtils');
  describe('on ams account tab ', function() {
    var pathFolder,
      fileName,
      filesArray = [],
      arr = this.arr = [],
      files = [];
    beforeAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(amsMainPage.getAccountsTab()));
      amsMainPage.clickAccountsViewTab();
      browser.wait(testUtils.until.presenceOf(amsMainPage.getAccountsView()));
    });

    it('should have creating startkid account button ', function() {
      expect(amsAccountsViewPage.getCreateStartKidAccountBtn().isPresent()).toBe(true);
    });

    describe('check export startkid account ', function() {
      beforeAll(function() {
        amsAccountsViewPage.filterGridByLogin('sk_00000042');
        browser.wait(function() {
          return element.all(by.css('.accounts-list .k-grid .k-grid-content table tbody tr')).count().then(function(count) {
            return count === 1;
          });
        });
        browser.wait(testUtils.until.presenceOf(element(by.css('.accounts-list .k-grid .k-grid-content table tbody tr:nth-child(1) a.fi-file-pdf.getPDF'))));
      });

      it('should have export pdf file button ', function() {
        expect(element(by.css('.accounts-list .k-grid .k-grid-content table tbody tr:nth-child(1) a.fi-file-pdf.getPDF')).isPresent()).toBe(true);
      });

      describe('when pdf button clicked ', function() {
        beforeAll(function() {
          pathFolder = process.cwd() + "/resources/test/export_file";
          fileName = pathFolder + "/*.*";
          try {
            files = fs.readdirSync(pathFolder);
            for (var i = 0; i < files.length; i++) {
              if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
                fs.unlinkSync(pathFolder + "/" + files[i]);
              }
            }
            browser.wait(testUtils.until.visibilityOf(element(by.css('.accounts-list .k-grid .k-grid-content table tbody tr:nth-child(1) a.fi-file-pdf.getPDF'))));
            browser.wait(testUtils.until.elementToBeClickable(element(by.css('.accounts-list .k-grid .k-grid-content table tbody tr:nth-child(1) a.fi-file-pdf.getPDF'))));
            browser.executeScript("arguments[0].click();", element(by.css('.accounts-list .k-grid .k-grid-content table tbody tr:nth-child(1) a.fi-file-pdf.getPDF')));
            browser.driver.wait(function() {
              filesArray = glob.sync(pathFolder + "/*.*");
              if ((typeof filesArray != 'undefined') && (filesArray.length > 0)) {
                return filesArray;
              }
            }).then(function(arr) {
              fileName = arr[0];
            });
            browser.wait(testUtils.until.stalenessOf(element(by.css('.lf-loader-overlay.report-loader'))));
          } catch (e) {
            return;
          }
        });

        it("file should be in download directory ", function() {
          expect(fs.existsSync(fileName)).toBe(true);
        });

        it('file should have fixed name', function() {
          expect(fileName).toContain("sk_00000042");
        });
      });

      describe('when pdf button clicked false ', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(amsAccountsViewPage.getClearFilterButtonColumn(1)));
          amsAccountsViewPage.clickClearFilterButtonColumn(1);
          browser.wait(function() {
            return element.all(by.css('.accounts-list .k-grid .k-grid-content table tbody tr')).count().then(function(count) {
              return count !== 1;
            });
          });
          browser.wait(testUtils.until.elementToBeClickable(amsAccountsViewPage.getHeaderLogin()));
          amsAccountsViewPage.filterGridByLogin('sk_00000043');
          browser.wait(function() {
            return element.all(by.css('.accounts-list .k-grid .k-grid-content table tbody tr')).count().then(function(count) {
              return count === 1;
            });
          });
          browser.wait(testUtils.until.presenceOf(element(by.css('.accounts-list .k-grid .k-grid-content table tbody tr:nth-child(1) a.fi-file-pdf.getPDF'))));
          browser.wait(testUtils.until.elementToBeClickable(element(by.css('.accounts-list .k-grid .k-grid-content table tbody tr:nth-child(1) a.fi-file-pdf.getPDF'))));
          element(by.css('.accounts-list .k-grid .k-grid-content table tbody tr:nth-child(1) a.fi-file-pdf.getPDF')).click();
          browser.wait(testUtils.until.presenceOf(amsAccountsViewPage.getErrorModal()));
        });

        afterAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(amsAccountsViewPage.getErrorModal().element(by.css('button[ng-click="confirm()"]'))));
          amsAccountsViewPage.getErrorModal().element(by.css('button[ng-click="confirm()"]')).click();
          browser.wait(testUtils.until.stalenessOf(amsAccountsViewPage.getErrorModal().element(by.css('button[ng-click="confirm()"]'))));
          browser.wait(testUtils.until.elementToBeClickable(amsAccountsViewPage.getClearFilterButtonColumn(1)));
          amsAccountsViewPage.clickClearFilterButtonColumn(1);
          browser.wait(function() {
            return element.all(by.css('.accounts-list .k-grid .k-grid-content table tbody tr')).count().then(function(count) {
              return count !== 1;
            });
          });
        });

        it('should have error modal', function() {
          expect(amsAccountsViewPage.getErrorModal().isDisplayed()).toBe(true);
        });
      });
    });
  });
})();
