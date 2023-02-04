(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainMapPage = require('./MainMapPage'),
    mainSettingsPage = require('./MainSettingsPage'),
    settingsMachinesPage = require('./SettingsMachinesPage'),
    listViewPage = require('./ListViewPage');

  describe('on list view', function() {
    var map_cla,
    checked,
      web_cla,
      machine_name,
      info_expand_list;

    beforeAll(function() {
      info_expand_list = new Map();
      checked = false;
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getTrackingTab()));
      mainPage.clickTrackingViewTab();
      browser.wait(testUtils.until.presenceOf(mainPage.getTrackingView()));
      browser.wait(testUtils.until.presenceOf(listViewPage.getListViewButton()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getListViewButton()));
      mainPage.clickListViewButton();
      browser.wait(testUtils.until.presenceOf(listViewPage.getListView()));
      browser.wait(testUtils.until.stalenessOf(listViewPage.getLoadingMask()));
      browser.wait(testUtils.until.presenceOf(listViewPage.getMachinesTab()));
      listViewPage.clickMachinesTab();
      browser.wait(testUtils.until.stalenessOf(listViewPage.getLoadingMask()));
      browser.wait(testUtils.until.presenceOf(listViewPage.getMachinesGridRow(1)));
      browser.wait(testUtils.until.visibilityOf(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(6) .small-10 span.ng-binding'))));
      browser.wait(testUtils.until.elementToBeClickable(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(6) .small-10 span.ng-binding'))));
      browser.wait(function() {
        return listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(6) .small-10 span.ng-binding')).getAttribute('innerHTML').then(function(text) {
          return text != "";
        });
      });
      listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(1) span.ng-binding')).click();
      browser.wait(testUtils.until.presenceOf(mainMapPage.getOverlayMapAddress()));
      browser.wait(function() {
        return mainMapPage.getOverlayMapAddress().getAttribute('innerHTML').then(function(text) {
          return (text != "") && (text != "Address not found");
          // return (text != "");
        });
      });
    });

    describe('when element tooltip of machine shown', function() {
      //name
      it('should have same machine name as web element', function() {
        expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(1) span.ng-binding')).getText()).toBe(mainMapPage.getOverlayMapName().getText());
      });
      //status
      it('should have same machine status as web element', function() {
        expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(3) .medium-10 strong.ng-binding')).getText()).toBe(mainMapPage.getOverlayMapStatus().getText());
      });

      //status time
      it('should have same machine status time as web element', function() {

        expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(3) div.medium-10 div.ng-binding')).isPresent()).toBe(true);
        expect(mainMapPage.getOverlayMapStatusTime().isPresent()).toBe(true);
        listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(3) div.medium-10 div.ng-binding')).getText().then(function(text1) {
          mainMapPage.getOverlayMapStatusTime().getText().then(function(text2) {
            expect(listViewPage.convertTimeStringToSeconds(text1)).toBeLessThanOrEqual(listViewPage.convertTimeStringToSeconds(text2));
          });
        });
      });
      //status color
      it('should have same machine status color as web element', function() {
        expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(3) div.medium-2 span.iconic-md')).getCssValue('color')).toBe(mainMapPage.getOverlayMapTooltip().element(by.css('.map-element-tooltip-header .tooltip-title')).getCssValue('background-color'));
      });
      //timestamp
      it('should have last message icon', function() {
        expect(mainMapPage.getOverlayMapLastMessageIcon().isPresent()).toBe(true);
      });

      it('should have same last message as web element', function() {
        // expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(7) span.ng-binding')).getAttribute('innerHTML')).toBe(mainMapPage.getOverlayMapLastMessage().getText());
        listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(7) span.ng-binding')).getAttribute('innerHTML').then(function(web_time) {
          var time1 = web_time.split(" ");
          var hours1 = time1[1].split(":");
          mainMapPage.getOverlayMapLastMessage().getText().then(function(map_time) {
            var time2 = map_time.split(" ");
            var hours2 = time2[1].split(":");
            expect(time1[0]).toBe(time2[0]);
            expect(hours1[0] * 60 + hours1[1]).toBeLessThanOrEqual(hours2[0] * 60 + hours2[1]);
          });
        });
      });
      //category
      it('should have category icon', function() {
        expect(mainMapPage.getOverlayMapCategoryIcon().isPresent()).toBe(true);
      });

      it('should have same category as web element', function() {
        mainMapPage.getOverlayMapCategory().getText().then(function(text) {
          info_expand_list.set('category name', text);
        });
        expect(mainMapPage.getOverlayMapCategory().getText()).toBe(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(4) div.medium-11.ng-binding')).getAttribute('innerHTML'));
      });

      it('should have same category icon as web element', function() {
        map_cla = mainMapPage.getOverlayMapCategoryIcon().getAttribute('class').then(function(cla) {
          cla = cla.replace("iconic-md", "");
          return cla.replace(/\s/g, '');
        });
        web_cla = listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(4) div.medium-1 span.iconic-md')).getAttribute('class').then(function(cla) {
          cla = cla.replace("iconic-md", "");
          return cla.replace(/\s/g, '');
        });
        info_expand_list.set('category icon', map_cla);
        expect(map_cla).toBe(web_cla);
      });
      //location
      it('should have the same location as web element', function() {
        mainMapPage.getOverlayMapAddressIcon().isPresent().then(function(isPresent) {
          if (isPresent) {
            checked = false;
            expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(6) div.small-2 span.iconic-md')).isPresent()).toBe(true);
            expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(6) div.small-10 span.ng-binding')).isPresent()).toBe(true);
            expect(mainMapPage.getOverlayMapAddress().isPresent()).toBe(true);
            expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(6) div.small-10 span.ng-binding')).getText()).toContain(" Basel-Landschaft, CH");
            // expect(mainMapPage.getOverlayMapAddress().getText()).toContain("Laufen, Basel-Landschaft, CH");
            mainMapPage.getOverlayMapAddress().getText().then(function(address){
              checked = ['Wahlen, Basel-Landschaft, CH','Laufen, Basel-Landschaft, CH'].some(function(x){
                if(address.includes(x)){
                  checked = true;
                }else {
                  checked = false;
                }
              });
              expect(checked).toBe(true);
            });
            map_cla = mainMapPage.getOverlayMapAddressIcon().getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              return cla.replace(/\s/g, '');
            });
            web_cla = listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(6) div.small-2 span.iconic-md')).getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              return cla.replace(/\s/g, '');
            });
            // expect(map_cla).toBe(web_cla);
          }
        });
      });
      //geozones list
      it('should have same geozones list as web element', function() {
        mainMapPage.getOverlayMapGeozonesList().isPresent().then(function(isPresent) {
          if (isPresent) {
            mainMapPage.getOverlayMapGeozonesList().each(function(elem, index) {
              expect(elem.element(by.css('div.small-2 span.iconic-md')).isPresent()).toBe(true);
              expect(elem.element(by.css('div.small-10 span.ng-binding')).isPresent()).toBe(true);
              expect(listViewPage.getMachinesGridRow(1).all(by.css('td:nth-child(6) div[ng-repeat="geozone in geozones"]')).get(index).element(by.css('div.small-2 span.iconic-md')).isPresent()).toBe(true);
              expect(listViewPage.getMachinesGridRow(1).all(by.css('td:nth-child(6) div[ng-repeat="geozone in geozones"]')).get(index).element(by.css('div.small-10 span.ng-binding')).isPresent()).toBe(true);
              expect(listViewPage.getMachinesGridRow(1).all(by.css('td:nth-child(6) div[ng-repeat="geozone in geozones"]')).get(index).element(by.css('div.small-10 span.ng-binding')).getText()).toBe(elem.element(by.css('div.small-10 span.ng-binding')).getText());
              map_cla = elem.element(by.css('div.small-2 span.iconic-md')).getAttribute('class').then(function(cla) {
                cla = cla.replace("iconic-md", "");
                return cla.replace(/\s/g, '');
              });
              web_cla = listViewPage.getMachinesGridRow(1).all(by.css('td:nth-child(6) div[ng-repeat="geozone in geozones"]')).get(index).element(by.css('div.small-2 span.iconic-md')).getAttribute('class').then(function(cla) {
                cla = cla.replace("iconic-md", "");
                return cla.replace(/\s/g, '');
              });
              expect(map_cla).toBe(web_cla);
            });
          }
        });
      });
      //speed
      it('should have same speed as web element', function() {
        mainMapPage.getOverlayMapSpeedIcon().isPresent().then(function(isPresent) {
          if (isPresent) {
            expect(mainMapPage.getOverlayMapSpeed().isPresent()).toBe(true);
            expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(5)')).isPresent()).toBe(true);
            expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(5)')).getText()).toBeLessThanOrEqual(mainMapPage.getOverlayMapSpeed().getText());
          }
        });
      });
      //equipment
      it('should have same equipments as web element', function() {
        mainMapPage.getOverlayMapEquipments().isPresent().then(function(isPresent) {
          if (isPresent) {
            mainMapPage.getOverlayMapEquipments().get(1).element(by.css('div.small-2 span.icon-blocked')).isPresent().then(function(present) {
              if (!present) {
                mainMapPage.getOverlayMapEquipments().each().then(function(elem, index) {
                  expect(elem.element(by.css('div.small-2 span.iconic-md')).isPresent()).toBe(true);
                  expect(elem.element(by.css('div.small-10 span.ng-binding')).isPresent()).toBe(true);
                  expect(listViewPage.getMachinesGridRow(1).all(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"]')).get(index).element(by.css('div.small-2 span.iconic-md')).isPresent()).toBe(true);
                  expect(listViewPage.getMachinesGridRow(1).all(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"]')).get(index).element(by.css('div.small-10 span.ng-binding')).isPresent()).toBe(true);
                  expect(listViewPage.getMachinesGridRow(1).all(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"]')).get(index).element(by.css('div.small-10 span.ng-binding')).getText()).toBe(elem.element(by.css('div.small-10 span.ng-binding')).getText());
                  expect(listViewPage.getMachinesGridRow(1).all(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"]')).get(index).element(by.css('div.small-2 span.iconic-md')).getCssValue('color')).toBe(elem.element(by.css('div.small-2 span.iconic-md')).getCssValue('color'));
                });
              } else {
                expect(mainMapPage.getOverlayMapEquipments().get(1).element(by.css('div.small-10 span.ng-binding')).isPresent()).toBe(true);
                expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"] div.small-2 span.iconic-md.icon-blocked')).isPresent()).toBe(true);
                expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"] div.small-10 span.ng-binding')).isPresent()).toBe(true);
                expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"] div.small-10 span.ng-binding')).getText()).toBe(mainMapPage.getOverlayMapEquipments().get(1).element(by.css('div.small-10 span.ng-binding')).getText());
              }
            });
          }
        });
      });
      //driver
      it('should have same driver as web element', function() {
        mainMapPage.getOverlayMapDriverIcon().isPresent().then(function(isPresent) {
          if (isPresent) {
            expect(mainMapPage.getOverlayMapDriver().isPresent()).toBe(true);
            expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(2) .small-2 span.icon-steering-wheel')).isPresent()).toBe(true);
            expect(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(2) .small-10 span.ng-binding')).isPresent()).toBe(true);
            expect(mainMapPage.getOverlayMapDriver().getText()).toBe(listViewPage.getMachinesGridRow(1).element(by.css('td:nth-child(2) .small-10 span.ng-binding')).getAttribute('innerHTML'));
          }
        });
      });
    });

    describe('when expand machine list button clicked', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getOverlayMapShowDetailsBtn()));
        mainMapPage.clickOverlayMapShowDetailsBtn();
        browser.wait(testUtils.until.presenceOf(mainMapPage.getOverlayMapExpandList()));
        browser.wait(function() {
          return mainMapPage.getOverlayMapExpandList().get(0).element(by.css('div.small-6.ng-binding')).getText().then(function(text) {
            return text != '';
          });
        });
      });

      afterAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getOverlayMapCloseBtn()));
        mainMapPage.clickOverlayMapCloseBtn();
      });

      describe('when expand list shown', function() {
        afterAll(function() {
          mainMapPage.getOverlayMapName().getText().then(function(name) {
            machine_name = name;
          });
          mainMapPage.getOverlayMapExpandList().each(function(elem) {
            elem.element(by.css('span.ng-binding')).getText().then(function(key) {
              elem.element(by.css('div.ng-binding')).getText().then(function(value) {
                info_expand_list.set(key, value);
              });
            });
          });
        });

        it('should have element in info expand', function() {
          mainMapPage.getOverlayMapExpandList().each(function(elem) {
            expect(elem.element(by.css('span.ng-binding')).isPresent()).toBe(true);
            expect(elem.element(by.css('div.ng-binding')).isPresent()).toBe(true);
          });
        });
      });
    });
    describe('when on settings machine', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(mainPage.getSettingsTab()));
        mainPage.clickSettingsTab();
        browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsMachinesButton()));
        mainSettingsPage.clickSettingsMachinesButton();
        browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsMachinesView()));
        browser.wait(testUtils.until.elementToBeClickable(settingsMachinesPage.getSearchNameInput()));
        settingsMachinesPage.fillSearchNameInput(machine_name);
        browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(settingsMachinesPage.getGridRow(1)));
      });

      describe('compared with tracking overview machine', function() {
        describe('on setting machine panel', function() {
          it('should have same current hours', function() {
            if ((info_expand_list.has('Hour meter')) == true) {
              expect(settingsMachinesPage.getGridRow(1).element(by.css('td:nth-child(5) span.ng-binding')).getText()).toBe(info_expand_list.get('Hour meter'));
            }
          });
        });
        describe('on create modal general', function() {
          beforeAll(function() {
            browser.executeScript("arguments[0].click();", settingsMachinesPage.getGridRow(1).element(by.css('a[ng-click="editMachine($event)"]')).getWebElement());
            browser.wait(testUtils.until.presenceOf(settingsMachinesPage.getCreateModal()));
            browser.wait(testUtils.until.presenceOf(settingsMachinesPage.getGeneralCategoryBtn().element(by.css('.medium-11.ng-binding'))));
            browser.wait(function() {
              return settingsMachinesPage.getGeneralCategory().element(by.css('.medium-11.ng-binding')).getAttribute('innerHTML').then(function(text) {
                return text != "";
              });
            });
          });

          it('should have same reference', function() {
            if ((info_expand_list.has('Reference')) == true) {
              expect(settingsMachinesPage.getMachineReferentInput().getAttribute('value')).toBe(info_expand_list.get('Reference'));
            }
          });

          it('should have same group', function() {
            if ((info_expand_list.has('Group name')) == true) {
              expect(settingsMachinesPage.getMachineGroup().getText()).toBe(info_expand_list.get('Group name'));
            }
          });

          it('should have same Licence plate', function() {
            if ((info_expand_list.has('Licence plate')) == true) {
              expect(settingsMachinesPage.getGeneralLicencePlateInput().getAttribute('value')).toBe(info_expand_list.get('Licence plate'));
            }
          });

          it('should have same category icon', function() {
            expect(settingsMachinesPage.getGeneralCategory().element(by.css('.medium-1 span.iconic-md')).getAttribute('class')).toContain(info_expand_list.get('category icon'));
          });

          it('should have same category name', function() {
            expect(settingsMachinesPage.getGeneralCategory().element(by.css('.medium-11.ng-binding')).getText()).toBe(info_expand_list.get('category name'));
          });

          it('should have same brand', function() {
            if ((info_expand_list.has('Brand')) == true) {
              expect(settingsMachinesPage.getMachineBrand().getAttribute('value')).toBe(info_expand_list.get('Brand'));
            }
          });

          it('should have same model', function() {
            if ((info_expand_list.has('Model')) == true) {
              expect(settingsMachinesPage.getMachineModel().getAttribute('value')).toBe(info_expand_list.get('Model'));
            }
          });

          it('should have same note', function() {
            if ((info_expand_list.has('Note')) == true) {
              expect(settingsMachinesPage.getMachineNote().getAttribute('value')).toBe(info_expand_list.get('Note'));
            }
          });
        });

        describe('on create modal maintenance', function() {
          beforeAll(function() {
            settingsMachinesPage.clickMaintenanceTab();
            browser.wait(testUtils.until.presenceOf(element(by.css('.create-modal ul li.tabs-title.is-active[heading="Maintenance"]'))));
          });

          afterAll(function() {
            settingsMachinesPage.clickCancelButton();
            browser.wait(testUtils.until.stalenessOf(settingsMachinesPage.getLoadingMask()));
          });

          it('should have same date of service', function() {
            if ((info_expand_list.has('Date of next service')) == true) {
              expect(element(by.css('input[k-ng-model="machine.dateOfNextService"]')).getAttribute('value')).toBe(info_expand_list.get('Date of next service'));
            }
          });

          it('should have same Technical control mileage', function() {
            if ((info_expand_list.has('Technical control mileage')) == true) {
              expect(element(by.css('input[k-ng-model="machine.technicalControlMileage"]')).getAttribute('value')).toBe(info_expand_list.get('Technical control mileage'));
            }
          });

          it('should have same Technical control hours', function() {
            if ((info_expand_list.has('Technical control hours')) == true) {
              expect(element(by.css('input[k-ng-model="machine.technicalControlHour"]')).getAttribute('value')).toBe(info_expand_list.get('Technical control hours'));
            }
          });
        });
      });
    });
  });
})();
