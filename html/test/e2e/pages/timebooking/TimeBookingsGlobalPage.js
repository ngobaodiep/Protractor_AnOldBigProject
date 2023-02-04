/*
    TimeBookingsGlobalPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/

(function() {
  "use strict";
  var testUtils = require("./TestUtils");
  var TimeBookingsGlobalPage = function() {
    var global_time_booking_view = element(by.css(".settings-timebooking .global-setting")),
      timebooking_actived_tab = element(by.css(".settings-timebooking .tabs-panel.is-active")),
      tasks_switcher = timebooking_actived_tab.element(by.css('label.switch-paddle[for="useOfTasks"]')),
      customers_switcher = timebooking_actived_tab.element(by.css('label.switch-paddle[for="useOfCustomers"]')),
      sites_switcher = timebooking_actived_tab.element(by.css('label.switch-paddle[for="useOfSites"]')),
      geocoding_switcher = timebooking_actived_tab.element(by.css('label.switch-paddle[for="geocodingActive"]')),
      entries_switcher = timebooking_actived_tab.element(by.css('label.switch-paddle[for="authorizeManualEntries"]')),
      create_site_switcher = timebooking_actived_tab.element(by.css('label.switch-paddle[for="createSite"]')),
      sites_tab = element(by.css('.settings-timebooking ul li.tabs-title[heading="Sites"] a')),
      save_button = element(by.css('button[ng-click="save()"]')),
      reset_button = element(by.css("button.desktop-secondary-action-button.cancel")),
      teamModeSwitcher = element(by.css('label[for="teamMode"]')),
      teamModeInput = element(by.id("teamMode")),
      imgTeamModeApp = element(by.css(".imgTeamModeApp")),
      projectsTab = element(by.css(".tabs li:nth-child(3) a")),
      teamsTab = element(by.css(".tabs li:nth-child(4) a")),
      info_modal = element(by.css(".info-modal")),
      ok_button = element(by.css(".info-modal .button.ok"));

    this.getActivitiesSwitcher = function() {
      return tasks_switcher;
    };

    this.getProjectsTab = function() {
      return projectsTab;
    };

    this.getTeamsTab = function() {
      return teamsTab;
    };

    this.getImgTeamModeApp = function() {
      return imgTeamModeApp;
    };

    this.getTeamModeInput = function() {
      return teamModeInput;
    };

    this.getTeamModeSwitcher = function() {
      return teamModeSwitcher;
    };

    this.getTimebookingActivedTab = function() {
      return timebooking_actived_tab;
    };

    this.getGlobalResetBtn = function() {
      return reset_button;
    };

    this.getClientsSwitcher = function() {
      return customers_switcher;
    };

    this.getSitesSwitcher = function() {
      return sites_switcher;
    };

    this.getSitesTab = function() {
      return sites_tab;
    };

    this.getGeocodingSwitcher = function() {
      return geocoding_switcher;
    };

    this.getEntriesSwitcher = function() {
      return entries_switcher;
    };

    this.getCreateSiteSwitcher = function() {
      return create_site_switcher;
    };

    this.getActivitiesSwitcherActive = function() {
      return element(by.css('.settings-timebooking .tabs-content input[id="useOfTasks"].ng-not-empty'));
    };

    this.getClientsSwitcherActive = function() {
      return element(by.css('.settings-timebooking .tabs-content input[id="useOfCustomers"].ng-not-empty'));
    };

    this.getSitesSwitcherActive = function() {
      return element(by.css('.settings-timebooking .tabs-content input[id="useOfSites"].ng-not-empty'));
    };

    this.getGeocodingSwitcherActive = function() {
      return element(by.css('.settings-timebooking .tabs-content input[id="geocodingActive"].ng-not-empty'));
    };

    this.getEntrieswitcherActive = function() {
      return element(by.css('.settings-timebooking .tabs-content input[id="authorizeManualEntries"].ng-not-empty'));
    };

    this.getCreateSiteActive = function() {
      return element(by.css('.settings-timebooking .tabs-content input[id="createSite"].ng-not-empty'));
    };

    this.getActivitiesSwitcherDeactive = function() {
      return element(by.css('.settings-timebooking .tabs-content input[id="useOfTasks"].ng-empty'));
    };

    this.getClientsSwitcherDeactive = function() {
      return element(by.css('.settings-timebooking .tabs-content input[id="useOfCustomers"].ng-empty'));
    };

    this.getSitesSwitcherDeactive = function() {
      return element(by.css('.settings-timebooking .tabs-content input[id="useOfSites"].ng-empty'));
    };

    this.getGeocodingSwitcherDeactive = function() {
      return element(by.css('.settings-timebooking .tabs-content input[id="geocodingActive"].ng-empty'));
    };

    this.getEntriesSwitcherDeactive = function() {
      return element(by.css('.settings-timebooking .tabs-content input[id="authorizeManualEntries"].ng-empty'));
    };

    this.getCreateSiteSwitcherDeactive = function() {
      return element(by.css('.settings-timebooking .tabs-content input[id="createSite"].ng-empty'));
    };

    this.getInfoModal = function() {
      return info_modal;
    };

    this.getGlobalTimeBookingsView = function() {
      return global_time_booking_view;
    };

    this.clickTasksSwitcher = function() {
      browser.executeScript(
        "arguments[0].click();",
        tasks_switcher.getWebElement()
      );
    };

    this.clickCustomersSwitcher = function() {
      browser.executeScript(
        "arguments[0].click();",
        customers_switcher.getWebElement()
      );
    };

    this.clickGlobalResetBtn = function() {
      browser.wait(testUtils.until.elementToBeClickable(reset_button));
      reset_button.click();
    };

    this.clickSitesSwitcher = function() {
      browser.executeScript(
        "arguments[0].click();",
        sites_switcher.getWebElement()
      );
    };

    this.clickGeocodingSwitcher = function() {
      browser.executeScript(
        "arguments[0].click();",
        geocoding_switcher.getWebElement()
      );
    };

    this.clickEntriesSwitcher = function() {
      browser.executeScript(
        "arguments[0].click();",
        entries_switcher.getWebElement()
      );
    };

    this.clickCreateSiteSwitcher = function() {
      browser.executeScript(
        "arguments[0].click();",
        create_site_switcher.getWebElement()
      );
    };

    this.clickSaveButton = function() {
      browser.wait(testUtils.until.elementToBeClickable(save_button));
      browser.executeScript(
        "arguments[0].click();",
        save_button.getWebElement()
      );
    };

    this.clickOkButton = function() {
      browser.wait(testUtils.until.elementToBeClickable(ok_button));
      browser.executeScript("arguments[0].click();", ok_button.getWebElement());
    };
  };
  module.exports = new TimeBookingsGlobalPage();
})();
