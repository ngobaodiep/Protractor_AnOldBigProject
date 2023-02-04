/*
    MainPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  "use strict";

  var testUtils = require("./TestUtils");
  var ReportListPage = function() {
    var report_list = element(by.className("reports-list")),
      machines_card = element(by.css('div.card[user-permissions="report.report.machine"]')),
      journeys_card = element(by.css("div.card[ng-click=\"selectReport('activity')\"] .card-divider")),
      geozone_card = element(by.css('div.card[user-permissions="report.report.timeInGeozone"]')),
      report_control_panel = element(by.className("report-control-panel")),
      last7dayRadio = element(by.css('label.k-radio-label[for="timeframe-last7"]')),
      customDayRadio = element(by.css('label.k-radio-label[for="timeframe-custom"]')),
      show_button = element(by.css('button[ng-click="getReport()"]')),
      loader_overlay_spinner = element(by.css(".lf-loader-overlay.report-loader .lf-spinner.icon-spinner9")),
      export_pdf_btn = element(by.css('a[ng-click="exportToPDF()"]')),
      export_excel_btn = element(by.css('a[ng-click="exportToXls()"]')),
      releaseNote_Ok_button = element(by.css(".release-note-container .button.desktop-action-button")),
      select_vehicle_wrap = element(by.css("#optionSelect div:nth-child(8) .k-multiselect-wrap")),
      report_rendering_row = element(by.className("report-rendering-row")),
      report_scrollable = report_rendering_row.element(by.className("report-scrollable")),
      report_week_row = report_scrollable.element(by.className("report-week-row")),
      report_day_row = report_week_row.element(by.className("report-day-row")),
      selected_total_day_row = report_day_row.element(by.css('.report-total-day[ng-click="selectDay(day.trips)"]')),
      // selected_total_day_row = element.all(by.css('.report-rendering-row .report-scrollable .report-day-row .report-total-day')).last(),
      // selected_total_day_row = element(by.css('.report-scrollable .report-day-row .report-total-day')),
      selected_day_row = element.all(by.css('div[ng-repeat="day in week.days"]')).last(),
      tripsOfDay = element.all(by.css('div[ng-repeat="trip in day.trips"]')),
      selectedMachinesRadio = element(by.css('label[for="machinesRadio"]')),
      selectedMachinesWrap = report_control_panel.element(by.css("div:nth-child(9) div.k-widget.k-header .k-multiselect-wrap")),
      expand_all_button = element(by.css('a[ng-click="expandAll()"]')),
      time_from_input = element(by.css('input[k-ng-model="controls.startDate"]')),
      timeFromTooltipBottom = report_control_panel.element(by.css("div:nth-child(3).medium-12 .tooltip.bottom")),
      timeFromHoursButton = report_control_panel.element(by.css("div:nth-child(3).medium-12 .k-link-time")),
      timeFromTitle = element(by.css("#reportTimeSelect div:nth-child(2).medium-12 label")),
      // last_friday_report = element(by.css('div[ng-repeat="trip in day.trips"]')),
      last_friday_report = tripsOfDay.last(),
      report_control_buttons = element(by.className("report-control-buttons")),
      report_name_selector = report_control_buttons.element(by.className("toolbar-select")),
      report_name_input = report_name_selector.element(by.css("span.k-input")),
      reportGeozones = element(by.css("div:nth-child(19).medium-12 label")),
      reportGeozonesSelector = reportGeozones.element(by.css(".k-multiselect-wrap")),
      toolbar_page_number = report_control_buttons.element(by.className("toolbar-page-number")),
      report_resource_name = report_control_buttons.element(by.css("div:nth-child(1).ng-binding")),
      button_container = report_control_buttons.element(by.className("button-container")),
      driver_point_view = element(by.css(".report-control-buttons .button-container a .icon-steering-wheel")),
      geozone_point_view = element(by.css(".report-control-buttons .button-container a .fi-map-marker")),
      time_to_input = element(by.css('input[k-ng-model="controls.endDate"]')),
      reportTotalWeek = element(by.className("report-total-week")),
      reportAllTripRows = element.all(by.css(".report-trip-row")),
      reportTimeLapseTotal = element(by.id("report-time-lapse-total")),
      reportTotalDurationSum = reportTimeLapseTotal.element(by.css(".medium-4 div:nth-child(2)")),
      reportTotalStopTime = reportTimeLapseTotal.element(by.css("div:nth-child(6) div")),
      reportTotalEngagement = reportTimeLapseTotal.element(by.css("div:nth-child(7) div")),
      reportTotalDistance = reportTimeLapseTotal.element(by.css("div:nth-child(4) div:nth-child(1) div:nth-child(6)")),
      reportTotalDuration = reportTimeLapseTotal.element(by.css("#report-time-lapse-total > div.columns.medium-4 > div:nth-child(2)")),
      dropdown = element(by.css('[aria-hidden="false"]')),
      vehicleSelector = element(by.css("#optionSelect > div:nth-child(8) .k-multiselect-wrap")),
      totalDayRowTripSum = selected_total_day_row.element(by.css("div:nth-child(3) div:nth-child(4)")),
      allReportTotalDayTrips = element.all(by.css(".report-total-day > div:nth-child(1) > div:nth-child(1)")),
      allReportTotalDistance = element.all(by.css(".report-total-week > div:nth-child(4) > div:nth-child(1)")),
      allReportTotalDuration = element.all(by.css(".report-total-week > div:nth-child(4) > div:nth-child(2)")),
      allReportTotalStopTime = element.all(by.css(".report-total-week div:nth-child(6) div")),
      allReportTotalEngagement = element.all(by.css(".report-total-week div:nth-child(7) div:nth-child(1)")),

      allReportTotalDistance2 = element.all(by.css(".report-total-week > div:nth-child(5)")),
      allReportTotalDurationWorking = element.all(by.css(".report-total-week > div:nth-child(7) div:nth-child(1)")),
      allReportTotalDurationStopped = element.all(by.css(".report-total-week > div:nth-child(7) div:nth-child(2)")),
      allReportTotalDurationContactOn = element.all(by.css(".report-total-week > div:nth-child(7) div:nth-child(3)")),
      allReportTotalDurationEngagement = element.all(by.css(".report-total-week > div:nth-child(7) div:nth-child(4)")),
      days,
      d,
      group_label = element(by.css('label[for="groupsRadio"]')),
      reportRendingTemplate = element(by.css(".report-rendering-template")),
      modifier;

    this.getReportList = function() {
      return report_list;
    };

    this.getTimeFromTitle = function () {
      return timeFromTitle;
    };

    this.getAllReportTotalDurationEngagement = function(){
      return allReportTotalDurationEngagement;
    };

    this.getAllReportTotalDurationContactOn = function(){
      return allReportTotalDurationContactOn;
    };

    this.getAllReportTotalDurationStopped = function(){
      return allReportTotalDurationStopped;
    };

    this.getAllReportTotalDurationWorking = function(){
      return allReportTotalDurationWorking;
    };

    this.getReportRendingTemplate = function(){
      return reportRendingTemplate;
    };

    this.getAllReportTotalStopTime = function() {
      return allReportTotalStopTime;
    };

    this.getAllReportTotalEngagement = function() {
      return allReportTotalEngagement;
    };

    this.getAllReportTotalDuration = function() {
      return allReportTotalDuration;
    };

    this.getAllReportTotalTrip = function() {
      return allReportTotalDayTrips;
    };

    this.getAllReportTotalDistance = function() {
      return allReportTotalDistance;
    };

    this.getAllReportTotalDistance2 = function() {
      return allReportTotalDistance2;
    };

    this.getReportTotalDuration = function() {
      return reportTotalDuration;
    };

    this.getTotalDayRowTripSum = function() {
      return totalDayRowTripSum;
    };

    this.getReportTotalDistance = function() {
      return reportTotalDistance;
    };

    this.getTotalDurationSum = function() {
      return reportTotalDurationSum;
    };

    this.getTotalEngagement = function() {
      return reportTotalEngagement;
    };

    this.getTotalStopTime = function() {
      return reportTotalStopTime;
    };

    this.getVehiclesSelectors = function() {
      return vehicleSelector;
    };

    this.getDropDown = function() {
      return dropdown;
    };

    this.getReportGeozones = function() {
      return reportGeozones;
    };

    this.getReportGeozonesSelector = function() {
      return reportGeozonesSelector;
    };

    this.getTimeFromHoursButton = function() {
      return timeFromHoursButton;
    };

    this.getTimeFromTooltipBottom = function() {
      return timeFromTooltipBottom;
    };

    this.getReportTimeLapseTotal = function() {
      return reportTimeLapseTotal;
    };

    this.getReportAllTripRows = function() {
      return reportAllTripRows;
    };

    this.getReportTotalWeek = function() {
      return reportTotalWeek;
    };

    this.getReportNameSelector = function() {
      return report_name_selector;
    };

    this.getGroupLabel = function() {
      return group_label;
    };

    this.getGeozoneCard = function() {
      return geozone_card;
    };

    this.getToolbarPageNumber = function() {
      return toolbar_page_number;
    };

    this.getReportResourceName = function() {
      return report_resource_name;
    };

    this.getReportNameInput = function() {
      return report_name_input;
    };

    this.getExpandAllButton = function() {
      return expand_all_button;
    };

    this.getLastFridayReport = function() {
      return last_friday_report;
    };

    this.getSelectedMachinesWrap = function() {
      return selectedMachinesWrap;
    };

    this.getSelectedMachinesRadio = function() {
      return selectedMachinesRadio;
    };

    this.getTripsOfDay = function() {
      return tripsOfDay;
    };

    this.getSelectedDayRow = function() {
      return selected_day_row;
    };

    this.getSelectedTotalDayRow = function() {
      return selected_total_day_row;
    };
    this.getVehiclesSelector = function() {
      return select_vehicle_wrap;
    };

    this.getCustomDayRadio = function() {
      return customDayRadio;
    };

    this.getTimeFromInput = function() {
      return time_from_input;
    };

    this.getTimeToInput = function() {
      return time_to_input;
    };

    this.getJourneysCard = function() {
      return journeys_card;
    };

    this.getExportExcelButton = function() {
      return export_excel_btn;
    };

    this.getExportPdfButton = function() {
      return export_pdf_btn;
    };

    this.getLoaderOverlaySpinner = function() {
      return loader_overlay_spinner;
    };

    this.getReportControlPanel = function() {
      return report_control_panel;
    };

    this.getLast7DayRadio = function() {
      return last7dayRadio;
    };

    this.getShowBtn = function() {
      return show_button;
    };

    this.getMachinesCard = function() {
      return machines_card;
    };

    this.clickGeozoneCard = function() {
      geozone_card.click();
    };

    this.getLastDayOccurence = function(date, day) {
      d = new Date(date.getTime());
      days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
      if (days.includes(day)) {
        modifier = (d.getDay() + days.length - days.indexOf(day)) % 7 || 7;
        d.setDate(d.getDate() - modifier);
      }
      return d;
    };

    this.clickCustomDayRadio = function() {
      // customDayRadio.click();
      browser.executeScript(
        "arguments[0].click();",
        customDayRadio.getWebElement()
      );
    };

    this.clickExpandAllButton = function() {
      browser.executeScript(
        "arguments[0].click();",
        expand_all_button.getWebElement()
      );
    };

    this.clickDriverPointView = function() {
      browser.executeScript(
        "arguments[0].click();",
        driver_point_view.getWebElement()
      );
    };

    this.clickGeozonePointView = function() {
      browser.executeScript(
        "arguments[0].click();",
        geozone_point_view.getWebElement()
      );
    };

    this.clickJourneysCard = function() {
      // journeys_card.click();
      browser.executeScript(
        "arguments[0].click();",
        journeys_card.getWebElement()
      );
    };

    this.clickSelectedMachinesRadio = function() {
      browser.executeScript(
        "arguments[0].click();",
        selectedMachinesRadio.getWebElement()
      );
    };

    this.clickGroupLabel = function() {
      browser.executeScript(
        "arguments[0].click();",
        group_label.getWebElement()
      );
    };

    this.clickSelectedMachinesWrap = function() {
      // browser.executeScript("arguments[0].click();", selectedMachinesWrap.getWebElement());
      selectedMachinesWrap.click();
    };

    this.clickTimeFromInput = function() {
      // time_from_input.click();
      browser.executeScript(
        "arguments[0].click();",
        time_from_input.getWebElement()
      );
    };

    this.clickTimeToInput = function() {
      time_to_input.click();
      // browser.executeScript("arguments[0].click();", time_to_input.getWebElement());
    };

    this.clickShowBtn = function() {
      show_button.click();
      // browser.executeScript("arguments[0].click();", show_button.getWebElement());
    };

    this.clickExportExcelBtn = function() {
      export_excel_btn.click();
    };

    this.clickExportPdfBtn = function() {
      export_pdf_btn.click();
    };

    this.clickMachinesCard = function() {
      machines_card.click();
    };

    this.clickLast7Day = function() {
      last7dayRadio.click();
    };

    this.chooseMachine2 = function() {
      browser.wait(
        testUtils.until.elementToBeClickable(
          report_name_selector.element(by.css(".k-dropdown-wrap"))
        )
      );
      report_name_selector.element(by.css(".k-dropdown-wrap")).click();
      browser.wait(
        testUtils.until.presenceOf(
          element(by.css('ul[aria-hidden="false"] li:nth-child(2)'))
        )
      );
      browser.executeScript(
        "arguments[0].click();",
        element(
          by.css('ul[aria-hidden="false"] li:nth-child(2)')
        ).getWebElement()
      );
    };

    this.chooseVehicle = function() {
      browser.wait(
        testUtils.until.elementToBeClickable(this.getVehiclesSelector())
      );
      this.getVehiclesSelector().click();
      browser.wait(
        testUtils.until.presenceOf(
          element(by.css('ul[aria-hidden="false"] li:nth-child(2)'))
        )
      );
      browser.executeScript(
        "arguments[0].click();",
        element(
          by.css('ul[aria-hidden="false"] li:nth-child(2)')
        ).getWebElement()
      );
    };

    this.fillFromInput = function(string) {
      browser.wait(testUtils.until.elementToBeClickable(time_from_input));
      time_from_input.click();
      time_from_input.sendKeys(protractor.Key.END);
      this.clearString(time_from_input);
      time_from_input.sendKeys(string);
    };

    this.fillToInput = function(string) {
      browser.wait(testUtils.until.elementToBeClickable(time_to_input));
      time_to_input.click();
      time_to_input.sendKeys(protractor.Key.END);
      this.clearString(time_to_input);
      time_to_input.sendKeys(string);
    };

    this.clearString = function(elem) {
      elem.getAttribute("value").then(function(text) {
        var len = text.length || 25;
        var backspaceSeries = Array(len + 1).join(protractor.Key.BACK_SPACE);
        elem.sendKeys(backspaceSeries);
      });
    };

    this.convertTimeStringToSeconds = function(string) {
      // aa:bb
      var time = string.split(":");
      return parseInt(time[0]) * 3600 + parseInt(time[1]) * 60;
    };

    this.convertTimeStringToSeconds2 = function(string) {
      // aa:bb:cc
      var time = string.split(":");
      return (
        parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2])
      );
    };

    this.convertSecondsToTime = function(number) {
      // aa:bb
      return (
        (parseInt(number / 3600) < 10 ?
          "0" + parseInt(number / 3600) :
          parseInt(number / 3600)) +
        ":" +
        (parseInt((number % 3600) / 60) < 10 ?
          "0" + parseInt((number % 3600) / 60) :
          parseInt((number % 3600) / 60))
      );
    };
  };
  module.exports = new ReportListPage();
})();
