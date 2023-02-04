(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    mainSettingsPage = require('./MainSettingsPage'),
    mainPage = require('./MainPage'),
    settingsBusinessRulesPage = require('./SettingsBusinessRulesPage');
  describe('on settings business rules ', function() {
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(element(by.css('.businessrules-list'))));
      browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getCreateBusinessRuleBtn()));
      settingsBusinessRulesPage.getCreateBusinessRuleBtn().click();
      browser.wait(testUtils.until.presenceOf(settingsBusinessRulesPage.getCreateModal()));
      browser.wait(testUtils.until.presenceOf(settingsBusinessRulesPage.getConditionTab()));
      browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getConditionTab()));
      settingsBusinessRulesPage.getConditionTab().click();
      browser.wait(testUtils.until.presenceOf(element(by.css('input:nth-child(1).ng-not-empty'))));
    });

    afterAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getCreateModalCancelBtn()));
      settingsBusinessRulesPage.getCreateModalCancelBtn().click();
      browser.wait(testUtils.until.stalenessOf(settingsBusinessRulesPage.getCreateModal()));
    });

    describe('when event radio chose', function() {
      it('event radio should be chosen', function() {
        expect(element(by.css('input:nth-child(1).ng-not-empty')).isPresent()).toBe(true);
      });

      it('speed condition button should not be disable', function() {
        expect(settingsBusinessRulesPage.getSpeedConditionBtn().isEnabled()).toBe(true);
      });

      it('geozone condition button should not be disable', function() {
        expect(settingsBusinessRulesPage.getGeozoneConditionBtn().isEnabled()).toBe(true);
      });

      it('time condition button should not be disable', function() {
        expect(settingsBusinessRulesPage.getTimeConditionBtn().isEnabled()).toBe(true);
      });

      it('temperature condition button should not be disable', function() {
        expect(settingsBusinessRulesPage.getTemperatureConditionBtn().isEnabled()).toBe(true);
      });

      it('status condition button should be disable after chose', function() {
        expect(settingsBusinessRulesPage.getStatusConditionBtn().isEnabled()).toBe(false);
      });

      it('maintance condition button should be disable', function() {
        expect(settingsBusinessRulesPage.getMaintanceConditionBtn().isEnabled()).toBe(false);
      });
    });

    describe('when status radio chose', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(element(by.css("label:nth-child(4).k-radio-label"))));
        element(by.css("label:nth-child(4).k-radio-label")).click();
        browser.wait(testUtils.until.presenceOf(element(by.css('input:nth-child(3).ng-not-empty'))));
      });

      it('status radio should be chosen', function() {
        expect(element(by.css('input:nth-child(3).ng-not-empty')).isPresent()).toBe(true);
      });

      it('speed condition button should be disable', function() {
        expect(settingsBusinessRulesPage.getSpeedConditionBtn().isEnabled()).toBe(false);
      });

      it('geozone condition button should not be disable', function() {
        expect(settingsBusinessRulesPage.getGeozoneConditionBtn().isEnabled()).toBe(true);
      });

      it('time condition button should not be disable', function() {
        expect(settingsBusinessRulesPage.getTimeConditionBtn().isEnabled()).toBe(true);
      });

      it('temperature condition button should not be disable', function() {
        expect(settingsBusinessRulesPage.getTemperatureConditionBtn().isEnabled()).toBe(true);
      });

      it('status condition button should be disable after chose', function() {
        expect(settingsBusinessRulesPage.getStatusConditionBtn().isEnabled()).toBe(false);
      });

      it('maintance condition button should be disable', function() {
        expect(settingsBusinessRulesPage.getMaintanceConditionBtn().isEnabled()).toBe(false);
      });
    });
  });
})();
