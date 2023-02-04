(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    historyPanelPage = require('./HistoryPanelPage');

  describe('on history panel', function() {
    var date = new Date();

    describe('when elements checked', function() {
      beforeAll(function() {
        mainPage.clickTrackingViewTab();
        browser.wait(testUtils.until.presenceOf(mainPage.getHistoryButton()));
        mainPage.clickHistoryButton();
        browser.wait(testUtils.until.presenceOf(historyPanelPage.getHistoryPanel()));
        browser.wait(testUtils.until.presenceOf(historyPanelPage.getHistoryByResourceTab()));
      });

      it('should have by resource tab', function() {
        expect(historyPanelPage.getHistoryByResourceTab().isPresent()).toBe(true);
      });

      it('should have by location tab', function() {
        expect(historyPanelPage.getHistoryByLocationTab().isPresent()).toBe(true);
      });

      it('should have hide history panel button', function() {
        expect(historyPanelPage.getHistoryHideButton().isPresent()).toBe(true);
      });

      it('resource tab should be actived', function() {
        expect(historyPanelPage.getHistoryByResourceTab().getAttribute("class")).toContain("is-active");
      });

      describe('on by resource tab', function() {

        it('should have time frame today', function() {
          expect(historyPanelPage.getTimeFrameToday().isDisplayed()).toBeTruthy();
        });

        it('should have time frame yesterday', function() {
          expect(historyPanelPage.getTimeFrameYesterday().isDisplayed()).toBeTruthy();
        });

        it('should have time frame last7', function() {
          expect(historyPanelPage.getTimeFrameLast7days().isDisplayed()).toBeTruthy();
        });

        it('should have time frame custom', function() {
          expect(historyPanelPage.getTimeFrameCustom().isDisplayed()).toBeTruthy();
        });

        it('should have from_calendar', function() {
          expect(historyPanelPage.getFromCalendar().isDisplayed()).toBeTruthy();
        });

        it('should have from_time', function() {
          expect(historyPanelPage.getFromTime().isDisplayed()).toBeTruthy();
        });

        it('should have to_calendar', function() {
          expect(historyPanelPage.getToCalendar().isDisplayed()).toBeTruthy();
        });

        it('should have to_time', function() {
          expect(historyPanelPage.getToTime().isDisplayed()).toBeTruthy();
        });

        it('should have tracking_object dropdown', function() {
          expect(historyPanelPage.getTrackingObjectDropDown().isDisplayed()).toBeTruthy();
        });

        it('should have driver dropdown', function() {
          expect(historyPanelPage.getDriverDropdpwn().isDisplayed()).toBeTruthy();
        });

        it('should have reset button', function() {
          expect(historyPanelPage.getResetButton().isDisplayed()).toBeTruthy();
        });

        it('should have show button', function() {
          expect(historyPanelPage.getShowButton().isDisplayed()).toBeTruthy();
        });

        describe('when yesterday radio clicked', function() {
          beforeAll(function() {
            historyPanelPage.checkToClickYesterdayRadio();
          });

          afterAll(function() {
            browser.executeScript("arguments[0].click();", historyPanelPage.getFromCalendar().getWebElement());
          });

          it('check today ', function() {
            expect(historyPanelPage.getToday().getText()).toBe('' + date.getDate());
          });

          it('check yesterday ', function() {
            expect(historyPanelPage.getChooseDay().getText()).not.toBe('' + date.getDate());
          });
        });

        describe('when last 7 days radio clicked', function() {
          beforeAll(function() {
            historyPanelPage.checkToClickLast7Days();
          });

          afterAll(function() {
            browser.executeScript("arguments[0].click();", historyPanelPage.getFromCalendar().getWebElement());
          });

          it('check last 7 days ', function() {
            expect(historyPanelPage.getChooseDay().getText()).not.toBe('' + date.getDate());
          });
        });
      });

      describe('on by location tab', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getHistoryByLocationTab()));
          historyPanelPage.getHistoryByLocationTab().click();
          browser.wait(function() {
            return historyPanelPage.getHistoryByLocationTab().getAttribute("class").then(function(text) {
              return text.includes("is-active") == true;
            });
          });
        });

        it('should have time today radio', function() {
          expect(historyPanelPage.getHistoryLocationTodayRadio().isDisplayed()).toBe(true);
        });

        it('should have time yesterday radio', function() {
          expect(historyPanelPage.getHistoryLocationYesterdayRadio().isDisplayed()).toBe(true);
        });

        it('should have time last7day radio', function() {
          expect(historyPanelPage.getHistoryLocationLast7daysRadio().isDisplayed()).toBe(true);
        });

        it('should have time custom radio', function() {
          expect(historyPanelPage.getHistoryLocationCustomRadio().isDisplayed()).toBe(true);
        });

        it('should have from time input', function() {
          expect(historyPanelPage.getHistoryLocationTimeFromInput().isDisplayed()).toBe(true);
        });

        it('should have from calendar', function() {
          expect(historyPanelPage.getHistoryLocationTimeFromCalendar().isDisplayed()).toBe(true);
        });

        it('should have from time', function() {
          expect(historyPanelPage.getHistoryLocationTimeFrom().isDisplayed()).toBe(true);
        });

        it('should have to time input', function() {
          expect(historyPanelPage.getHistoryLocationTimeToInput().isDisplayed()).toBe(true);
        });

        it('should have to time calendar', function() {
          expect(historyPanelPage.getHistoryLocationTimeToCalendar().isDisplayed()).toBe(true);
        });

        it('should have to time', function() {
          expect(historyPanelPage.getHistoryLocationTimeTo().isDisplayed()).toBe(true);
        });

        it('should have location input', function() {
          expect(historyPanelPage.getLocationInput().isDisplayed()).toBe(true);
        });

        it('should have location radius input', function() {
          expect(historyPanelPage.getLocationRadiusInput().isPresent()).toBe(true);
        });
      });
    });

    describe('when hide panel clicked', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getHistoryHideButton()));
        historyPanelPage.getHistoryHideButton().click();
        browser.wait(testUtils.until.presenceOf(historyPanelPage.getHistoryOpenButton()));
      });

      it('history panel should be present', function() {
        expect(historyPanelPage.getHistoryPanel().isPresent()).toBe(true);
      });
    });
  });
})();
