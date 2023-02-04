(function() {
  'use strict';

  var testUtils = require("./TestUtils"),
    overViewPanelPage = require("../../specs/overview/OverViewPanelPage");

  describe('when overview panel opened', function() {

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
      overViewPanelPage.getSearchInput().sendKeys("machine");
      console.log("\n\t=========On Overview Panel=============");

      browser.wait(function() {
        return overViewPanelPage.getAllOverviewGridRow().count().then(function(count) {
          return count == 2;
        });
      });
    });

    describe('on machine,', function() {

      it('should have should have machine', function() {
        console.log("\n--->machine:");
        expect(overViewPanelPage.getMapElementName(1).isPresent()).toBe(true);
        expect(overViewPanelPage.getMapElementName(1).getText()).toBe("machine");
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
          if (text.includes("Working") == true) {
            expect(overViewPanelPage.getMapElementSpeedIcon(1).isPresent()).toBe(true);
            expect(overViewPanelPage.getMapElementSpeed(1).isPresent()).toBe(true);
            overViewPanelPage.getMapElementSpeed(1).getText().then(function(text) {
              console.log("\nSpeed\t: ", text);
            });
          }
        });
      });

      it('should have address if status is stopped', function() {
        overViewPanelPage.getMapElementStatus(1).getText().then(function(text) {
          if (text.includes("Stopped") == true) {
            overViewPanelPage.getMapElementAddress(1).getText().then(function(te) {
              expect(overViewPanelPage.getMapElementAddress(1).isPresent()).toBe(true);
              console.log("\nAddress\t: ", te);
            });
          }
        });
      });
    });

    describe('on machine2,', function() {

      it('should have should have machine', function() {
        console.log("\n--->machine2:");
        expect(overViewPanelPage.getMapElementName(2).isPresent()).toBe(true);
        expect(overViewPanelPage.getMapElementName(2).getText()).toBe("machine2");
      });

      it('should have status', function() {
        expect(overViewPanelPage.getMapElementStatus(2).isPresent()).toBe(true);
        overViewPanelPage.getMapElementStatus(2).getText().then(function(text) {
          console.log("\nStatus\t: ", text);
        });
      });

      it('should have status icon', function() {
        expect(overViewPanelPage.getMapElementStatusIcon(2).isPresent()).toBe(true);
        overViewPanelPage.getMapElementStatusIcon(2).getCssValue('color').then(function(val) {
          console.log("\nStatus color\t: ", val);
        });
      });

      it('should have status since', function() {
        expect(overViewPanelPage.getMapElementStatusTime(2).isPresent()).toBe(true);
        overViewPanelPage.getMapElementStatusTime(2).getText().then(function(text) {
          console.log("\nStatus time\t: ", text);
        });
      });

      it('should have category icon', function() {
        expect(overViewPanelPage.getMapElementCategoryField(2).isPresent()).toBe(true);
      });

      it('should have category', function() {
        expect(overViewPanelPage.getMapElementCategoryField(2).isPresent()).toBe(true);
        overViewPanelPage.getMapElementCategoryField(2).getText().then(function(text) {
          console.log("\nCategory\t: ", text);
        });
      });

      it('should have speed', function() {
        overViewPanelPage.getMapElementStatus(2).getText().then(function(text) {
          if (text.includes("Working") == true) {
            expect(overViewPanelPage.getMapElementSpeedIcon(2).isPresent()).toBe(true);
            expect(overViewPanelPage.getMapElementSpeed(2).isPresent()).toBe(true);
            overViewPanelPage.getMapElementSpeed(2).getText().then(function(text) {
              console.log("\nSpeed\t: ", text);
            });
          }
        });
      });

      it('should have address if status is stopped', function() {
        overViewPanelPage.getMapElementStatus(2).getText().then(function(text) {
          if (text.includes("Stopped") == true) {
            overViewPanelPage.getMapElementAddress(2).getText().then(function(te) {
              expect(overViewPanelPage.getMapElementAddress(2).isPresent()).toBe(true);
              console.log("\nAddress\t: ", te);
            });

          }
        });
      });
    });
  });
})();
