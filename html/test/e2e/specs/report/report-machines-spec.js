(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    fs = require('fs'),
    glob = require("glob"),
    reportListPage = require('./ReportListPage'),

    settingsMachineCategoryPage = require('./SettingsMachineCategoryPage');

  describe('on the report machines ', function() {
    var pathFolder,
      pdfFile,
      excelFile,
      files,
      filesArray = [];
    beforeAll(function() {
      pathFolder = process.cwd() + "/resources/test/export_file";
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getReportTab()));
      mainPage.clickReportTab();
      browser.wait(testUtils.until.presenceOf(reportListPage.getReportList()));
      browser.wait(testUtils.until.presenceOf(reportListPage.getMachinesCard()));
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getMachinesCard()));
      reportListPage.clickMachinesCard();
      browser.wait(testUtils.until.presenceOf(reportListPage.getReportControlPanel()));
      browser.wait(testUtils.until.presenceOf(reportListPage.getCustomDayRadio()));
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getCustomDayRadio()));
      reportListPage.clickCustomDayRadio();
      reportListPage.fillFromInput('18/09/2021 00:00');
      reportListPage.getTimeFromHoursButton().click();
      browser.wait(testUtils.until.stalenessOf(reportListPage.getTimeFromTooltipBottom()));
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"]'))));
      reportListPage.getTimeFromHoursButton().click();
      browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"]'))));
      reportListPage.fillToInput('20/09/2021 23:59');
      reportListPage.clickGroupLabel();
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getShowBtn()));
      reportListPage.clickShowBtn();
      browser.wait(testUtils.until.stalenessOf(reportListPage.getLoaderOverlaySpinner()));
      browser.wait(testUtils.until.presenceOf(reportListPage.getExpandAllButton()));
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getExpandAllButton()));
      reportListPage.clickExpandAllButton();
      browser.wait(testUtils.until.presenceOf(reportListPage.getTripsOfDay()));
    });

    it('should have export pdf button', function() {
      expect(reportListPage.getExportPdfButton().isPresent()).toBe(true);
    });

    it('should have export excel button', function() {
      expect(reportListPage.getExportExcelButton().isPresent()).toBe(true);
    });

    it('should have trips of day', function() {
      expect(reportListPage.getTripsOfDay().isPresent()).toBe(true);
    });

    describe('when export pdf button clicked ', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.presenceOf(reportListPage.getExportPdfButton()));
        try {
          files = fs.readdirSync(pathFolder);
          for (var i = 0; i < files.length; i++) {
            if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
              fs.unlinkSync(pathFolder + "/" + files[i]);
            }
          }
          browser.wait(testUtils.until.elementToBeClickable(reportListPage.getExportPdfButton()));
          reportListPage.clickExportPdfBtn();
          browser.driver.wait(function() {
              filesArray = glob.sync(pathFolder + "/report.pdf");
              if ((typeof filesArray != 'undefined') && (filesArray.length > 0)) {
                return filesArray;
              }
              // return fs.existsSync(pathFolder + "/report.pdf");
            })
            .then(function(arr) {
              pdfFile = arr[0];
            });
          browser.wait(testUtils.until.stalenessOf(element(by.css('.lf-loader-overlay.import-loader .lf-spinner.icon-spinner9'))));
        } catch (e) {
          console.log(e);
          return;
        }
      });

      it("file should be in download directory ", function() {
        expect(fs.existsSync(pdfFile)).toBe(true);
      });

      it('should have name', function() {
        expect(pdfFile).toContain('report.pdf');
      });
    });

    describe('when export excel button clicked ', function() {
      beforeAll(function() {
        try {
          files = fs.readdirSync(pathFolder);
          for (var i = 0; i < files.length; i++) {
            if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
              fs.unlinkSync(pathFolder + "/" + files[i]);
            }
          }
          browser.wait(testUtils.until.presenceOf(reportListPage.getExportExcelButton()));
          browser.wait(testUtils.until.elementToBeClickable(reportListPage.getExportExcelButton()));
          reportListPage.clickExportExcelBtn();
          browser.driver.wait(function() {
            filesArray = glob.sync(pathFolder + "/*.xlsx");
            if ((typeof filesArray != 'undefined') && (filesArray.length > 0)) {
              return filesArray;
            }
          }).then(function(arr) {
            excelFile = arr[0];
          });
          browser.wait(testUtils.until.stalenessOf(element(by.css('.lf-loader-overlay.import-loader'))));
        } catch (e) {
          console.log(e);
          return;
        }
      });

      it("file should be in download directory ", function() {
        expect(fs.existsSync(excelFile)).toBe(true);
      });

      it('should have name', function() {
        expect(excelFile).toContain('report.xlsx');
      });
    });
  });
})();
