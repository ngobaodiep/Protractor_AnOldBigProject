(function() {
  'use strict';

  var testUtils = require('../../TestUtils'),
    historyPanelPage = require('../../pages/history/HistoryPanelPage'),
    filterPanelPage = require('../../FilterPanelPage');


  describe('check ', function() {
    var today = new Date(),
    last_friday = new Date();
    it('filter panel ', function() {
        describe('check ', function() {
          beforeAll(function() {
            browser.wait(testUtils.until.presenceOf(mainPage.getTrackingTab()));
            browser.wait(testUtils.until.elementToBeClickable(mainPage.getTrackingTab()));
            mainPage.getTrackingTab().click();
            browser.wait(testUtils.until.presenceOf(mainPage.getFilterButton()));
            browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
            mainPage.clickFilterButton();
            browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel()));
            browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterClearButton()));
            browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getFilterClearButton()));
            filterPanelPage.clickFilterClearButton();
            browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getGeozonesSwitcher()));
            filterPanelPage.clickMachinesSwitcher();
            filterPanelPage.clickStandalonesSwitcher();
            filterPanelPage.clickWorkersSwitcher();
            filterPanelPage.clickMobileassetsSwitcher();
            filterPanelPage.clickGeozonesSwitcher();
            browser.wait(testUtils.until.presenceOf(element(by.css('#showGeozones.ng-empty'))));
            mainPage.clickFilterButton();
            browser.wait(testUtils.until.stalenessOf(filterPanelPage.getFilterPanel()));

          });

          describe('on history panel ', function() {
            beforeAll(function() {
              browser.wait(testUtils.until.elementToBeClickable(mainPage.getHistoryButton()));
              mainPage.clickHistoryButton();
              browser.wait(testUtils.until.presenceOf(historyPanelPage.getHistoryPanel()));
              browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getTimeFrameCustom()));
              historyPanelPage.getTimeFrameCustom().click();
              browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getFromTimeInput()));
              last_friday.setDate(today.getDate() + (6 - today.getDay() - 1) - 7);
              historyPanelPage.clearString(historyPanelPage.getFromTimeInput(), 25);
              historyPanelPage.getFromTimeInput().sendKeys((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear() + " 00:00");
              historyPanelPage.clearString(historyPanelPage.getToTimeInput(), 25);
              historyPanelPage.getToTimeInput().sendKeys((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear() + " 23:59");
              historyPanelPage.clickTrackingObjectDropDown();
              browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(1)'))));
              browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(1)')).getWebElement());
              browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getShowButton()));
              historyPanelPage.clickShowButton();
              browser.wait(testUtils.until.stalenessOf(historyPanelPage.getLoadingOverlay()));
            });

            afterAll(function(){
              browser.wait(testUtils.until.elementToBeClickable(mainPage.getHistoryButton()));
              mainPage.clickHistoryButton();
              browser.wait(testUtils.until.stalenessOf(historyPanelPage.getHistoryPanel()));
            });

            describe('when activity logs tab checked ', function() {
              beforeAll(function() {
                browser.wait(testUtils.until.presenceOf(element(by.css(historyPanelPage.getActivityLogsTab()))));
                browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getActivityLogsTab()));
                historyPanelPage.clickActivityLogsTab();
                browser.wait(testUtils.until.presenceOf(element(by.css('.history-stats-panel ul li:nth-child(3).tabs-title.is-active'))));
                browser.wait(testUtils.until.presenceOf(historyPanelPage.getHistoryJourneyList()));
              });

              it('should have 7 journeys in list', function() {
                expect(historyPanelPage.getHistoryJourneyList().count()).toBe(14);
              });

              describe('check journey 1 ', function() {
                beforeAll(function() {
                  browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('span.k-icon.k-i-collapse'))));
                  historyPanelPage.getHistoryJourneyList().get(0).element(by.css('span.k-icon.k-i-collapse')).click();
                  browser.wait(testUtils.until.visibilityOf(historyPanelPage.getHistoryJourneyList().get(0).all(by.css("ul li"))));
                });

                it('status 1 should have same time as input time', function() {
                  expect(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('ul li:nth-child(1) div.time span')).getText()).toContain((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear());
                });

                it('status 1 should be Driving ', function() {
                  expect(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('ul li:nth-child(1) div:nth-child(2).status span:nth-child(2)')).getText()).toBe("Driving Ignition on");
                });

                it('status 1 should have color status', function() {
                  expect(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('ul li:nth-child(1) div:nth-child(2).status span:nth-child(1)')).getAttribute('style')).toBe("color: #006bb3");
                });

                it('status 1 speed should have address', function() {
                  expect(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('ul li:nth-child(1) div:nth-child(3).address-larger span')).getText()).toBe("Lerchenweg 2, 4538 Oberbipp, Verwaltungsregion Emmental-Oberaargau, Bern/Berne, CH");
                });

                it('status 1 speed should be 0 km/h', function() {
                  expect(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('ul li:nth-child(1) div:nth-child(4).name-speed span')).getText()).toBe("0 km/h");
                });

                it('status 2 should have same time as input time', function() {
                  expect(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('ul li:nth-child(2) div.time span')).getText()).toContain((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear());
                });

                it('status 2 should be Stopped ', function() {
                  expect(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('ul li:nth-child(2) div:nth-child(2).status span:nth-child(2)')).getText()).toBe("Stopped Ignition off");
                });

                it('status 2 should have status color ', function() {
                  expect(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('ul li:nth-child(2) div:nth-child(2).status span:nth-child(1)')).getAttribute('style')).toBe("color: #9e9e9e");
                });

                it('status 1 speed should have address', function() {
                  expect(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('ul li:nth-child(2) div:nth-child(3).address-larger span')).getText()).toBe("Lerchenweg 2, 4538 Oberbipp, Verwaltungsregion Emmental-Oberaargau, Bern/Berne, CH");
                });

                it('status 2 speed should be 0 km/h', function() {
                  expect(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('ul li:nth-child(2) div:nth-child(4).name-speed span')).getText()).toBe("0 km/h");
                });
              });
            });
          });
        });
    });
  });
})();
