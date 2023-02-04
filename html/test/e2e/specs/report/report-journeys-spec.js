(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainReportPage = require('./MainReportPage');

  describe('on report page', function() {
    var date = new Date();

    beforeAll(function() {
      mainPage.clickReportTab();
      browser.wait(testUtils.until.presenceOf(element(by.css('.reports-list'))));
    });

    afterAll(function() {
      mainReportPage.clickReportListButton();
    });

    describe('check report list', function() {
      it('should have journeys report', function() {
        expect(mainReportPage.getJourneys().isPresent()).toBeTruthy();
      });
    });

    describe('check journeys report', function() {
      beforeAll(function() {
        mainReportPage.clickJourneys();
        browser.wait(testUtils.until.presenceOf(element(by.css('.report-control-panel'))));
        mainReportPage.clickShowAdvancedSettings();
        mainReportPage.clickAddTimeInterval();
      });

      describe('check elements', function() {

        it('should have report title', function() {
          expect(mainReportPage.getReportTitle().isDisplayed()).toBeTruthy();
        });

        it('should have time frame today', function() {
          expect(mainReportPage.getTimeFrameToday().isDisplayed()).toBeTruthy();
        });

        it('should have time frame yesterday', function() {
          expect(mainReportPage.getTimeFrameYesterday().isDisplayed()).toBeTruthy();
        });

        it('should have time frame last7', function() {
          expect(mainReportPage.getTimeFrameLast7days().isDisplayed()).toBeTruthy();
        });

        it('should have time frame custom', function() {
          expect(mainReportPage.getTimeFrameCustom().isDisplayed()).toBeTruthy();
        });

        it('should have from calendar', function() {
          expect(mainReportPage.getFromCalendar().isDisplayed()).toBeTruthy();
        });

        it('should have from time', function() {
          expect(mainReportPage.getFromTime().isDisplayed()).toBeTruthy();
        });

        it('should have to calender', function() {
          expect(mainReportPage.getToCalendar().isDisplayed()).toBeTruthy();
        });

        it('should have to time', function() {
          expect(mainReportPage.getToTime().isDisplayed()).toBeTruthy();
        });

        it('should have select vehicles label', function() {
          expect(mainReportPage.getReportControlList().get(5).element(by.css('label')).getText()).toEqual('Select vehicles');
        });

        it('should have select workers label', function() {
          expect(mainReportPage.getReportControlList().get(6).element(by.css('label')).getText()).toEqual('Select workers');
        });

        it('should have select objects label', function() {
          expect(mainReportPage.getReportControlList().get(7).element(by.css('label')).getText()).toEqual('Select objects');
        });

        it('should have select drivers label', function() {
          expect(mainReportPage.getReportControlList().get(8).element(by.css('label')).getText()).toEqual('Select drivers');
        });

        it('should have show advanced settings button', function() {
          expect(mainReportPage.getJourneyShowAdvancedSettings().isDisplayed()).toBeTruthy();
        });

        it('should have add time interval button', function() {
          expect(mainReportPage.getAddTimeInterval().isDisplayed()).toBeTruthy();
        });

        it('should have time interval list', function() {
          expect(mainReportPage.getTimeIntervalList().isDisplayed()).toBeTruthy();
        });

        it('should have subcrible button', function() {
          expect(mainReportPage.getSubcribleButton().isDisplayed()).toBeTruthy();
        });

        it('should have reset button', function() {
          expect(mainReportPage.getResetButton().isDisplayed()).toBeTruthy();
        });

        it('should have show button', function() {
          expect(mainReportPage.getShowButton().isDisplayed()).toBeTruthy();
        });
      });

      describe('when today radio clicked', function() {
        beforeAll(function() {
          mainReportPage.checkToClickYesterdayRadio();
        });

        afterAll(function() {
          browser.executeScript("arguments[0].click();", mainReportPage.getFromCalendar().getWebElement());
        });

        it('check today ', function() {
          expect(mainReportPage.getToday().getText()).toBe('' + date.getDate());
        });

        it('check yesterday ', function() {
          expect(mainReportPage.getChooseDay().getText()).not.toBe('' + date.getDate());
        });
      });

      describe('when last 7 days radio clicked', function() {
        beforeAll(function() {
          mainReportPage.checkToClickLast7Days();
        });

        afterAll(function() {
          browser.executeScript("arguments[0].click();", mainReportPage.getFromCalendar().getWebElement());
        });

        it('check last 7 days ', function() {
          expect(mainReportPage.getChooseDay().getText()).not.toBe('' + date.getDate());
        });
      });

      describe('when custom day clicked', function() {
        beforeAll(function() {
          mainReportPage.checkToClickCustomRadio();
        });

        afterAll(function() {
          browser.executeScript("arguments[0].click();", mainReportPage.getFromCalendar().getWebElement());
        });

        it('check custom day ', function() {
          expect(mainReportPage.getChooseDay().getAttribute('class')).not.toContain('today');
        });
      });
    });
  });
})();
