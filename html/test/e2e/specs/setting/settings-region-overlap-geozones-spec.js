(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    mainSettingsPage = require("./MainSettingsPage"),
    mainPage = require("./MainPage"),
    settingsGeozonesPage = require("./SettingsGeozonesPage");

  describe('on', function() {
    beforeAll(function() {
      browser.wait(testUtils.until.stalenessOf(element(by.css(".lf-loader-overlay.app-loader"))));
      browser.wait(testUtils.until.presenceOf(mainPage.getSettingsTab()));
    });

    describe('settings geozones', function() {
      beforeAll(function() {

        browser.wait(testUtils.until.elementToBeClickable(mainPage.getSettingsTab()));
        browser.executeScript("arguments[0].click();", mainPage.getSettingsTab().getWebElement());
        browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsGeozonesButton()));
        browser.wait(testUtils.until.elementToBeClickable(mainSettingsPage.getSettingsGeozonesButton()));
        mainSettingsPage.getSettingsGeozonesButton().click();
        browser.wait(testUtils.until.stalenessOf(settingsGeozonesPage.getLoadingSpinner2()));
        browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsGeozonesView()));
        browser.wait(testUtils.until.presenceOf(settingsGeozonesPage.getOverlapWithGeozones()));
        browser.wait(testUtils.until.elementToBeClickable(settingsGeozonesPage.getSearchNameInput()));
        settingsGeozonesPage.getSearchNameInput().sendKeys("test1512");
        browser.wait(function() {
          return settingsGeozonesPage.getGeozoneRowList().count().then(function(count) {
            return count == 1;
          });
        });

        browser.wait(testUtils.until.elementToBeClickable(settingsGeozonesPage.getDetectGeozoneOverlap()));
        settingsGeozonesPage.getDetectGeozoneOverlap().click();
        browser.wait(testUtils.until.stalenessOf(settingsGeozonesPage.getLoadingSpinner2()));
        browser.wait(testUtils.until.presenceOf(settingsGeozonesPage.getGridRow(1).element(by.css("td:nth-child(10) div span:nth-child(2)"))));
        browser.wait(testUtils.until.presenceOf(settingsGeozonesPage.getOverlapWithGeozones()));
      });


      describe('when geozone checked', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(settingsGeozonesPage.getGridRow(1).element(by.css("td:nth-child(1)"))));
          browser.wait(function() {
            return settingsGeozonesPage.getGridRow(1).element(by.css("td:nth-child(9) span")).getAttribute("innerText").then(function(text) {
              return text != "";
            });
          });
        });

        it('should have Regions belonging column', function() {
          expect(settingsGeozonesPage.getRegionsBelongingColumn().isPresent()).toBe(true);
          expect(settingsGeozonesPage.getRegionsBelongingColumn().getAttribute("innerText")).toBe("Regions belonging");
        });

        it('should have Overlap with geozone column', function() {
          expect(settingsGeozonesPage.getOverlapWithGeozones().isPresent()).toBe(true);
          expect(settingsGeozonesPage.getOverlapWithGeozones().getAttribute("innerText")).toBe("Overlap with geozone(s)");
        });

        it('should have Regions geozone in table', function() {
          expect(settingsGeozonesPage.getGridRow(1).element(by.css("td:nth-child(9)")).isPresent()).toBe(true);
          expect(settingsGeozonesPage.getGridRow(1).element(by.css("td:nth-child(9)")).getAttribute("innerText")).toBe("RegionGeozone2");
        });

        it('should have Overlap geozones', function() {
          expect(settingsGeozonesPage.getGridRow(1).element(by.css("td:nth-child(10) div span:nth-child(2)")).isPresent()).toBe(true);
          expect(settingsGeozonesPage.getGridRow(1).element(by.css("td:nth-child(10) div span:nth-child(2)")).getAttribute("innerText")).toBe("OverlapGeozone1");
        });
      });
    });
  });
})();
