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
      browser.wait(testUtils.until.presenceOf(reportListPage.getLastFridayReport()),10000,"Timeout loading data of machines schedule report");
      browser.wait(function(){
        return reportListPage.getLastFridayReport().element(by.css('div:nth-child(3) a[ng-click="showOnMap(trip)"]')).getText().then(function(text){
          return text == "Show on map";
        });
      },10000,"Geozone can't load address");
    });
    describe('when machine report checked ', function() {
      it('report name should be machine', function() {
        expect(reportListPage.getReportNameInput().getText()).toBe('machine');
      });

      it('report resouce name should be machine', function() {
        expect(reportListPage.getReportResourceName().getText()).toBe('machine');
      });

      it('date should be selected date', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(1).medium-1')).getText()).toBe((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear());
      });

      it('day should be Friday', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(2).padding-left-2')).getText()).toBe('Friday');
      });

      it('geozone should be 4246 Wahlen, Basel-Landschaft, CH', function() {
        // sometime got ShowONMap
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(3) a[ng-click="showOnMap(trip)"]')).getText()).toBe('4246 Wahlen, Basel-Landschaft, CH');
      });

      it('should have distance', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(5)')).getText()).toBe('7.502');
      });

      it('should have from time', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(6) div:nth-child(1)')).getText()).toBe('09:35');
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(6) div:nth-child(1)')).getText().then(function(text){
          console.log("from time = "+text);
        });
      });

      it('should have to time', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(6) div:nth-child(2)')).getText()).toBe('18:57');
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(6) div:nth-child(2)')).getText().then(function(text){
          console.log("to time = "+text);
        });
      });

      it('should have working duration', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(1)')).getText()).toBe('07:45');
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(1)')).getText().then(function(text){
          console.log("working duration = "+text);
        });
      });

      it('should have stopped duration', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(2)')).getText()).toBe('01:24');
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(2)')).getText().then(function(text){
          console.log("stopped duration = "+text);
        });
      });

      it('should have contact on duration', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(3)')).getText()).toBe('00:12');
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(3)')).getText().then(function(text){
          console.log("contact on duration = "+text);
        });
      });

      it('should have engagement duration', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(4)')).getText()).toBe('09:21');
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(4)')).getText().then(function(text){
          console.log("engagement duration = "+text);
        });
      });
    });

    describe('when machine2 report checked ', function() {
      beforeAll(function() {
        reportListPage.chooseMachine2();
        reportListPage.clickExpandAllButton();
        browser.wait(function() {
          return reportListPage.getToolbarPageNumber().getText().then(function(pageNumber) {
            return pageNumber == '2 of 2';
          });
        });
      });

      it('report name should be machine', function() {
        expect(reportListPage.getReportNameInput().getText()).toBe('machine2');
      });

      it('report resouce name should be machine', function() {
        expect(reportListPage.getReportResourceName().getText()).toBe('machine2');
      });

      it('date should be selected date', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(1).medium-1')).getText()).toBe((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear());
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(1).medium-1')).getText().then(function(text){
        console.log("selected date = "+text);
        });
      });

      it('day should be Friday', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(2).padding-left-2')).getText()).toBe('Friday');
      });

      it('geozone should be 1188 Gimel, District de Morges, Vaud, CH', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(3) a[ng-click="showOnMap(trip)"]')).getText()).toContain('Vaud, CH');
        expect(['Show on map','1188 Gimel, District de Morges, Vaud, CH','1188 Gimel, Vaud, CH']).toContain(reportListPage.getLastFridayReport().element(by.css('div:nth-child(3) a[ng-click="showOnMap(trip)"]')).getText());
      });

      it('should have distance', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(5)')).getText()).toBe('9.523');
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(5)')).getText().then(function(text){
          console.log("machin2 distance = "+text);
        });
      });

      it('should have from time', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(6) div:nth-child(1)')).getText()).toBe('09:44');
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(6) div:nth-child(1)')).getText().then(function(text){
          console.log("machine2 from time = "+text);
        });
      });

      it('should have to time', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(6) div:nth-child(2)')).getText()).toBe('18:47');
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(6) div:nth-child(2)')).getText().then(function(text){
          console.log("machin2 to time = "+text);
        });
      });

      it('should have working duration', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(1)')).getText()).toBeGreaterThanOrEqual('01:53');
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(1)')).getText().then(function(text){
          console.log("machin2 working duration = "+text);//01:55
          expect(reportListPage.convertTimeStringToSeconds(text)).toBeGreaterThanOrEqual(reportListPage.convertTimeStringToSeconds('01:53'));
        });
      });

      it('should have stopped duration', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(2)')).getText()).toBeLessThanOrEqual('06:58');//06:57
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(2)')).getText().then(function(text){
        expect(reportListPage.convertTimeStringToSeconds(text)).toBeGreaterThanOrEqual(reportListPage.convertTimeStringToSeconds("06:58"));
        });
      });

      it('should have contact on duration', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(3)')).getText()).toBe('00:10');
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(3)')).getText().then(function(text){
        expect(reportListPage.convertTimeStringToSeconds(text)).toBe(reportListPage.convertTimeStringToSeconds("00:07"));//00:10
        });
      });

      it('should have engagement duration', function() {
        expect(reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(4)')).getText()).toBe('09:02');
        reportListPage.getLastFridayReport().element(by.css('div:nth-child(7) div:nth-child(4)')).getText().then(function(text){
          expect(reportListPage.convertTimeStringToSeconds(text)).toBe(reportListPage.convertTimeStringToSeconds("09:02"));
        });
      });
    });

    describe('when driver point clicked ', function() {
      beforeAll(function(){
        reportListPage.clickDriverPointView();
        reportListPage.clickExpandAllButton();
        browser.wait(testUtils.until.presenceOf(element.all(by.css('div[ng-repeat="trip in day.trips"]'))));
      });

      it('should have report machine list', function() {
        expect(element.all(by.css('div[ng-repeat="trip in day.trips"]')).count()).toBe(2);
      });
    });

    describe('when geozone point clicked ', function() {
      beforeAll(function(){
        reportListPage.clickGeozonePointView();
        reportListPage.clickExpandAllButton();
        browser.wait(testUtils.until.presenceOf(element.all(by.css('div[ng-repeat="trip in day.trips"]'))));
      });

      afterAll(function(){
        browser.executeScript('arguments[0].scrollIntoView()', mainPage.getReportTab().getWebElement());
      });

      it('should have report machine list', function() {
        expect(element.all(by.css('div[ng-repeat="trip in day.trips"]')).count()).toBe(2);
      });
    });
  });
})();
