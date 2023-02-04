(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainReportPage = require('./MainReportPage');

  describe('on report page', function() {
    var date = new Date();
    beforeAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getReportTab()));
      mainPage.clickReportTab();
      browser.wait(testUtils.until.presenceOf(mainReportPage.getGeozones()));
    });

    afterAll(function() {
      mainReportPage.clickReportListButton();
    });

    describe('check report list', function() {
      it('should have geozones report', function() {
        expect(mainReportPage.getGeozones().isPresent()).toBeTruthy();
      });
    });

    describe('check geozones report', function() {
      beforeAll(function() {
        mainReportPage.clickGeozones();
        browser.wait(testUtils.until.presenceOf(element(by.css('.report-control-panel'))));
      });

      describe('check elements', function() {

        it('should have report title', function() {
          expect(mainReportPage.getReportTitle().getText()).toEqual('Geozones');
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

        it('should have select machines label', function() {
          expect(mainReportPage.getOptionSelect().element(by.css('div.medium-12:nth-child(6) label')).getText()).toEqual('Select machines');
        });

        it('should have select vehicles label', function() {
          expect(mainReportPage.getOptionSelect().element(by.css('div.medium-12:nth-child(8) label')).getText()).toEqual('Select vehicles');
        });

        it('should have select workers label', function() {
          expect(mainReportPage.getOptionSelect().element(by.css('div.medium-12:nth-child(9) label')).getText()).toEqual('Select workers');
        });

        it('should have select objects label', function() {
          expect(mainReportPage.getOptionSelect().element(by.css('div.medium-12:nth-child(10) label')).getText()).toEqual('Select objects');
        });

        it('should have select drivers label', function() {
          expect(mainReportPage.getOptionSelect().element(by.css('div.medium-12:nth-child(11) label')).getText()).toEqual('Select drivers');
        });

        it('should have select geozones label', function() {
          expect(mainReportPage.getOptionSelect().element(by.css('div.medium-12:nth-child(12) label')).getText()).toEqual('Select geozones');
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

        it('check last 7 days', function() {
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

        it('check custom day', function() {
          expect(mainReportPage.getChooseDay().getAttribute('class')).not.toContain('today');
        });
      });
    });
  });
})();
