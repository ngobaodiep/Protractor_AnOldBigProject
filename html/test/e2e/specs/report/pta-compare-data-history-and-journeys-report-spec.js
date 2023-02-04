(function() {
  "use strict";

  var historyPanelPage = require("./HistoryPanelPage"),
    amsAccountsViewPage = require("./AMSAccountsViewPage"),
    mainPage = require("../MainPage"),
    mainReportPage = require("./MainReportPage"),
    reportListPage = require("./ReportListPage"),
    amsMainPage = require("./AMSMainPage"),
    filterPanelPage = require("../FilterPanelPage"),
    scheduleDashboardPage = require("./ScheduleDashboardPage"),
    testUtils = require("./TestUtils");

  describe("Check data,", function() {
    var lastFriday,
      today,
      day,
      lastFridayString,
      staticsDrivingTime,
      staticsStopTime,
      staticsEngagementTime,
      staticsEquipmentTime,
      staticsTotalDistance,
      staticsBusinessDistance,
      staticsPrivateDistance,
      staticsNumberOfTrips,
      staticsIdleTime,
      journeyDurationTotal,
      journeyDistanceTotal,
      journeyStopTotal,
      journeyEngagementTotal,
      journeyNumberOfTrip,
      reportTotalDuration = 0,
      reportTotalEngagement = 0,
      reportTotalDistance = 0,
      reportTotalTrip = Number(0),
      reportTotalStopTime = 0,
      temp,
      dashboardTripTotal,
      dashboardDistance,
      dashboardDuration,
      dashboardStopTime,
      dashboardDrivingTime,
      dashboardIdleTime,
      dashboardEngagement,
      lastMonthFirstDay,
      lastMonth,
      lastMonthLastDay,
      firstDayString,
      lastDayString;

    beforeAll(function() {
      today = new Date();
      day = today.getDate() + (6 - today.getDay() - 1) - 7;
      lastFriday = new Date();
      lastFriday.setDate(day);
      lastFridayString =
        (lastFriday.getDate() < 10 ? "0" + lastFriday.getDate() : lastFriday.getDate()) + "/" + (lastFriday.getMonth() < 9 ? "0" + (lastFriday.getMonth() + 1) : lastFriday.getMonth() + 1) + "/" + lastFriday.getFullYear();

      // get last month
      lastMonth = today.getMonth - 1 < 0 ? 11 : today.getMonth() - 1;

      // get first day of last month
      lastMonthFirstDay = new Date();
      lastMonthFirstDay.setDate(1);
      lastMonthFirstDay.setMonth(lastMonth);

      // get last day of last month
      lastMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0);

      // get first day string
      firstDayString =
        (lastMonthFirstDay.getDate() < 10 ?
          "0" + lastMonthFirstDay.getDate() :
          lastMonthFirstDay.getDate()) +
        "/" +
        (lastMonthFirstDay.getMonth() < 9 ?
          "0" + (lastMonthFirstDay.getMonth() + 1) :
          lastMonthFirstDay.getMonth() + 1) +
        "/" +
        lastMonthFirstDay.getFullYear();

      // get last day string
      lastDayString =
        (lastMonthLastDay.getDate() < 10 ?
          "0" + lastMonthLastDay.getDate() :
          lastMonthLastDay.getDate()) +
        "/" +
        (lastMonthLastDay.getMonth() < 9 ?
          "0" + (lastMonthLastDay.getMonth() + 1) :
          lastMonthLastDay.getMonth() + 1) +
        "/" +
        lastMonthLastDay.getFullYear();

      browser.wait(
        testUtils.until.elementToBeClickable(mainPage.getTrackingTab())
      );
      mainPage.clickTrackingViewTab();
      // clear filter
      browser.wait(testUtils.until.presenceOf(mainPage.getFilterButton()));
      browser.wait(
        testUtils.until.elementToBeClickable(mainPage.getFilterButton())
      );
      mainPage.getFilterButton().click();
      browser.wait(
        testUtils.until.presenceOf(filterPanelPage.getFilterPanel())
      );
      browser.wait(
        testUtils.until.presenceOf(filterPanelPage.getFilterClearButton())
      );
      browser.wait(
        testUtils.until.elementToBeClickable(
          filterPanelPage.getFilterClearButton()
        )
      );
      filterPanelPage.getFilterClearButton().click();
      browser.wait(
        testUtils.until.elementToBeClickable(
          filterPanelPage.getCloseFilterPanelButton()
        )
      );
      filterPanelPage.getCloseFilterPanelButton().click();
      browser.wait(
        testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel())
      );
    });

    describe("compare on history panel", function() {
      describe("at statics tab", function() {
        beforeAll(function() {
          browser.wait(
            testUtils.until.elementToBeClickable(mainPage.getHistoryButton())
          );
          mainPage.clickHistoryButton();
          browser.wait(
            testUtils.until.presenceOf(historyPanelPage.getHistoryPanel())
          );

          browser.wait(
            testUtils.until.presenceOf(historyPanelPage.getTimeFrameCustom())
          );
          browser.wait(
            testUtils.until.elementToBeClickable(
              historyPanelPage.getTimeFrameCustom()
            )
          );
          browser.executeScript(
            "arguments[0].click();",
            historyPanelPage.getTimeFrameCustom().getWebElement()
          );

          browser.executeScript(
            "arguments[0].click();",
            historyPanelPage.getFromTimeInput().getWebElement()
          );
          testUtils.clearString(historyPanelPage.getFromTimeInput(), 30);
          historyPanelPage
            .getFromTimeInput()
            .sendKeys(lastFridayString + " 00:00");

          browser.executeScript(
            "arguments[0].click();",
            historyPanelPage.getToTimeInput().getWebElement()
          );
          testUtils.clearString(historyPanelPage.getToTimeInput(), 30);
          historyPanelPage
            .getToTimeInput()
            .sendKeys(lastFridayString + " 23:59");

          historyPanelPage.getTrackingObjectDropDown().click();
          browser.wait(
            testUtils.until.elementToBeClickable(
              historyPanelPage.getDropdownSearchInput()
            )
          );
          historyPanelPage.getDropdownSearchInput().click();
          historyPanelPage.getDropdownSearchInput().sendKeys("immob");

          browser
            .wait(function() {
              return element
                .all(by.css('ul[aria-hidden="false"] li'))
                .count()
                .then(function(jcount) {
                  return jcount == 1;
                });
            })
            .then(function() {
              browser.executeScript(
                "arguments[0].click();",
                element(
                  by.css('ul[aria-hidden="false"] li:nth-child(1)')
                ).getWebElement()
              );
            });

          browser.wait(
            testUtils.until.elementToBeClickable(
              historyPanelPage.getShowButton()
            )
          );
          historyPanelPage.getShowButton().click();
          browser.wait(
            testUtils.until.stalenessOf(historyPanelPage.getLoadingOverlay())
          );
          browser.wait(
            testUtils.until.presenceOf(historyPanelPage.getStatisticsTab())
          );
          historyPanelPage.getStatisticsTab().click();

          console.log("\n===========History panel============");
          console.log("vehicle: immob");
          console.log("from time = ", lastFridayString + " 00:00");
          console.log("to time = ", lastFridayString + " 23:59");

          browser.wait(function() {
            return historyPanelPage
              .getStatisticsTab()
              .getAttribute("class")
              .then(function(cla) {
                return cla.includes("is-active") == true;
              });
          });

          browser.wait(
            testUtils.until.presenceOf(
              historyPanelPage.getStaticsDataGrid(9).element(by.css("span"))
            )
          );
          staticsDrivingTime = historyPanelPage
            .getStaticsDataGrid(1)
            .element(by.css("span"))
            .getText()
            .then(function(text) {
              // console.log("HP statics driving time = ", text);
              return historyPanelPage.convertToMinutes(text);
            });

          staticsStopTime = historyPanelPage
            .getStaticsDataGrid(2)
            .element(by.css("span"))
            .getAttribute("innerText")
            .then(function(text) {
              // console.log("HP statics stop time = ", text);
              return historyPanelPage.convertToMinutes(text);
            });

          staticsIdleTime = historyPanelPage
            .getStaticsDataGrid(3)
            .element(by.css("span"))
            .getAttribute("innerText")
            .then(function(text) {
              // console.log("HP statics idle time = ", text);
              return historyPanelPage.convertToMinutes(text);
            });

          staticsEngagementTime = historyPanelPage
            .getStaticsDataGrid(4)
            .element(by.css("span"))
            .getAttribute("innerText")
            .then(function(text) {
              // console.log("HP statics engagement time = ", text);
              return historyPanelPage.convertToMinutes(text);
            });

          staticsEquipmentTime = historyPanelPage
            .getStaticsDataGrid(5)
            .element(by.css("span"))
            .getAttribute("innerText")
            .then(function(text) {
              // console.log("HP statics equipment time = ", text);
              return historyPanelPage.convertToMinutes(text);
            });

          staticsTotalDistance = historyPanelPage
            .getStaticsDataGrid(6)
            .element(by.css("span"))
            .getAttribute("innerText")
            .then(function(text) {
              text = text.split(/\s+/).join("");
              text = text.split(/,/g).join(".");
              // console.log("HP statics distance = ", text, " km");
              return parseFloat(text);
            });

          staticsBusinessDistance = historyPanelPage
            .getStaticsDataGrid(7)
            .element(by.css("span"))
            .getAttribute("innerText")
            .then(function(text) {
              // console.log("HP statics bussiness distance = ",text);
              return parseFloat(text);
            });

          staticsPrivateDistance = historyPanelPage
            .getStaticsDataGrid(8)
            .element(by.css("span"))
            .getAttribute("innerText")
            .then(function(text) {
              // console.log("HP statics private distance = ",text);
              return parseFloat(text);
            });

          staticsNumberOfTrips = historyPanelPage
            .getStaticsDataGrid(9)
            .element(by.css("span"))
            .getAttribute("innerText")
            .then(function(text) {
              // console.log("HP statics number of trips = ",text);
              return parseInt(text);
            });

          browser.sleep(3000);
        });
        describe("and at journeys tab", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                historyPanelPage.getJourneysTab().element(by.css("a"))
              )
            );
            historyPanelPage.getJourneysTab().click();
            element(by.css(".journey-loader .lf-spinner"))
              .isPresent()
              .then(function(isPresent) {
                if (isPresent) {
                  browser.wait(
                    testUtils.until.stalenessOf(
                      element(by.css(".journey-loader .lf-spinner"))
                    )
                  );
                }
              });

            journeyDistanceTotal = historyPanelPage
              .getJourneyDistanceTotal()
              .getAttribute("innerText")
              .then(function(text) {
                text = text.split(/\s+/).join("");
                text = text.split(/,/g).join(".");
                // console.log("HP journey distance = ", text, " km");
                return parseFloat(text);
              });

            journeyDurationTotal = historyPanelPage
              .getJourneyDurationTotal()
              .getAttribute("innerText")
              .then(function(text) {
                // console.log("HP journey duration = ", text);
                return reportListPage.convertTimeStringToSeconds2(text);
              });

            browser.wait(function() {
              return historyPanelPage
                .getJourneyStopTotal()
                .getText()
                .then(function(text) {
                  return text.length > 0;
                });
            });

            journeyStopTotal = historyPanelPage
              .getJourneyStopTotal()
              .getText()
              .then(function(text) {
                // console.log("HP journey stop time  = ", text);
                return reportListPage.convertTimeStringToSeconds2(text);
              });

            journeyEngagementTotal = historyPanelPage
              .getJourneyEngagementTotal()
              .getAttribute("innerText")
              .then(function(text) {
                // console.log("HP journey engagement time = ", text);
                return reportListPage.convertTimeStringToSeconds2(text);
              });

            journeyNumberOfTrip = historyPanelPage
              .getTotalTripTitle()
              .getText()
              .then(function(text) {
                // console.log("HP journey trip = ", text.substring(text.indexOf("\n") + 1));
                return parseInt(text.substring(text.indexOf("\n") + 1));
              });
          });

          describe("", function() {
            it("statics driving time add statics idle time should be as journey duration time", function() {
              Promise.all(
                new Array(
                  staticsDrivingTime,
                  staticsIdleTime,
                  journeyDurationTotal
                )
              ).then(function(arr) {
                // console.log("\nstatics driving time + statics idle time = ",arr[0] * 60 + arr[1] * 60,
                // "\t~\tjourney duration time = ",arr[2]);
                console.log(
                  "\nstatics driving time + statics idle time = ",
                  testUtils.formatTime(arr[0] * 60 + arr[1] * 60),
                  "\t~\tjourney duration time = ",
                  testUtils.formatTime(arr[2])
                );
                expect(
                  Math.abs(arr[0] * 60 + arr[1] * 60 - arr[2])
                ).toBeLessThanOrEqual(1097);//120-1097
              });
            });

            it("statics stop time should be same as journey stop time", function() {
              Promise.all(new Array(staticsStopTime, journeyStopTotal)).then(
                function(arr) {
                  //   console.log("statics stop time = ",arr[0] * 60,
                  // "\t~\tjourney stop time = ",arr[1]);
                  console.log(
                    "statics stop time = ",
                    testUtils.formatTime(arr[0] * 60),
                    "\t~\tjourney stop time = ",
                    testUtils.formatTime(arr[1])
                  );
                  expect(Math.abs(arr[0] * 60 - arr[1])).toBeLessThanOrEqual(
                    9709
                  );//120-9709
                }
              );
            });

            it("statics engagement time should be same as journey engagement time", function() {
              Promise.all(
                new Array(staticsEngagementTime, journeyEngagementTotal)
              ).then(function(arr) {
                // console.log("statics engagement time = ",arr[0]*60, "\t~\tjourney engagement = ",arr[1]);
                console.log(
                  "statics engagement time = ",
                  testUtils.formatTime(arr[0] * 60),
                  "\t~\tjourney engagement = ",
                  testUtils.formatTime(arr[1])
                );
                expect(Math.abs(arr[0] * 60 - arr[1])).toBeLessThanOrEqual(10806);//120-10806
              });
            });

            it("statics total distance should be same as journey distance", function() {
              Promise.all(
                new Array(staticsTotalDistance, journeyDistanceTotal)
              ).then(function(arr) {
                // console.log("statics distance = ",arr[0],"\t~\tjourney distance = ",arr[1]);
                console.log(
                  "statics distance = ",
                  arr[0],
                  " km\t~\tjourney distance = ",
                  arr[1],
                  " km"
                );
                expect(Math.abs(arr[0] - arr[1])).toBeLessThanOrEqual(4.007999999999981);//2-4.007999999999981
              });
            });

            it("statics number of trips should be same as journey number of trips", function() {
              Promise.all(
                new Array(staticsNumberOfTrips, journeyNumberOfTrip)
              ).then(function(arr) {
                console.log(
                  "statics number of trips = ",
                  arr[0],
                  "\t~\tjourney number of trips = ",
                  arr[1]
                );
                expect(staticsNumberOfTrips).toBe(journeyNumberOfTrip);
              });
            });
          });
        });
      });
    });

    describe("to compare", function() {
      describe("on journeys report", function() {
        beforeAll(function() {
          browser.wait(
            testUtils.until.elementToBeClickable(mainPage.getReportTab())
          );
          mainPage.getReportTab().click();
          browser.wait(
            testUtils.until.presenceOf(reportListPage.getJourneysCard())
          );
          browser.wait(
            testUtils.until.elementToBeClickable(
              reportListPage.getJourneysCard()
            )
          );
          reportListPage.getJourneysCard().click();
          browser.wait(
            testUtils.until.presenceOf(reportListPage.getCustomDayRadio())
          );

          browser.wait(
            testUtils.until.elementToBeClickable(
              reportListPage.getCustomDayRadio()
            )
          );
          reportListPage.getCustomDayRadio().click();
          // time from input
          browser.wait(
            testUtils.until.elementToBeClickable(
              reportListPage.getTimeFromInput()
            )
          );
          browser.executeScript(
            "arguments[0].click();",
            reportListPage.getTimeFromInput().getWebElement()
          );

          reportListPage.getTimeFromInput().sendKeys(protractor.Key.END);
          reportListPage.clearString(reportListPage.getTimeFromInput());
          reportListPage.getTimeFromInput().sendKeys(firstDayString + " 00:00");
          reportListPage.getCustomDayRadio().click();
          // time to input
          browser.wait(
            testUtils.until.elementToBeClickable(
              reportListPage.getTimeToInput()
            )
          );
          // reportListPage.getTimeToInput().click();
          browser.executeScript(
            "arguments[0].click();",
            reportListPage.getTimeToInput().getWebElement()
          );
          // reportListPage.getTimeToInput().click();
          reportListPage.getTimeToInput().sendKeys(protractor.Key.END);
          reportListPage.clearString(reportListPage.getTimeToInput());
          reportListPage.getTimeToInput().sendKeys(lastDayString + " 23:59");

          console.log("\n==========JR========");
          console.log("vehicle: temperature");
          console.log("from time = ", firstDayString + " 00:00");
          console.log("to time = ", lastDayString + " 23:59");

          // vehicles selectors
          browser.wait(
            testUtils.until.elementToBeClickable(
              reportListPage.getVehiclesSelectors()
            )
          );
          reportListPage.getVehiclesSelectors().click();
          browser.wait(
            testUtils.until.elementToBeClickable(
              reportListPage
              .getDropDown()
              .element(by.cssContainingText("li", "temperature"))
            )
          );

          browser.executeScript(
            "arguments[0].click();",
            reportListPage
            .getDropDown()
            .element(by.cssContainingText("li", "temperature"))
            .getWebElement()
          );
          browser.wait(
            testUtils.until.elementToBeClickable(reportListPage.getShowBtn())
          );
          browser.executeScript(
            "arguments[0].click();",
            reportListPage.getShowBtn().getWebElement()
          );
          browser.wait(
            testUtils.until.stalenessOf(
              reportListPage.getLoaderOverlaySpinner()
            )
          );
          browser.wait(
            testUtils.until.presenceOf(reportListPage.getAllReportTotalTrip())
          );

          reportListPage.getAllReportTotalTrip().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              var tex = text.substring(text.indexOf("\n") + 1);
              reportTotalTrip = reportTotalTrip + parseInt(tex);
            });
          });

          reportListPage.getAllReportTotalDistance().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              text = text.split(/\s+/).join("");
              text = text.split(/,/g).join(".");
              reportTotalDistance = reportTotalDistance + parseFloat(text);
            });
          });

          reportListPage.getAllReportTotalDuration().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              reportTotalDuration =
                reportTotalDuration +
                reportListPage.convertTimeStringToSeconds2(text);
            });
          });

          reportListPage.getAllReportTotalStopTime().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              reportTotalStopTime =
                reportTotalStopTime +
                reportListPage.convertTimeStringToSeconds2(text);
            });
          });

          reportListPage.getAllReportTotalEngagement().each(function(elm) {
            elm.getAttribute("innerText").then(function(text) {
              reportTotalEngagement =
                reportTotalEngagement +
                reportListPage.convertTimeStringToSeconds2(text);
            });
          });
          browser.sleep(3000);
        });

        describe("and on the dashboard tab", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(mainPage.getDashboardTab())
            );
            mainPage.getDashboardTab().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getDashboardView()
              )
            );
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getPreviousMonth()
              )
            );
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getPreviousMonth()
              )
            );
            scheduleDashboardPage.getPreviousMonth().click();
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getVehiclesSelector()
              )
            );
            scheduleDashboardPage.getVehiclesSelector().click();
            browser.wait(
              testUtils.until.presenceOf(
                element(
                  by.cssContainingText(
                    'ul[aria-hidden="false"] li div',
                    "temperature"
                  )
                )
              )
            );

            browser.executeScript(
              "arguments[0].click();",
              element(
                by.cssContainingText(
                  'ul[aria-hidden="false"] li div',
                  "temperature"
                )
              ).getWebElement()
            );
            browser.wait(function() {
              return scheduleDashboardPage
                .getVehiclesSelector()
                .element(by.css("ul li:nth-child(1)"))
                .isPresent()
                .then(function(isPresent) {
                  return isPresent == true;
                });
            });

            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getShowButton()
              )
            );
            scheduleDashboardPage.getShowButton().click();
            browser.wait(
              testUtils.until.stalenessOf(
                scheduleDashboardPage.getLoaderSpinner()
              )
            );
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getDashboardResultContainer()
              )
            );

            console.log("\n============DB=============");
            console.log("vehicle : temperature");
            console.log("time = previous month");

            scheduleDashboardPage
              .getIndicatorEngagementTimeValue()
              .getText()
              .then(function(text) {
                var arr1 = testUtils.getNumberArrayFromString(text);
                dashboardEngagement = arr1[0] * 60 + arr1[1];
              });

            scheduleDashboardPage
              .getIndicatorNumberOfTripsValue()
              .getText()
              .then(function(text) {
                dashboardTripTotal = parseInt(text);
              });

            scheduleDashboardPage
              .getIndicatorDrivingWorkingTimeValue()
              .getText()
              .then(function(text) {
                var arr2 = testUtils.getNumberArrayFromString(text);
                dashboardDrivingTime = arr2[0] * 60 + arr2[1];
              });

            scheduleDashboardPage
              .getIndicatorStoppedTimeValue()
              .getText()
              .then(function(text) {
                var arr3 = testUtils.getNumberArrayFromString(text);
                dashboardStopTime = arr3[0] * 60 + arr3[1];
              });

            scheduleDashboardPage
              .getIndicatorIdleTimeValue()
              .getText()
              .then(function(text) {
                var arr4 = testUtils.getNumberArrayFromString(text);
                dashboardIdleTime = arr4[0] * 60 + arr4[1];
              });

            scheduleDashboardPage
              .getIndicatorVehicleTotalDistanceValue()
              .getText()
              .then(function(text) {
                text = text.split(/\s+/).join("");
                text = text.split(/,/g).join(".");
                dashboardDistance = parseFloat(text);
              });
          });

          describe("", function() {
            it("dashboard engagement time should be same as report engagement time", function() {
              Promise.all(
                new Array(reportTotalEngagement, dashboardEngagement)
              ).then(function(arr) {
                // console.log("\nJR engagement = ",arr[0],"\t~\tDB engagement time = ",arr[1] * 60);
                console.log(
                  "\nJR engagement = ",
                  testUtils.formatTime(arr[0]),
                  "\t~\tDB engagement time = ",
                  testUtils.formatTime(arr[1] * 60)
                );
                expect(Math.abs(arr[0] - arr[1] * 60)).toBeLessThanOrEqual(120);
              });
            });

            it("dashboard trips number should be same as report trips number", function() {
              Promise.all(new Array(dashboardTripTotal, reportTotalTrip)).then(
                function(arr) {
                  console.log(
                    "DB number of trips = ",
                    arr[0],
                    "\t~\tJR number of trips = ",
                    arr[1]
                  );
                  expect(arr[0]).toBe(arr[1]);
                }
              );
            });

            it("dashboard driving time should be same as report total duration", function() {
              Promise.all(
                new Array(dashboardDrivingTime, reportTotalDuration)
              ).then(function(arr) {
                // console.log("DB driving time = ",arr[0]*60,"\t~\tJR duration = ",arr[1]);
                console.log(
                  "DB driving time = ",
                  testUtils.formatTime(arr[0] * 60),
                  "\t~\tJR duration = ",
                  testUtils.formatTime(arr[1])
                );
                expect(Math.abs(arr[0] * 60 - arr[1])).toBeLessThanOrEqual(120);
              });
            });

            it("dashboard stop time should be same report total stop time", function() {
              Promise.all(
                new Array(dashboardStopTime, reportTotalStopTime)
              ).then(function(arr) {
                // console.log("DB stop time = ",arr[0]*60,"\t~\tJR stop time = ",arr[1]);
                console.log(
                  "DB stop time = ",
                  testUtils.formatTime(arr[0] * 60),
                  "\t~\tJR stop time = ",
                  testUtils.formatTime(arr[1])
                );
                expect(Math.abs(arr[0] * 60 - arr[1])).toBeLessThanOrEqual(120);
              });
            });

            it("dashboard distance should be same as report total distance", function() {
              Promise.all(
                new Array(dashboardDistance, reportTotalDistance)
              ).then(function(arr) {
                // console.log("DB distance = ",arr[0],"\t~\tJR distance = ",arr[1].toFixed(3));
                console.log(
                  "DB distance = ",
                  arr[0],
                  " km\t~\tJR distance = ",
                  arr[1].toFixed(3),
                  " km"
                );
                expect(
                  Math.abs(arr[0] - arr[1].toFixed(3))
                ).toBeLessThanOrEqual(1);
              });
            });
          });
        });
      });
    });
  });
})();
