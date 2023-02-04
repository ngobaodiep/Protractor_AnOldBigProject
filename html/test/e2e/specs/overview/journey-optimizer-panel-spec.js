(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('../MainPage'),
    jOPanelPage = require('../../pages/JOPanelPage'),
    settingsAccountPage = require('./SettingsAccountPage');

  describe('journey optimizer panel', function() {
    var time = [],
      arrival_time,
      starting_time;
    beforeAll(function() {
      mainPage.clickTrackingViewTab();
      browser.wait(testUtils.until.presenceOf(mainPage.getJourneyOptimizationButton()));
      mainPage.clickJourneyOptimizationButton();
      browser.wait(testUtils.until.presenceOf(element(by.css('.journey-optimization-panel'))));
      browser.wait(testUtils.until.visibilityOf(jOPanelPage.getItinearyTab()));
    });

    describe('on itineary tab', function() {
      beforeAll(function() {
        jOPanelPage.fillAddress();
        browser.wait(testUtils.until.visibilityOf(jOPanelPage.getCalculateButton()));
        jOPanelPage.clickCalculateButton();
        browser.wait(testUtils.until.visibilityOf(jOPanelPage.getEstimatedDuration()));
      });

      describe('check', function() {
        it('itineary tab should be active by default', function() {
          // opened tab should be active by default
          expect(jOPanelPage.getItinearyTab().isPresent()).toBe(true);
          expect(jOPanelPage.getItinearyTab().getAttribute('aria-selected')).toBe('true');
        });

        it('should have starting point input', function() {
          expect(jOPanelPage.getStartingPoint().isPresent()).toBe(true);
        });

        it('should have destination input', function() {
          expect(jOPanelPage.getDestination().isPresent()).toBe(true);
        });

        it('should have an optimizer switched', function() {
          expect(jOPanelPage.getOptimizeSwitcher().isPresent()).toBe(true);
        });

        it('should have estimate duration on the summary of itineraries', function() {
          expect(jOPanelPage.getEstimatedDuration().isPresent()).toBe(true);
        });

        it('should have time arrival on the summary of itineraries', function() {
          expect(jOPanelPage.getTimeArrival().isPresent()).toBe(true);
        });

        it('should have distance on the summary of itineraries', function() {
          expect(jOPanelPage.getDistance().isPresent()).toBe(true);
        });
      });

      describe('when reset input', function() {
        beforeAll(function() {
          jOPanelPage.clickSearchAddressTab();
          jOPanelPage.clickItinearyTab();
          browser.wait(testUtils.until.visibilityOf(jOPanelPage.getItinearyTab()));
        });

        it('the starting point input should be cleared', function() {
          expect(jOPanelPage.getStartingPoint().getAttribute('class')).toContain('ng-empty');
        });

        it('the destination input should be cleared', function() {
          expect(jOPanelPage.getDestinationCleared().getAttribute('class')).toContain('ng-empty');
        });
      });
    });

    describe('on near by tab', function() {});

    describe('on search address tab', function() {
      beforeAll(function() {
        jOPanelPage.clickSearchAddressTab();
        browser.wait(testUtils.until.presenceOf(jOPanelPage.getSearchPositionInput()));
      });

      describe('check', function() {
        it('should have position input', function() {
          expect(jOPanelPage.getSearchPositionInput().isPresent()).toBe(true);
        });

        it('should have search button', function() {
          expect(jOPanelPage.getSearchButton().isPresent()).toBe(true);
        });
      });    
            describe('check search address', function() {
              beforeAll(function() {
                browser.wait(testUtils.until.visibilityOf(jOPanelPage.getSearchPositionInput()));
                jOPanelPage.fillSearchAddressInput('Route de la Dent, 1325 Vaulion, Vaud, CH');
                browser.wait(testUtils.until.elementToBeClickable(jOPanelPage.getSearchButton()));
                jOPanelPage.getSearchButton().click();
                browser.wait(testUtils.until.presenceOf(jOPanelPage.getMapElementTooltip()));
                browser.wait(testUtils.until.presenceOf(jOPanelPage.getMapTooltipAddress()));
              });

              it('should have map address on popup', function() {
                expect(jOPanelPage.getMapTooltipAddress().isPresent()).toBe(true);
              });

              it('should have routing from on popup', function() {
                expect(jOPanelPage.getTooltipRoutingFrom().isPresent()).toBe(true);
              });

              it('should have add waypoint on popup', function() {
                expect(jOPanelPage.getTooltipAddWaypoint().isPresent()).toBe(true);
              });

              it('should have routing to on popup', function() {
                expect(jOPanelPage.getTooltipRoutingTo().isPresent()).toBe(true);
              });

              it('should have near assets on popup', function() {
                expect(jOPanelPage.getTooltipNearAssets().isPresent()).toBe(true);
              });

              it('the address on popup is same as address input', function() {
                expect(jOPanelPage.getMapTooltipAddress().getText()).toEqual('Route de la Dent, 1325 Vaulion, Vaud, CH');
              });
            });
    });

    describe('when using specify arrival time button', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(jOPanelPage.getItinearyTab()));
        jOPanelPage.clickItinearyTab();
        browser.wait(testUtils.until.presenceOf(jOPanelPage.getJourneyOptimizationPanel().element(by.css('ul li:nth-child(1).tabs-title.is-active a'))));
        jOPanelPage.fillAddress2();
        browser.wait(testUtils.until.elementToBeClickable(jOPanelPage.getCalculateButton()));
        jOPanelPage.clickCalculateButton();
        browser.wait(testUtils.until.presenceOf(jOPanelPage.getItineraries().get(0).element(by.css('.journey-optimization-estimated-time span:nth-child(2)'))));
        element(by.css('input[k-ng-model="controls.endDate"]')).getAttribute('value').then(function(text) {
          text = jOPanelPage.convertTime(text);
          arrival_time = new Date(text);
        });
      });

      describe('when itineraries shown', function() {
        it('should have first itinerary', function() {
          expect(jOPanelPage.getItineraries().get(0).isPresent()).toBe(true);
        });

        it('should show name of streets', function() {
          expect(jOPanelPage.getItineraries().get(0).element(by.css('.journey-optimization-summary span:nth-child(3)')).isPresent()).toBe(true);
        });

        it('should have departure time', function() {
          expect(jOPanelPage.getItineraries().get(0).element(by.css('div:nth-child(2).journey-optimization-estimated-time span:nth-child(2)')).isPresent()).toBe(true);
        });

        it('should have estimated duration', function() {
          expect(jOPanelPage.getItineraries().get(0).element(by.css('div:nth-child(3).journey-optimization-estimated-time')).isPresent()).toBe(true);
        });

        it('should have distance', function() {
          expect(jOPanelPage.getItineraries().get(0).element(by.css('.journey-optimization-distance span:nth-child(2)')).isPresent()).toBe(true);
        });
      });

      describe('verification moving time', function() {
        beforeAll(function() {
          jOPanelPage.getItineraries().get(0).element(by.css('div:nth-child(2).journey-optimization-estimated-time span:nth-child(2)')).getText().then(function(text1) {
            text1 = jOPanelPage.convertTime(text1);
            starting_time = new Date(text1);
            jOPanelPage.getItineraries().get(0).element(by.css('div:nth-child(3).journey-optimization-estimated-time')).getText().then(function(text2) {
              text2 = text2.replace(/\D/g, ' ');
              text2 = text2.replace(/\s+/g, " ");
              text2 = text2.replace(/^\s+|\s+$/g, "");
              time = text2.split(" ");
              starting_time.setHours(starting_time.getHours() + parseInt(time[0], 10));
              starting_time.setMinutes(starting_time.getMinutes() + parseInt(time[1], 10));
            });
          });
        });

        it('should have same date as arrival time', function() {
          expect(starting_time.getDate()).toBe(arrival_time.getDate());
        });

        it('should have same hours as arrival time', function() {
          expect(starting_time.getHours()).toBe(arrival_time.getHours());
        });

        it('should have same minutes as arrival time', function() {
          expect(starting_time.getMinutes()).not.toBeGreaterThan(arrival_time.getMinutes());
        });
      });
    });
  });
})();
