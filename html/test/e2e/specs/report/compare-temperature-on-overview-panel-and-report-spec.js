(function() {
  'use strict';

  var mainPage = require('./MainPage.js'),
    overViewPage = require("./OverViewPanelPage"),
    map = require('./MainMapPage.js'),
    temperaturePage = require("./ReportTemperaturePage"),
    mainReportPage = require("./MainReportPage"),
    reportListPage = require("./ReportListPage"),
    testUtils = require('./TestUtils');

  describe('when compare temperature', function() {

    var overviewTemperature, reportTemperature, overviewTemperatureSince,
      reportTemperatureSince, lastTime, _lastTime,valu,
      reportDuration, overviewDuration;

    describe('on overview panel', function() {

      beforeAll(function() {

        console.log("\n=============Compare temperature on overview panel and temperature report================");

        browser.wait(testUtils.until.presenceOf(mainPage.getTrackingTab()));
        browser.wait(testUtils.until.elementToBeClickable(mainPage.getTrackingTab()));
        mainPage.clickTrackingViewTab();
        browser.wait(testUtils.until.presenceOf(mainPage.getOverviewBtn()));
        browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()));

        mainPage.getOverviewBtn().click();
        browser.wait(testUtils.until.presenceOf(overViewPage.getOverviewPanel()));
        browser.wait(testUtils.until.presenceOf(overViewPage.getSearchInput()));
        browser.wait(testUtils.until.elementToBeClickable(overViewPage.getSearchInput()));
        overViewPage.getSearchInput().click();

        overViewPage.getSearchInput().sendKeys("temperature");
        browser.wait(function() {
          return overViewPage.getAllOverviewGridRow().count().then(function(count) {
            return count == 1;
          });
        });

        browser.wait(testUtils.until.elementToBeClickable(overViewPage.getOverviewGridRow(1)));
        overViewPage.getOverviewGridRow(1).click();
        browser.wait(testUtils.until.presenceOf(map.getMapElementPopup()));
        browser.wait(testUtils.until.presenceOf(map.getMapTooltipName()));
        browser.wait(testUtils.until.presenceOf(map.getMapTooltipTemperatureNumber()));

        browser.wait(testUtils.until.presenceOf(map.getMapTooltipTemperatureDescription()));
        browser.wait(function() {
          return map.getMapTooltipStatusTime().getText().then(function(text) {
            return text.length > 0;
          });
        });

        map.getMapTooltipTemperatureNumber().getText().then(function(text) {
          overviewTemperature = parseFloat(text);
          console.log("\nOverview temperature number = ", overviewTemperature);
        });

        map.getMapTooltipTemperatureDescription().getText().then(function(text) {
          overviewTemperatureSince = text.substring(17);
          overviewDuration = parseInt(text.substring(17).match(/(\d+)/));
          console.log("\nOverview temperature since = *", overviewTemperatureSince,"*");
        });
      });

      describe('and on temperature report,', function() {

        beforeAll(function() {

          browser.wait(testUtils.until.elementToBeClickable(mainPage.getReportTab()));
          mainPage.clickReportTab();
          browser.wait(testUtils.until.presenceOf(mainReportPage.getTemperatureDetails()));
          browser.wait(testUtils.until.elementToBeClickable(mainReportPage.getTemperatureDetails()));
          mainReportPage.clickTemperatureDetails();

          browser.wait(testUtils.until.presenceOf(mainReportPage.getShowButton()));
          browser.wait(testUtils.until.presenceOf(reportListPage.getTimeFromTitle()));
          browser.executeScript("arguments[0].scrollIntoView();", reportListPage.getTimeFromTitle().getWebElement());
          browser.wait(testUtils.until.elementToBeClickable(reportListPage.getVehiclesSelectors()));
          reportListPage.getVehiclesSelectors().click();

          browser.wait(testUtils.until.presenceOf(element.all(by.css('ul[aria-hidden="false"] li'))));
          element.all(by.css('ul[aria-hidden="false"] li')).each(function (el,index) {
            el.getAttribute("innerText").then(function (text) {
              if(text.localeCompare("temperature") == 0){
                browser.executeScript("arguments[0].click();", el.getWebElement());
              }
            });
          })

          .then(function () {

          reportListPage.getTimeToInput().getAttribute("value").then(function (val) {
            console.log("\nCurrent time = ",val);
            valu = testUtils.timestrToSec2(val.split(' ')[1]);
          });

          browser.wait(testUtils.until.elementToBeClickable(mainReportPage.getShowButton()));
          mainReportPage.getShowButton().click();
          browser.wait(testUtils.until.stalenessOf(mainReportPage.getLoaderReportSpinner()));
          browser.wait(testUtils.until.presenceOf(mainReportPage.getExpandAllButton()));
          browser.wait(testUtils.until.elementToBeClickable(mainReportPage.getExpandAllButton()));

          browser.wait(testUtils.until.presenceOf(temperaturePage.getLastReportDayRow()));
          mainReportPage.getExpandAllButton().click();
          browser.wait(testUtils.until.presenceOf(temperaturePage.getLastDataRowOfLastDayRow()));

          temperaturePage.getLastDataRowOfLastDayRow().element(by.css("div:nth-child(2).medium-3")).getAttribute("innerHTML").then(function(temp) {
            reportTemperature = parseFloat(temp);
            console.log("\nReport temperature number = ", reportTemperature);
          });

          temperaturePage.getLastDataRowOfLastDayRow().element(by.css("div:nth-child(1).medium-2")).getAttribute("innerHTML").then(function(temp) {
            _lastTime = temp;
            lastTime = testUtils.timestrToSec(temp); //seconds
          });
        });
        });

        it("overview temperature number should be same reporttemperature number", function() {
          expect(reportTemperature).toBe(overviewTemperature);
        });

        it('overview since time should be not greater than report since time', function() {
          reportDuration = Math.abs(valu - lastTime);
          console.log("\nlast time of temperature in report = ", _lastTime);
          console.log("\nCurrent time - last time of temp in the report = ", testUtils.formatTime(reportDuration));

          expect( Math.abs(reportDuration - overviewDuration * 60)).not.toBeGreaterThan(300);
        });
      });
    });
  });
})();
