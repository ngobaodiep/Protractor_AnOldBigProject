(function() {
  "use strict";
  var testUtils = require("./TestUtils");

  var ScheduleDashboardPage = function() {
    var performanceTab = element(by.css(".settings-view .button-group a:nth-child(1) span.icon-chart")),
      dashboard_view = element(by.css(".settings-view div:nth-child(2) .dashboard-view")),
      control_panel = dashboard_view.element(by.css("div.medium-3.controls-panel")),
      dashboard_control_panel = control_panel.element(by.css("div.dashboard-control-panel")),
      dashboard_title = dashboard_control_panel.element(by.css("div.dashboard-title")),
      dashboard_period = dashboard_control_panel.element(by.css(".dashboard-period")),
      this_month = element(by.css('label[for="timeframe-month"]')),
      previous_month = element(by.css('label[for="timeframe-premonth"]')),
      last_30_days = element(by.css('label[for="timeframe-last30"]')),
      custom = element(by.css('label[for="timeframe-custom"]')),
      this_quater = element(by.css('label[for="timeframe-quarter"]')),
      previous_quater = element(by.css('label[for="timeframe-prequarter"]')),
      last_90_days = element(by.css('label[for="timeframe-last90"]')),
      this_year = element(by.css('label[for="timeframe-year"]')),
      previous_year = element(by.css('label[for="timeframe-preyear"]')),
      last_365_days = element(by.css('label[for="timeframe-last365"]')),
      vehicles_machines_radio = element(by.css('label[for="trackingObjectsRadio"]')),
      vehicles_selector = element(by.css("#dashboardVehiclesSelect .vehicles:nth-child(2) .k-multiselect-wrap")),
      machines_selector = element(by.css("#dashboardVehiclesSelect div:nth-child(3).select-vehices .k-multiselect-wrap")),
      quater_selector = dashboard_control_panel.element(by.css("div:nth-child(5) span.k-widget")),
      year_selector = element(by.css("#dashboardTimeFrame div:nth-child(4) span.k-widget")),
      month_selector = dashboard_control_panel.element(by.css("#dashboardTimeFrame div:nth-child(2).medium-12 .k-dropdown-wrap")),
      group_radio = element(by.css('label[for="groupsRadio"]')),
      category_selector = element(by.css("#dashboardVehiclesSelect div:nth-child(3).select-vehices .k-multiselect-wrap")),
      selectDriversSelector = element(by.css('label[for="driversRadio"]')),
      driversDropDownSelector = element(by.css("#dashboardVehiclesSelect div:nth-child(7) div:nth-child(2) .k-multiselect-wrap")),
      reset_button = element(by.css('button.cancel[ng-click="resetDashboard()"]')),
      show_button = element(by.css('button.ok[ng-click="getDashboardData()"]')),
      loader_overlay_spinner = element(by.css(".lf-loader-overlay .icon-spinner9")),
      dashboard_result_container = element(by.css(".dashboard-result-container:not(.ng-hide)")),
      indicatorEngagementTimeTitle = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(1).cell h6")),
      indicatorEngagementTimeValue = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(1).cell span.dashboard-indicators-engagement-time")),
      utilisation_title = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(7).cell h6")),
      utilisation_value = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(7).cell span")),
      driving_working_time_title = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(2).cell h6")),
      driving_working_time_value = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(2).cell span")),
      stop_time_title = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(3).cell h6")),
      stop_time_value = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(3).cell span")),
      idle_time_title = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(4).cell h6")),
      idle_time_value = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(4).cell span")),
      number_trips_title = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(5).cell h6")),
      number_trips_value = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(5).cell span")),
      distance_title = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(6).cell h6")),
      distance_value = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(6).cell span")),
      notifications_title = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(9).cell h6")),
      alert_circle = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(8).cell span.dashboard-alert-notifications")),
      warning_circle = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(8).cell span.dashboard-warning-notifications")),
      notification_circle = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(8).cell span.dashboard-notification-notifications")),
      alert_value = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(8).cell span.dashboard-alert-notifications")),
      warning_value = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(8).cell span.dashboard-warning-notifications")),
      notification_value = dashboard_result_container.element(by.css("dashboard-indicator div:nth-child(8).cell span.dashboard-notification-notifications")),
      distance_result_title = dashboard_result_container.element(by.css("dashboard-distance div.dashboard-result-title")),
      // distance_by_group_button = distance_result_title.element(by.css('span.icon-tree6')),
      // distance_by_resouces_button = distance_result_title.element(by.css('span.icon-lf_car')),
      // distance_by_time_button = distance_result_title.element(by.css('span.icon-calendar2')),
      distance_result_content = dashboard_result_container.element(by.css("dashboard-distance div.dashboard-result-content")),
      distance_char = distance_result_content.element(by.css(".distance-chart")),
      distance_table = distance_result_content.element(by.css("div.small-4 div.k-grid-content")),
      engagement_result_title = dashboard_result_container.element(by.css("dashboard-engagement .dashboard-result-title")),
      engagement_result_content = dashboard_result_container.element(by.css("dashboard-engagement div.dashboard-result-content")),
      // engagement_by_group_button = engagement_result_title.element(by.css('span.icon-tree6')),
      // engagement_by_resouces_button = engagement_result_title.element(by.css('span.icon-lf_car')),
      // engagement_by_time_button = engagement_result_title.element(by.css('span.icon-calendar2')),
      engagement_char = engagement_result_content.element(by.css(".distance-chart")),
      engagement_table = engagement_result_content.element(by.css("div.small-4 div.k-grid-content")),
      engagement_export_excel = element(by.css('dashboard-engagement a[ng-click="exportToXls()"]')),
      numberOfTripsResultTitle = dashboard_result_container.element(by.css("dashboard-number-of-trip .dashboard-result-title")),
      numberOfTripsResultContent = dashboard_result_container.element(by.css("dashboard-number-of-trip .dashboard-result-content")),
      numberOfTripsToogleArrowUp = element(by.css("dashboard-number-of-trip .dashboard-toggle-panel.icon-arrow-up")),
      numberOfTripsToogleArrowDown = element(by.css("dashboard-number-of-trip .dashboard-toggle-panel.icon-arrow-down")),
      // numberOfTripsToogleCalendar = numberOfTripsResultTitle.element(by.css(".dashboard-toggle-panel.icon-calendar2")),
      // numberOfTripsToogleVehicle = numberOfTripsResultTitle.element(by.css(".dashboard-toggle-panel.icon-lf_car")),
      // numberOfTripsToogleGroup = numberOfTripsResultTitle.element(by.css(".dashboard-toggle-panel.icon-tree6")),
      // numberOfTripsToogleCategory = numberOfTripsResultTitle.element(by.css(".dashboard-toggle-panel.fi-list-rich")),
      numberOfTripsChart = numberOfTripsResultContent.element(by.css(".dashboard-number-of-trip")),
      numberOfTripsChartContainer = numberOfTripsChart.element(by.id("dashboard-numberOfTrip-barchart")),
      numberOfTripsTable = numberOfTripsResultContent.element(by.css("div:nth-child(2).small-4 .k-grid")),
      numberOfTripsTableHeader = numberOfTripsResultContent.element(by.css("div:nth-child(2).small-4 .k-grid .k-grid-header")),
      numberOfTripsTableContent = numberOfTripsResultContent.element(by.css("div:nth-child(2).small-4 .k-grid .k-grid-content")),
      numberOfTripsExportToExcel = element(by.css('dashboard-number-of-trip a[ng-click="exportToXls()"]')),
      fuelConsumptionResultTitle = dashboard_result_container.element(by.css("dashboard-fuel .dashboard-result-title")),
      fuelConsumptionResultContent = dashboard_result_container.element(by.css("dashboard-fuel .dashboard-result-content")),
      fuelConsumptionChart = fuelConsumptionResultContent.element(by.id("dashboard-fuel-barchart")),
      fuelConsumptionResultTableHeader = fuelConsumptionResultContent.element(by.css(".text-right .k-grid-header")),
      fuelConsumptionResultTableContent = fuelConsumptionResultContent.element(by.css(".text-right .k-grid-content")),
      period_month = dashboard_control_panel.element(by.css("div:nth-child(3) div:nth-child(1) button.button-dashboard")),
      period_quater = dashboard_control_panel.element(by.css("div:nth-child(3) div:nth-child(2) button.button-dashboard")),
      period_year = dashboard_control_panel.element(by.css("div:nth-child(3) div:nth-child(3) button.button-dashboard")),
      dashboardControlbuttons = element(by.css(".dashboard-control-buttons")),
      dashboardControlByResourcesBtn = dashboardControlbuttons.element(by.css("a[ng-click=\"setPointOfView('vehicleId')\"]")),
      dashboardControlByDriverBtn = dashboardControlbuttons.element(by.css("a[ng-click=\"setPointOfView('driverId')\"]")),
      dashboardControlByCategoryBtn = dashboardControlbuttons.element(by.css("a[ng-click=\"setPointOfView('categoryId')\"]")),
      dashboardControlByGroupBtn = dashboardControlbuttons.element(by.css("a[ng-click=\"setPointOfView('groupId')\"]")),
      dashboardControlByTimeBtn = dashboardControlbuttons.element(by.css("a[ng-click=\"setPointOfView('timeDimension')\"]")),
      indicatorDrivingWorkingTimeValue = element(by.css(".dashboard-indicators-driving-time:nth-child(3)")),
      indicatorDrivingWorkingTimeTitle = element(by.css("span.dashboard-indicators-driving-time:nth-child(1)")),
      indicatorStoppedTimeValue = element(by.css(".dashboard-indicators-stopped-time:nth-child(3)")),
      indicatorStoppedTimeTitle = element(by.css(".dashboard-indicators-stopped-time:nth-child(1)")),
      indicatorIdleTimeValue = element(by.css(".dashboard-indicators-idle-time:nth-child(3)")),
      indicatorIdleTimeTitle = element(by.css(".dashboard-indicators-idle-time:nth-child(1)")),
      indicatorBusinessDistanceValue = element(by.css(".dashboard-indicators-distance:nth-child(3)")),
      indicatorBusinessDistanceTitle = element(by.css("span:nth-child(1).dashboard-indicators-distance")),
      indicatorPrivateDistanceValue = element(by.css(".dashboard-indicators-private-distance:nth-child(3)")),
      indicatorPrivateDistanceTitle = element(by.css("span:nth-child(1).dashboard-indicators-private-distance")),
      indicatorTotalDistanceValue = element(by.css('#performanceDistancePieChart div:nth-child(2) div:nth-child(2) div:nth-child(3) span:nth-child(3)')),
      indicatorVehicleTotalDistanceValue = element(by.css("#performanceDistancePieChart .dashboard-indicators-field")),
      indicatorNumberOfTripsValue = element(by.css("#performanceNumberOfTrip .dashboard-indicators-engagement-time")),
      indicatorNumberOfTripTitle = element(by.css("dashboard-indicator .small-6:nth-child(3) h6")),
      indicatorTotalDistanceTitle = element(by.css("dashboard-indicator .small-6:nth-child(3) h6")),
      indicatorNotificationTitle = element(by.css("dashboard-indicator .small-6:nth-child(2) h6")),
      indicatorNotiAlertCircle = element(by.css("span:nth-child(1).dashboard-alert-notifications")),
      indicatorNotiAlertValue = element(by.css("span:nth-child(2).dashboard-indicators-notifications")),
      indicatorNotiWarnCircle = element(by.css("span:nth-child(3).dashboard-warning-notifications")),
      indicatorNotiWarnValue = element(by.css("span:nth-child(4).dashboard-indicators-notifications")),
      indicatorNotiNotiCircle = element(by.css("span:nth-child(5).dashboard-notification-notifications")),
      indicatorNotiNotiValue = element(by.css("span:nth-child(6).dashboard-indicators-notifications")),
      indicatorUtilisationTitle = element(by.css("dashboard-indicator .small-6:nth-child(4) h6")),
      indicatorUtilisationValue = element(by.css("dashboard-indicator .small-6:nth-child(4) .dashboard-indicators-field")),
      indicatorCloseBtn = element(by.css("dashboard-indicator .dashboard-toggle-panel.icon-arrow-up")),
      indicatorOpenBtn = element(by.css("dashboard-indicator .dashboard-toggle-panel.icon-arrow-down")),
      distanceExportToExcel = distance_result_content.element(by.css('a[ng-click="exportToXls()"]')),
      distanceOpenBtn = element(by.css("dashboard-distance .dashboard-toggle-panel.icon-arrow-down")),
      distanceCloseBtn = element(by.css("dashboard-distance .dashboard-toggle-panel.icon-arrow-up")),
      engagementCloseBtn = element(by.css("dashboard-engagement .dashboard-toggle-panel.icon-arrow-up")),
      engagementOpenBtn = element(by.css("dashboard-engagement .dashboard-toggle-panel.icon-arrow-down")),
      fuelConsumptionCloseBtn = element(by.css("dashboard-fuel .dashboard-toggle-panel.icon-arrow-up")),
      fuelConsumptionOpenBtn = element(by.css("dashboard-fuel .dashboard-toggle-panel.icon-arrow-down")),
      fuelConsumptionExportToExcel = fuelConsumptionResultContent.element(by.css('a[ng-click="exportToXls()"]')),
      performanceViewByDriver = element(by.css("a[ng-click=\"setPointOfView('driverId')\"]")),
      performanceViewByCategory = element(by.css("a[ng-click=\"setPointOfView('categoryId')\"]")),
      performanceViewByGroup = element(by.css("a[ng-click=\"setPointOfView('groupId')\"]")),
      performanceViewbyTime = element(by.css("a[ng-click=\"setPointOfView('timeDimension')\"]"));

    this.getPerformanceTab = function() {
      return performanceTab;
    };

    this.getDashboardView = function() {
      return dashboard_view;
    };

    this.getSelectDriversRadio = function() {
      return selectDriversSelector;
    };

    this.getDriversDropDownSelector = function() {
      return driversDropDownSelector;
    };

    this.getPerformanceViewByTime = function() {
      return performanceViewbyTime;
    };

    this.getPerformanceViewByGroup = function() {
      return performanceViewByGroup;
    };

    this.getPerformanceViewByCategory = function() {
      return performanceViewByCategory;
    };

    this.getFuelConsumptionOpenBtn = function() {
      return fuelConsumptionOpenBtn;
    };

    this.getFuelConsumptionCloseBtn = function() {
      return fuelConsumptionCloseBtn;
    };

    this.getPerformanceViewByDriver = function() {
      return performanceViewByDriver;
    };

    this.getFuelConsumptionExportToExcel = function() {
      return fuelConsumptionExportToExcel;
    };

    this.getEngagementOpenBtn = function() {
      return engagementOpenBtn;
    };

    this.getEngagementCloseBtn = function() {
      return engagementCloseBtn;
    };

    this.getDistanceCloseBtn = function() {
      return distanceCloseBtn;
    };

    this.getDistanceOpenBtn = function() {
      return distanceOpenBtn;
    };

    this.getIndicatorCloseBtn = function() {
      return indicatorCloseBtn;
    };

    this.getIndicatorOpenBtn = function() {
      return indicatorOpenBtn;
    };

    this.getIndicatorNotiAlertCircle = function() {
      return indicatorNotiAlertCircle;
    };

    this.getIndicatorNotiAlertValue = function() {
      return indicatorNotiAlertValue;
    };

    this.getIndicatorNotiWarnCircle = function() {
      return indicatorNotiWarnCircle;
    };

    this.getIndicatorNotiWarnValue = function() {
      return indicatorNotiWarnValue;
    };

    this.getIndicatorNotiNotiCircle = function() {
      return indicatorNotiNotiCircle;
    };

    this.getIndicatorNotiNotiValue = function() {
      return indicatorNotiNotiValue;
    };

    this.getIndicatorNotificationsTitle = function() {
      return indicatorNotificationTitle;
    };

    this.getIndicatorUtilisationValue = function() {
      return indicatorUtilisationValue;
    };

    this.getIndicatorUtilisationTitle = function() {
      return indicatorUtilisationTitle;
    };

    this.getIndicatorBusinessDistanceTimeTitle = function() {
      return indicatorBusinessDistanceTitle;
    };

    this.getIndicatorPrivateDistanceTitle = function() {
      return indicatorPrivateDistanceTitle;
    };

    this.getIndicatorTotalDistanceTitle = function() {
      return indicatorTotalDistanceTitle;
    };

    this.getIndicatorDrivingWorkingTimeTitle = function() {
      return indicatorDrivingWorkingTimeTitle;
    };

    this.getIndicatorStoppedTimeTitle = function() {
      return indicatorStoppedTimeTitle;
    };

    this.getIndicatorIdleTimeTitle = function() {
      return indicatorIdleTimeTitle;
    };

    this.getIndicatorNumberOfTripsTitle = function() {
      return indicatorNumberOfTripTitle;
    };

    this.getIndicatorNumberOfTripsValue = function() {
      return indicatorNumberOfTripsValue;
    };

    this.getDistanceExportToExcel = function() {
      return distanceExportToExcel;
    };

    this.getNumberOfTripsTableRowList = function() {
      return numberOfTripsTableContent.all(by.css("tbody tr"));
    };

    this.getEngagementExport = function() {
      return engagement_export_excel;
    };

    this.getIndicatorDrivingWorkingTimeValue = function() {
      return indicatorDrivingWorkingTimeValue;
    };

    this.getIndicatorStoppedTimeValue = function() {
      return indicatorStoppedTimeValue;
    };

    this.getIndicatorIdleTimeValue = function() {
      return indicatorIdleTimeValue;
    };

    this.getIndicatorBusinessDistanceTimeValue = function() {
      return indicatorBusinessDistanceValue;
    };

    this.getIndicatorPrivateDistanceValue = function() {
      return indicatorPrivateDistanceValue;
    };

    this.getIndicatorTotalDistanceValue = function() {
      return indicatorTotalDistanceValue;
    };

    this.getIndicatorVehicleTotalDistanceValue = function(){
      return indicatorVehicleTotalDistanceValue;
    };

    this.getEngagementHeaderColumnGrid = function(n) {
      return engagement_result_content.element(
        by.css(".small-4 .k-grid-header thead th:nth-child(" + n + ") ")
      );
    };

    this.getNotificationsValue = function() {
      return notification_value;
    };

    this.getWarningValue = function() {
      return warning_value;
    };

    this.getAlertValue = function() {
      return alert_value;
    };

    this.getWarningCircle = function() {
      return warning_circle;
    };

    this.getAlertCircle = function() {
      return alert_circle;
    };

    this.getNotificationsCircle = function() {
      return notification_circle;
    };

    this.getDashboardControlByDriverBtn = function() {
      return dashboardControlByDriverBtn;
    };

    this.getDashboardControlByCategoryBtn = function() {
      return dashboardControlByCategoryBtn;
    };

    this.getDashboardControlByGroupBtn = function() {
      return dashboardControlByGroupBtn;
    };

    this.getDashboardControlByTimeBtn = function() {
      return dashboardControlByTimeBtn;
    };

    this.getDashboardControlByResourcesBtn = function() {
      return dashboardControlByResourcesBtn;
    };

    this.getDashboardControlFilterCategory = function() {
      return category_selector;
    };

    this.getFuelConsumptionResultTableContentGridCell = function(n, m) {
      return fuelConsumptionResultTableContent.element(
        by.css("tbody tr:nth-child(" + n + ") td:nth-child(" + m + ")")
      );
    };

    this.getFuelConsumptionResultTableHeaderGridColumn = function(n) {
      return fuelConsumptionResultTableHeader.element(
        by.css("tr th:nth-child(" + n + ")")
      );
    };

    this.getFuelConsumptionChart = function() {
      return fuelConsumptionChart;
    };

    this.getFuelConsumptionResultShowButton = function() {
      return fuelConsumptionResultTitle.element(by.css("span.icon-arrow-down"));
    };

    this.getFuelConsumptionResultHideButton = function() {
      return fuelConsumptionResultTitle.element(by.css("span.icon-arrow-up"));
    };

    // this.getFuelConsumptionResultByResourcesButton = function(){
    //   return fuelConsumptionResultTitle.element(by.css("span.icon-lf_car"));
    // };

    // this.getFuelConsumptionResultByGroupButton = function(){
    //   return fuelConsumptionResultTitle.element(by.css("span.icon-tree6"));
    // };

    // this.getFuelConsumptionResultByTimeButton = function(){
    //   return fuelConsumptionResultTitle.element(by.css("span.icon-calendar2"));
    // };

    this.getFuelConsumptionResultTitle = function() {
      return fuelConsumptionResultTitle.element(by.css("h5"));
    };

    // this.getFuelConsumptionResultByCategoryButton = function(){
    //   return fuelConsumptionResultTitle.element(by.css("span.fi-list-rich"));
    // };

    this.getNumberOfTripsExportToExcel = function() {
      return numberOfTripsExportToExcel;
    };

    this.getNumberOfTripsTableHeader = function() {
      return numberOfTripsTableHeader;
    };

    this.getNumberOfTripsTableContent = function() {
      return numberOfTripsTableContent;
    };

    this.getNumberOfTripsChartContainer = function() {
      return numberOfTripsChartContainer;
    };

    this.getNumberOfTripsChart = function() {
      return numberOfTripsChart;
    };

    // this.getNumberOfTripsToogleCategory = function(){
    //   return numberOfTripsToogleCategory;
    // };
    //
    // this.getNumberOfTripsToogleGroup = function(){
    //   return numberOfTripsToogleGroup;
    // };
    //
    // this.getNumberOfTripsToogleVehicle = function(){
    //   return numberOfTripsToogleVehicle;
    // };
    //
    // this.getNumberOfTripsToogleCalendar = function(){
    //   return numberOfTripsToogleCalendar;
    // };

    this.getNumberOfTripsToogleArrowDown = function() {
      return numberOfTripsToogleArrowDown;
    };

    this.getNumberOfTripsToogleArrowUp = function() {
      return numberOfTripsToogleArrowUp;
    };

    this.getNumberOfTripsResultTitle = function() {
      return numberOfTripsResultTitle;
    };

    this.getNumberOfTripsResultContent = function() {
      return numberOfTripsResultContent;
    };

    this.getEngagementTableRow = function(n) {
      return engagement_table.element(by.css("tbody tr:nth-child(" + n + ")"));
    };

    this.getEngagementTableRowList = function() {
      return engagement_table.all(by.css("tbody tr"));
    };

    this.getNumberOfTripsGridCell = function(row, col) {
      return numberOfTripsTableContent.element(
        by.css("tr:nth-child(" + row + ") td:nth-child(" + col + ")")
      );
    };

    this.getNumberOfTripsHeaderColumnGrid = function(col) {
      return numberOfTripsTableHeader.element(
        by.css("thead tr th:nth-child(" + col + ") a")
      );
    };

    this.getEngagementChar = function() {
      return engagement_char;
    };

    this.getEngagementTable = function() {
      return engagement_table;
    };

    // this.getEngagementByGroupBtn = function(){
    //   return engagement_by_group_button;
    // };

    // this.getEngagementByResourcesBtn = function(){
    //   return engagement_by_resouces_button;
    // };
    //
    // this.getEngagementByTimeBtn = function(){
    //   return engagement_by_time_button;
    // };

    this.getEngagementResultTitle = function() {
      return engagement_result_title;
    };

    this.getEngagementResultContent = function() {
      return engagement_result_content;
    };

    this.getDistanceTableRowList = function() {
      return distance_table.all(by.css("tbody tr"));
    };

    this.getDistanceTableRow = function(n) {
      return distance_table.element(by.css("tbody tr:nth-child(" + n + ")"));
    };

    this.getDistanceTable = function() {
      return distance_table;
    };

    this.getDistanceChar = function() {
      return distance_char;
    };

    this.getDistanceResultContent = function() {
      return distance_result_content;
    };

    this.getDistanceHeaderGridColumn = function(n) {
      return distance_result_content.element(
        by.css(".small-4 .k-grid-header thead th:nth-child(" + n + ")")
      );
    };

    // this.getDistanceByTimeBtn = function(){
    //   return distance_by_time_button;
    // };
    //
    // this.getDistanceByResoucesBtn = function(){
    //   return distance_by_resouces_button;
    // };
    //
    // this.getDistanceByGroupBtn = function(){
    //   return distance_by_group_button;
    // };

    this.getDistanceResultTitle = function() {
      return distance_result_title;
    };

    this.getIndicatorEngagementTimeTitle = function() {
      return indicatorEngagementTimeTitle;
    };

    this.getIndicatorEngagementTimeValue = function() {
      return indicatorEngagementTimeValue;
    };

    this.getDrivingWorkingTimeTitle = function() {
      return driving_working_time_title;
    };

    this.getDrivingWorkingTimeValue = function() {
      return driving_working_time_value;
    };

    this.getStoppedTimeTitle = function() {
      return stop_time_title;
    };

    this.getStoppedtimeValue = function() {
      return stop_time_value;
    };

    this.getIdleTimeTitle = function() {
      return idle_time_title;
    };

    this.getIdleTimeValue = function() {
      return idle_time_value;
    };

    this.getNumberTripsTitle = function() {
      return number_trips_title;
    };

    this.getNumberTripsValue = function() {
      return number_trips_value;
    };

    this.getDistanceTitle = function() {
      return distance_title;
    };

    this.getDistanceValue = function() {
      return distance_value;
    };

    this.getUtilisationTitle = function() {
      return utilisation_title;
    };

    this.getUtilisationValue = function() {
      return utilisation_value;
    };

    this.getNotificationsTitle = function() {
      return notification_title;
    };

    this.getLoaderSpinner = function() {
      return loader_overlay_spinner;
    };

    this.getYearSelector = function() {
      return year_selector;
    };

    this.getThisYear = function() {
      return this_year;
    };

    this.getPreviousYear = function() {
      return previous_year;
    };

    this.getLast365days = function() {
      return last_365_days;
    };

    this.getQuaterSelector = function() {
      return quater_selector;
    };

    this.getThisQuater = function() {
      return this_quater;
    };

    this.getPreviousQuater = function() {
      return previous_quater;
    };

    this.getLast90Days = function() {
      return last_90_days;
    };

    this.getResetButton = function() {
      return reset_button;
    };

    this.getShowButton = function() {
      return show_button;
    };

    this.getVehiclesSelector = function() {
      return vehicles_selector;
    };

    this.getMachinesSelector = function() {
      return machines_selector;
    };

    this.getVehiclesMachinesRadio = function() {
      return vehicles_machines_radio;
    };

    this.getDashboardResultContainer = function() {
      return dashboard_result_container;
    };

    this.getGroupRadio = function() {
      return group_radio;
    };

    this.getGroupInput = function() {
      return element(by.css("#groupsRadio"));
    };

    this.getDashboardControlPanel = function() {
      return dashboard_control_panel;
    };

    this.getMonthSelector = function() {
      return month_selector;
    };

    this.getActivePerformanceTab = function() {
      return element(by.css(".settings-view .button-group a:nth-child(1)"));
    };

    this.getThisMonth = function() {
      return this_month;
    };

    this.getPreviousMonth = function() {
      return previous_month;
    };

    this.getLast30days = function() {
      return last_30_days;
    };

    this.getCustom = function() {
      return custom;
    };

    this.getPeriodMonthTab = function() {
      return period_month;
    };

    this.getPeriodQuaterTab = function() {
      return period_quater;
    };

    this.getPeriodYearTab = function() {
      return period_year;
    };

    this.getDashboardTitle = function() {
      return dashboard_title;
    };

    this.clickCustomRadio = function() {
      custom.click();
    };

    this.clickPerformanceTab = function() {
      performanceTab.click();
    };

    this.clickPeriodQuaterTab = function() {
      period_quater.click();
    };

    this.clickPeriodYearTab = function() {
      period_year.click();
    };

    this.clickPeriodMonthTab = function() {
      period_month.click();
    };

    this.clickMonthSelector = function() {
      month_selector.click();
    };

    this.clickVehiclesMachinesRadio = function() {
      browser.executeScript("arguments[0].click();", vehicles_machines_radio.getWebElement());
    };

    this.clickShowButton = function() {
      browser.executeScript("arguments[0].click();", show_button.getWebElement());
    };

    this.chooseMonth = function(string) {
      browser.wait(testUtils.until.presenceOf(element.all(by.css('ul[aria-hidden="false"] li'))));

      element.all(by.css('ul[aria-hidden="false"] li span')).each(function(elm) {
        elm.getText().then(function(month) {
          if (month == string) {
            browser.executeScript("arguments[0].click();", elm.getWebElement());
            browser.wait(testUtils.until.stalenessOf(element.all(by.css('ul[aria-hidden="false"] li'))));
          }
        });
      });
    };

    this.getSeft = this;
  };
  module.exports = new ScheduleDashboardPage();
})();
