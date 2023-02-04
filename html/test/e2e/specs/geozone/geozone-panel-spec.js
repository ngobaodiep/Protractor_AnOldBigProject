(function() {
  'use strict';

  var geozonePanelPage = require('./GeozonePanelPage'),
    testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainReportPage = require('./MainReportPage');
  describe('On geozones panel', function() {
    var random_number = new Date().getTime(),
      circleAddress = ['Hindere Reueberg 1, 3257 Grossaffoltern, CH'];
      beforeAll(function() {
        mainPage.clickReportTab();
        browser.wait(testUtils.until.presenceOf(mainReportPage.getReportView()));

        mainPage.clickTrackingViewTab();
        browser.wait(testUtils.until.presenceOf(mainPage.getTrackingGeozoneButton()));

        mainPage.clickTrackingGeozoneButton();
        browser.wait(testUtils.until.presenceOf(geozonePanelPage.getGeozonesPanel()));
      });
    describe('when the 1st geozone created', function() {
      beforeAll(function() {
        geozonePanelPage.clickCreateGeozoneButton();
        geozonePanelPage.createGeozone(random_number, circleAddress[0]);

        browser.wait(testUtils.until.visibilityOf(geozonePanelPage.getSearchNameInput()));
        geozonePanelPage.fillSearchNameInput('geozone ' + random_number);
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.k-grid-content tr:nth-child(1) td:nth-child(1) .place-info-name', 'geozone ' + random_number))));
      });

      it('name geozone should be found on list', function() {
        expect(geozonePanelPage.getNameGeozoneGridRow(1).getText()).toEqual('geozone ' + random_number);
      });

      it('category geozone should be found on list', function() {
        expect(geozonePanelPage.getCateroryGeozoneGridRow(1).isPresent()).toBe(true);
        expect(geozonePanelPage.getCateroryGeozoneGridRow(1).isDisplayed()).toBe(true);
      });
    });

    describe('when the 1st geozone deleted', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(element(by.css('div.geozones-panel.ng-scope div.k-grid.k-widget.k-display-block div.k-grid-content.k-auto-scrollable table.k-selectable tbody tr.ng-scope td a.k-button.k-button-icontext.fi-trash.iconic-sm.deletePlace.k-grid-.ng-scope'))));
        browser.executeScript("arguments[0].click();", element(by.css('div.geozones-panel.ng-scope div.k-grid.k-widget.k-display-block div.k-grid-content.k-auto-scrollable table.k-selectable tbody tr.ng-scope td a.k-button.k-button-icontext.fi-trash.iconic-sm.deletePlace.k-grid-.ng-scope')).getWebElement());
        browser.wait(testUtils.until.presenceOf(geozonePanelPage.getWarnDeleteModal()));
        geozonePanelPage.clickWarnDeleteButton();
        browser.wait(testUtils.until.stalenessOf(geozonePanelPage.getGridRow(1)));
      });

      it('name geozone should be not shown on list', function() {
        expect(geozonePanelPage.getGridRow(1).isPresent()).toBe(false);
      });
    });

    it('should have hide geozones panel button', function() {
      expect(geozonePanelPage.getHideGeozonesPanelBtn().isPresent()).toBe(true);
    });

    describe('when hide panel button clicked', function() {
      beforeAll(function(){
        browser.wait(testUtils.until.elementToBeClickable(geozonePanelPage.getHideGeozonesPanelBtn()));
        geozonePanelPage.getHideGeozonesPanelBtn().click();
        browser.wait(testUtils.until.invisibilityOf(geozonePanelPage.getHideGeozonesPanelBtn()));
        browser.wait(testUtils.until.visibilityOf(geozonePanelPage.getOpenGeozonesPanelBtn()));
      });

      it('geozone panel should be present', function() {
        expect(geozonePanelPage.getGeozonePanel().isPresent()).toBe(true);
      });

      it('should have open geozones panel button', function() {
        expect(geozonePanelPage.getOpenGeozonesPanelBtn().isPresent()).toBe(true);
        expect(geozonePanelPage.getOpenGeozonesPanelBtn().isDisplayed()).toBe(true);
      });

      it('hide geozones panel button should not be displayed', function() {
        expect(geozonePanelPage.getHideGeozonesPanelBtn().isPresent()).toBe(true);
        expect(geozonePanelPage.getHideGeozonesPanelBtn().isDisplayed()).toBe(false);
      });
    });
  });
})();
