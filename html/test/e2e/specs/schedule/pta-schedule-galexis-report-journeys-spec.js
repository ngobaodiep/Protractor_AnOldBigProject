(function() {
  "use strict";
  var amsMainPage = require("./AMSMainPage"),
    mainPage = require("../../MainPage"),
    mainReportPage = require("../../MainReportPage"),
    reportListPage = require("./ReportListPage"),
    amsAccountsViewPage = require("./AMSAccountsViewPage"),
    testUtils = require("../../TestUtils");

  describe("On acc Galexis", function() {
    var selected_departure_time,
      selected_departure_location,
      selected_journey_distance,
      selected_journey_duration,
      selected_arrival_time,
      selected_arrival_location,
      selected_stop_duration,
      selected_engagement_duration,
      total_week_journey_distance,
      total_week_journey_duration,
      total_week_stop_duration,
      total_week_engagement_duration,
      firstTripStartTime,
      firstTripAddress,
      totalDistance,
      totalJourneyDuration,
      lastTripEndTime,
      lastTripAddress,
      totalStopDuration,
      totalEngagement,
      totalDuration,
      lapse_total_journey_distance,
      lapse_total_journey_duration,
      lapse_total_stop_duration,
      lapse_total_engagement_duration,
      dayTripInfo,
      selected_day,
      last_friday,
      numberOfTrips,
      arr = [];

    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(amsMainPage.getAccountsView()));
      browser.wait(testUtils.until.stalenessOf(amsMainPage.getLoadingMask()));
      amsAccountsViewPage.loginWithAccount("galexis");
    });
    describe("check Journey Report", function() {
      beforeAll(function() {
        totalDistance = Number(0.0);
        totalJourneyDuration = Number(0);
        totalStopDuration = Number(0);
        totalEngagement = Number(0);
        totalDuration = Number(0);

        last_friday = reportListPage.getLastDayOccurence(new Date(), "Fri");
        selected_day =
          (last_friday.getUTCDate() < 10 ?
            "0" + last_friday.getUTCDate() :
            last_friday.getUTCDate()) +
          "/" +
          (last_friday.getUTCMonth() < 9 ?
            "0" + (last_friday.getUTCMonth() + 1) :
            last_friday.getUTCMonth() + 1) +
          "/" +
          last_friday.getUTCFullYear();

        browser.wait(testUtils.until.presenceOf(mainPage.getReportTab()));
        browser.wait(testUtils.until.elementToBeClickable(mainPage.getReportTab()));
        mainPage.clickReportTab();
        browser.wait(testUtils.until.presenceOf(mainReportPage.getReportView()));
        browser.wait(testUtils.until.presenceOf(reportListPage.getJourneysCard()));
        browser.wait(testUtils.until.elementToBeClickable(reportListPage.getJourneysCard()));
        reportListPage.clickJourneysCard();

        browser.wait(testUtils.until.presenceOf(reportListPage.getReportControlPanel()));
        browser.wait(testUtils.until.presenceOf(reportListPage.getCustomDayRadio()));
        browser.wait(testUtils.until.elementToBeClickable(reportListPage.getCustomDayRadio()));
        reportListPage.clickCustomDayRadio();

        browser.wait(testUtils.until.elementToBeClickable(reportListPage.getTimeFromInput()));
        reportListPage.clickTimeFromInput();
        reportListPage.getTimeFromInput().sendKeys(protractor.Key.END);
        reportListPage.clearString(reportListPage.getTimeFromInput());
        reportListPage.getTimeFromInput().sendKeys(selected_day + " 00:00");

        browser.executeScript("arguments[0].scrollIntoView()", reportListPage.getTimeToInput().getWebElement());
        reportListPage.clickTimeToInput();
        reportListPage.getTimeToInput().sendKeys(protractor.Key.END);
        reportListPage.clearString(reportListPage.getTimeToInput());
        reportListPage.getTimeToInput().sendKeys(selected_day + " 23:59");

        browser.wait(function() {
          return reportListPage
            .getTimeToInput()
            .getAttribute("value")
            .then(function(value) {
              return value.includes(selected_day) == true;
            });
        });

        reportListPage.chooseVehicle();
        browser.wait(testUtils.until.elementToBeClickable(reportListPage.getShowBtn()));
        reportListPage.clickShowBtn();
        browser.wait(testUtils.until.stalenessOf(reportListPage.getLoaderOverlaySpinner()));
        browser.wait(testUtils.until.presenceOf(reportListPage.getSelectedTotalDayRow()));

        browser.wait(
          testUtils.until.visibilityOf(
            reportListPage
            .getSelectedTotalDayRow()
            .element(by.css("div:nth-child(1).medium-3 div:nth-child(1).medium-4"))
          ));

        dayTripInfo = reportListPage
          .getSelectedTotalDayRow()
          .element(by.css("div:nth-child(1).medium-3 div:nth-child(1).medium-4"))
          .getText()
          .then(function(text) {
            return text;
          });

        selected_departure_time = reportListPage
          .getSelectedTotalDayRow()
          .element(
            by.css("div:nth-child(1).medium-3 div:nth-child(2).medium-4"))
          .getText()
          .then(function(text) {
            return text;
          });

        selected_departure_location = reportListPage
          .getSelectedTotalDayRow()
          .element(by.css("div:nth-child(1) div:nth-child(3).medium-4"))
          .getText()
          .then(function(text) {
            return text;
          });

        selected_journey_distance = reportListPage
          .getSelectedTotalDayRow()
          .element(by.css("div:nth-child(2).medium-4 div:nth-child(1).medium-3"))
          .getText()
          .then(function(text) {
            return text;
          });

        selected_journey_duration = reportListPage
          .getSelectedTotalDayRow()
          .element(by.css("div:nth-child(2).medium-4 div:nth-child(2).medium-3.ng-binding"))
          .getText()
          .then(function(text) {
            return text;
          });

        selected_arrival_time = reportListPage
          .getSelectedTotalDayRow()
          .element(by.css("div:nth-child(3).medium-3 div:nth-child(1).medium-4"))
          .getText()
          .then(function(text) {
            return text;
          });

        selected_arrival_location = reportListPage
          .getSelectedTotalDayRow()
          .element(by.css("div:nth-child(3).medium-3 div:nth-child(2).medium-8"))
          .getText()
          .then(function(text) {
            return text;
          });

        selected_stop_duration = reportListPage
          .getSelectedTotalDayRow()
          .element(by.css("div:nth-child(4).medium-1 div:nth-child(1).medium-12"))
          .getText()
          .then(function(text) {
            return text;
          });

        selected_engagement_duration = reportListPage
          .getSelectedTotalDayRow()
          .element(by.css("div:nth-child(5).medium-1 div:nth-child(1).medium-12"))
          .getText()
          .then(function(text) {
            return text;
          });

        total_week_journey_distance = reportListPage
          .getReportTotalWeek()
          .element(by.css("div:nth-child(4).medium-4 div:nth-child(1).medium-3"))
          .getText()
          .then(function(text) {
            return text;
          });

        total_week_journey_duration = reportListPage
          .getReportTotalWeek()
          .element(by.css("div:nth-child(4).medium-4 div:nth-child(2).medium-3"))
          .getText()
          .then(function(text) {
            return text;
          });

        total_week_stop_duration = reportListPage
          .getReportTotalWeek()
          .element(by.css("div:nth-child(6).medium-1 div"))
          .getText()
          .then(function(text) {
            return text;
          });

        total_week_engagement_duration = reportListPage
          .getReportTotalWeek()
          .element(by.css("div:nth-child(7).medium-1 div"))
          .getText()
          .then(function(text) {
            return text;
          });

        lapse_total_journey_distance = reportListPage
          .getReportTimeLapseTotal()
          .element(by.css("div:nth-child(4).medium-4 div:nth-child(1).medium-3 span"))
          .getText()
          .then(function(text) {
            return text;
          });

        lapse_total_journey_duration = reportListPage
          .getReportTimeLapseTotal()
          .element(by.css("div:nth-child(4).medium-4 div:nth-child(2).medium-3"))
          .getText()
          .then(function(text) {
            return text;
          });

        lapse_total_stop_duration = reportListPage
          .getReportTimeLapseTotal()
          .element(by.css("div:nth-child(6).medium-1 div"))
          .getText()
          .then(function(text) {
            return text;
          });

        lapse_total_engagement_duration = reportListPage
          .getReportTimeLapseTotal()
          .element(by.css("div:nth-child(7).medium-1 div"))
          .getText()
          .then(function(text) {
            return text;
          });
      });

      describe("when first vehicle selected,", function() {
        it("the day of departure is same from to", function() {
          expect(dayTripInfo).toContain(selected_day);
          dayTripInfo.then(function(text) {
            arr = text.split("\n")[1].split(" ");
            numberOfTrips = parseInt(arr[0]);
            expect(text).toContain(selected_day);
          });
        });

        it("the report should have departure time", function() {
          expect(
            reportListPage
            .getSelectedTotalDayRow()
            .element(by.css("div:nth-child(1).medium-3 div:nth-child(2).medium-4"))
            .isPresent()
          ).toBe(true);
        });

        it("the report should have departure location ", function() {
          expect(
            reportListPage
            .getSelectedTotalDayRow()
            .element(by.css("div:nth-child(1) div:nth-child(3).medium-4"))
            .isPresent()
          ).toBe(true);
        });

        it("the report should have journey distance", function() {
          expect(
            reportListPage
            .getSelectedTotalDayRow()
            .element(by.css("div:nth-child(2).medium-4 div:nth-child(1).medium-3"))
            .isPresent()
          ).toBe(true);
        });

        it("the report should have journey duration", function() {
          expect(
            reportListPage
            .getSelectedTotalDayRow()
            .element(by.css("div:nth-child(2).medium-4 div:nth-child(2).medium-3.ng-binding"))
            .isPresent()
          ).toBe(true);
        });

        it("the report should have arrival hours", function() {
          expect(
            reportListPage
            .getSelectedTotalDayRow()
            .element(by.css("div:nth-child(3).medium-3 div:nth-child(1).medium-4"))
            .isPresent()
          ).toBe(true);
        });

        it("the report should have arrival location", function() {
          expect(
            reportListPage
            .getSelectedTotalDayRow()
            .element(by.css("div:nth-child(3).medium-3 div:nth-child(2).medium-8"))
            .isPresent()
          ).toBe(true);
        });

        it("the report should have stop duration", function() {
          expect(
            reportListPage
            .getSelectedTotalDayRow()
            .element(by.css("div:nth-child(4).medium-1 div:nth-child(1).medium-12"))
            .isPresent()
          ).toBe(true);
        });

        it("the report should have engagement duration", function() {
          expect(
            reportListPage
            .getSelectedTotalDayRow()
            .element(by.css("div:nth-child(5).medium-1 div:nth-child(1).medium-12"))
            .isPresent()
          ).toBe(true);
        });

        it("total week should have total distance", function() {
          expect(
            reportListPage
            .getReportTotalWeek()
            .element(by.css("div:nth-child(4).medium-4 div:nth-child(1).medium-3"))
            .isPresent()
          ).toBe(true);
        });

        it("total week should have total journey duration", function() {
          expect(
            reportListPage
            .getReportTotalWeek()
            .element(by.css("div:nth-child(4).medium-4 div:nth-child(1).medium-3"))
            .isPresent()
          ).toBe(true);
        });

        it("total week should have total stop duration", function() {
          expect(
            reportListPage
            .getReportTotalWeek()
            .element(by.css("div:nth-child(6).medium-1 div"))
            .isPresent()
          ).toBe(true);
        });

        it("total week should have total engagement duration", function() {
          expect(
            reportListPage
            .getReportTotalWeek()
            .element(by.css("div:nth-child(7).medium-1 div"))
            .isPresent()
          ).toBe(true);
        });

        it("lapse total should have total journey distance", function() {
          expect(
            reportListPage
            .getReportTimeLapseTotal()
            .element(by.css("div:nth-child(4).medium-4 div:nth-child(1).medium-3 span"))
            .isPresent()
          ).toBe(true);
        });

        it("lapse total should have total journey duration", function() {
          expect(
            reportListPage
            .getReportTimeLapseTotal()
            .element(by.css("div:nth-child(4).medium-4 div:nth-child(2).medium-3"))
            .isPresent()
          ).toBe(true);
        });

        it("lapse total should have total stop duration", function() {
          expect(
            reportListPage
            .getReportTimeLapseTotal()
            .element(by.css("div:nth-child(6).medium-1 div"))
            .isPresent()
          ).toBe(true);
        });

        it("lapse total should have total engagement duration", function() {
          expect(
            reportListPage
            .getReportTimeLapseTotal()
            .element(by.css("div:nth-child(7).medium-1 div"))
            .isPresent()
          ).toBe(true);
        });

        it("report should have journey distance same as total week", function() {
          expect(selected_journey_distance).toBe(total_week_journey_distance);
        });

        it("the report should have journey duration same as total week", function() {
          expect(selected_journey_duration).toBe(total_week_journey_duration);
        });

        it("he report should have stop duration same as total week", function() {
          expect(selected_stop_duration).toBe(total_week_stop_duration);
        });

        it("the report should have engagement duration same as total week", function() {
          expect(selected_engagement_duration).toBe(total_week_engagement_duration);
        });

        it("lapse total should have journey distance same as total week", function() {
          expect(lapse_total_journey_distance).toBe(total_week_journey_distance);
        });

        it("lapse total should have journey duration same as total week", function() {
          expect(lapse_total_journey_duration).toBe(total_week_journey_duration);
        });

        it("lapse total should have stop duration same as total week", function() {
          expect(lapse_total_stop_duration).toBe(total_week_stop_duration);
        });

        it("lapse total should have engagement duration same as total week", function() {
          expect(lapse_total_engagement_duration).toBe(total_week_engagement_duration);
        });
      });

      describe("when expanded button clicked", function() {
        beforeAll(function() {
          reportListPage.getSelectedTotalDayRow().click();
          browser.wait(testUtils.until.presenceOf(reportListPage.getReportAllTripRows()));
        });

        it("each trip row should have all fields", function() {

          reportListPage.getReportAllTripRows().each(function(elm, index) {
            expect(
              elm.element(by.css("div:nth-child(1).medium-3 div:nth-child(1).medium-4"))
              .getAttribute("innerHTML")
            ).toBe(selected_day);

            expect(
              elm.element(by.css("div:nth-child(1).medium-3 div:nth-child(2).medium-4"))
              .isPresent()
            ).toBe(true); // start time

            expect(
              elm.element(by.css("div:nth-child(1).medium-3 div:nth-child(3).medium-4 span"))
              .isPresent()
            ).toBe(true); // start address

            expect(
              elm.element(by.css("div:nth-child(2).medium-4 div:nth-child(1).medium-3"))
              .isPresent()
            ).toBe(true); // journey distance

            expect(
              elm.element(by.css("div:nth-child(2).medium-4 div:nth-child(2).medium-3"))
              .isPresent()
            ).toBe(true); // journey duration

            expect(
              elm.element(by.css("div:nth-child(2).medium-4 div:nth-child(3).medium-6"))
              .isPresent()
            ).toBe(true); // journey driver

            expect(
              elm.element(by.css("div:nth-child(3).medium-3 div:nth-child(1).medium-4"))
              .isPresent()
            ).toBe(true); // end time

            expect(
              elm.element(by.css("div:nth-child(3).medium-3 div:nth-child(2).medium-4"))
              .isPresent()
            ).toBe(true); // end address

            expect(
              elm.element(by.css("div:nth-child(3).medium-3 div:nth-child(3).medium-4"))
              .isPresent()
            ).toBe(true); // temperature

            expect(
              elm.element(by.css("div:nth-child(4).medium-1")).isPresent()
            ).toBe(true); // stop duration

            expect(
              elm.element(by.css("div:nth-child(5).medium-1")).isPresent()
            ).toBe(true); // engagement duration

            if (index == 0) {
              elm.element(by.css("div:nth-child(1).medium-3 div:nth-child(2).medium-4"))
                .getText()
                .then(function(text) {
                  firstTripStartTime = text;
                });

              elm.element(by.css("div:nth-child(1).medium-3 div:nth-child(3).medium-4"))
                .getText()
                .then(function(text) {
                  firstTripAddress = text;
                });
            }

            elm.element(by.css("div:nth-child(2).medium-4 div:nth-child(1).medium-3"))
              .getText()
              .then(function(text) {
                totalDistance += Number(text);
              });

            elm.element(by.css("div:nth-child(2).medium-4 div:nth-child(2).medium-3"))
              .getText()
              .then(function(text) {
                totalDuration += reportListPage.convertTimeStringToSeconds2(
                  text
                );
              });

            elm.element(by.css("div:nth-child(4).medium-1"))
              .getText()
              .then(function(text) {
                totalStopDuration += reportListPage.convertTimeStringToSeconds2(
                  text
                );
              });

            elm.element(by.css("div:nth-child(5).medium-1"))
              .getText()
              .then(function(text) {
                totalEngagement += reportListPage.convertTimeStringToSeconds2(
                  text
                );
              });
          });

          lastTripEndTime = reportListPage
            .getReportAllTripRows()
            .last()
            .element(by.css("div:nth-child(3).medium-3 div:nth-child(1).medium-4"))
            .getText()
            .then(function(text) {
              return text;
            });

          lastTripAddress = reportListPage
            .getReportAllTripRows()
            .last()
            .element(by.css("div:nth-child(3).medium-3 div:nth-child(2).medium-4"))
            .getText()
            .then(function(text) {
              return text;
            });
        });

        describe("the trips of day checked", function() {
          it("report should have the start time same as first trip", function() {
            expect(selected_departure_time).toBe(firstTripStartTime);
          });

          it("report should have the start location same as first trip", function() {
            expect(selected_departure_location).toBe(firstTripAddress);
          });

          it("report should have the journey distance same as total trip distance", function() {
            selected_journey_distance.then(function(text) {
              expect(parseFloat(text)).toBe(parseFloat(totalDistance.toFixed(3)));
              // expect(parseFloat(text)).toBe(324.541);
            });
          });

          it("report should have the same journey duration as total trip duration", function() {
            selected_journey_duration.then(function(text) {
              expect(reportListPage.convertTimeStringToSeconds2(text)).toBe(totalDuration);
            });
          });

          it("report should have the end time same as last trip", function() {
            expect(selected_arrival_time).toBe(lastTripEndTime);
          });

          it("report should have the end location same as last trip", function() {
            expect(selected_arrival_location).toBe(lastTripAddress);
          });

          it("report should have the stop duration same as total trip stop duration", function() {
            selected_stop_duration.then(function(text) {
              expect(reportListPage.convertTimeStringToSeconds2(text)).toBe(totalStopDuration);
            });
          });

          it("report should have the engagement duration same as total trip engagement duration", function() {
            selected_engagement_duration.then(function(text) {
              expect(reportListPage.convertTimeStringToSeconds2(text)).toBe(totalEngagement);
            });
          });
        });
      });
    });
  });
})();
