(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    timeBookingsSitesPage = require('./TimeBookingsSitesPage');

  describe('on settings time booking', function() {
    var random_number,
      selected_geozone_category_count,
      site_category_count;

    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(timeBookingsSitesPage.getSitesTimeBookingsButton()));
      timeBookingsSitesPage.clickSitesTimeBookingsButton();
      browser.wait(testUtils.until.presenceOf(timeBookingsSitesPage.getSitesTimeBookingsView()));
    });

    describe('check site elements', function() {

      it('should have select geozone categories text box', function() {
        expect(timeBookingsSitesPage.getSelectedTextBox().isPresent()).toBe(true);
      });

      it('should have cancel button', function() {
        expect(timeBookingsSitesPage.getCategoryCancelButton().isPresent()).toBe(true);
      });

      it('should have save button', function() {
        expect(timeBookingsSitesPage.getCategorySaveButton().isPresent()).toBe(true);
      });

      it('should have create new site button', function() {
        expect(timeBookingsSitesPage.getCreateNewSiteBtn().isPresent()).toBe(true);
      });
    });

    describe('when a site created', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        timeBookingsSitesPage.SelectGeozoneCategories(0);
        timeBookingsSitesPage.createSite(random_number);

        browser.executeScript("arguments[0].click();", timeBookingsSitesPage.getSiteCategoryButton().getWebElement());
        browser.wait(testUtils.until.presenceOf(timeBookingsSitesPage.getDropList()));
        site_category_count = timeBookingsSitesPage.getDropList().all(by.css('li')).count();
        browser.executeScript("arguments[0].click();", timeBookingsSitesPage.getCategoryOffsetIndex(0).getWebElement());
        browser.wait(testUtils.until.elementToBeClickable(timeBookingsSitesPage.getSiteSaveBtn()));
        timeBookingsSitesPage.clickSiteSaveBtn();
        browser.wait(testUtils.until.stalenessOf(timeBookingsSitesPage.getSiteFormModal()));
        timeBookingsSitesPage.fillSearchNameInput('site ' + random_number);
        browser.wait(testUtils.until.stalenessOf(timeBookingsSitesPage.getLoadingMask()));
        timeBookingsSitesPage.getSelectedCategoryList().count().then(function(count) {
          selected_geozone_category_count = count;
        });
        browser.wait(testUtils.until.presenceOf(timeBookingsSitesPage.getContentGridRow(1)));
      });

      describe('check', function() {

        it('category count', function() {
          expect(selected_geozone_category_count + 1).toBe(site_category_count);
        });

        it('should have site name', function() {
          expect(timeBookingsSitesPage.getContentGridRow(1).element(by.css('td:nth-of-type(2) span')).getText()).toBe('site ' + random_number);
        });

        it('should have site reference', function() {
          expect(timeBookingsSitesPage.getContentGridRow(1).element(by.css('td:nth-of-type(1) span')).getText()).toBe('reference site');
        });

        it('should have site contact', function() {
          expect(timeBookingsSitesPage.getContentGridRow(1).element(by.css('td:nth-of-type(5) span')).getText()).toBe('int-test-automated');
        });

        it('should have site phone', function() {
          expect(timeBookingsSitesPage.getContentGridRow(1).element(by.css('td:nth-of-type(6) span')).getText()).toBe('084904736459');
        });

        it('should have edit button', function() {
          expect(timeBookingsSitesPage.getContentGridRow(1).element(by.css('td:nth-of-type(8) a.fi-pencil.editSite')).isPresent()).toBe(true);
        });

        it('should have delete button', function() {
          expect(timeBookingsSitesPage.getContentGridRow(1).element(by.css('td:nth-of-type(8) a.k-button.fi-trash.deleteSite')).isPresent()).toBe(true);
        });

        it('should have eye button', function() {
          expect(timeBookingsSitesPage.getContentGridRow(1).element(by.css('td:nth-of-type(8) a.k-button.fi-eye-open.showSite')).isPresent()).toBe(true);
        });
      });
    });

    describe('when a site deleted', function() {
      beforeAll(function() {
        browser.executeScript("arguments[0].click();", timeBookingsSitesPage.getContentGridRow(1).element(by.css('td:nth-of-type(8) a.k-button.fi-trash.deleteSite')).getWebElement());
        browser.wait(testUtils.until.presenceOf(element(by.css('.modal-warning'))));
        timeBookingsSitesPage.clickSiteDeleteBtn();
        browser.wait(testUtils.until.stalenessOf(timeBookingsSitesPage.getContentGridRow(1)));
      });

      afterAll(function() {
        browser.executeScript("arguments[0].click();", element(by.css('.k-multiselect-wrap li.k-button:nth-of-type(' + selected_geozone_category_count + ') .k-i-close')).getWebElement());
        timeBookingsSitesPage.clickSiteCategorySaveBtn();
        browser.wait(testUtils.until.presenceOf(timeBookingsSitesPage.getInfoModal()));
        timeBookingsSitesPage.clickInfoModalOKBtn();
        browser.wait(testUtils.until.stalenessOf(timeBookingsSitesPage.getInfoModal()));
      });

      it('site should not be found on list', function() {
        expect(timeBookingsSitesPage.getContentGridRow(1).isPresent()).toBe(false);
      });
    });
  });
})();
