/*
    AMSMainPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var AMSMainPage = function() {
    var logout_button = element(by.className('fi-account-logout')),
      loading_mask = element(by.className('k-loading-mask')),
      accounts_view_tab = element(by.css('li.is-submenu-item span.fi-building')),
      devices_view_tab = element(by.css('li.is-submenu-item span.icon-ticket')),
      rfid_view_tab = element(by.css('li.is-submenu-item span.fi-tags')),
      lora_view_tab = element(by.css('li.is-submenu-item span.fi-audio-spectrum')),
      dallas_key_view_tab = element(by.css('li.is-submenu-item span.icon-steering-wheel')),
      system_messages_view_tab = element(by.css('li.is-submenu-item span.icon-bubble')),
      raw_history_view_tab = element(by.css('li.is-submenu-item span.icon-history')),
      release_note_view_tab = element(by.css('li.is-submenu-item span.icon-notebook')),
      login_carousel_view_tab = element(by.css('li.is-submenu-item span.icon-images')),
      problems_tab = element(by.css('li.is-submenu-item span.icon-notification')),
      packages_view_tab = element(by.css('li.is-submenu-item span.icon-package')),

      accounts_view = element(by.className('accounts-view')),
      devices_view = element(by.className('devices-view')),
      rfids_view = element(by.className('rfids-view')),
      loras_view = element(by.className('loras-view')),
      dallas_view = element(by.className('dallas-view')),
      system_messages_view = element(by.className('release-note-view')),
      raw_history_view = element(by.className('raw-history-view')),
      release_note_view = element(by.className('release-note-view')),
      login_carousel_view = element(by.className('login-carousel-view')),
      packages_view = element(by.className('packagings-view')),
      overlay_spinner = loading_mask.element(by.className("lf-spinner"));

    this.getLogoutButton = function() {
      return logout_button;
    };

    this.getOverlaySpinner = function(){
      return overlay_spinner;
    };

    this.getDevicesTab = function(){
      return devices_view_tab;
    };

    this.getAccountsTab = function(){
      return accounts_view_tab;
    };

    this.getProblemsTabButton = function(){
      return problems_tab;
    };

    this.getProblemsView = function(){
      return element(by.css('.problems-view'));
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.clickLogout = function() {
      logout_button.click();
    };

    this.getAccountsView = function() {
      return accounts_view;
    };

    this.getRawHistoryTab = function(){
      return raw_history_view_tab;
    };

    this.getDevicesView = function() {
      return devices_view;
    };

    this.getRfidsView = function() {
      return rfids_view;
    };

    this.getLorasView = function() {
      return loras_view;
    };

    this.getDallasView = function() {
      return dallas_view;
    };

    this.getSystemMessagesView = function() {
      return system_messages_view;
    };

    this.getRawHistoryView = function() {
      return raw_history_view;
    };

    this.getReleaseNoteView = function() {
      return release_note_view;
    };

    this.getLoginCarouselView = function() {
      return login_carousel_view;
    };

    this.getReleaseNoteViewTab = function() {
      return release_note_view_tab;
    };

    this.getPackagesView = function() {
      return packages_view;
    };

    this.getPackagesViewTab = function() {
      return packages_view_tab;
    };

    this.clickAccountsViewTab = function() {
      accounts_view_tab.click();
    };

    this.clickDevicesViewTab = function() {
      devices_view_tab.click();
    };

    this.clickRfidViewTab = function() {
      rfid_view_tab.click();
    };

    this.clickLoraViewTab = function() {
      lora_view_tab.click();
    };

    this.clickDalasKeyViewTab = function() {
      dallas_key_view_tab.click();
    };

    this.clickSystemMessagesViewTab = function() {
      system_messages_view_tab.click();
    };

    this.clickRawHistoryViewTab = function() {
      raw_history_view_tab.click();
    };

    this.clickReleaseNoteViewTab = function() {
      browser.executeScript("arguments[0].click();", release_note_view_tab.getWebElement());
    };

    this.clickLoginCarouselViewTab = function() {
      browser.executeScript("arguments[0].click();", login_carousel_view_tab.getWebElement());
    };

    this.clickPackagesViewTab = function() {
      browser.executeScript("arguments[0].click();", packages_view_tab.getWebElement());
    };
  };
  module.exports = new AMSMainPage();
})();
