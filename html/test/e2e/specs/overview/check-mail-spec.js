(function() {
  "use strict";
  var testUtils = require("../../TestUtils"),
    moment = require("moment"),
    checkMailPage = require("./CheckMailPage");

  describe("check sent email", function() {
    var checked, date, yesterday;
    // var arr = [];
    beforeAll(function() {
      checked = false;

      yesterday = new Date(Date.now() - 86400000);
      date = testUtils.getFullDayString3(yesterday);
      browser.get("http://mail.bitnemo.vn/interface/root#/login");
      browser.wait(testUtils.until.presenceOf(checkMailPage.getLoginForm()));
      browser.wait(testUtils.until.presenceOf(checkMailPage.getEmailInput()));
      browser.wait(
        testUtils.until.presenceOf(checkMailPage.getPasswordInput())
      );
      browser.wait(testUtils.until.presenceOf(checkMailPage.getLoginButton()));
      browser.wait(
        testUtils.until.elementToBeClickable(checkMailPage.getEmailInput())
      );
      // checkMailPage.fillEmailInput("logifleet@bitnemo.vn");
      checkMailPage.fillEmailInput("annt@bitnemo.vn");
      browser.wait(
        testUtils.until.elementToBeClickable(checkMailPage.getPasswordInput())
      );
      // checkMailPage.fillPasswordInput("Bitnem0!@#");
      checkMailPage.fillPasswordInput("An041083@");
      browser.wait(
        testUtils.until.elementToBeClickable(checkMailPage.getLoginButton())
      );
      checkMailPage.getLoginButton().click();
      browser.wait(testUtils.until.stalenessOf(checkMailPage.getLoginForm()));
      browser.wait(testUtils.until.presenceOf(checkMailPage.getMailOverView()));
      browser.wait(
        testUtils.until.presenceOf(checkMailPage.getSearchTextBox())
      );
      browser.wait(testUtils.until.stalenessOf(element(by.css(".md-menu-backdrop"))), 5000, "Ac");
      checkMailPage.fillSearchTextBox("PTA GEOZONE Excel");
      browser.wait(testUtils.until.elementToBeClickable(checkMailPage.getSearchMailButton()));
      checkMailPage.getSearchMailButton().click();
      browser.wait(
        testUtils.until.invisibilityOf(element(by.css(".please-wait")))
      );

    });

    describe("on yesterday", function() {
      beforeAll(function() {
        date = "1/10/21";
        checkMailPage.getMessageTimeGridMailList().each(function(elm) {
          if (checked == true) return true;
          elm.getText().then(function(time) {
            if (time.localeCompare(date) == 0) {
              checked = true;
              // arr.push(time);
              elm.click();
              return true;
            }
          });
        });
        browser.wait(function() {
          return checkMailPage
            .getMessageHeaderTitle()
            .getText()
            .then(function(text) {
              return text.toLowerCase().includes("pta geozone") == true;
            });
        });
      });

      it('message header title should contain "PTA GEOZONE Excel"', function() {
        expect(checkMailPage.getMessageHeaderTitle().getText()).toContain(
          "PTA"
        );
      });

      it("should have from email", function() {
        expect(checkMailPage.getEmailFrom().getText()).toContain(
          "Logifleet 360°"
        );
      });

      it("should have to email", function() {
        expect(checkMailPage.getEmailTo().getText()).toContain(
          "logifleet@bitnemo.vn"
        );
      });

      it("should have mail content", function() {
        browser
          .switchTo()
          .frame(element(by.css("#messageViewFrame")).getWebElement());
        expect(checkMailPage.getMessageContent().isPresent()).toBe(true);
        expect(checkMailPage.getMessageContent().getText()).toContain("From");
        expect(checkMailPage.getMessageContent().getText()).toContain("Sent");
        expect(checkMailPage.getMessageContent().getText()).toContain("To");
        expect(checkMailPage.getMessageContent().getText()).toContain("Subject");
      });

      it("should have email", function() {
        // expect(arr.includes(date)).toBe(true);
        expect(checked).toBe(true);
      });

      describe("on attachment tab", function() {
        beforeAll(function() {
          // browser.switchTo().defaultContent();
          checkMailPage.getAttachmentTab().click();
          browser.wait(function() {
            return checkMailPage
              .getAttachmentTab()
              .getAttribute("class")
              .then(function(clas) {
                return clas.includes("mail-tab-selected") == true;
              });
          });
        });

        afterAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(checkMailPage.getAvatar()));
          checkMailPage.getAvatar().click();
          browser.executeScript(
            "arguments[0].scrollIntoView()",
            checkMailPage.getLogoutButton().getWebElement()
          );
          browser.wait(
            testUtils.until.visibilityOf(checkMailPage.getLogoutButton())
          );
          checkMailPage.getLogoutButton().click();
          browser.wait(testUtils.waitUrl(/login/));
        });

        it("should have attachment file", function() {
          expect(checkMailPage.getEmailAttachmentGrid(1).isPresent()).toBe(true);
        });
      });
    });
  });
})();
