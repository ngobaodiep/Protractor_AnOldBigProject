/*
    TimeBookingsSitesPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var testUtils = require('./TestUtils');
  var TimeBookingsSitesPage = function() {
    var sites_time_booking_view = element(by.css('.settings-timebooking .sites-list')),
      sites_time_booking_button = element(by.css('.settings-timebooking .tabs li:nth-child(4) > a')),
      time_booking_button = element(by.css('.settings-view a.button span.fi-timer.iconic-md')),
      active_tab = element(by.css('.tabs-panel.is-active')),
      wrap_selected_textbox = active_tab.element(by.css('.grid-x.grid-padding-x.grid-action .small-6 div.k-multiselect-wrap.k-floatwrap')),
      category_cancel_button = element(by.css('button.site-action-button.cancel')),
      category_save_button = element(by.css('button.site-action-button[ng-click="saveSites()"]')),
      create_new_site_btn = element(by.css('.sites-list a.grid-add-button.add-site[ng-click="createSite()"]')),
      drop_list = element(by.css('ul[aria-hidden="false"]')),

      geozone_form_modal = element(by.css('.geozone-form-modal')),
      site_name_input = element(by.css('input[ng-model="place.name"]')),
      site_reference_input = element(by.css('input[ng-model="place.reference"]')),
      site_category_button = element(by.css('.geozone-form-modal .k-widget.k-dropdown .k-dropdown-wrap .k-input')),
      site_radius_input = element(by.css('input[k-ng-model="place.radius"]')),
      site_address_input = element(by.css('input[ng-model="place.address"]')),
      site_description_input = element(by.css('textarea[ng-model="place.description"]')),
      site_contact_input = element(by.css('input[ng-model="place.contact"]')),
      site_phone_input = element(by.css('input[ng-model="element"]')),
      site_email_input = element(by.css('input[ng-model="place.email"]')),

      site_save_button = element(by.css('div.geozone-form-modal button.ok')),
      site_delete_button = element(by.css('button.desktop-action-button[ng-click="confirm()"]')),

      info_modal_ok_btn = element(by.css('.info-modal button.ok')),
      info_modal = element(by.css('.info-modal')),

      search_name_input = element(by.css('.sites-list .k-grid .k-grid-header .k-filter-row th:nth-of-type(2) input.k-textbox')),
      loading_mask = element(by.css('.k-loading-mask'));

    this.getSitesTimeBookingsView = function() {
      return sites_time_booking_view;
    };

    this.getSiteCategoryButton = function() {
      return site_category_button;
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getSearchNameInput = function() {
      return search_name_input;
    };

    this.getActiveTab = function() {
      return active_tab;
    };

    this.getSiteFormModal = function() {
      return geozone_form_modal;
    };

    this.getDropList = function() {
      return drop_list;
    };

    this.getTimeBookingsButton = function() {
      return time_booking_button;
    };

    this.getCreateNewSiteBtn = function() {
      return create_new_site_btn;
    };

    this.getSiteSaveBtn = function() {
      return site_save_button;
    };

    this.getSitesTimeBookingsButton = function() {
      return sites_time_booking_button;
    };

    this.getSelectedTextBox = function() {
      return wrap_selected_textbox;
    };

    this.getContentGridRow = function(n) {
      return element(by.css('.sites-list div.k-grid div.k-grid-content tr:nth-of-type(' + n + ')'));
    };

    this.getCategoryOffsetIndex = function(n) {
      return element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + n + '"]'));
    };

    this.getCategoryCancelButton = function() {
      return category_cancel_button;
    };

    this.getCategorySaveButton = function() {
      return category_save_button;
    };

    this.getSelectedCategoryList = function() {
      return this.getActiveTab().all(by.css('.grid-x.grid-padding-x.grid-action .k-multiselect-wrap.k-floatwrap ul li'));
    };

    this.getInfoModal = function() {
      return info_modal;
    };

    this.getInfoModalOKButton = function() {
      return info_modal_ok_btn;
    };

    this.clickInfoModalOKBtn = function() {
      browser.executeScript("arguments[0].click();", info_modal_ok_btn.getWebElement());
    };

    this.clickCreateNewSiteBtn = function() {
      browser.executeScript("arguments[0].click();", create_new_site_btn.getWebElement());
    };

    this.clickSelectedTextBox = function() {
      browser.executeScript("arguments[0].click();", wrap_selected_textbox.getWebElement());
    };

    this.clickSitesTimeBookingsButton = function() {
      browser.executeScript("arguments[0].click();", sites_time_booking_button.getWebElement());
    };

    this.clickTimeBookingsButton = function() {
      browser.executeScript("arguments[0].click();", time_booking_button.getWebElement());
    };

    this.clickSiteSaveBtn = function() {
      browser.executeScript("arguments[0].click();", site_save_button.getWebElement());
    };

    this.clickSiteDeleteBtn = function() {
      browser.executeScript("arguments[0].click();", site_delete_button.getWebElement());
    };

    this.clickSiteNameInput = function() {
      browser.executeScript("arguments[0].click();", site_name_input.getWebElement());
    };

    this.clickSiteReferenceInput = function() {
      browser.executeScript("arguments[0].click();", site_reference_input.getWebElement());
    };

    this.clickSiteRadiusInput = function() {
      browser.executeScript("arguments[0].click();", site_radius_input.getWebElement());
    };

    this.clickSiteAddressInput = function() {
      browser.executeScript("arguments[0].click();", site_address_input.getWebElement());
    };

    this.clickSiteDescriptionInput = function() {
      browser.executeScript("arguments[0].click();", site_description_input.getWebElement());
    };

    this.clickSiteContactInput = function() {
      browser.executeScript("arguments[0].click();", site_contact_input.getWebElement());
    };

    this.clickSitePhoneInput = function() {
      browser.executeScript("arguments[0].click();", site_phone_input.getWebElement());
    };

    this.clickSiteEmailInput = function() {
      browser.executeScript("arguments[0].click();", site_email_input.getWebElement());
    };

    this.clickSiteCategorySaveBtn = function() {
      // browser.executeScript("arguments[0].click();", category_save_button.getWebElement());
      category_save_button.click();
    };

    this.SelectGeozoneCategories = function(n) {
      wrap_selected_textbox.click();
      browser.wait(testUtils.until.presenceOf(this.getDropList()));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + n + '"]')).getWebElement());
      this.clickSiteCategorySaveBtn();
      browser.wait(testUtils.until.presenceOf(this.getInfoModal()));
      this.clickInfoModalOKBtn();
      browser.wait(testUtils.until.stalenessOf(this.getInfoModal()));
    };

    this.fillSiteAddressInput = function(string) {
      this.clickSiteAddressInput();
      site_address_input.clear().sendKeys(string);
    };

    this.fillSiteNameInput = function(string) {
      this.clickSiteNameInput();
      site_name_input.clear().sendKeys(string);
    };

    this.fillSiteReferenceInput = function(string) {
      this.clickSiteReferenceInput();
      site_reference_input.clear().sendKeys(string);
    };

    this.fillSearchNameInput = function(string) {
      browser.executeScript("arguments[0].click();", search_name_input.getWebElement());
      search_name_input.sendKeys(string);
    };

    this.fillSiteDescriptionInput = function(string) {
      this.clickSiteDescriptionInput();
      site_description_input.clear().sendKeys(string);
    };

    this.fillSiteContactInput = function(string) {
      this.clickSiteContactInput();
      site_contact_input.clear().sendKeys(string);
    };

    this.fillSitePhoneInput = function(string) {
      this.clickSitePhoneInput();
      site_phone_input.clear().sendKeys(string);
    };

    this.fillSiteEmailInput = function(string) {
      this.clickSiteEmailInput();
      site_email_input.clear().sendKeys(string);
    };

    this.createSite = function(random_number) {
      this.clickCreateNewSiteBtn();
      browser.wait(testUtils.until.presenceOf(this.getSiteFormModal()));
      this.fillSiteNameInput('site ' + random_number);
      this.fillSiteReferenceInput('reference site');
      this.fillSiteAddressInput('15 Rue Ampère, 69660 Collonges-au-Mont-d\'Or, FR');
      site_description_input.click();
      browser.wait(testUtils.until.presenceOf(element(by.css('.geozone-radius[aria-valuenow="150"]'))));
      this.fillSiteDescriptionInput('created new site');
      this.fillSiteContactInput('int-test-automated');
      this.fillSitePhoneInput('084904736459');
      this.fillSiteEmailInput('annt@bitnemo.vn');
    };
  };
  module.exports = new TimeBookingsSitesPage();
})();
