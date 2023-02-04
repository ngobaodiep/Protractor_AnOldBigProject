(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainMapPage = require('./MainMapPage'),
    mainSettingsPage = require('./MainSettingsPage'),
    settingsVehiclesPage = require('./SettingsVehiclesPage'),
    listViewPage = require('./ListViewPage');

  describe('on list view', function() {
    var map_cla,
      web_cla,
      vehicle_name,
      info_expand_list;

    beforeAll(function() {

      info_expand_list = new Map();
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getListViewButton()));
      mainPage.clickListViewButton();
      browser.wait(testUtils.until.stalenessOf(listViewPage.getLoadingMask()));
      browser.wait(testUtils.until.presenceOf(listViewPage.getListView()));
      browser.wait(testUtils.until.visibilityOf(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(8) span.ng-binding'))));
      browser.wait(testUtils.until.elementToBeClickable(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(8) span.ng-binding'))));
      browser.wait(testUtils.until.elementToBeClickable(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(1) span.ng-binding'))));
      listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(1) span.ng-binding')).click();
      browser.wait(testUtils.until.presenceOf(mainMapPage.getOverlayMapName()));
      browser.wait(testUtils.until.presenceOf(mainMapPage.getOverlayMapAddress()));
      browser.wait(function() {
        return mainMapPage.getOverlayMapAddress().getText().then(function(text) {
          return ((text != '') && (text != "Address not found"));
        });
      });
    });

    describe('when element tooltip off vehicle is shown', function() {
      //name
      it('should have vehicle name same as web element', function() {
        // expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(1) span.ng-binding')).getAttribute('innerHTML')).toEqual(mainMapPage.getOverlayMapName().getText());
        listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(1) span.ng-binding')).getAttribute('innerHTML').then(function(name){
        console.log("listview vehicle1 name = "+name);
        });

      });
      //status
      it('should have vehicle status same as web element', function() {
        // expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(3) div:nth-child(2).medium-10 strong.ng-binding')).getAttribute('innerHTML')).toEqual(mainMapPage.getOverlayMapStatus().getText());
        listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(3) div:nth-child(2).medium-10 strong.ng-binding')).getAttribute('innerHTML').then(function(text){
          console.log("status vehicle1 = "+text);
        });
      });

      //status time
      it('should have vehicle status time same as web element', function() {
        listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(3) div.medium-10 div.ng-binding')).getAttribute('innerHTML').then(function(text1) {
          mainMapPage.getOverlayMapStatusTime().getText().then(function(text2) {
            expect(listViewPage.convertTimeStringToSeconds(text1)).toBeLessThanOrEqual(listViewPage.convertTimeStringToSeconds(text2));
          });
        });
      });
      //status color
      it('should have vehicle status color same as web element', function() {
        // expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(3) div.medium-2 span.iconic-md')).getCssValue('color')).toBe(mainMapPage.getOverlayMapTooltip().element(by.css('.map-element-tooltip-header .tooltip-title')).getCssValue('background-color'));
        listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(3) div.medium-2 span.iconic-md')).getCssValue('color').then(function(color){
          console.log("vehicle1 color = "+color);
        });
      });
      //last message
      it('should have last message icon', function() {
        expect(mainMapPage.getOverlayMapLastMessageIcon().isPresent()).toBe(true);
      });

      it('should have last message same as web element', function() {
        listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(9) span.ng-binding')).getAttribute('innerHTML').then(function(webText) {
          mainMapPage.getOverlayMapLastMessage().getText().then(function(mapText) {
            // expect(webText.localeCompare(mapText)).toBeLessThanOrEqual(0);
            console.log("list view vehicle1 last message = "+mapText);
          });
        });
      });
      //category
      it('should have category icon', function() {
        expect(mainMapPage.getOverlayMapCategoryIcon().isPresent()).toBe(true);
      });

      it('should have category same as web element', function() {
        mainMapPage.getOverlayMapCategory().getText().then(function(text) {
          // info_expand_list.set('category name', text);
          console.log("category text = "+text);
        });
        expect(mainMapPage.getOverlayMapCategory().getText()).toEqual(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(4) div.medium-11.ng-binding')).getAttribute('innerHTML'));
      });

      it('should have category icon same as web element', function() {
        map_cla = mainMapPage.getOverlayMapCategoryIcon().getAttribute('class').then(function(cla) {
          cla = cla.replace("iconic-md", "");
          return cla.replace(/\s/g, '');
        });
        web_cla = listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(4) div.medium-1 span.iconic-md')).getAttribute('class').then(function(cla) {
          cla = cla.replace("iconic-md", "");
          return cla.replace(/\s/g, '');
        });
        info_expand_list.set('category icon', map_cla);
        expect(map_cla).toBe(web_cla);
      });
      //location
      it('should have location same as web element', function() {
        mainMapPage.getOverlayMapAddressIcon().isPresent().then(function(isPresent) {
          if (isPresent) {
            expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(8) div:nth-child(1).small-12 div.small-2 span.iconic-md')).isPresent()).toBe(true);
            expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(8) div:nth-child(1).small-12 div.small-10 span.ng-binding')).isPresent()).toBe(true);
            expect(mainMapPage.getOverlayMapAddress().isPresent()).toBe(true);
            listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(8) div:nth-child(1).small-12 div.small-10 span.ng-binding')).getAttribute('innerHTML').then(function(webText){
              console.log("Web text address list view vehicle = "+ webText);
            });
            mainMapPage.getOverlayMapAddress().getText().then(function(mapText){
              console.log("Map text address list view vehicle "+mapText);
            });
            expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(8) div:nth-child(1).small-12 div.small-10 span.ng-binding')).getAttribute('innerHTML')).toBe(mainMapPage.getOverlayMapAddress().getText());
            expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(8) div:nth-child(1).small-12 div.small-10 span.ng-binding')).getAttribute('innerHTML')).toContain("District du Jura-Nord vaudois, Vaud, CH");
            expect(mainMapPage.getOverlayMapAddress().getText()).toContain("District du Jura-Nord vaudois, Vaud, CH");
            map_cla = mainMapPage.getOverlayMapAddressIcon().getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              return cla.replace(/\s/g, '');
            });
            web_cla = listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(8) div:nth-child(1).small-12 div.small-2 span.iconic-md')).getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              return cla.replace(/\s/g, '');
            });
            expect(map_cla).toBe(web_cla);
          }
        });
      });
      //geozones list
      it('should have geozones list same as web element', function() {
        mainMapPage.getOverlayMapGeozonesList().isPresent().then(function(isPresent) {
          if (isPresent) {
            mainMapPage.getOverlayMapGeozonesList().each(function(elem, index) {
              expect(elem.element(by.css('div.small-2 span.iconic-md')).isPresent()).toBe(true);
              expect(elem.element(by.css('div.small-10 span.ng-binding')).isPresent()).toBe(true);
              expect(listViewPage.getVehiclesGridRow(1).all(by.css('td:nth-child(8) div[ng-repeat="geozone in geozones"]')).get(index).element(by.css('div.small-2 span.iconic-md')).isPresent()).toBe(true);
              expect(listViewPage.getVehiclesGridRow(1).all(by.css('td:nth-child(8) div[ng-repeat="geozone in geozones"]')).get(index).element(by.css('div.small-10 span.ng-binding')).isPresent()).toBe(true);
              expect(listViewPage.getVehiclesGridRow(1).all(by.css('td:nth-child(8) div[ng-repeat="geozone in geozones"]')).get(index).element(by.css('div.small-10 span.ng-binding')).getText()).toBe(elem.element(by.css('div.small-10 span.ng-binding')).getText());
              map_cla = elem.element(by.css('div.small-2 span.iconic-md')).getAttribute('class').then(function(cla) {
                cla = cla.replace("iconic-md", "");
                return cla.replace(/\s/g, '');
              });
              web_cla = listViewPage.getVehiclesGridRow(1).all(by.css('td:nth-child(8) div[ng-repeat="geozone in geozones"]')).get(index).element(by.css('div.small-2 span.iconic-md')).getAttribute('class').then(function(cla) {
                cla = cla.replace("iconic-md", "");
                return cla.replace(/\s/g, '');
              });
              expect(map_cla).toBe(web_cla);
            });
          }
        });
      });
      //speed
      it('should have speed same as web element', function() {
        mainMapPage.getOverlayMapSpeedIcon().isPresent().then(function(isPresent) {
          if (isPresent) {
            expect(mainMapPage.getOverlayMapSpeed().isPresent()).toBe(true);
            expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(7)')).isPresent()).toBe(true);
            expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(7)')).getText()).toEqual(mainMapPage.getOverlayMapSpeed().getText());
            mainMapPage.getOverlayMapSpeed().getText().then(function(speedd){
              console.log("speed listview vehicle = "+speedd);
            });
          }
        });
      });
      //equipment
      it('should have equipments same as web element', function() {
        mainMapPage.getOverlayMapEquipments().isPresent().then(function(isPresent) {
          if (isPresent) {
            mainMapPage.getOverlayMapEquipments().get(1).element(by.css('div.small-2 span.icon-blocked')).isPresent().then(function(present) {
              if (!present) {
                mainMapPage.getOverlayMapEquipments().each().then(function(elem, index) {
                  expect(elem.element(by.css('div.small-2 span.iconic-md')).isPresent()).toBe(true);
                  expect(elem.element(by.css('div.small-10 span.ng-binding')).isPresent()).toBe(true);
                  expect(listViewPage.getVehiclesGridRow(1).all(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"]')).get(index).element(by.css('div.small-2 span.iconic-md')).isPresent()).toBe(true);
                  expect(listViewPage.getVehiclesGridRow(1).all(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"]')).get(index).element(by.css('div.small-10 span.ng-binding')).isPresent()).toBe(true);
                  expect(listViewPage.getVehiclesGridRow(1).all(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"]')).get(index).element(by.css('div.small-10 span.ng-binding')).getText()).toBe(elem.element(by.css('div.small-10 span.ng-binding')).getText());
                  expect(listViewPage.getVehiclesGridRow(1).all(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"]')).get(index).element(by.css('div.small-2 span.iconic-md')).getCssValue('color')).toBe(elem.element(by.css('div.small-2 span.iconic-md')).getCssValue('color'));
                });
              } else {
                expect(mainMapPage.getOverlayMapEquipments().get(1).element(by.css('div.small-10 span.ng-binding')).isPresent()).toBe(true);
                expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"] div.small-2 span.iconic-md.icon-blocked')).isPresent()).toBe(true);
                expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"] div.small-10 span.ng-binding')).isPresent()).toBe(true);
                expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(6) div[ng-repeat="equipment in equipments"] div.small-10 span.ng-binding')).getText()).toBe(mainMapPage.getOverlayMapEquipments().get(1).element(by.css('div.small-10 span.ng-binding')).getText());
              }
            });
          }
        });
      });
      //temperature
      it('should have temperature same as web element', function() {
        mainMapPage.getOverlayMapTemperatureIcon().isPresent().then(function(isPresent1) {
          if (isPresent1) {
            expect(mainMapPage.getOverlayMapTemperatureNumber().isPresent()).toBe(true);
            expect(mainMapPage.getOverlayMapTemperatureTime().isPresent()).toBe(true);
            expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(5) .small-2.icon .fi-thermometer:not(.tags-unknown)')).isPresent()).toBe(true);
            expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(5) .small-10 .small-3.ng-binding')).isPresent()).toBe(true);
            expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(5) .small-10 .small-9.ng-binding')).isPresent()).toBe(true);
            expect(mainMapPage.getOverlayMapTemperatureNumber().getText()).toBe(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(5) .small-10 .small-3.ng-binding')).getAttribute('innerHTML'));
            expect(mainMapPage.getOverlayMapTemperatureTime().getText()).toBe(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(5) .small-10 .small-9.ng-binding')).getAttribute('innerHTML'));
          } else {
            mainMapPage.getOverlayMapUnknownTemperatureIcon().isPresent().then(function(isPresent3) {
              if (isPresent3) {
                //temperature unknown
                mainMapPage.getOverlayMapUnknownTemperatureDescription().isPresent().then(function(isPresent2) {
                  if (isPresent2) {
                    expect(mainMapPage.getOverlayMapUnknownTemperatureIcon().isPresent()).toBe(true);
                    expect(mainMapPage.getOverlayMapUnknownTemperatureDescription().isPresent()).toBe(true);
                    expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(5) .small-2.icon .fi-thermometer.tags-unknown')).isPresent()).toBe(true);
                    expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(5) .small-10.unknown')).isPresent()).toBe(true);
                    expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(5) .small-10.unknown')).getAttribute('innerHTML')).toBe(mainMapPage.getOverlayMapUnknownTemperatureDescription().getText());
                  } else {
                    //temperature nosignal
                    expect(mainMapPage.getOverlayMapUnknownTemperatureIcon().isPresent()).toBe(true);
                    expect(mainMapPage.getOverlayMapNoSignalTemparature().isPresent()).toBe(true);
                    expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(5) .small-2.icon .fi-thermometer.tags-unknown')).isPresent()).toBe(true);
                    expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(5) .small-10 div.ng-binding')).isPresent()).toBe(true);
                    expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(5) .small-10 div.ng-binding')).getAttribute('innerHTML')).toBe(mainMapPage.getOverlayMapNoSignalTemparature().getText());
                  }
                });
              }
            });
          }
        });
      });
      //driver
      it('should have driver same as web element', function() {
        mainMapPage.getOverlayMapDriverIcon().isPresent().then(function(isPresent) {
          if (isPresent) {
            expect(mainMapPage.getOverlayMapDriver().isPresent()).toBe(true);
            expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(2) .small-2 span.icon-steering-wheel')).isPresent()).toBe(true);
            expect(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(2) .small-10 span.ng-binding')).isPresent()).toBe(true);
            expect(mainMapPage.getOverlayMapDriver().getText()).toBe(listViewPage.getVehiclesGridRow(1).element(by.css('td:nth-child(2) .small-10 span.ng-binding')).getAttribute('innerHTML'));
          }
        });
      });
    });

    describe('when expand list button clicked', function() {
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
            vehicle_name = name;
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
    describe('on settings vehicle', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(mainPage.getSettingsTab()));
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
              expect(info_expand_list.get('Reference')).toBe(settingsVehiclesPage.getGridRow(1).element(by.css('td:nth-child(4) span.ng-binding')).getText());
            }
          });
    
          it('should have same group', function() {
            if ((info_expand_list.has('Group name')) == true) {
              expect(info_expand_list.get('Group name')).toBe(settingsVehiclesPage.getGridRow(1).element(by.css('td:nth-child(5) span.ng-binding')).getText());
            }
          });
    
          it('should have same Licence plate', function() {
            if ((info_expand_list.has('Licence plate')) == true) {
              expect(info_expand_list.get('Licence plate')).toBe(settingsVehiclesPage.getGridRow(1).element(by.css('td:nth-child(2) span.ng-binding')).getText());
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
              expect(info_expand_list.get('Brand')).toBe(settingsVehiclesPage.getGeneralBrandInput().getAttribute('value'));
            }
          });
    
          it('should have same model', function() {
            if ((info_expand_list.has('Model')) == true) {
              expect(info_expand_list.get('Model')).toBe(settingsVehiclesPage.getGeneralModelInput().getAttribute('value'));
            }
          });
    
          it('should have same note', function() {
            if ((info_expand_list.has('Note')) == true) {
              expect(info_expand_list.get('Note')).toBe(settingsVehiclesPage.getGeneralNote().getAttribute('value'));
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
              expect(info_expand_list.get('Current mileage')).toBe(settingsVehiclesPage.getMaintenanceCurrentMileage().element(by.css('input:nth-child(1)')).getAttribute('aria-valuenow'));
            }
          });
        });
      });
    });
  });
})();
