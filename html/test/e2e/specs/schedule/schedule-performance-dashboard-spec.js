/*jshint -W033 */
   (function() {
  "use strict";

  var testUtils = require("./TestUtils"),
    mainPage = require("./MainPage"),
    exportPage = require("./ExportPage"),
    fs = require("fs"),
    warnModal = require("./WarnModal"),
    amsAccountsViewPage = require("./AMSAccountsViewPage"),
    scheduleDashboardPage = require("./ScheduleDashboardPage.js");

  describe("on dashboard tab ", function() {
    var fileName,
      pathFolder,
      files,
      filesArray,
      indicatorEngagement,
      indicatorNumberOfTrip,
      indicatorDrivingWorkingTime,
      indicatorStoppedTime,
      indicatorIdleTime,
      indicatorTotalDistance,
      indicatorBusinessDistance,
      indicatorPrivateDistance,
      _distanceBusiness = parseFloat(0),
      _distancePrivate = parseFloat(0),
      _distanceTotal = parseFloat(0.0),
      _engagement = 0,
      _engagementWorkingDriving = 0,
      _engagementStopped = 0,
      _engagementIdel = 0,
      _numberOfTrips = 0;

    beforeAll(function() {
      // amsAccountsViewPage.loginWithAccount("romande");
      browser.wait(testUtils.until.presenceOf(mainPage.getDashboardTab()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getDashboardTab()));
      mainPage.clickDashboardTab();
      browser.wait(testUtils.until.presenceOf(element(by.css(".settings-view"))));
      browser.wait(testUtils.until.elementToBeClickable(scheduleDashboardPage.getShowButton()));
    });

    it("should be have performance tab", function() {
      expect(scheduleDashboardPage.getPerformanceTab().isPresent()).toBe(true);
    });

    it("performance tab should be actived", function() {
      expect(
        scheduleDashboardPage.getActivePerformanceTab().getAttribute("class")
      ).toContain("k-state-active");
    });

    it("month tab should be present", function() {
      expect(scheduleDashboardPage.getPeriodMonthTab().isPresent()).toBe(true);
    });

    it("month tab should be actived", function() {
      expect(
        scheduleDashboardPage.getPeriodMonthTab().getAttribute("class")
      ).toContain("button-dashboard-active");
    });

    it("quater tab should be present", function() {
      expect(scheduleDashboardPage.getPeriodQuaterTab().isPresent()).toBe(true);
    });

    it("year tab should be present", function() {
      expect(scheduleDashboardPage.getPeriodYearTab().isPresent()).toBe(true);
    });

    it("this month radio should be present", function() {
      expect(scheduleDashboardPage.getThisMonth().isPresent()).toBe(true);
    });

    it("previous month radio should be present", function() {
      expect(scheduleDashboardPage.getPreviousMonth().isPresent()).toBe(true);
    });

    it("last 30 days radio should be present", function() {
      expect(scheduleDashboardPage.getLast30days().isPresent()).toBe(true);
    });

    it("custom radio should be present", function() {
      expect(scheduleDashboardPage.getCustom().isPresent()).toBe(true);
    });

    it("month selector should be present", function() {
      expect(scheduleDashboardPage.getMonthSelector().isPresent()).toBe(true);
    });

    it("vehicles&machines radio should be present", function() {
      expect(scheduleDashboardPage.getVehiclesMachinesRadio().isPresent()).toBe(
        true
      );
    });

    it("vehicles selector should be present", function() {
      expect(scheduleDashboardPage.getVehiclesSelector().isPresent()).toBe(
        true
      );
    });

    it("machines selector should be present", function() {
      expect(scheduleDashboardPage.getMachinesSelector().isPresent()).toBe(
        true
      );
    });

    it("group radio should be present", function() {
      expect(scheduleDashboardPage.getGroupRadio().isPresent()).toBe(true);
    });

    it("group radio should be actived", function() {
      expect(
        scheduleDashboardPage.getGroupInput().getAttribute("class")
      ).toContain("ng-not-empty");
    });

    it("should have category selector", function() {
      expect(
        scheduleDashboardPage.getDashboardControlFilterCategory().isPresent()
      ).toBe(true);
    });

    it("reset button should be present", function() {
      expect(scheduleDashboardPage.getResetButton().isPresent()).toBe(true);
    });

    it("should have select driver radio", function() {
      expect(scheduleDashboardPage.getSelectDriversRadio().isPresent()).toBe(
        true
      );
    });

    it("should have driver dropdown selector", function() {
      expect(
        scheduleDashboardPage.getDriversDropDownSelector().isPresent()
      ).toBe(true);
    });

    it("show button should be present", function() {
      expect(scheduleDashboardPage.getShowButton().isPresent()).toBe(true);
    });

    describe("when quater tab clicked ", function() {
      beforeAll(function() {
        browser.wait(
          testUtils.until.elementToBeClickable(
            scheduleDashboardPage.getPeriodQuaterTab()
          )
        );
        scheduleDashboardPage.clickPeriodQuaterTab();
      });

      it("this quater radio should be present", function() {
        expect(scheduleDashboardPage.getThisQuater().isPresent()).toBe(true);
      });

      it("previous quater radio should be present", function() {
        expect(scheduleDashboardPage.getPreviousQuater().isPresent()).toBe(
          true
        );
      });

      it("last90days quater radio should be present", function() {
        expect(scheduleDashboardPage.getPreviousQuater().isPresent()).toBe(
          true
        );
      });

      it("custom radio should be present", function() {
        expect(scheduleDashboardPage.getCustom().isPresent()).toBe(true);
      });

      it("should have quater selector", function() {
        expect(scheduleDashboardPage.getQuaterSelector().isPresent()).toBe(
          true
        );
      });
    });

    describe("when year tab clicked ", function() {
      beforeAll(function() {
        browser.wait(
          testUtils.until.elementToBeClickable(
            scheduleDashboardPage.getPeriodYearTab()
          )
        );
        scheduleDashboardPage.clickPeriodYearTab();
      });

      it("this year radio should be present", function() {
        expect(scheduleDashboardPage.getThisYear().isPresent()).toBe(true);
      });

      it("previous year radio should be present", function() {
        expect(scheduleDashboardPage.getPreviousYear().isPresent()).toBe(true);
      });

      it("last365days year radio should be present", function() {
        expect(scheduleDashboardPage.getLast365days().isPresent()).toBe(true);
      });

      it("custom radio should be present", function() {
        expect(scheduleDashboardPage.getCustom().isPresent()).toBe(true);
      });

      it("should have year selector", function() {
        expect(scheduleDashboardPage.getYearSelector().isPresent()).toBe(true);
      });

      it("should have select vehicles and machines radio", function() {
        expect(
          scheduleDashboardPage.getVehiclesMachinesRadio().isPresent()
        ).toBe(true);
      });

      it("should have vehicles selector", function() {
        expect(scheduleDashboardPage.getMachinesSelector().isPresent()).toBe(
          true
        );
      });

      it("should have selected group and category radio", function() {
        expect(scheduleDashboardPage.getGroupRadio().isPresent()).toBe(true);
      });

      it("should have category selector", function() {
        expect(
          scheduleDashboardPage.getDashboardControlFilterCategory().isPresent()
        ).toBe(true);
      });

      it("should have select driver radio", function() {
        expect(
          scheduleDashboardPage.getDriversDropDownSelector().isPresent()
        ).toBe(true);
      });
    });

    describe("when schedule data checked on month tab ", function() {
      beforeAll(function() {
        browser.wait(
          testUtils.until.elementToBeClickable(
            scheduleDashboardPage.getPeriodMonthTab()
          )
        );
        scheduleDashboardPage.clickPeriodMonthTab();

        browser.wait(
          testUtils.until.elementToBeClickable(
            scheduleDashboardPage.getCustom()
          )
        );
        scheduleDashboardPage.clickCustomRadio();

        browser.wait(
          testUtils.until.elementToBeClickable(
            scheduleDashboardPage.getMonthSelector()
          )
        );
        scheduleDashboardPage.clickMonthSelector();
        scheduleDashboardPage.chooseMonth("2021 - September");

        scheduleDashboardPage.clickVehiclesMachinesRadio();

        browser.wait(
          testUtils.until.elementToBeClickable(
            scheduleDashboardPage.getShowButton()
          )
        );
        scheduleDashboardPage.clickShowButton();
        browser.wait(
          testUtils.until.stalenessOf(scheduleDashboardPage.getLoaderSpinner())
        );
        browser.wait(
          testUtils.until.presenceOf(
            scheduleDashboardPage.getDashboardResultContainer()
          )
        );
      });

      describe("on dashboard control bar", function() {
        it("should have control by resources button", function() {
          expect(
            scheduleDashboardPage
            .getDashboardControlByResourcesBtn()
            .isPresent()
          ).toBe(true);
          expect(
            scheduleDashboardPage
            .getDashboardControlByResourcesBtn()
            .isDisplayed()
          ).toBe(true);
        });

        it("control by resources button should be actived", function() {
          expect(
            scheduleDashboardPage
            .getDashboardControlByResourcesBtn()
            .getAttribute("class")
          ).toContain("k-state-active");
        });

        it("should have control by driver button", function() {
          expect(
            scheduleDashboardPage.getDashboardControlByDriverBtn().isPresent()
          ).toBe(true);
          expect(
            scheduleDashboardPage.getDashboardControlByDriverBtn().isDisplayed()
          ).toBe(true);
        });

        it("should have control by category button", function() {
          expect(
            scheduleDashboardPage.getDashboardControlByCategoryBtn().isPresent()
          ).toBe(true);
          expect(
            scheduleDashboardPage
            .getDashboardControlByCategoryBtn()
            .isDisplayed()
          ).toBe(true);
        });

        it("should have control by group button", function() {
          expect(
            scheduleDashboardPage.getDashboardControlByGroupBtn().isPresent()
          ).toBe(true);
          expect(
            scheduleDashboardPage.getDashboardControlByGroupBtn().isDisplayed()
          ).toBe(true);
        });

        it("should have control by time button", function() {
          expect(
            scheduleDashboardPage.getDashboardControlByTimeBtn().isPresent()
          ).toBe(true);
          expect(
            scheduleDashboardPage.getDashboardControlByTimeBtn().isDisplayed()
          ).toBe(true);
        });
      });

      describe("in indicators ", function() {
        beforeAll(function() {
          // engagement
          scheduleDashboardPage
            .getIndicatorEngagementTimeValue()
            .getText()
            .then(function(txt) {
              var times = txt.split(" ");
              indicatorEngagement =
                parseInt(times[0]) * 60 + parseInt(times[1]);
            });
          // number of trips
          scheduleDashboardPage
            .getIndicatorNumberOfTripsValue()
            .getText()
            .then(function(txt) {
              indicatorNumberOfTrip = parseInt(txt);
            });

          // total distance
          scheduleDashboardPage
            .getIndicatorTotalDistanceValue()
            .getText()
            .then(function(txt) {
              txt = txt.split(/\s/).join('');
              indicatorTotalDistance = parseFloat(txt);
            });

          // driving working time
          scheduleDashboardPage
            .getIndicatorDrivingWorkingTimeValue()
            .getText()
            .then(function(txt) {
              var time2 = txt.split(" ");
              indicatorDrivingWorkingTime =
                parseInt(time2[0]) * 60 + parseInt(time2[1]);
            });
          // stopped time
          scheduleDashboardPage
            .getIndicatorStoppedTimeValue()
            .getText()
            .then(function(txt) {
              var time3 = txt.split(" ");
              indicatorStoppedTime =
                parseInt(time3[0]) * 60 + parseInt(time3[1]);
            });
          // idle time
          scheduleDashboardPage
            .getIndicatorIdleTimeValue()
            .getText()
            .then(function(txt) {
              var time4 = txt.split(" ");
              indicatorIdleTime = parseInt(time4[0]) * 60 + parseInt(time4[1]);
            });
        });

        it("should have engagement time value", function() {
          expect(
            scheduleDashboardPage.getIndicatorEngagementTimeValue().isPresent()
          ).toBe(true);
        });

        it("should have driving/working time title", function() {
          expect(
            scheduleDashboardPage
            .getIndicatorDrivingWorkingTimeTitle()
            .isPresent()
          ).toBe(true);
        });

        it("should have driving/working time value", function() {
          expect(
            scheduleDashboardPage
            .getIndicatorDrivingWorkingTimeValue()
            .isPresent()
          ).toBe(true);
        });

        it("should have stopped time title", function() {
          expect(
            scheduleDashboardPage.getIndicatorStoppedTimeTitle().isPresent()
          ).toBe(true);
        });

        it("should have stopped time value", function() {
          expect(
            scheduleDashboardPage.getIndicatorStoppedTimeValue().isPresent()
          ).toBe(true);
        });

        it("should have idle time title", function() {
          expect(
            scheduleDashboardPage.getIndicatorIdleTimeTitle().isPresent()
          ).toBe(true);
        });

        it("should have idle time value", function() {
          expect(
            scheduleDashboardPage.getIndicatorIdleTimeValue().isPresent()
          ).toBe(true);
        });

        it("should have number of trips title", function() {
          expect(
            scheduleDashboardPage.getIndicatorNumberOfTripsTitle().isPresent()
          ).toBe(true);
        });

        it("should have number of trips value", function() {
          expect(
            scheduleDashboardPage.getIndicatorNumberOfTripsValue().isPresent()
          ).toBe(true);
        });

        it("should have total distance title", function() {
          expect(
            scheduleDashboardPage.getIndicatorTotalDistanceTitle().isPresent()
          ).toBe(true);
        });

        it("should have total distance value", function() {
          expect(
            scheduleDashboardPage.getIndicatorTotalDistanceValue().isPresent()
          ).toBe(true);
        });

        it('should have private distance title', function() {
          expect(scheduleDashboardPage.getIndicatorPrivateDistanceTitle().isPresent()).toBe(true);
        });
        
        it('should have private distance value', function() {
          expect(scheduleDashboardPage.getIndicatorPrivateDistanceValue().isPresent()).toBe(true);
        });

        it('should have Business distance title', function() {
          expect(scheduleDashboardPage.getIndicatorBusinessDistanceTimeTitle().isPresent()).toBe(true);
        });
        
        it('should have Business distance value', function() {
          expect(scheduleDashboardPage.getIndicatorBusinessDistanceTimeValue().isPresent()).toBe(true);
        });

        it("should have utilisation title", function() {
          expect(
            scheduleDashboardPage.getIndicatorUtilisationTitle().isPresent()
          ).toBe(true);
        });

        it("should have utilisation value", function() {
          expect(
            scheduleDashboardPage.getIndicatorUtilisationValue().isPresent()
          ).toBe(true);
        });

        it("should have notifications title", function() {
          expect(
            scheduleDashboardPage.getIndicatorNotificationsTitle().isPresent()
          ).toBe(true);
          expect(
            scheduleDashboardPage.getIndicatorNotificationsTitle().isDisplayed()
          ).toBe(true);
        });

        it("should have alert circle", function() {
          expect(
            scheduleDashboardPage.getIndicatorNotiAlertCircle().isPresent()
          ).toBe(true);
          expect(
            scheduleDashboardPage.getIndicatorNotiAlertValue().isPresent()
          ).toBe(true);
        });

        it("should have warning circle", function() {
          expect(
            scheduleDashboardPage.getIndicatorNotiWarnCircle().isPresent()
          ).toBe(true);
          expect(
            scheduleDashboardPage.getIndicatorNotiWarnValue().isPresent()
          ).toBe(true);
        });

        it("should have notifications circle", function() {
          expect(
            scheduleDashboardPage.getIndicatorNotiNotiCircle().isPresent()
          ).toBe(true);
          expect(
            scheduleDashboardPage.getIndicatorNotiNotiValue().isPresent()
          ).toBe(true);
        });
      });

      describe("by resources", function() {
        describe("in distance ", function() {
          beforeAll(function() {
            // browser.executeScript("arguments[0].scrollIntoView();", scheduleDashboardPage.getDistanceResultTitle().getWebElement());
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getIndicatorCloseBtn()
              )
            );
            scheduleDashboardPage.getIndicatorCloseBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getIndicatorOpenBtn()
              )
            );

            browser.wait(
              testUtils.until.visibilityOf(
                scheduleDashboardPage.getDistanceResultTitle()
              )
            );
            // get data from distance table
            scheduleDashboardPage
              .getDistanceTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    _distanceBusiness += parseFloat(text.split(/\s+/).join(""));
                  });

                elm
                  .element(by.css("td:nth-child(3) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    _distancePrivate += parseFloat(text.split(/\s+/).join(""));
                  });

                elm
                  .element(by.css("td:nth-child(4) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    text = text.split(/\s+/).join("");
                    text = text.split(/,/g).join(".");
                    _distanceTotal += parseFloat(text);
                  });
              });
          });

          it("result title should contain resources", function() {
            expect(
              scheduleDashboardPage
              .getDistanceResultTitle()
              .element(by.css("h5"))
              .getText()
            ).toContain("Resources");
          });

          it("should have distance char", function() {
            expect(scheduleDashboardPage.getDistanceChar().isPresent()).toBe(
              true
            );
          });

          it("should have distance result table", function() {
            expect(scheduleDashboardPage.getDistanceTable().isPresent()).toBe(
              true
            );
          });

          it("should have resources column", function() {
            expect(
              scheduleDashboardPage.getDistanceHeaderGridColumn(1).getText()
            ).toBe("Resource");
          });

          it("should have Business distance column", function() {
            expect(
              scheduleDashboardPage.getDistanceHeaderGridColumn(2).getText()
            ).toBe("Business distance");
          });

          it('should have private column', function() {
            expect(scheduleDashboardPage.getDistanceHeaderGridColumn(3).getText()).toBe("Private Distance");
          });

          it('should have Total distance column', function() {
            expect(scheduleDashboardPage.getDistanceHeaderGridColumn(4).getAttribute('innerText')).toBe("Total Distance");
          });

          it("table should have data", function() {
            expect(
              scheduleDashboardPage.getDistanceTableRowList().count()
            ).toBeGreaterThan(0);
          });

          it("should have export link", function() {
            expect(
              scheduleDashboardPage.getDistanceExportToExcel().isPresent()
            ).toBe(true);
          });

          describe("when the export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getDistanceExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain distance", function() {
              expect(exportPage.getExportedFileName()).toContain("distance");
            });
          });
        });

        describe("in engagement ", function() {
          beforeAll(function() {
            // browser.executeScript("arguments[0].scrollIntoView();", scheduleDashboardPage.getEngagementResultTitle().getWebElement());
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getDistanceCloseBtn()
              )
            );
            scheduleDashboardPage.getDistanceCloseBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getDistanceOpenBtn()
              )
            );

            browser.wait(
              testUtils.until.visibilityOf(
                scheduleDashboardPage.getEngagementResultTitle()
              )
            );

            scheduleDashboardPage
              .getEngagementTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) span"))
                  .getText()
                  .then(function(txt) {
                    var eng = txt.split(":");
                    _engagement += parseInt(eng[0]) * 60 + parseInt(eng[1]);
                  });

                elm
                  .element(by.css("td:nth-child(3) span"))
                  .getText()
                  .then(function(txt) {
                    var eng1 = txt.split(":");
                    _engagementWorkingDriving +=
                      parseInt(eng1[0]) * 60 + parseInt(eng1[1]);
                  });

                elm
                  .element(by.css("td:nth-child(4) span"))
                  .getText()
                  .then(function(txt) {
                    var eng2 = txt.split(":");
                    _engagementStopped +=
                      parseInt(eng2[0]) * 60 + parseInt(eng2[1]);
                  });

                elm
                  .element(by.css("td:nth-child(5) span"))
                  .getText()
                  .then(function(txt) {
                    var eng3 = txt.split(":");
                    _engagementIdel +=
                      parseInt(eng3[0]) * 60 + parseInt(eng3[1]);
                  });
              });
          });

          it("result title should contains resources", function() {
            expect(
              scheduleDashboardPage
              .getEngagementResultTitle()
              .element(by.css("h5"))
              .getText()
            ).toContain("Resources");
          });

          it("should have engagement char", function() {
            expect(scheduleDashboardPage.getEngagementChar().isPresent()).toBe(
              true
            );
          });

          it("should have engagement result table", function() {
            expect(scheduleDashboardPage.getEngagementTable().isPresent()).toBe(
              true
            );
          });

          it("should have c column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(1).getText()
            ).toBe("Resource");
          });

          it("should have Engagement column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(2).getText()
            ).toBe("Engagement");
          });

          it("should have Driving column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(3).getText()
            ).toBe("Driving");
          });

          it("should have Stopped column", function() {
            expect(
              scheduleDashboardPage
              .getEngagementHeaderColumnGrid(4)
              .getAttribute("innerText")
            ).toBe("Stopped");
          });

          it("should have Idling column", function() {
            expect(
              scheduleDashboardPage
              .getEngagementHeaderColumnGrid(5)
              .getAttribute("innerText")
            ).toBe("Idling");
          });

          it("table should have data", function() {
            expect(
              scheduleDashboardPage
              .getEngagementTable()
              .all(by.css("tbody tr"))
              .count()
            ).toBeGreaterThan(0);
          });

          it("should have export excel link", function() {
            expect(
              scheduleDashboardPage.getEngagementExport().isPresent()
            ).toBe(true);
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getEngagementExport();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain engagement", function() {
              expect(exportPage.getExportedFileName()).toContain("engagement");
            });
          });
        });

        describe("in number of trips", function() {
          beforeAll(function() {
            // browser.executeScript('arguments[0].scrollIntoView()', scheduleDashboardPage.getNumberOfTripsResultTitle().getWebElement());
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getEngagementCloseBtn()
              )
            );
            scheduleDashboardPage.getEngagementCloseBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getEngagementOpenBtn()
              )
            );

            browser.wait(
              testUtils.until.visibilityOf(
                scheduleDashboardPage.getNumberOfTripsTableHeader()
              )
            );
            browser.executeScript(
              "arguments[0].scrollIntoView()",
              scheduleDashboardPage
              .getNumberOfTripsResultTitle()
              .getWebElement()
            );

            scheduleDashboardPage
              .getNumberOfTripsTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) div"))
                  .getText()
                  .then(function(text) {
                    _numberOfTrips += parseInt(text);
                  });
              });
          });

          it("should have number of trips result title", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultTitle().isPresent()
            ).toBe(true);
          });

          it("should have number of trips result content", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultContent().isPresent()
            ).toBe(true);
          });

          it("should have number of trips chart", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsChart().isPresent()
            ).toBe(true);
          });

          it("should have number of trips table header", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsTableHeader().isPresent()
            ).toBe(true);
          });

          it("should have number of trips table content", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsTableContent().isPresent()
            ).toBe(true);
          });

          it("should have number of trips export to excel link", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsExportToExcel().isPresent()
            ).toBe(true);
          });

          it("number of trips title should contain Resources", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultTitle().getText()
            ).toContain("Resources");
          });

          it("should have table header Resource", function() {
            expect(
              scheduleDashboardPage
              .getNumberOfTripsTableHeader()
              .element(by.css("thead tr th:nth-child(1) a"))
              .getText()
            ).toBe("Resource");
          });

          it("should have table header Number of trips", function() {
            expect(
              scheduleDashboardPage
              .getNumberOfTripsTableHeader()
              .element(by.css("thead tr th:nth-child(2) a"))
              .getText()
            ).toBe("Number of trips");
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getNumberOfTripsExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain numberOfTrip", function() {
              expect(exportPage.getExportedFileName()).toContain(
                "numberOfTrip"
              );
            });
          });
        });

        describe("in fuel consumption", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getNumberOfTripsToogleArrowUp()
              )
            );
            scheduleDashboardPage.getNumberOfTripsToogleArrowUp().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getNumberOfTripsToogleArrowDown()
              )
            );
            browser.wait(
              testUtils.until.visibilityOf(
                scheduleDashboardPage.getFuelConsumptionResultTitle()
              )
            );
            browser.executeScript(
              "arguments[0].scrollIntoView()",
              scheduleDashboardPage
              .getFuelConsumptionResultTitle()
              .getWebElement()
            );
          });

          it("should have result title", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionResultTitle().isPresent()
            ).toBe(true);
          });

          it("result title should contains Resources", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionResultTitle().getText()
            ).toContain("Resources");
          });

          it("should have chart", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionChart().isPresent()
            ).toBe(true);
          });

          it("should have result table", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(1)
              .isPresent()
            ).toBe(true);
          });

          it("table should have Resource column", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(1)
              .getText()
            ).toBe("Resource");
          });

          it("should have Fuel consumption column", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(2)
              .getText()
            ).toBe("Fuel consumption");
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getFuelConsumptionExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain numberOfTrip", function() {
              expect(exportPage.getExportedFileName()).toContain("fuel");
            });
          });
        });

        describe("when checked number information", function() {
          it("indicator engagement time should not less than total engagement time", function() {
            console.log(
              "\n=================INT schedule performance dashboard======================="
            );
            console.log("\nBy resources:");
            console.log(
              "\nindicator engagement time = ",
              testUtils.formatTimeMinutes(indicatorEngagement),
              "\t~\tengagement = ",
              testUtils.formatTimeMinutes(_engagement)
            );
            expect(
              Math.abs(indicatorEngagement - _engagement)
            ).not.toBeGreaterThan(120);
          });

          it("indicator engagement working time should not less than total engagement working time", function() {
            console.log(
              "\nindicator engagement working time = ",
              testUtils.formatTimeMinutes(indicatorDrivingWorkingTime),
              "\t~\tengagement working driving time = ",
              testUtils.formatTimeMinutes(_engagementWorkingDriving)
            );
            expect(
              Math.abs(indicatorDrivingWorkingTime - _engagementWorkingDriving)
            ).not.toBeGreaterThan(120);
          });

          it("indicator engagement stopped time should not less than total engagement stopped time", function() {
            console.log(
              "\nindicator engagement stopped time = ",
              testUtils.formatTimeMinutes(indicatorIdleTime),
              "\t~\tengagement idle = ",
              testUtils.formatTimeMinutes(_engagementIdel)
            );
            expect(
              Math.abs(indicatorIdleTime - _engagementIdel)
            ).not.toBeGreaterThan(120);
          });

          it("indicator number of trips should not less than total number of trips", function() {
            console.log(
              "\nindicator number of trips = ",
              indicatorNumberOfTrip,
              "\t~\ttotal number of trips = ",
              _numberOfTrips
            );
            expect(indicatorNumberOfTrip).toBeGreaterThanOrEqual(
              _numberOfTrips
            );
          });
        });
      });

      describe("by driver", function() {
        beforeAll(function() {
          _distanceBusiness = parseFloat(0);
          _distancePrivate = parseFloat(0);
          _distanceTotal = parseFloat(0);
          _engagement = 0;
          _engagementWorkingDriving = 0;
          _engagementStopped = 0;
          _engagementIdel = 0;
          _numberOfTrips = 0;
          browser.wait(
            testUtils.until.elementToBeClickable(
              scheduleDashboardPage.getPerformanceViewByDriver()
            )
          );
          scheduleDashboardPage.getPerformanceViewByDriver().click();
          browser.wait(function() {
            return scheduleDashboardPage
              .getPerformanceViewByDriver()
              .getAttribute("class")
              .then(function(clas) {
                return clas.includes("k-state-active") == true;
              });
          });
        });

        describe("in distance", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getDistanceOpenBtn()
              )
            );
            scheduleDashboardPage.getDistanceOpenBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getDistanceCloseBtn()
              )
            );
            // get data from distance table
            scheduleDashboardPage
              .getDistanceTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    _distanceBusiness += parseFloat(text.split(/\s+/).join(""));
                  });

                elm
                  .element(by.css("td:nth-child(3) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    _distancePrivate += parseFloat(text.split(/\s+/).join(""));
                  });

                elm
                  .element(by.css("td:nth-child(4) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    text = text.split(/\s+/).join("");
                    text = text.split(/,/g).join(".");
                    _distanceTotal += parseFloat(text);
                  });
              });
          });

          it("distance title should contain Distance By Driver", function() {
            expect(
              scheduleDashboardPage.getDistanceResultTitle().getText()
            ).toContain("Distance By Driver");
          });

          it("should have distance char", function() {
            expect(scheduleDashboardPage.getDistanceChar().isPresent()).toBe(
              true
            );
          });

          it("should have distance result table", function() {
            expect(scheduleDashboardPage.getDistanceTable().isPresent()).toBe(
              true
            );
          });

          it("should have Driver column", function() {
            expect(
              scheduleDashboardPage.getDistanceHeaderGridColumn(1).getText()
            ).toBe("Driver");
          });

          it("should have Business distance column", function() {
            expect(
              scheduleDashboardPage.getDistanceHeaderGridColumn(2).getText()
            ).toBe("Business distance");
          });

          it("table should have data", function() {
            expect(
              scheduleDashboardPage.getDistanceTableRowList().count()
            ).toBeGreaterThan(0);
          });

          it("should have export link", function() {
            expect(
              scheduleDashboardPage.getDistanceExportToExcel().isPresent()
            ).toBe(true);
          });

          describe("when the export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getDistanceExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain distance", function() {
              expect(exportPage.getExportedFileName()).toContain("distance");
            });
          });
        });

        describe("in engagement", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getDistanceCloseBtn()
              )
            );
            scheduleDashboardPage.getDistanceCloseBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getDistanceOpenBtn()
              )
            );
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getEngagementOpenBtn()
              )
            );
            scheduleDashboardPage.getEngagementOpenBtn().click();
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getEngagementCloseBtn()
              )
            );
            browser.wait(
              testUtils.until.visibilityOf(
                scheduleDashboardPage.getEngagementResultTitle()
              )
            );

            scheduleDashboardPage
              .getEngagementTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) span"))
                  .getText()
                  .then(function(txt) {
                    var eng = txt.split(":");
                    _engagement += parseInt(eng[0]) * 60 + parseInt(eng[1]);
                  });

                elm
                  .element(by.css("td:nth-child(3) span"))
                  .getText()
                  .then(function(txt) {
                    var eng1 = txt.split(":");
                    _engagementWorkingDriving +=
                      parseInt(eng1[0]) * 60 + parseInt(eng1[1]);
                  });

                elm
                  .element(by.css("td:nth-child(4) span"))
                  .getText()
                  .then(function(txt) {
                    var eng2 = txt.split(":");
                    _engagementStopped +=
                      parseInt(eng2[0]) * 60 + parseInt(eng2[1]);
                  });

                elm
                  .element(by.css("td:nth-child(5) span"))
                  .getText()
                  .then(function(txt) {
                    var eng3 = txt.split(":");
                    _engagementIdel +=
                      parseInt(eng3[0]) * 60 + parseInt(eng3[1]);
                  });
              });
          });

          it("result title should contains Driver", function() {
            expect(
              scheduleDashboardPage
              .getEngagementResultTitle()
              .element(by.css("h5"))
              .getText()
            ).toContain("Driver");
          });

          it("should have engagement char", function() {
            expect(scheduleDashboardPage.getEngagementChar().isPresent()).toBe(
              true
            );
          });

          it("should have engagement result table", function() {
            expect(scheduleDashboardPage.getEngagementTable().isPresent()).toBe(
              true
            );
          });

          it("should have Resources column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(1).getText()
            ).toBe("Driver");
          });

          it("should have Engagement column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(2).getText()
            ).toBe("Engagement");
          });

          it("should have Driving column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(3).getText()
            ).toBe("Driving");
          });

          it("should have Stopped column", function() {
            expect(
              scheduleDashboardPage
              .getEngagementHeaderColumnGrid(4)
              .getAttribute("innerText")
            ).toBe("Stopped");
          });

          it("should have Idling column", function() {
            expect(
              scheduleDashboardPage
              .getEngagementHeaderColumnGrid(5)
              .getAttribute("innerText")
            ).toBe("Idling");
          });

          it("table should have data", function() {
            expect(
              scheduleDashboardPage
              .getEngagementTable()
              .all(by.css("tbody tr"))
              .count()
            ).toBeGreaterThan(0);
          });

          it("should have export excel link", function() {
            expect(
              scheduleDashboardPage.getEngagementExport().isPresent()
            ).toBe(true);
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getEngagementExport();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain engagement", function() {
              expect(exportPage.getExportedFileName()).toContain("engagement");
            });
          });
        });

        describe("in number of trips", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getEngagementCloseBtn()
              )
            );
            scheduleDashboardPage.getEngagementCloseBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getEngagementOpenBtn()
              )
            );

            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getNumberOfTripsToogleArrowDown()
              )
            );
            scheduleDashboardPage.getNumberOfTripsToogleArrowDown().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getNumberOfTripsToogleArrowUp()
              )
            );

            browser.wait(
              testUtils.until.visibilityOf(
                scheduleDashboardPage.getNumberOfTripsTableHeader()
              )
            );

            scheduleDashboardPage
              .getNumberOfTripsTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) div"))
                  .getText()
                  .then(function(text) {
                    _numberOfTrips += parseInt(text);
                  });
              });
          });

          it("should have number of trips result title", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultTitle().isPresent()
            ).toBe(true);
          });

          it("should have number of trips result content", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultContent().isPresent()
            ).toBe(true);
          });

          it("should have number of trips chart", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsChart().isPresent()
            ).toBe(true);
          });

          it("should have number of trips table header", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsTableHeader().isPresent()
            ).toBe(true);
          });

          it("should have number of trips table content", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsTableContent().isPresent()
            ).toBe(true);
          });

          it("should have number of trips export to excel link", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsExportToExcel().isPresent()
            ).toBe(true);
          });

          it("number of trips title should contain Driver", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultTitle().getText()
            ).toContain("Driver");
          });

          it("should have table header Driver", function() {
            expect(
              scheduleDashboardPage
              .getNumberOfTripsTableHeader()
              .element(by.css("thead tr th:nth-child(1) a"))
              .getText()
            ).toBe("Driver");
          });

          it("should have table header Number of trips", function() {
            expect(
              scheduleDashboardPage
              .getNumberOfTripsTableHeader()
              .element(by.css("thead tr th:nth-child(2) a"))
              .getText()
            ).toBe("Number of trips");
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getNumberOfTripsExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain numberOfTrip", function() {
              expect(exportPage.getExportedFileName()).toContain(
                "numberOfTrip"
              );
            });
          });
        });

        describe("in fuel consumption", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getNumberOfTripsToogleArrowUp()
              )
            );
            scheduleDashboardPage.getNumberOfTripsToogleArrowUp().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getNumberOfTripsToogleArrowDown()
              )
            );

            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getFuelConsumptionCloseBtn()
              )
            );
          });

          it("should have result title", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionResultTitle().isPresent()
            ).toBe(true);
          });

          it("result title should contains Driver", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionResultTitle().getText()
            ).toContain("Driver");
          });

          it("should have chart", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionChart().isPresent()
            ).toBe(true);
          });

          it("should have result table", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(1)
              .isPresent()
            ).toBe(true);
          });

          it("table should have Driver column", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(1)
              .getText()
            ).toBe("Driver");
          });

          it("should have Fuel consumption column", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(2)
              .getText()
            ).toBe("Fuel consumption");
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getFuelConsumptionExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain numberOfTrip", function() {
              expect(exportPage.getExportedFileName()).toContain("fuel");
            });
          });
        });

        describe("when checked number information", function() {
          it("indicator engagement time should not less than total engagement time", function() {
            console.log(
              "\n=================INT schedule performance dashboard======================="
            );
            console.log("\nBy driver:");
            console.log(
              "\nindicator engagement time = ",
              testUtils.formatTimeMinutes(indicatorEngagement),
              "\t~\tengagement = ",
              testUtils.formatTimeMinutes(_engagement)
            );
            expect(
              Math.abs(indicatorEngagement - _engagement)
            ).not.toBeGreaterThan(120);
          });

          it("indicator engagement working time should not less than total engagement working time", function() {
            console.log(
              "\nindicator engagement working time = ",
              testUtils.formatTimeMinutes(indicatorDrivingWorkingTime),
              "\t~\tengagement working driving time = ",
              testUtils.formatTimeMinutes(_engagementWorkingDriving)
            );
            expect(
              Math.abs(indicatorDrivingWorkingTime - _engagementWorkingDriving)
            ).not.toBeGreaterThan(120);
          });

          it("indicator engagement stopped time should not less than total engagement stopped time", function() {
            console.log(
              "\nindicator engagement stopped time = ",
              testUtils.formatTimeMinutes(indicatorIdleTime),
              "\t~\tengagement idle = ",
              testUtils.formatTimeMinutes(_engagementIdel)
            );
            expect(
              Math.abs(indicatorIdleTime - _engagementIdel)
            ).not.toBeGreaterThan(120);
          });

          it("indicator number of trips should not less than total number of trips", function() {
            console.log(
              "\nindicator number of trips = ",
              indicatorNumberOfTrip,
              "\t~\ttotal number of trips = ",
              _numberOfTrips
            );
            expect(indicatorNumberOfTrip).toBeGreaterThanOrEqual(
              _numberOfTrips
            );
          });

          it("indicator total distance should not less than total distance", function () {
            console.log(
              "\nindicator total distance = ",
              indicatorTotalDistance,
              " km\t~\ttotal distance = ",
              _distanceTotal.toFixed(3)
            );
          
            expect(
              Math.abs(
                indicatorTotalDistance - parseFloat(_distanceTotal.toFixed(2))
              )
            ).not.toBeGreaterThan(2);
          });
        });
      });
      // });

      describe("by category", function() {
        beforeAll(function() {
          _distanceBusiness = parseFloat(0);
          _distancePrivate = parseFloat(0);
          _distanceTotal = parseFloat(0);
          _engagement = 0;
          _engagementWorkingDriving = 0;
          _engagementStopped = 0;
          _engagementIdel = 0;
          _numberOfTrips = 0;
          browser.wait(
            testUtils.until.elementToBeClickable(
              scheduleDashboardPage.getPerformanceViewByCategory()
            )
          );
          scheduleDashboardPage.getPerformanceViewByCategory().click();
          browser.wait(function() {
            return scheduleDashboardPage
              .getPerformanceViewByCategory()
              .getAttribute("class")
              .then(function(clas) {
                return clas.includes("k-state-active") == true;
              });
          });
        });

        describe("in distance", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getDistanceOpenBtn()
              )
            );
            scheduleDashboardPage.getDistanceOpenBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getDistanceCloseBtn()
              )
            );
            // get data from distance table
            scheduleDashboardPage
              .getDistanceTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    text = text.replace(/\s/g, "");
                    text = text.replace(",", ".");
                    _distanceBusiness += parseFloat(text.split(/\s+/).join(""));
                  });

                elm
                  .element(by.css("td:nth-child(3) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    text = text.replace(/\s/g, "");
                    text = text.replace(",", ".");
                    _distancePrivate += parseFloat(text.split(/\s+/).join(""));
                  });

                elm
                  .element(by.css("td:nth-child(4) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    text = text.split(/\s+/).join("");
                    text = text.split(/,/g).join(".");
                    _distanceTotal += parseFloat(text);
                  });
              });
          });

          it("distance title should contain Distance By Category", function() {
            expect(
              scheduleDashboardPage.getDistanceResultTitle().getText()
            ).toContain("Distance By Category");
          });

          it("should have distance char", function() {
            expect(scheduleDashboardPage.getDistanceChar().isPresent()).toBe(
              true
            );
          });

          it("should have distance result table", function() {
            expect(scheduleDashboardPage.getDistanceTable().isPresent()).toBe(
              true
            );
          });

          it("should have Category column", function() {
            expect(
              scheduleDashboardPage.getDistanceHeaderGridColumn(1).getText()
            ).toBe("Category");
          });

          it("should have Business distance column", function() {
            expect(
              scheduleDashboardPage.getDistanceHeaderGridColumn(2).getText()
            ).toBe("Business distance");
          });
          
          it('should have private column', function() {
            expect(scheduleDashboardPage.getDistanceHeaderGridColumn(3).getText()).toBe("Private Distance");
          });
          
          it('should have Total distance column', function() {
            expect(scheduleDashboardPage.getDistanceHeaderGridColumn(4).getAttribute('innerText')).toBe("Total Distance");
          });

          it("table should have data", function() {
            expect(
              scheduleDashboardPage.getDistanceTableRowList().count()
            ).toBeGreaterThan(0);
          });

          it("should have export link", function() {
            expect(
              scheduleDashboardPage.getDistanceExportToExcel().isPresent()
            ).toBe(true);
          });

          describe("when the export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getDistanceExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain distance", function() {
              expect(exportPage.getExportedFileName()).toContain("distance");
            });
          });
        });

        describe("in engagement", function() {
          beforeAll(function() {
            // browser.executeScript("arguments[0].scrollIntoView();", scheduleDashboardPage.getEngagementResultTitle().getWebElement());
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getDistanceCloseBtn()
              )
            );
            scheduleDashboardPage.getDistanceCloseBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getDistanceOpenBtn()
              )
            );
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getEngagementOpenBtn()
              )
            );
            scheduleDashboardPage.getEngagementOpenBtn().click();
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getEngagementCloseBtn()
              )
            );
            browser.wait(
              testUtils.until.visibilityOf(
                scheduleDashboardPage.getEngagementResultTitle()
              )
            );

            scheduleDashboardPage
              .getEngagementTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) span"))
                  .getText()
                  .then(function(txt) {
                    var eng = txt.split(":");
                    _engagement += parseInt(eng[0]) * 60 + parseInt(eng[1]);
                  });

                elm
                  .element(by.css("td:nth-child(3) span"))
                  .getText()
                  .then(function(txt) {
                    var eng1 = txt.split(":");
                    _engagementWorkingDriving +=
                      parseInt(eng1[0]) * 60 + parseInt(eng1[1]);
                  });

                elm
                  .element(by.css("td:nth-child(4) span"))
                  .getText()
                  .then(function(txt) {
                    var eng2 = txt.split(":");
                    _engagementStopped +=
                      parseInt(eng2[0]) * 60 + parseInt(eng2[1]);
                  });

                elm
                  .element(by.css("td:nth-child(5) span"))
                  .getText()
                  .then(function(txt) {
                    var eng3 = txt.split(":");
                    _engagementIdel +=
                      parseInt(eng3[0]) * 60 + parseInt(eng3[1]);
                  });
              });
          });

          it("result title should contains Category", function() {
            expect(
              scheduleDashboardPage
              .getEngagementResultTitle()
              .element(by.css("h5"))
              .getText()
            ).toContain("Category");
          });

          it("should have engagement char", function() {
            expect(scheduleDashboardPage.getEngagementChar().isPresent()).toBe(
              true
            );
          });

          it("should have engagement result table", function() {
            expect(scheduleDashboardPage.getEngagementTable().isPresent()).toBe(
              true
            );
          });

          it("should have Category column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(1).getText()
            ).toBe("Category");
          });

          it("should have Engagement column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(2).getText()
            ).toBe("Engagement");
          });

          it("should have Driving column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(3).getText()
            ).toBe("Driving");
          });

          it("should have Stopped column", function() {
            expect(
              scheduleDashboardPage
              .getEngagementHeaderColumnGrid(4)
              .getAttribute("innerText")
            ).toBe("Stopped");
          });

          it("should have Idling column", function() {
            expect(
              scheduleDashboardPage
              .getEngagementHeaderColumnGrid(5)
              .getAttribute("innerText")
            ).toBe("Idling");
          });

          it("table should have data", function() {
            expect(
              scheduleDashboardPage
              .getEngagementTable()
              .all(by.css("tbody tr"))
              .count()
            ).toBeGreaterThan(0);
          });

          it("should have export excel link", function() {
            expect(
              scheduleDashboardPage.getEngagementExport().isPresent()
            ).toBe(true);
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getEngagementExport();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain engagement", function() {
              expect(exportPage.getExportedFileName()).toContain("engagement");
            });
          });
        });

        describe("in number of trips", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getEngagementCloseBtn()
              )
            );
            scheduleDashboardPage.getEngagementCloseBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getEngagementOpenBtn()
              )
            );

            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getNumberOfTripsToogleArrowDown()
              )
            );
            scheduleDashboardPage.getNumberOfTripsToogleArrowDown().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getNumberOfTripsToogleArrowUp()
              )
            );

            browser.wait(
              testUtils.until.visibilityOf(
                scheduleDashboardPage.getNumberOfTripsTableHeader()
              )
            );

            scheduleDashboardPage
              .getNumberOfTripsTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) div"))
                  .getText()
                  .then(function(text) {
                    _numberOfTrips += parseInt(text);
                  });
              });
          });

          it("should have number of trips result title", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultTitle().isPresent()
            ).toBe(true);
          });

          it("should have number of trips result content", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultContent().isPresent()
            ).toBe(true);
          });

          it("should have number of trips chart", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsChart().isPresent()
            ).toBe(true);
          });

          it("should have number of trips table header", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsTableHeader().isPresent()
            ).toBe(true);
          });

          it("should have number of trips table content", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsTableContent().isPresent()
            ).toBe(true);
          });

          it("should have number of trips export to excel link", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsExportToExcel().isPresent()
            ).toBe(true);
          });

          it("number of trips title should contain Category", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultTitle().getText()
            ).toContain("Category");
          });

          it("should have table header Category", function() {
            expect(
              scheduleDashboardPage
              .getNumberOfTripsTableHeader()
              .element(by.css("thead tr th:nth-child(1) a"))
              .getText()
            ).toBe("Category");
          });

          it("should have table header Number of trips", function() {
            expect(
              scheduleDashboardPage
              .getNumberOfTripsTableHeader()
              .element(by.css("thead tr th:nth-child(2) a"))
              .getText()
            ).toBe("Number of trips");
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getNumberOfTripsExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain numberOfTrip", function() {
              expect(exportPage.getExportedFileName()).toContain(
                "numberOfTrip"
              );
            });
          });
        });

        describe("in fuel consumption", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getNumberOfTripsToogleArrowUp()
              )
            );
            scheduleDashboardPage.getNumberOfTripsToogleArrowUp().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getNumberOfTripsToogleArrowDown()
              )
            );

            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getFuelConsumptionCloseBtn()
              )
            );
          });

          it("should have result title", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionResultTitle().isPresent()
            ).toBe(true);
          });

          it("result title should contains Category", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionResultTitle().getText()
            ).toContain("Category");
          });

          it("should have chart", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionChart().isPresent()
            ).toBe(true);
          });

          it("should have result table", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(1)
              .isPresent()
            ).toBe(true);
          });

          it("table should have Category column", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(1)
              .getText()
            ).toBe("Category");
          });

          it("should have Fuel consumption column", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(2)
              .getText()
            ).toBe("Fuel consumption");
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getFuelConsumptionExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain numberOfTrip", function() {
              expect(exportPage.getExportedFileName()).toContain("fuel");
            });
          });
        });

        describe("when checked number information", function() {
          it("indicator engagement time should not less than total engagement time", function() {
            console.log(
              "\n=================INT schedule performance dashboard======================="
            );
            console.log("\nBy category:");
            console.log(
              "\nindicator engagement time = ",
              testUtils.formatTimeMinutes(indicatorEngagement),
              "\t~\tengagement = ",
              testUtils.formatTimeMinutes(_engagement)
            );
            expect(
              Math.abs(indicatorEngagement - _engagement)
            ).not.toBeGreaterThan(120);
          });

          it("indicator engagement working time should not less than total engagement working time", function() {
            console.log(
              "\nindicator engagement working time = ",
              testUtils.formatTimeMinutes(indicatorDrivingWorkingTime),
              "\t~\tengagement working driving time = ",
              testUtils.formatTimeMinutes(_engagementWorkingDriving)
            );
            expect(
              Math.abs(indicatorDrivingWorkingTime - _engagementWorkingDriving)
            ).not.toBeGreaterThan(120);
          });

          it("indicator engagement stopped time should not less than total engagement stopped time", function() {
            console.log(
              "\nindicator engagement stopped time = ",
              testUtils.formatTimeMinutes(indicatorIdleTime),
              "\t~\tengagement idle = ",
              testUtils.formatTimeMinutes(_engagementIdel)
            );
            expect(
              Math.abs(indicatorIdleTime - _engagementIdel)
            ).not.toBeGreaterThan(120);
          });

          it("indicator number of trips should not less than total number of trips", function() {
            console.log(
              "\nindicator number of trips = ",
              indicatorNumberOfTrip,
              "\t~\ttotal number of trips = ",
              _numberOfTrips
            );
            expect(indicatorNumberOfTrip).toBeGreaterThanOrEqual(
              _numberOfTrips
            );
          });

          it("indicator total distance should not less than total distance", function () {
            console.log(
              "\nindicator total distance = ",
              indicatorTotalDistance,
              " km\t~\ttotal distance = ",
              _distanceTotal.toFixed(3)
            );
          
            expect(
              Math.abs(
                indicatorTotalDistance - parseFloat(_distanceTotal.toFixed(2))
              )
            ).not.toBeGreaterThan(2);
          });
        });
      });

      describe("by group", function() {
        beforeAll(function() {
          console.log("by group");
          _distanceBusiness = parseFloat(0);
          _distancePrivate = parseFloat(0);
          _distanceTotal = parseFloat(0);
          _engagement = 0;
          _engagementWorkingDriving = 0;
          _engagementStopped = 0;
          _engagementIdel = 0;
          _numberOfTrips = 0;
          browser.wait(
            testUtils.until.elementToBeClickable(
              scheduleDashboardPage.getPerformanceViewByGroup()
            )
          );
          scheduleDashboardPage.getPerformanceViewByGroup().click();
          browser.wait(function() {
            return scheduleDashboardPage
              .getPerformanceViewByGroup()
              .getAttribute("class")
              .then(function(clas) {
                return clas.includes("k-state-active") == true;
              });
          });
        });

        describe("in distance", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getDistanceOpenBtn()
              )
            );
            scheduleDashboardPage.getDistanceOpenBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getDistanceCloseBtn()
              )
            );
            // get data from distance table
            scheduleDashboardPage
              .getDistanceTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    text = text.replace(/\s/g, "");
                    text = text.replace(",", ".");
                    _distanceBusiness += parseFloat(text.split(/\s+/).join(""));
                  });

                elm
                  .element(by.css("td:nth-child(3) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    text = text.replace(/\s/g, "");
                    text = text.replace(",", ".");
                    _distancePrivate += parseFloat(text.split(/\s+/).join(""));
                  });

                elm
                  .element(by.css("td:nth-child(4) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    text = text.split(/\s+/).join("");
                    text = text.split(/,/g).join(".");
                    _distanceTotal += parseFloat(text);
                  });
              });
          });

          it("distance title should contain Distance By Groups", function() {
            expect(
              scheduleDashboardPage.getDistanceResultTitle().getText()
            ).toContain("Distance By Groups");
          });

          it("should have distance char", function() {
            expect(scheduleDashboardPage.getDistanceChar().isPresent()).toBe(
              true
            );
          });

          it("should have distance result table", function() {
            expect(scheduleDashboardPage.getDistanceTable().isPresent()).toBe(
              true
            );
          });

          it("should have Groups column", function() {
            expect(
              scheduleDashboardPage.getDistanceHeaderGridColumn(1).getText()
            ).toBe("Group");
          });

          it("should have Business distance column", function() {
            expect(
              scheduleDashboardPage.getDistanceHeaderGridColumn(2).getText()
            ).toBe("Business distance");
          });

          it('should have private column', function() {
            expect(scheduleDashboardPage.getDistanceHeaderGridColumn(3).getText()).toBe("Private Distance");
          });
          
          it('should have Total distance column', function() {
            expect(scheduleDashboardPage.getDistanceHeaderGridColumn(4).getAttribute('innerText')).toBe("Total Distance");
          });

          it("table should have data", function() {
            expect(
              scheduleDashboardPage.getDistanceTableRowList().count()
            ).toBeGreaterThan(0);
          });

          it("should have export link", function() {
            expect(
              scheduleDashboardPage.getDistanceExportToExcel().isPresent()
            ).toBe(true);
          });

          describe("when the export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getDistanceExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain distance", function() {
              expect(exportPage.getExportedFileName()).toContain("distance");
            });
          });
        });

        describe("in engagement", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getDistanceCloseBtn()
              )
            );
            scheduleDashboardPage.getDistanceCloseBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getDistanceOpenBtn()
              )
            );
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getEngagementOpenBtn()
              )
            );
            scheduleDashboardPage.getEngagementOpenBtn().click();
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getEngagementCloseBtn()
              )
            );
            browser.wait(
              testUtils.until.visibilityOf(
                scheduleDashboardPage.getEngagementResultTitle()
              )
            );

            scheduleDashboardPage
              .getEngagementTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) span"))
                  .getText()
                  .then(function(txt) {
                    var eng = txt.split(":");
                    _engagement += parseInt(eng[0]) * 60 + parseInt(eng[1]);
                  });

                elm
                  .element(by.css("td:nth-child(3) span"))
                  .getText()
                  .then(function(txt) {
                    var eng1 = txt.split(":");
                    _engagementWorkingDriving +=
                      parseInt(eng1[0]) * 60 + parseInt(eng1[1]);
                  });

                elm
                  .element(by.css("td:nth-child(4) span"))
                  .getText()
                  .then(function(txt) {
                    var eng2 = txt.split(":");
                    _engagementStopped +=
                      parseInt(eng2[0]) * 60 + parseInt(eng2[1]);
                  });

                elm
                  .element(by.css("td:nth-child(5) span"))
                  .getText()
                  .then(function(txt) {
                    var eng3 = txt.split(":");
                    _engagementIdel +=
                      parseInt(eng3[0]) * 60 + parseInt(eng3[1]);
                  });
              });
          });

          it("result title should contains Groups", function() {
            expect(
              scheduleDashboardPage
              .getEngagementResultTitle()
              .element(by.css("h5"))
              .getText()
            ).toContain("Groups");
          });

          it("should have engagement char", function() {
            expect(scheduleDashboardPage.getEngagementChar().isPresent()).toBe(
              true
            );
          });

          it("should have engagement result table", function() {
            expect(scheduleDashboardPage.getEngagementTable().isPresent()).toBe(
              true
            );
          });

          it("should have Groups column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(1).getText()
            ).toBe("Group");
          });

          it("should have Engagement column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(2).getText()
            ).toBe("Engagement");
          });

          it("should have Driving column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(3).getText()
            ).toBe("Driving");
          });

          it("should have Stopped column", function() {
            expect(
              scheduleDashboardPage
              .getEngagementHeaderColumnGrid(4)
              .getAttribute("innerText")
            ).toBe("Stopped");
          });

          it("should have Idling column", function() {
            expect(
              scheduleDashboardPage
              .getEngagementHeaderColumnGrid(5)
              .getAttribute("innerText")
            ).toBe("Idling");
          });

          it("table should have data", function() {
            expect(
              scheduleDashboardPage
              .getEngagementTable()
              .all(by.css("tbody tr"))
              .count()
            ).toBeGreaterThan(0);
          });

          it("should have export excel link", function() {
            expect(
              scheduleDashboardPage.getEngagementExport().isPresent()
            ).toBe(true);
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getEngagementExport();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain engagement", function() {
              expect(exportPage.getExportedFileName()).toContain("engagement");
            });
          });
        });

        describe("in number of trips", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getEngagementCloseBtn()
              )
            );
            scheduleDashboardPage.getEngagementCloseBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getEngagementOpenBtn()
              )
            );

            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getNumberOfTripsToogleArrowDown()
              )
            );
            scheduleDashboardPage.getNumberOfTripsToogleArrowDown().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getNumberOfTripsToogleArrowUp()
              )
            );

            browser.wait(
              testUtils.until.visibilityOf(
                scheduleDashboardPage.getNumberOfTripsTableHeader()
              )
            );

            scheduleDashboardPage
              .getNumberOfTripsTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) div"))
                  .getText()
                  .then(function(text) {
                    _numberOfTrips += parseInt(text);
                  });
              });
          });

          it("should have number of trips result title", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultTitle().isPresent()
            ).toBe(true);
          });

          it("should have number of trips result content", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultContent().isPresent()
            ).toBe(true);
          });

          it("should have number of trips chart", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsChart().isPresent()
            ).toBe(true);
          });

          it("should have number of trips table header", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsTableHeader().isPresent()
            ).toBe(true);
          });

          it("should have number of trips table content", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsTableContent().isPresent()
            ).toBe(true);
          });

          it("should have number of trips export to excel link", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsExportToExcel().isPresent()
            ).toBe(true);
          });

          it("number of trips title should contain Number of trips By Groups", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultTitle().getText()
            ).toContain("Number of trips By Groups");
          });

          it("should have table header Group", function() {
            expect(
              scheduleDashboardPage
              .getNumberOfTripsTableHeader()
              .element(by.css("thead tr th:nth-child(1) a"))
              .getText()
            ).toBe("Group");
          });

          it("should have table header Number of trips", function() {
            expect(
              scheduleDashboardPage
              .getNumberOfTripsTableHeader()
              .element(by.css("thead tr th:nth-child(2) a"))
              .getText()
            ).toBe("Number of trips");
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getNumberOfTripsExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain numberOfTrip", function() {
              expect(exportPage.getExportedFileName()).toContain(
                "numberOfTrip"
              );
            });
          });
        });

        describe("in fuel consumption", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getNumberOfTripsToogleArrowUp()
              )
            );
            scheduleDashboardPage.getNumberOfTripsToogleArrowUp().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getNumberOfTripsToogleArrowDown()
              )
            );
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getFuelConsumptionCloseBtn()
              )
            );
          });

          it("should have result title", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionResultTitle().isPresent()
            ).toBe(true);
          });

          it("result title should contains Fuel consumption By Groups", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionResultTitle().getText()
            ).toContain("Fuel consumption By Groups");
          });

          it("should have chart", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionChart().isPresent()
            ).toBe(true);
          });

          it("should have result table", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(1)
              .isPresent()
            ).toBe(true);
          });

          it("table should have Groups column", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(1)
              .getText()
            ).toBe("Group");
          });

          it("should have Fuel consumption column", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(2)
              .getText()
            ).toBe("Fuel consumption");
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getFuelConsumptionExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain numberOfTrip", function() {
              expect(exportPage.getExportedFileName()).toContain("fuel");
            });
          });
        });

        describe("when checked number information", function() {
          it("indicator engagement time should not less than total engagement time", function() {
            console.log(
              "\n=================INT schedule performance dashboard======================="
            );
            console.log("\nBy groups:");
            console.log(
              "\nindicator engagement time = ",
              testUtils.formatTimeMinutes(indicatorEngagement),
              "\t~\tengagement = ",
              testUtils.formatTimeMinutes(_engagement)
            );
            expect(
              Math.abs(indicatorEngagement - _engagement)
            ).not.toBeGreaterThan(120);
          });

          it("indicator engagement working time should not less than total engagement working time", function() {
            console.log(
              "\nindicator engagement working time = ",
              testUtils.formatTimeMinutes(indicatorDrivingWorkingTime),
              "\t~\tengagement working driving time = ",
              testUtils.formatTimeMinutes(_engagementWorkingDriving)
            );
            expect(
              Math.abs(indicatorDrivingWorkingTime - _engagementWorkingDriving)
            ).not.toBeGreaterThan(120);
          });

          it("indicator engagement stopped time should not less than total engagement stopped time", function() {
            console.log(
              "\nindicator engagement stopped time = ",
              testUtils.formatTimeMinutes(indicatorIdleTime),
              "\t~\tengagement idle = ",
              testUtils.formatTimeMinutes(_engagementIdel)
            );
            expect(
              Math.abs(indicatorIdleTime - _engagementIdel)
            ).not.toBeGreaterThan(120);
          });

          it("indicator number of trips should not less than total number of trips", function() {
            console.log(
              "\nindicator number of trips = ",
              indicatorNumberOfTrip,
              "\t~\ttotal number of trips = ",
              _numberOfTrips
            );
            expect(indicatorNumberOfTrip).toBeGreaterThanOrEqual(
              _numberOfTrips
            );
          });

          it("indicator total distance should not less than total distance", function () {
            console.log(
              "\nindicator total distance = ",
              indicatorTotalDistance,
              " km\t~\ttotal distance = ",
              _distanceTotal.toFixed(3)
            );
          
            expect(
              Math.abs(
                indicatorTotalDistance - parseFloat(_distanceTotal.toFixed(2))
              )
            ).not.toBeGreaterThan(2);
          });
        });
      });
      // });

      describe("by time", function() {
        beforeAll(function() {
          console.log("by. time");
          _distanceBusiness = parseFloat(0);
          _distancePrivate = parseFloat(0);
          _distanceTotal = parseFloat(0);
          _engagement = 0;
          _engagementWorkingDriving = 0;
          _engagementStopped = 0;
          _engagementIdel = 0;
          _numberOfTrips = 0;

          browser.wait(
            testUtils.until.elementToBeClickable(
              scheduleDashboardPage.getPerformanceViewByTime()
            )
          );
          scheduleDashboardPage.getPerformanceViewByTime().click();
          browser.wait(function() {
            return scheduleDashboardPage
              .getPerformanceViewByTime()
              .getAttribute("class")
              .then(function(clas) {
                return clas.includes("k-state-active") == true;
              });
          });
        });

        describe("in distance", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getDistanceOpenBtn()
              )
            );
            scheduleDashboardPage.getDistanceOpenBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getDistanceCloseBtn()
              )
            );
            // get data from distance table
            scheduleDashboardPage
              .getDistanceTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    text = text.replace(/\s/g, "");
                    text = text.replace(",", ".");
                    _distanceBusiness += parseFloat(text.split(/\s+/).join(""));
                  });

                elm
                  .element(by.css("td:nth-child(3) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    text = text.replace(/\s/g, "");
                    text = text.replace(",", ".");
                    _distancePrivate += parseFloat(text.split(/\s+/).join(""));
                  });

                elm
                  .element(by.css("td:nth-child(4) div"))
                  .getAttribute("innerText")
                  .then(function(text) {
                    text = text.split(/\s+/).join("");
                    text = text.split(/,/g).join(".");
                    _distanceTotal += parseFloat(text);
                  });
              });
          });

          it("distance title should contain Distance By Time", function() {
            expect(
              scheduleDashboardPage.getDistanceResultTitle().getText()
            ).toContain("Time");
          });

          it("should have distance char", function() {
            expect(scheduleDashboardPage.getDistanceChar().isPresent()).toBe(
              true
            );
          });

          it("should have distance result table", function() {
            expect(scheduleDashboardPage.getDistanceTable().isPresent()).toBe(
              true
            );
          });

          it("should have Time column", function() {
            expect(
              scheduleDashboardPage.getDistanceHeaderGridColumn(1).getText()
            ).toBe("Time");
          });

          it("should have Business distance column", function() {
            expect(
              scheduleDashboardPage.getDistanceHeaderGridColumn(2).getText()
            ).toBe("Business distance");
          });

          it('should have private column', function() {
            expect(scheduleDashboardPage.getDistanceHeaderGridColumn(3).getText()).toBe("Private Distance");
          });
          
          it('should have Total distance column', function() {
            expect(scheduleDashboardPage.getDistanceHeaderGridColumn(4).getAttribute('innerText')).toBe("Total Distance");
          });

          it("table should have data", function() {
            expect(
              scheduleDashboardPage.getDistanceTableRowList().count()
            ).toBeGreaterThan(0);
          });

          it("should have export link", function() {
            expect(
              scheduleDashboardPage.getDistanceExportToExcel().isPresent()
            ).toBe(true);
          });

          describe("when the export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getDistanceExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain distance", function() {
              expect(exportPage.getExportedFileName()).toContain("distance");
            });
          });
        });

        describe("in engagement", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getDistanceCloseBtn()
              )
            );
            scheduleDashboardPage.getDistanceCloseBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getDistanceOpenBtn()
              )
            );
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getEngagementOpenBtn()
              )
            );
            scheduleDashboardPage.getEngagementOpenBtn().click();
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getEngagementCloseBtn()
              )
            );
            browser.wait(
              testUtils.until.visibilityOf(
                scheduleDashboardPage.getEngagementResultTitle()
              )
            );

            scheduleDashboardPage
              .getEngagementTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) span"))
                  .getText()
                  .then(function(txt) {
                    var eng = txt.split(":");
                    _engagement += parseInt(eng[0]) * 60 + parseInt(eng[1]);
                  });

                elm
                  .element(by.css("td:nth-child(3) span"))
                  .getText()
                  .then(function(txt) {
                    var eng1 = txt.split(":");
                    _engagementWorkingDriving +=
                      parseInt(eng1[0]) * 60 + parseInt(eng1[1]);
                  });

                elm
                  .element(by.css("td:nth-child(4) span"))
                  .getText()
                  .then(function(txt) {
                    var eng2 = txt.split(":");
                    _engagementStopped +=
                      parseInt(eng2[0]) * 60 + parseInt(eng2[1]);
                  });

                elm
                  .element(by.css("td:nth-child(5) span"))
                  .getText()
                  .then(function(txt) {
                    var eng3 = txt.split(":");
                    _engagementIdel +=
                      parseInt(eng3[0]) * 60 + parseInt(eng3[1]);
                  });
              });
          });

          it("result title should contains Engagement time By Time", function() {
            expect(
              scheduleDashboardPage
              .getEngagementResultTitle()
              .element(by.css("h5"))
              .getText()
            ).toContain("Engagement time By Time");
          });

          it("should have engagement char", function() {
            expect(scheduleDashboardPage.getEngagementChar().isPresent()).toBe(
              true
            );
          });

          it("should have engagement result table", function() {
            expect(scheduleDashboardPage.getEngagementTable().isPresent()).toBe(
              true
            );
          });

          it("should have  column Time", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(1).getText()
            ).toBe("Time");
          });

          it("should have Engagement column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(2).getText()
            ).toBe("Engagement");
          });

          it("should have Driving column", function() {
            expect(
              scheduleDashboardPage.getEngagementHeaderColumnGrid(3).getText()
            ).toBe("Driving");
          });

          it("should have Stopped column", function() {
            expect(
              scheduleDashboardPage
              .getEngagementHeaderColumnGrid(4)
              .getAttribute("innerText")
            ).toBe("Stopped");
          });

          it("should have Idling column", function() {
            expect(
              scheduleDashboardPage
              .getEngagementHeaderColumnGrid(5)
              .getAttribute("innerText")
            ).toBe("Idling");
          });

          it("table should have data", function() {
            expect(
              scheduleDashboardPage
              .getEngagementTable()
              .all(by.css("tbody tr"))
              .count()
            ).toBeGreaterThan(0);
          });

          it("should have export excel link", function() {
            expect(
              scheduleDashboardPage.getEngagementExport().isPresent()
            ).toBe(true);
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getEngagementExport();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain engagement", function() {
              expect(exportPage.getExportedFileName()).toContain("engagement");
            });
          });
        });

        describe("in number of trips", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getEngagementCloseBtn()
              )
            );
            scheduleDashboardPage.getEngagementCloseBtn().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getEngagementOpenBtn()
              )
            );

            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getNumberOfTripsToogleArrowDown()
              )
            );
            scheduleDashboardPage.getNumberOfTripsToogleArrowDown().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getNumberOfTripsToogleArrowUp()
              )
            );

            browser.wait(
              testUtils.until.visibilityOf(
                scheduleDashboardPage.getNumberOfTripsTableHeader()
              )
            );

            scheduleDashboardPage
              .getNumberOfTripsTableRowList()
              .each(function(elm) {
                elm
                  .element(by.css("td:nth-child(2) div"))
                  .getText()
                  .then(function(text) {
                    _numberOfTrips += parseInt(text);
                  });
              });
          });

          it("should have number of trips result title", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultTitle().isPresent()
            ).toBe(true);
          });

          it("should have number of trips result content", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultContent().isPresent()
            ).toBe(true);
          });

          it("should have number of trips chart", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsChart().isPresent()
            ).toBe(true);
          });

          it("should have number of trips table header", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsTableHeader().isPresent()
            ).toBe(true);
          });

          it("should have number of trips table content", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsTableContent().isPresent()
            ).toBe(true);
          });

          it("should have number of trips export to excel link", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsExportToExcel().isPresent()
            ).toBe(true);
          });

          it("number of trips title should contain Time", function() {
            expect(
              scheduleDashboardPage.getNumberOfTripsResultTitle().getText()
            ).toContain("Time");
          });

          it("should have table header Time", function() {
            expect(
              scheduleDashboardPage
              .getNumberOfTripsTableHeader()
              .element(by.css("thead tr th:nth-child(1) a"))
              .getText()
            ).toBe("Time");
          });

          it("should have table header Number of trips", function() {
            expect(
              scheduleDashboardPage
              .getNumberOfTripsTableHeader()
              .element(by.css("thead tr th:nth-child(2) a"))
              .getText()
            ).toBe("Number of trips");
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getNumberOfTripsExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain numberOfTrip", function() {
              expect(exportPage.getExportedFileName()).toContain(
                "numberOfTrip"
              );
            });
          });
        });

        describe("in fuel consumption", function() {
          beforeAll(function() {
            browser.wait(
              testUtils.until.elementToBeClickable(
                scheduleDashboardPage.getNumberOfTripsToogleArrowUp()
              )
            );
            scheduleDashboardPage.getNumberOfTripsToogleArrowUp().click();
            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getNumberOfTripsToogleArrowDown()
              )
            );

            browser.wait(
              testUtils.until.presenceOf(
                scheduleDashboardPage.getFuelConsumptionCloseBtn()
              )
            );
          });

          it("should have result title", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionResultTitle().isPresent()
            ).toBe(true);
          });

          it("result title should contains Time", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionResultTitle().getText()
            ).toContain("Time");
          });

          it("should have chart", function() {
            expect(
              scheduleDashboardPage.getFuelConsumptionChart().isPresent()
            ).toBe(true);
          });

          it("should have result table", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(1)
              .isPresent()
            ).toBe(true);
          });

          it("table should have Time column", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(1)
              .getText()
            ).toBe("Time");
          });

          it("should have Fuel consumption column", function() {
            expect(
              scheduleDashboardPage
              .getFuelConsumptionResultTableHeaderGridColumn(2)
              .getText()
            ).toBe("Fuel consumption");
          });

          describe("when export link clicked", function() {
            beforeAll(function() {
              exportPage.export("excel", function() {
                return scheduleDashboardPage.getFuelConsumptionExportToExcel();
              });
            });

            it("should have exported file", function() {
              expect(fs.existsSync(exportPage.getExportedFileName())).toBe(
                true
              );
            });

            it("file name should contain numberOfTrip", function() {
              expect(exportPage.getExportedFileName()).toContain("fuel");
            });
          });
        });

        describe("when checked number information", function() {
          it("indicator engagement time should not less than total engagement time", function() {
            console.log(
              "\n=================INT schedule performance dashboard======================="
            );
            console.log("\nBy time:");
            console.log(
              "\nindicator engagement time = ",
              testUtils.formatTimeMinutes(indicatorEngagement),
              "\t~\tengagement = ",
              testUtils.formatTimeMinutes(_engagement)
            );
            expect(
              Math.abs(indicatorEngagement - _engagement)
            ).not.toBeGreaterThan(120);
          });

          it("indicator engagement working time should not less than total engagement working time", function() {
            console.log(
              "\nindicator engagement working time = ",
              testUtils.formatTimeMinutes(indicatorDrivingWorkingTime),
              "\t~\tengagement working driving time = ",
              testUtils.formatTimeMinutes(_engagementWorkingDriving)
            );
            expect(
              Math.abs(indicatorDrivingWorkingTime - _engagementWorkingDriving)
            ).not.toBeGreaterThan(120);
          });

          it("indicator engagement stopped time should not less than total engagement stopped time", function() {
            console.log(
              "\nindicator engagement stopped time = ",
              testUtils.formatTimeMinutes(indicatorIdleTime),
              "\t~\tengagement idle = ",
              testUtils.formatTimeMinutes(_engagementIdel)
            );
            expect(
              Math.abs(indicatorIdleTime - _engagementIdel)
            ).not.toBeGreaterThan(120);
          });

          it("indicator number of trips should not less than total number of trips", function() {
            console.log(
              "\nindicator number of trips = ",
              indicatorNumberOfTrip,
              "\t~\ttotal number of trips = ",
              _numberOfTrips
            );
            expect(indicatorNumberOfTrip).toBeGreaterThanOrEqual(
              _numberOfTrips
            );
          });

          it("indicator total distance should not less than total distance", function () {
            console.log(
              "\nindicator total distance = ",
              indicatorTotalDistance,
              " km\t~\ttotal distance = ",
              _distanceTotal.toFixed(3)
            );
          
            expect(
              Math.abs(
                indicatorTotalDistance - parseFloat(_distanceTotal.toFixed(2))
              )
            ).not.toBeGreaterThan(2);
          });
        });
      });
    });
  });
})();
