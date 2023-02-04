(function(){
  'use strict';

  var testUtils = require('./TestUtils');
  var TrackingNotificationsPage = function(){
    var notification_panel = element(by.css('.notifications-panel')),
    content_container = element(by.css('.show-notification-on-map .row .content-container')),
    closed_tab = element(by.css('.notifications-panel ul.tabs li:nth-child(2).tabs-title')),
    opened_tab = element(by.css('.notifications-panel ul.tabs li:nth-child(1).tabs-title')),
    loading_overlay = element(by.css('.k-loading-mask .k-loading-image')),
    bussiness_rule_name = element(by.css('.notifications-panel .tabs-panel.is-active .k-grid-header thead .k-filter-row th:nth-child(2) input:nth-child(1)')),
    show_notifications_on_map = element(by.css('.show-notification-on-map'));

    this.getNotificationsPanel = function(){
      return notification_panel;
    };

    this.getOpenedTab = function(){
      return opened_tab;
    };

    this.getOverlayMapTooltip = function(){
      return element(by.css('.show-notification-on-map .medium-12.content-container lf-map.map div.map-element-tooltip'));
    };

    this.getLoadingOverlay = function(){
      return loading_overlay;
    };

    this.getClosedTab = function(){
      return closed_tab;
    };

    this.getClosedSince = function(){
      return element(by.css('.show-notification-on-map .row .notification-info .closed-since div:nth-child(2)'));
    };

    this.getClosedSinceIcon = function(){
      return element(by.css('.show-notification-on-map .row .notification-info .closed-since div:nth-child(1) span'));
    };

    this.getContentMessage = function(){
      return element(by.css('.show-notification-on-map .medium-12.content-container .content-message'));
    };

    this.clickClosedTab = function(){
      closed_tab.click();
    };

    this.getClosedTabActive = function(){
      return element(by.css('.notifications-panel ul.tabs li:nth-child(2).is-active.tabs-title'));
    };

    this.getShowOnMapCloseBtn = function(){
      return element(by.css('.show-notification-on-map button.ok[ng-click="close()"]'));
    };

    this.getOpenedSince = function(){
      return element(by.css('.show-notification-on-map .row .notification-info .opened-since div:nth-child(2)'));
    };

    this.getNotificationPriorityText = function(){
      return element(by.css('.show-notification-on-map .notification-priority h3'));
    };

    this.getNotificationPriorityColor = function(){
      return element(by.css('.show-notification-on-map .notification-priority span'));
    };

    this.getOpenTabActive = function(){
      return element(by.css('.notifications-panel ul.tabs li:nth-child(1).tabs-title.is-active'));
    };

    this.getContentContainer = function(){
      return content_container;
    };

    this.getNotificationsActiveTabContentRow = function(n){
      return element(by.css('.notifications-panel .tabbable .tabs-content .tabs-panel.is-active .k-grid .k-grid-content tbody tr:nth-of-type('+n+')'));
    };

    this.getShowNotificationsOnMap = function(){
      return show_notifications_on_map;
    };

    this.clickShowOnMapCloseBtn = function(){
      element(by.css('.show-notification-on-map button.ok[ng-click="close()"]')).click();
    };

    this.fillBussinessRuleNameFilter = function(string){
      browser.wait(testUtils.until.elementToBeClickable(bussiness_rule_name));
      bussiness_rule_name.click();
      bussiness_rule_name.clear().sendKeys(string);
    };
  };
  module.exports = new TrackingNotificationsPage();
})();
