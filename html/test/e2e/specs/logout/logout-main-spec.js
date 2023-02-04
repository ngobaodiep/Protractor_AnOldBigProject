(function() {
  'use strict';

  var mainPage = require('./MainPage'),
    loginPage = require('./LoginPage'),
    testUtils = require('./TestUtils');

  describe('On logout Main', function() {
    beforeAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getLogoutButton()));
    });

    it('check presence of logout screen elements', function() {
      expect(mainPage.getLogoutButton().isPresent()).toBeTruthy();
      expect(mainPage.getLogoutButton().isDisplayed()).toBeTruthy();
    });

    it('should change window location on success', function() {
      mainPage.clickLogout();
      browser.wait(testUtils.until.presenceOf(loginPage.getLoginButton()));
      expect(browser.getCurrentUrl()).not.toContain('/lfr3');
    });

    it('should have a login-form fields', function() {
      expect(loginPage.getUserInput().isPresent()).toBeTruthy();
      expect(loginPage.getPasswordInput().isPresent()).toBeTruthy();
      expect(loginPage.getLoginButton().isPresent()).toBeTruthy();
    });
  });
})();
