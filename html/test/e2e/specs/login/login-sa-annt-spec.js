(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    loginPage = require('./LoginPage'),
    mainPage = require('./MainPage');

  describe('on login annt_sa main ', function() {

    beforeAll(function() {
      loginPage.get();
      loginPage.setUserInput('test-user');
      loginPage.setPasswordInput('password');
      loginPage.clickLogin();
      browser.wait(testUtils.waitUrl(/accounts/));
      browser.wait(testUtils.until.stalenessOf(mainPage.getLoaderOverlay()));
    });

    it('should change window location on success', function() {
      expect(browser.getCurrentUrl()).toContain('/ams');
    });

    it('should land on accounts view', function() {
      expect(browser.getCurrentUrl()).toContain('/accounts');
    });
  });

})();
