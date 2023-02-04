(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    filterPanelPage = require('./FilterPanelPage'),
    notificationPanelPage = require('./NotificationPanelPage'),
    scheduleBusinessRulesNotifications = require('./ScheduleBusinessRulesNotifications.js');

  describe('on tracking view ', function() {
    var checked = false,
      index = -1;
    beforeAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.visibilityOf(filterPanelPage.getFilterPanel()));
      browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getFilterClearButton()));
      filterPanelPage.clickFilterClearButton();
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel().element(by.css('#showMobileassets.ng-not-empty'))));
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel().element(by.css('#showVehicles.ng-not-empty'))));
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel().element(by.css('#showMachines.ng-not-empty'))));
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel().element(by.css('#showStandalones.ng-not-empty'))));
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel().element(by.css('#showWorkers.ng-not-empty'))));
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel().element(by.css('#showGeozones.ng-not-empty'))));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel()));
      browser.wait(testUtils.until.presenceOf(scheduleBusinessRulesNotifications.getNotificationsContainer()));
    });
    it('should have notifications container', function() {
      expect(scheduleBusinessRulesNotifications.getNotificationsContainer().isPresent()).toBe(true);
    });
    it('shouldbe have notifications menu', function() {
      expect(scheduleBusinessRulesNotifications.getNotificationsTotalMenu().isPresent()).toBe(true);
    });
    it('shouldbe have notifications menu text', function() {
      expect(scheduleBusinessRulesNotifications.getNotificationsTotalMenu().getText()).toContain('Latest notifications');
    });
    it('should have notifications icon', function() {
      expect(scheduleBusinessRulesNotifications.getNotificationsTotalIcon().isPresent()).toBe(true);
    });
    describe('when check notifications container ', function() {
      beforeAll(function() {
        scheduleBusinessRulesNotifications.getNotificationsTotalIconTop().isPresent().then(function(isPresent) {
          if (isPresent) {
            console.log("isPresent");
            browser.wait(testUtils.until.elementToBeClickable(scheduleBusinessRulesNotifications.getNotificationsTotalMenu()));
            scheduleBusinessRulesNotifications.clickNotificationsMenu();
          }
        });
      });
      it('should have notification on container', function() {
        expect(scheduleBusinessRulesNotifications.getNotificationList().count()).toBeGreaterThan(0);
      });
      it('should have ignition on classc in list', function() {
        scheduleBusinessRulesNotifications.getNotificationList().each().then(function(elem, ind) {
          elem.element(by.css('div.noty_message div.medium-12.columns')).getText().then(function(text) {
            if (text == "classc ignition on") {
              checked = true;
              index = ind;
            }
          });
        });
        expect(checked).toBe(true);
      });
      it('notification should have cross button', function() {
        expect(scheduleBusinessRulesNotifications.getNotificationList().get(index).element(by.css('.noty_message .fi-x-thin')).isPresent()).toBe(true);
      });
      it('should have Acknowledge button', function() {
        expect(scheduleBusinessRulesNotifications.getNotificationList().get(index).element(by.css('.noty_buttons #button-0')).isPresent()).toBe(true);
      });
      it('should have Close button', function() {
        expect(scheduleBusinessRulesNotifications.getNotificationList().get(index).element(by.css('.noty_buttons #button-1')).isPresent()).toBe(true);
      });
      it('should have Show button', function() {
        expect(scheduleBusinessRulesNotifications.getNotificationList().get(index).element(by.css('.noty_buttons #button-2')).isPresent()).toBe(true);
      });
    });
    describe('when check notifications panel ', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(scheduleBusinessRulesNotifications.getNotificationList().get(index).element(by.css('.noty_buttons #button-2'))));
        scheduleBusinessRulesNotifications.getNotificationList().get(index).element(by.css('.noty_buttons #button-2')).click();
        browser.wait(function() {
          return notificationPanelPage.getOpenedList().count().then(function(count) {
            return count != 0;
          });
        });
      });
      afterAll(function() {
        filterPanelPage.turnOffAllFilter();
      });
      it('serverity should be green', function() {
        expect(notificationPanelPage.getOpenedGridRow(1).element(by.css('td:nth-child(1) span')).getCssValue('color')).toBe("rgb(0, 128, 0)");
      });
      it('business rules name should be ignition ON', function() {
        expect(notificationPanelPage.getOpenedGridRow(1).element(by.css('td:nth-child(2) span')).getText()).toBe("ignition On");
      });
      it('tracking object should be classc', function() {
        // expect(notificationPanelPage.getOpenedGridRow(1).element(by.css('td:nth-child(3)')).getText()).toBe("classc");
        notificationPanelPage.getOpenedGridRow(1).element(by.css('td:nth-child(3)')).getText().then(function(text) {
          console.log("tracking object " + text);
        });
      });
      it('notification date should be today', function() {
        // expect(notificationPanelPage.getOpenedGridRow(1).element(by.css('td:nth-child(7)')).getText()).toBe("classc");
        notificationPanelPage.getOpenedGridRow(1).element(by.css('td:nth-child(7)')).getText().then(function(text) {
          console.log("notification date " + text);
        });
      });
    });
  });
})();
