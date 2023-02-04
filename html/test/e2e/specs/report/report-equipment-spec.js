(function() {
  'use strict';

  var testUtils = require('../../TestUtils'),
    mainPage = require('../../MainPage'),
    mainReportPage = require('../../MainReportPage');

  describe('on report page', function() {
    var date = new Date();
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainReportPage.getEquipment()));
    });

    afterAll(function() {
      mainReportPage.clickReportListButton();
    });

    describe('check report list', function() {
      it('should have equipment report', function() {
        expect(mainReportPage.getEquipment().isPresent()).toBeTruthy();
      });
    });

    describe('check equipment report', function() {
      beforeAll(function() {
        mainReportPage.clickEquipment();
        browser.wait(testUtils.until.presenceOf(element(by.css('.report-control-panel'))));
      });

      describe('check elements', function() {
        it('should have report title', function() {
          expect(mainReportPage.getReportTitle().getText()).toEqual('Equipment');
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

        it('should have from_calendar', function() {
          expect(mainReportPage.getFromCalendar().isDisplayed()).toBeTruthy();
        });

        it('should have from_time', function() {
          expect(mainReportPage.getFromTime().isDisplayed()).toBeTruthy();
        });

        it('should have to_calendar', function() {
          expect(mainReportPage.getToCalendar().isDisplayed()).toBeTruthy();
        });

        it('should have to_time', function() {
          expect(mainReportPage.getToTime().isDisplayed()).toBeTruthy();
        });

        it('should have select vehicle label', function() {
          expect(mainReportPage.getReportControlList().get(5).element(by.css('label')).getText()).toEqual('Select vehicles');
        });

        it('should have select drivers label', function() {
          expect(mainReportPage.getReportControlList().get(6).element(by.css('label')).getText()).toEqual('Select drivers');
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

      describe('when yesterday radio clicked', function() {
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

    });
  });
})();
