(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    settingsRolePage = require('./SettingsRolePage'),
    mainSettingsPage = require('./MainSettingsPage');

  describe('on settings role', function() {
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsRoleButton()));
      mainSettingsPage.clickSettingsRolesButton();
    });

    describe('check columns', function() {

      it('role name column should be active', function() {
        expect(settingsRolePage.getColumnName().isPresent()).toBe(true);
        expect(settingsRolePage.getColumnName().isDisplayed()).toBe(true);
      });

      it('groups column should be active', function() {
        expect(settingsRolePage.getColumnGroups().isPresent()).toBe(true);
        expect(settingsRolePage.getColumnGroups().isDisplayed()).toBe(true);
      });

      it('vehicles column should be active', function() {
        expect(settingsRolePage.getColumnVehicles().isPresent()).toBe(true);
        expect(settingsRolePage.getColumnVehicles().isDisplayed()).toBe(true);
      });

      it('geozones column should be active', function() {
        expect(settingsRolePage.getColumnGeozones().isPresent()).toBe(true);
        expect(settingsRolePage.getColumnGeozones().isDisplayed()).toBe(true);
      });

      it('bussiness rules column should be active', function() {
        expect(settingsRolePage.getColumnBussinessRules().isPresent()).toBe(true);
        expect(settingsRolePage.getColumnBussinessRules().isDisplayed()).toBe(true);
      });

      it('users column should be active', function() {
        expect(settingsRolePage.getColumnUsers().isPresent()).toBe(true);
        expect(settingsRolePage.getColumnUsers().isDisplayed()).toBe(true);
      });

      it('settings module column should be active', function() {
        expect(settingsRolePage.getColumnSettingsModule().isPresent()).toBe(true);
        expect(settingsRolePage.getColumnSettingsModule().isDisplayed()).toBe(true);
      });

      it('tracking module column should be active', function() {
        expect(settingsRolePage.getColumnTrackingModule().isPresent()).toBe(true);
        expect(settingsRolePage.getColumnTrackingModule().isDisplayed()).toBe(true);
      });

      it('report module column should be active', function() {
        expect(settingsRolePage.getColumnReportsModule().isPresent()).toBe(true);
        expect(settingsRolePage.getColumnReportsModule().isDisplayed()).toBe(true);
      });

      it('history module column should be active', function() {
        expect(settingsRolePage.getColumnHistoryModule().isPresent()).toBe(true);
        expect(settingsRolePage.getColumnHistoryModule().isDisplayed()).toBe(true);
      });
    });

    describe('check roles', function() {

      it('on livetracking row', function() {
        expect(settingsRolePage.getGridRow(1).element(by.css('td:nth-of-type(1)')).getText()).toEqual('Livetracking');
        expect(settingsRolePage.getGridRow(1).element(by.css('td:nth-of-type(2)')).getText()).toEqual('Read');
        expect(settingsRolePage.getGridRow(1).element(by.css('td:nth-of-type(3)')).getText()).toEqual('Read');
        expect(settingsRolePage.getGridRow(1).element(by.css('td:nth-of-type(4)')).getText()).toEqual('Read');
        expect(settingsRolePage.getGridRow(1).element(by.css('td:nth-of-type(5)')).getText()).toEqual('None');
        expect(settingsRolePage.getGridRow(1).element(by.css('td:nth-of-type(6)')).getText()).toEqual('None');
        expect(settingsRolePage.getGridRow(1).element(by.css('td:nth-of-type(7)')).getText()).toEqual('None');
        expect(settingsRolePage.getGridRow(1).element(by.css('td:nth-of-type(8)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(1).element(by.css('td:nth-of-type(9)')).getText()).toEqual('None');
        expect(settingsRolePage.getGridRow(1).element(by.css('td:nth-of-type(10)')).getText()).toEqual('None');
      });

      it('on manager row', function() {
        expect(settingsRolePage.getGridRow(2).element(by.css('td:nth-of-type(1)')).getText()).toEqual('Manager');
        expect(settingsRolePage.getGridRow(2).element(by.css('td:nth-of-type(2)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(2).element(by.css('td:nth-of-type(3)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(2).element(by.css('td:nth-of-type(4)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(2).element(by.css('td:nth-of-type(5)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(2).element(by.css('td:nth-of-type(6)')).getText()).toEqual('Read');
        expect(settingsRolePage.getGridRow(2).element(by.css('td:nth-of-type(7)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(2).element(by.css('td:nth-of-type(8)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(2).element(by.css('td:nth-of-type(9)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(2).element(by.css('td:nth-of-type(10)')).getText()).toEqual('Write');
      });

      it('on admin row', function() {
        expect(settingsRolePage.getGridRow(3).element(by.css('td:nth-of-type(1)')).getText()).toEqual('Admin');
        expect(settingsRolePage.getGridRow(3).element(by.css('td:nth-of-type(2)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(3).element(by.css('td:nth-of-type(3)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(3).element(by.css('td:nth-of-type(4)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(3).element(by.css('td:nth-of-type(5)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(3).element(by.css('td:nth-of-type(6)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(3).element(by.css('td:nth-of-type(7)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(3).element(by.css('td:nth-of-type(8)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(3).element(by.css('td:nth-of-type(9)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(3).element(by.css('td:nth-of-type(10)')).getText()).toEqual('Write');
      });

      it('on dispatcher row', function() {
        expect(settingsRolePage.getGridRow(4).element(by.css('td:nth-of-type(1)')).getText()).toEqual('Dispatcher');
        expect(settingsRolePage.getGridRow(4).element(by.css('td:nth-of-type(2)')).getText()).toEqual('Read');
        expect(settingsRolePage.getGridRow(4).element(by.css('td:nth-of-type(3)')).getText()).toEqual('Read');
        expect(settingsRolePage.getGridRow(4).element(by.css('td:nth-of-type(4)')).getText()).toEqual('Read');
        expect(settingsRolePage.getGridRow(4).element(by.css('td:nth-of-type(5)')).getText()).toEqual('None');
        expect(settingsRolePage.getGridRow(4).element(by.css('td:nth-of-type(6)')).getText()).toEqual('None');
        expect(settingsRolePage.getGridRow(4).element(by.css('td:nth-of-type(7)')).getText()).toEqual('None');
        expect(settingsRolePage.getGridRow(4).element(by.css('td:nth-of-type(8)')).getText()).toEqual('Write');
        expect(settingsRolePage.getGridRow(4).element(by.css('td:nth-of-type(9)')).getText()).toEqual('Read');
        expect(settingsRolePage.getGridRow(4).element(by.css('td:nth-of-type(10)')).getText()).toEqual('Read');
      });
    });
  });
})();
