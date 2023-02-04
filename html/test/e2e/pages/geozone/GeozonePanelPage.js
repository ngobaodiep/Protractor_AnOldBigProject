/*
    GeozonePanelPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/

(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    geozoneCategoryPage = require('./GeozoneCategoryPage');

  var GeozonePanelPage = function() {
    var geozones_panel = element(by.css('.tracking-view .geozones-panel')),
      geozone_grid = element(by.css('.geozones-panel .k-grid')),
      geozone_last_page_button = geozone_grid.element(by.css('.k-grid-pager a[aria-label="Go to the last page"]')),
      geozone_next_page_button = element(by.css('.geozones-panel .k-grid .k-grid-pager .k-pager-nav:not(.k-state-disabled):nth-of-type(3)')),
      geozone_tooltip = element(by.css('.map-element-tooltip-header > div > div[ng-if="elementType === \'geozone\'"] > div:nth-of-type(1) > span:nth-of-type(1).ng-binding')),
      geozone_list = element.all(by.css('.geozones-panel div.k-grid .k-grid-content table tbody[role="rowgroup"] tr[role="row"]')),
      geozone_listrow = element(by.css('.geozones-panel div.k-grid .k-grid-content table tbody[role="rowgroup"]')),
      geozoneTooltip = element(by.css(".map .map-element-tooltip.map-element-geozone")),
      tool_tip_geozone_name = element(by.css('div[ng-if="elementType === \'geozone\'"] > div:nth-of-type(1) > span:nth-of-type(1).ng-binding')),
      tool_tip_geozone_category = element(by.css('div[ng-if="elementType === \'geozone\'"] > div:nth-of-type(2) > small > span.ng-binding')),
      tool_tip_button_route_from = element(by.css('.map-element-tooltip-button a[tooltip="Routing from"]')),
      tool_tip_button_route_to = element(by.css('.map-element-tooltip-button a[tooltip="Routing to"]')),
      tool_tip_button_near_access = element(by.css('.map-element-tooltip-button a[tooltip="Near assets"]')),
      tool_tip_button_history = element(by.css('.map-element-tooltip-button a[tooltip="History"]')),
      tool_tip_button_last7days = element(by.css('.map-element-tooltip-button span.fi-document')),
      tool_tip_title = geozoneTooltip.element(by.css('.map-element-tooltip-header .tooltip-title')),
      tool_tip_reference = geozoneTooltip.element(by.css('.map-element-info .tooltip-icons div:nth-child(2).ng-binding')),
      tooltipCloseBtn = element(by.css("[ng-click=\"closeTooltip()\"]")),

      create_geozone_button = element(by.css('a[ng-click="createPlace()"]')),
      geozone_form = element(by.css('.geozone-form.ng-scope form[name="geozoneCreationForm"]')),
      name_input = element(by.css('input[ng-model="place.name"]')),
      reference_input = element(by.css('input[ng-model="place.reference"]')),
      category_dropdown_button = geozone_form.element(by.css('.k-widget.k-dropdown .k-dropdown-wrap .k-input')),
      geozone_category_name = geozone_form.element(by.css('div.small-12.columns:nth-child(5) div.geozone-category-list-element div.medium-11.ng-binding')),
      geozone_category_color = geozone_form.element(by.css('div.small-12.columns:nth-child(5) div.geozone-category-list-element div.medium-1.columns span')),
      formatted_input_radius = geozone_form.element(by.css('input.k-formatted-value.geozone-radius.k-input')),
      edit_input_radius = geozone_form.element(by.css('input.geozone-radius:not(.k-formatted-value)')),
      address_input = element(by.css('input[ng-model="place.address"]')),
      description_input = element(by.css('textarea[ng-model="place.description"]')),
      contact_input = element(by.css('input[ng-model="place.contact"]')),
      phone_input = element(by.css('input[ng-model="element"]')),
      email_input = element(by.css('input[ng-model="place.email"]')),
      save_button = element(by.css('button.ok[ng-click="save(geozoneCreationForm)"]')),
      cancel_button = element(by.css('button.cancel[ng-click="cancel()"]')),
      search_name_input = element(by.css('.geozones-panel .k-grid .k-grid-header .k-filter-row input.k-textbox')),
      search_cross_button = element(by.css('.geozones-panel .k-grid .k-grid-header .k-filter-row button.k-button span.k-i-close ')),
      warn_delete_modal = element(by.css('.warn-modal.delete-confirmation-modal')),
      warn_delete_button = warn_delete_modal.element(by.css('button.desktop-action-button')),
      hideGeozonesPanelBtn = element(by.css("#geozones-close-panel .icon-arrow-left3")),
      openGeozonesPanelBtn = element(by.css('a[ng-click="toggleGeozonesPanel(true)"] .icon-arrow-right3')),
      regionGeozoneSwitch = geozone_form.element(by.css('label[for="regionGeozone"]')),
      geozoneRadiusLabel = element(by.css("#geozone-radius .geozone-form-label"));

    this.getGeozonesPanel = function() {
      return geozones_panel;
    };

    this.getReferenceGeozoneToolTip = function() {
      return tool_tip_reference;
    };

    this.getTooltipCloseBtn = function() {
      return tooltipCloseBtn;
    };

    this.getRegionGeozoneSwitch = function() {
      return regionGeozoneSwitch;
    };

    this.getOpenGeozonesPanelBtn = function() {
      return openGeozonesPanelBtn;
    };

    this.getHideGeozonesPanelBtn = function() {
      return hideGeozonesPanelBtn;
    };

    this.getGeozoneListRow = function(n) {
      return element(by.css('.geozones-panel .k-grid .k-grid-content tr:nth-child(' + n + ')'));
    };

    this.getGeozoneGridCell = function() {
      return this.getGeozoneListRow(1).element(by.css('td[role="gridcell"] .place-info'));
    };

    this.clickSeeGeozoneListRow = function(n) {
      browser.executeScript("arguments[0].click();", this.getGeozoneListRow(n).element(by.css('.fi-eye-open.showGeozone')).getWebElement());
    };

    this.GetSeeButtonOnList = function() {
      return this.getGeozoneListRow(1).element(by.css('.fi-eye-open.showGeozone'));
    };

    this.GetEditButtonOnList = function() {
      return this.getGeozoneListRow(1).element(by.css('.fi-pencil.editPlace'));
    };

    this.GetDeleteButtonOnList = function() {
      return this.getGeozoneListRow(1).element(by.css('.fi-trash.deletePlace'));
    };

    this.GetShowReportButtonOnList = function() {
      return this.getGeozoneListRow(1).element(by.css('.fi-document.showReport'));
    };

    this.GetShowHistoryButtonOnList = function() {
      return this.getGeozoneListRow(1).element(by.css('.fi-history.showHistory'));
    };

    this.getGeozoneNameOnList = function() {
      return this.getGeozoneListRow(1).element(by.css('.place-info .place-info-name'));
    };

    this.getGeozoneCategoryOnList = function() {
      return this.getGeozoneListRow(1).element(by.css('.place-info div:nth-child(2).place-info-category-name'));
    };

    this.getReferenceGeozoneOnList = function(n) {
      return this.getGeozoneListRow(n).element(by.css('td:nth-child(1) div:nth-child(4)'));
    };

    this.getGeozoneGrid = function() {
      return geozone_grid;
    };

    this.getGeozoneNamePopup = function() {
      return tool_tip_geozone_name;
    };

    this.getGeozoneCategoryPopup = function() {
      return tool_tip_geozone_category;
    };

    this.getButtonRouteFromPopup = function() {
      return tool_tip_button_route_from;
    };

    this.getButtonRouteToPopup = function() {
      return tool_tip_button_route_to;
    };

    this.getButtonNearAccessPopup = function() {
      return tool_tip_button_near_access;
    };

    this.getButtonHistoryPopup = function() {
      return tool_tip_button_history;
    };

    this.getButtonLast7DaysPopup = function() {
      return tool_tip_button_last7days;
    };

    this.getGeozonePanel = function() {
      return geozones_panel;
    };

    this.getTooltipTittle = function() {
      return tool_tip_title;
    };

    this.getGeozoneTooltip = function() {
      return geozone_tooltip;
    };

    this.getGeozoneList = function() {
      return geozone_list;
    };

    this.getGeozoneForm = function() {
      return geozone_form;
    };

    this.getCreateGeozoneButton = function() {
      return create_geozone_button;
    };

    this.getCategoryDropdownButton = function() {
      return category_dropdown_button;
    };

    this.getGeozoneCategoryName = function() {
      return geozone_category_name;
    };

    this.getGeozoneCategoryColor = function() {
      return geozone_category_color;
    };

    this.getFormattedInputRadius = function() {
      return formatted_input_radius;
    };

    this.getEditInputRadius = function() {
      return edit_input_radius;
    };

    this.getSaveButton = function() {
      return save_button;
    };

    this.getGeozonesNextPageButton = function() {
      return geozone_next_page_button;
    };

    this.getCreateCategoryButton = function() {
      return category_create_button;
    };

    this.getNameCategory = function() {
      return geozone_form.element(by.css('.k-widget.k-dropdown .k-dropdown-wrap .geozone-category-list-element div.medium-11.ng-binding'));
    };

    this.getSearchNameInput = function() {
      return search_name_input;
    };

    this.getClearSearchButton = function() {
      return search_cross_button;
    };

    this.getGeozoneTooltipOnMap = function() {
      return geozoneTooltip;
    };

    this.getEditButtonOfGridRow = function(n) {
      return geozone_grid.element(by.css('.k-grid-content tbody[role="rowgroup"] tr:nth-child(' + n + ') td:nth-child(2) a.fi-pencil.editPlace'));
    };

    this.getGridRow = function(n) {
      return geozone_grid.element(by.css('.k-grid-content tbody[role="rowgroup"] tr:nth-child(' + n + ')'));
    };

    this.getNameGeozoneGridRow = function(n) {
      return geozone_grid.element(by.css('.k-grid-content tbody[role="rowgroup"] tr:nth-child(' + n + ') td:nth-child(1) .place-info-name'));
    };

    this.getCateroryGeozoneGridRow = function(n) {
      return geozone_grid.element(by.css('.k-grid-content tbody[role="rowgroup"] tr:nth-child(' + n + ') td:nth-child(1) div:nth-child(2).place-info-category-name'));
    };

    this.getWarnDeleteModal = function() {
      return warn_delete_modal;
    };

    this.getGeozoneLastPageBtn = function() {
      return geozone_last_page_button;
    };

    this.clickGeozoneLastPageBtn = function() {
      browser.executeScript("arguments[0].click();", geozone_last_page_button.getWebElement());
    };

    this.clickWarnDeleteButton = function() {
      browser.wait(testUtils.until.elementToBeClickable(warn_delete_button));
      browser.executeScript("arguments[0].click();", warn_delete_button.getWebElement());
    };

    this.clickCategoryDropdownButton = function() {
      browser.executeScript("arguments[0].click();", category_dropdown_button.getWebElement());
    };

    this.clickClearSearchButton = function() {
      browser.executeScript("arguments[0].click();", search_cross_button.getWebElement());
    };

    this.clickSearchNameInput = function() {
      browser.executeScript("arguments[0].click();", search_name_input.getWebElement());
    };

    this.clickSaveButton = function() {
      browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };

    this.clickRegionGeozoneSwitch = function() {
      browser.wait(testUtils.until.elementToBeClickable(this.getRegionGeozoneSwitch()));
      this.getRegionGeozoneSwitch().click();
    };

    this.clickCancelButton = function() {
      browser.executeScript("arguments[0].click();", cancel_button.getWebElement());
    };

    this.clickEditGeozoneButton = function() {
      browser.wait(testUtils.until.elementToBeClickable(this.GetEditButtonOnList()));
      browser.executeScript("arguments[0].click();", this.getGeozoneListRow(1).element(by.css('.fi-pencil.editPlace')).getWebElement());
    };

    this.clickGeozonesNextPageButton = function() {
      browser.executeScript("arguments[0].click();", geozone_next_page_button.getWebElement());
    };

    this.clickDeleteButtonOfGridRow = function() {
      browser.wait(testUtils.until.elementToBeClickable(this.getGeozoneListRow(1).element(by.css('a.fi-trash.deletePlace'))));
      browser.executeScript("arguments[0].click();", this.getGeozoneListRow(1).element(by.css('.fi-pencil')).getWebElement());
    };

    this.fillSearchNameInput = function(name) {
      browser.executeScript("arguments[0].click();", search_name_input.getWebElement());
      search_name_input.clear().sendKeys(name);
    };

    this.fillName = function(name) {
      browser.executeScript("arguments[0].click();", name_input.getWebElement());
      name_input.clear().sendKeys(name);
    };

    this.fillAddress = function(address) {
      browser.executeScript("arguments[0].click();", address_input.getWebElement());
      address_input.clear().sendKeys(address);
    };

    this.fillReference = function(reference) {
      browser.executeScript("arguments[0].click();", reference_input.getWebElement());
      reference_input.clear().sendKeys(reference);
    };

    this.fillDescription = function(description) {
      browser.executeScript("arguments[0].click();", description_input.getWebElement());
      description_input.clear().sendKeys(description);
    };

    this.fillContact = function(contact) {
      browser.executeScript("arguments[0].click();", contact_input.getWebElement());
      contact_input.clear().sendKeys(contact);
    };

    this.fillPhone = function(phone) {
      browser.executeScript("arguments[0].click();", phone_input.getWebElement());
      phone_input.clear().sendKeys(phone);
    };

    this.fillEmail = function(email) {
      browser.executeScript("arguments[0].click();", email_input.getWebElement());
      email_input.clear().sendKeys(email);
    };

    this.clickFormattedInputRadius = function() {
      browser.executeScript("arguments[0].click();", formatted_input_radius.getWebElement());
    };

    this.clickEditInputRadius = function() {
      browser.executeScript("arguments[0].click();", edit_input_radius.getWebElement());
    };

    this.clickCreateGeozoneButton = function() {
      browser.executeScript("arguments[0].click();", create_geozone_button.getWebElement());
    };

    this.chooseGeozoneCategory = function() {
      browser.wait(testUtils.until.elementToBeClickable(category_dropdown_button));
      this.clickCategoryDropdownButton();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"]  li[data-offset-index="0"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"]  li[data-offset-index="0"]')).getWebElement());
      browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"]  li[data-offset-index="0"]'))));
    };

    this.createGeozone = function(random_number, circleAddress) {
      browser.wait(testUtils.until.visibilityOf(this.getGeozoneForm()));
      this.fillName("geozone " + random_number);
      browser.wait(testUtils.until.elementToBeClickable(category_dropdown_button));
      this.clickCategoryDropdownButton();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"]  li[data-offset-index="0"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"]  li[data-offset-index="0"]')).getWebElement());
      this.fillAddress(circleAddress);
      browser.wait(testUtils.until.elementToBeClickable(reference_input));
      reference_input.click();
      // browser.waitForAngularEnabled(false);
      // browser.wait(testUtils.until.presenceOf(geozone_form.element(by.css('div:nth-child(6).small-12 div:nth-child(2) div.small-10.columns input.geozone-radius.k-formatted-value[aria-valuenow="150"]'))));
      browser.wait(testUtils.until.presenceOf(element(by.css('input:nth-child(2).geozone-radius[aria-valuenow="150"]'))));
      this.fillReference("reference " + random_number);
      this.fillDescription('description ' + random_number);
      this.fillContact('contact int-test-automated');
      this.fillPhone('0123456788');
      this.fillEmail('test@bitnemo.vn');
      browser.wait(testUtils.until.elementToBeClickable(this.getSaveButton()));
      this.clickSaveButton();
    };

    this.editGeozone = function(random_number) {
      browser.wait(testUtils.until.presenceOf(this.getGeozoneForm()));
      this.fillName('edited geozone ' + random_number);
      this.fillReference("edited reference " + random_number);
      this.fillDescription('edited description ' + random_number);
      browser.wait(testUtils.until.elementToBeClickable(this.getSaveButton()));
      this.clickSaveButton();
    };

    this.createRegionGeozone = function(address, random) {
      browser.wait(testUtils.until.presenceOf(this.getGeozoneForm()));
      browser.wait(testUtils.until.presenceOf(this.getRegionGeozoneSwitch()));
      this.clickRegionGeozoneSwitch();
      this.fillAddress(address);
      this.clickFormattedInputRadius();
      name_input.click();
      name_input.sendKeys("RegionGeozone" + random);
      reference_input.click();
      reference_input.sendKeys("region" + random);
      browser.wait(function() {
        return formatted_input_radius.getAttribute("value").then(function(val) {
          return val == 150;
        });
      });
      this.chooseGeozoneCategory();
      this.fillDescription("region geozone " + random);
      this.fillEmail("toihd@bitnemo.vn");
      browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };

    this.editRegionGeozone = function(address, random) {
      browser.wait(testUtils.until.visibilityOf(this.getGeozoneForm()));
      browser.wait(testUtils.until.presenceOf(this.getRegionGeozoneSwitch()));
      this.fillAddress(address);
      this.clickFormattedInputRadius();
      name_input.click();
      name_input.clear().sendKeys("EditRegionGeozone" + random);
      this.fillDescription("edited region geozone" + random);
      browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };
  };
  module.exports = new GeozonePanelPage();
})();
