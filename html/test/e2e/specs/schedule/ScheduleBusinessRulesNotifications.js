(function(){
  'use strict';

  var ScheduleBusinessRulesNotifications = function(){
    var notifications_container = element(by.css('notifications-popup-panel .notifications-container.notifications-popup-expanded')),
    notificationsTotalMenu = element(by.css('notifications-popup-panel .notifications-total-menu')),
    notificationsTotalIconTop = element(by.css('notifications-popup-panel .notifications-total-menu span.notifications-total-icon.iconic-md.fi-chevron-top')),
    notificationsTotalIcon = element(by.css('notifications-popup-panel .notifications-total-icon.iconic-md')),
    notificationList = element.all(by.css('notifications-popup-panel div.notifications-container ul li'));


    this.getNotificationsContainer = function(){
      return notifications_container;
    };

    this.getNotificationsTotalMenu = function(){
      return notificationsTotalMenu;
    };

    this.getNotificationsTotalIcon = function(){
      return notificationsTotalIcon;
    };

    this.getNotificationsTotalIconTop = function(){
      return notificationsTotalIconTop;
    };

    this.getNotificationList = function(){
      return notificationList;
    };

    this.clickNotificationsMenu = function(){
      notificationsTotalMenu.click();
    };
  };
  module.exports = new ScheduleBusinessRulesNotifications();
})();
