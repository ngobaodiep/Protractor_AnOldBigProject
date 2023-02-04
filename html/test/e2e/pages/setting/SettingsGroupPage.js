/*
    SettingsGroupPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
  warnModal = require('./WarnModal'),
  infoModal = require('./InfoModal');
  var SettingsGroupPage = function() {

    var groups_list = element(by.css('.settings-view .panel .groups-list')),
      create_group_button = groups_list.element(by.className('fi-plus-thin')),
      edit_group_button = groups_list.element(by.css('[ng-click="editGroup()"]')),
      delete_group_button = groups_list.element(by.css('[ng-click="deleteGroup()"]')),

      create_modal = element(by.css('.reveal-overlay .reveal .create-modal')),
      createModalForm = create_modal.element(by.className('create-modal-form')),
      active_tab_content = create_modal.element(by.css('.tabs-content .tabs-panel.is-active')),

      group_name_input = active_tab_content.element(by.name('name')),
      group_description_input = active_tab_content.element(by.css('textarea[ng-model="group.description"]')),
      general_switcher = active_tab_content.element(by.css('.switch.small .switch-paddle ')),
      general_parent_group = active_tab_content.element(by.css('.row div:nth-of-type(4)  div.k-top.k-bot span.k-in')),
      general_child_groups = active_tab_content.element(by.css('.row div:nth-of-type(4) group-tree ul.k-treeview-lines .k-first.k-last ul.k-group li:nth-of-type(1) span.k-in')),

      save_button = create_modal.element(by.css('button[ng-click="save(groupCreationForm)"]'));

    this.getCreateGroupButton = function() {
      return create_group_button;
    };

    this.getGroupList = function(){
      return groups_list;
    };

    this.getEditGroupButton = function() {
      return edit_group_button;
    };

    this.getDeleteGroupButton = function() {
      return delete_group_button;
    };

    this.getSaveButton = function() {
      return save_button;
    };

    this.getChildGroupRow = function(n) {
      return child_group_list.get((n - 1));
    };

    this.clickEditGroupButton = function() {
      browser.executeScript("arguments[0].click();", edit_group_button.getWebElement());
    };

    this.clickDeleteGroupButton = function() {
      browser.executeScript("arguments[0].click();", delete_group_button.getWebElement());
    };

    this.clickLeftElement = function(n) {
      browser.executeScript("arguments[0].click();", left_list.get((n - 1)).getWebElement());
    };

    this.clickSaveButton = function() {
      browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };

    this.clickGroupName = function() {
      browser.executeScript("arguments[0].click();", group_name_input.getWebElement());
    };

    this.clickGroupDescription = function() {
      browser.executeScript("arguments[0].click();", group_description_input.getWebElement());
    };

    this.clickGeneralSubSwitcher = function() {
      browser.executeScript("arguments[0].click();", general_switcher.getWebElement());
    };

    this.clickCreateGroupButton = function() {
      browser.executeScript("arguments[0].click();", create_group_button.getWebElement());
    };

    this.clickGeneralParentGroup = function() {
      browser.executeScript("arguments[0].click();", general_parent_group.getWebElement());
    };

    this.fillGroupName = function(string) {
      this.clickGroupName();
      group_name_input.clear().sendKeys(string);
    };

    this.fillGroupDescription = function(string) {
      this.clickGroupDescription();
      group_description_input.clear().sendKeys(string);
    };

    this.createNewGroup = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.clickGeneralSubSwitcher();
      browser.wait(testUtils.until.presenceOf(general_parent_group));
      this.clickGeneralParentGroup();
      this.fillGroupName('Group' + random_number);
      this.fillGroupDescription('description' + random_number);
      browser.wait(testUtils.until.elementToBeClickable(save_button));
      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(create_modal));
      browser.wait(testUtils.until.presenceOf(infoModal.getInfoModal()));
      infoModal.clickInfoModalConfirmBtn();
      browser.wait(testUtils.until.stalenessOf(infoModal.getInfoModal()));
    };

    this.editGroup = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      group_name_input.clear();
      group_description_input.clear();
      this.fillGroupName('editedGroup' + random_number);
      this.fillGroupDescription('edited description' + random_number);
      browser.wait(testUtils.until.elementToBeClickable(save_button));
      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(create_modal));
      browser.wait(testUtils.until.presenceOf(infoModal.getInfoModal()));
      infoModal.clickInfoModalConfirmBtn();
      browser.wait(testUtils.until.stalenessOf(infoModal.getInfoModal()));
    };
  };
  module.exports = new SettingsGroupPage();
})();
