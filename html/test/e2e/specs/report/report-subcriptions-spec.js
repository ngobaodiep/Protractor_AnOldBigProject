(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainReportPage = require('./MainReportPage'),
    reportSubcriptionsPage = require('./ReportSubcriptionsPage');

  describe('on reports tab', function() {
    var random_number;
    beforeAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getReportTab()));
      mainPage.clickReportTab();
      browser.wait(testUtils.until.presenceOf(mainReportPage.getSubcriptionsListButton()));
      mainReportPage.clickSubcriptionsListButton();
      browser.wait(testUtils.until.presenceOf(reportSubcriptionsPage.getCreateSubcriptionBtn()));
    });

    describe('check subscription list elements', function() {
      it('should have a create subscription button', function() {
        expect(reportSubcriptionsPage.getCreateSubcriptionBtn().isPresent()).toBe(true);
      });
    });

    describe('when subcription created', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        reportSubcriptionsPage.clickCreateSubcriptionBtn();
        reportSubcriptionsPage.createSubcription(random_number, 1);
        reportSubcriptionsPage.fillSearchNameInput('subcription ' + random_number);
        browser.wait(testUtils.until.stalenessOf(reportSubcriptionsPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.k-grid-content tr:nth-child(1) td:nth-child(1) span', 'subcription ' + random_number))));
      });

      it('subcription should be found on list', function() {
        expect(reportSubcriptionsPage.getGridRow(1).element(by.css('td:nth-child(1) span')).getText()).toEqual('subcription ' + random_number);
      });
    });

    describe('when subcription edited', function() {
      beforeAll(function() {
        browser.executeScript("arguments[0].click();", reportSubcriptionsPage.getGridRow(1).element(by.css('a[ng-click="editSubscription($event)"].editSubscription')).getWebElement());
        reportSubcriptionsPage.editSubcription(random_number, 2);
        reportSubcriptionsPage.clickSearchNameClearBtn();
        reportSubcriptionsPage.fillSearchNameInput('edited scr ' + random_number);
        browser.wait(testUtils.until.stalenessOf(reportSubcriptionsPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(reportSubcriptionsPage.getGridRow(1).element(by.css('td:nth-child(1) span'))));
        browser.wait(function() {
          return reportSubcriptionsPage.getGridRow(1).element(by.css('td:nth-child(1) span')).getText().then(function(txt) {
            return txt == 'edited scr ' + random_number;
          });
        });
      });

      it('new subcription should be found on list', function() {
        expect(reportSubcriptionsPage.getGridRow(1).element(by.css('td:nth-child(1) span')).getText()).toEqual('edited scr ' + random_number);
      });
    });

    describe('when subcription deleted', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(reportSubcriptionsPage.getGridRow(1).element(by.css('a[ng-click="deleteSubscription($event)"].deleteSubscription'))));
        reportSubcriptionsPage.deleteSubcription();
        browser.wait(testUtils.until.stalenessOf(reportSubcriptionsPage.getLoadingMask()));
        browser.wait(testUtils.until.stalenessOf(reportSubcriptionsPage.getGridRow(1)));
      });

      afterAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(reportSubcriptionsPage.getClearSearchNameBtn()));
        reportSubcriptionsPage.clickSearchNameClearBtn();
        browser.wait(testUtils.until.stalenessOf(reportSubcriptionsPage.getLoadingMask()));
        browser.wait(testUtils.until.invisibilityOf(reportSubcriptionsPage.getClearSearchNameBtn()));
      });

      it('subcription should not be found on list', function() {
        expect(reportSubcriptionsPage.getGridRow(1).isPresent()).toBe(false);
      });
    });

    describe('when subcription notification created', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        browser.wait(testUtils.until.elementToBeClickable(reportSubcriptionsPage.getCreateSubcriptionBtn()));
        reportSubcriptionsPage.clickCreateSubcriptionBtn();
        browser.wait(testUtils.until.presenceOf(reportSubcriptionsPage.getActiveTabContent()));
        reportSubcriptionsPage.selectGeneralReportNotifications();
        reportSubcriptionsPage.fillGeneralName("subcription " + random_number);
        reportSubcriptionsPage.selectPeriodicity(1);
        reportSubcriptionsPage.clickReportOptionsTab();
        reportSubcriptionsPage.selectReportOptionsStatus(1);
        reportSubcriptionsPage.clickReportOptionsTab();
        browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"] li:nth-child(1)'))));
        reportSubcriptionsPage.selectReportOptionsSeverity(1);
        reportSubcriptionsPage.clickReportOptionsTab();
        browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"] li:nth-child(1)'))));
        reportSubcriptionsPage.selectReportOptionsBusinessRule(1);
        reportSubcriptionsPage.clickReportOptionsTab();
        browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"] li:nth-child(1)'))));
        browser.executeScript("arguments[0].scrollIntoView();", reportSubcriptionsPage.getReportOptionsVehicles().getWebElement());
        reportSubcriptionsPage.selectReportOptionsVehicles(1);
        reportSubcriptionsPage.clickReportOptionsTab();
        browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"] li:nth-child(1)'))));
        reportSubcriptionsPage.selectReportOptionsMachines(1);
        reportSubcriptionsPage.clickReportOptionsTab();
        browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"] li:nth-child(1)'))));
        browser.wait(testUtils.until.presenceOf(reportSubcriptionsPage.getReportOptionsVehicles().all(by.css('.k-multiselect-wrap ul li>span:nth-child(1)'))));
        browser.executeScript('arguments[0].scrollIntoView()',
        reportSubcriptionsPage.getReportOptionsTracked().element(by.css('input')).getWebElement());
        reportSubcriptionsPage.selectReportOptionsTracked(1);
        reportSubcriptionsPage.clickReportOptionsTab();
        browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"] li:nth-child(1)'))));
        browser.wait(testUtils.until.elementToBeClickable(reportSubcriptionsPage.getDistributionTab()));
        reportSubcriptionsPage.clickDistributionTab();
        reportSubcriptionsPage.selectHNRecipients();
        reportSubcriptionsPage.clickSaveButton();
        browser.wait(testUtils.until.stalenessOf(reportSubcriptionsPage.getCreateModal()));
        browser.wait(testUtils.until.elementToBeClickable(reportSubcriptionsPage.getSearchNameInput()));
        reportSubcriptionsPage.fillSearchNameInput("subcription " + random_number);
        browser.wait(testUtils.until.stalenessOf(reportSubcriptionsPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(reportSubcriptionsPage.getGridRow(1)));
      });

      it('on content table should have created element', function() {
        expect(reportSubcriptionsPage.getGridRow(1).isPresent()).toBe(true);
      });

      describe('when subcription deleted', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(reportSubcriptionsPage.getGridRow(1).element(by.css('a[ng-click="deleteSubscription($event)"].deleteSubscription'))));
          reportSubcriptionsPage.deleteSubcription();
          browser.wait(testUtils.until.stalenessOf(reportSubcriptionsPage.getLoadingMask()));
          browser.wait(testUtils.until.stalenessOf(reportSubcriptionsPage.getGridRow(1)));
        });
      });
    });
  });
})();
