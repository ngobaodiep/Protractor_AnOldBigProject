(function() {
  'use strict';
  var testUtils = require("./TestUtils"),
    mainPage = require('./MainPage'),
    scheduleWocValidationReportPage = require("./ScheduleWocValidationReportPage");

  describe('on worker connect report', function() {

    beforeAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getTrackingTab()));
      mainPage.getTrackingTab().click();
      browser.wait(testUtils.until.presenceOf(element(by.css(".tracking-view"))));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getTimeBookingReportTab()));
      mainPage.clickTimeBookingReportTab();
      browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getWocReport()));
    });

    describe('when validation report filtered', function() {

      beforeAll(function() {
        browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getRadioCustom()));
        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getRadioCustom()));
        scheduleWocValidationReportPage.getRadioCustom().click();
        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getTimeFromInput()));

        scheduleWocValidationReportPage.getTimeFromInput().click();
        scheduleWocValidationReportPage.getTimeFromInput().sendKeys(protractor.Key.END);
        testUtils.clearString(scheduleWocValidationReportPage.getTimeFromInput(), 30);
        scheduleWocValidationReportPage.getTimeFromInput().sendKeys("01/06/2021 00:00");

        scheduleWocValidationReportPage.getTimeToInput().click();
        scheduleWocValidationReportPage.getTimeToInput().sendKeys(protractor.Key.END);
        testUtils.clearString(scheduleWocValidationReportPage.getTimeToInput(), 30);
        scheduleWocValidationReportPage.getTimeToInput().sendKeys("03/06/2021 23:59");

        browser.executeScript("arguments[0].scrollIntoView();", scheduleWocValidationReportPage.getFromTimeLabel().getWebElement());
        scheduleWocValidationReportPage.getSwitcherGroupsWorkers().click();
        browser.wait(function() {
          return element(by.css("#select-group")).getAttribute("class").then(function(cla) {
            return cla.includes("ng-not-empty") == true;
          });
        });

        browser.wait(testUtils.until.visibilityOf(scheduleWocValidationReportPage.getWorkerSelectorsWrap()));
        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getWorkerSelectorsWrap()));
        scheduleWocValidationReportPage.getWorkerSelectorsWrap().click();
        // browser.executeScript("arguments[0].click();", scheduleWocValidationReportPage.getWorkerSelectorsWrap().getWebElement());
        browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getDropdownList()));
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li', "test automated"))));
        browser.executeScript(
          "arguments[0].click();",
          element(by.cssContainingText('ul[aria-hidden="false"] li', "test automated")).getWebElement()
        );

        scheduleWocValidationReportPage.getTimeToInput().click();
        browser.wait(testUtils.until.stalenessOf(scheduleWocValidationReportPage.getDropdownList()));


        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getShowButton()));
        scheduleWocValidationReportPage.getShowButton().click();
        browser.wait(testUtils.until.stalenessOf(scheduleWocValidationReportPage.getReportLoader()));
        browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getReportRendingTemplate()));

      });

      describe('and view by worker,', function() {

        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getExpandAllButton()));
          scheduleWocValidationReportPage.getExpandAllButton().click();
          browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getAllTripRows()));
        });

        it('should have test automated in page selector', function() {
          expect(scheduleWocValidationReportPage.getPageSelectorInputWrap().isPresent()).toBe(true);
          expect(scheduleWocValidationReportPage.getPageSelectorInputWrap().getText()).toBe("test automated");
        });

        describe('on not validated record', function() {

          it('should have record date', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(1).medium-2")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(1).medium-2")).getAttribute("innerText")).toContain("01/06/2021");
          });

          it('should have activity circle', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).getCssValue("color")).toBe("rgb(127, 127, 127)");
          });

          it('should have activity name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).getAttribute("innerText")).toBe("Testing");
          });

          it('should have customer name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(3).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(3).medium-1")).getAttribute("innerText")).toBe("Bitnemo");
          });

          it('should have site', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(4).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(4).medium-1")).getAttribute("innerText")).toBe("Vietcombank");
          });

          it('should have start time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("00:00");
          });

          it('should have end time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("23:59");
          });

          it('should have duration', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).getAttribute("innerText")).toBe("23:59");
          });

          it('should have edit record button', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="editTimeRecord(record)"]')).isPresent()).toBe(true);
          });

          it('should have delete record button', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="deleteTimeRecord(record)"]')).isPresent()).toBe(true);
          });

          it('should have validated record button', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="validatedTimeBookingRecords(record)"]')).isPresent()).toBe(true);
          });
        });

        describe('on validated record', function() {

          it('should have record date', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(1).medium-2")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(1).medium-2")).getAttribute("innerText")).toContain("03/06/2021");
          });

          it('should have activity circle', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).getCssValue("color")).toBe("rgb(237, 28, 36)");
          });

          it('should have activity name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).getAttribute("innerText")).toBe("Working");
          });

          it('should have customer name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(3).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(3).medium-1")).getAttribute("innerText")).toBe("Bitnemo");
          });

          it('should have site', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(4).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(4).medium-1")).getAttribute("innerText")).toBe("Vietcombank");
          });

          it('should have start time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("08:15");
          });

          it('should have end time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("09:15");
          });

          it('should have duration', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(7).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(7).medium-1")).getAttribute("innerText")).toBe("01:00");
          });

          it('should have validated infor', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css(".validated-text")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css(".validated-text")).getAttribute("innerText")).toBe("Validated by capa ca on 08/06/2021 03:42");
          });
        });
      });

      describe('and view by activity', function() {

        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getViewByActivityButton()));
          scheduleWocValidationReportPage.getViewByActivityButton().click();
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getExpandAllButton()));
          scheduleWocValidationReportPage.getExpandAllButton().click();
          browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getAllTripRows()));
        });

        it('should have Testing in activity', function() {
          expect(scheduleWocValidationReportPage.getPageSelectorInputWrap().getText()).toBe("Testing");
        });

        describe('Testing', function() {
          it('should have record date', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(1).medium-2")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(1).medium-2")).getAttribute("innerText")).toContain("01/06/2021");
          });

          it('should have worker name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1")).getAttribute("innerText")).toBe("test automated");
          });

          it('should have customer name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(3).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(3).medium-1")).getAttribute("innerText")).toBe("Bitnemo");
          });

          it('should have site', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(4).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(4).medium-1")).getAttribute("innerText")).toBe("Vietcombank");
          });

          it('should have start time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("00:00");
          });

          it('should have end time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("23:59");
          });

          it('should have duration', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).getAttribute("innerText")).toBe("23:59");
          });

          it('should have edit record button', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="editTimeRecord(record)"]')).isPresent()).toBe(true);
          });

          it('should have delete record button', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="deleteTimeRecord(record)"]')).isPresent()).toBe(true);
          });

          it('should have validated record button', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="validatedTimeBookingRecords(record)"]')).isPresent()).toBe(true);
          });
        });

        describe('Working', function() {
          beforeAll(function() {
            browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getPageSelectorInputWrap()));
            scheduleWocValidationReportPage.getPageSelectorInputWrap().click();
            browser.executeScript(
              "arguments[0].click();",
              element(by.css('ul[aria-hidden="false"] li:nth-child(2)')).getWebElement()
            );

            browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getExpandAllButton()));
            scheduleWocValidationReportPage.getExpandAllButton().click();
            browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getAllTripRows()));
          });

          it('should have Working in activity', function() {
            expect(scheduleWocValidationReportPage.getPageSelectorInputWrap().getText()).toBe("Working");
          });

          it('should have record date', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(1).medium-2")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(1).medium-2")).getAttribute("innerText")).toContain("03/06/2021");
          });

          it('should have worker name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1")).getAttribute("innerText")).toBe("test automated");
          });

          it('should have customer name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(3).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(3).medium-1")).getAttribute("innerText")).toBe("Bitnemo");
          });

          it('should have site', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(4).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(4).medium-1")).getAttribute("innerText")).toBe("Vietcombank");
          });

          it('should have start time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("08:15");
          });

          it('should have end time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("09:15");
          });

          it('should have duration', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).getAttribute("innerText")).toBe("01:00");
          });

          it('should have validated infor', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css(".validated-text")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css(".validated-text")).getAttribute("innerText")).toBe("Validated by capa ca on 08/06/2021 03:42");
          });
        });
      });

      describe('and view by customer', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getViewByCustomerButton()));
          scheduleWocValidationReportPage.getViewByCustomerButton().click();
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getExpandAllButton()));
          scheduleWocValidationReportPage.getExpandAllButton().click();
          browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getAllTripRows()));
        });

        it('should have Bitnemo in page wrap', function() {
          expect(scheduleWocValidationReportPage.getPageSelectorInputWrap().getText()).toBe("Bitnemo");
        });

        describe('on not validated record', function() {

          it('should have record date', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(1).medium-2")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(1).medium-2")).getAttribute("innerText")).toContain("01/06/2021");
          });

          it('should have activity circle', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).getCssValue("color")).toBe("rgb(127, 127, 127)");
          });

          it('should have activity name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).getAttribute("innerText")).toBe("Testing");
          });

          it('should have worker name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(3).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(3).medium-1")).getAttribute("innerText")).toBe("test automated");
          });

          it('should have site', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(4).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(4).medium-1")).getAttribute("innerText")).toBe("Vietcombank");
          });

          it('should have start time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("00:00");
          });

          it('should have end time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("23:59");
          });

          it('should have duration', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).getAttribute("innerText")).toBe("23:59");
          });

          it('should have edit record button', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="editTimeRecord(record)"]')).isPresent()).toBe(true);
          });

          it('should have delete record button', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="deleteTimeRecord(record)"]')).isPresent()).toBe(true);
          });

          it('should have validated record button', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="validatedTimeBookingRecords(record)"]')).isPresent()).toBe(true);
          });
        });

        describe('on validated record', function() {

          it('should have record date', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(1).medium-2")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(1).medium-2")).getAttribute("innerText")).toContain("03/06/2021");
          });

          it('should have activity circle', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).getCssValue("color")).toBe("rgb(237, 28, 36)");
          });

          it('should have activity name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).getAttribute("innerText")).toBe("Working");
          });

          it('should have worker name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(3).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(3).medium-1")).getAttribute("innerText")).toBe("test automated");
          });

          it('should have site', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(4).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(4).medium-1")).getAttribute("innerText")).toBe("Vietcombank");
          });

          it('should have start time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("08:15");
          });

          it('should have end time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("09:15");
          });

          it('should have duration', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(7).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(7).medium-1")).getAttribute("innerText")).toBe("01:00");
          });

          it('should have validated infor', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css(".validated-text")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css(".validated-text")).getAttribute("innerText")).toBe("Validated by capa ca on 08/06/2021 03:42");
          });
        });
      });

      describe('and view by site', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getViewBySiteButton()));
          scheduleWocValidationReportPage.getViewBySiteButton().click();
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getExpandAllButton()));
          scheduleWocValidationReportPage.getExpandAllButton().click();
          browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getAllTripRows()));
        });

        it('should have Vietcombank in page wrap', function() {
          expect(scheduleWocValidationReportPage.getPageSelectorInputWrap().getText()).toBe("Vietcombank");
        });

        describe('on not validated record', function() {

          it('should have record date', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(1).medium-2")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(1).medium-2")).getAttribute("innerText")).toContain("01/06/2021");
          });

          it('should have activity circle', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).getCssValue("color")).toBe("rgb(127, 127, 127)");
          });

          it('should have activity name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).getAttribute("innerText")).toBe("Testing");
          });

          it('should have worker name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(3).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(3).medium-1")).getAttribute("innerText")).toBe("test automated");
          });

          it('should have customer', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(4).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(4).medium-1")).getAttribute("innerText")).toBe("Bitnemo");
          });

          it('should have start time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("00:00");
          });

          it('should have end time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("23:59");
          });

          it('should have duration', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).getAttribute("innerText")).toBe("23:59");
          });

          it('should have edit record button', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="editTimeRecord(record)"]')).isPresent()).toBe(true);
          });

          it('should have delete record button', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="deleteTimeRecord(record)"]')).isPresent()).toBe(true);
          });

          it('should have validated record button', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="validatedTimeBookingRecords(record)"]')).isPresent()).toBe(true);
          });
        });

        describe('on validated record', function() {

          it('should have record date', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(1).medium-2")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(1).medium-2")).getAttribute("innerText")).toContain("03/06/2021");
          });

          it('should have activity circle', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).getCssValue("color")).toBe("rgb(237, 28, 36)");
          });

          it('should have activity name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).getAttribute("innerText")).toBe("Working");
          });

          it('should have worker name', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(3).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(3).medium-1")).getAttribute("innerText")).toBe("test automated");
          });

          it('should have customer', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(4).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(4).medium-1")).getAttribute("innerText")).toBe("Bitnemo");
          });

          it('should have start time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("08:15");
          });

          it('should have end time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("09:15");
          });

          it('should have duration', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(7).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css("div:nth-child(7).medium-1")).getAttribute("innerText")).toBe("01:00");
          });

          it('should have validated infor', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css(".validated-text")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(2).element(by.css(".validated-text")).getAttribute("innerText")).toBe("Validated by capa ca on 08/06/2021 03:42");
          });
        });
      });
    });
  });
})();
