/*
    NotificationPanelPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';

  var NotificationPanelPage = function() {
    var notifications_panel = element(by.css('.tracking-view .notifications-panel')),
      opened_tab = element(by.css('.notifications-panel .tabbable .tabs li:nth-child(1) > a')),
      closed_tab = element(by.css('.notifications-panel .tabbable .tabs li:nth-child(2) > a')),
      list_view_pager = element(by.css('.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap')),
      opened_grid = element(by.css('.notifications-panel .tabs-panel.is-active div[kendo-grid="grids.openNotificationsGrid"]')),

      severity_column = opened_grid.element(by.css('th[data-field="priority"]')),
      businessRule_column = opened_grid.element(by.css('th[data-field="businessRuleName"]')),
      tracking_object_column = opened_grid.element(by.css('th[data-field="trackingObjectName"]')),
      driver_column = opened_grid.element(by.css('th[data-field="driverName"]')),
      status_column = opened_grid.element(by.css('th[data-field="openAndAckStatus"]')),
      message_sent_column = opened_grid.element(by.css('th[data-field="acknowledgmentMessage"]')),
      notification_date_column = opened_grid.element(by.css('th[data-field="notificationDate"]')),
      acknowledgement_date_column = opened_grid.element(by.css('th[data-field="acknowledgementDate"]')),


      closed_grid = element(by.css('.notifications-panel .tabs-panel.is-active div[kendo-grid="grids.closedNotificationsGrid"].k-grid')),

      severity_closed_column = closed_grid.element(by.css('th[data-field="priority"]')),
      businessRule_closed_column = closed_grid.element(by.css('th[data-field="businessRuleName"]')),
      tracking_object_closed_column = closed_grid.element(by.css('th[data-field="trackingObjectName"]')),
      driver_closed_column = closed_grid.element(by.css('th[data-field="driverName"]')),
      status_closed_column = closed_grid.element(by.css('th[data-field="closingStatus"]')),
      message_sent_closed_column = closed_grid.element(by.css('th[data-field="acknowledgmentMessage"]')),
      notification_date_closed_column = closed_grid.element(by.css('th[data-field="notificationDate"]')),
      acknowledgement_date_closed_column = closed_grid.element(by.css('th[data-field="acknowledgementDate"]')),
      closing_date_column = closed_grid.element(by.css('th[data-field="closingDate"]'));



    this.getNotificationPanel = function() {
      return notifications_panel;
    };

    this.getOpenedList = function(){
      return element.all(by.css('.notifications-panel .tabs-panel.is-active div[kendo-grid="grids.openNotificationsGrid"] .k-grid-content tbody tr'));
    };

    this.getOpenedGridRow = function(n){
      return element(by.css('.notifications-panel .tabs-panel.is-active div[kendo-grid="grids.openNotificationsGrid"] .k-grid-content tbody tr:nth-of-type('+n+')'));
    };

    this.getOpenedTab = function() {
      return opened_tab;
    };

    this.getClosedTab = function() {
      return closed_tab;
    };

    this.getOpenedGrid = function() {
      return opened_grid;
    };

    this.getClosedGrid = function() {
      return closed_grid;
    };

    this.getListViewPager = function() {
      return list_view_pager;
    };

    this.getSeverityColumn = function() {
      return severity_column;
    };

    this.getBrNameColumn = function() {
      return businessRule_column;
    };

    this.getTrackingObjectColumn = function() {
      return tracking_object_column;
    };

    this.getDriverNameColumn = function() {
      return driver_column;
    };

    this.getStatusColumn = function() {
      return status_column;
    };

    this.getMessageSentColumn = function() {
      return message_sent_column;
    };

    this.getNotificationDateColumn = function() {
      return notification_date_column;
    };

    this.getAcknowledgementDateColumn = function() {
      return acknowledgement_date_column;
    };

    this.getSeverityClosedColumn = function() {
      return severity_closed_column;
    };

    this.getBrNameClosedColumn = function() {
      return businessRule_closed_column;
    };

    this.getTrackingObjectClosedColumn = function() {
      return tracking_object_closed_column;
    };

    this.getDriverNameClosedColumn = function() {
      return driver_closed_column;
    };

    this.getStatusClosedColumn = function() {
      return status_closed_column;
    };

    this.getMessageSentClosedColumn = function() {
      return message_sent_closed_column;
    };

    this.getNotificationDateClosedColumn = function() {
      return notification_date_closed_column;
    };

    this.getAcknowledgementDateClosedColumn = function() {
      return acknowledgement_date_closed_column;
    };

    this.getClosingDateColumn = function() {
      return closing_date_column;
    };

    this.clickOpenedTab = function() {
      browser.executeScript("arguments[0].click();", opened_tab.getWebElement());
    };

    this.clickClosedTab = function() {
      browser.executeScript("arguments[0].click();", closed_tab.getWebElement());
    };

  };
  module.exports = new NotificationPanelPage();
})();
