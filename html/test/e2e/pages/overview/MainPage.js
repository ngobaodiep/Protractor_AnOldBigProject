/*
    MainPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function () {
  "use strict";

  var MainPage = function () {
    var logout_button = element(by.css(".icon-esc.iconic-md")),
      loader_overlay = element(by.css(".lf-loader-overlay")),
      loader_spinner = loader_overlay.element(by.className("lf-spinner")),
      tracking_view = element(by.css(".tracking-view")),
      map_view = tracking_view.element(by.css(".lf-toolbar .fi-compass")),

      tracking_tab = element(by.css("#trackingStep1 a")),
      report_tab = element(by.css("#reportStep1 a")),
      time_booking_report_tab = element(by.css("li.is-submenu-item span.fi-timer")),
      
      settings_tab = element(by.css('div[id="mainNavigation"] .top-bar-right ul.menu li:nth-of-type(3) a span.fi-cog')),
      tb_report_control_panel = element(by.css("#WoC-control-panel")),
      dashboardTab = element(by.css("li.is-submenu-item span.fi-pie-chart")),
      info_tab = element(by.css(".icon-info.iconic-md")),
      geozone_button = tracking_view.element(by.css(".lf-toolbar .icon-location3")),
      over_view_button = tracking_view.element(by.css(".fi-list-rich.iconic-md")),
      history_button = tracking_view.element(by.css(".fi-history.iconic-md")),
      list_view_button = tracking_view.element(by.css(".fi-spreadsheet.iconic-md")),
      journey_optimizer_button = tracking_view.element(by.css(".fi-route.iconic-md")),
      filter_button = tracking_view.element(by.css(".icon-filter.iconic-md")),
      notifications_button = tracking_view.element(by.css(".icon-bell.iconic-md")),
      releaseNote_Ok_button = element(by.css(".release-note-container .button.desktop-action-button")),
      cgBusy = element(by.css(".cg-busy-default-wrapper"));

    this.getLogoutButton = function () {
      return logout_button;
    };

    this.getCgBusy = function () {
      return cgBusy;
    };

    this.getDashboardTab = function () {
      return dashboardTab;
    };

    this.getTimeBookingReportTab = function () {
      return time_booking_report_tab;
    };

    this.getLoaderOverlay = function () {
      return loader_overlay;
    };

    this.getLoaderSpinner = function () {
      return loader_spinner;
    };

    this.getReportTab = function () {
      return report_tab;
    };

    this.clickLogout = function () {
      logout_button.click();
    };

    this.getTrackingView = function () {
      return tracking_view;
    };

    this.getReleaseNote = function () {
      return releaseNote_Ok_button;
    };

    this.getMapview = function () {
      return map_view;
    };

    this.getNotificationButton = function () {
      return notifications_button;
    };

    this.getJourneyOptimizationButton = function () {
      return journey_optimizer_button;
    };

    this.getListViewButton = function () {
      return list_view_button;
    };

    this.getHistoryButton = function () {
      return history_button;
    };

    this.getOverviewBtn = function () {
      return over_view_button;
    };

    this.clickReleaseNote = function () {
      browser.executeScript(
        "arguments[0].click();",
        releaseNote_Ok_button.getWebElement()
      );
    };

    this.clickDashboardTab = function () {
      browser.executeScript(
        "arguments[0].click();",
        dashboardTab.getWebElement()
      );
    };

    this.clickJourneyOptimizationButton = function () {
      browser.executeScript(
        "arguments[0].click();",
        journey_optimizer_button.getWebElement()
      );
    };

    this.clickListViewButton = function () {
      browser.executeScript(
        "arguments[0].click();",
        list_view_button.getWebElement()
      );
    };

    this.clickOverViewButton = function () {
      browser.executeScript(
        "arguments[0].click();",
        over_view_button.getWebElement()
      );
    };

    this.clickHistoryButton = function () {
      browser.executeScript(
        "arguments[0].click();",
        history_button.getWebElement()
      );
    };

    this.clickNotificationButton = function () {
      browser.executeScript(
        "arguments[0].click();",
        notifications_button.getWebElement()
      );
    };

    this.clickReportTab = function () {
      browser.executeScript(
        "arguments[0].click();",
        report_tab.getWebElement()
      );
    };

    this.clickTimeBookingReportTab = function () {
      browser.executeScript(
        "arguments[0].click();",
        time_booking_report_tab.getWebElement()
      );
    };

    this.getTBReportControlPanel = function () {
      return tb_report_control_panel;
    };

    this.getSettingsTab = function () {
      return settings_tab;
    };

    this.clickSettingsTab = function () {
      browser.executeScript(
        "arguments[0].click();",
        settings_tab.getWebElement()
      );
    };

    this.clickInfoTab = function () {
      browser.executeScript("arguments[0].click();", info_tab.getWebElement());
    };

    this.clickTrackingViewTab = function () {
      browser.executeScript(
        "arguments[0].click();",
        tracking_tab.getWebElement()
      );
    };

    this.getTrackingTab = function () {
      return tracking_tab;
    };

    this.getTrackingGeozoneButton = function () {
      return geozone_button;
    };

    this.clickMapView = function () {
      browser.executeScript("arguments[0].click();", map_view.getWebElement());
    };

    this.clickTrackingGeozoneButton = function () {
      geozone_button.click();
    };

    this.getFilterButton = function () {
      return filter_button;
    };

    this.clickFilterButton = function () {
      browser.executeScript(
        "arguments[0].click();",
        filter_button.getWebElement()
      );
    };
  };
  module.exports = new MainPage();
})();
