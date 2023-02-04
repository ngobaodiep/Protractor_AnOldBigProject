(function() {
  "use strict";
  var testUtils = require("./TestUtils"),
    timeBookingsGlobalPage = require("./TimeBookingsGlobalPage"),
    mainSettingsPage = require("./MainSettingsPage");

  describe("on settings time booking", function() {
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsTimeBookingsButton()));
      mainSettingsPage.clickSettingsWorkerConnectButton();
      browser.wait(testUtils.until.presenceOf(timeBookingsGlobalPage.getClientsSwitcherActive()));
    });

    describe("check display switchers", function() {
      it("Use activities should be displayed", function() {
        expect(timeBookingsGlobalPage.getActivitiesSwitcher().isPresent()).toBe(true);
      });

      it("Use clients should be displayed", function() {
        expect(timeBookingsGlobalPage.getClientsSwitcher().isPresent()).toBe(true);
      });

      it("Use sites should be displayed", function() {
        expect(timeBookingsGlobalPage.getSitesSwitcher().isPresent()).toBe(true);
      });

      it("Geocode activities should be displayed", function() {
        expect(timeBookingsGlobalPage.getGeocodingSwitcher().isPresent()).toBe(true);
      });

      it("Allow manual time input should be displayed", function() {
        expect(timeBookingsGlobalPage.getEntriesSwitcher().isPresent()).toBe(true);
      });

      it("Allow site creation form the mobile app should be displayed", function() {
        expect(timeBookingsGlobalPage.getCreateSiteSwitcher().isPresent()).toBe(true);
      });
    });

    describe("check active switchers", function() {
      beforeAll(function() {
        timeBookingsGlobalPage.getActivitiesSwitcherDeactive().isPresent()
          .then(function(isPresent) {
            if (isPresent) {
              timeBookingsGlobalPage.clickTasksSwitcher();
            }
          });

        timeBookingsGlobalPage.getClientsSwitcherDeactive().isPresent()
          .then(function(isPresent) {
            if (isPresent) {
              timeBookingsGlobalPage.clickCustomersSwitcher();
            }
          });

        timeBookingsGlobalPage.getSitesSwitcherDeactive().isPresent()
          .then(function(isPresent) {
            if (isPresent) {
              timeBookingsGlobalPage.clickSitesSwitcher();
            }
          });

        timeBookingsGlobalPage.getGeocodingSwitcherDeactive().isPresent()
          .then(function(isPresent) {
            if (isPresent) {
              timeBookingsGlobalPage.clickGeocodingSwitcher();
            }
          });

        timeBookingsGlobalPage
          .getEntriesSwitcherDeactive()
          .isPresent()
          .then(function(isPresent) {
            if (isPresent) {
              timeBookingsGlobalPage.clickEntriesSwitcher();
            }
          });

        timeBookingsGlobalPage.getCreateSiteSwitcherDeactive().isPresent()
          .then(function(isPresent) {
            if (isPresent) {
              timeBookingsGlobalPage.clickCreateSiteSwitcher();
            }
          });

        timeBookingsGlobalPage.clickSaveButton();
        browser.wait(testUtils.until.presenceOf(timeBookingsGlobalPage.getInfoModal()));
        timeBookingsGlobalPage.clickOkButton();
        browser.wait(testUtils.until.stalenessOf(timeBookingsGlobalPage.getInfoModal()));
      });

      it("switcher Use of tasks should be active", function() {
        expect(
          timeBookingsGlobalPage.getActivitiesSwitcherActive().isPresent()
        ).toBe(true);
      });

      it("the task selection on mobile screen shot should be displayed", function() {
        expect(
          timeBookingsGlobalPage.getTimebookingActivedTab()
          .element(by.css(".setting-phone .row-setting .row-entry:nth-of-type(1) .icon-clipboard6"))
          .isDisplayed()
        ).toBe(true);
      });

      it("switcher Use of customers should be active", function() {
        expect(timeBookingsGlobalPage.getClientsSwitcherActive().isPresent()).toBe(true);
      });

      it("the customers selection on mobile screen shot should be displayed", function() {
        expect(
          element(by.css('.setting-phone .row-setting .row-entry[ng-show="globalSetting.useCustomer"] .icon-users'))
          .isDisplayed()
        ).toBe(true);
      });

      it("switcher Use of sites should be active", function() {
        expect(timeBookingsGlobalPage.getSitesSwitcherActive().isPresent()).toBe(true);
      });

      it("the site selection on mobile screen shot should be displayed", function() {
        expect(
          element(by.css('.setting-phone .row-setting .row-entry[ng-show="globalSetting.useSite"] .fi-map-marker'))
          .isDisplayed()
        ).toBe(true);
      });

      it("the comment field on mobile screen shot should be displayed", function() {
        expect(
          timeBookingsGlobalPage.getTimebookingActivedTab().element(by.css(".setting-phone .row-setting .row-entry:nth-of-type(4) .icon-bubble2"))
          .isDisplayed()
        ).toBe(true);
      });

      it("switcher Geocoding of each time booking change should be active", function() {
        expect(timeBookingsGlobalPage.getGeocodingSwitcherActive().isPresent()).toBe(true);
      });

      it("switcher Authorize manual entries should be active", function() {
        expect(timeBookingsGlobalPage.getEntrieswitcherActive().isPresent()).toBe(true);
      });

      it("switcher Create Site should be active", function() {
        expect(timeBookingsGlobalPage.getCreateSiteActive().isPresent()).toBe(true);
      });
    });
  });
})();
