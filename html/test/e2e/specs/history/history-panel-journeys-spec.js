(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    historyPanelPage = require('./HistoryPanelPage'),
    filterPanelPage = require('./FilterPanelPage');

  describe('check', function() {
    var total_distance,
      temp1,
      temp2,
      arr1,
      arr2,
      number_of_trips,
      first_journey_start_time,
      last_journey_end_time;
    var today = new Date();
    it(' filter panel ', function() {
      if ((today.getDay() !== 0) && (today.getDay() !== 1) && (today.getDay() !== 6)) {
        describe('check ', function() {
          beforeAll(function() {
            browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
            mainPage.clickFilterButton();
            browser.wait(testUtils.until.visibilityOf(filterPanelPage.getFilterPanel()));
            browser.wait(testUtils.until.visibilityOf(filterPanelPage.getFilterClearButton()));
            browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
            filterPanelPage.clickFilterClearButton();
            browser.wait(testUtils.until.presenceOf(element(by.css('#showVehicles.ng-not-empty'))));
            browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getVehiclesSwitcher()));
            filterPanelPage.clickMachinesSwitcher();
            filterPanelPage.clickStandalonesSwitcher();
            filterPanelPage.clickWorkersSwitcher();
            filterPanelPage.clickMobileassetsSwitcher();
            filterPanelPage.clickGeozonesSwitcher();
            browser.wait(testUtils.until.presenceOf(element(by.css('#showGeozones.ng-empty'))));
            browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
            mainPage.clickFilterButton();
            browser.wait(testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel()));
            browser.wait(testUtils.until.elementToBeClickable(mainPage.getHistoryButton()));
            mainPage.clickHistoryButton();
            browser.wait(testUtils.until.presenceOf(historyPanelPage.getHistoryPanel()));
            browser.wait(testUtils.until.visibilityOf(historyPanelPage.getTimeFrameYesterday()));
            historyPanelPage.getTimeFrameYesterday().click();
            browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getTrackingObjectDropDown()));
            historyPanelPage.getTrackingObjectDropDown().click();
            browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(1)'))));
            browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(1)')).getWebElement());
            browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getShowButton()));
            historyPanelPage.clickShowButton();
            browser.wait(testUtils.until.presenceOf(historyPanelPage.getStatisticsTab()));
          });

          afterAll(function() {
            browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
            mainPage.clickFilterButton();
            browser.wait(testUtils.until.visibilityOf(filterPanelPage.getFilterPanel()));
            browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getFilterClearButton()));
            filterPanelPage.clickFilterClearButton();
            browser.wait(testUtils.until.presenceOf(element(by.css('#showGeozones.ng-not-empty'))));
            mainPage.clickFilterButton();
            browser.wait(testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel()));
            mainPage.clickHistoryButton();
            browser.wait(testUtils.until.stalenessOf(historyPanelPage.getHistoryPanel()));
          });

          describe('on history panel ', function() {
            beforeAll(function() {
              // statistics tab
              browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getStatisticsTab()));
              historyPanelPage.clickStatisticsTab();
              browser.wait(testUtils.until.presenceOf(historyPanelPage.getTotalDistance().element(by.css('span'))));
              historyPanelPage.getTotalDistance().element(by.css('span')).getAttribute('innerHTML').then(function(text) {
                total_distance = text.substring(0, text.length - 3);
              });
              // activity logs tab
              browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getActivityLogsTab()));
              historyPanelPage.clickActivityLogsTab();
              browser.wait(testUtils.until.visibilityOf(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('span.k-icon.k-i-expand'))));
              browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('span.k-icon.k-i-expand'))));
              historyPanelPage.getHistoryJourneyList().get(0).element(by.css('span.k-icon.k-i-expand')).click();
              browser.wait(testUtils.until.visibilityOf(historyPanelPage.getHistoryJourneyList().get(0).element(by.css('ul.k-group:not(.k-treeview-lines) li:nth-child(1) div:nth-child(1).medium-5 span'))));
              historyPanelPage.getHistoryJourneyList().get(0).element(by.css('ul.k-group:not(.k-treeview-lines) li:nth-child(1) div:nth-child(1).medium-5 span')).getAttribute('innerHTML').then(function(text) {
                arr1 = text.split(' ');
                first_journey_start_time = arr1[1];
              });
              browser.executeScript("arguments[0].scrollIntoView();", historyPanelPage.getHistoryJourneyList().last().element(by.css('span.k-icon')).getWebElement());
              browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getHistoryJourneyList().last().element(by.css('span.k-icon'))));
              browser.executeScript("arguments[0].click();", historyPanelPage.getHistoryJourneyList().last().element(by.css('span.k-icon')).getWebElement());
              browser.wait(testUtils.until.visibilityOf(historyPanelPage.getHistoryJourneyList().last().element(by.css('ul.k-group:not(.k-treeview-lines) li.ng-scope.k-last div:nth-child(1).medium-5 span'))));
              historyPanelPage.getHistoryJourneyList().last().element(by.css('ul.k-group:not(.k-treeview-lines) li.ng-scope.k-last div:nth-child(1).medium-5 span')).getAttribute('innerHTML').then(function(text) {
                arr2 = text.split(" ");
                last_journey_end_time = arr2[1];
              });

              historyPanelPage.getHistoryJourneyList().count().then(function(count) {
                number_of_trips = count;
              });
            });

            describe('journeys tab ', function() {
              beforeAll(function() {
                browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getJourneysTab()));
                historyPanelPage.clickJourneysTab();
                browser.wait(testUtils.until.presenceOf(historyPanelPage.getJourneysSummaryInfo().element(by.css('div:nth-child(4).small-4 div:nth-child(2)'))));
              });

              it('should have same total distance as statistics tab', function() {
                expect(historyPanelPage.getJourneysSummaryInfo().element(by.css('div:nth-child(4).small-4 div:nth-child(2)')).getAttribute('innerHTML')).toContain(total_distance);
              });

              it('should have same number of trips as activity logs', function() {
                expect(historyPanelPage.getJourneysSummaryInfo().element(by.css('div:nth-child(3).small-4 div:nth-child(2)')).getAttribute('innerHTML')).toBe(number_of_trips + "");
              });

              it('should have same start time as activity logs tab', function() {
                historyPanelPage.getJourneysSummaryInfo().element(by.css('div:nth-child(1) > div.small-2.columns.ng-binding')).getAttribute('innerHTML').then(function(text) {
                  arr1 = text.split(" ");
                  expect(first_journey_start_time).toContain(arr1[1]);
                });
              });

              it('should have same end time as activity logs tab ', function() {
                historyPanelPage.getJourneysSummaryInfo().element(by.css('div:nth-child(2).small-12 div:nth-child(2)')).getAttribute('innerHTML').then(function(text) {
                  arr2 = text.split(" ");
                  expect(last_journey_end_time).toContain(arr2[1]);
                });
              });

              it('should have same start time as first journey', function() {
                historyPanelPage.getHistoryJourneyDetailsList().first().element(by.css('div:nth-child(1) > div.small-2.columns.ng-binding')).getText().then(function(text) {
                  expect(first_journey_start_time).toContain(text);
                });
              });

              it('should have same end time as last journey', function() {
                historyPanelPage.getHistoryJourneyDetailsList().last().element(by.css('div:nth-child(2) > div.small-2.columns.ng-binding')).getText().then(function(text) {
                  expect(last_journey_end_time).toContain(text);
                });
              });
            });
          });
        });
      }
    });
  });
})();
