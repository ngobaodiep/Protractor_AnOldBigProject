(function () {
  "use strict";

  var loginPage = require("./LoginPage"),
    testUtils = require("./TestUtils");

  describe("On login module", function () {
    beforeAll(function () {
      loginPage.get();
    });

    describe("login screen", function () {
      it("should have a title", function () {
        expect(browser.getTitle()).toEqual("Logifleet 360°");
      });

      it("should have a user-input field", function () {
        expect(loginPage.getUserInput().isPresent()).toBe(true);
      });

      it("should have a password-input field", function () {
        expect(loginPage.getPasswordInput().isPresent()).toBeTruthy();
      });

      it("should have a login button", function () {
        expect(loginPage.getLoginButton().isPresent()).toBeTruthy();
      });

      it("should have an error message section", function () {
        expect(loginPage.getErrorAlert().isPresent()).toBeTruthy();
      });
    });

    describe("when login fail", function () {
      beforeAll(function () {
        loginPage.setUserInput("wrong-username");
        loginPage.setPasswordInput("wrong-pasword");
        loginPage.clickLogin();
        browser.wait(testUtils.until.visibilityOf(loginPage.getErrorAlert()));
      });

      it("should show proper error message", function () {
        expect(loginPage.getErrorAlert().isDisplayed()).toBeTruthy();
      });

      it("should not change window location", function () {
        expect(browser.getCurrentUrl()).not.toContain("/lfr3");
        expect(browser.getCurrentUrl()).not.toContain("/ams");
      });

      it("should display error message", function () {
        expect(
          loginPage.getErrorAlertContainer().getCssValue("display")
        ).toContain("block");
      });
    });
  });
})();
