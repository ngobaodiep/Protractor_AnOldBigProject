(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    amsMainPage = require('./AMSMainPage'),
    amsRawHistoryPage = require('./AMSRawHistoryPage'),
    amsAccountsViewPage = require('./AMSAccountsViewPage');

  describe('On AMS views navigation', function() {
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(amsMainPage.getAccountsView()));
      browser.wait(testUtils.until.presenceOf(amsAccountsViewPage.getCreate()));
    });

    it('accounts tab should be active by default', function() {
      expect(amsMainPage.getAccountsView().isPresent()).toBeTruthy();
      expect(amsMainPage.getAccountsView().isDisplayed()).toBeTruthy();
      expect(browser.getCurrentUrl()).toContain('/accounts');
    });

    it('devices tab should be active after click on devices tab', function() {
      amsMainPage.clickDevicesViewTab();
      browser.wait(testUtils.waitUrl(/devices/));
      expect(amsMainPage.getDevicesView().isPresent()).toBeTruthy();
      expect(browser.getCurrentUrl()).toContain('/devices');
    });

    it('rfids tab should be active after click on rfids tab', function() {
      amsMainPage.clickRfidViewTab();
      browser.wait(testUtils.waitUrl(/rfids/));
      expect(amsMainPage.getRfidsView().isPresent()).toBeTruthy();
      expect(browser.getCurrentUrl()).toContain('/rfids');
    });

    it('lora tab should be active after click on lora tab', function() {
      amsMainPage.clickLoraViewTab();
      browser.wait(testUtils.waitUrl(/loras/));
      expect(amsMainPage.getLorasView().isPresent()).toBeTruthy();
      expect(browser.getCurrentUrl()).toContain('/loras');
    });

    it('dallas tab should be active after click on dallas tab', function() {
      amsMainPage.clickDalasKeyViewTab();
      browser.wait(testUtils.waitUrl(/dallas/));
      expect(amsMainPage.getDallasView().isPresent()).toBeTruthy();
      expect(browser.getCurrentUrl()).toContain('/dallas');
    });

    it('system messages tab should be active after click on system messages tab', function() {
      amsMainPage.clickSystemMessagesViewTab();
      browser.wait(testUtils.waitUrl(/system-messages/));
      expect(amsMainPage.getSystemMessagesView().isPresent()).toBeTruthy();
      expect(browser.getCurrentUrl()).toContain('/system-messages');
    });

    describe('after click on raw history tab', function() {
      beforeAll(function(){
        browser.wait(testUtils.until.elementToBeClickable(amsMainPage.getRawHistoryTab()));
        amsMainPage.clickRawHistoryViewTab();
        browser.wait(testUtils.waitUrl(/raw-history/),5000,"a");
        browser.wait(testUtils.until.presenceOf(amsMainPage.getRawHistoryView()),5000,"b");
        browser.wait(testUtils.until.elementToBeClickable(amsRawHistoryPage.getAccountSelector()),5000,"c");
        browser.wait(testUtils.until.elementToBeClickable(amsRawHistoryPage.getDeviceSelector()),5000,"d");
      });
      it('raw history tab should be active after click on raw history tab', function() {
        expect(amsMainPage.getRawHistoryView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/raw-history');
      });
    });

    it('release note tab should be active after click on release note tab', function() {
      browser.wait(testUtils.until.elementToBeClickable(amsMainPage.getReleaseNoteViewTab()));
      amsMainPage.clickReleaseNoteViewTab();
      browser.wait(testUtils.waitUrl(/release-note/));
      expect(amsMainPage.getReleaseNoteView().isPresent()).toBeTruthy();
      expect(browser.getCurrentUrl()).toContain('/release-note');
    });

    it('login carousel tab should be active after click on login carousel tab', function() {
      amsMainPage.clickLoginCarouselViewTab();
      browser.wait(testUtils.waitUrl(/login-carousel/));
      expect(amsMainPage.getLoginCarouselView().isPresent()).toBeTruthy();
      expect(browser.getCurrentUrl()).toContain('/login-carousel');
    });

    it('problems tab should be active after clicking', function() {
      amsMainPage.getProblemsTabButton().click();
      browser.wait(testUtils.until.presenceOf(amsMainPage.getProblemsView()));
      expect(browser.getCurrentUrl()).toContain('/problems');
      expect(amsMainPage.getProblemsView().isDisplayed()).toBe(true);
    });

    it('packages tab should be active after click on packages tab', function() {
      amsMainPage.clickPackagesViewTab();
      browser.wait(testUtils.waitUrl(/packagings/));
      expect(amsMainPage.getPackagesView().isPresent()).toBeTruthy();
      expect(browser.getCurrentUrl()).toContain('/packagings');
    });

    it('account tab should be active after click on accounts tab', function() {
      amsMainPage.clickAccountsViewTab();
      browser.wait(testUtils.waitUrl(/accounts/));
      expect(amsMainPage.getAccountsView().isPresent()).toBeTruthy();
      expect(browser.getCurrentUrl()).toContain('/accounts');
    });
  });
})();
