(function() {
  'use strict';

  var ScheduleWocValidationReportPage = function() {
    var wocReport = element(by.css(".woc-report")),
      radioCustom = element(by.css('label[for="timeframe-custom"]')),
      timeFromInput = element(by.css('input[k-ng-model="controls.startDate"]')),
      timeToInput = element(by.css('input[k-ng-model="controls.endDate"]')),
      workerSelectorsWrap = element(by.css("#wocSelectWorkers .k-multiselect-wrap")),

      dropdownList = element.all(by.css('ul[aria-hidden="false"] li')),
      showButton = element(by.css('button[ng-click="getReport()"]')),
      reportLoader = element(by.css('.lf-loader-overlay.report-loader')),
      reportRendingTemplate = element(by.css(".report-rendering-row .report-rendering-template")),
      expandAllButton = element(by.css("a#wocExpandAll")),

      allTripRow = element.all(by.css(".report-day-row .report-all-record:not(.ng-hide) .report-trip-row")),
      viewByActivityButton = element(by.css('a[ng-click="setPointOfView(\'task\')"]')),
      viewByCustomerButton = element(by.css('a[ng-click="setPointOfView(\'customer\')"]')),
      viewBySiteButton = element(by.css("#wocViewBySite")),
      pageSelectorInputWrap = element(by.css('#wocPageSelector .k-input')),

      filterTitle = element(by.css(".filter-title")),
      showHideFilterPanelButton = element(by.css("[ng-click=\"toggleControlPanel()\"]")),
      chooseTimeTitle = element(by.css(".choose-time-title")),
      radioThisWeek = element(by.css('[for="timeframe-thisweek"]')),
      radioThisMonth = element(by.css('[for="timeframe-thismonth"]')),

      radioLastWeek = element(by.css('[for="timeframe-lastweek"]')),
      radioLastMonth = element(by.css('[for="timeframe-lastmonth"]')),
      fromTimeTitle = element(by.css("#wocTimeFrame div:nth-child(3) label")),
      toTimeTitle = element(by.css("#wocTimeFrame div:nth-child(4) label")),
      showOnlyValidatedEvents = element(by.css('[for="showOnlyValidated"]')),

      selectGroupTitle = element(by.css('#WoC-control-panel > div:nth-child(5) > div > label')),
      selectWorkersTitle = element(by.css("#wocSelectWorkers > label")),
      selectWorkerWrap = element(by.css('#wocSelectWorkers .k-multiselect-wrap')),
      selectActivityTitle = element(by.css('#wocSelectTasksCustomerSite > div:nth-child(1) > label')),
      selectActivityWrap = element(by.css('#wocSelectTasksCustomerSite > div:nth-child(1) > label > div')),

      selectCustomerTitle = element(by.css('#wocSelectTasksCustomerSite > div:nth-child(2) > label')),
      selectCustomerWrap = element(by.css("#wocSelectTasksCustomerSite > div:nth-child(2) > label > div > div")),
      selectSitesTitle = element(by.css('#wocSelectTasksCustomerSite > div:nth-child(3) > label')),
      selectSitesWrap = element(by.css("#wocSelectTasksCustomerSite > div:nth-child(3) > label > div > div")),
      resetButton = element(by.css('button[ng-click="reset()"]')),

      wocReportHeader = element(by.css(".woc-report-header ")),
      wocReportHeaderTitle = wocReportHeader.element(by.css('.title')),
      optionsButton = element(by.css('[ng-click="toogleOptions()"]')),
      createEntryButton = element(by.css('[ng-click="createTimeRecord()"]')),
      initMessage = element(by.css('.initial-message > div')),

      switcherGroupsWorkers = element(by.css('#select-group')),
      switcherGroupsActive = element(by.css('#select-group.ng-empty')),
      switcherWorkersActive = element(by.css('#select-group.ng-not-empty')),
      groupsSelectorsClearBtn = element(by.css("#wocSelectWorkers .k-clear-value")),
      createModal = element(by.css(".woc-create-modal .create-modal")),

      createModalTitle = element(by.css(".woc-modal-title")),
      createModalForm = element(by.css(".create-modal-form")),
      cmWorkerSelectorWrap = createModalForm.element(by.css("div:nth-child(1).medium-6 .k-dropdown-wrap")),
      cmSiteSelectorWrap = createModalForm.element(by.css("div:nth-child(2).medium-6 .k-dropdown-wrap")),
      cmStartTime = createModalForm.element(by.css("div:nth-child(3).medium-6 input")),

      cmEndTime = createModalForm.element(by.css("div:nth-child(4).medium-6 input")),
      cmActivitySelectorWrap = createModalForm.element(by.css("div:nth-child(5).medium-6 .k-dropdown-wrap")),
      cmCustomerSelectorWrap = createModalForm.element(by.css("div:nth-child(6).medium-6 .k-dropdown-wrap")),
      cmValidateSwitcher = createModalForm.element(by.css("label[for=\"isValidated\"]")),
      btnCancel = element(by.css('button[ng-click="cancel()"]')),

      btnSave = element(by.css('button[ng-click="save(creationForm)"]')),
      allReportTotalDay = element.all(by.css(".report-total-day")),
      exportPdf = element(by.css(".dropdown-content:not(.ng-hide) a:nth-child(1)")),
      exportExcel = element(by.css(".dropdown-content:not(.ng-hide) a:nth-child(2)")),
      exportDomus = element(by.css(".dropdown-content:not(.ng-hide) a:nth-child(3)"))

      ;

    this.getWocReport = function() {
      return wocReport;
    };

    this.getExportDomus = function(){
      return exportDomus;
    };

    this.getExportExcel = function(){
      return exportExcel;
    };

    this.getExportPdf = function(){
      return exportPdf;
    };

    this.getAllReportTotalDay = function(){
      return allReportTotalDay;
    };

    this.getGroupsSelectorsClearBtn = function(){
      return groupsSelectorsClearBtn;
    };

    this.getSwitcherGroupsActive = function(){
      return switcherGroupsActive;
    };

    this.getSwitcherWorkersActive = function(){
      return switcherWorkersActive;
    };

    this.getSaveBtn = function(){
      return btnSave;
    };

    this.getCancelBtn = function(){
      return btnCancel;
    };

    this.getCmValidateSwitcher = function(){
      return cmValidateSwitcher;
    };

    this.getCmCustomerSelectorWrap = function(){
      return cmCustomerSelectorWrap;
    };

    this.getCmActivitySelectorWrap = function(){
      return cmActivitySelectorWrap;
    };

    this.getCmEndTime = function(){
      return cmEndTime;
    };

    this.getCmStartTime = function(){
      return cmStartTime;
    };

    this.getCmSiteSelectorWrap = function(){
      return cmSiteSelectorWrap;
    };

    this.getCmWorkerSelectorWrap = function(){
      return cmWorkerSelectorWrap;
    };

    this.getCreateModal = function(){
      return createModal;
    };

    this.getCreateModalTitle = function(){
      return createModalTitle;
    };

    this.getCreateModalForm = function(){
      return createModalForm;
    };

    this.getInitMessage = function() {
      return initMessage;
    };

    this.getCreateEntryButton = function() {
      return createEntryButton;
    };

    this.getOptionsButton = function() {
      return optionsButton;
    };

    this.getWocReportHeaderTitle = function() {
      return wocReportHeaderTitle;
    };

    this.getResetButton = function() {
      return resetButton;
    };

    this.getSelectSitesTitle = function() {
      return selectSitesTitle;
    };

    this.getSelectSitesWrap = function() {
      return selectSitesWrap;
    };

    this.getSelectCustomersWrap = function() {
      return selectCustomerWrap;
    };

    this.getSelectCustomersTitle = function() {
      return selectCustomerTitle;
    };

    this.getSelectActivitiesTitle = function() {
      return selectActivityTitle;
    };

    this.getSelectActivitiesWrap = function() {
      return selectActivityWrap;
    };

    this.getSelectWorkersTitle = function() {
      return selectWorkersTitle;
    };

    this.getSelectWorkerWrap = function() {
      return selectWorkerWrap;
    };

    this.getSelectGroupsTitle = function() {
      return selectGroupTitle;
    };

    this.getShowOnlyValidatedEvents = function() {
      return showOnlyValidatedEvents;
    };

    this.getFromTimeLabel = function() {
      return fromTimeTitle;
    };

    this.getToTimeLabel = function() {
      return toTimeTitle;
    };

    this.getRadioLastWeek = function() {
      return radioLastWeek;
    };

    this.getRadioLastMonth = function() {
      return radioLastMonth;
    };

    this.getRadioThisMonth = function() {
      return radioThisMonth;
    };

    this.getRadioThisWeek = function() {
      return radioThisWeek;
    };

    this.getChooseTimeTitle = function() {
      return chooseTimeTitle;
    };

    this.getShowHidePanelButton = function() {
      return showHideFilterPanelButton;
    };

    this.getFilterTitle = function() {
      return filterTitle;
    };

    this.getViewBySiteButton = function() {
      return viewBySiteButton;
    };

    this.getPageSelectorInputWrap = function() {
      return pageSelectorInputWrap;
    };

    this.getViewByCustomerButton = function() {
      return viewByCustomerButton;
    };

    this.getViewByActivityButton = function() {
      return viewByActivityButton;
    };

    this.getAllTripRows = function() {
      return allTripRow;
    };

    this.getExpandAllButton = function() {
      return expandAllButton;
    };

    this.getReportRendingTemplate = function() {
      return reportRendingTemplate;
    };

    this.getReportLoader = function() {
      return reportLoader;
    };

    this.getShowButton = function() {
      return showButton;
    };

    this.getDropdownList = function() {
      return dropdownList;
    };

    this.getWorkerSelectorsWrap = function() {
      return workerSelectorsWrap;
    };

    this.getSwitcherGroupsWorkers = function() {
      return switcherGroupsWorkers;
    };

    this.getTimeFromInput = function() {
      return timeFromInput;
    };

    this.getTimeToInput = function() {
      return timeToInput;
    };

    this.getRadioCustom = function() {
      return radioCustom;
    };
  };

  module.exports = new ScheduleWocValidationReportPage();
})();
