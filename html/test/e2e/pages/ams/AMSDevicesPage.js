(function(){
  'use strict';

  var AMSDevicesPage = function(){
    var devices_view = element(by.css('.devices-view')),
    devices_list = devices_view.element(by.css('.devices-list')),
    devices_create_modal = element(by.css('.reveal-overlay div:nth-child(1).create-modal')),
    devices_creation_form = element(by.css('.reveal-overlay .create-modal form[name="deviceCreationForm"]')),
    linked_company = devices_creation_form.element(by.css('div.small-12:nth-child(1) .k-dropdown.k-header')),
    linked_company_filter = element(by.css('.k-animation-container .k-state-border-up span.k-list-filter input.k-textbox')),
    sim_input = element(by.css('input[ng-model="device.sim"]')),
    loading_mask = devices_list.element(by.css('.k-grid-content .k-loading-mask .k-loading-image')),
    save_button = devices_create_modal.element(by.css('button:nth-child(3).desktop-action-button')),
    imei_filter_clear_btn = devices_list.element(by.css('.k-grid-header table thead tr.k-filter-row th:nth-child(5)>span>span button.k-button-icon')),
    imei_filter = devices_list.element(by.css('.k-grid-header table thead tr.k-filter-row th:nth-child(5)>span>span>input'));

    this.getDevicesList = function(){
      return devices_list;
    };

    this.getDevicesCreateModal = function(){
      return devices_create_modal;
    };

    this.getImeiFilterClearBtn = function(){
      return imei_filter_clear_btn;
    };

    this.getSaveButton = function(){
      return save_button;
    };

    this.getLoadingMask = function(){
      return loading_mask;
    };

    this.getLinkedCompanyFilter = function(){
      return linked_company_filter;
    };

    this.getLinkedCompany = function(){
      return linked_company;
    };

    this.getDevicesCreationForm = function(){
      return devices_creation_form;
    };

    this.getImeiFilter = function(){
      return imei_filter;
    };

    this.getAllGridRow = function(){
      return devices_list.all(by.css('.k-grid .k-grid-content table tr.ng-scope'));
    };

    this.getGridRow = function(n){
      return devices_list.element(by.css('.k-grid .k-grid-content table tr.ng-scope:nth-child('+n+')'));
    };

    this.clickImeiFilter = function(){
      imei_filter.click();
    };

    this.clickImeiFilterClearBtn = function(){
      imei_filter_clear_btn.click();
    };

    this.clickLinkedCompany = function(){
      linked_company.click();
    };

    this.clickSimInput = function(){
      sim_input.click();
    };

    this.clickSaveButton = function(){
      save_button.click();
      // browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };

    this.clickLinkedCompanyFilter = function(){
      browser.executeScript("arguments[0].click();", linked_company_filter.getWebElement());
    };

    this.fillLinkedCompanyFilter = function(string){
      linked_company_filter.sendKeys(string);
    };

    this.fillImeiFilter = function(string){
      imei_filter.sendKeys(string);
    };
   };
  module.exports = new AMSDevicesPage();
})();
