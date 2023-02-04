(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainReportPage = require('./MainReportPage');

  describe('on report page', function() {
    var date = new Date();
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainReportPage.getNotifications()));
    });

    afterAll(function() {
      mainReportPage.clickReportListButton();
    });

    describe('check report list', function() {
      it('should have notifications report', function() {
        expect(mainReportPage.getNotifications().isPresent()).toBeTruthy();
      });
    });

    describe('check notifications report', function() {
      beforeAll(function() {
        mainReportPage.clickNotifications();
        browser.wait(testUtils.until.presenceOf(element(by.css('.report-control-panel'))));
      });

      describe('check elements', function() {
        it('should have report title', function() {
          expect(mainReportPage.getReportTitle().getText()).toEqual('Notifications');
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

        it('should have status label', function() {
          expect(mainReportPage.getReportControlList().get(5).element(by.css('label')).getText()).toEqual('Status');
        });

        it('should have severity label', function() {
          expect(mainReportPage.getReportControlList().get(6).element(by.css('label')).getText()).toEqual('Severity');
        });

        it('should have business rules label', function() {
          expect(mainReportPage.getReportControlList().get(7).element(by.css('label')).getText()).toEqual('Business rules');
        });

        it('should have select machines label', function() {
          expect(mainReportPage.getReportControlList().get(8).element(by.css('label')).getText()).toEqual('Select machines');
        });

        it('should have select vehicles label', function() {
          expect(mainReportPage.getReportControlList().get(9).element(by.css('label')).getText()).toEqual('Select vehicles');
        });

        it('should have select drivers label', function() {
          expect(mainReportPage.getReportControlList().get(10).element(by.css('label')).getText()).toEqual('Select drivers');
        });

        it('should have tracked label', function() {
          expect(mainReportPage.getReportControlList().get(11).element(by.css('label')).getText()).toEqual('Tracked');
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
