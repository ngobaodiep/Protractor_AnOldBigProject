/*
    MainMapPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var testUtils = require('./TestUtils');
  var AMSReleaseNoteViewPage = function() {
    var create_release_note_btn = element(by.css('h2>a.fi-plus-thin.iconic-sm')),
      creation_form = element(by.css('.create-modal form[name="releaseNoteCreationForm"]')),
      release_note_name_input = element(by.css('input[ng-model="releaseNote.name"]')),
      release_note_version_input = element(by.css('input[ng-model="releaseNote.versionNumber"]')),
      preview_note_name_version = element(by.css('.release-note-container .note-container div:nth-of-type(1) span.name')),
      preview_iframe = element(by.css('.release-note-container .note-container div:nth-of-type(2) div.small-12.message')),
      preview_button = element(by.css('button[ng-click="previewReleaseNote()"]')),
      like_button = element(by.css('span.icon-thumbs-up3:not(.disLike)')),
      dislike_button = element(by.css('span.icon-thumbs-down3.disLike')),
      ok_button = element(by.css('button[ng-click="ok()"]')),
      loading_mask = element(by.css('.loading-mask')),
      warn_modal = element(by.css('.warn-modal.delete-confirmation-modal')),
      search_name_input = element(by.css('.k-filter-row th:nth-of-type(1) input[class="k-textbox"]')),
      search_version_input = element(by.css('.k-filter-row th:nth-of-type(2) input[class="k-textbox"]')),
      cancel_preview_btn = element(by.css('div.create-modal button.desktop-action-button.ams-button[ng-click="close()"]')),
      save_button = element(by.css('div.create-modal button.desktop-action-button.ams-button[ng-click="save(releaseNoteCreationForm)"]')),
      create_modal = element(by.css('div.create-modal'));

    var driver = browser.driver;

    this.getCreateReleaseNoteBtn = function() {
      return create_release_note_btn;
    };

    this.getCreationForm = function() {
      return creation_form;
    };

    this.getLikeBtn = function() {
      return like_button;
    };

    this.getDislikeBtn = function() {
      return dislike_button;
    };

    this.getOkBtn = function() {
      return ok_button;
    };

    this.getPreviewBtn = function() {
      return preview_button;
    };

    this.getSaveBtn = function() {
      return save_button;
    };

    this.getWarnModal = function() {
      return warn_modal;
    };

    this.getPreviewIframe = function() {
      return preview_iframe;
    };

    this.getPreviewNameVersion = function() {
      return preview_note_name_version;
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getCreateModal = function() {
      return create_modal;
    };

    this.getSearchNameInput = function() {
      return search_name_input;
    };

    this.getSearchVersionInput = function() {
      return search_version_input;
    };

    this.getGridRow = function(n) {
      return element(by.css('.release-note-list .k-grid-content tr:nth-of-type(' + n + ')'));
    };

    this.clickCreateReleaseNoteBtn = function() {
      create_release_note_btn.click();
    };

    this.clickCloseSearchColumn = function(n) {
      browser.executeScript("arguments[0].click();", element(by.css('.release-note-list .k-grid-header .k-filter-row th:nth-of-type(' + n + ') button span.k-i-close')).getWebElement());
    };

    this.clickPreviewBtn = function() {
      browser.executeScript("arguments[0].click();", preview_button.getWebElement());
    };

    this.clickSaveBtn = function() {
      browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };

    this.clickWarnDeleteBtn = function() {
      browser.executeScript("arguments[0].click();", warn_modal.element(by.css('button.desktop-action-button')).getWebElement());
    };

    this.clickCancelPreviewBtn = function() {
      cancel_preview_btn.click();
    };

    this.fillReleaseNoteName = function(string) {
      release_note_name_input.click();
      release_note_name_input.clear().sendKeys(string);
    };

    this.fillReleaseNoteVersion = function(string) {
      release_note_version_input.click();
      release_note_version_input.clear().sendKeys(string);
    };

    this.fillIframeText = function(string) {
      browser.switchTo().frame(0);
      driver.findElement(by.tagName('body')).sendKeys(string);
      browser.switchTo().defaultContent();
    };

    this.fillIframeText = function(string) {
      browser.wait(testUtils.until.presenceOf(element(by.css('.tabs-panel.is-active iframe'))));
      browser.switchTo().frame(0);
      driver.findElement(by.tagName('body')).sendKeys(string);
      browser.switchTo().defaultContent();
    };

    this.fillSearchNameInput = function(string) {
      search_name_input.click();
      search_name_input.clear().sendKeys(string);
    };

    this.fillSearchVersionInput = function(string) {
      browser.executeScript("arguments[0].click();", search_version_input.getWebElement());
      search_version_input.clear().sendKeys(string);
    };
  };
  module.exports = new AMSReleaseNoteViewPage();
})();
