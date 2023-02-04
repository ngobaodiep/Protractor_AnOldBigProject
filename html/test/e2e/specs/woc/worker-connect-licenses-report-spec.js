(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    workerConnectLicensesReportPage = require('./WorkerConnectLicensesReportPage'),
    timebookingGlobalPage = require('./TimeBookingsGlobalPage'),
    settingsPersonsPage = require('./SettingsPersonsPage'),
    mainSettingsPage = require('./MainSettingsPage'),
    mainPage = require('./MainPage');

  describe('on settings person worker ', function() {
    beforeAll(function() {
      mainPage.clickSettingsTab();
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsPersonsButton()));
      mainSettingsPage.clickSettingsPersonsButton();
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsPersonsView()));
      browser.wait(testUtils.until.stalenessOf(settingsPersonsPage.getLoadingMask()));

    });

    it('should display worker connected filter on person tab', function() {
      expect(settingsPersonsPage.getWorkerConnectFilter().isPresent()).toBe(true);
    });

    describe('check', function() {
      var numOfActiveWorker = 0,
        numOfPendingWorker = 0,
        number_of_active_licenses = 0,
        number_of_active_pending_licenses = 0;

      beforeAll(function() {
        browser.wait(testUtils.until.presenceOf(settingsPersonsPage.getWorkerConnectFilter()));
        browser.executeScript('arguments[0].scrollIntoView(true)', element(by.css('.users-list .k-grid .k-grid-header .k-filter-row th:nth-of-type(14)')).getWebElement());
        browser.wait(testUtils.until.elementToBeClickable(settingsPersonsPage.getWorkerConnectFilter()));
        settingsPersonsPage.selectActiveWorker();
        element.all(by.css('.users-list .k-grid .k-grid-content tr')).count().then(function(count1) {
          numOfActiveWorker = count1;
        });

        browser.wait(testUtils.until.visibilityOf(element(by.css('.users-list .k-grid .k-grid-header .k-filter-row th:nth-of-type(14) span.k-i-close'))));
        browser.executeScript("arguments[0].click();", element(by.css('.users-list .k-grid .k-grid-header .k-filter-row th:nth-of-type(14) span.k-i-close')).getWebElement());
        settingsPersonsPage.selectPendingWorker();
        element.all(by.css('.users-list .k-grid .k-grid-content tr')).count().then(function(count2) {
          numOfPendingWorker = count2;
        });

        mainSettingsPage.clickSettingsWorkerConnectButton();
        browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsTimeBookingsView()));
        browser.wait(testUtils.until.presenceOf(timebookingGlobalPage.getCreateSiteActive()));
        browser.wait(testUtils.until.elementToBeClickable(workerConnectLicensesReportPage.getLicenseReportButton()));
        workerConnectLicensesReportPage.clickLicenseReportButton();
        browser.wait(testUtils.until.presenceOf(workerConnectLicensesReportPage.getMonthlyInvoices()));
        browser.wait(testUtils.until.elementToBeClickable(workerConnectLicensesReportPage.getWorkerConnectLicensesFilter()));
        workerConnectLicensesReportPage.selectActiveLicenses();
        browser.wait(testUtils.until.visibilityOf(workerConnectLicensesReportPage.getLicensesFilterCloseBtn()));
        browser.wait(function() {
          return workerConnectLicensesReportPage.getWorkerConnectLicensesFilter().element(by.css('button')).isPresent().then(function(isPresent) {
            return isPresent == true;
          });
        });
        browser.wait(testUtils.until.presenceOf(workerConnectLicensesReportPage.getLicenseUsersGridContent().all(by.css('tbody tr'))));
        workerConnectLicensesReportPage.clickLicenseFilterCloseBtn();
        browser.wait(testUtils.until.elementToBeClickable(workerConnectLicensesReportPage.getWorkerConnectLicensesFilter()));
        workerConnectLicensesReportPage.selectPendingLicenses();
        workerConnectLicensesReportPage.getLicenseUsersGridContent().all(by.css('tbody tr')).count().then(function(count3) {
          number_of_active_licenses = parseInt(count3, 10);
          number_of_active_licenses = count3;
        });
      });

      it('number of active worker and pending worker should equal to number of active licenses and number of pending active licenses', function() {
        expect(numOfActiveWorker + numOfPendingWorker).toBe(number_of_active_licenses + number_of_active_pending_licenses);
        expect(numOfActiveWorker).toBe(number_of_active_licenses);
      });

    });

    describe('on worker connect licenses tab', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.visibilityOf(workerConnectLicensesReportPage.getLicensesFilterCloseBtn()));
        workerConnectLicensesReportPage.clickLicenseFilterCloseBtn();
      });

      describe('grid licenses', function() {

        it('should have text see my monthly invoice', function() {
          expect(workerConnectLicensesReportPage.getMonthlyInvoices().isPresent()).toBe(true);
        });

        it('should have terms and conditions', function() {
          expect(workerConnectLicensesReportPage.getTermsAndConditions().isPresent()).toBe(true);
        });
      });

      describe('users list', function() {
        it('should have paper wrap', function() {
          expect(workerConnectLicensesReportPage.getPaperWrap().isDisplayed()).toBe(true);
        });

        it('should have users list header', function() {
          expect(workerConnectLicensesReportPage.getUserListHeader().isPresent()).toBe(true);
        });
      });

      describe('when Monthly Invoices link clicked ', function() {
        beforeAll(function() {
          workerConnectLicensesReportPage.clickMonthlyInvooicesLink();
          browser.wait(testUtils.until.presenceOf(element(by.css('.payments-list'))));
        });

        it('should change location to payments list', function() {
          expect(browser.getCurrentUrl()).toContain('/payments');
        });
      });

      describe('when terms and coditions clicked ', function() {
        beforeAll(function() {
          mainSettingsPage.clickSettingsWorkerConnectButton();
          browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsTimeBookingsView()));
          browser.wait(testUtils.until.presenceOf(timebookingGlobalPage.getCreateSiteActive()));
          browser.wait(testUtils.until.elementToBeClickable(workerConnectLicensesReportPage.getLicenseReportButton()));
          workerConnectLicensesReportPage.clickLicenseReportButton();
          browser.wait(testUtils.until.presenceOf(workerConnectLicensesReportPage.getMonthlyInvoices()));
          workerConnectLicensesReportPage.clickTermsAndConditions();
          browser.wait(testUtils.until.presenceOf(element(by.css('.create-payment-modal'))));
        });

        afterAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(workerConnectLicensesReportPage.getCloseConditionsButton()));
          workerConnectLicensesReportPage.clickCloseConditionsButton();
        });

        it('should change location to help view', function() {
          expect(workerConnectLicensesReportPage.getPopupTermsAndConditions().isPresent()).toBe(true);
        });
      });
    });
  });
})();
