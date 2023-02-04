(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainReportPage = require('./MainReportPage'),
    reportListPage = require('./ReportListPage');

  describe('on report tab ', function() {
    var today,
      day,
      last_wednesday;
    beforeAll(function() {
      console.log("\n REPORT GEOZONE=============================");
      last_wednesday = reportListPage.getLastDayOccurence(new Date(), 'Wed');
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getReportTab()));
      mainPage.clickReportTab();
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getGeozoneCard()));
      reportListPage.clickGeozoneCard();
      browser.wait(testUtils.until.presenceOf(reportListPage.getCustomDayRadio()));
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getCustomDayRadio()));
      reportListPage.clickCustomDayRadio();
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getTimeFromInput()));
      reportListPage.clickTimeFromInput();
      reportListPage.getTimeFromInput().sendKeys(protractor.Key.END);
      reportListPage.clearString(reportListPage.getTimeFromInput());
      //in js, month 0-11
      reportListPage.getTimeFromInput().sendKeys((last_wednesday.getUTCDate() < 10 ? ('0' + last_wednesday.getUTCDate()) : last_wednesday.getUTCDate()) + "/" + ((last_wednesday.getUTCMonth() < 9) ? ("0" + (last_wednesday.getUTCMonth() + 1)) : (last_wednesday.getUTCMonth() + 1)) + "/" + last_wednesday.getUTCFullYear() + " 00:00");
      reportListPage.clickTimeToInput();
      reportListPage.getTimeToInput().sendKeys(protractor.Key.END);
      reportListPage.clearString(reportListPage.getTimeToInput());
      reportListPage.getTimeToInput().sendKeys((last_wednesday.getUTCDate() < 10 ? ('0' + last_wednesday.getUTCDate()) : last_wednesday.getUTCDate()) + "/" + ((last_wednesday.getUTCMonth() < 9) ? ("0" + (last_wednesday.getUTCMonth() + 1)) : (last_wednesday.getUTCMonth() + 1)) + "/" + last_wednesday.getUTCFullYear() + " 23:59");
      browser.wait(function() {
        return reportListPage.getTimeToInput().getAttribute('value').then(function(value) {
          return value == ((last_wednesday.getUTCDate() < 10 ? ('0' + last_wednesday.getUTCDate()) : last_wednesday.getUTCDate()) + "/" + ((last_wednesday.getUTCMonth() < 9) ? ("0" + (last_wednesday.getUTCMonth() + 1)) : (last_wednesday.getUTCMonth() + 1)) + "/" + last_wednesday.getUTCFullYear() + " 23:59");
        });
      });
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getShowBtn()));
      reportListPage.clickShowBtn();
      browser.wait(testUtils.until.stalenessOf(reportListPage.getLoaderOverlaySpinner()));
      browser.wait(testUtils.until.presenceOf(reportListPage.getExpandAllButton()));
      reportListPage.clickExpandAllButton();
      browser.wait(testUtils.until.presenceOf(reportListPage.getTripsOfDay()), 10000, "Timeout loading data of geozones schedule report");
      browser.wait(function() {
        return reportListPage.getTripsOfDay().count().then(function(count) {
          return count > 0;
        });
      }, null, "Cant't load report geozones");
    });
    it('tracking object should be classc', function() {
      element.all(by.css('.report-total-day .medium-4')).each(function(elm,index){
        elm.getText().then(function(text){
          console.log("date "+index+" = "+text);
        });
      });
      expect(reportListPage.getTripsOfDay().get(0).element(by.css('div:nth-child(1).medium-2')).getText()).toBe("classc");
    });
    it('classc should be have duration', function() {
      expect(reportListPage.getTripsOfDay().get(0).element(by.css('div:nth-child(6)')).getText()).toBe("07:19");//05:19
      reportListPage.getTripsOfDay().get(0).element(by.css('div:nth-child(6)')).getText().then(function(text) {
        console.log('classc should be have duration1' + text);
        expect(reportListPage.convertTimeStringToSeconds(text)).toBeGreaterThanOrEqual(reportListPage.convertTimeStringToSeconds('05:19'));
        expect(reportListPage.convertTimeStringToSeconds(text)).toBeLessThanOrEqual(reportListPage.convertTimeStringToSeconds('06:19'));
      });
    });
    it('tracking object should be immob', function() {
      expect(reportListPage.getTripsOfDay().get(1).element(by.css('div:nth-child(1).medium-2')).getText()).toBe("immob");
    });
    it('immob should be have duration', function() {
      expect(reportListPage.getTripsOfDay().get(1).element(by.css('div:nth-child(6)')).getText()).toBe("14:57");//12:57
      reportListPage.getTripsOfDay().get(1).element(by.css('div:nth-child(6)')).getText().then(function(text) {
        console.log("immob duration = " + text);
        expect(reportListPage.convertTimeStringToSeconds(text)).toBeGreaterThanOrEqual(reportListPage.convertTimeStringToSeconds('12:57'));
        expect(reportListPage.convertTimeStringToSeconds(text)).toBeLessThanOrEqual(reportListPage.convertTimeStringToSeconds('13:57'));
      });
    });
    it('tracking object should be classc', function() {
      expect(reportListPage.getTripsOfDay().get(2).element(by.css('div:nth-child(1).medium-2')).getText()).toBe("classc");
    });
    it('classc should be have duration', function() {
      expect(reportListPage.getTripsOfDay().get(2).element(by.css('div:nth-child(6)')).getText()).toBe("07:51");//08:51
      reportListPage.getTripsOfDay().get(2).element(by.css('div:nth-child(6)')).getText().then(function(text) {
        console.log("classc duration = " + text);
        expect(reportListPage.convertTimeStringToSeconds(text)).toBeGreaterThanOrEqual(reportListPage.convertTimeStringToSeconds('07:51'));
        expect(reportListPage.convertTimeStringToSeconds(text)).toBeLessThanOrEqual(reportListPage.convertTimeStringToSeconds('08:51'));
      });
    });
    it('tracking object should be immob', function() {
      expect(reportListPage.getTripsOfDay().get(3).element(by.css('div:nth-child(1).medium-2')).getText()).toBe("immob");
    });
    it('immob should be have duration', function() {
      expect(reportListPage.getTripsOfDay().get(3).element(by.css('div:nth-child(6)')).getText()).toBe("05:16");//06:16
      reportListPage.getTripsOfDay().get(3).element(by.css('div:nth-child(6)')).getText().then(function(text) {
        console.log("immob duration = " + text);
        expect(reportListPage.convertTimeStringToSeconds(text)).toBeGreaterThanOrEqual(reportListPage.convertTimeStringToSeconds('05:16'));
        expect(reportListPage.convertTimeStringToSeconds(text)).toBeLessThanOrEqual(reportListPage.convertTimeStringToSeconds('06:16'));
      });
    });
    it('in every wednesday, total time should be constant', function() {
      //31:25
      expect(element(by.css('div:nth-child(5)[ng-click="selectDay(day.trips)"] div.medium-1:nth-child(5)')).getText()).toBe("35:25");//33:25
      element(by.css('div[ng-click="selectDay(day.trips)"] div.medium-1:nth-child(5)')).getText().then(function(text) {
        console.log('in every wednesday, total time should be constant' + text); //31:25
        expect(reportListPage.convertTimeStringToSeconds(text)).toBeGreaterThanOrEqual(reportListPage.convertTimeStringToSeconds('31:25'));
        expect(reportListPage.convertTimeStringToSeconds(text)).toBeLessThanOrEqual(reportListPage.convertTimeStringToSeconds('32:25'));
      });
      element.all(by.css('div[ng-click="selectDay(day.trips)"] div.medium-1:nth-child(5)')).count().then(function(count) {
        console.log(count);
      });
    });
    it('in week row, total time should be constant', function() {
      element(by.css('.report-total-week div:nth-child(5)')).getText().then(function(text) {
        console.log('in week row, total time should be constant' + text);
      });
      expect(element(by.css('.report-total-week div:nth-child(5)')).getText()).toBe("35:23"); //35:23
    });
    it('total period should be constant', function() {
      element(by.css(".report-time-lapse-total div.columns:nth-child(3)")).getText().then(function(text) {
        console.log('total period should be constant' + text);
      });
        expect(element(by.css(".report-time-lapse-total div.columns:nth-child(3)")).getText()).toBe("35:23"); //35:23
    });
  });
})();
