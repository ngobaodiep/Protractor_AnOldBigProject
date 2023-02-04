/*
    HistoryPanelPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function () {
  "use strict";

  var testUtils = require("./TestUtils");
  var HistoryPanelPage = function () {
    var history_panel = element(by.css(".tracking-view .history-panel")),
      historyTimeFrame = element(by.id("history-time-frame")),
      historyTimeLocationFrame = element(by.id("history-time-frame-location")),
      historyControlPanel = element(by.css(".history-control-panel")),
      historyByResource = historyControlPanel.element(by.css("li.tabs-title:nth-child(1)")),
      historyByLocation = historyControlPanel.element(by.css("li.tabs-title:nth-child(2)")),
      historyHideButton = history_panel.element(by.css('a[ng-click="toggleHistoryPanel(true)"] .icon-arrow-left3')),
      historyOpenButton = element(by.css('.history-panel-minisize a[ng-click="toggleHistoryPanel(true)"] .icon-arrow-right3')),
      locationTimeFromInput = historyTimeLocationFrame.element(by.css(".medium-12:nth-child(2) input")),
      locationTimeFromCalendar = historyTimeLocationFrame.element(by.css(".medium-12:nth-child(2) .k-i-calendar")),
      locationTimeFrom = historyTimeLocationFrame.element(by.css(".medium-12:nth-child(2) .k-i-clock")),
      locationTimeToInput = historyTimeLocationFrame.element(by.css(".medium-12:nth-child(3) input")),
      locationTimeToCalendar = historyTimeLocationFrame.element(by.css(".medium-12:nth-child(3) .k-i-calendar")),
      locationTimeTo = historyTimeLocationFrame.element(by.css(".medium-12:nth-child(3) .k-i-clock")),
      locationInput = element(by.css("#history-geozone input")),
      locationRadiusInput = element(by.css("#history-geozone-radius input")),
      locationAddressInput = element(by.model("controls.location.name")),



      time_frame_today = historyTimeFrame.element(
        by.css('label[for="timeframe-today-resource"]')
      ),
      time_frame_yesterday = historyTimeFrame.element(
        by.css('label[for="timeframe-yesterday-resource"]')
      ),
      time_frame_last7days = historyTimeFrame.element(
        by.css('label[for="timeframe-last7-resource"]')
      ),
      time_frame_custom = historyTimeFrame.element(
        by.css('label[for="timeframe-custom-resource"]')
      ),

      timeLocationToday = historyTimeLocationFrame.element(
        by.css('label[for="timeframe-today-location"]')
      ),
      timeLocationYesterday = historyTimeLocationFrame.element(
        by.css('label[for="timeframe-yesterday-location"]')
      ),
      timeLocationLast7day = historyTimeLocationFrame.element(
        by.css('label[for="timeframe-last7-location"]')
      ),
      timeLocationCustome = historyTimeLocationFrame.element(
        by.css('label[for="timeframe-custom-location"]')
      ),
      fromTimeFrame = historyTimeFrame.element(
        by.css(".medium-12:nth-child(2)")
      ),
      from_calendar = fromTimeFrame.element(by.css(".k-i-calendar")),
      from_time = fromTimeFrame.element(by.css(".k-i-clock")),
      fromTimeInput = fromTimeFrame.element(by.css("input")),
      toTimeFrame = historyTimeFrame.element(by.css(".medium-12:nth-child(3)")),
      to_calendar = toTimeFrame.element(by.css(".k-i-calendar")),
      to_time = toTimeFrame.element(by.css(".k-i-clock")),
      toTimeInput = toTimeFrame.element(by.css("input")),
      historyTrackingObjects = element(by.css("#history-tracking-objects")),
      tracking_object_dropdown = historyTrackingObjects.element(
        by.css(".k-dropdown .k-dropdown-wrap")
      ),
      historyDriverObjects = element(by.id("history-driver")),
      driver_dropdown = historyDriverObjects.element(
        by.css(".k-dropdown-wrap .k-input")
      ),
      dropdownSearchInput = element(by.css(".k-animation-container input")),
      loading_overlay = element(by.css(".history-panel .lf-loader-overlay.history-loader")),
      temperature = element(
        by.css(
          '.history-panel history-chart-accordion-wrapper ul.accordion li.history-panel-temperature a[ng-click="$ctrl.isOpen = !$ctrl.isOpen"]'
        )
      ),
      time_line = element(
        by.css(
          '.history-panel history-chart-accordion-wrapper ul.accordion li.history-panel-timeline a[ng-click="$ctrl.isOpen = !$ctrl.isOpen"]'
        )
      ),
      temperature_line = element(
        by.css(
          "ul.accordion li:nth-child(1) .accordion-content g:nth-child(3) > g:nth-child(5) > g > path"
        )
      ),
      statistics_tab = element(
        by.css(
          ".history-panel .history-stats-panel ul li.tabs-title:nth-child(2)"
        )
      ),
      activity_logs_tab = element(
        by.css(
          ".history-panel .history-stats-panel ul li.tabs-title:nth-child(3) a"
        )
      ),
      journeys_tab = element(
        by.css(
          ".history-panel .history-stats-panel ul li.tabs-title:nth-child(4)"
        )
      ),
      journeys_summary_info = element(
        by.css(
          ".history-journeys-tab .history-journeys-summary .history-journeys-info"
        )
      ),
      journeys_details_list = element.all(
        by.css('div[ng-repeat="journey in journeys"]')
      ),
      driving_column = element(
        by.css("div#history-barchart svg g g.g rect:nth-child(1)")
      ),
      stopped_column = element(
        by.css("div#history-barchart > svg > g  > g.g > rect:nth-of-type(2)")
      ),
      idle_column = element(
        by.css("div#history-barchart svg g g.g rect:nth-child(3)")
      ),
      driving_arc = element(
        by.css("div#history-piechart g.slices path:nth-child(1)")
      ),
      stopped_arc = element(
        by.css("div#history-piechart g.slices path:nth-child(2)")
      ),
      idle_arc = element(
        by.css("div#history-piechart g.slices path:nth-child(3)")
      ),
      text_arc = element
        .all(
          by.css(
            "div#history-piechart > svg > g:nth-child(1) > text.toolCircle"
          )
        )
        .get(0),
      text_column = element(by.css("div#history-barchart div.bar-tip")),
      driving_label = element(
        by.css("div#history-piechart g.label-name text:nth-child(1)")
      ),
      stopped_label = element(
        by.css("div#history-piechart g.label-name text:nth-child(2)")
      ),
      idle_label = element(
        by.css("div#history-piechart g.label-name text:nth-child(3)")
      ),
      history_active_tab = element(
        by.css(
          ".history-panel .history-stats-panel .tabs-content .tabs-panel.is-active"
        )
      ),
      history_map = history_active_tab.element(
        by.css("div.history-map lf-map.map")
      ),
      history_no_activity_label = element(
        by.css("div.medium-12.history-stats-panel-no-activity span")
      ),
      driving_time = history_active_tab.element(
        by.css("div.grid-x.grid-padding-x.grid-padding-y > div:nth-child(1)")
      ),
      stopped_time = history_active_tab.element(
        by.css(".grid-padding-y div.cell:nth-child(2)")
      ),
      idle_time = history_active_tab.element(
        by.css(".grid-padding-y div.cell:nth-child(3)")
      ),
      engagement_time = history_active_tab.element(
        by.css(".grid-padding-y div.cell:nth-child(4)")
      ),
      equipment_time = history_active_tab.element(
        by.css(".grid-padding-y div.cell:nth-child(5)")
      ),
      private_time = history_active_tab.element(
        by.css(".grid-padding-y div.cell:nth-child(6)")
      ),
      total_distance = history_active_tab.element(
        by.css(".grid-padding-y div.cell:nth-child(7)")
      ),
      total_business_distance = history_active_tab.element(
        by.css(".grid-padding-y div.cell:nth-child(8)")
      ),
      total_private_distance = history_active_tab.element(
        by.css(".grid-padding-y div.cell:nth-child(9)")
      ),
      number_of_trips = history_active_tab.element(
        by.css(".grid-padding-y div.cell:nth-child(10)")
      ),
      today = element(
        by.css(
          '.k-animation-container div[aria-hidden="false"] tr td.k-today a'
        )
      ),
      choose_day = element(
        by.css(
          '.k-animation-container div[aria-hidden="false"] tr td.k-state-selected.k-state-focused:not(.k-today) a'
        )
      ),
      custom_day = element(
        by.css(
          '.k-animation-container div[aria-hidden="false"] tr:nth-child(1) td:nth-child(1)'
        )
      ),
      reset_button = element(
        by.css(
          '.history-control-panel .tabbable .tabs-content .tabs-panel.is-active button[ng-click="resetControlPanel()"]'
        )
      ),
      show_button = element(
        by.css(
          '.history-control-panel .tabbable .tabs-content .tabs-panel.is-active button[ng-click="validateAndShow()"]'
        )
      ),
      reportTimeLapseTotal = history_active_tab.element(by.id("report-time-lapse-total")),
      reportTotalWeek = history_active_tab.element(by.id("report-total-week")),
      journeyDistanceTotal = reportTotalWeek.element(by.css("div:nth-child(4).medium-4 div:nth-child(1).medium-3")),
      journeyDurationTotal = reportTotalWeek.element(by.css("div:nth-child(4).medium-4 div:nth-child(2).medium-3")),
      journeyStopTotal = element(by.css("#report-total-week > div:nth-child(6) > div")),
      journeyEngagementTotal = reportTotalWeek.element(by.css("div:nth-child(7) div:nth-child(1)")),
      totalTripTitle = element(by.css(".report-total-day > div:nth-child(1) div:nth-child(1)"));

    this.getHistoryPanel = function () {
      return history_panel;
    };

    this.getTotalTripTitle = function(){
      return totalTripTitle;
    };

    this.getJourneyEngagementTotal = function(){
      return journeyEngagementTotal;
    };

    this.getJourneyStopTotal = function(){
      return journeyStopTotal;
    };

    this.getJourneyDurationTotal = function(){
      return journeyDurationTotal;
    };

    this.getJourneyDistanceTotal = function(){
      return journeyDistanceTotal;
    };

    this.getLocationAddressInput = function(){
      return locationAddressInput;
    };

    this.getHistoryOpenButton = function(){
      return historyOpenButton;
    };

    this.getDropdownSearchInput = function(){
      return dropdownSearchInput;
    };

    this.getLocationInput = function(){
      return locationInput;
    };

    this.getLocationRadiusInput = function(){
      return locationRadiusInput;
    };

    this.getHistoryLocationTimeFromInput = function(){
      return locationTimeFromInput;
    };

    this.getHistoryLocationTimeFromCalendar = function(){
    return  locationTimeFromCalendar;
    };

    this.getHistoryLocationTimeFrom = function(){
      return locationTimeFrom;
    };

    this.getHistoryLocationTimeToInput = function(){
      return locationTimeToInput;
    };

    this.getHistoryLocationTimeToCalendar = function(){
      return locationTimeToCalendar;
    };

    this.getHistoryLocationTimeTo = function(){
      return locationTimeTo;
    };

    this.getJourneysSummaryInfo = function () {
      return journeys_summary_info;
    };

    this.getHistoryNoActivityLable2 = function () {
      return history_no_activity_label;
    };

    this.getTextColumn = function () {
      return text_column;
    };

    this.getHistoryHideButton = function(){
      return historyHideButton;
    };

    this.getHistoryLocationTodayRadio = function(){
      return timeLocationToday;
    };

    this.getHistoryLocationYesterdayRadio = function(){
      return timeLocationYesterday;
    };

    this.getHistoryLocationLast7daysRadio = function(){
      return timeLocationLast7day;
    };

    this.getHistoryLocationCustomRadio = function(){
      return timeLocationCustome;
    };

    this.getStaticsDataGrid = function(n){
      return history_active_tab.element(by.css(".history-statistics-tab .grid-padding-y div.small-2:nth-child("+n+")"));
    };

    this.getHistoryNoActivityLable = function (n) {
      if (n == 1) {
        return element(
          by.css(
            ".medium-12.history-stats-panel-no-activity:not(.ng-hide) span.history-stats-panel-no-activity-label"
          )
        );
      }
      return element(
        by.css(
          ".medium-12.history-stats-panel-no-activity.ng-hide span.history-stats-panel-no-activity-label"
        )
      );
    };

    this.getHistoryStatsPanel = function () {
      return element(by.css(".history-stats-panel.medium-12.columns"));
    };

    this.getJourneysTab = function () {
      return journeys_tab;
    };

    this.getDrivingLabel = function () {
      return driving_label;
    };

    this.getStoppedLabel = function () {
      return stopped_label;
    };

    this.getIdleLabel = function () {
      return idle_label;
    };

    this.getHistoryJourneyList = function () {
      // return element.all(by.css('div.tabs-panel.is-active .history-activity-logs ul.k-treeview-lines li.k-item:not(.ng-scope)'));
      //div.history-stats-panel.medium-12.columns > div > div > div.tabs-panel.ng-scope.is-active > div > div > history-activity-logs > div > div > ul > li.k-item.k-first > div > span.k-icon.k-i-expand
      return element.all(
        by.css(
          "div.history-stats-panel.medium-12.columns > div > div > div.tabs-panel.ng-scope.is-active > div > div > history-activity-logs > div > div > ul > li.k-item:not(.ng-scope)"
        )
      );
    };

    this.getTextArc = function () {
      return text_arc;
    };

    this.getHistoryMap = function () {
      return history_map;
    };

    this.getNumberOfTrips = function () {
      return number_of_trips;
    };

    this.getTotalPrivateDistance = function () {
      return total_private_distance;
    };

    this.getTotalBusinessDistance = function () {
      return total_business_distance;
    };

    this.getTotalDistance = function () {
      return total_distance;
    };

    this.getPrivateTime = function () {
      return private_time;
    };

    this.getEquipmentTime = function () {
      return equipment_time;
    };

    this.getHistoryJourneyDetailsList = function () {
      return journeys_details_list;
    };

    this.getEngagementTime = function () {
      return engagement_time;
    };

    this.getIdleTime = function () {
      return idle_time;
    };

    this.getStoppedTime = function () {
      return stopped_time;
    };

    this.getDrivingTime = function () {
      return driving_time;
    };

    this.getDrivingColumn = function () {
      return driving_column;
    };

    this.getStoppedColumn = function () {
      return stopped_column;
    };

    this.getIdleColumn = function () {
      return idle_column;
    };

    this.getDrivingArc = function () {
      return driving_arc;
    };

    this.getStoppedArc = function () {
      return stopped_arc;
    };

    this.getIdleArc = function () {
      return idle_arc;
    };

    this.getStatisticsTab = function () {
      return statistics_tab;
    };

    this.getTemperature = function () {
      return temperature;
    };

    this.getTemperatureLine = function () {
      return temperature_line;
    };

    this.getTimeLine = function () {
      return time_line;
    };

    this.getLoadingOverlay = function () {
      return loading_overlay;
    };

    this.getFromTimeInput = function () {
      return fromTimeInput;
    };

    this.getToTimeInput = function () {
      return toTimeInput;
    };

    this.getTimeFrameToday = function () {
      return time_frame_today;
    };

    this.getTimeFrameYesterday = function () {
      return time_frame_yesterday;
    };

    this.getTimeFrameLast7days = function () {
      return time_frame_last7days;
    };

    this.getTimeFrameCustom = function () {
      return time_frame_custom;
    };

    this.getFromCalendar = function () {
      return from_calendar;
    };
    this.getFromTime = function () {
      return from_time;
    };

    this.getToCalendar = function () {
      return to_calendar;
    };

    this.getToTime = function () {
      return to_time;
    };

    this.getTrackingObjectDropDown = function () {
      return tracking_object_dropdown;
    };

    this.getDriverDropdpwn = function () {
      return driver_dropdown;
    };

    this.getToday = function () {
      return today;
    };

    this.getChooseDay = function () {
      return choose_day;
    };

    this.getCustomDay = function () {
      return custom_day;
    };

    this.getHistoryControlList = function () {
      return history_control_list;
    };

    this.getResetButton = function () {
      return reset_button;
    };

    this.getShowButton = function () {
      return show_button;
    };

    this.getActivityLogsTab = function () {
      return activity_logs_tab;
    };

    this.getTextArcWithColor = function (color) {
      return element(
        by.css('#history-piechart > svg > g > circle[fill="' + color + '"]')
      );
    };

    this.getHistoryByResourceTab = function(){
      return historyByResource;
    };

    this.getHistoryByLocationTab = function(){
      return historyByLocation;
    };

    this.getDropDownGridRow = function(n){
      return element(by.css('ul[aria-hidden="true"] li:nth-child('+n+')'));
    };

    this.clickShowButton = function () {
      browser.executeScript(
        "arguments[0].click();",
        show_button.getWebElement()
      );
    };

    this.clickTrackingObjectDropDown = function () {
      browser.executeScript(
        "arguments[0].click();",
        tracking_object_dropdown.getWebElement()
      );
    };

    this.clickTemperature = function () {
      browser.executeScript(
        "arguments[0].click();",
        temperature.getWebElement()
      );
    };

    this.clickStatisticsTab = function () {
      browser.executeScript(
        "arguments[0].click();",
        statistics_tab.element(by.css("a")).getWebElement()
      );
    };

    this.clickActivityLogsTab = function () {
      browser.executeScript(
        "arguments[0].click();",
        activity_logs_tab.getWebElement()
      );
    };

    this.clickJourneysTab = function () {
      browser.executeScript(
        "arguments[0].click();",
        journeys_tab.getWebElement()
      );
    };

    this.clickTimeLine = function () {
      browser.executeScript("arguments[0].click();", time_line.getWebElement());
    };

    this.checkToClickYesterdayRadio = function () {
      browser.executeScript(
        "arguments[0].click();",
        this.getTimeFrameYesterday().getWebElement()
      );
      browser.executeScript(
        "arguments[0].click();",
        this.getTimeFrameCustom().getWebElement()
      );
      browser.wait(
        testUtils.until.elementToBeClickable(this.getFromCalendar())
      );
      browser.executeScript(
        "arguments[0].click();",
        this.getFromCalendar().getWebElement()
      );
      browser.wait(testUtils.until.visibilityOf(this.getChooseDay()));
    };

    this.checkToClickLast7Days = function () {
      browser.executeScript(
        "arguments[0].click();",
        this.getTimeFrameLast7days().getWebElement()
      );
      browser.executeScript(
        "arguments[0].click();",
        this.getTimeFrameCustom().getWebElement()
      );
      browser.wait(
        testUtils.until.elementToBeClickable(this.getFromCalendar())
      );
      browser.executeScript(
        "arguments[0].click();",
        this.getFromCalendar().getWebElement()
      );
      browser.wait(testUtils.until.visibilityOf(this.getChooseDay()));
    };

    this.checkToClickCustomRadio = function () {
      browser.executeScript(
        "arguments[0].click();",
        this.getTimeFrameToday().getWebElement()
      );
      browser.executeScript(
        "arguments[0].click();",
        this.getTimeFrameCustom().getWebElement()
      );
      browser.executeScript(
        "arguments[0].click();",
        this.getFromCalendar().getWebElement()
      );
      browser.wait(testUtils.until.presenceOf(this.getCustomDay()));
      browser.executeScript(
        "arguments[0].click();",
        this.getCustomDay().getWebElement()
      );
      browser.wait(
        testUtils.until.elementToBeClickable(this.getFromCalendar())
      );
      this.getFromTime().click();
      this.getFromCalendar().click();
      browser.wait(testUtils.until.visibilityOf(this.getChooseDay()));
    };

    this.chooseTemperatureTrackingObject = function () {
      this.clickTrackingObjectDropDown();
      browser.wait(
        testUtils.until.presenceOf(
          element(by.css('ul[aria-hidden="false"] li:nth-child(5)'))
        )
      );
      browser.executeScript(
        "arguments[0].click();",
        element(
          by.css('ul[aria-hidden="false"] li:nth-child(5)')
        ).getWebElement()
      );
    };

    this.convertDateString = function (string) {
      var str = [],
        time = [];
      str = string.split(" ");
      time = str[0].split("/");
      return time[1] + "/" + time[0] + "/" + time[2] + " " + str[1];
    };

    this.clearString = function (elem, length) {
      length = length || 25;
      var backspaceSeries = "";
      backspaceSeries = Array(length).join(protractor.Key.BACK_SPACE);
      elem.sendKeys(backspaceSeries);
    };

    this.makeMouseEnterEvent = function (elm) {
      browser.getCapabilities().then(function (capabilities) {
        if (capabilities.get("browserName") == "firefox") {
          // var script = "if(document.createEvent) { var evObj = document.createEvent('MouseEvents'); evObj.initEvent('mouseover', true, true); arguments[0].dispatchEvent(evObj); } else if (document.createEventObject) { arguments[0].fireEvent('onmouseover'); }";
          // var script = "var element = arguments[0]; var mouseEventObj = document.createEvent('MouseEvents'); mouseEventObj.initEvent( 'mouseover', true, true ); element.dispatchEvent(mouseEventObj);";
          var script =
            "var element = arguments[0]; var mouseEventObj = document.createEvent('MouseEvents'); mouseEventObj.initEvent( 'mouseenter', true, true ); element.dispatchEvent(mouseEventObj);";
          browser.executeScript(script, elm.getWebElement());
          return elm.click();
        } else {
          return browser
            .actions()
            .mouseMove(elm.getWebElement())
            .click()
            .perform();
        }
      });
    };

    this.makeMouseOverEvent = function (elm) {
      browser.getCapabilities().then(function (capabilities) {
        if (capabilities.get("browserName") == "firefox") {
          var script =
            "var element = arguments[0]; var mouseEventObj = document.createEvent('MouseEvents'); mouseEventObj.initEvent( 'mouseover', true, true ); element.dispatchEvent(mouseEventObj);";
          browser.executeScript(script, elm.getWebElement());
          return elm.click();
        } else {
          return browser
            .actions()
            .mouseMove(elm.getWebElement())
            .click()
            .perform();
        }
      });
    };
    //hhmm
    this.convertToMinutes = function(string){
      var mis = testUtils.getNumberArrayFromString(string);
      return mis[0]*60+mis[1];
    };

    this.makeMouseOutEvent = function (elm) {
      browser.getCapabilities().then(function (capabilities) {
        if (capabilities.get("browserName") == "firefox") {
          var script =
            "var element = arguments[0]; var mouseEventObj = document.createEvent('MouseEvents'); mouseEventObj.initEvent( 'mouseout', true, false ); element.dispatchEvent(mouseEventObj);";
          browser.executeScript(script, elm.getWebElement());
          return elm.click();
        } else {
          return browser
            .actions()
            .mouseMove(elm.getWebElement())
            .click()
            .perform();
        }
      });
    };
  };
  module.exports = new HistoryPanelPage();
})();
