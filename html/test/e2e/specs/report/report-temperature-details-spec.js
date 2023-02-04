(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainReportPage = require('./MainReportPage');

  describe('on report page', function() {
    var date = new Date();
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainReportPage.getTemperatureDetails()));
    });

    afterAll(function() {
      mainReportPage.clickReportListButton();
    });

    describe('check report list', function() {
      it('should have temperature details report', function() {
        expect(mainReportPage.getTemperatureDetails().isPresent()).toBeTruthy();
      });
    });

    describe('check temperature details report', function() {
      beforeAll(function() {
        mainReportPage.clickTemperatureDetails();
        browser.wait(testUtils.until.presenceOf(element(by.css('.report-control-panel'))));
      });

      describe('check elements', function() {
        it('should have report title', function() {
          expect(mainReportPage.getReportTitle().getText()).toEqual('Temperature details');
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

        it('should have to calendar', function() {
          expect(mainReportPage.getToCalendar().isDisplayed()).toBeTruthy();
        });

        it('should have to time', function() {
          expect(mainReportPage.getToTime().isDisplayed()).toBeTruthy();
        });

        it('should have select vehicles label', function() {
          expect(mainReportPage.getReportControlList().get(5).element(by.css('label')).getText()).toEqual('Select vehicles');
        });

        it('should have temperature range', function() {
          expect(mainReportPage.getTemperatureRange().count()).toBe(2);
        });

        it('should have temperature all range switcher', function() {
          expect(mainReportPage.getTemperatureAllRangeSwitcher().isPresent()).toBe(true);
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
          browser.wait(testUtils.until.presenceOf(mainReportPage.getChooseDay()));
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
          browser.wait(testUtils.until.presenceOf(mainReportPage.getChooseDay()));
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
