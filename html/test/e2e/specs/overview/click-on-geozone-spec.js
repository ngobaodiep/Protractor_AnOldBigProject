(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    geozonePanelPage = require('./GeozonePanelPage'),
    mainReportPage = require('./MainReportPage'),
    filterPanelPage = require('./FilterPanelPage');

  describe('on main module', function() {

    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainPage.getReportTab()));
      mainPage.clickReportTab();
      browser.wait(testUtils.until.presenceOf(mainReportPage.getReportView()));

      mainPage.clickTrackingViewTab();
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel()));
      filterPanelPage.clickFilterClearButton();
      // click on switches unless geozone-switcher
      filterPanelPage.clickVehiclesSwitcher();
      filterPanelPage.clickMachinesSwitcher();
      filterPanelPage.clickStandalonesSwitcher();
      filterPanelPage.clickWorkersSwitcher();
      filterPanelPage.clickMobileassetsSwitcher();
      // click on tracking-geozone-button
      mainPage.clickTrackingGeozoneButton();
      browser.wait(testUtils.until.presenceOf(geozonePanelPage.getGeozonePanel()));
      browser.wait(testUtils.until.presenceOf(geozonePanelPage.getGeozoneNameOnList()));
    });

    describe('check', function() {
      describe('information of geozone on popup,', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(geozonePanelPage.GetSeeButtonOnList()));
          geozonePanelPage.clickSeeGeozoneListRow(1);
          browser.wait(testUtils.until.visibilityOf(geozonePanelPage.getGeozoneNamePopup()));
        });

        it('name geozones present in panel is equal to name geozones on popup', function() {
          expect(geozonePanelPage.getGeozoneNameOnList().getText()).toEqual(geozonePanelPage.getGeozoneNamePopup().getText());
        });

        it('category geozones present in panel is equal to category geozones on popup', function() {
          expect(geozonePanelPage.getGeozoneCategoryOnList().getText()).toEqual(geozonePanelPage.getGeozoneCategoryPopup().getText());
        });

        it('color of geozones present in panel is equal to color geozones on popup title', function() {
          expect(geozonePanelPage.getGeozoneGridCell().getCssValue('border-left-color')).toEqual(geozonePanelPage.getTooltipTittle().getCssValue('background-color'));
        });

        it('should have a route from button on popup', function() {
          expect(geozonePanelPage.getButtonRouteFromPopup().isPresent()).toBeTruthy();
        });

        it('should have a route to button on popup', function() {
          expect(geozonePanelPage.getButtonRouteToPopup().isPresent()).toBeTruthy();
        });

        it('should have a near access button on popup', function() {
          expect(geozonePanelPage.getButtonNearAccessPopup().isPresent()).toBeTruthy();
        });

        it('should have a history button on popup', function() {
          expect(geozonePanelPage.getButtonHistoryPopup().isPresent()).toBeTruthy();
        });

        it('should have a last 7 days button on popup', function() {
          expect(geozonePanelPage.getButtonLast7DaysPopup().isPresent()).toBeTruthy();
        });

        it('should have reference geozone on popup', function() {
          expect(geozonePanelPage.getReferenceGeozoneToolTip().isPresent()).toBe(true);
        });

        it('reference on geozone panel should be same as on popup', function() {
          expect(geozonePanelPage.getReferenceGeozoneToolTip().getText()).toBe(geozonePanelPage.getReferenceGeozoneOnList(1).getText());
        });
      });

      describe('on geozone panel,', function() {

        afterAll(function() {
          mainPage.clickTrackingGeozoneButton();
          browser.wait(testUtils.until.presenceOf(element(by.css('.geozones-panel.ng-hide'))));
        });

        it('should have an edit geozone button', function() {
          expect(geozonePanelPage.GetEditButtonOnList().isPresent()).toBeTruthy();
        });

        it('should have a delete geozone button', function() {
          expect(geozonePanelPage.GetDeleteButtonOnList().isPresent()).toBeTruthy();
        });

        it('should have a see geozone button', function() {
          expect(geozonePanelPage.GetSeeButtonOnList().isPresent()).toBeTruthy();
        });

        it('should have a show report geozone button', function() {
          expect(geozonePanelPage.GetShowReportButtonOnList().isPresent()).toBeTruthy();
        });

        it('should have a show history geozone button', function() {
          expect(geozonePanelPage.GetShowHistoryButtonOnList().isPresent()).toBeTruthy();
        });

        it('should have geozone name', function() {
          expect(geozonePanelPage.getGeozoneNameOnList().isPresent()).toBeTruthy();
        });

        it('should have geozone category', function() {
          expect(geozonePanelPage.getGeozoneCategoryOnList().isPresent()).toBeTruthy();
        });

        it('should have reference', function() {
          expect(geozonePanelPage.getReferenceGeozoneOnList(1).isPresent()).toBe(true);
        });
      });
    });
  });
})();
