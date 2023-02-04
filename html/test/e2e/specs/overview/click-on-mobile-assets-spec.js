(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainMapPage = require('./MainMapPage'),
    mainSettingsPage = require('./MainSettingsPage'),
    filterPanelPage = require('./FilterPanelPage'),
    settingsObjectsPage = require('./SettingsObjectsPage'),
    overViewPanelPage = require('./OverViewPanelPage');

  describe('On Overview Panel', function() {
    var map_cla,
      web_cla,
      mobileasset_name,
      info_expand_list;

    beforeAll(function() {
      info_expand_list = new Map();
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getMobileassetsSwitcher()));
      // filterPanelPage.clickFilterClearButton();
      filterPanelPage.clickMobileassetsSwitcher();
      filterPanelPage.clickMachinesSwitcher();
      filterPanelPage.clickStandalonesSwitcher();
      filterPanelPage.clickWorkersSwitcher();
      filterPanelPage.clickGeozonesSwitcher();
      browser.wait(testUtils.until.presenceOf(element(by.css('#showMobileassets.ng-not-empty'))));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel()));
      browser.wait(testUtils.until.presenceOf(mainPage.getOverviewBtn()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()));
      mainPage.clickOverViewButton();
      browser.wait(testUtils.until.presenceOf(overViewPanelPage.getOverviewGridRow(1)));
      browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getOverviewGridRow(1)));
      overViewPanelPage.clickOverviewGridRow(1);
      browser.wait(testUtils.until.visibilityOf(mainMapPage.getMapTooltipName()));
      browser.wait(testUtils.until.visibilityOf(mainMapPage.getMapTooltipAddress()));
      browser.wait(function() {
        return mainMapPage.getMapTooltipName().getAttribute('innerHTML').then(function(text) {
          return text != '';
        });
      });
      browser.wait(function() {
        return mainMapPage.getMapTooltipAddress().getAttribute('innerHTML').then(function(text) {
          return ((text != '') && (text != "Address not found"));
          // return (text != "");
        });
      });
    });

    afterAll(function() {
      mainPage.clickTrackingViewTab();
      browser.wait(testUtils.until.presenceOf(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.visibilityOf(filterPanelPage.getFilterPanel()));
      browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getFilterClearButton()));
      filterPanelPage.clickFilterClearButton();
      browser.wait(testUtils.until.presenceOf(element(by.css('#showGeozones.ng-not-empty'))));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel()));
    });

    describe('when clicked on mobile assets', function() {
      //name
      it('should have element name', function() {
        expect(overViewPanelPage.getMapElementName(1).isPresent()).toBe(true);
      });

      it('should have element name on map', function() {
        expect(mainMapPage.getMapTooltipName(1).isPresent()).toBe(true);
      });

      it('should have name same as web element', function() {
        expect(overViewPanelPage.getMapElementName(1).getText()).toBe(mainMapPage.getMapTooltipName().getText());
      });
      //status
      it('should have element status', function() {
        expect(overViewPanelPage.getMapElementStatus(1).isPresent()).toBe(true);
      });

      it('should have element status icon', function() {
        expect(overViewPanelPage.getMapElementStatusIcon(1).isPresent()).toBe(true);
      });

      it('should have element status on map', function() {
        expect(mainMapPage.getMapTooltipStatus().isPresent()).toBe(true);
      });

      it('should have status same as web element', function() {
        expect(overViewPanelPage.getMapElementStatus(1).getText()).toBe(mainMapPage.getMapTooltipStatus().getText());
      });

      it('element status icon color should be same as tooltip title color', function() {
        expect(mainMapPage.getMapElementPopup().element(by.css('.tooltip-title')).getCssValue('background-color')).toBe(overViewPanelPage.getMapElementStatusIcon(1).getCssValue('color'));
      });

      //status time
      it('should have same status time same as web element', function() {
        overViewPanelPage.getMapElementStatusTime(1).isPresent().then(function(isPresent) {
          if (isPresent) {
            expect(mainMapPage.getMapTooltipStatusTime().isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipStatusTime().getText()).toBe(overViewPanelPage.getMapElementStatusTime(1).getText());
          }
        });
      });
      //category
      it('should have category filed icon', function() {
        expect(overViewPanelPage.getMapElementCategoryFieldIcon(1).isPresent()).toBe(true);
      });

      it('should have category field', function() {
        expect(overViewPanelPage.getMapElementCategoryField(1).isPresent()).toBe(true);
      });

      it('should have tooltip category icon', function() {
        expect(mainMapPage.getMapTooltipCategoryIcon().isPresent()).toBe(true);
      });

      it('should have tooltip category field', function() {
        expect(mainMapPage.getMapTooltipCategory().isPresent()).toBe(true);
      });
      //category
      it('tooltip should have same category same as web element', function() {
        mainMapPage.getMapTooltipCategory().getText().then(function(text) {
          info_expand_list.set('category name', text);
          expect(text).toBe(overViewPanelPage.getMapElementCategoryField(1).getText());
        });
      });
      //category icon
      it('tooltip should have same category icon same as web element', function() {
        map_cla = mainMapPage.getMapTooltipCategoryIcon().getAttribute('class').then(function(cla) {
          cla = cla.replace("iconic-md", "");
          return cla.replace(/\s/g, '');
        });
        web_cla = overViewPanelPage.getMapElementCategoryFieldIcon(1).getAttribute('class').then(function(cla) {
          cla = cla.replace("iconic-md", "");
          return cla.replace(/\s/g, '');
        });
        info_expand_list.set('category icon', map_cla);
        expect(map_cla).toBe(web_cla);
      });
      //address
      it('tooltip should have same address same as web element', function() {
        overViewPanelPage.getMapElementAddressIcon(1).isPresent().then(function(isPresent) {
          if (isPresent) {
            expect(overViewPanelPage.getMapElementAddress(1).isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipAddressIcon().isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipAddress().isPresent()).toBe(true);
            expect(overViewPanelPage.getMapElementAddress(1).getText()).toBe(mainMapPage.getMapTooltipAddress().getText());
            map_cla = mainMapPage.getMapTooltipAddressIcon().getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              return cla.replace(/\s/g, '');
            });
            web_cla = overViewPanelPage.getMapElementAddressIcon(1).getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              return cla.replace(/\s/g, '');
            });
            expect(map_cla).toBe(web_cla);
          }
        });
      });
      //geozones list
      it('should have geozones list same as web element', function() {
        overViewPanelPage.getMapElementGeozonesList(1).isPresent().then(function(isPresent) {
          if (isPresent) {
            mainMapPage.getMapTooltipGeozonesList().each(function(elem) {
              expect(elem.element(by.css('span.iconic-md')).isPresent()).toBe(true);
              expect(elem.element(by.css('span.ng-binding')).isPresent()).toBe(true);
            });
            overViewPanelPage.getMapElementGeozonesList(1).each(function(elem, index) {
              expect(elem.element(by.css('span.iconic-md')).isPresent()).toBe(true);
              expect(elem.element(by.css('span.ng-binding')).isPresent()).toBe(true);
              expect(elem.element(by.css('span.iconic-md')).getCssValue('color')).toBe(mainMapPage.getMapTooltipGeozonesList().get(index).element(by.css('span.iconic-md')).getCssValue('color'));
              expect(elem.element(by.css('span.ng-binding')).getText()).toBe(mainMapPage.getMapTooltipGeozonesList().get(index).element(by.css('span.ng-binding')).getText());
              map_cla = mainMapPage.getMapTooltipGeozonesList().get(index).getAttribute('class').then(function(cla) {
                cla = cla.replace("iconic-md", "");
                return cla.replace(/\s/g, '');
              });
              web_cla = elem.element(by.css('span.iconic-md')).getAttribute('class').then(function(cla) {
                cla = cla.replace("iconic-md", "");
                return cla.replace(/\s/g, '');
              });
              expect(map_cla).toBe(web_cla);
            });
          }
        });
      });
      //open notifications
      it('tooltip should haveopen notifications same as web element', function() {
        overViewPanelPage.getMapElementOpenNotificationsBell(1).isPresent().then(function(isPresent) {
          if (isPresent) {
            expect(overViewPanelPage.getMapElementOpenNotificationsAlert(1).isPresent()).toBe(true);
            expect(overViewPanelPage.getMapElementOpenNotificationsWarning(1).isPresent()).toBe(true);
            expect(overViewPanelPage.getMapElementOpenNotificationsNoti(1).isPresent()).toBe(true);
            expect(overViewPanelPage.getMapElementOpenNotificationsCrossBell(1).isPresent()).toBe(true);
            expect(overViewPanelPage.getMapElementOpenNotificationsEyes(1).isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipOpenNotificationsBell().isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipOpenNotificationsAlert().isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipOpenNotificationsWarning().isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipOpenNotificationsNoti().isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipOpenNotificationsCrossBell().isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipOpenNotificationsCrossBell().isPresent()).toBe(true);
            expect(overViewPanelPage.getMapElementOpenNotificationsBell(1).getAttribute('class')).toContain('fi-bell');
            expect(overViewPanelPage.getMapElementOpenNotificationsCrossBell(1).getAttribute('class')).toContain('icon-bell-cross');
            expect(overViewPanelPage.getMapElementOpenNotificationsEyes(1).getAttribute('class')).toContain('fi-eye-open');
            expect(mainMapPage.getMapTooltipOpenNotificationsBell().getAttribute('class')).toContain('fi-bell');
            expect(mainMapPage.getMapTooltipOpenNotificationsCrossBell().getAttribute('class')).toContain('icon-bell-cross');
            expect(mainMapPage.getMapTooltipOpenNotificationsEyes().getAttribute('class')).toContain('fi-eye-open');
            expect(overViewPanelPage.getMapElementOpenNotificationsAlert(1).getText()).toBe(mainMapPage.getMapTooltipOpenNotificationsAlert().getText());
            expect(overViewPanelPage.getMapElementOpenNotificationsWarning(1).getText()).toBe(mainMapPage.getMapTooltipOpenNotificationsWarning().getText());
            expect(overViewPanelPage.getMapElementOpenNotificationsNoti(1).getText()).toBe(mainMapPage.getMapTooltipOpenNotificationsNoti().getText());
          }
        });
      });
      //last seen
      it('should have last seen same as web element', function() {
        overViewPanelPage.getLastSeenIcon(1).isPresent().then(function(isPresent) {
          if (isPresent) {
            expect(overViewPanelPage.getLastSeen(1).isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipLastSeen().isPresent()).toBe(true);
            expect(overViewPanelPage.getLastSeen(1).getText()).toBe(mainMapPage.getMapTooltipLastSeen().getText());
            map_cla = mainMapPage.getMapTooltipLastSeen().getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              return cla.replace(/\s/g, '');
            });
            web_cla = overViewPanelPage.getLastSeen(1).getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              return cla.replace(/\s/g, '');
            });
            expect(map_cla).toBe(web_cla);
          }
        });
      });
    });

    describe('when clicked on show details button', function() {
      beforeAll(function() {

        browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getMapTooltipShowDetals()));
        mainMapPage.clickMapTooltipShowDetails();
        browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipInfoExpandList()));
        browser.wait(function() {
          return mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText().then(function(text) {
            return text != '';
          });
        });
      });

      describe('when info expand appeared', function() {
        afterAll(function() {
          mainMapPage.getMapTooltipName().getText().then(function(name) {
            mobileasset_name = name;
          });
          mainMapPage.getMapTooltipInfoExpandList().each(function(elem) {
            elem.element(by.css('span.ng-binding')).getText().then(function(key) {
              if (key == "Group name") {
                key = "Group";
              }
              if (key == "Serial number") {
                key = "rfid id";
              }
              elem.element(by.css('div.ng-binding')).getText().then(function(value) {
                info_expand_list.set(key, value);
              });
            });
          });
        });

        it('should have element in info expand', function() {
          mainMapPage.getMapTooltipInfoExpandList().each(function(elem) {
            expect(elem.element(by.css('span.ng-binding')).isPresent()).toBe(true);
            expect(elem.element(by.css('div.ng-binding')).isPresent()).toBe(true);
          });
        });
      });

      describe('on settings mobile asset', function() {
        beforeAll(function() {
          mainPage.clickSettingsTab();
          browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsMobileassetsButton()));
          mainSettingsPage.clickSettingsMobileassetsButton();
          browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsMobileassetsView()));
          browser.wait(testUtils.until.elementToBeClickable(settingsObjectsPage.getSearchNameInput()));
          settingsObjectsPage.fillSearchNameInput(mobileasset_name);
          browser.wait(testUtils.until.stalenessOf(settingsObjectsPage.getLoadingMask()));
          browser.wait(testUtils.until.presenceOf(settingsObjectsPage.getGridRow(1)));
        });

        describe('compared with tracking overview mobileasset', function() {
          it('should have same reference', function() {
            if ((info_expand_list.has('Reference')) == true) {
              expect(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(1) span.ng-binding')).getText()).toBe(info_expand_list.get('Reference'));
            }
          });

          it('should have same group', function() {
            if ((info_expand_list.has('Group')) == true) {
              expect(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(5) span.ng-binding')).getAttribute('innerHTML')).toBe(info_expand_list.get('Group'));
            }
          });

          it('should have same rfid id', function() {
            if ((info_expand_list.has('rfid id')) == true) {
              expect(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(6) span.ng-binding')).getText()).toBe(info_expand_list.get('rfid id'));
            }
          });

          it('should have same category icon', function() {
            expect(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(3) span.iconic-md')).getAttribute('class')).toContain(info_expand_list.get('category icon'));
          });

          it('should have same category name', function() {
            expect(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(3) div.ng-binding')).getText()).toBe(info_expand_list.get('category name'));
          });
        });
      });
    });
  });
})();
