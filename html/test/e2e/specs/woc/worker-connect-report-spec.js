(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainSettingsPage = require('./MainSettingsPage'),
    timeBookingsGlobalPage = require('./TimeBookingsGlobalPage'),
    moment = require('moment'),
    fs = require('fs'),
    glob = require("glob"),
    timeBookingReportPage = require('./TimeBookingReportPage');

  describe('on time booking report', function() {
    var worker_name,
      task_name,
      customer_name,
      site_name,
      task_color,
      pathFolder,
      fileName,
      filesArray = [],
      files = [],
      arr = this.arr = [];

    beforeAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getTimeBookingReportTab()));
      mainPage.clickTimeBookingReportTab();
      browser.wait(testUtils.until.presenceOf(timeBookingReportPage.getSitesFilter()));
    });

    describe('check elements', function() {
      it('should have report title', function() {
        expect(timeBookingReportPage.getReportTitle().getText()).toEqual('Working Time Report & Validation');
      });

      it('should have time frame this week', function() {
        expect(timeBookingReportPage.getTimeFrameThisWeek().isPresent()).toBeTruthy();
      });

      it('should have time frame last week', function() {
        expect(timeBookingReportPage.getTimeFrameLastWeek().isDisplayed()).toBeTruthy();
      });

      it('should have time frame last month', function() {
        expect(timeBookingReportPage.getTimeFrameLastMonth().isDisplayed()).toBeTruthy();
      });

      it('should have time frame this month', function() {
        expect(timeBookingReportPage.getTimeFrameThisMonth().isDisplayed()).toBeTruthy();
      });

      it('should have time frame custom', function() {
        expect(timeBookingReportPage.getTimeFrameCustom().isDisplayed()).toBeTruthy();
      });

      it('should have from_calendar', function() {
        expect(timeBookingReportPage.getFromCalendar().isDisplayed()).toBeTruthy();
      });

      it('should have from_time', function() {
        expect(timeBookingReportPage.getFromTime().isDisplayed()).toBeTruthy();
      });

      it('should have to_calendar', function() {
        expect(timeBookingReportPage.getToCalendar().isDisplayed()).toBeTruthy();
      });

      it('should have to_time', function() {
        expect(timeBookingReportPage.getToTime().isDisplayed()).toBeTruthy();
      });

      it('should have workers filter', function() {
        expect(timeBookingReportPage.getWorkersFilter().isPresent()).toBeTruthy();
      });

      it('should have tasks filter', function() {
        expect(timeBookingReportPage.getTasksFilter().isPresent()).toBeTruthy();
      });

      it('should have customers filter', function() {
        expect(timeBookingReportPage.getCustomersFilter().isPresent()).toBeTruthy();
      });

      it('should have sites filter', function() {
        expect(timeBookingReportPage.getSitesFilter().isPresent()).toBeTruthy();
      });

      it('should have show button', function() {
        expect(timeBookingReportPage.getShowButton().isPresent()).toBeTruthy();
      });

      it('should have cancel button', function() {
        expect(timeBookingReportPage.getCancelButton().isPresent()).toBeTruthy();
      });
    });

    describe('when custom radio clicked', function() {
      beforeAll(function() {
        timeBookingReportPage.clickTimeFrameCustom();
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getInputFrom()));
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getInputTo()));
        timeBookingReportPage.clickInputFrom();
        timeBookingReportPage.getInputFrom().sendKeys(protractor.Key.END);
        timeBookingReportPage.clearString(timeBookingReportPage.getInputFrom(), 25);
        timeBookingReportPage.getInputFrom().sendKeys('01/11/2018 12:00 AM');
        timeBookingReportPage.clickInputTo();
        timeBookingReportPage.getInputTo().sendKeys(protractor.Key.END);
        timeBookingReportPage.clearString(timeBookingReportPage.getInputTo(), 25);
        timeBookingReportPage.getInputTo().sendKeys('31/01/2019 11:59 PM');
        timeBookingReportPage.clickShowButton();
        browser.wait(testUtils.until.visibilityOf(timeBookingReportPage.getCreateButton()));
      });

      it('should have create button', function() {
        expect(timeBookingReportPage.getCreateButton().isDisplayed()).toBeTruthy();
      });

      it('should have show deleted and edited button', function() {
        expect(timeBookingReportPage.getShowDeletedButton().isDisplayed()).toBeTruthy();
      });

      it('should have validate all button', function() {
        expect(timeBookingReportPage.getValidateAll().isDisplayed()).toBeTruthy();
      });

      it('should have view by worker button', function() {
        expect(timeBookingReportPage.getViewByWorker().isDisplayed()).toBeTruthy();
      });

      it('should have view by customer button', function() {
        expect(timeBookingReportPage.getViewByCustomer().isDisplayed()).toBeTruthy();
      });

      it('should have view by task button', function() {
        expect(timeBookingReportPage.getViewByTask().isDisplayed()).toBeTruthy();
      });

      it('should have view by site button', function() {
        expect(timeBookingReportPage.getViewBySite().isDisplayed()).toBeTruthy();
      });

      it('should have expand all button', function() {
        expect(timeBookingReportPage.getExpandAllButton().isDisplayed()).toBeTruthy();
      });

      it('should have collapase all button', function() {
        expect(timeBookingReportPage.getCollapadeAllButton().isDisplayed()).toBeTruthy();
      });

      it('should have get excel button', function() {
        expect(timeBookingReportPage.getGetExcelButton().isDisplayed()).toBeTruthy();
      });

      it('should have get pdf button', function() {
        expect(timeBookingReportPage.getGetPdfButton().isDisplayed()).toBeTruthy();
      });

      it('worker name should be same as worker input', function() {
        expect(timeBookingReportPage.getReportName().getText()).toEqual(timeBookingReportPage.getNameInput().getText());
      });

      it('check total duration of month', function() {
        element.all(by.css('div[ng-repeat="month in dataByPage.months"]')).each(function(month) {
          var sum = 0,
            hours,
            minutes;
          month.all(by.css('div[ng-repeat="day in month.days"] div.report-total-day div.durationForTest.ng-binding')).each(function(day) {
            day.getAttribute('innerHTML').then(function(text) {
              sum += moment.duration(text, 'hh:mm:ss').asSeconds();
            });
          }).then(function() {
            hours = parseInt(moment.duration(sum, 'seconds').asHours());
            hours = (hours < 10) ? ("0" + hours) : hours;
            minutes = ("0" + moment.duration(sum, 'seconds').minutes()).slice(-2);
            expect(month.element(by.css('div.report-total-month div.totalDurationTb')).getText()).toBe(hours + ':' + minutes);
          });
        });
      });
    });

    describe('when view by task clicked', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getViewByTask()));
        timeBookingReportPage.clickViewByTask();
        browser.wait(testUtils.until.presenceOf(element(by.css('.report-rendering-template .report-header div:nth-of-type(4).medium-1')), 'Worker'));
      });

      it('task name should be same as task input', function() {
        expect(timeBookingReportPage.getReportName().getText()).toEqual(timeBookingReportPage.getNameInput().getText());
      });

      it('check total duration of month', function() {
        element.all(by.css('div[ng-repeat="month in dataByPage.months"]')).each(function(month) {
          var sum = 0,
            hours,
            minutes;
          month.all(by.css('div[ng-repeat="day in month.days"] div.report-total-day div.durationForTest.ng-binding')).each(function(day) {
            day.getAttribute('innerHTML').then(function(text) {
              sum += moment.duration(text, 'hh:mm:ss').asSeconds();
            });
          }).then(function() {
            hours = parseInt(moment.duration(sum, 'seconds').asHours());
            hours = (hours < 10) ? ("0" + hours) : hours;
            minutes = ("0" + moment.duration(sum, 'seconds').minutes()).slice(-2);
            expect(month.element(by.css('div.report-total-month div.totalDurationTb')).getText()).toBe(hours + ':' + minutes);
          });
        });
      });
    });

    describe('when view by customer clicked', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getViewByCustomer()));
        timeBookingReportPage.clickViewByCustomer();
        browser.wait(testUtils.until.presenceOf(element(by.css('.report-rendering-template .report-header div:nth-of-type(4).medium-1')), 'Worker'));
      });

      it('customer name should be same as customer input', function() {
        expect(timeBookingReportPage.getReportName().getText()).toEqual(timeBookingReportPage.getNameInput().getText());
      });

      it('check total duration of month', function() {
        element.all(by.css('div[ng-repeat="month in dataByPage.months"]')).each(function(month) {
          var sum = 0,
            hours,
            minutes;
          month.all(by.css('div[ng-repeat="day in month.days"] div.report-total-day div.durationForTest.ng-binding')).each(function(day) {
            day.getAttribute('innerHTML').then(function(text) {
              sum += moment.duration(text, 'hh:mm:ss').asSeconds();
            });
          }).then(function() {
            hours = parseInt(moment.duration(sum, 'seconds').asHours());
            hours = (hours < 10) ? ("0" + hours) : hours;
            minutes = ("0" + moment.duration(sum, 'seconds').minutes()).slice(-2);
            expect(month.element(by.css('div.report-total-month div.totalDurationTb')).getText()).toBe(hours + ':' + minutes);
          });
        });
      });
    });

    describe('when view by site clicked', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getViewBySite()));
        timeBookingReportPage.clickViewBySite();
        browser.wait(testUtils.until.presenceOf(element(by.css('.report-rendering-template .report-header div:nth-of-type(5).medium-1'))));
        browser.wait(function() {
          return element(by.css('.report-rendering-template .report-header div:nth-of-type(5).medium-1')).getText().then(function(text) {
            return text == "Customer";
          });
        });
      });

      afterAll(function() {
        timeBookingReportPage.clickViewByWorker();
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.report-rendering-template .report-header div:nth-of-type(5).medium-1', 'Site'))));
        browser.wait(testUtils.until.visibilityOf(element(by.cssContainingText('.report-rendering-template .report-header div:nth-of-type(5).medium-1', 'Site'))));
      });

      it('site name should be same as site input', function() {
        expect(timeBookingReportPage.getReportName().getText()).toEqual(timeBookingReportPage.getNameInput().getText());
      });

      it('check total duration of month', function() {
        element.all(by.css('div[ng-repeat="month in dataByPage.months"]')).each(function(month) {
          var sum = 0,
            hours,
            minutes;
          month.all(by.css('div[ng-repeat="day in month.days"] div.report-total-day div.durationForTest.ng-binding')).each(function(day) {
            day.getAttribute('innerHTML').then(function(text) {
              sum += moment.duration(text, 'hh:mm:ss').asSeconds();
            });
          }).then(function() {
            hours = parseInt(moment.duration(sum, 'seconds').asHours());
            hours = (hours < 10) ? ("0" + hours) : hours;
            minutes = ("0" + moment.duration(sum, 'seconds').minutes()).slice(-2);
            expect(month.element(by.css('div.report-total-month div.totalDurationTb')).getText()).toBe(hours + ':' + minutes);
          });
        });
      });
    });

    describe('when show deleted and edited records clicked', function() {
      beforeAll(function() {
        timeBookingReportPage.clickExpandAllButton();
        browser.wait(testUtils.until.presenceOf(element(by.css('.report-day-row .report-all-record .report-trip-row'))));
        timeBookingReportPage.clickShowDeletedButton();
        browser.wait(testUtils.until.presenceOf(timeBookingReportPage.getDeletedRecordStatus()));
      });

      afterAll(function() {
        browser.wait(testUtils.until.visibilityOf(timeBookingReportPage.getEditedRecordStatus()));
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getShowDeletedButton()));
        timeBookingReportPage.clickShowDeletedButton();
        browser.wait(testUtils.until.presenceOf(element(by.css('span.icon-stack-cancel:not(.show)'))));
      });

      describe(' ', function() {
        it('should display deleted records', function() {
          expect(timeBookingReportPage.getDeletedRecordStatus().getText()).toContain('Deleted by int-test automated on');
        });

        it('should display edited records', function() {
          expect(timeBookingReportPage.getEditedRecordStatus().getText()).toContain('Edited by int-test automated on');
        });
      });
    });

    describe('when time record created', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getTimeFrameThisWeek()));
        timeBookingReportPage.clickTimeThisWeek();
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getShowButton()));
        timeBookingReportPage.clickShowButton();
        browser.wait(testUtils.until.stalenessOf(timeBookingReportPage.getLoaderOverlaySpinner()));
        browser.wait(testUtils.until.presenceOf(timeBookingReportPage.getCreateButton()));
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getCreateButton()));
        timeBookingReportPage.clickCreateButton();
        browser.wait(testUtils.until.presenceOf(timeBookingReportPage.getCreateModal()));
        timeBookingReportPage.SelectedWorker(0);
        worker_name = timeBookingReportPage.getSelectedWorker().getText();
        timeBookingReportPage.SelectedTask(0);
        task_name = timeBookingReportPage.getSelectedTask().getText();
        timeBookingReportPage.SelectedCustomer(0);
        customer_name = timeBookingReportPage.getSelectedCustomer().getText();
        timeBookingReportPage.SelectedSite(0);
        site_name = timeBookingReportPage.getSelectedSite().getText();
        timeBookingReportPage.SelectEndTimeHours(2);
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getSaveButton()));
        timeBookingReportPage.clickSaveButton();
        timeBookingReportPage.getWarningModal().isPresent().then(function(isPresent) {
          if (isPresent) {
            timeBookingReportPage.clickOkWarningModal();
            browser.wait(testUtils.until.stalenessOf(timeBookingReportPage.getWarningModal()));
            browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getCreateModalCancelBtn()));
            timeBookingReportPage.clickCreateModalCancelBtn();
          }
        });

        browser.wait(testUtils.until.stalenessOf(timeBookingReportPage.getCreateModal()));
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getTimeFrameThisWeek()));
        timeBookingReportPage.clickTimeThisWeek();
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getShowButton()));
        timeBookingReportPage.clickShowButton();
        browser.wait(testUtils.until.stalenessOf(timeBookingReportPage.getLoaderOverlaySpinner()));
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getNameInputWrapper()));
        timeBookingReportPage.SelectNameInput(0);
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getExpandAllButton()));
        timeBookingReportPage.clickExpandAllButton();
        browser.wait(testUtils.until.visibilityOf(timeBookingReportPage.getReportName()));
      });

      it('report name should be selected worker name', function() {
        expect(timeBookingReportPage.getReportName().getAttribute('innerHTML')).toContain(worker_name);
      });

      it('task name should be selected task name', function() {
        expect(element(by.css('.report-trip-row div:nth-of-type(4) .columns.text-left')).getText()).toContain(task_name);
      });

      it('customer name should be selected customer name', function() {
        expect(element(by.css('.report-all-record:not(.ng-hide) .report-trip-row:nth-of-type(1) div.medium-1:nth-of-type(5).timebooking-text-left')).getText()).toContain(customer_name);
      });

      it('site name should be selected site name', function() {
        expect(element(by.css('.report-trip-row div.medium-1:nth-of-type(6).timebooking-text-left')).getText()).toContain(site_name);
      });

      it('should have edit button', function() {
        expect(element(by.css('.report-trip-row div.medium-2 a.k-button-icontext .fi-pencil')).isDisplayed()).toBe(true);
      });

      it('should have delete button', function() {
        expect(element(by.css('.report-trip-row div.medium-2 a.k-button-icontext .fi-trash')).isDisplayed()).toBe(true);
      });

      it('should have no location icon becaused created from the web', function() {
        expect(element(by.css('.report-trip-row div.medium-1:nth-of-type(8) .row-warning span.icon-display4.location')).isDisplayed()).toBe(true);
      });

      it('time record should be 00:15', function() {
        expect(element(by.css('.report-week-row div.report-total-month div.totalDurationTb')).getText()).toBe('00:15');
      });
    });

    describe('when time record edited', function() {
      beforeAll(function() {
        timeBookingReportPage.clickEditButton();
        browser.wait(testUtils.until.presenceOf(timeBookingReportPage.getCreateModal()));
        timeBookingReportPage.SelectEndTimeHours(3);
        timeBookingReportPage.SelectedTask(0);
        task_name = timeBookingReportPage.getSelectedTask().getText();
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getSaveButton()));
        timeBookingReportPage.clickSaveButton();
        timeBookingReportPage.getWarningModal().isPresent().then(function(isPresent) {
          if (isPresent) {
            timeBookingReportPage.clickOkWarningModal();
            browser.wait(testUtils.until.stalenessOf(timeBookingReportPage.getWarningModal()));
            browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getCreateModalCancelBtn()));
            timeBookingReportPage.clickCreateModalCancelBtn();
          }
        });

        browser.wait(testUtils.until.stalenessOf(timeBookingReportPage.getCreateModal()));
        browser.wait(testUtils.until.stalenessOf(element(by.css('.medium-12.report-trip-row'))));
        browser.wait(testUtils.until.stalenessOf(timeBookingReportPage.getLoaderOverlaySpinner()));
      });

      it('report name should be selected worker name', function() {
        expect(timeBookingReportPage.getReportName().getText()).toContain(worker_name);
      });

      it('task name should be selected task name', function() {
        expect(element(by.css('.report-trip-row div:nth-of-type(4) .columns.text-left')).getText()).toContain(task_name);
      });

      it('customer name should be selected customer name', function() {
        expect(element(by.css('.report-all-record:not(.ng-hide) .report-trip-row:nth-of-type(1) div.medium-1:nth-of-type(5).timebooking-text-left')).getText()).toContain(customer_name);
      });

      it('site name should be selected site name', function() {
        expect(element(by.css('.report-trip-row div.medium-1:nth-of-type(6).timebooking-text-left')).getText()).toContain(site_name);
      });

      it('time record should be 00:30', function() {
        expect(element(by.css('.report-week-row div.report-total-month div.totalDurationTb')).getText()).toBe('00:30');
      });
    });

    describe('when time record deleted', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.presenceOf(timeBookingReportPage.getDeleteButton()));
        timeBookingReportPage.clickDeleteButton();
        browser.wait(testUtils.until.presenceOf(timeBookingReportPage.getWarnModalDeleteBtn()));
        timeBookingReportPage.clickWarnModalDeleteBtn();
        browser.wait(testUtils.until.stalenessOf(timeBookingReportPage.getWarnModalDeleteBtn()));
        browser.wait(testUtils.until.stalenessOf(element(by.css('.medium-12.report-trip-row.timebooking-center'))));
        browser.wait(testUtils.until.stalenessOf(element(by.css('.lf-loader-overlay.report-loader'))));
      });

      it('time record should be deleted', function() {
        expect(element(by.css('.report-week-row div.report-total-month div.totalDurationTb')).getText()).toBe('00:00');
      });
    });

    describe('when hide control panel clicked', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getHideControlPanelButton()));
        timeBookingReportPage.clickHideControlPanelButton();
        browser.wait(testUtils.until.presenceOf(element(by.css('.reports-view .row .medium-3.ng-hide'))));
      });

      afterAll(function() {
        timeBookingReportPage.clickShowControlPanelButton();
        browser.wait(testUtils.until.stalenessOf(element(by.css('.reports-view .row .medium-3.ng-hide'))));
      });

      it('control panel should be hidden', function() {
        expect(element(by.css('.reports-view .row .ng-hide .report-control-panel')).isPresent()).toBe(true);
      });
    });

    describe('when task, customer, site option are inactived on global setting', function() {
      beforeAll(function() {
        mainPage.clickSettingsTab();
        browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsTimeBookingsButton()));
        mainSettingsPage.clickSettingsWorkerConnectButton();
        browser.wait(testUtils.until.presenceOf(element(by.css('input[ng-model="globalSetting.authorizeManualEntries"].ng-not-empty'))));
        timeBookingsGlobalPage.clickTasksSwitcher();
        timeBookingsGlobalPage.clickCustomersSwitcher();
        timeBookingsGlobalPage.clickSitesSwitcher();
        browser.wait(testUtils.until.stalenessOf(timeBookingsGlobalPage.getSitesTab()));
        timeBookingsGlobalPage.clickSaveButton();
        browser.wait(testUtils.until.presenceOf(timeBookingsGlobalPage.getInfoModal()));
        timeBookingsGlobalPage.clickOkButton();
        browser.wait(testUtils.until.stalenessOf(timeBookingsGlobalPage.getInfoModal()));
        mainPage.clickTimeBookingReportTab();
        browser.wait(testUtils.until.presenceOf(element(by.css('.reports-view .report-control-panel div.medium-12.ng-hide[ng-show="globalSettingOrigin.useSite"]'))));
      });

      afterAll(function() {
        mainPage.clickSettingsTab();
        browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsTimeBookingsButton()));
        mainSettingsPage.clickSettingsWorkerConnectButton();
        browser.wait(testUtils.until.presenceOf(element(by.css('input[ng-model="globalSetting.authorizeManualEntries"].ng-not-empty'))));
        timeBookingsGlobalPage.clickTasksSwitcher();
        timeBookingsGlobalPage.clickCustomersSwitcher();
        timeBookingsGlobalPage.clickSitesSwitcher();
        browser.wait(testUtils.until.presenceOf(timeBookingsGlobalPage.getSitesTab()));
        timeBookingsGlobalPage.clickSaveButton();
        browser.wait(testUtils.until.presenceOf(timeBookingsGlobalPage.getInfoModal()));
        timeBookingsGlobalPage.clickOkButton();
        browser.wait(testUtils.until.stalenessOf(timeBookingsGlobalPage.getInfoModal()));
      });

      describe('in report control panel', function() {
        it('should have not tasks filter', function() {
          expect(element(by.css('.reports-view .report-control-panel div.medium-12.ng-hide[ng-show="globalSettingOrigin.useTask"]')).isPresent()).toBe(true);
        });

        it('should have not customers filter', function() {
          expect(element(by.css('.reports-view .report-control-panel div.medium-12.ng-hide[ng-show="globalSettingOrigin.useCustomer"]')).isPresent()).toBe(true);
        });

        it('should have not sites filter', function() {
          expect(element(by.css('.reports-view .report-control-panel div.medium-12.ng-hide[ng-show="globalSettingOrigin.useSite"]')).isPresent()).toBe(true);
        });
      });
    });

    describe('check report popup', function() {
      describe('on web', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(mainPage.getTimeBookingReportTab()));
          mainPage.clickTimeBookingReportTab();
          browser.wait(testUtils.until.presenceOf(timeBookingReportPage.getSitesFilter()));
          browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getTimeFrameCustom()));
          timeBookingReportPage.clickTimeFrameCustom();
          //wait from input aria-disabled=="false"
          browser.wait(testUtils.until.presenceOf(element(by.css('#wocTimeFrame div.medium-12:nth-of-type(2) input[aria-disabled="false"]'))));
          browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getInputFrom()));
          timeBookingReportPage.clickInputFrom();
          timeBookingReportPage.clearString(timeBookingReportPage.getInputFrom(), 25);
          timeBookingReportPage.getInputFrom().sendKeys('20/04/2019 12:00 AM');
          timeBookingReportPage.clickInputTo();
          timeBookingReportPage.clearString(timeBookingReportPage.getInputTo(), 25);
          timeBookingReportPage.getInputTo().sendKeys('20/04/2019 11:59 PM');
          browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getShowButton()));
          timeBookingReportPage.clickShowButton();
          browser.wait(testUtils.until.stalenessOf(timeBookingReportPage.getLoaderOverlaySpinner()));
          browser.wait(testUtils.until.presenceOf(element(by.css('.report-total-day.timebooking-center[ng-click="selectDay(day.records)"]'))));
          browser.wait(testUtils.until.presenceOf(timeBookingReportPage.getExpandAllButton()));
          browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getExpandAllButton()));
          timeBookingReportPage.clickExpandAllButton();
          browser.wait(testUtils.until.presenceOf(timeBookingReportPage.getReportDaySelected()));
          browser.wait(testUtils.until.presenceOf(timeBookingReportPage.getReportDaySelected().element(by.css('div:nth-child(4).time-booking-middle span.fi-shape-circle'))));
        });

        it('should have task color circle', function() {
          expect(timeBookingReportPage.getReportDaySelected().element(by.css('div:nth-child(4).time-booking-middle span.fi-shape-circle')).isPresent()).toBe(true);
        });

        it('should have task name', function() {
          expect(timeBookingReportPage.getReportDaySelected().element(by.css('div:nth-child(4).time-booking-middle div.text-left')).isPresent()).toBe(true);
        });

        it('should have site name', function() {
          expect(timeBookingReportPage.getReportDaySelected().element(by.css('div:nth-child(6).timebooking-text-left')).isPresent()).toBe(true);
        });

        it('should have map marker', function() {
          expect(timeBookingReportPage.getReportDaySelected().element(by.css('span.fi-map-marker')).isPresent()).toBe(true);
        });

        it('should have warning icon', function() {
          expect(timeBookingReportPage.getReportDaySelected().element(by.css('span.fi-warning.location')).isPresent()).toBe(true);
        });
      });

      describe('on map', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.visibilityOf(timeBookingReportPage.getReportName()));
          worker_name = timeBookingReportPage.getReportName().getText();
          task_name = timeBookingReportPage.getReportDaySelected().element(by.css('div:nth-child(4).time-booking-middle div.text-left')).getText();
          task_color = timeBookingReportPage.getReportDaySelected().element(by.css('div:nth-child(4).time-booking-middle span.fi-shape-circle')).getCssValue('color');
          site_name = timeBookingReportPage.getReportDaySelected().element(by.css('div:nth-child(6).timebooking-text-left')).getText();
          browser.wait(testUtils.until.visibilityOf(timeBookingReportPage.getReportDaySelected().element(by.css('span.fi-map-marker'))));
          browser.wait(testUtils.until.elementToBeClickable(timeBookingReportPage.getReportDaySelected().element(by.css('span.fi-map-marker'))));
          timeBookingReportPage.getReportDaySelected().element(by.css('span.fi-map-marker')).click();
          browser.wait(testUtils.until.visibilityOf(timeBookingReportPage.getMapWorkerPopup().element(by.css('map-element-tooltip-header span.ng-binding'))));
        });

        afterAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(element(by.css('.reveal-overlay .medium-12.cell button[ng-click="cancel()"]'))));
          element(by.css('.reveal-overlay .medium-12.cell button[ng-click="cancel()"]')).click();
          browser.wait(testUtils.until.stalenessOf(element(by.css('.reveal-overlay lf-map'))));
        });

        describe('check', function() {
          it('should have same worker name', function() {
            expect(timeBookingReportPage.getMapWorkerPopup().element(by.css('map-element-tooltip-header span.ng-binding')).getText()).toBe(worker_name);
          });

          it('should have same task name', function() {
            expect(timeBookingReportPage.getMapWorkerPopup().element(by.css('.map-element-tooltip-header status-field div.task-name')).getText()).toBe(task_name);
          });

          it('should have same color task', function() {
            element(by.css('.reveal-overlay lf-map div:nth-child(4) div:nth-child(2) .gm-style-iw-a map-element-tooltip map-element-tooltip-header .tooltip-title')).getCssValue('background-color').then(function(rgb) {
              expect(rgb).toBe(task_color);
            });
          });

          it('should have time title', function() {
            expect(element(by.css('.reveal-overlay lf-map div:nth-child(4) div:nth-child(2) .gm-style-iw-a .map-element-tooltip map-element-info .tooltip-time div.small-10')).isPresent()).toBe(true);
          });

          it('should have worker location', function() {
            //address not found
            // expect(element(by.css('.reveal-overlay lf-map div:nth-child(4) div:nth-child(2) .gm-style-iw-a .map-element-tooltip map-element-info address-field .small-10.columns span')).isPresent()).toBe(true);
          });

          it('should have same site name', function() {
            expect(element(by.css('.reveal-overlay lf-map div:nth-child(4) div:nth-child(1) .gm-style-iw-a .map-element-tooltip map-element-tooltip-header .tooltip-title div:nth-child(1).small-12 span.ng-binding')).getText()).toBe(site_name);
          });

          it('should have site location', function() {
            expect(element(by.css('.reveal-overlay lf-map div:nth-child(4) div:nth-child(1) .gm-style-iw-a .map-element-tooltip map-element-info address-field div.small-10 span')).isPresent()).toBe(true);
          });
        });
      });
      //domus export
        describe('check domus export', function() {
          beforeAll(function() {
            pathFolder = process.cwd() + "/resources/test/export_file";
            fileName = pathFolder + "/*.*";
            try {
              files = fs.readdirSync(pathFolder);
              for (var i = 0; i < files.length; i++) {
                if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
                  fs.unlinkSync(pathFolder + "/" + files[i]);
                }
              }

              browser.wait(testUtils.until.visibilityOf(element(by.css('.reports-view a[ng-click="reportDataPaginated.length > 0 && exportToPDF()"] span.fi-file-pdf.iconic-md'))),2000,"a");
              browser.wait(testUtils.until.elementToBeClickable(element(by.css('.reports-view a[ng-click="reportDataPaginated.length > 0 && exportToPDF()"] span.fi-file-pdf.iconic-md'))),2000,"b");
              browser.executeScript("arguments[0].click();", element(by.css('.reports-view a[ng-click="reportDataPaginated.length > 0 && exportToPDF()"] span.fi-file-pdf.iconic-md')),2000,"c");
              browser.driver.wait(function() {
                filesArray = glob.sync(pathFolder + "/*.*");
                if ((typeof filesArray != 'undefined') && (filesArray.length > 0)) {
                  return filesArray;
                }
              }).then(function(arr) {
                fileName = arr[0];
              });
              browser.wait(testUtils.until.stalenessOf(element(by.css('.lf-loader-overlay.report-loader'))));
            } catch (e) {
              return;
            }
          });

          afterAll(function() {
            pathFolder = process.cwd() + "/resources/test/export_file";
            fileName = pathFolder + "/*.*";
            files = fs.readdirSync(pathFolder);
            for (var i = 0; i < files.length; i++) {
              if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
                fs.unlinkSync(pathFolder + "/" + files[i]);
              }
            }
          });

          describe('check ', function() {
            it("file should be in download directory ", function() {
              expect(fs.existsSync(fileName)).toBe(true);
            });
          });
        });
    });
  });
})();
