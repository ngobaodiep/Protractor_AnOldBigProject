(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
  driver = browser.driver,
    mainSettingsPage = require('./MainSettingsPage'),
    mainPage = require('./MainPage'),
    settingsBusinessRulesPage = require('./SettingsBusinessRulesPage'),
    warnModal = require('./WarnModal');

  describe('on settings business rules', function() {
    var random_number;
    beforeAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getSettingsTab()));
      mainPage.clickSettingsTab();
      browser.wait(testUtils.until.elementToBeClickable(mainSettingsPage.getSettingsBusinessRulesButton()));
      mainSettingsPage.clickSettingsBusinessRulesButton();
      browser.wait(testUtils.until.presenceOf(element(by.css('.businessrules-list'))));
    });

    describe('check business rules elements', function() {

      it('should have a create business rule button', function() {
        expect(settingsBusinessRulesPage.getCreateBusinessRuleBtn().isPresent()).toBe(true);
      });

      it('should have a pagination label', function() {
        expect(settingsBusinessRulesPage.getPaginationLabel().isPresent()).toBe(true);
      });
    });
    //check BR notifications preview button
    describe('when create model opened', function() {
      beforeAll(function(){
        browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getCreateBusinessRuleBtn()));
        settingsBusinessRulesPage.clickCreateBusinessRuleBtn();
        browser.wait(testUtils.until.presenceOf(settingsBusinessRulesPage.getNotificationsTab()));
        browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getNotificationsTab()));
        settingsBusinessRulesPage.getNotificationsTab().click();
        browser.wait(testUtils.until.presenceOf(settingsBusinessRulesPage.getNotificationsApp()));
        browser.executeScript("arguments[0].click();", settingsBusinessRulesPage.getNotificationsApp().getWebElement());
        browser.wait(testUtils.until.presenceOf(element(by.css('.notifications-list .k-editor iframe.k-content'))));
        browser.switchTo().frame(settingsBusinessRulesPage.getAppNoti().element(by.tagName('iframe')).getWebElement());
        element(by.tagName('body')).sendKeys("Test Preview Button");
        browser.switchTo().defaultContent();
        settingsBusinessRulesPage.getNotificationsTab().click();
        browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getPreviewBtn()));
        settingsBusinessRulesPage.getPreviewBtn().click();
        browser.wait(testUtils.until.presenceOf(settingsBusinessRulesPage.getNotificationPopup()));
      });

      afterAll(function(){
        browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getNotificationPopupCloseBtn()));
        settingsBusinessRulesPage.getNotificationPopupCloseBtn().click();
        browser.wait(testUtils.until.stalenessOf(settingsBusinessRulesPage.getNotificationPopupCloseBtn()));
        browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getCreateModalCancelBtn()));
        settingsBusinessRulesPage.getCreateModalCancelBtn().click();
        browser.wait(testUtils.until.stalenessOf(settingsBusinessRulesPage.getCreateModal()));
      });
      describe('check notifications tab ', function() {
        it('preview button should be displayed', function () {
          expect(settingsBusinessRulesPage.getPreviewBtn().isDisplayed()).toBe(true);
        });

        it('preview notification should be displayed', function () {
          expect(settingsBusinessRulesPage.getNotificationPopup().isDisplayed()).toBe(true);
        });

        it('preview notification string should be displayed', function () {
          expect(settingsBusinessRulesPage.getNotificationPopup().element(by.className('medium-12')).getText()).toBe("Test Preview Button");
        });
      });
    });

    describe('when business rule created', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getCreateBusinessRuleBtn()));
        settingsBusinessRulesPage.clickCreateBusinessRuleBtn();
        settingsBusinessRulesPage.createBusinessRule(random_number, 1);
        browser.wait(testUtils.until.visibilityOf(settingsBusinessRulesPage.getSearchBusinessInput()));
        settingsBusinessRulesPage.fillSearchBusinessInput('br ' + random_number);
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.k-grid-content tr:nth-of-type(1) td:nth-of-type(2) span', 'br ' + random_number))));
      });

      it('business rule should be found on list', function() {
        expect(settingsBusinessRulesPage.getGridRow(1).element(by.css('td:nth-of-type(2) span')).getText()).toEqual('br ' + random_number);
      });

      it('should have edit button', function() {
        expect(settingsBusinessRulesPage.getGridRow(1).element(by.css('a.fi-pencil')).isPresent()).toBe(true);
      });

      it('should have delete button', function() {
        expect(settingsBusinessRulesPage.getGridRow(1).element(by.css('a.deleteBusinessrule')).isPresent()).toBe(true);
      });
    });

    describe('when business rule edited', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getGridRow(1).element(by.css('.editBusinessrule'))));
        browser.executeScript("arguments[0].click();", settingsBusinessRulesPage.getGridRow(1).element(by.css('.editBusinessrule')).getWebElement());
        settingsBusinessRulesPage.editBusinessRule(random_number, 2);
        settingsBusinessRulesPage.clickSearchBusinessClearBtn();
        settingsBusinessRulesPage.fillSearchBusinessInput('edited br ' + random_number);
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.k-grid-content tr:nth-of-type(1) td:nth-of-type(2) span', 'edited br ' + random_number))));
      });

      it('new business rule should be found on list', function() {
        expect(settingsBusinessRulesPage.getGridRow(1).element(by.css('td:nth-of-type(2) span')).getText()).toEqual('edited br ' + random_number);
      });
    });

    describe('when business rule deleted', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getGridRow(1).element(by.css('.deleteBusinessrule'))));
        browser.executeScript("arguments[0].click();", settingsBusinessRulesPage.getGridRow(1).element(by.css('.deleteBusinessrule')).getWebElement());
        browser.wait(testUtils.until.presenceOf(warnModal.getWarnModal()));
        browser.wait(testUtils.until.presenceOf(warnModal.getWarnModalConfirmBtn()));
        warnModal.clickWarnModalConfirmBtn();
        browser.wait(testUtils.until.stalenessOf(warnModal.getWarnModal()));
        browser.wait(testUtils.until.stalenessOf(settingsBusinessRulesPage.getGridRow(1)));
      });

      it('business rule should not be found on list', function() {
        expect(settingsBusinessRulesPage.getGridRow(1).isPresent()).toBe(false);
      });
    });

    describe('when click pagination label', function() {
      beforeAll(function() {
        settingsBusinessRulesPage.clickSearchBusinessClearBtn();
        browser.wait(testUtils.until.stalenessOf(settingsBusinessRulesPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(element(by.css('.k-grid-content tbody[role="rowgroup"] tr'))));
        settingsBusinessRulesPage.clickPaginationLabel();
        browser.wait(testUtils.until.invisibilityOf(settingsBusinessRulesPage.getPagerNumber()));
      });

      it('the pager should not be active', function() {
        expect(settingsBusinessRulesPage.getPagerNumber().isDisplayed()).toBe(false);
      });
    });
  });
})();
