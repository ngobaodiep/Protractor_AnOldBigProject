/*
    LoginPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
    'use strict';

    var LoginPage = function () {
        var user_input = element(by.css('#user-input')),
            password_input = element(by.css('#password-input')),
            login_button = element(by.css('.login-button')),
            error_alert = element(by.css('.alert.callout.button-error i.fi-alert')),
            error_alert_container = element(by.css('.alert.callout.button-error'));

        this.get = function () {
            browser.get('');
        };

        this.getUserInput = function () {
            return user_input;
        };
        this.setUserInput = function (text) {
            user_input.clear().sendKeys(text);
        };

        this.getPasswordInput = function () {
            return password_input;
        };
        this.setPasswordInput = function (text) {
            password_input.clear().sendKeys(text);
        };

        this.getLoginButton = function () {
            return login_button;
        };
        this.clickLogin = function () {
            login_button.click();
        };

        this.getErrorAlert = function () {
            return error_alert;
        };

        this.getErrorAlertContainer = function () {
            return error_alert_container;
        };

        this.getErrorAlertText = function () {
            return error_alert_container.getText();
        };
    };
    module.exports = new LoginPage();
})();