(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainReportPage = require('./MainReportPage'),
    reportListPage = require('./ReportListPage');

  describe('on report tab ', function() {
    var today,
      day,
      last_friday;
    beforeAll(function() {
      today = new Date();
      day = today.getDate() + (6 - today.getDay() - 1) - 7;
      last_friday = new Date();
      last_friday.setDate(day);
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getReportTab()));
      mainPage.clickReportTab();
      browser.wait(testUtils.until.presenceOf(mainReportPage.getReportView()));
      browser.wait(testUtils.until.presenceOf(reportListPage.getMachinesCard()));
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getMachinesCard()));
      reportListPage.clickMachinesCard();
      browser.wait(testUtils.until.presenceOf(reportListPage.getCustomDayRadio()));
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getCustomDayRadio()));
      reportListPage.clickCustomDayRadio();
      browser.executeScript('arguments[0].scrollIntoView()', reportListPage.getSelectedMachinesRadio().getWebElement());
      reportListPage.clickSelectedMachinesRadio();
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getSelectedMachinesWrap()));
      reportListPage.clickSelectedMachinesWrap();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(1)'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(1)')).getWebElement());
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getTimeFromInput()));
      reportListPage.clickTimeFromInput();
      reportListPage.getTimeFromInput().sendKeys(protractor.Key.END);
      reportListPage.clearString(reportListPage.getTimeFromInput());
      //in js, month 0-11
      reportListPage.getTimeFromInput().sendKeys((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear() + " 00:00");
      reportListPage.clickTimeToInput();
      reportListPage.getTimeToInput().sendKeys(protractor.Key.END);
      reportListPage.clearString(reportListPage.getTimeToInput());
      reportListPage.getTimeToInput().sendKeys((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear() + " 23:59");
      browser.wait(function() {
        return reportListPage.getTimeToInput().getAttribute('value').then(function(value) {
          return value == ((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear() + " 23:59");
        });
      });
      browser.executeScript('arguments[0].scrollIntoView()', reportListPage.getSelectedMachinesRadio().getWebElement());
      reportListPage.clickSelectedMachinesRadio();
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getSelectedMachinesWrap()));
      reportListPage.clickSelectedMachinesWrap();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(1)'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(1)')).getWebElement());
      reportListPage.clickShowBtn();
      browser.wait(testUtils.until.stalenessOf(reportListPage.getLoaderOverlaySpinner()));
      browser.wait(testUtils.until.presenceOf(reportListPage.getExpandAllButton()));
      reportListPage.clickExpandAllButton();
      browser.wait(testUtils.until.presenceOf(reportListPage.getLastFridayReport()), 10000, "Timeout loading data of machines schedule report");
    });
    describe('when machine report checked ', function() {
      it('report name should be machine', function() {
        expect(reportListPage.getReportNameInput().getText()).toBe('machine');
      });

      it('date should be selected date', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(1).medium-1')).getText()).toBe((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear());
      });

      it('day should be Friday', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(2).padding-left-2')).getText()).toBe('Friday');
      });

      it('geozone should be chantier DEF(chantierDEF-4)', function() {
        // expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(3) .fi-map-marker')).getText()).toBe('chantier DEF (chantierDEF-4)');
      });

      it('should have total day of distance', function() {
        expect(element(by.css('.report-week-row .report-total-day div:nth-child(5).text-right')).getText()).toBe('6.996');
      });

      it('should have total day of from time', function() {
        expect(element(by.css('.report-week-row .report-total-day div:nth-child(6) div:nth-child(1)')).getText()).toBe('00:00');
      });

      it('should have total day of to time', function() {
        expect(element(by.css('.report-week-row .report-total-day div:nth-child(6) div:nth-child(2)')).getText()).toBe('23:59');
      });

      it('should have total day of engagement duration', function() {
        expect(element(by.css('.report-week-row .report-total-day div:nth-child(7) div:nth-child(4)')).getText()).toBe('00:00');
      });
    });

    describe('when driver point clicked ', function() {
      beforeAll(function() {
        reportListPage.clickDriverPointView();
        reportListPage.clickExpandAllButton();
        browser.wait(testUtils.until.presenceOf(element.all(by.css('div[ng-repeat="trip in day.trips"]'))));
      });

      it('should have report machine list', function() {
        expect(element.all(by.css('div[ng-repeat="trip in day.trips"]')).count()).toBe(15);
      });
    });

    describe('when geozone point clicked ', function() {
      beforeAll(function() {
        reportListPage.clickGeozonePointView();
        reportListPage.clickExpandAllButton();
        browser.wait(testUtils.until.presenceOf(element.all(by.css('div[ng-repeat="trip in day.trips"]'))));
      });

      afterAll(function() {
        browser.executeScript('arguments[0].scrollIntoView()', mainPage.getReportTab().getWebElement());
      });

      it('should have report machine list', function() {
        expect(element.all(by.css('div[ng-repeat="trip in day.trips"]')).count()).toBe(4);
      });
    });
  });
})();
