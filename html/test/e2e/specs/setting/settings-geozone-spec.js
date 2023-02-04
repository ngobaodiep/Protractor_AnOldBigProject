(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainSettingsPage = require('./MainSettingsPage'),
    settingsGeozonesPage = require('./SettingsGeozonesPage');

  describe('On settings geozone', function() {
    var random_number;
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsGeozonesButton()));
      mainSettingsPage.clickSettingsGezonesButton();
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsGeozonesView()));
    });

    describe('check geozone tab elements', function() {

      it('should have a create new geozone button', function() {
        expect(settingsGeozonesPage.getCreateGeozoneBtn().isPresent()).toBe(true);
      });

      it('should have a pagination link', function() {
        expect(settingsGeozonesPage.getPaginationLabel().isPresent()).toBe(true);
      });

      it('should have a document button', function() {
        expect(settingsGeozonesPage.getDocumentBtn().isPresent()).toBe(true);
      });

      it('should have an import button', function() {
        expect(settingsGeozonesPage.getImportBtn().isPresent()).toBe(true);
      });

      it('should have an export button', function() {
        expect(settingsGeozonesPage.getExportBtn().isPresent()).toBe(true);
      });

    });

    describe('when geozone created', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        settingsGeozonesPage.clickCreateGeozoneBtn();
        settingsGeozonesPage.createGeozone(random_number);
        browser.wait(testUtils.until.visibilityOf(settingsGeozonesPage.getSearchNameInput()));
        settingsGeozonesPage.fillSearchNameInput('geozone ' + random_number);
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.k-grid-content tr:nth-of-type(1) td:nth-of-type(2) span', 'geozone ' + random_number))));
      });

      it('geozone should be found on list', function() {
        expect(settingsGeozonesPage.getGridRow(1).element(by.css('td:nth-child(2) span')).getText()).toEqual('geozone ' + random_number);
      });

      it('should have edit button', function() {
        expect(settingsGeozonesPage.getGridRow(1).element(by.css('a.fi-pencil')).isPresent()).toBe(true);
      });

      it('should have delete button', function() {
        expect(settingsGeozonesPage.getGridRow(1).element(by.css('a.fi-trash')).isPresent()).toBe(true);
      });
    });

    describe('when geozone edited', function() {
      beforeAll(function() {
        browser.executeScript("arguments[0].click();", settingsGeozonesPage.getGridRow(1).element(by.css('a.fi-pencil')).getWebElement());
        settingsGeozonesPage.editGeozone(random_number);
        settingsGeozonesPage.clickSearchNameClearBtn();
        browser.wait(testUtils.until.visibilityOf(settingsGeozonesPage.getSearchNameInput()));
        settingsGeozonesPage.fillSearchNameInput('edited geozone ' + random_number);
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.k-grid-content tr:nth-of-type(1) td:nth-of-type(2) span', 'edited geozone ' + random_number))));
      });

      it('new geozone should be found on list', function() {
        expect(settingsGeozonesPage.getGridRow(1).element(by.css('td:nth-child(2) span')).getText()).toEqual('edited geozone ' + random_number);
      });
    });

    describe('check geozone by eye button', function() {
      beforeAll(function() {
        browser.executeScript("arguments[0].click();", settingsGeozonesPage.getGridRow(1).element(by.css('a.fi-eye-open')).getWebElement());
        browser.wait(testUtils.until.presenceOf(element(by.css('.geozone-form-modal'))));
      });

      it('geozone should be shown', function() {
        expect(element(by.css('.geozone-form-modal h3 span')).getText()).toContain('geozone ' + random_number);
      });

      afterAll(function() {
        browser.executeScript("arguments[0].click();", element(by.css('.geozone-form-modal button.ok')).getWebElement());
        browser.wait(testUtils.until.stalenessOf(element(by.css('.geozone-form-modal'))));
      });
    });

    describe('when geozone deleted', function() {
      beforeAll(function() {
        browser.executeScript("arguments[0].click();", settingsGeozonesPage.getGridRow(1).element(by.css('td:nth-child(12) a.fi-trash')).getWebElement());
        browser.wait(testUtils.until.presenceOf(settingsGeozonesPage.getWarnModal()));
        settingsGeozonesPage.clickWarnModalDeleteBtn();
        browser.wait(testUtils.until.stalenessOf(settingsGeozonesPage.getLoadingMask()));
        browser.wait(testUtils.until.stalenessOf(settingsGeozonesPage.getGridRow(1)));
      });
      afterAll(function(){
        browser.wait(testUtils.until.elementToBeClickable(settingsGeozonesPage.getSearchNameClearInput()));
        settingsGeozonesPage.clickSearchNameClearBtn();
        browser.wait(testUtils.until.invisibilityOf(settingsGeozonesPage.getSearchNameClearInput()));
      });

      it('geozone should not be found on list', function() {
        expect(settingsGeozonesPage.getGridRow(1).isPresent()).toBe(false);
      });
    });

    describe('when geozone from file imported', function() {
      beforeAll(function() {
        settingsGeozonesPage.importFile();

        browser.wait(testUtils.until.elementToBeClickable(settingsGeozonesPage.getSearchNameInput()));
        settingsGeozonesPage.fillSearchNameInput('geozone 123456789');
        browser.wait(testUtils.until.stalenessOf(settingsGeozonesPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(settingsGeozonesPage.getGridRow(1)));
        browser.wait(testUtils.until.elementToBeClickable(settingsGeozonesPage.getGridRow(1).element(by.css('td:nth-child(12) a.fi-trash.deletePlace'))));
      });

      it('should have imported geozone in list', function() {
        expect(settingsGeozonesPage.getGridRow(1).element(by.css('td:nth-of-type(2) span')).getText()).toEqual('geozone 123456789');
      });
    });

    describe('when click pagination label', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsGeozonesPage.getSearchNameClearInput()));
        settingsGeozonesPage.clickSearchNameClearBtn();
        browser.wait(testUtils.until.presenceOf(element.all(by.css('.categories-list .k-grid-content tr'))));
        browser.wait(testUtils.until.elementToBeClickable(settingsGeozonesPage.getPaginationLabel()));
        settingsGeozonesPage.clickPaginationLabel();
        browser.wait(testUtils.until.invisibilityOf(settingsGeozonesPage.getPagerNumber()));
        browser.wait(testUtils.until.invisibilityOf(settingsGeozonesPage.getGoToLastPageBtn()));
        browser.wait(testUtils.until.invisibilityOf(settingsGeozonesPage.getGoToNextPageBtn()));
        browser.wait(testUtils.until.invisibilityOf(settingsGeozonesPage.getGoToFirstPageBtn()));
        browser.wait(testUtils.until.invisibilityOf(settingsGeozonesPage.getGoToPreviousPageBtn()));
      });
      afterAll(function(){
        browser.wait(testUtils.until.elementToBeClickable(settingsGeozonesPage.getPaginationLabel()));
        settingsGeozonesPage.clickPaginationLabel();
        browser.wait(testUtils.until.visibilityOf(settingsGeozonesPage.getPagerNumber()));
        browser.wait(testUtils.until.visibilityOf(settingsGeozonesPage.getGoToFirstPageBtn()));
        browser.wait(testUtils.until.visibilityOf(settingsGeozonesPage.getGoToPreviousPageBtn()));
        browser.wait(testUtils.until.visibilityOf(settingsGeozonesPage.getGoToNextPageBtn()));
        browser.wait(testUtils.until.visibilityOf(settingsGeozonesPage.getGoToLastPageBtn()));
      });

      it('the pager should not be active', function() {
        expect(settingsGeozonesPage.getPagerNumber().isDisplayed()).toBe(false);
      });
      it('goToLastPageBtn should be inviable', function() {
        expect(settingsGeozonesPage.getGoToLastPageBtn().isDisplayed()).toBe(false);
      });
      it('goToLastPageBtn should be inviable', function() {
        expect(settingsGeozonesPage.getGoToNextPageBtn().isDisplayed()).toBe(false);
      });
      it('goToLastPageBtn should be inviable', function() {
        expect(settingsGeozonesPage.getGoToFirstPageBtn().isDisplayed()).toBe(false);
      });
      it('goToLastPageBtn should be inviable', function() {
        expect(settingsGeozonesPage.getGoToPreviousPageBtn().isDisplayed()).toBe(false);
      });
    });

    describe('when geozone from import file deleted', function() {
      beforeAll(function() {
        // browser.wait(testUtils.until.elementToBeClickable(settingsGeozonesPage.getPaginationLabel()));
        browser.wait(testUtils.until.elementToBeClickable(settingsGeozonesPage.getSearchNameInput()));
        settingsGeozonesPage.fillSearchNameInput('geozone 123456789');
        browser.wait(testUtils.until.presenceOf(settingsGeozonesPage.getGridRow(1).element(by.cssContainingText('td:nth-child(2) span',"geozone 123456789"))));
        browser.wait(testUtils.until.elementToBeClickable(settingsGeozonesPage.getGridRow(1).element(by.css('td:nth-child(12) a.k-button.k-button-icontext.fi-trash.deletePlace'))));
        settingsGeozonesPage.getGridRow(1).element(by.css('td:nth-child(12) a.k-button.deletePlace')).click();
        browser.wait(testUtils.until.presenceOf(settingsGeozonesPage.getWarnModal()));
        browser.wait(testUtils.until.elementToBeClickable(settingsGeozonesPage.getConfirmWarningBtn()));
        settingsGeozonesPage.clickWarnModalDeleteBtn();
        browser.wait(testUtils.until.stalenessOf(settingsGeozonesPage.getLoadingMask()));
        browser.wait(testUtils.until.stalenessOf(settingsGeozonesPage.getGridRow(1)));
      });
      it('geozone should not be found on list', function() {
        expect(settingsGeozonesPage.getGridRow(1).isPresent()).toBe(false);
      });
    });
  });
})();
