(function(){
    'use strict';

    var amsMainPage = require('./AMSMainPage'),
        loginPage = require('./LoginPage'),
        testUtils = require('../../TestUtils');

    describe('On logout AMS', function() {

        it('check presence of logout screen elements', function(){
            expect(amsMainPage.getLogoutButton().isPresent()).toBeTruthy();
            expect(amsMainPage.getLogoutButton().isDisplayed()).toBeTruthy();
        });

        it('should change window location on success', function(){
            amsMainPage.clickLogout();
            browser.wait(testUtils.until.presenceOf(loginPage.getLoginButton()));
            expect(browser.getCurrentUrl()).not.toContain('/ams');
        });

        it('should have a login-form fields', function(){
            expect(loginPage.getUserInput().isPresent()).toBeTruthy();
            expect(loginPage.getPasswordInput().isPresent()).toBeTruthy();
            expect(loginPage.getLoginButton().isPresent()).toBeTruthy();
        });
    });
})();
