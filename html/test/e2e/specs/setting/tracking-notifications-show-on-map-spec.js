(function() {
  "use strict";
  var testUtils = require("./TestUtils"),
    trackingNotificationsPage = require("./TrackingNotificationsPage"),
    mainPage = require("./MainPage");

  describe("Check", function() {
    beforeAll(function() {
      browser.wait(testUtils.until.stalenessOf(element(by.css(".lf-loader-overlay.app-loader"))));
      browser.wait(testUtils.until.presenceOf(mainPage.getTrackingTab()));
      browser.wait(testUtils.until.presenceOf(mainPage.getTrackingView()));
      browser.wait(testUtils.until.presenceOf(mainPage.getNotificationButton()));
    });

    describe(' tracking notification panel', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(mainPage.getNotificationButton()));
        browser.executeScript("arguments[0].click();", mainPage.getNotificationButton().getWebElement());
        browser.wait(testUtils.until.presenceOf(trackingNotificationsPage.getNotificationsPanel()));
        browser.wait(testUtils.until.presenceOf(trackingNotificationsPage.getOpenTabActive()));
        trackingNotificationsPage.fillBussinessRuleNameFilter("test-002");
        browser.wait(testUtils.until.stalenessOf(trackingNotificationsPage.getLoadingOverlay()));
        browser.wait(testUtils.until.presenceOf(trackingNotificationsPage.getNotificationsActiveTabContentRow(2).element(by.css("td:nth-child(2)"))));

        browser.wait(function() {
          return trackingNotificationsPage.getNotificationsActiveTabContentRow(2).element(by.css("td:nth-child(2)")).getAttribute("innerText").then(function(text) {
            return text == "test-002";
          });
        });

        browser.wait(testUtils.until.elementToBeClickable(trackingNotificationsPage.getNotificationsActiveTabContentRow(1).element(by.css("td a.showNotification"))));
        trackingNotificationsPage.getNotificationsActiveTabContentRow(1).element(by.css("td a.showNotification")).click();
        browser.wait(testUtils.until.presenceOf(trackingNotificationsPage.getShowNotificationsOnMap()));
        browser.wait(
          testUtils.until.presenceOf(
            trackingNotificationsPage.getOverlayMapTooltip()
          )
        );
      });

      afterAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(trackingNotificationsPage.getShowOnMapCloseBtn()));
        trackingNotificationsPage.clickShowOnMapCloseBtn();
        browser.wait(testUtils.until.stalenessOf(trackingNotificationsPage.getShowNotificationsOnMap()));
      });

      describe("on opened tab, when show on map button clicked ", function() {
        it("notification priority text should be test-002", function() {
          expect(trackingNotificationsPage.getNotificationPriorityText().getText()).toBe("test-002");
        });

        it("notification priority color should be green", function() {
          expect(trackingNotificationsPage.getNotificationPriorityColor().getCssValue("color")).toBe("rgb(0, 128, 0)");
        });

        it("opned since should contain opend", function() {
          expect(trackingNotificationsPage.getOpenedSince().getText()).toContain("Opened");
        });

        it("should have closed after", function() {
          expect(trackingNotificationsPage.getClosedSince().isPresent()).toBe(true);
        });
      });

      describe("on closed tab, ", function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(trackingNotificationsPage.getShowOnMapCloseBtn()));
          trackingNotificationsPage.clickShowOnMapCloseBtn();
          browser.wait(testUtils.until.stalenessOf(trackingNotificationsPage.getShowNotificationsOnMap()));

          browser.wait(testUtils.until.elementToBeClickable(trackingNotificationsPage.getClosedTab()));
          trackingNotificationsPage.clickClosedTab();
          browser.wait(testUtils.until.presenceOf(trackingNotificationsPage.getClosedTabActive()));
          trackingNotificationsPage.fillBussinessRuleNameFilter("No signal");
          browser.wait(testUtils.until.stalenessOf(trackingNotificationsPage.getLoadingOverlay()));
          browser.wait(testUtils.until.presenceOf(trackingNotificationsPage.getNotificationsActiveTabContentRow(3)));
          browser.wait(function() {
            return trackingNotificationsPage.getNotificationsActiveTabContentRow(2).element(by.css("td:nth-child(2)")).getText().then(function(text) {
              return text == "No signal";
            });
          });
        });

        describe("when show on map button clicked ", function() {
          beforeAll(function() {
            browser.wait(testUtils.until.elementToBeClickable(trackingNotificationsPage.getNotificationsActiveTabContentRow(1).element(by.css("td a.showNotification"))));
            trackingNotificationsPage.getNotificationsActiveTabContentRow(2).element(by.css("td a.showNotification")).click();
            browser.wait(testUtils.until.presenceOf(trackingNotificationsPage.getShowNotificationsOnMap()));
            browser.wait(testUtils.until.presenceOf(trackingNotificationsPage.getClosedSince()));
          });

          afterAll(function() {
            browser.wait(testUtils.until.elementToBeClickable(trackingNotificationsPage.getShowOnMapCloseBtn()));
            trackingNotificationsPage.clickShowOnMapCloseBtn();
            browser.wait(testUtils.until.stalenessOf(trackingNotificationsPage.getShowNotificationsOnMap()));
          });

          it("notification priority text should be test ignition", function() {
            expect(trackingNotificationsPage.getNotificationPriorityText().getText()).toContain("No signal");
          });

          it("notification priority color should be red", function() {
            expect(trackingNotificationsPage.getNotificationPriorityColor().getCssValue("color")).toBe("rgb(255, 0, 0)");
          });

          it("opned since should contain opend", function() {
            expect(trackingNotificationsPage.getOpenedSince().getText()).toContain("Opened");
          });

          it("closed since should contain closed duration", function() {
            expect(trackingNotificationsPage.getClosedSince().getText()).toContain("Closed after");
          });

          it("closed since should contain closed message", function() {
            expect(trackingNotificationsPage.getClosedSince().getText()).toContain("Closed message");
          });

          it("should have closed since icon", function() {
            expect(trackingNotificationsPage.getClosedSinceIcon().isDisplayed()).toBe(true);
          });
        });
      });

      describe("on open tab,", function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(trackingNotificationsPage.getOpenedTab()));
          trackingNotificationsPage.getOpenedTab().click();
          browser.wait(testUtils.until.presenceOf(trackingNotificationsPage.getOpenTabActive()));
          trackingNotificationsPage.fillBussinessRuleNameFilter("test-002");

          browser.wait(function() {
            return trackingNotificationsPage.getNotificationsActiveTabContentRow(1).element(by.css("td:nth-child(2)")).getText().then(function(text) {
              return text.includes("test-002") == true;
            });
          });

          browser.wait(testUtils.until.elementToBeClickable(trackingNotificationsPage.getNotificationsActiveTabContentRow(1).element(by.css("td a.showNotification"))));
          trackingNotificationsPage.getNotificationsActiveTabContentRow(1).element(by.css("td a.showNotification")).click();
          browser.wait(testUtils.until.presenceOf(trackingNotificationsPage.getShowNotificationsOnMap()));
          browser.wait(testUtils.until.presenceOf(trackingNotificationsPage.getContentMessage()));
        });

        afterAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(trackingNotificationsPage.getShowOnMapCloseBtn()));
          trackingNotificationsPage.clickShowOnMapCloseBtn();
          browser.wait(testUtils.until.stalenessOf(trackingNotificationsPage.getShowNotificationsOnMap()));
        });

        describe("when no signal bussiness rule checked,", function() {
          it("notification priority text should be test-002", function() {
            expect(trackingNotificationsPage.getNotificationPriorityText().getText()).toContain("test-002");
          });

          it("notification priority color should be green", function() {
            expect(trackingNotificationsPage.getNotificationPriorityColor().getCssValue("color")).toBe("rgb(255, 0, 0)");
          });

          it("opned since should contain opend", function() {
            expect(trackingNotificationsPage.getOpenedSince().getText()).toContain("Opened");
          });

          it("should have content message", function() {
            expect(trackingNotificationsPage.getContentMessage().isPresent()).toBe(true);
          });

          it("content message should be displayed", function() {
            expect(trackingNotificationsPage.getContentMessage().getText()).toContain("Sorry, there are no possible trace for this notification!");
          });
        });
      });
    });
  });
})();
