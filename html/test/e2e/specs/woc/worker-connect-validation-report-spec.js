(function() {
  'use strict';

  var testUtils = require("./TestUtils"),
    mainPage = require('./MainPage'),
    warnModal = require("./WarnModal"),
    fs = require("fs"),
    glob = require("glob"),
    scheduleWocValidationReportPage = require("./ScheduleWocValidationReportPage");

  describe('on validation report', function() {
    var fileName;
    var pathFolder;
    var files = [];
    var filesArray = [];
    var today = new Date(),
      todayString = (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + "/" +
      (today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1) + "/" + today.getFullYear();

    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainPage.getTimeBookingReportTab()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getTimeBookingReportTab()));
      mainPage.clickTimeBookingReportTab();
      browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getWocReport()));
      browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getSwitcherGroupsWorkers()));
      browser.wait(testUtils.until.presenceOf(element(by.css("#groupsTreeContainerReport ul.k-group"))));
    });

    describe('when elements checked', function() {

      it('should have filter title', function() {
        expect(scheduleWocValidationReportPage.getFilterTitle().isPresent()).toBe(true);
      });

      it('should have show hide panel button', function() {
        expect(scheduleWocValidationReportPage.getShowHidePanelButton().isPresent()).toBe(true);
      });

      it('should have choose time title', function() {
        expect(scheduleWocValidationReportPage.getChooseTimeTitle().isPresent()).toBe(true);
      });

      it('should have radio this week', function() {
        expect(scheduleWocValidationReportPage.getRadioThisWeek().isPresent()).toBe(true);
      });

      it('should have radio this month', function() {
        expect(scheduleWocValidationReportPage.getRadioThisMonth().isPresent()).toBe(true);
      });

      it('should have radio last week', function() {
        expect(scheduleWocValidationReportPage.getRadioLastWeek().isPresent()).toBe(true);
      });

      it('should have radio last month', function() {
        expect(scheduleWocValidationReportPage.getRadioLastMonth().isPresent()).toBe(true);
      });

      it('should have from time label', function() {
        expect(scheduleWocValidationReportPage.getFromTimeLabel().isPresent()).toBe(true);
      });

      it('should have to time label', function() {
        expect(scheduleWocValidationReportPage.getToTimeLabel().isPresent()).toBe(true);
      });

      it('should have from time input', function() {
        expect(scheduleWocValidationReportPage.getTimeFromInput().isPresent()).toBe(true);
      });

      it('should have to time input', function() {
        expect(scheduleWocValidationReportPage.getTimeToInput().isPresent()).toBe(true);
      });

      it('should have show only validated events', function() {
        expect(scheduleWocValidationReportPage.getShowOnlyValidatedEvents().isPresent()).toBe(true);
      });

      it('should have groups workers switcher', function() {
        expect(scheduleWocValidationReportPage.getSwitcherGroupsWorkers().isPresent()).toBe(true);
      });

      it('should have select activity title', function() {
        expect(scheduleWocValidationReportPage.getSelectActivitiesTitle().isPresent()).toBe(true);
      });

      it('should have select activity wrap', function() {
        expect(scheduleWocValidationReportPage.getSelectActivitiesWrap().isPresent()).toBe(true);
      });

      it('should have select customers title', function() {
        expect(scheduleWocValidationReportPage.getSelectCustomersTitle().isPresent()).toBe(true);
      });

      it('should have select customers wrap', function() {
        expect(scheduleWocValidationReportPage.getSelectCustomersWrap().isPresent()).toBe(true);
      });

      it('should have select sites title', function() {
        expect(scheduleWocValidationReportPage.getSelectSitesTitle().isPresent()).toBe(true);
      });

      it('should have select sites wrap', function() {
        expect(scheduleWocValidationReportPage.getSelectSitesWrap().isPresent()).toBe(true);
      });

      it('should have reset button', function() {
        expect(scheduleWocValidationReportPage.getResetButton().isPresent()).toBe(true);
      });

      it('should have show button', function() {
        expect(scheduleWocValidationReportPage.getShowButton().isPresent()).toBe(true);
      });

      it('should have report header title', function() {
        expect(scheduleWocValidationReportPage.getWocReportHeaderTitle().isPresent()).toBe(true);
      });

      it('should have options button', function() {
        expect(scheduleWocValidationReportPage.getOptionsButton().isPresent()).toBe(true);
      });

      it('should have create entry button', function() {
        expect(scheduleWocValidationReportPage.getCreateEntryButton().isPresent()).toBe(true);
      });

      it('should have init message', function() {
        expect(scheduleWocValidationReportPage.getInitMessage().isPresent()).toBe(true);
        expect(scheduleWocValidationReportPage.getInitMessage().getText()).toBe("Please select filters and click the show button to display the report");
      });

      describe('when workers switcher actived', function() {

        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getSwitcherGroupsWorkers()));
          scheduleWocValidationReportPage.getSwitcherGroupsWorkers().click();
          browser.executeScript(
            "arguments[0].click();",
            scheduleWocValidationReportPage.getSwitcherGroupsWorkers()
            .getWebElement()
          );
          browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getSwitcherWorkersActive()));
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getSwitcherWorkersActive()));
        });

        it('should have select workers title', function() {
          expect(scheduleWocValidationReportPage.getSelectWorkersTitle().isPresent()).toBe(true);
        });

        it('should have select workers wrap', function() {
          expect(scheduleWocValidationReportPage.getSelectWorkerWrap().isPresent()).toBe(true);
        });
      });
    });

    describe('when record created', function() {

      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getCreateEntryButton()));
        scheduleWocValidationReportPage.getCreateEntryButton().click();
        browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getCreateModalForm()));
      });

      describe('on create modal', function() {

        it('should have create modal', function() {
          expect(scheduleWocValidationReportPage.getCreateModal().isPresent()).toBe(true);
        });

        it('should have create modal title', function() {
          expect(scheduleWocValidationReportPage.getCreateModalTitle().isPresent()).toBe(true);
        });

        it('should have create modal form', function() {
          expect(scheduleWocValidationReportPage.getCreateModalForm().isPresent()).toBe(true);
        });

        it('should have worker selector wrap', function() {
          expect(scheduleWocValidationReportPage.getCmWorkerSelectorWrap().isPresent()).toBe(true);
        });

        it('should have site selector wrap', function() {
          expect(scheduleWocValidationReportPage.getCmSiteSelectorWrap().isPresent()).toBe(true);
        });

        it('should have start time', function() {
          expect(scheduleWocValidationReportPage.getCmStartTime().isPresent()).toBe(true);
        });

        it('should have end time', function() {
          expect(scheduleWocValidationReportPage.getCmEndTime().isPresent()).toBe(true);
        });

        it('should have activity selector wrap', function() {
          expect(scheduleWocValidationReportPage.getCmActivitySelectorWrap().isPresent()).toBe(true);
        });

        it('should have customer selector wrap', function() {
          expect(scheduleWocValidationReportPage.getCmCustomerSelectorWrap().isPresent()).toBe(true);
        });

        it('should have validated switcher', function() {
          expect(scheduleWocValidationReportPage.getCmValidateSwitcher().isPresent()).toBe(true);
        });

        it('should have cancel button', function() {
          expect(scheduleWocValidationReportPage.getCancelBtn().isPresent()).toBe(true);
        });

        it('should have save button', function() {
          expect(scheduleWocValidationReportPage.getSaveBtn().isPresent()).toBe(true);
        });
      });

      describe('in today', function() {

        beforeAll(function() {
          console.log("in today");
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getCmStartTime()),3000,"g");
          scheduleWocValidationReportPage.getCmStartTime().click();
          scheduleWocValidationReportPage.getCmStartTime().sendKeys(protractor.Key.END);
          testUtils.clearString(scheduleWocValidationReportPage.getCmStartTime());
          scheduleWocValidationReportPage.getCmStartTime().sendKeys(todayString + " 01:00");

          scheduleWocValidationReportPage.getCmEndTime().click();
          scheduleWocValidationReportPage.getCmEndTime().sendKeys(protractor.Key.END);
          testUtils.clearString(scheduleWocValidationReportPage.getCmEndTime());
          scheduleWocValidationReportPage.getCmEndTime().sendKeys(todayString + " 02:00");

          browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getCmWorkerSelectorWrap()),3000,"g1");
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getCmWorkerSelectorWrap()),3000,"g2");
          scheduleWocValidationReportPage.getCmWorkerSelectorWrap().click();
          browser.executeScript(
            "arguments[0].click();",
            scheduleWocValidationReportPage.getCmWorkerSelectorWrap()
            .getWebElement()
          );
          browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"]'))),3000,"g3");
          browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li', 'test automated'))));
          browser.executeScript(
            "arguments[0].click();",
            element(by.cssContainingText('ul[aria-hidden="false"] li', 'test automated'))
            .getWebElement()
          );
          browser.wait(testUtils.until.stalenessOf(element(by.cssContainingText('ul[aria-hidden="false"] li', 'test automated'))));
          element.all(by.css('ul[aria-hidden="false"] li')).each(function(elm,id){
            elm.getAttribute('innerText').then(function (text) {
              // console.log(text,'\n');
              if(text.includes("test automated") == true){

                browser.executeScript(
                  "arguments[0].click();",
                  elm
                  .getWebElement()
                );
              }
            });
          }).then(function () {


          browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"]'))),3000,"g4");


          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getCmSiteSelectorWrap()),3000,"g5");
          scheduleWocValidationReportPage.getCmSiteSelectorWrap().click();
          browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li span', 'VCB'))),3000,"g6");
          browser.executeScript(
            "arguments[0].click();",
            element(by.cssContainingText('ul[aria-hidden="false"] li span', 'VCB'))
            .getWebElement()
          );
          browser.wait(testUtils.until.stalenessOf(element(by.cssContainingText('ul[aria-hidden="false"] li span', 'VCB'))),3000,"g7");

          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getCmActivitySelectorWrap()),3000,"g8");
          scheduleWocValidationReportPage.getCmActivitySelectorWrap().click();
          browser.executeScript(
            "arguments[0].click();",
            scheduleWocValidationReportPage.getCmActivitySelectorWrap()
            .getWebElement()
          );
          browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li span:nth-child(2)', 'Testing'))),3000,"g9");
          browser.executeScript(
            "arguments[0].click();",
            element(by.cssContainingText('ul[aria-hidden="false"] li span:nth-child(2)', 'Testing'))
            .getWebElement()
          );
          browser.wait(testUtils.until.stalenessOf(element(by.cssContainingText('ul[aria-hidden="false"] li span:nth-child(2)', 'Testing'))),3000,"g10");


          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getCmCustomerSelectorWrap()),3000,"g11");
          scheduleWocValidationReportPage.getCmCustomerSelectorWrap().click();
          browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li', 'Bitnemo'))),3000,"g12");
          browser.executeScript(
            "arguments[0].click();",
            element(by.cssContainingText('ul[aria-hidden="false"] li', 'Bitnemo'))
            .getWebElement()
          );

          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getSaveBtn()),3000,"g12");
          scheduleWocValidationReportPage.getSaveBtn().click();
          browser.wait(testUtils.until.stalenessOf(scheduleWocValidationReportPage.getCreateModal()),3000,"g13");

          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getResetButton()),3000,"g14");
          scheduleWocValidationReportPage.getResetButton().click();


          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getRadioCustom()),3000,"g15");
          scheduleWocValidationReportPage.getRadioCustom().click();
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getTimeFromInput()),3000,"g16");

          scheduleWocValidationReportPage.getTimeFromInput().click();
          scheduleWocValidationReportPage.getTimeFromInput().sendKeys(protractor.Key.END);
          testUtils.clearString(scheduleWocValidationReportPage.getTimeFromInput(), 30);
          scheduleWocValidationReportPage.getTimeFromInput().sendKeys(todayString + " 00:00");

          scheduleWocValidationReportPage.getTimeToInput().click();
          scheduleWocValidationReportPage.getTimeToInput().sendKeys(protractor.Key.END);
          testUtils.clearString(scheduleWocValidationReportPage.getTimeToInput(), 30);
          scheduleWocValidationReportPage.getTimeToInput().sendKeys(todayString + " 23:59");

          // scheduleWocValidationReportPage.getSwitcherGroupsWorkers().click();
          browser.executeScript(
            "arguments[0].click();",
            scheduleWocValidationReportPage.getSwitcherGroupsWorkers().getWebElement()
          );
          browser.wait(function() {
            return element(by.css("#select-group")).getAttribute("class").then(function(cla) {
              return cla.includes("ng-not-empty") == true;
            });
          },3000,"g17");

          browser.executeScript('arguments[0].scrollIntoView()', scheduleWocValidationReportPage.getSelectWorkersTitle().getWebElement());

          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getWorkerSelectorsWrap()),3000,"g18");
          scheduleWocValidationReportPage.getWorkerSelectorsWrap().click();
          browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getDropdownList()),3000,"g19");
          browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li', "test automated"))),3000,"g20");
          browser.executeScript(
            "arguments[0].click();",
            element(by.cssContainingText('ul[aria-hidden="false"] li', "test automated")).getWebElement()
          );

          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getShowButton()),3000,"g21");
          scheduleWocValidationReportPage.getShowButton().click();

          browser.wait(testUtils.until.stalenessOf(scheduleWocValidationReportPage.getReportLoader()),3000,"g22");
          browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getReportRendingTemplate()),3000,"g23");
          browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getAllReportTotalDay()),3000,"g24");
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getAllReportTotalDay().get(0)),3000,"g25");
        });
        });

        describe('and all record expanded', function() {

          beforeAll(function() {
            browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getExpandAllButton()), 3000, "a23");
            // scheduleWocValidationReportPage.getExpandAllButton().click();
            browser.executeScript(
              "arguments[0].click();",
              scheduleWocValidationReportPage.getExpandAllButton()
              .getWebElement()
            );
            browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getAllTripRows()), 3000, "a24");
          });

          it('should have new record', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().count()).toBeGreaterThan(0);
          });

          it('date should be today', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(1).medium-2")).getAttribute("innerText")).toContain(todayString);
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
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(4).medium-1")).getAttribute("innerText")).toBe("VCB");
          });

          it('should have start time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("01:00");
          });

          it('should have end time', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("02:00");
          });

          it('should have duration', function() {
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).isPresent()).toBe(true);
            expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).getAttribute("innerText")).toBe("01:00");
          });
        });
      });
    });

    describe('when record edited', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="editTimeRecord(record)"]'))));
        scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="editTimeRecord(record)"]')).click();
        browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getCreateModal()));

        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getCmStartTime()));
        scheduleWocValidationReportPage.getCmStartTime().click();
        scheduleWocValidationReportPage.getCmStartTime().sendKeys(protractor.Key.END);
        testUtils.clearString(scheduleWocValidationReportPage.getCmStartTime());
        scheduleWocValidationReportPage.getCmStartTime().sendKeys(todayString + " 01:30");

        scheduleWocValidationReportPage.getCmEndTime().click();
        scheduleWocValidationReportPage.getCmEndTime().sendKeys(protractor.Key.END);
        testUtils.clearString(scheduleWocValidationReportPage.getCmEndTime());
        scheduleWocValidationReportPage.getCmEndTime().sendKeys(todayString + " 02:30");

        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getCmWorkerSelectorWrap()));
        scheduleWocValidationReportPage.getCmWorkerSelectorWrap().click();
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li', 'An Nguyen'))));
        browser.executeScript(
          "arguments[0].click();",
          element(by.cssContainingText('ul[aria-hidden="false"] li', 'An Nguyen'))
          .getWebElement()
        );
        browser.wait(testUtils.until.stalenessOf(element(by.cssContainingText('ul[aria-hidden="false"] li', 'An Nguyen'))));


        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getCmSiteSelectorWrap()));
        scheduleWocValidationReportPage.getCmSiteSelectorWrap().click();
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li span', 'An Home'))));
        browser.executeScript(
          "arguments[0].click();",
          element(by.cssContainingText('ul[aria-hidden="false"] li span', 'An Home'))
          .getWebElement()
        );
        browser.wait(testUtils.until.stalenessOf(element(by.cssContainingText('ul[aria-hidden="false"] li span', 'An Home'))));

        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getCmActivitySelectorWrap()));
        // scheduleWocValidationReportPage.getCmActivitySelectorWrap().click();
        browser.executeScript(
          "arguments[0].click();",
          scheduleWocValidationReportPage.getCmActivitySelectorWrap()
          .getWebElement()
        );
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li span:nth-child(2)', 'Working'))));
        browser.executeScript(
          "arguments[0].click();",
          element(by.cssContainingText('ul[aria-hidden="false"] li span:nth-child(2)', 'Working'))
          .getWebElement()
        );
        browser.wait(testUtils.until.stalenessOf(element(by.cssContainingText('ul[aria-hidden="false"] li span:nth-child(2)', 'Working'))));

        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getSaveBtn()), 3000, "b1");
        scheduleWocValidationReportPage.getSaveBtn().click();
        browser.wait(testUtils.until.stalenessOf(scheduleWocValidationReportPage.getCreateModal()));

        browser.wait(testUtils.until.elementToBeClickable(element(by.css('#wocSelectWorkers ul[role="listbox"] li:nth-child(1) .k-i-close'))));
        element(by.css('#wocSelectWorkers ul[role="listbox"] li:nth-child(1) .k-i-close')).click();

        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getWorkerSelectorsWrap()));
        scheduleWocValidationReportPage.getWorkerSelectorsWrap().click();
        browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getDropdownList()));
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('ul[aria-hidden="false"] li', "An Nguyen"))));
        browser.executeScript(
          "arguments[0].click();",
          element(by.cssContainingText('ul[aria-hidden="false"] li', "An Nguyen")).getWebElement()
        );


        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getShowButton()));
        scheduleWocValidationReportPage.getShowButton().click();

        browser.wait(testUtils.until.stalenessOf(scheduleWocValidationReportPage.getReportLoader()), 3000, "a1");
        browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getReportRendingTemplate()), 3000, "a2");

        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getExpandAllButton()), 3000, "a21");
        scheduleWocValidationReportPage.getExpandAllButton().click();
        browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getAllTripRows()), 3000, "a22");
      });

      it('should have edited record', function() {
        expect(scheduleWocValidationReportPage.getAllTripRows().count()).toBeGreaterThan(0);
      });

      it('date should be today', function() {
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(1).medium-2")).getAttribute("innerText")).toContain(todayString);
      });

      it('should have activity circle', function() {
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).isPresent()).toBe(true);
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(1).medium-3 span")).getCssValue("color")).toBe('rgb(237, 28, 36)');
      });

      it('should have activity name', function() {
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).isPresent()).toBe(true);
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(2).medium-1 div:nth-child(2)")).getAttribute("innerText")).toBe("Working");
      });

      it('should have customer name', function() {
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(3).medium-1")).isPresent()).toBe(true);
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(3).medium-1")).getAttribute("innerText")).toBe("Bitnemo");
      });

      it('should have site', function() {
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(4).medium-1")).isPresent()).toBe(true);
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(4).medium-1")).getAttribute("innerText")).toBe("An Home");
      });

      it('should have start time', function() {
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(5).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("01:30");
      });

      it('should have end time', function() {
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).isPresent()).toBe(true);
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(6).medium-1 .timebooking-text-center")).getAttribute("innerText")).toBe("02:30");
      });

      it('should have duration', function() {
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).isPresent()).toBe(true);
        expect(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css("div:nth-child(7).medium-1")).getAttribute("innerText")).toBe("01:00");
      });
    });

    describe('when record deleted', function() {

      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="deleteTimeRecord(record)"]'))));
        scheduleWocValidationReportPage.getAllTripRows().get(0).element(by.css('div:nth-child(9).medium-2 a[ng-click="deleteTimeRecord(record)"]')).click();
        browser.wait(testUtils.until.presenceOf(warnModal.getWarnModal()));
      });

      it('should have warn modal', function() {
        expect(warnModal.getWarnModal().isPresent()).toBe(true);
      });

      it('should have warn title', function() {
        expect(warnModal.getWarnModalTitle().isPresent()).toBe(true);
        expect(warnModal.getWarnModalTitle().getText()).toContain("Delete time record");
      });

      it('should have confirmation', function() {
        expect(warnModal.getWarnModalConfirmation().isPresent()).toBe(true);
        expect(warnModal.getWarnModalConfirmation().getText()).toContain("Your are about to delete a time record.");
      });

      it('should have warn message', function() {
        expect(warnModal.getWarnModalMessage().isPresent()).toBe(true);
        expect(warnModal.getWarnModalMessage().getText()).toContain("Are you sure you want to continue ?");
      });

      it('should have confirm button', function() {
        expect(warnModal.getWarnModalConfirmBtn().isPresent()).toBe(true);
      });

      it('should have warn cancel button', function() {
        expect(warnModal.getWarnModalCancelBtn().isPresent()).toBe(true);
      });

      describe('and warn confirmation button clicked', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(warnModal.getWarnModalConfirmBtn()));
          warnModal.getWarnModalConfirmBtn().click();
          browser.wait(testUtils.until.stalenessOf(warnModal.getWarnModal()));
          browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getReportLoader()));
          browser.wait(testUtils.until.stalenessOf(scheduleWocValidationReportPage.getReportLoader()));
          browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getReportRendingTemplate()));
        });

        it('should have no record', function() {
          expect(scheduleWocValidationReportPage.getAllTripRows().count()).toBe(0);
        });
      });
    });

    describe('when reports exported', function() {

      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getOptionsButton()));
        scheduleWocValidationReportPage.getOptionsButton().click();
        browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getExportPdf()));
      });

      it('should have export pdf button', function() {
        expect(scheduleWocValidationReportPage.getExportPdf().isPresent()).toBe(true);
      });

      it('should have export excel button', function() {
        expect(scheduleWocValidationReportPage.getExportExcel().isPresent()).toBe(true);
      });

      it('should have export domus button', function() {
        expect(scheduleWocValidationReportPage.getExportDomus().isPresent()).toBe(true);
      });

      describe('by pdf', function() {

        beforeAll(function() {

          pathFolder = process.cwd() + "/resources/test/export_file";
          fileName = pathFolder + "/*.*";
          try {
            files = fs.readdirSync(pathFolder);
            for (var i = 0; i < files.length; i++) {
              if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
                fs.unlinkSync(pathFolder + "/" + files[i]);
              }
            }
          } catch (e) {
            return;
          }

          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getExportPdf()));
          scheduleWocValidationReportPage.getExportPdf().click();

          browser.driver
            .wait(function() {
              filesArray = glob.sync(pathFolder + "/*.pdf");
              if (typeof filesArray != "undefined" && filesArray.length > 0) {
                return filesArray;
              }
            })
            .then(function(arr) {
              fileName = arr[0];
            });

          browser.wait(testUtils.until.stalenessOf(scheduleWocValidationReportPage.getReportLoader()));

        });

        it("file should be in download directory ", function() {
          expect(fs.existsSync(fileName)).toBe(true);
        });

        it('description', function() {
          expect(fileName).toContain("pdf");
        });
      });

      describe('by excel', function() {
        beforeAll(function(){
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getOptionsButton()));
          scheduleWocValidationReportPage.getOptionsButton().click();
          browser.wait(testUtils.until.stalenessOf(scheduleWocValidationReportPage.getExportPdf()));

          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getOptionsButton()));
          scheduleWocValidationReportPage.getOptionsButton().click();
          browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getExportPdf()));

          try {
            files = fs.readdirSync(pathFolder);
            for (var i = 0; i < files.length; i++) {
              if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
                fs.unlinkSync(pathFolder + "/" + files[i]);
              }
            }
          } catch (e) {
            return;
          }

          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getExportExcel()));
          scheduleWocValidationReportPage.getExportExcel().click();

          browser.driver
            .wait(function() {
              filesArray = glob.sync(pathFolder + "/*.xlsx");
              if (typeof filesArray != "undefined" && filesArray.length > 0) {
                return filesArray;
              }
            })
            .then(function(arr) {
              fileName = arr[0];
            });

          browser.wait(testUtils.until.stalenessOf(scheduleWocValidationReportPage.getReportLoader()));
        });

        it("file should be in download directory ", function() {
          expect(fs.existsSync(fileName)).toBe(true);
        });

        it('description', function() {
          expect(fileName).toContain("xlsx");
        });
      });

      describe('domus', function() {
        beforeAll(function(){
          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getOptionsButton()));
          scheduleWocValidationReportPage.getOptionsButton().click();
          browser.wait(testUtils.until.stalenessOf(scheduleWocValidationReportPage.getExportPdf()));

          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getOptionsButton()));
          scheduleWocValidationReportPage.getOptionsButton().click();
          browser.wait(testUtils.until.presenceOf(scheduleWocValidationReportPage.getExportPdf()));

          try {
            files = fs.readdirSync(pathFolder);
            for (var i = 0; i < files.length; i++) {
              if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
                fs.unlinkSync(pathFolder + "/" + files[i]);
              }
            }
          } catch (e) {
            return;
          }

          browser.wait(testUtils.until.elementToBeClickable(scheduleWocValidationReportPage.getExportDomus()));
          scheduleWocValidationReportPage.getExportDomus().click();

          browser.driver
            .wait(function() {
              filesArray = glob.sync(pathFolder + "/*.txt");
              if (typeof filesArray != "undefined" && filesArray.length > 0) {
                return filesArray;
              }
            })
            .then(function(arr) {
              fileName = arr[0];
            });

          browser.wait(testUtils.until.stalenessOf(scheduleWocValidationReportPage.getReportLoader()));
        });

        it("file should be in download directory ", function() {
          expect(fs.existsSync(fileName)).toBe(true);
        });

        it('description', function() {
          expect(fileName).toContain("txt");
        });
      });
    });
  });
})();
