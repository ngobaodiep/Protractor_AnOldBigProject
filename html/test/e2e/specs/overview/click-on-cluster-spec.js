(function() {
  'use strict';

  var mainMapPage = require('./MainMapPage'),
    testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    legendPanelPage = require('./LegendPanelPage');

  describe('On main module map', function() {
    var numberOfElements,
      iconColor,
      nameOfElement;

    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainPage.getTrackingView()));
      mainPage.getReleaseNote().isPresent().then(function(isPresent) {
        if (isPresent) {
          mainPage.clickReleaseNote();
          browser.wait(testUtils.until.stalenessOf(mainPage.getReleaseNote()));
        }
      });
      browser.wait(testUtils.until.presenceOf(mainMapPage.getGeozoneCluster()));
      browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getGeozoneClusterList(2)));
      mainMapPage.clickGeozoneCluster();
      browser.wait(testUtils.until.visibilityOf(mainMapPage.getMapElementPopup()));
    });

    afterAll(function() {
      legendPanelPage.getLegendPanel().isPresent().then(function(isPresent) {
        if (isPresent) {
          legendPanelPage.clickHideLegendButton();
          browser.wait(testUtils.until.invisibilityOf(legendPanelPage.getLegendPanel()));
        }
      });
    });

    describe('check', function() {

      it('cluster popup is displayed on cluster click', function() {
        expect(mainMapPage.getMapElementPopup().isPresent()).toBe(true);
        expect(mainMapPage.getMapElementPopup().isDisplayed()).toBe(true);
      });

      it('number of elements on the cluster list is equal to the number of elements on the title', function() {
        mainMapPage.getGeozoneClusterList(2).getText().then(function(numberOfElements) {
          expect(mainMapPage.getElementList().count()).toEqual(parseInt(numberOfElements));
          expect(mainMapPage.getPopupTitle().getText()).toEqual('Number of elements: ' + numberOfElements);
        });
      });

      it('elements on cluster list show geozone category color', function() {
        iconColor = mainMapPage.getGeozoneIcon().getCssValue('color');
        mainMapPage.clickElementListRow(1);
        browser.wait(testUtils.until.presenceOf(mainMapPage.getNameElementOnPopup()));
        expect(mainMapPage.getPopupTitleColor().getCssValue('background-color')).toEqual(iconColor);
      });

      it('elements on cluster list show geozone name', function() {
        mainMapPage.clickClosePopup();
        mainMapPage.clickGeozoneCluster();
        browser.wait(testUtils.until.presenceOf(mainMapPage.getMapElementPopup()));
        browser.wait(testUtils.until.visibilityOf(mainMapPage.getElementListRow(1)));
        nameOfElement = mainMapPage.getElementListRow(1).getText();
        mainMapPage.clickElementListRow(1);
        browser.wait(testUtils.until.visibilityOf(mainMapPage.getNameElementOnPopup()));
        expect(mainMapPage.getNameElementOnPopup().getText()).toEqual(nameOfElement);
      });

      it('click on cluster list element displays geozone popup', function() {
        expect(mainMapPage.getMapElementPopup().isPresent()).toBe(true);
        expect(mainMapPage.getMapElementPopup().isDisplayed()).toBe(true);
      });

      it('click on cluster close should close cluster popup', function() {
        mainMapPage.clickClosePopup();
        expect(mainMapPage.getMapElementPopup().isPresent()).toBe(false);
      });
    });

  });
})();
