(function() {
  'use strict';

  var testUtils = require("./TestUtils"),
    overViewPanelPage = require("./OverViewPanelPage"),
    notificationPanelPage = require("./NotificationPanelPage"),
    mainPage = require("./MainPage.js");

  describe('when overview panel opened', function() {

    beforeAll(function() {

      browser.wait(testUtils.until.presenceOf(mainPage.getTrackingTab()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getTrackingTab()));
      mainPage.clickTrackingViewTab();
      browser.wait(testUtils.until.presenceOf(mainPage.getOverviewBtn()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()));

      mainPage.clickOverViewButton();
      browser.wait(testUtils.until.presenceOf(overViewPanelPage.getOverviewPanel()));
      browser.wait(testUtils.until.presenceOf(overViewPanelPage.getSearchInput()));
      browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getSearchInput()));
      overViewPanelPage.getSearchInput().sendKeys("equipment");
      
      console.log("\n\t=========On Overview Panel=============");

      browser.wait(function() {
        return overViewPanelPage.getAllOverviewGridRow().count().then(function(count) {
          return count == 1;
        });
      });
    });

    describe('on equipment vehicle', function() {

      it('should have equipment', function() {
        console.log("\n--->equipment:");
        expect(overViewPanelPage.getMapElementName(1).isPresent()).toBe(true);
        expect(overViewPanelPage.getMapElementName(1).getText()).toBe("equipment");
      });

      it('should have status', function() {
        expect(overViewPanelPage.getMapElementStatus(1).isPresent()).toBe(true);
        overViewPanelPage.getMapElementStatus(1).getText().then(function(text) {
          console.log("\nStatus\t: ", text);
        });
      });

      it('should have status icon', function() {
        expect(overViewPanelPage.getMapElementStatusIcon(1).isPresent()).toBe(true);
        overViewPanelPage.getMapElementStatusIcon(1).getCssValue('color').then(function(val) {
          console.log("\nStatus color\t: ", val);
        });
      });

      it('should have status since', function() {
        expect(overViewPanelPage.getMapElementStatusTime(1).isPresent()).toBe(true);
        overViewPanelPage.getMapElementStatusTime(1).getText().then(function(text) {
          console.log("\nStatus time\t: ", text);
        });
      });

      it('should have category icon', function() {
        expect(overViewPanelPage.getMapElementCategoryField(1).isPresent()).toBe(true);
      });

      it('should have category', function() {
        expect(overViewPanelPage.getMapElementCategoryField(1).isPresent()).toBe(true);
        overViewPanelPage.getMapElementCategoryField(1).getText().then(function(text) {
          console.log("\nCategory\t: ", text);
        });
      });

      it('should have speed', function() {
        overViewPanelPage.getMapElementStatus(1).getText().then(function(text) {
          if (text.includes("Driving") == true) {
            expect(overViewPanelPage.getMapElementSpeedIcon(1).isPresent()).toBe(true);
            expect(overViewPanelPage.getMapElementSpeed(1).isPresent()).toBe(true);
            overViewPanelPage.getMapElementSpeed(1).getText().then(function(text) {

              console.log("\nSpeed\t: ", text);
            });
          }
        });
      });

      it('should have equipment active icon', function() {
        expect(overViewPanelPage.getOverviewGridRow(1).element(by.css(".equipments div:nth-child(1).row .fi-shape-circle")).isPresent()).toBe(true);
      });

      it('should have equipment active', function() {
        overViewPanelPage.getOverviewGridRow(1).element(by.css(".equipments div:nth-child(1).row .small-10 span")).getText().then(function(text) {
          console.log("\nequipment active\t: ", text);
        });
        expect(overViewPanelPage.getOverviewGridRow(1).element(by.css(".equipments div:nth-child(1).row .small-10 span")).isPresent()).toBe(true);
      });

      it('should have equipment inactive icon', function() {
        expect(overViewPanelPage.getOverviewGridRow(1).element(by.css(".equipments div:nth-child(2).row .fi-shape-circle")).isPresent()).toBe(true);
      });

      it('should have equipment inactive', function() {
        overViewPanelPage.getOverviewGridRow(1).element(by.css(".equipments div:nth-child(2).row .small-10 span")).getText().then(function(text) {
          console.log("\nequipment inactive\t: ", text);
        });
        expect(overViewPanelPage.getOverviewGridRow(1).element(by.css(".equipments div:nth-child(2).row .small-10 span")).isPresent()).toBe(true);
      });
    });

    describe('on with driver vehicle', function() {

      beforeAll(function() {

        browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getSearchInputClearBtn()));
        overViewPanelPage.getSearchInputClearBtn().click();
        browser.wait(testUtils.until.invisibilityOf(overViewPanelPage.getSearchInputClearBtn()));


        browser.wait(function() {
          return overViewPanelPage.getAllOverviewGridRow().count().then(function(count) {
            return count > 1;
          });
        });

        browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getSearchInput()));
        overViewPanelPage.getSearchInput().sendKeys("with driver");
        browser.wait(function() {
          return overViewPanelPage.getAllOverviewGridRow().count().then(function(count) {
            return count == 1;
          });
        });
      });

      it('should have with driver', function() {
        console.log("\n--->with driver:");
        expect(overViewPanelPage.getMapElementName(1).isPresent()).toBe(true);
        expect(overViewPanelPage.getMapElementName(1).getText()).toBe("with driver");
      });

      it('should have status', function() {
        expect(overViewPanelPage.getMapElementStatus(1).isPresent()).toBe(true);
        overViewPanelPage.getMapElementStatus(1).getText().then(function(text) {
          console.log("\nStatus\t: ", text);
        });
      });

      it('should have status icon', function() {
        expect(overViewPanelPage.getMapElementStatusIcon(1).isPresent()).toBe(true);
        overViewPanelPage.getMapElementStatusIcon(1).getCssValue('color').then(function(val) {
          console.log("\nStatus color\t: ", val);
        });
      });

      it('should have status since', function() {
        expect(overViewPanelPage.getMapElementStatusTime(1).isPresent()).toBe(true);
        overViewPanelPage.getMapElementStatusTime(1).getText().then(function(text) {
          console.log("\nStatus time\t: ", text);
        });
      });

      it('should have category icon', function() {
        expect(overViewPanelPage.getMapElementCategoryField(1).isPresent()).toBe(true);
      });

      it('should have category', function() {
        expect(overViewPanelPage.getMapElementCategoryField(1).isPresent()).toBe(true);
        overViewPanelPage.getMapElementCategoryField(1).getText().then(function(text) {
          console.log("\nCategory\t: ", text);
        });
      });

      it('should have speed', function() {
        overViewPanelPage.getMapElementStatus(1).getText().then(function(text) {
          if (text.includes("Driving") == true) {
            expect(overViewPanelPage.getMapElementSpeedIcon(1).isPresent()).toBe(true);
            expect(overViewPanelPage.getMapElementSpeed(1).isPresent()).toBe(true);
            overViewPanelPage.getMapElementSpeed(1).getText().then(function(text) {
              console.log("\nSpeed\t: ", text);
            });
          }
        });
      });

      it('should have driver icon', function() {
        expect(overViewPanelPage.getOverviewGridRow(1).element(by.css('.driver-field .icon-steering-wheel')).isPresent()).toBe(true);
      });

      it('should have driver name', function() {
        expect(overViewPanelPage.getOverviewGridRow(1).element(by.css('.driver-field .small-10')).isPresent()).toBe(true);
        expect(overViewPanelPage.getOverviewGridRow(1).element(by.css('.driver-field .small-10')).getText()).toContain("Valentin Fournier");
        overViewPanelPage.getOverviewGridRow(1).element(by.css('.driver-field .small-10')).getText().then(function(text) {
          console.log('\nDriver name\t: ', text);
        });
      });
    });
  });

})();
