(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    filterPanelPage = require('../FilterPanelPage'),
    geozonePanelPage = require('./GeozonePanelPage'),
    legendPanelPage = require('../LegendPanelPage'),
    mainPage = require('../MainPage'),
    mainMapPage = require('../MainMapPage');

  describe('On map options', function() {
    beforeAll(function() {
      mainPage.clickMapView();
      browser.wait(testUtils.until.stalenessOf(element(by.css('.expanded-panel'))));
      //show cluster menu
      browser.wait(testUtils.until.presenceOf(mainMapPage.getShowClusterMenuButton()));
      mainMapPage.clickShowClusterMenuButton();
    });

    describe('check legend panel', function() {
      beforeAll(function() {
        //click legend panel button
        browser.wait(testUtils.until.presenceOf(mainMapPage.getShowLegendButton()));
        mainMapPage.clickShowLegendButton();
        browser.wait(testUtils.until.visibilityOf(legendPanelPage.getLegendPanel()));
      });

      it('should be displayed when click show legend button', function() {
        expect(legendPanelPage.getLegendPanel().isDisplayed()).toBeTruthy();
      });

      it('should have statuses info', function() {
        expect(legendPanelPage.getLegendStatusesTitle().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getLegendStatusesTitle().getText()).toEqual('Statuses');
      });

      it('should have status driving', function() {
        expect(legendPanelPage.getStatusDriving().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getStatusDriving().getText()).toEqual('Driving / Working');
      });

      it('should have status no signal', function() {
        expect(legendPanelPage.getStatusNosignal().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getStatusNosignal().getText()).toEqual('No signal');
      });

      it('should have status idle', function() {
        expect(legendPanelPage.getStatusIdle().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getStatusIdle().getText()).toEqual('Idle / Contact on');
      });

      it('should have status stopped', function() {
        expect(legendPanelPage.getStatusStopped().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getStatusStopped().getText()).toEqual('Stopped');
      });

      it('should have status private', function() {
        expect(legendPanelPage.getStatusPrivate().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getStatusPrivate().getText()).toEqual('Private');
      });

      it('should have status towed', function() {
        expect(legendPanelPage.getStatusTowed().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getStatusTowed().getText()).toEqual('Towed');
      });

      it('should have status equipment active', function() {
        expect(legendPanelPage.getStatusEquipmentActive().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getStatusEquipmentActive().getText()).toEqual('Equipment active');
      });

      it('should have status equipment inactive', function() {
        expect(legendPanelPage.getStatusEquipmentInactive().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getStatusEquipmentInactive().getText()).toEqual('Equipment inactive');
      });

      it('should have status equipment unknow', function() {
        expect(legendPanelPage.getStatusEquipmentUnknow().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getStatusEquipmentUnknow().getText()).toEqual('Equipment unknown');
      });

      it('should have vehicles info', function() {
        expect(legendPanelPage.getLegendVehiclesTitle().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getLegendVehiclesTitle().getText()).toEqual('Vehicles');
      });

      it('should have workers info', function() {
        expect(legendPanelPage.getLegendWorkersTitle().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getLegendWorkersTitle().getText()).toEqual('Workers');
      });

      it('should have objests info', function() {
        expect(legendPanelPage.getLegendObjectsTitle().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getLegendObjectsTitle().getText()).toEqual('Objects');
      });

      it('should have geozones info', function() {
        expect(legendPanelPage.getLegendGeozonesTitle().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getLegendGeozonesTitle().getText()).toEqual('Geozones');
      });

      it('should have clusters info', function() {
        expect(legendPanelPage.getLegendClustersTitle().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getLegendClustersTitle().getText()).toEqual('Clusters');
      });

      it('should have icons info', function() {
        expect(legendPanelPage.getLegendIconsTitle().isDisplayed()).toBeTruthy();
        expect(legendPanelPage.getLegendIconsTitle().getText()).toEqual('Icons');
      });

      it('legend panel should be hidden when click hide legend button', function() {
        legendPanelPage.clickHideLegendButton();
        browser.wait(testUtils.until.invisibilityOf(legendPanelPage.getLegendPanel()));
        expect(legendPanelPage.getLegendPanel().isDisplayed()).toBe(false);
      });
    });

    describe('check geozone labels button', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel()));
        filterPanelPage.clickFilterClearButton();
        mainPage.clickTrackingGeozoneButton();
        browser.wait(testUtils.until.presenceOf(geozonePanelPage.getGeozonePanel()));
        geozonePanelPage.clickSeeGeozoneListRow(1);
      });

      it('geozone name should be shown when click geozone labels button first time', function() {
        mainMapPage.clickShowGeozoneLabelButton();
        browser.wait(testUtils.until.presenceOf(mainMapPage.getGeozoneLabel()));
        expect(mainMapPage.getGeozoneLabel().isPresent()).toBe(true);
      });

      it('geozone name should be hidden when click geozone labels button second time', function() {
        mainMapPage.clickShowGeozoneLabelButton();
        browser.wait(testUtils.until.stalenessOf(mainMapPage.getGeozoneLabel()));
        expect(mainMapPage.getGeozoneLabel().isPresent()).toBe(false);
      });
    });

  });
})();
