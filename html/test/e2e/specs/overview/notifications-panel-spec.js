(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    notificationPanelPage = require('./NotificationPanelPage');

  describe('on notification panel', function() {
    beforeAll(function() {
      mainPage.clickTrackingViewTab();
      browser.wait(testUtils.until.presenceOf(mainPage.getNotificationButton()));
      browser.sleep(3000);
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getNotificationButton()));
      mainPage.clickNotificationButton();
      browser.wait(testUtils.until.presenceOf(element(by.css('.notifications-panel:not(.ng-hide)'))));
      browser.wait(testUtils.until.visibilityOf(notificationPanelPage.getOpenedTab()));
    });

    describe('check tabs', function() {
      it('when no notification present', function() {
        // opened tab should be active by default
        expect(notificationPanelPage.getOpenedTab().isPresent()).toBeTruthy();
        expect(notificationPanelPage.getOpenedTab().getAttribute('aria-selected')).toBe('true');
        expect(notificationPanelPage.getListViewPager().isPresent()).toBeTruthy();

        notificationPanelPage.clickClosedTab();
        expect(notificationPanelPage.getClosedTab().isPresent()).toBeTruthy();
        expect(notificationPanelPage.getClosedTab().getAttribute('aria-selected')).toBe('true');
        expect(notificationPanelPage.getListViewPager().isPresent()).toBeTruthy();

        // double check opened tab after selection
        notificationPanelPage.clickOpenedTab();
        expect(notificationPanelPage.getOpenedTab().isPresent()).toBeTruthy();
        expect(notificationPanelPage.getOpenedTab().getAttribute('aria-selected')).toBe('true');
        expect(notificationPanelPage.getListViewPager().isPresent()).toBeTruthy();
      });
    });

    describe('check', function() {
      describe('when no notification present', function() {
        it('columns of opened grid', function() {
          browser.wait(testUtils.until.presenceOf(notificationPanelPage.getOpenedGrid()));

          expect(notificationPanelPage.getSeverityColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getBrNameColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getTrackingObjectColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getDriverNameColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getStatusColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getMessageSentColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getNotificationDateColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getAcknowledgementDateColumn().isPresent()).toBeTruthy();
        });

        it('columns of closed grid', function() {
          // click on closed tab
          notificationPanelPage.clickClosedTab();
          browser.wait(testUtils.until.presenceOf(notificationPanelPage.getClosedGrid()));

          expect(notificationPanelPage.getSeverityClosedColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getBrNameClosedColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getTrackingObjectClosedColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getDriverNameClosedColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getStatusClosedColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getMessageSentClosedColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getNotificationDateClosedColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getAcknowledgementDateClosedColumn().isPresent()).toBeTruthy();
          expect(notificationPanelPage.getClosingDateColumn().isPresent()).toBeTruthy();
        });
      });
    });

  });
})();
