(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    loginPage = require('./LoginPage'),
    mainPage = require('./MainPage');

  describe('On login Main', function() {

    beforeAll(function() {
      loginPage.get();
      loginPage.setUserInput('test-user');
      loginPage.setPasswordInput('password');
      loginPage.clickLogin();
      browser.wait(testUtils.waitUrl(/tracking/));
      browser.wait(testUtils.until.stalenessOf(mainPage.getLoaderOverlay()));
    });

    it('should change window location on success', function() {
      expect(browser.getCurrentUrl()).toContain('/lfr3');
    });

    it('should land on tracking view', function() {
      expect(browser.getCurrentUrl()).toContain('/tracking');
    });
  });

})();
