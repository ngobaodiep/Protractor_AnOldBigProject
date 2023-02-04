(function() {
  'use strict';

  var mainPage = require("./MainPage"),
    testUtils = require('./TestUtils'),
    reportListPage = require('./ReportListPage'),
    mainReportPage = require("./MainReportPage");
  describe('on machines report', function() {
    var fromDate = "01/05/2021",
      toDate = "21/05/2021";
    var machineTotalDistance = 0.00,
      machineTotalDurationWorking = 0,
      machineTotalDurationContactOn = 0,
      machineTotalDurationEngagement = 0,
      machineTotalDurationStopped = 0;
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainPage.getReportTab()));
      mainPage.getReportTab().click();
      browser.wait(testUtils.until.presenceOf(reportListPage.getMachinesCard()));
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getMachinesCard()));
      reportListPage.getMachinesCard().click();
      browser.wait(testUtils.until.presenceOf(reportListPage.getCustomDayRadio()));
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getCustomDayRadio()));
      reportListPage.clickCustomDayRadio();
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getTimeFromInput()));
      reportListPage.clickTimeFromInput();
      reportListPage.getTimeFromInput().sendKeys(protractor.Key.END);
      reportListPage.clearString(reportListPage.getTimeFromInput());
      reportListPage.getTimeFromInput().sendKeys(fromDate + " 00:00");
      reportListPage.clickTimeToInput();
      reportListPage.getTimeToInput().sendKeys(protractor.Key.END);
      reportListPage.clearString(reportListPage.getTimeToInput());
      reportListPage.getTimeToInput().sendKeys(toDate + " 23:59");
      browser.wait(function() {
        return reportListPage.getTimeToInput().getAttribute('value').then(function(value) {
          return value == (toDate + " 23:59");
        });
      });
      browser.executeScript("arguments[0].click();", reportListPage.getSelectedMachinesRadio().getWebElement());
      reportListPage.clickShowBtn();
      browser.wait(testUtils.until.stalenessOf(reportListPage.getLoaderOverlaySpinner()));
    });
    describe('when machine report checked ', function() {

      it('report name should be machine', function() {
        expect(reportListPage.getReportNameInput().getText()).toBe('machine');
      });

      describe('', function() {
        beforeAll(function() {
          reportListPage.getAllReportTotalDistance2().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              machineTotalDistance = machineTotalDistance + parseFloat(text);
            });
          });

          reportListPage.getAllReportTotalDurationWorking().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              if (text.length <= 0) {
                text = "0:0";
              }
              machineTotalDurationWorking = machineTotalDurationWorking + reportListPage.convertTimeStringToSeconds(text);
            });
          });

          reportListPage.getAllReportTotalDurationStopped().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              if (text.length <= 0) {
                text = "0:0";
              }
              machineTotalDurationStopped = machineTotalDurationStopped + reportListPage.convertTimeStringToSeconds(text);
            });
          });

          reportListPage.getAllReportTotalDurationContactOn().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              if (text.length <= 0) {
                text = "0:0";
              }
              machineTotalDurationContactOn = machineTotalDurationContactOn + reportListPage.convertTimeStringToSeconds(text);
            });
          });

          reportListPage.getAllReportTotalDurationEngagement().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              if (text.length <= 0) {
                text = "0:0";
              }
              machineTotalDurationEngagement = machineTotalDurationEngagement + reportListPage.convertTimeStringToSeconds(text);
            });
          });
        });
        it('should have machine total distance', function() {
          expect(machineTotalDistance).toBe(180.252);
        });

        it('should have machine total working duration', function() {
          expect(reportListPage.convertSecondsToTime(machineTotalDurationWorking)).toBe("92:00");
        });

        it('should have machine total stopped duration', function() {
          expect(reportListPage.convertSecondsToTime(machineTotalDurationStopped)).toBe("20:09");
        });


        it('should have machine total contact on duration', function() {
          expect(reportListPage.convertSecondsToTime(machineTotalDurationContactOn)).toBe("02:47");
        });

        it('should have machine total engagement duration', function() {
          expect(reportListPage.convertSecondsToTime(machineTotalDurationEngagement)).toBe("114:58");
        });
      });

    });

    describe('when machine2 report checked', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(reportListPage.getReportNameInput()));
        reportListPage.getReportNameInput().click();
        browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(2)'))));
        browser.executeScript(
          "arguments[0].click();",
          element(by.css('ul[aria-hidden="false"] li:nth-child(2)')).getWebElement()
        );
        browser.wait(function() {
          return reportListPage.getReportNameInput().getText().then(function(text) {
            return text.includes("machine2") == true;
          });
        });
      });

      it('report name should be machine2', function() {
        expect(reportListPage.getReportNameInput().getText()).toBe('machine2');
      });

      describe('', function() {
        beforeAll(function() {
          reportListPage.getAllReportTotalDistance2().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              machineTotalDistance = machineTotalDistance + parseFloat(text);
            });
          });

          reportListPage.getAllReportTotalDurationWorking().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              if (text.length <= 0) {
                text = "0:0";
              }
              machineTotalDurationWorking = machineTotalDurationWorking + reportListPage.convertTimeStringToSeconds(text);
            });
          });

          reportListPage.getAllReportTotalDurationStopped().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              if (text.length <= 0) {
                text = "0:0";
              }
              machineTotalDurationStopped = machineTotalDurationStopped + reportListPage.convertTimeStringToSeconds(text);
            });
          });

          reportListPage.getAllReportTotalDurationContactOn().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              if (text.length <= 0) {
                text = "0:0";
              }
              machineTotalDurationContactOn = machineTotalDurationContactOn + reportListPage.convertTimeStringToSeconds(text);
            });
          });

          reportListPage.getAllReportTotalDurationEngagement().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              if (text.length <= 0) {
                text = "0:0";
              }
              machineTotalDurationEngagement = machineTotalDurationEngagement + reportListPage.convertTimeStringToSeconds(text);
            });
          });
        });
        it('should have machine total distance', function() {
          expect(machineTotalDistance).toBe(242.28);
        });

        it('should have machine total working duration', function() {
          expect(reportListPage.convertSecondsToTime(machineTotalDurationWorking)).toBe("103:50");
        });

        it('should have machine total stopped duration', function() {
          expect(reportListPage.convertSecondsToTime(machineTotalDurationStopped)).toBe("91:44");
        });


        it('should have machine total contact on duration', function() {
          expect(reportListPage.convertSecondsToTime(machineTotalDurationContactOn)).toBe("03:55");
        });

        it('should have machine total engagement duration', function() {
          expect(reportListPage.convertSecondsToTime(machineTotalDurationEngagement)).toBe("199:35");
        });
      });
    });
  });
})();
