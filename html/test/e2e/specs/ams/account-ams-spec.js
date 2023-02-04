(function() {
  'use strict';

  var amsMainPage = require('../../ams/AMSMainPage'),
    amsAccountsViewPage = require('../../pages/ams/AMSAccountsViewPage'),
    testUtils = require('../../TestUtils');
  var HttpClient = require("protractor-http-client").HttpClient,
    http = new HttpClient("https://int.logifleet360.ch"),
    connect = http.get("/ams/#/accounts"),
    deleteResponse;

  describe('On account view', function() {
    var random_number = new Date().getTime();
    describe('when account created', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.stalenessOf(amsMainPage.getLoadingMask()));
        // start create account
        browser.wait(testUtils.until.presenceOf(amsAccountsViewPage.getCreate()));
        amsAccountsViewPage.clickCreate();
        amsAccountsViewPage.fillAdminEmail('adminTest12345@gmail.com');
        amsAccountsViewPage.fillAdminFirstName("adminTest");
        amsAccountsViewPage.fillAdminLastName("12345");
        amsAccountsViewPage.fillDisplayName("accTest" + random_number);
        browser.executeScript('arguments[0].scrollIntoView()', amsAccountsViewPage.getPackageSelector().getWebElement());
        amsAccountsViewPage.selectPackage();
        amsAccountsViewPage.fillDescription("description of accTest" + random_number);
        amsAccountsViewPage.selectCountry();
        amsAccountsViewPage.fillAddress1("18 Khuc Thua Du");
        amsAccountsViewPage.fillZipCode("122400");
        amsAccountsViewPage.fillCity("Ha Noi");
        amsAccountsViewPage.clickSaveButton();
        browser.wait(testUtils.until.stalenessOf(amsAccountsViewPage.getCreateModal()));
        // filter list and check
        amsAccountsViewPage.filterGridByLogin("accTest" + random_number);
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('div.accounts-list tr:nth-of-type(1) td[role="gridcell"]:nth-of-type(1) b', 'accTest' + random_number))));
      });
      it('name should be found on list', function() {
        expect(amsAccountsViewPage.getGridRow(1).element(by.css('td[role="gridcell"]:nth-of-type(1) b')).getText()).toContain("accTest" + random_number);
      });
      it('description should be found on list', function() {
        expect(amsAccountsViewPage.getGridRow(1).element(by.css('td[role="gridcell"]:nth-of-type(2)')).getText()).toContain("description of accTest" + random_number);
      });
    });

    describe('when account edited', function() {
      beforeAll(function() {
        // edit account
        amsAccountsViewPage.clickOnEditAccountRow(1);
        browser.wait(testUtils.until.presenceOf(amsAccountsViewPage.getCreateModal()));
        amsAccountsViewPage.fillDisplayName("editedAccTest" + random_number);
        amsAccountsViewPage.fillDescription("edited description of accTest" + random_number);
        amsAccountsViewPage.clickSaveButton();
        browser.wait(testUtils.until.stalenessOf(amsAccountsViewPage.getCreateModal()));
        // filter list and check
        amsAccountsViewPage.filterGridByLogin("editedAccTest" + random_number);
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('div.accounts-list tr:nth-of-type(1) td[role="gridcell"]:nth-of-type(1) b', 'editedAccTest' + random_number))));
      });

      it('name should be found on list', function() {
        expect(amsAccountsViewPage.getGridRow(1).element(by.css('td[role="gridcell"]:nth-of-type(1) b')).getText()).toContain("editedAccTest" + random_number);
      });

      it('description should be found on list', function() {
        expect(amsAccountsViewPage.getGridRow(1).element(by.css('td[role="gridcell"]:nth-of-type(2)')).getText()).toContain("edited description of accTest" + random_number);
      });
    });
  });
})();
