(function() {
  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainMapPage = require('./MainMapPage'),
    geozonePanelPage = require('./GeozonePanelPage'),
    overviewPanelPage = require('./OverViewPanelPage'),
    listViewPage = require('./ListViewPage'),
    historyPanelPage = require('./HistoryPanelPage'),
    joPanelPage = require('./JOPanelPage'),
    notificationPanelPage = require('./NotificationPanelPage'),
    settingsChangeLogsPage = require("./SettingsChangeLogsPage"),
    mainReportPage = require('./MainReportPage'),
    mainSettingsPage = require('./MainSettingsPage'),
    helpViewPage = require('./HelpViewPage'),
    timeBookingsGlobalPage = require('./TimeBookingsGlobalPage'),
    timeBookingsTasksPage = require('./TimeBookingsTasksPage'),
    timeBookingsCustomersPage = require('./TimeBookingsCustomersPage'),
    timeBookingsSitesPage = require('./TimeBookingsSitesPage'),
    workerConnectLicensesReportPage = require('./WorkerConnectLicensesReportPage');


  describe('check main navigation', function() {
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainPage.getTrackingTab()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getTrackingTab()));
      browser.wait(testUtils.until.presenceOf(mainPage.getTrackingView()));
    });

    describe('on tracking tab', function() {
      it('tracking tab should be active by default', function() {
        expect(mainPage.getTrackingView().isPresent()).toBeTruthy();
        expect(mainPage.getTrackingView().isDisplayed()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/tracking');
      });

      it('map view should be active by default', function() {
        browser.wait(testUtils.until.presenceOf(mainMapPage.getTrackingMap()));
        browser.wait(testUtils.until.visibilityOf(mainMapPage.getTrackingMap()));
        expect(mainMapPage.getTrackingMap().isPresent()).toBeTruthy();
        expect(mainMapPage.getTrackingMap().isDisplayed()).toBeTruthy();
      });

      it('overview panel should be active after click on over view button', function() {
        mainPage.clickOverViewButton();
        browser.wait(testUtils.until.presenceOf(overviewPanelPage.getOverviewPanel()));
        browser.wait(testUtils.until.visibilityOf(overviewPanelPage.getOverviewPanel()));
        expect(overviewPanelPage.getOverviewPanel().isPresent()).toBeTruthy();
        expect(overviewPanelPage.getOverviewPanel().isDisplayed()).toBeTruthy();
      });

      it('listview should be active after click on list view button', function() {
        mainPage.clickListViewButton();
        expect(listViewPage.getListView().isPresent()).toBeTruthy();
        expect(listViewPage.getListView().isDisplayed()).toBeTruthy();
      });

      it('journey optimizer panel should be active after click on journey optimizer button', function() {
        mainPage.clickJourneyOptimizationButton();
        browser.wait(testUtils.until.visibilityOf(joPanelPage.getJourneyOptimizationPanel()));
        expect(joPanelPage.getJourneyOptimizationPanel().isPresent()).toBeTruthy();
        expect(joPanelPage.getJourneyOptimizationPanel().isDisplayed()).toBeTruthy();
      });

      it('history panel should be active after click on history button', function() {
        mainPage.clickHistoryButton();
        browser.wait(testUtils.until.visibilityOf(historyPanelPage.getHistoryPanel()));
        expect(historyPanelPage.getHistoryPanel().isPresent()).toBeTruthy();
        expect(historyPanelPage.getHistoryPanel().isDisplayed()).toBeTruthy();
      });

      it('geozone panel should be active after click on geozone button', function() {
        mainPage.clickTrackingGeozoneButton();
        expect(geozonePanelPage.getGeozonesPanel().isPresent()).toBeTruthy();
        expect(geozonePanelPage.getGeozonesPanel().isDisplayed()).toBeTruthy();
      });

      it('notifications should be active after click on top menu Notifications button', function() {
        mainPage.clickNotificationButton();
        expect(notificationPanelPage.getNotificationPanel().isPresent()).toBeTruthy();
        expect(notificationPanelPage.getNotificationPanel().isDisplayed()).toBeTruthy();
      });
    });

    describe('on reports tab', function() {
      it('reports list should be active by default', function() {
        mainPage.clickReportTab();
        browser.wait(testUtils.waitUrl(/reports\/list/));
        browser.wait(testUtils.until.presenceOf(mainReportPage.getReportListView()));
        expect(mainReportPage.getReportListView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/reports/list');
      });

      it('subscriptions list should be active after click', function() {
        browser.wait(testUtils.until.elementToBeClickable(mainReportPage.getSubcriptionsListButton()));
          mainReportPage.clickSubcriptionsListButton();
          browser.wait(testUtils.waitUrl(/reports\/subscriptions/));
          expect(mainReportPage.getSubscriptionsListView().isPresent()).toBeTruthy();
          expect(browser.getCurrentUrl()).toContain('/reports/subscriptions');
      });


      it('reports list should be active after click', function() {
        mainReportPage.clickReportListButton();
        browser.wait(testUtils.waitUrl(/reports\/list/));
        expect(mainReportPage.getReportListView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/reports/list');
      });
    });

    describe('on Woc report tab', function() {
      it('Woc control panel should be active by default', function() {
        mainPage.clickTimeBookingReportTab();
        browser.wait(testUtils.waitUrl(/viewer\/validationreport/));
        browser.wait(testUtils.until.presenceOf(mainPage.getTBReportControlPanel()));
        expect(mainPage.getTBReportControlPanel().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/viewer/validationreport');
      });
    });

    describe('on settings tab', function() {
      it('settings tab should be active after click', function() {
        mainPage.clickSettingsTab();
        browser.wait(testUtils.waitUrl(/settings/));
        expect(mainSettingsPage.getSettingsView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/settings');
      });

      it('account subsection should be active by default', function() {
        expect(mainSettingsPage.getSettingsAccountView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/settings/account');
      });

      it('users subsection should be active after click', function() {
        mainSettingsPage.clickSettingsPersonsButton();
        browser.wait(testUtils.waitUrl(/settings\/persons/));
        expect(mainSettingsPage.getSettingsPersonsView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/settings/persons');
      });

      it('groups subsection should be active after click', function() {
        mainSettingsPage.clickSettingGroupsButton();
        browser.wait(testUtils.waitUrl(/settings\/groups/));
        expect(mainSettingsPage.getSettingsGroupsView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/settings/groups');
      });

      it('roles subsection should be active after click', function() {
        mainSettingsPage.clickSettingsRolesButton();
        browser.wait(testUtils.waitUrl(/settings\/roles/));
        expect(mainSettingsPage.getSettingsRolesView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/settings/roles');
      });

      it('vehicles subsection should be active after click', function() {
        mainSettingsPage.clickSettingsVehiclesButton();
        browser.wait(testUtils.waitUrl(/settings\/vehicles/));
        expect(mainSettingsPage.getSettingsVehiclesView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/settings/vehicles');
      });

      it('machines subsection should be active after click', function() {
        mainSettingsPage.clickSettingsMachinesButton();
        browser.wait(testUtils.waitUrl(/settings\/machines/));
        expect(mainSettingsPage.getSettingsMachinesView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/settings/machines');
      });

      it('standalones subsection should be active after click', function() {
        mainSettingsPage.clickSettingsStandalonesButton();
        browser.wait(testUtils.waitUrl(/settings\/standalones/));
        expect(mainSettingsPage.getSettingsStandalonesView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/settings/standalones');
      });

      it('mobileassets subsection should be active after click', function() {
        mainSettingsPage.clickSettingsMobileassetsButton();
        browser.wait(testUtils.waitUrl(/settings\/mobileassets/));
        expect(mainSettingsPage.getSettingsMobileassetsView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/settings/mobileassets');
      });

      it('geozones subsection should be active after click', function() {
        mainSettingsPage.clickSettingsGezonesButton();
        browser.wait(testUtils.waitUrl(/settings\/categories/));
        expect(mainSettingsPage.getSettingsGeozonesView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/settings/categories');
      });

      it('business rules subsection should be active after click', function() {
        mainSettingsPage.clickSettingsBusinessRulesButton();
        browser.wait(testUtils.waitUrl(/settings\/businessrules/));
        expect(mainSettingsPage.getSettingsBusinessRulesView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/settings/businessrules');
      });

      it('worker connect subsection should be active after click', function() {
        mainSettingsPage.clickSettingsWorkerConnectButton();
        browser.wait(testUtils.waitUrl(/settings\/timebookings/));
        expect(mainSettingsPage.getSettingsTimeBookingsView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/settings/timebookings');
      });

      it('global of worker connect subsection should be active by default', function() {
        expect(timeBookingsGlobalPage.getGlobalTimeBookingsView().isPresent()).toBeTruthy();
      });

      it('activities of worker connect subsection should be active after click', function() {
        timeBookingsTasksPage.clickActivitiesTab();
        browser.wait(testUtils.until.presenceOf(timeBookingsTasksPage.getActivitiesView()));
        expect(timeBookingsTasksPage.getActivitiesView().isPresent()).toBeTruthy();
      });

      it('customers of worker connect subsection should be active after click', function() {
        browser.wait(testUtils.until.elementToBeClickable(timeBookingsCustomersPage.getCustomersTimeBookingsButton()));
        browser.wait(function() {
          return timeBookingsCustomersPage.getCustomersTimeBookingsButton().getAttribute("innerText").then(function(text) {
            return text.includes("Customers") == true;
          });
        });

        timeBookingsCustomersPage.clickCustomersTimeBookingsButton();
        browser.wait(testUtils.until.presenceOf(timeBookingsCustomersPage.getCustomersTimeBookingsView()));
        expect(timeBookingsCustomersPage.getCustomersTimeBookingsView().isPresent()).toBeTruthy();
      });

      it('sites of worker connect subsection should be active after click', function() {
        timeBookingsSitesPage.clickSitesTimeBookingsButton();
        browser.wait(testUtils.until.presenceOf(timeBookingsSitesPage.getSitesTimeBookingsView()));
        expect(timeBookingsSitesPage.getSitesTimeBookingsView().isPresent()).toBeTruthy();
      });

      it('licenses report of worker connect subsection should be active after click', function() {
        workerConnectLicensesReportPage.clickLicenseReportButton();
        browser.wait(testUtils.until.presenceOf(workerConnectLicensesReportPage.getLicenseUsersGridContent()));
        expect(workerConnectLicensesReportPage.getLicenseUsersGridContent().isPresent()).toBeTruthy();
      });

      it('setting payment should be active after clicking ', function() {
        element(by.css('a span.icon-coin-dollar.iconic-md')).click();
        browser.wait(testUtils.until.presenceOf(element(by.css('.payments-list'))));
        expect(browser.getCurrentUrl()).toContain('/settings/payments');
        expect(element(by.css('.payments-list')).isDisplayed()).toBe(true);
      });

      it('setting changeslog should be active after clicking ', function() {
          browser.sleep(3000);
          browser.wait(testUtils.until.visibilityOf(mainSettingsPage.getSettingsChangeLogsButton()));
          browser.wait(testUtils.until.elementToBeClickable(mainSettingsPage.getSettingsChangeLogsButton()));
          mainSettingsPage.getSettingsChangeLogsButton().click();
          browser.wait(testUtils.until.presenceOf(settingsChangeLogsPage.getSettingsChangeLogsView()));
          expect(browser.getCurrentUrl()).toContain('/settings/changelogs');
          expect(settingsChangeLogsPage.getSettingsChangeLogsView().isDisplayed()).toBe(true);
});
      it('setting application changelog tab should be active after clicking changelogs tab', function() {
        expect(element(by.css('ul.tabs li:nth-child(1).tabs-title.is-active')).isPresent()).toBeTruthy();
      });

      it('setting Business rules changelog tab should be active after clicking', function() {
        browser.sleep(3000);
        browser.wait(testUtils.until.visibilityOf(settingsChangeLogsPage.getBrChangeLogsTab()));
        browser.wait(testUtils.until.elementToBeClickable(settingsChangeLogsPage.getBrChangeLogsTab()));
        settingsChangeLogsPage.getBrChangeLogsTab().click();
        browser.wait(testUtils.until.presenceOf(element(by.css('ul.tabs li:nth-child(2).tabs-title.is-active'))));
        expect(element(by.css('ul.tabs li:nth-child(2).tabs-title.is-active')).isPresent()).toBeTruthy();
      });

      it('account subsection should be active after click', function() {
        mainSettingsPage.clickSettingsAccountButton();
        browser.wait(testUtils.waitUrl(/settings\/account/));
        expect(mainSettingsPage.getSettingsAccountView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/settings/account');
      });
    });

    describe('on info tab', function() {
      it('info tab should be active after click', function() {
        mainPage.clickInfoTab();
        browser.wait(testUtils.waitUrl(/help/));
        expect(helpViewPage.getHelpView().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/help');
      });

      it('info releaseNotes subsection is displayed by default', function() {
        expect(helpViewPage.getHelpReleaseNotes().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/help/releaseNotes');
      });

      it('info info subsection should be active after click', function() {
        helpViewPage.clickHelpInfo();
        browser.wait(testUtils.waitUrl(/help\/info/));
        expect(helpViewPage.getHelpInfo().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/help/info');
      });

      it('API doc subsection should be active after click', function() {
        helpViewPage.clickHelpAPIButton();
        browser.wait(testUtils.waitUrl(/help\/api/));
        expect(helpViewPage.getHelpAPI().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/help/api');
      });

      it('Woker connect subsection should be active after click', function() {
        helpViewPage.clickHelpWoC();
        browser.wait(testUtils.waitUrl(/help\/quickActivation/));
        expect(helpViewPage.getHelpWoC().isPresent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toContain('/help/quickActivation');
      });
    });
  });
})();
