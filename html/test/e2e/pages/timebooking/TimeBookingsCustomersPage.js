/*
    TimeBookingsCustomersPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    warnModal = require('./WarnModal');
  var TimeBookingsCustomersPage = function() {
    var customers_time_booking_view = element(by.css('.settings-timebooking div:nth-child(4).is-active .tasks-list')),
      customers_time_booking_button = element(by.css('.settings-timebooking ul.tabs li:nth-child(3) > a')),
      wocHeader = customers_time_booking_view.element(by.css(".woc-header")),
      headerTitle = wocHeader.element(by.css(".tab-content-title")),
      toogleOptionsButton = element(by.css('button[ng-click="toogleOptionsCustomers()"]')),

      downloadExcelTemplate = customers_time_booking_view.element(by.css(".dropdown-content:not(.ng-hide) a:nth-child(1)")),
      importButton = customers_time_booking_view.element(by.css('.dropdown-content:not(.ng-hide) .k-upload')),
      exportButton = customers_time_booking_view.element(by.css('.dropdown-content:not(.ng-hide) [ng-click="exportCustomer()"]')),
      gridHeader = customers_time_booking_view.element(by.css('.k-grid-header')),
      gridContent = customers_time_booking_view.element(by.css('.k-grid-content')),
      tableNameTitle = gridHeader.element(by.css('tr:nth-child(1) th:nth-child(1)')),

      tableReferenceTitle = gridHeader.element(by.css('tr:nth-child(1) th:nth-child(2)')),
      tableDescriptionTitle = gridHeader.element(by.css('tr:nth-child(1) th:nth-child(3)')),
      tableBillingAddressTitle = gridHeader.element(by.css('tr:nth-child(1) th:nth-child(4)')),
      tableNameSearchInput = gridHeader.element(by.css('tr:nth-child(2) th:nth-child(1) input.k-textbox')),
      tableReferenceSearchInput = gridHeader.element(by.css('tr:nth-child(2) th:nth-child(2) input.k-textbox')),

      tableDescriptionSearchInput = gridHeader.element(by.css('tr:nth-child(2) th:nth-child(3) input.k-textbox')),
      tableBillingAddressSearchInput = gridHeader.element(by.css('tr:nth-child(2) th:nth-child(4) input.k-textbox')),
      create_modal = element(by.css('.woc-report-create-modal')),
      importLoaderSpinner = customers_time_booking_view.element(by.css('.import-loader .icon-spinner9')),

      createModalTitle = create_modal.element(by.css('.create-modal-title .tab-content-title')),
      create_customer_button = customers_time_booking_view.element(by.css('button[ng-click="createCustomer()"]')),
      createModalReferenceTitle = create_modal.element(by.css('.customer-fields .no-padding:nth-child(1) div:nth-child(1) label')),
      createModalReferenceRequired = create_modal.element(by.css('.customer-fields .no-padding:nth-child(1) div:nth-child(1) span:nth-child(3)')),
      createModalNameTitle = create_modal.element(by.css('.customer-fields .no-padding:nth-child(1) div:nth-child(2) label')),

      createModalNameRequired = create_modal.element(by.css('.customer-fields .no-padding:nth-child(1) div:nth-child(2) span:nth-child(2)')),
      createModalDescriptionTitle = create_modal.element(by.css('.customer-fields .no-padding:nth-child(2) div:nth-child(1) label')),
      createModalBillingAddressTitle = create_modal.element(by.css('.customer-fields .no-padding:nth-child(2) div:nth-child(2) label')),
      reference = create_modal.element(by.css('input[ng-model="customer.reference"]')),
      name = create_modal.element(by.css('input[ng-model="customer.name"]')),

      description = create_modal.element(by.css('input[ng-model="customer.description"]')),
      billing_address = create_modal.element(by.css('input[ng-model="customer.billingAddress"]')),
      loading_mask = gridContent.element(by.css('.k-loading-mask')),
      save_button = element(by.css('button.desktop-action-button[ng-click="save(creationForm)"]')),
      cancel_button = element(by.css('button.desktop-secondary-action-button[ng-click="cancel()"]')),

      search_name_clear_btn = gridHeader.element(by.css('.k-filter-row th:nth-child(1) button.k-button')),
      search_reference_clear_btn = gridHeader.element(by.css('.k-filter-row th:nth-child(2) button.k-button'));

    this.getCustomersTimeBookingsView = function() {
      return customers_time_booking_view;
    };

    this.getSearchReferenceClearBtn = function() {
      return search_reference_clear_btn;
    };

    this.getGridContent = function() {
      return gridContent;
    };

    this.getImportLoaderSpinner = function() {
      return importLoaderSpinner;
    };

    this.getSearchNameClearBtn = function() {
      return search_name_clear_btn;
    };

    this.getCreateModalBillingAddressInput = function() {
      return billing_address;
    };

    this.getCreateModalDescriptionInput = function() {
      return description;
    };

    this.getCreateModalNameInput = function() {
      return name;
    };

    this.getCreateModalReferenceInput = function() {
      return reference;
    };

    this.getCreateModalReferenceTitle = function() {
      return createModalReferenceTitle;
    };

    this.getCreateModalReferenceRequired = function() {
      return createModalReferenceRequired;
    };

    this.getCreateModalNameTitle = function() {
      return createModalNameTitle;
    };

    this.getCreateModalNameRequired = function() {
      return createModalNameRequired;
    };

    this.getCreateModalDescriptionTitle = function() {
      return createModalDescriptionTitle;
    };

    this.getCreateModalBillingAddressTitle = function() {
      return createModalBillingAddressTitle;
    };

    this.getTableSearchDescriptionInput = function() {
      return tableDescriptionSearchInput;
    };

    this.getTableSearchBillingAddressInput = function() {
      return tableBillingAddressSearchInput;
    };

    this.getTableSearchReferenceInput = function() {
      return tableReferenceSearchInput;
    };

    this.getTableSearchNameInput = function() {
      return tableNameSearchInput;
    };

    this.getTableBillingAddressTitle = function() {
      return tableBillingAddressTitle;
    };

    this.getTableNameTitle = function() {
      return tableNameTitle;
    };

    this.getTableDescriptionTitle = function() {
      return tableDescriptionTitle;
    };

    this.getTableReferenceTitle = function() {
      return tableReferenceTitle;
    };

    this.getHeaderTitle = function() {
      return headerTitle;
    };

    this.getExportButton = function() {
      return exportButton;
    };

    this.getImportButton = function() {
      return importButton;
    };

    this.getDownloadExcelTemplate = function() {
      return downloadExcelTemplate;
    };

    this.getToogleOptionsButton = function() {
      return toogleOptionsButton;
    };

    this.clickCustomersTimeBookingsButton = function() {
      browser.executeScript("arguments[0].click();", customers_time_booking_button.getWebElement());
    };

    this.getCustomersTimeBookingsButton = function() {
      return customers_time_booking_button;
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getCreateModal = function() {
      return create_modal;
    };

    this.getSaveButton = function() {
      return save_button;
    };

    this.getCancelButton = function() {
      return cancel_button;
    };

    this.getCreateCustomerButton = function() {
      return create_customer_button;
    };

    this.getCustomerListRow = function(n) {
      return gridContent.element(by.css('tr:nth-child(' + n + ')'));
    };

    this.getGridRow = function(n) {
      return this.getCustomerListRow(n).element(by.css('td:nth-child(1)'));
    };

    this.getEditButtonOfGridRow = function(n) {
      return gridContent.element(by.css('tr:nth-child(' + n + ') td:nth-child(5) a.fi-pencil.editCustomer'));
    };

    this.getDeleteButtonOfGridRow = function(n) {
      return gridContent.element(by.css('tr:nth-child(' + n + ') td:nth-child(5) a.fi-trash.deleteCustomer'));
    };

    this.clickCreateCustomerButton = function(n) {
      browser.executeScript("arguments[0].click();", create_customer_button.getWebElement());
    };

    this.clickEditButtonOfGridRow = function(n) {
      browser.executeScript("arguments[0].click();", gridContent.element(by.css('tr:nth-child(' + n + ') td:nth-child(5) a.fi-pencil.editCustomer')).getWebElement());
    };

    this.clickDeleteButtonOfGridRow = function(n) {
      browser.executeScript("arguments[0].click();", gridContent.element(by.css('tr:nth-child(' + n + ') td:nth-child(5) a.fi-trash.deleteCustomer')).getWebElement());
    };

    this.clickNameInput = function() {
      browser.executeScript("arguments[0].click();", name.getWebElement());
    };

    this.clickReference = function() {
      browser.executeScript("arguments[0].click();", reference.getWebElement());
    };

    this.clickDescription = function() {
      browser.executeScript("arguments[0].click();", description.getWebElement());
    };

    this.clickBillingAddress = function() {
      browser.executeScript("arguments[0].click();", billing_address.getWebElement());
    };

    this.clickSaveButton = function() {
      browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };

    this.clickCancelButton = function() {
      browser.executeScript("arguments[0].click();", cancel_button.getWebElement());
    };

    this.fillNameInput = function(string) {
      this.clickNameInput();
      name.clear().sendKeys(string);
    };

    this.fillReferenceInput = function(string) {
      this.clickReference();
      reference.clear().sendKeys(string);
    };

    this.fillDesctiptionInput = function(string) {
      this.clickDescription();
      description.clear().sendKeys(string);
    };

    this.fillBillingAddressInput = function(string) {
      this.clickBillingAddress();
      billing_address.clear().sendKeys(string);
    };

    this.fillSearchNameInput = function(string) {
      tableNameSearchInput.click();
      tableNameSearchInput.clear().sendKeys(string);
    };

    this.createNewCustomer = function(random_number) {
      this.fillNameInput('customer' + random_number);
      this.fillReferenceInput('reference' + random_number);
      this.fillDesctiptionInput('description');
      this.fillBillingAddressInput('billing address');
      browser.wait(testUtils.until.elementToBeClickable(save_button));

      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(create_modal));
    };

    this.editCustomer = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.fillNameInput('editedCustomer' + random_number);
      this.fillReferenceInput('editedReference' + random_number);
      this.fillDesctiptionInput('editDescription');
      browser.wait(testUtils.until.elementToBeClickable(save_button));

      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(create_modal));
    };

  };
  module.exports = new TimeBookingsCustomersPage();
})();
