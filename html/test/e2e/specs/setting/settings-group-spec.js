(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    settingsGroupPage = require('./SettingsGroupPage'),
    warnModal = require('./WarnModal'),
    mainSettingsPage = require('./MainSettingsPage');

  describe('on settings group', function() {
    var random_number = parseInt(Math.random() * 10000);
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsGroupsButton()));
      mainSettingsPage.clickSettingGroupsButton();
      browser.wait(testUtils.waitUrl(/settings\/groups/));
      browser.wait(testUtils.until.presenceOf(settingsGroupPage.getCreateGroupButton()));
    });

    describe('check group tab elements', function() {

      it('should have create group button', function() {
        expect(settingsGroupPage.getCreateGroupButton().isPresent()).toBe(true);
      });

      it('should have edit group button', function() {
        expect(settingsGroupPage.getEditGroupButton().isPresent()).toBe(true);
      });

      it('should have delete group button', function() {
        expect(settingsGroupPage.getDeleteGroupButton().isPresent()).toBe(true);
      });
    });

    describe('when group created', function() {
      beforeAll(function() {
        settingsGroupPage.clickCreateGroupButton();
        settingsGroupPage.createNewGroup(random_number);
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('li[role="treeitem"] .k-in', 'Group' + random_number))));
        browser.wait(testUtils.until.visibilityOf(element(by.cssContainingText('li[role="treeitem"] .k-in', 'Group' + random_number))));
      });

      it('group should be found on group tree', function() {
        expect(element(by.cssContainingText('li[role="treeitem"] .k-in', 'Group' + random_number)).isDisplayed()).toBe(true);
      });
    });

    describe('when group edited', function() {
      beforeAll(function() {
        element(by.cssContainingText('li[role="treeitem"] .k-in', 'Group' + random_number)).click();
        settingsGroupPage.clickEditGroupButton();
        settingsGroupPage.editGroup(random_number);
        browser.wait(testUtils.until.visibilityOf(element(by.cssContainingText('li[role="treeitem"] .k-in', 'editedGroup' + random_number))));
      });
    
      it('new group should be found on group tree', function() {
        expect(element(by.cssContainingText('li[role="treeitem"] .k-in', 'editedGroup' + random_number)).isDisplayed()).toBe(true);
      });
    });

    describe('when group deleted', function() {
      beforeAll(function() {
        element(by.cssContainingText('li[role="treeitem"] .k-in', 'Group' + random_number)).click();
        settingsGroupPage.clickDeleteGroupButton();
        browser.wait(testUtils.until.presenceOf(warnModal.getWarnModal()));
        warnModal.clickWarnModalConfirmBtn();
        browser.wait(testUtils.until.stalenessOf(warnModal.getWarnModal()));
        browser.wait(testUtils.until.stalenessOf(element(by.cssContainingText('li[role="treeitem"] .k-in', 'editedGroup' + random_number))));
      });

      it('group should not be found on group tree ', function() {
        expect(element(by.cssContainingText('li[role="treeitem"] .k-in', 'editedGroup' + random_number)).isPresent()).toBe(false);
      });
    });
  });
})();
