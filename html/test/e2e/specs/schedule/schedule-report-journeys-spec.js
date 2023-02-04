(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainReportPage = require('./MainReportPage'),
    reportListPage = require('./ReportListPage'),
    filterPanelPage = require('./FilterPanelPage'),
    mainPage = require('./MainPage');

  describe('on report view ', function() {
    var today,
      day,
      totalDistance = 0.000,
      totalDuration = 0,
      sum,
      roundedString,
      rounded,
      numberOfTrips,
      departureTime,
      departureLocation,
      journeyDistance,
      journeyDuration,
      arrivalHours,
      arrivalLocation,
      stopDuration,
      engagemeDuration,
      last_friday,
      temp1,
      temp;
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainPage.getReportTab()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getReportTab()));
      mainPage.clickReportTab();
      browser.wait(testUtils.until.presenceOf(mainReportPage.getReportView()));
      browser.wait(testUtils.until.presenceOf(reportListPage.getReportList()));
      browser.wait(testUtils.until.elementToBeClickable(reportListPage.getJourneysCard()));
      reportListPage.clickJourneysCard();
      browser.wait(testUtils.until.presenceOf(reportListPage.getReportControlPanel()));
    });

    describe('check journeys card ', function() {
      beforeAll(function() {
        sum = Number(0.000);
        last_friday = reportListPage.getLastDayOccurence(new Date(), 'Fri');
        browser.wait(testUtils.until.presenceOf(reportListPage.getCustomDayRadio()));
        browser.wait(testUtils.until.elementToBeClickable(reportListPage.getCustomDayRadio()));
        reportListPage.clickCustomDayRadio();
        browser.wait(testUtils.until.elementToBeClickable(reportListPage.getTimeFromInput()));
        reportListPage.clickTimeFromInput();
        reportListPage.getTimeFromInput().sendKeys(protractor.Key.END);
        reportListPage.clearString(reportListPage.getTimeFromInput());
        //in js, month 0-11
        reportListPage.getTimeFromInput().sendKeys((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear() + " 00:00");
        reportListPage.clickTimeToInput();
        reportListPage.getTimeToInput().sendKeys(protractor.Key.END);
        reportListPage.clearString(reportListPage.getTimeToInput());
        reportListPage.getTimeToInput().sendKeys((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear() + " 23:59");
        browser.wait(function() {
          return reportListPage.getTimeToInput().getAttribute('value').then(function(value) {
            return value == ((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear() + " 23:59");
          });
        });
        browser.wait(testUtils.until.elementToBeClickable(reportListPage.getVehiclesSelector()));
        reportListPage.getVehiclesSelector().click();
        browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(2)'))));
        browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(2)')).getWebElement());
        browser.wait(testUtils.until.elementToBeClickable(reportListPage.getShowBtn()));
        reportListPage.clickShowBtn();
        browser.wait(testUtils.until.presenceOf(element(by.css('report-viewer .report-rendering-row .report-rendering-template.activity .report-scrollable .report-total-week'))), 10000, "Timeout loading data of journey schedule report");
        browser.wait(testUtils.until.presenceOf(reportListPage.getSelectedTotalDayRow()));
        browser.wait(testUtils.until.visibilityOf(reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(1).medium-3 div:nth-child(1).medium-4'))));
      });

      it('The day of departure is same from to', function() {
        reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(1).medium-3 div:nth-child(1).medium-4')).getText().then(function(txt) {
          var arr = (txt.split("\n")[1]).split(" ");
          numberOfTrips = parseInt(arr[0]);
          // console.log((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear());
          expect(txt).toContain((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear());
        });
      });

      it('should have departure time', function() {
        expect(reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(1).medium-3 div:nth-child(2).medium-4')).isPresent()).toBe(true);
        reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(1).medium-3 div:nth-child(2).medium-4')).getText().then(function(text) {
          departureTime = text;
        });
      });

      it('should have departure location ', function() {
        expect(reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(1) div:nth-child(3).medium-4')).isPresent()).toBe(true);
        reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(1) div:nth-child(3).medium-4')).getText().then(function(text) {
          departureLocation = text;
        });
      });

      it('should have journey distance', function() {
        expect(reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(2).medium-4 div:nth-child(1).medium-3')).isPresent()).toBe(true);
        reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(2).medium-4 div:nth-child(1).medium-3')).getText().then(function(text) {
          journeyDistance = text;
        });
      });

      it('should have journey duration', function() {
        expect(reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(2).medium-4 div:nth-child(2).medium-3.ng-binding')).isPresent()).toBe(true);
        reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(2).medium-4 div:nth-child(2).medium-3.ng-binding')).getText().then(function(text) {
          journeyDuration = text;
        });
      });

      it('should have arrival hours', function() {
        expect(reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(3).medium-3 div:nth-child(1).medium-4')).isPresent()).toBe(true);
        reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(3).medium-3 div:nth-child(1).medium-4')).getText().then(function(text) {
          arrivalHours = text;
        });
      });

      it('should have arrival location', function() {
        expect(reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(3).medium-3 div:nth-child(2).medium-8')).isPresent()).toBe(true);
        reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(3).medium-3 div:nth-child(2).medium-8')).getText().then(function(text) {
          arrivalLocation = text;
        });
      });

      it('should have stop duration', function() {
        expect(reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(4).medium-1 div:nth-child(1).medium-12')).isPresent()).toBe(true);
        reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(4).medium-1 div:nth-child(1).medium-12')).getText().then(function(text) {
          stopDuration = text;
        });
      });

      it('should have engagement duration ', function() {
        expect(reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(5).medium-1 div:nth-child(1).medium-12')).isPresent()).toBe(true);
        reportListPage.getSelectedTotalDayRow().element(by.css('div:nth-child(5).medium-1 div:nth-child(1).medium-12')).getText().then(function(text) {
          stopDuration = text;
        });
      });

      describe('when click selected total day row', function() {
        beforeAll(function() {
          reportListPage.getSelectedTotalDayRow().click();
          browser.wait(testUtils.until.presenceOf(reportListPage.getTripsOfDay()));
        });

        it('trips row should have same day as total selected day row', function() {
          reportListPage.getTripsOfDay().each(function(elem) {
            expect(elem.element(by.css('div:nth-child(1).medium-3 div:nth-child(1).medium-4')).getAttribute("innerHTML")).toBe((last_friday.getUTCDate() < 10 ? ('0' + last_friday.getUTCDate()) : last_friday.getUTCDate()) + "/" + ((last_friday.getUTCMonth() < 9) ? ("0" + (last_friday.getUTCMonth() + 1)) : (last_friday.getUTCMonth() + 1)) + "/" + last_friday.getUTCFullYear());
          });
        });

        it('first trip should have same departure time as total selected day', function() {
          reportListPage.getTripsOfDay().first().element(by.css("div:nth-child(1).medium-3 div:nth-child(2).medium-4")).getText().then(function(txt) {
            expect(txt).toBe(departureTime);
          });
        });

        it('first trip should have same departure location as total selected day', function() {
          reportListPage.getTripsOfDay().first().element(by.css("div:nth-child(1).medium-3 div:nth-child(3).medium-4")).getText().then(function(txt) {
            expect(txt.trim()).toBe(departureLocation.trim());
          });
        });

        it('The total period should be sum of distance', function() {
          reportListPage.getTripsOfDay().each(function(elem) {
            elem.element(by.css('div:nth-child(2).medium-4 div:nth-child(1).medium-3')).getText().then(function(txt) {
              sum = sum + Number(txt);
            });
          }).then(function() {
            expect(parseFloat(journeyDistance)).toBe(sum);
          });
        });

        it('trips should have total duration as total selected day row', function() {
          reportListPage.getTripsOfDay().each(function(elem) {
            elem.element(by.css("div:nth-child(2).medium-4 div.medium-12 div:nth-child(2).medium-3")).getText().then(function(txt) {
              var arr1 = txt.split(":");
              totalDuration = totalDuration + Number(arr1[0] * 3600) + Number(arr1[1] * 60) + Number(arr1[2]);
            });
          }).then(function() {
            expect(((parseInt(totalDuration / 3600) < 10) ? ("0" + parseInt(totalDuration / 3600)) : parseInt(totalDuration / 3600)) + ":" + ((parseInt((totalDuration % 3600) / 60) < 10) ? ("0" + parseInt((totalDuration % 3600) / 60)) : (parseInt((totalDuration % 3600) / 60))) + ":" + ((parseInt((totalDuration % 3600) % 60) < 10) ? ("0" + parseInt((totalDuration % 3600) % 60)) : (parseInt((totalDuration % 3600) % 60)))).toBe(journeyDuration);
          });
        });

        describe('on each trip', function() {
          beforeAll(function() {


          });
        });
        it('The arrival time of trip should be departure time + duration of trip + stop time duration', function() {
          reportListPage.getTripsOfDay().each(function(elm) {
            var num1, num2, num3, num4;
            //arrival time
            elm.element(by.css("div.medium-3:nth-child(3) div.medium-4:nth-child(1)")).getText().then(function(text) {
              num1 = text;
            }).then(function() {
              // departure time
              elm.element(by.css("div.medium-3:nth-child(1) div.medium-4:nth-child(2)")).getText().then(function(text) {
                num2 = text;
              });
            }).then(function() {
              //journey time
              elm.element(by.css("div.medium-4:nth-child(2) div.medium-3:nth-child(2)")).getText().then(function(text) {
                num3 = text;
              });
            }).
            then(function() {
              expect(Math.abs(reportListPage.convertTimeStringToSeconds(num1) -
                  reportListPage.convertTimeStringToSeconds(num2) -
                  reportListPage.convertTimeStringToSeconds2(num3)
                ))
                .toBeLessThan(60);
            });
          });
        });

        it('last trip should have as arrival time as total selected day row', function() {
          reportListPage.getTripsOfDay().last().element(by.css('div:nth-child(3).medium-3 div:nth-child(1).medium-4')).getText().then(function(txt) {
            expect(txt).toBe(arrivalHours);
          });
        });

        it('last trip should have same arrival location as selected day row', function() {
          reportListPage.getTripsOfDay().last().element(by.css('div:nth-child(3).medium-3 div:nth-child(2).medium-8')).getText().then(function(txt) {
            expect(txt).toBe(arrivalLocation);
          });
        });
      });
    });
  });
})();
