(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainMapPage = require('./MainMapPage'),
    mainSettingsPage = require('./MainSettingsPage'),
    filterPanelPage = require('./FilterPanelPage'),
    settingsVehiclesPage = require('./SettingsVehiclesPage'),
    overViewPanelPage = require('./OverViewPanelPage');

  describe('On Overview Panel', function() {
    var map_cla,
      web_cla,
      vehicle_name,
      info_expand_list;

    beforeAll(function() {
      info_expand_list = new Map();
      browser.wait(testUtils.until.presenceOf(mainPage.getFilterButton()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterClearButton()));
      browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getFilterClearButton()));
      filterPanelPage.clickFilterClearButton();
      browser.wait(testUtils.until.presenceOf(element(by.css('#showStandalones.ng-not-empty'))));
      filterPanelPage.clickMobileassetsSwitcher();
      filterPanelPage.clickMachinesSwitcher();
      filterPanelPage.clickStandalonesSwitcher();
      filterPanelPage.clickWorkersSwitcher();
      filterPanelPage.clickGeozonesSwitcher();
      browser.wait(testUtils.until.presenceOf(element(by.css('#showGeozones.ng-empty'))));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel()));
      browser.wait(testUtils.until.presenceOf(mainPage.getOverviewBtn()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()));
      mainPage.clickOverViewButton();
      browser.wait(testUtils.until.presenceOf(overViewPanelPage.getOverviewGridRow(1)));
      browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getOverviewGridRow(1)));
      overViewPanelPage.clickOverviewGridRow(1);
      browser.wait(testUtils.until.presenceOf(element(by.css('.overview-panel .k-grid-content tr:nth-of-type(1).k-state-selected .map-element-info'))));
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
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterClearButton()));
      filterPanelPage.clickFilterClearButton();
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel()));
    });

    describe('when clicked on vehicle', function() {
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
      it('should have status time same as web element', function() {
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

      it('tooltip should have category same as web element', function() {
        mainMapPage.getMapTooltipCategory().getText().then(function(text) {
          info_expand_list.set('category name', text);
          expect(text).toBe(overViewPanelPage.getMapElementCategoryField(1).getText());
        });
      });

      it('tooltip should have category icon same as web element', function() {
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
      it('tooltip should have address same as web element', function() {
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
              map_cla = mainMapPage.getMapTooltipGeozonesList().get(index).element(by.css('.small-2 span.iconic-md')).getAttribute('class').then(function(cla) {
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
      //temperature
      it('should have temperature same as web element', function() {
        overViewPanelPage.getMapElementTemperatureIcon(1).isPresent().then(function(isPresent) {
          if (isPresent) {
            expect(mainMapPage.getMapTooltipTemperatureIcon().isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipTemperatureNumber().isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipTemperatureDescription().isPresent()).toBe(true);
            expect(overViewPanelPage.getMapElementTemperatureNumber(1).isPresent()).toBe(true);
            expect(overViewPanelPage.getMapElementTemperatureDescription(1).isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipTemperatureNumber().getText()).toBe(overViewPanelPage.getMapElementTemperatureNumber(1).getText());
            expect(mainMapPage.getMapTooltipTemperatureDescription().getText()).toBe(overViewPanelPage.getMapElementTemperatureDescription(1).getText());
            map_cla = mainMapPage.getMapTooltipTemperatureIcon().getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              return cla.replace(/\s/g, '');
            });
            web_cla = overViewPanelPage.getMapElementTemperatureIcon(1).getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              return cla.replace(/\s/g, '');
            });
            expect(map_cla).toBe(web_cla);
          } else {
            overViewPanelPage.getMapElementUnknownTemperatureIcon(1).isPresent().then(function(present) {
              if (present) {
                expect(mainMapPage.getMapTooltipUnknownTemperatureIcon().isPresent()).toBe(true);
                expect(mainMapPage.getMapTooltipUnknownTemperature().isPresent()).toBe(true);
                expect(mainMapPage.getMapTooltipUnknownTemperature().getText()).toBe("Unknown");
                expect(overViewPanelPage.getMapElementUnknownTemperature(1).isPresent()).toBe(true);
                expect(overViewPanelPage.getMapElementUnknownTemperature(1).getText()).toBe("Unknown");
                map_cla = mainMapPage.getMapTooltipUnknownTemperatureIcon().getAttribute('class').then(function(cla) {
                  cla = cla.replace("iconic-md", "");
                  cla = cla.replace("tags-unknown", "");
                  return cla.replace(/\s/g, '');
                });
                web_cla = overViewPanelPage.getMapElementUnknownTemperatureIcon(1).getAttribute('class').then(function(cla) {
                  cla = cla.replace("iconic-md", "");
                  cla = cla.replace("tags-unknown", "");
                  return cla.replace(/\s/g, '');
                });
                expect(map_cla).toBe(web_cla);
              }
            });
          }
        });
      });
      //open notifications
      it('tooltip should have open notifications same as web element', function() {
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
      //equipments list
      it('tooltip should have emquipments same as web element', function() {
        overViewPanelPage.getEquipmentList(1).isPresent().then(function(isPresent1) {
          if (isPresent1) {
            overViewPanelPage.getEquipmentList(1).get(0).element(by.css('.small-2 span.iconic-md:not(.icon-blocked)')).isPresent().then(function(isPresent2) {
              if (isPresent2) {
                mainMapPage.getMapTooltipEquipmentsList().each(function(elem, index) {
                  expect(elem.element(by.css('.small-10 span.ng-binding')).isPresent()).toBe(true);
                  expect(overViewPanelPage.getEquipmentList(1).get(index).element(by.css('span.iconic-md')).isPresent()).toBe(true);
                  expect(overViewPanelPage.getEquipmentList(1).get(index).element(by.css('span.ng-binding')).isPresent()).toBe(true);
                  expect(overViewPanelPage.getEquipmentList(1).get(index).element(by.css('span.ng-binding')).getText()).toBe(elem.element(by.css('span.ng-binding')).getText());
                  expect(overViewPanelPage.getEquipmentList(1).get(index).element(by.css('span.iconic-md')).getCssValue('color')).toBe(elem.element(by.css('span.iconic-md')).getCssValue('color'));
                });
              } else {
                expect(mainMapPage.getMapTooltipEquipmentsList().get(0).element(by.css('.small-2 span.iconic-md.icon-blocked')).isPresent()).toBe(true);
                expect(mainMapPage.getMapTooltipEquipmentsList().get(0).element(by.css('div.small-10.ng-binding')).isPresent()).toBe(true);
                expect(mainMapPage.getMapTooltipEquipmentsList().get(0).element(by.css('div.small-10 a[ng-click="immobilize()"] span.icon-stop')).isPresent()).toBe(true);
                expect(mainMapPage.getMapTooltipEquipmentsList().get(0).element(by.css('div.small-10 a[ng-click="mobilize()"] span.icon-play3')).isPresent()).toBe(true);
                expect(overViewPanelPage.getEquipmentList(1).get(0).element(by.css('span.ng-binding')).isPresent()).toBe(true);
                expect(overViewPanelPage.getEquipmentList(1).get(0).element(by.css('span.ng-binding')).getText()).toBe(mainMapPage.getMapTooltipEquipmentsList().get(0).element(by.css('div.small-10.ng-binding')).getText());
              }

            });
          }
        });
      });
      //speed
      it('tooltip should have speed same as web element', function() {
        overViewPanelPage.getMapElementSpeedIcon(1).isPresent().then(function(isPresent) {
          if (isPresent) {
            expect(overViewPanelPage.getMapElementSpeed(1).isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipSpeed().isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipSpeedIcon().isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipSpeed().getText()).toBe(overViewPanelPage.getMapElementSpeed(1).getText());
            map_cla = mainMapPage.getMapTooltipSpeed().getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              return cla.replace(/\s/g, '');
            });
            web_cla = overViewPanelPage.getMapElementSpeed(1).getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              return cla.replace(/\s/g, '');
            });
            expect(map_cla).toBe(web_cla);
          }
        });
      });
      //last message
      it('tooltip should have tooltip time', function() {
        mainMapPage.getMapTooltipLastMessageIcon().isPresent().then(function(isPresent) {
          if (isPresent) {
            expect(mainMapPage.getMapTooltipLastMessage().isPresent()).toBe(true);
          }
        });
      });
      //driver
      it('tooltip should have driver same as web element', function() {
        overViewPanelPage.getMapElementDriverIcon(1).isPresent().then(function(isPresent) {
          if (isPresent) {
            expect(overViewPanelPage.getMapElementDriver(1).isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipDriverIcon().isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipDriver().isPresent()).toBe(true);
            expect(mainMapPage.getMapTooltipDriver().getText()).toBe(overViewPanelPage.getMapTooltipDriver(1).getText());
            map_cla = mainMapPage.getMapTooltipDriverIcon().getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              cla = cla.replace("ng-scope", "");
              return cla.replace(/\s/g, '');
            });
            web_cla = overViewPanelPage.getMapElementSpeed(1).getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              cla = cla.replace("ng-scope", "");
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
            vehicle_name = name;
          });
          mainMapPage.getMapTooltipInfoExpandList().each(function(elem) {
            elem.element(by.css('span.ng-binding')).getText().then(function(key) {
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

      describe('when on settings vehicle', function() {
        beforeAll(function() {
          mainPage.clickSettingsTab();
          browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsVehiclesButton()));
          mainSettingsPage.clickSettingsVehiclesButton();
          browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsVehiclesView()));
          browser.wait(testUtils.until.elementToBeClickable(settingsVehiclesPage.getSearchNameInput()));
          settingsVehiclesPage.fillSearchNameInput(vehicle_name);
          browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getLoadingMask()));
          browser.wait(testUtils.until.presenceOf(settingsVehiclesPage.getGridRow(1)));
        });

        describe('compared with tracking overview vehicle', function() {
          describe('on setting vehicle panel', function() {
            it('should have same reference', function() {
              if ((info_expand_list.has('Reference')) == true) {
                expect(settingsVehiclesPage.getGridRow(1).element(by.css('td:nth-child(4) span.ng-binding')).getText()).toBe(info_expand_list.get('Reference'));
              }
            });

            it('should have same group', function() {
              if ((info_expand_list.has('Group name')) == true) {
                expect(settingsVehiclesPage.getGridRow(1).element(by.css('td:nth-child(5) span.ng-binding')).getText()).toBe(info_expand_list.get('Group name'));
              }
            });

            it('should have same Licence plate', function() {
              if ((info_expand_list.has('Licence plate')) == true) {
                expect(settingsVehiclesPage.getGridRow(1).element(by.css('td:nth-child(2) span.ng-binding')).getText()).toBe(info_expand_list.get('Licence plate'));
              }
            });

            it('should have same category icon', function() {
              expect(settingsVehiclesPage.getGridRow(1).element(by.css('td:nth-child(3) span.iconic-md')).getAttribute('class')).toContain(info_expand_list.get('category icon'));
            });

            it('should have same category name', function() {
              expect(settingsVehiclesPage.getGridRow(1).element(by.css('td:nth-child(3) div.ng-binding')).getText()).toBe(info_expand_list.get('category name'));
            });
          });

          describe('on create modal general', function() {
            beforeAll(function() {
              settingsVehiclesPage.clickEditButtonOfGridRow(1);
              browser.wait(testUtils.until.presenceOf(settingsVehiclesPage.getCreateModal()));
            });

            it('should have same brand', function() {
              if ((info_expand_list.has('Brand')) == true) {
                expect(settingsVehiclesPage.getGeneralBrandInput().getAttribute('value')).toBe(info_expand_list.get('Brand'));
              }
            });

            it('should have same model', function() {
              if ((info_expand_list.has('Model')) == true) {
                expect(settingsVehiclesPage.getGeneralModelInput().getAttribute('value')).toBe(info_expand_list.get('Model'));
              }
            });
          });

          describe('on create modal maintenance', function() {
            beforeAll(function() {
              settingsVehiclesPage.clickMaintenanceTab();
              browser.wait(testUtils.until.visibilityOf(settingsVehiclesPage.getMaintenanceCurrentMileage().element(by.css('span.k-i-arrow-60-up'))));
            });

            afterAll(function() {
              settingsVehiclesPage.clickCancelButton();
              browser.wait(testUtils.until.stalenessOf(settingsVehiclesPage.getLoadingMask()));
            });

            it('should have same current mileage', function() {
              if ((info_expand_list.has('Current mileage')) == true) {
                expect(settingsVehiclesPage.getMaintenanceCurrentMileage().element(by.css('input:nth-child(1)')).getAttribute('aria-valuenow')).toBe(info_expand_list.get('Current mileage'));
              }
            });
          });
        });
      });
    });
  });
})();
