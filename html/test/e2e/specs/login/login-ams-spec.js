(function(){
    'use strict';

    var testUtils = require('../../TestUtils'),
        loginPage = require('../../pages/login/LoginPage'),
        amsMainPage = require('./AMSMainPage');

    describe('On login AMS', function(){

        beforeAll(function() {
            loginPage.get();
            loginPage.setUserInput('test-user');
            loginPage.setPasswordInput('password');
            loginPage.clickLogin();
            browser.wait(testUtils.waitUrl(/accounts/));
            browser.wait(testUtils.until.stalenessOf(amsMainPage.getLoadingMask()));
        });

        it('should change window location on success', function(){
            expect(browser.getCurrentUrl()).toContain('/ams');
        });

        it('should land on accounts view', function(){
            expect(browser.getCurrentUrl()).toContain('/accounts');
        });
    });

})();
