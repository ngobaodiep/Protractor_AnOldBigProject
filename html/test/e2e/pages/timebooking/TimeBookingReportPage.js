/*
    TimeBookingReportPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/

(function() {
  'use strict';
  var testUtils = require('./TestUtils');
  var TimeBookingReportPage = function() {
    var report_title = element(by.css('#WoC-control-panel .report-title h3')),

      time_frame_thisweek = element(by.css('#wocTimeFrame div.medium-12:nth-of-type(1) label[for="timeframe-thisweek"]')),
      time_frame_lastweek = element(by.css('#wocTimeFrame div.medium-12:nth-of-type(1) label[for="timeframe-lastweek"]')),
      time_frame_thismonth = element(by.css('#wocTimeFrame div.medium-12:nth-of-type(1) label[for="timeframe-thismonth"]')),
      time_frame_lastmonth = element(by.css('#wocTimeFrame div.medium-12:nth-of-type(1) label[for="timeframe-lastmonth"]')),
      time_frame_custom = element(by.css('#wocTimeFrame div.medium-12:nth-of-type(1) label[for="timeframe-custom"]')),

      from_calendar = element(by.css('#wocTimeFrame div.medium-12:nth-of-type(2) .k-i-calendar')),
      from_time = element(by.css('#wocTimeFrame div.medium-12:nth-of-type(2) .k-i-clock')),
      to_calendar = element(by.css('#wocTimeFrame div.medium-12:nth-of-type(3) .k-i-calendar')),
      to_time = element(by.css('#wocTimeFrame div.medium-12:nth-of-type(3) .k-i-clock')),
      input_from = element(by.css('#wocTimeFrame div.medium-12:nth-of-type(2) input.k-input')),
      input_to = element(by.css('#wocTimeFrame div.medium-12:nth-of-type(3) input.k-input')),

      filter_workers = element(by.css('#wocSelectWorkers .k-multiselect-wrap')),
      label_workers = element(by.css('#wocSelectWorkers>label')),

      filter_tasks = element(by.css('#wocSelectTasksCustomerSite div.medium-12:nth-child(1) .k-multiselect-wrap')),
      label_tasks = element(by.css('#wocSelectTasksCustomerSite div.medium-12:nth-of-type(1)>label')),

      filter_customers = element(by.css('#wocSelectTasksCustomerSite div.medium-12:nth-child(2) .k-multiselect-wrap')),
      label_customers = element(by.css('#wocSelectTasksCustomerSite div.medium-12:nth-child(12)>label')),

      filter_sites = element(by.css('#wocSelectTasksCustomerSite div.medium-12:nth-child(3) .k-multiselect-wrap')),
      label_sites = element(by.css('#wocSelectTasksCustomerSite div.medium-12:nth-child(3)>label')),

      loader_overlay_spinner = element(by.css('.lf-loader-overlay.report-loader .icon-spinner9')),

      add_record_button = element(by.css('.reports-view .lf-toolbar .button-group:nth-child(1) .button.add-record[ng-click="createTimeRecord()"] span')),
      create_button = element(by.css('.reports-view .lf-toolbar .report-control-buttons:nth-child(2) .timebooking-report-buttons a.grid-add-button .fi-plus-thin')),
      show_deleted_button = element(by.css('#wocshowDeletedAndEditedRecord .icon-stack-cancel')),
      validate_all_button = element(by.css('#wocValidatedAll .icon-checkmark3')),

      view_by_worker = element(by.css('.button-group.report-control-buttons .button-container .fi-person-genderless')),
      view_by_customer = element(by.css('.button-group.report-control-buttons .button-container .icon-user-tie')),
      view_by_task = element(by.css('.button-group.report-control-buttons .button-container .icon-clipboard6')),
      view_by_site = element(by.css('.button-group.report-control-buttons .button-container .fi-map-marker')),
      expand_all_button = element(by.css('.button-group.report-control-buttons .button-container .fi-collapse-down')),
      collapase_all_button = element(by.css('.button-group.report-control-buttons .button-container .fi-expand-up')),
      get_excel = element(by.css('.button-group.report-control-buttons .button-container .fi-file-xls')),
      get_pdf = element(by.css('.button-group.report-control-buttons .button-container a:nth-child(2) .fi-file-pdf')),

      deleted_record_status = element(by.css('.report-scrollable .report-week-row:nth-child(1) .report-day-row:nth-child(20) .report-all-record:nth-child(2) .report-trip-row:nth-child(1) .timebooking-text-left.medium-2.ng-scope span')),
      edited_record_status = element(by.css('.report-scrollable .report-week-row:nth-child(1) .report-day-row:nth-child(20) .report-all-record:nth-child(2) .report-trip-row:nth-child(2) .medium-2.timebooking-text-left span')),
      hide_control_panel_button = element(by.css('.reports-view .toggle-report-control-panel-button .fi-chevron-left')),
      show_control_panel_button = element(by.css('.reports-view .toggle-report-control-panel-button .fi-chevron-right')),

      report_name = element(by.css('.reports-view .report-resource-name .timebooking-report-name')),
      name_input = element(by.css('#wocPageSelector .toolbar-select .k-dropdown-wrap .k-input')),
      name_input_wrapper = element(by.css('#wocPageSelector .toolbar-select .k-dropdown-wrap')),

      create_modal_form = element(by.css('.create-modal-form')),
      worker_selected = create_modal_form.element(by.css('.medium-6:nth-of-type(1) .k-widget.k-dropdown .k-dropdown-wrap .k-input')),
      task_selected = create_modal_form.element(by.css('.medium-6[ng-if="useTask"] .k-widget.k-dropdown .k-dropdown-wrap .k-input')),
      customer_selected = create_modal_form.element(by.css('.medium-6[ng-if="useCustomer"] .k-widget.k-dropdown .k-dropdown-wrap .k-input')),
      site_selected = create_modal_form.element(by.css('.medium-6[ng-if="useSite"] .k-widget.k-dropdown .k-dropdown-wrap .k-input')),
      comment = create_modal_form.element(by.css('.medium-6:nth-of-type(8) .text')),
      list_input = element(by.css('ul[aria-hidden="false"] li[data-offset-index="0"]')),
      end_time_hours = create_modal_form.element(by.css('div.medium-6:nth-child(4) span.k-i-clock')),

      show_button = element(by.css('timebooking-report-control-panel div.control-buttons .button.ok')),
      cancel_button = element(by.css('timebooking-report-control-panel div.control-buttons .button.cancel')),
      create_modal_cancel_btn = element(by.css('.create-modal .button.cancel')),
      save_button = element(by.css('.create-modal .desktop-action-button[ng-click="save(creationForm)"]')),
      delete_button = element(by.css('.report-trip-row div.medium-2 a.k-button-icontext .fi-trash')),
      edit_button = element(by.css('.report-trip-row div.medium-2 a.k-button-icontext .fi-pencil')),
      warning_conflict_modal = element(by.css('.error-modal .modal-buttons .button.ok')),
      warn_modal_delete_btn = element(by.css('.warn-modal .button.desktop-action-button'));

    this.getTimeFrameThisWeek = function() {
      return time_frame_thisweek;
    };

    this.getNameInputWrapper = function(){
      return name_input_wrapper;
    };

    this.getLoaderOverlaySpinner = function() {
      return loader_overlay_spinner;
    };

    this.clickTimeThisWeek = function() {
      browser.executeScript("arguments[0].click();", time_frame_thisweek.getWebElement());
    };

    this.getTimeFrameLastWeek = function() {
      return time_frame_lastweek;
    };

    this.getTimeFrameThisMonth = function() {
      return time_frame_thismonth;
    };

    this.getTimeFrameLastMonth = function() {
      return time_frame_lastmonth;
    };

    this.getTimeFrameCustom = function() {
      return time_frame_custom;
    };

    this.getReportDaySelected = function(n) {
      return element(by.css('.report-scrollable .report-week-row:nth-of-type(1) .report-day-row:nth-of-type(1) div:nth-child(1).report-all-record .report-trip-row:not(.ng-hide)'));
    };

    this.getMapWorkerPopup = function() {
      return element(by.css('.reveal-overlay lf-map div:nth-child(4) div:nth-child(2) .gm-style-iw-a .map-element-tooltip'));
    };

    this.getMapSitePopup = function() {
      return element(by.css('.reveal-overlay lf-map div:nth-child(4) div:nth-child(1) .gm-style-iw-a .map-element-tooltip'));
    };

    this.getWarnModalDeleteBtn = function() {
      return warn_modal_delete_btn;
    };

    this.clickWarnModalDeleteBtn = function() {
      browser.executeScript("arguments[0].click();", warn_modal_delete_btn.getWebElement());
    };

    this.clickTimeFrameCustom = function() {
      browser.executeScript("arguments[0].click();", time_frame_custom.getWebElement());
    };

    this.getCreateModalCancelBtn = function() {
      return create_modal_cancel_btn;
    };

    this.getFromCalendar = function() {
      return from_calendar;
    };

    this.getInputFrom = function() {
      return input_from;
    };

    this.clickInputFrom = function() {
      browser.executeScript("arguments[0].click();", input_from.getWebElement());
    };

    this.clickCreateModalCancelBtn = function() {
      browser.executeScript("arguments[0].click();", create_modal_cancel_btn.getWebElement());
      // create_modal_cancel_btn.click();
    };

    this.getFromTime = function() {
      return from_time;
    };

    this.getToCalendar = function() {
      return to_calendar;
    };

    this.getInputTo = function() {
      return input_to;
    };

    this.clickInputTo = function() {
      browser.executeScript("arguments[0].click();", input_to.getWebElement());
    };

    this.getToTime = function() {
      return to_time;
    };

    this.getReportTitle = function() {
      return report_title;
    };

    this.getWorkersFilter = function() {
      return filter_workers;
    };

    this.getTasksFilter = function() {
      return filter_tasks;
    };

    this.getCustomersFilter = function() {
      return filter_customers;
    };

    this.getSitesFilter = function() {
      return filter_sites;
    };

    this.getShowButton = function() {
      return show_button;
    };

    this.getAddRecordButton = function() {
      return add_record_button;
    };

    this.clickAddRecord = function() {
      browser.executeScript("arguments[0].click();", add_record_button.getWebElement());
    };

    this.clickShowButton = function() {
      // browser.executeScript("arguments[0].click();", show_button.getWebElement());
      show_button.click();
    };

    this.getCancelButton = function() {
      return cancel_button;
    };

    this.clickCancelButton = function() {
      browser.executeScript("arguments[0].click();", cancel_button.getWebElement());
    };

    this.getLabelWorkers = function() {
      return label_workers;
    };

    this.getLabelTasks = function() {
      return label_tasks;
    };

    this.getLabelCustomers = function() {
      return label_customers;
    };

    this.getLabelSites = function() {
      return label_sites;
    };

    this.getCreateButton = function() {
      return create_button;
    };

    this.clickCreateButton = function() {
      browser.executeScript("arguments[0].click();", create_button.getWebElement());
    };

    this.getShowDeletedButton = function() {
      return show_deleted_button;
    };

    this.clickShowDeletedButton = function() {
      browser.executeScript("arguments[0].click();", show_deleted_button.getWebElement());
    };

    this.getValidateAll = function() {
      return validate_all_button;
    };

    this.getViewByWorker = function() {
      return view_by_worker;
    };

    this.clickViewByWorker = function() {
      browser.executeScript("arguments[0].click();", view_by_worker.getWebElement());
    };

    this.getViewByCustomer = function() {
      return view_by_customer;
    };

    this.getViewByTask = function() {
      return view_by_task;
    };

    this.clickViewByCustomer = function() {
      browser.executeScript("arguments[0].click();", view_by_customer.getWebElement());
    };

    this.clickViewByTask = function() {
      browser.executeScript("arguments[0].click();", view_by_task.getWebElement());
    };

    this.getViewBySite = function() {
      return view_by_site;
    };

    this.clickViewBySite = function() {
      // browser.executeScript("arguments[0].click();", view_by_site.getWebElement());
      view_by_site.click();
    };

    this.clickEndTimeHoursBtn = function() {
      browser.executeScript("arguments[0].click();", end_time_hours.getWebElement());
    };

    this.getGetExcelButton = function() {
      return get_excel;
    };

    this.getGetPdfButton = function() {
      return get_pdf;
    };

    this.getExpandAllButton = function() {
      return expand_all_button;
    };

    this.clickExpandAllButton = function() {
      // browser.executeScript("arguments[0].click();", expand_all_button.getWebElement());
      expand_all_button.click();
    };

    this.getCollapadeAllButton = function() {
      return collapase_all_button;
    };

    this.getDeletedRecordStatus = function() {
      return deleted_record_status;
    };

    this.getEditedRecordStatus = function() {
      return edited_record_status;
    };

    this.getReportName = function() {
      return report_name;
    };

    this.getNameInput = function() {
      return name_input;
    };

    this.getHideControlPanelButton = function() {
      return hide_control_panel_button;
    };

    this.clickNameInput = function() {
      // browser.executeScript("arguments[0].click();", name_input.getWebElement());
      name_input_wrapper.click();
    };

    this.getCreateModal = function() {
      return create_modal_form;
    };

    this.clickHideControlPanelButton = function() {
      browser.executeScript("arguments[0].click();", hide_control_panel_button.getWebElement());
    };

    this.clickShowControlPanelButton = function() {
      browser.executeScript("arguments[0].click();", show_control_panel_button.getWebElement());
    };

    this.getSelectedWorker = function() {
      return worker_selected;
    };

    this.SelectedWorker = function(n) {
      browser.wait(testUtils.until.elementToBeClickable(worker_selected));
      browser.executeScript("arguments[0].click();", worker_selected.getWebElement());
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + n + '"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + n + '"]')).getWebElement());
    };

    this.getSelectedTask = function() {
      return task_selected;
    };

    this.SelectedTask = function(n) {
      browser.wait(testUtils.until.elementToBeClickable(task_selected));
      browser.executeScript("arguments[0].click();", task_selected.getWebElement());
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + n + '"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + n + '"]')).getWebElement());
    };

    this.getSelectedCustomer = function() {
      return customer_selected;
    };

    this.SelectedCustomer = function(n) {
      browser.executeScript("arguments[0].click();", customer_selected.getWebElement());
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + n + '"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + n + '"]')).getWebElement());
    };

    this.getSelectedSite = function() {
      return site_selected;
    };

    this.SelectedSite = function(n) {
      browser.executeScript("arguments[0].click();", site_selected.getWebElement());
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + n + '"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + n + '"]')).getWebElement());
    };

    this.SelectEndTimeHours = function(n) {
      this.clickEndTimeHoursBtn();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')')).getWebElement());
    };

    this.SelectNameInput = function(n) {
      this.clickNameInput();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + n + '"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + n + '"]')).getWebElement());
      browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"] li[data-offset-index="' + n + '"]'))));
    };

    this.getSaveButton = function() {
      return save_button;
    };

    this.clickSaveButton = function(n) {
      browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };

    this.getDeleteButton = function() {
      return delete_button;
    };

    this.getEditButton = function() {
      return edit_button;
    };

    this.clickDeleteButton = function(n) {
      browser.executeScript("arguments[0].click();", delete_button.getWebElement());
    };

    this.clickEditButton = function(n) {
      browser.executeScript("arguments[0].click();", edit_button.getWebElement());
    };

    this.getWarningModal = function() {
      return warning_conflict_modal;
    };

    this.clickOkWarningModal = function() {
      browser.executeScript("arguments[0].click();", warning_conflict_modal.getWebElement());
    };

    this.clearString = function(elem, length) {
      length = length || 25;
      var backspaceSeries = '';
      backspaceSeries = Array(length).join(protractor.Key.BACK_SPACE);
      elem.sendKeys(backspaceSeries);
    };
  };
  module.exports = new TimeBookingReportPage();
})();
