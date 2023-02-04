(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    filterPanelPage = require('./FilterPanelPage'),
    mainPage = require('./MainPage'),
    listViewPage = require('./ListViewPage');

  describe('when filter panel and list view panel shown', function() {
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainPage.getTrackingView()));
      browser.wait(testUtils.until.presenceOf(mainPage.getFilterButton()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.visibilityOf(filterPanelPage.getFilterPanel()));
      browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getFilterClearButton()));
      filterPanelPage.clickFilterClearButton();
      mainPage.clickListViewButton();
      browser.wait(testUtils.until.presenceOf(listViewPage.getListView()));
      browser.wait(testUtils.until.presenceOf(listViewPage.getVehiclesGrid()));
    });



    describe('when switchers is on', function() {
      describe('when on vehicle tab', function() {
        it('should have sum of vehicles on tab header', function() {
          browser.wait(testUtils.until.presenceOf(listViewPage.getVehiclesTab().getAttribute('innerHTML')));
          expect(listViewPage.getVehiclesTab().getAttribute('innerHTML')).not.toContain("(0)");
        });

        it('should have same sum of vehicles as on vehicle list', function() {
          listViewPage.getVehiclesTab().getAttribute('innerHTML').then(function(text) {
            text = text.substring(10, text.indexOf(")"));
            text = parseInt(text, 10);
            expect(text).toBe(listViewPage.getVehiclesGrid().all(by.css('.k-grid-content table tbody tr')).count());
          });
        });
      });

      describe('when on machine tab', function() {
        beforeAll(function() {
          listViewPage.clickMachinesTab();
          browser.wait(testUtils.until.stalenessOf(listViewPage.getLoadingMask()));
        });

        it('should have sum of machines on tab header', function() {
          expect(listViewPage.getMachinesTab().getAttribute('innerHTML')).not.toContain("(0)");
        });

        it('should have same sum of machines as on machine list', function() {
          listViewPage.getMachinesTab().getAttribute('innerHTML').then(function(text) {
            text = text.substring(10, text.indexOf(")"));
            text = parseInt(text, 10);
            expect(text).toBe(listViewPage.getMachinesGrid().all(by.css('.k-grid-content table tbody tr')).count());
          });
        });
      });

      describe('when on object tab', function() {
        beforeAll(function() {
          listViewPage.clickMobileassetsTab();
          browser.wait(testUtils.until.stalenessOf(listViewPage.getLoadingMask()));
        });

        it('should have sum of objects on tab header', function() {
          expect(listViewPage.getMobileassetsTab().getAttribute('innerText')).not.toContain("(0)");
        });

        it('should have same sum of objects as on object list', function() {
          listViewPage.getMobileassetsTab().getAttribute('innerHTML').then(function(text) {
            text = text.substring(9, text.indexOf(")"));
            text = parseInt(text, 9);
            expect(text).toBe(listViewPage.getMobileassetsGrid().all(by.css('.k-grid-content table tbody tr')).count());
          });
        });
      });
    });
  });

  describe('when each switcher is off', function() {
    describe('when vehicle switcher is off', function() {
      beforeAll(function() {
        listViewPage.clickVehiclesTab();
        filterPanelPage.clickVehiclesSwitcher();
        browser.wait(testUtils.until.stalenessOf(listViewPage.getLoadingMask()));
      });

      it("should'n have sum of vehicles on tab header", function() {
        expect(listViewPage.getVehiclesTab().getAttribute('innerHTML')).toContain("(0)");
      });
    });

    describe('when machine switcher is off', function() {
      beforeAll(function() {
        listViewPage.clickMachinesTab();
        filterPanelPage.clickMachinesSwitcher();
        browser.wait(testUtils.until.stalenessOf(listViewPage.getLoadingMask()));
      });

      it("should'n have sum of machines on tab header", function() {
        expect(listViewPage.getMachinesTab().getAttribute('innerHTML')).toContain("(0)");
      });
    });

    describe('when object switcher is off', function() {
      beforeAll(function() {
        listViewPage.clickMobileassetsTab();
        filterPanelPage.clickMobileassetsSwitcher();
        browser.wait(testUtils.until.stalenessOf(listViewPage.getLoadingMask()));
      });

      afterAll(function() {
        mainPage.clickFilterButton();
        browser.wait(testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel()));
        mainPage.clickListViewButton();
        browser.wait(testUtils.until.stalenessOf(listViewPage.getListView()));
      });

      it("shouldn't have sum of objects on tab header", function() {
        expect(listViewPage.getMobileassetsTab().getAttribute('innerHTML')).toContain("(0)");
      });
    });
  });
})();
