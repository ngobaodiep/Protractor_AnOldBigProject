(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainMapPage = require('./MainMapPage'),
    filterPanelPage = require('./FilterPanelPage'),
    overViewPanelPage = require('./OverViewPanelPage.js');

  describe('check filter panel ', function() {
    var count,
    checked;
    beforeAll(function() {
      mainPage.clickTrackingViewTab();
      browser.wait(testUtils.until.presenceOf(mainPage.getFilterButton()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.visibilityOf(filterPanelPage.getFilterPanel()));
      browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getFilterClearButton()));
      filterPanelPage.clickFilterClearButton();
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel().element(by.css('#showGeozones.ng-not-empty'))));
      filterPanelPage.clickMachinesSwitcher();
      filterPanelPage.clickMobileassetsSwitcher();
      filterPanelPage.clickWorkersSwitcher();
      filterPanelPage.clickStandalonesSwitcher();
      filterPanelPage.clickGeozonesSwitcher();
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel().element(by.css('#showGeozones.ng-empty'))));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel()));
    });

    afterAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()));
      mainPage.clickOverViewButton();
      browser.wait(testUtils.until.stalenessOf(overViewPanelPage.getOverviewPanel()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.visibilityOf(filterPanelPage.getFilterPanel()));
      browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getFilterClearButton()));
      filterPanelPage.clickFilterClearButton();
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel()));
    });
    describe('on overview panel ', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()));
        mainPage.clickOverViewButton();
        browser.wait(testUtils.until.presenceOf(overViewPanelPage.getOverviewPanel()));
      });
      describe('when first vehicle clicked ', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.presenceOf(overViewPanelPage.getOverviewGridRow(1)));
          browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getOverviewGridRow(1)));
          overViewPanelPage.getOverviewGridRow(1).click();
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapElementPopup()));
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipName()));
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipAddress()));
          browser.wait(function() {
            return mainMapPage.getMapTooltipName().getAttribute('innerHTML').then(function(text) {
              return (text != "");
            });
          });
          browser.wait(function() {
            return mainMapPage.getMapTooltipAddress().getAttribute('innerHTML').then(function(text) {
              return (text != "") && (text != "Address not found");
              // return (text != "");
            });
          });
        });

        it('on overview name should be classc ', function() {
          console.log("=========================\n");
          expect(overViewPanelPage.getMapElementName(1).getText()).toBe('classc');
        });

        it('on map name should be classc ', function() {
          console.log("=========================\n");
          expect(mainMapPage.getMapTooltipName().getText()).toBe('classc');
        });

        it('on overview classc vehicle status should be Driving', function () {
          expect(overViewPanelPage.getMapElementStatus(1).getText()).toBe("Driving");
          overViewPanelPage.getMapElementStatus(1).getText().then(function(status){
            console.log("on overview classc status: "+status);//Idle
          });
          checked = false;
          overViewPanelPage.getMapElementStatus(1).isPresent().then(function(isPresent) {
            if (isPresent) {
              overViewPanelPage.getMapElementStatus(1).getText().then(function(status) {
                console.log("vehicle classc overview status "+status);
                checked = ["Driving","Idle"].some(function(x){
                  if(status.includes(x)){
                    return true;
                  }else {
                    return false;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('on map classc vehicle status should be Driving', function() {
          expect(["Idle"]).toBe(mainMapPage.getMapTooltipStatus().getText());
          mainMapPage.getMapTooltipStatus().getText().then(function(text) {
            console.log("on map classc status = " + text);//Idle
          });
          expect(mainMapPage.getMapTooltipStatus().getText()).toBe("Driving");
          checked = false;
          mainMapPage.getMapTooltipStatus().isPresent().then(function(isPresent) {
            if (isPresent) {
              mainMapPage.getMapTooltipStatus().getText().then(function(status) {
                console.log("vehicle classc overview status "+status);
                checked = ["Driving","Idle"].some(function(x){
                  if(status.includes(x)){
                    return true;
                  }else {
                    return false;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('on overview classc status color should be displayed', function () {
          overViewPanelPage.getMapElementStatusIcon(1).getCssValue('color').then(function(color){
            console.log("on overview classc status color : "+color);//
          });
          expect(overViewPanelPage.getMapElementStatusIcon(1).getCssValue('color')).toBe("rgb(0, 107, 179)");

          checked = false;
          overViewPanelPage.getMapElementStatusIcon(1).isPresent().then(function(isPresent) {
            if (isPresent) {
              overViewPanelPage.getMapElementStatusIcon(1).getCssValue('color').then(function(color) {
                console.log("overview vehicle classc color "+color);
                checked = ["rgb(255, 152, 1)","rgb(0, 107, 179)"].some(function(x){
                  if(color.includes(x)){
                    return true;
                  }else {
                    return false;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('on map status color should be displayed', function() {
          expect(mainMapPage.getMapTooltipStatusColor().getCssValue('background-color')).toBe('rgb(0, 107, 179)');//rgb(0, 107, 179)
          mainMapPage.getMapTooltipStatusColor().getCssValue('background-color').then(function(text) {
            console.log("on map classc status color = " + text);//rgb(255, 152, 1)
          });
          checked = false;
          mainMapPage.getMapTooltipStatusColor().isPresent().then(function(isPresent) {
            if (isPresent) {
              mainMapPage.getMapTooltipStatusColor().getCssValue('background-color').then(function(color) {
                console.log("map vehicle classc color "+color);
                checked = ["rgb(255, 152, 1)","rgb(0, 107, 179)"].some(function(x){
                  if(color.includes(x)){
                    return true;
                  }else {
                    return false;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('on overview classc category icon should be truck icon', function () {
            expect(overViewPanelPage.getMapElementCategoryFieldIcon(1).getAttribute('class')).toContain('icon-lf_truck');
        });

        it('on map category icon should be truck icon', function() {
          expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('icon-lf_truck');
          mainMapPage.getMapTooltipCategoryIcon().getAttribute('class').then(function(text) {
            console.log("classc category icon class = " + text);
          });
        });

        it('on overview category should be truck', function () {
          expect(overViewPanelPage.getMapElementCategoryField(1).getText()).toBe('truck');
        });

        it('on map category should be truck', function() {
          expect(mainMapPage.getMapTooltipCategory().getText()).toBe('truck');
        });

        it('on overview address should be found', function () {
          overViewPanelPage.getMapElementAddress(1).isPresent().then(function(isPresent){
            if(isPresent){
              overViewPanelPage.getMapElementAddress(1).getText().then(function(address){
                console.log("on overview address : "+address);//Chemin des Chênes 1610 Oron, Vaud, CH
              });
            }
          });
          expect(overViewPanelPage.getMapElementAddress(1).getText()).toBe("Route d'Orbe 20, 1373 Chavornay, Vaud, CH");
          checked = false;
          overViewPanelPage.getMapElementAddress(1).isPresent().then(function(isPresent) {
            if (isPresent) {
              overViewPanelPage.getMapElementAddress(1).getText().then(function(address) {
                console.log("vehicle classc overview addres "+address);
                checked = ["4538 Oberbipp, Bern/Berne, CH","1373 Chavornay, Vaud, CH","1023 Crissier, Vaud, CH"].some(function(x){
                  if(address.includes(x)){
                    return true;
                  }else {
                    return false;
                  }
                });
                expect(checked).toBe(true);//Chemin des Chênes 1610 Oron, Vaud, CH
                console.log("on map vehicle1 address = "+address);
              });
            }
          });
        });

        it('on map address should be Oron-la-Ville', function() {
        // expect().toBe(mainMapPage.getMapTooltipAddress().getText());
        checked = false;
        mainMapPage.getMapTooltipAddress().isPresent().then(function(isPresent) {
          if (isPresent) {
            mainMapPage.getMapTooltipAddress().getText().then(function(address) {
              console.log("vehicle classc map addres "+address);
              checked = ["4538 Oberbipp, Bern/Berne, CH","1373 Chavornay, Vaud, CH","1023 Crissier, Vaud, CH"].some(function(x){
                if(address.includes(x)){
                  return true;
                }else {
                  return false;
                }
              });
              expect(checked).toBe(true);//Chemin des Chênes 1610 Oron, Vaud, CH
              console.log("on map vehicle1 address = "+address);
            });
          }
        });
          mainMapPage.getMapTooltipAddress().isPresent().then(function(isPresent) {
            if (isPresent) {
              mainMapPage.getMapTooltipAddress().getText().then(function(address) {
                console.log("classc address = " + address);
              });
            } else {
              console.log("ko co address first vehicle");
            }
          });
        });

        it('on overview should have speed', function() {
          overViewPanelPage.getMapElementSpeedIcon(1).isPresent().then(function(isPresent){
            if(isPresent){
              overViewPanelPage.getMapElementSpeed(1).getText().then(function(text2){
                console.log("on overview vehicle1 speed = "+text2);
                text2 = text2.replace(/\D/g, ' ');
                  text2 = text2.replace(/\s+/g, " ");
                  text2 = text2.replace(/^\s+|\s+$/g, "");
                  expect(parseInt(text2)).toBeGreaterThanOrEqual(0);//50km/h
                // idle => ko co toc do
              });
            }
          });
        });

        it('on map should have speed', function() {
          mainMapPage.getMapTooltipSpeed().isPresent().then(function(isPresent){
            if(isPresent){
              mainMapPage.getMapTooltipSpeed().getText().then(function(text2){
                text2 = text2.replace(/\D/g, ' ');
                  text2 = text2.replace(/\s+/g, " ");
                  text2 = text2.replace(/^\s+|\s+$/g, "");
                  expect(parseInt(text2)).toBeGreaterThanOrEqual(0);//50km/h
              });
            }
          });
          mainMapPage.getMapTooltipSpeed().isPresent().then(function(isPresent) {
            if (isPresent) {
              mainMapPage.getMapTooltipSpeed().getText().then(function(speed) {
                console.log("classc speed = " + speed); //133 km/h 32km/h
              });
            } else {
              console.log("vehicle1 ko co address");
            }
          });
        });

        it('expand list should have classc-1 reference', function() {
          browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getMapTooltipShowDetals()));
          mainMapPage.clickMapTooltipShowDetails();
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipInfoExpandList()));
          browser.wait(function() {
            return mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.small-6.ng-binding')).getText().then(function(text) {
              return text != '';
            });
          });

          expect(mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText()).toBe('classc-1');
        });
      });

        describe('when secound vehicle clicked ', function() {
              beforeAll(function() {
                browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getOverviewGridRow(2)));
                overViewPanelPage.getOverviewGridRow(2).click();
                browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipName()));
                browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipAddress()));
                browser.wait(function() {
                  return mainMapPage.getMapTooltipName().getAttribute('innerHTML').then(function(text) {
                    return (text != "");
                  });
                });
                browser.wait(function() {
                  return mainMapPage.getMapTooltipAddress().getAttribute('innerHTML').then(function(text) {
                    return (text != "");
                  });
                });
              });

              it('name should be equipment ', function() {
                expect(mainMapPage.getMapTooltipName().getText()).toBe('equipment');
              });

              it('status should be driving', function() {
                expect(mainMapPage.getMapTooltipStatus().getText()).toBe('Driving');
                mainMapPage.getMapTooltipStatus().getText().then(function(text) {
                  console.log("status of equipment " + text);
                });
              });

              it('category icon should be car icon', function() {
                expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('icon-lf_car');
              });

              it('category should be car', function() {
                expect(mainMapPage.getMapTooltipCategory().getText()).toBe('car');
              });

              it('status color should be displayed', function() {
                expect(mainMapPage.getMapTooltipStatusColor().getCssValue('background-color')).toBe('rgb(0, 107, 179)');
                mainMapPage.getMapTooltipStatusColor().getCssValue('background-color').then(function(text) {
                  console.log("classc status color = " + text);
                });
              });

              it('address should be Panex', function() {
                expect(mainMapPage.getMapTooltipAddress().getText()).toContain('1884 Ollon, CH');
                mainMapPage.getMapTooltipAddress().isPresent().then(function(isPresent){
                  if(isPresent){
                mainMapPage.getMapTooltipAddress().getText().then(function(text) {
                  console.log("address of equipment " + text);
                });
              }
                });
              });

              it('equipment1 should be lame  Inactive ', function() {
                expect(mainMapPage.getMapTooltipEquipmentsList().get(0).element(by.css('.small-10.ng-binding')).getText()).toContain('lame  active');
                mainMapPage.getMapTooltipEquipmentsList().get(0).element(by.css('.small-10.ng-binding')).getText().then(function(text){
                  console.log("equipment1 = "+text);
                });
              });

              it('equipment2 should be saleuse  Inactive ', function() {
                expect(mainMapPage.getMapTooltipEquipmentsList().get(1).element(by.css('.small-10.ng-binding')).getText()).toContain('saleuse  Inactive');
                mainMapPage.getMapTooltipEquipmentsList().get(1).element(by.css('.small-10.ng-binding')).getText().then(function(text){
                  console.log("equipment2 = "+text);
                });
              });

              it('equipment1 color should be gray', function() {
                expect(mainMapPage.getMapTooltipEquipmentsList().get(0).element(by.css('.fi-shape-circle')).getCssValue("color")).toBe("rgb(63, 72, 204)");
                mainMapPage.getMapTooltipEquipmentsList().get(0).element(by.css('.fi-shape-circle')).getCssValue("color").then(function(color1){
                  console.log("equipment1 color "+color1);
                });
              });

              it('equipment2 color should be gray', function() {
                expect(mainMapPage.getMapTooltipEquipmentsList().get(1).element(by.css('.fi-shape-circle')).getCssValue("color")).toBe("rgb(158, 158, 158)");
                mainMapPage.getMapTooltipEquipmentsList().get(1).element(by.css('.fi-shape-circle')).getCssValue("color").then(function(color1){
                  console.log("equipment1 color "+color1);
                });
              });

              it('should have speed', function() {
                expect(mainMapPage.getMapTooltipSpeed().getText()).toBe("6 km/h");
                mainMapPage.getMapTooltipSpeed().isPresent().then(function(isPresent){
                  if(isPresent){
                    mainMapPage.getMapTooltipSpeed().getText().then(function(text) {
                      console.log("speed of equipment " + text);
                      text = text.replace(/\D/g, ' ');
                        text = text.replace(/\s+/g, " ");
                        text = text.replace(/^\s+|\s+$/g, "");
                        expect(parseInt(text)).toBeGreaterThan(0);
                    });
                  }
                });
              });

              it('expand list should have equipment-2 reference', function() {
                browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getMapTooltipShowDetals()));
                mainMapPage.clickMapTooltipShowDetails();
                browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipInfoExpandList()));
                browser.wait(function() {
                  return mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.small-6.ng-binding')).getText().then(function(text) {
                    return text != '';
                  });
                });

                expect(mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText()).toBe('equipment-2');
              });
            });

            describe('when third vehicle clicked ', function() {
              beforeAll(function() {
                browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getOverviewGridRow(3)));
                overViewPanelPage.getOverviewGridRow(3).click();
                browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipName()));
                browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipAddress()));
                browser.wait(function() {
                  return mainMapPage.getMapTooltipName().getAttribute('innerHTML').then(function(text) {
                    return (text != "");
                  });
                });
                browser.wait(function() {
                  return mainMapPage.getMapTooltipAddress().getAttribute('innerHTML').then(function(text) {
                    return (text != "");
                  });
                });
              });

              it('name should be immob ', function() {
                expect(mainMapPage.getMapTooltipName().getText()).toBe('immob');
              });

              it('status should be stopped', function() {
                expect(mainMapPage.getMapTooltipStatus().getText()).toBe('Stopped');
                mainMapPage.getMapTooltipStatus().getText().then(function(text){
                  console.log("vehicle3 status = "+text);
                  if(text == "Stopped"){
                    expect(text).toBe("Stopped");//stopped
                  }else {
                    expect(text).toBe("Driving");
                  }
                });
                mainMapPage.getMapTooltipStatus().getText().then(function(text) {
                  console.log("status of immob " + text);
                });
              });

              it('status color should be displayed', function() {
                mainMapPage.getMapTooltipStatus().getText().then(function(text){
                  if(text == "Stopped"){
                expect(mainMapPage.getMapTooltipStatusColor().getCssValue('background-color')).toBe('rgb(158, 158, 158)');
              }else {
                expect(mainMapPage.getMapTooltipStatusColor().getCssValue('background-color')).toBe('rgb(0, 107, 179)');
              }
                mainMapPage.getMapTooltipStatusColor().getCssValue('background-color').then(function(text) {
                  console.log("classc status color = " + text);
                });
              });
              });

              it('category icon should be car icon', function() {
                expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('icon-lf_car');
              });

              it('category should be car', function() {
                expect(mainMapPage.getMapTooltipCategory().getText()).toBe('car');
              });

              it('address should be Riaz', function() {
                expect(mainMapPage.getMapTooltipAddress().getText()).toBe("Zone Industrielle d'In-Riaux 33, 1728 Rossens, CH");
                mainMapPage.getMapTooltipAddress().isPresent().then(function(isPresent){
                  if(isPresent){
                mainMapPage.getMapTooltipAddress().getText().then(function(text) {
                  console.log("address of immob " + text);
                  expect(text).toContain("1728 Rossens, CH");
                });
              }
                });
              });

              it('should have speed', function() {
                expect(mainMapPage.getMapTooltipSpeed().getText()).toBe("112 km/h");
                mainMapPage.getMapTooltipSpeed().getText().then(function(text) {
                  console.log("speed of withdriver " + text);
                });
              });

              it('equipment1 should be immob ', function() {
                expect(mainMapPage.getMapTooltipEquipmentsList().get(0).element(by.css('.small-10.ng-binding')).getText()).toBe('immob ');
              });

              it('blocked equipment icon should be icon', function() {
                expect(mainMapPage.getMapTooltipEquipmentsList().get(0).element(by.css('.small-2 .iconic-md')).getAttribute('class')).toContain('icon-blocked');
              });

              it('should have play button', function() {
                expect(mainMapPage.getMapTooltipEquipmentsList().get(0).element(by.css('.icon-play3.iconic-md')).isPresent()).toBe(true);
              });

              it('should have stop button', function() {
                expect(mainMapPage.getMapTooltipEquipmentsList().get(0).element(by.css('.icon-stop.iconic-md')).isPresent()).toBe(true);
              });

              it('expand list should have immob-3 reference', function() {
                browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getMapTooltipShowDetals()));
                mainMapPage.clickMapTooltipShowDetails();
                browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipInfoExpandList()));
                browser.wait(function() {
                  return mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.small-6.ng-binding')).getText().then(function(text) {
                    return text != '';
                  });
                });

                expect(mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText()).toBe('immob-3');
              });
            });
        //vehicle 4
      describe(', if have 6 vehicle, ', function() {
        if(count == 6){
          describe('when private vehicle clicked ', function() {
            beforeAll(function() {
              browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getOverviewGridRow(4)));
              overViewPanelPage.getOverviewGridRow(4).click();
              browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipName()));
              browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipAddress()));
              browser.wait(function() {
                return mainMapPage.getMapTooltipName().getAttribute('innerHTML').then(function(text) {
                  return (text != "");
                });
              });
              browser.wait(function() {
                return mainMapPage.getMapTooltipAddress().getAttribute('innerHTML').then(function(text) {
                  return (text != "");
                });
              });
            });

            it('name should be temperature ', function() {
              expect(mainMapPage.getMapTooltipName().getText()).toBe('private');
              mainMapPage.getMapTooltipName().getText().then(function(text){
                console.log("vehicle4 name = "+text);
              });
            });

            it('status should be stopped', function() {
              expect(mainMapPage.getMapTooltipStatus().getText()).toBe('Driving');
              mainMapPage.getMapTooltipStatus().isPresent().then(function(isPresent){
                if(isPresent){
                  mainMapPage.getMapTooltipStatus().getText().then(function(text) {
                    console.log("status of vehicle4 " + text);
                  });
                }
              });
            });

            it('status color should be displayed', function() {
              expect(mainMapPage.getMapTooltipStatusColor().getCssValue('background-color')).toBe('rgb(0, 107, 179)');
              mainMapPage.getMapTooltipStatus().isPresent().then(function(isPresent){
                if(isPresent){
                  mainMapPage.getMapTooltipStatusColor().getCssValue('background-color').then(function(text) {
                    console.log("vehicle4 status color = " + text);
                  });
                }
              });

            });

            it('category icon should be car icon', function() {
              expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('icon-lf_car');
            });

            it('category should be car', function() {
              expect(mainMapPage.getMapTooltipCategory().getText()).toBe('car');
            });

            it('should have speed', function() {
              expect(mainMapPage.getMapTooltipSpeed().getText()).toBe("112 km/h");
              mainMapPage.getMapTooltipSpeed().getText().then(function(text) {
                console.log("speed of withdriver " + text);
              });
            });

            it('address should be Morges', function() {
          
              mainMapPage.getMapTooltipAddress().isPresent().then(function(isPresent){
                if(isPresent){
              mainMapPage.getMapTooltipAddress().getText().then(function(text) {
                console.log("address of private " + text);
                expect(text).toContain("8645 Jona SG, CH");
              });
            }
          });
            });

            it('temperature should be presented ', function() {
              expect(mainMapPage.getOverlayMapTemperatureIcon().isPresent()).toBe(true);
            });

            it('temperature icon should have temperature', function() {
              expect(mainMapPage.getOverlayMapTemperatureIcon().getAttribute('class')).toContain('fi-thermometer');
            });

            it('should have temperature number', function() {
              mainMapPage.getOverlayMapTemperatureNumber().isPresent().then(function(isPresent){
                if(isPresent){
                  mainMapPage.getOverlayMapTemperatureNumber().getText().then(function(txt){
                    console.log("temperature number = "+txt);
                  });

                  mainMapPage.getOverlayMapTemperatureTime().getText().then(function(text){
                    console.log("temperature time = "+text);
                  });
                }
              });
            });

            it('expand list should have temperature reference', function() {
              browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getMapTooltipShowDetals()));
              mainMapPage.clickMapTooltipShowDetails();
              browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipInfoExpandList()));
              browser.wait(function() {
                return mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.small-6.ng-binding')).getText().then(function(text) {
                  return text != '';
                });
              });

              expect(mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText()).toBe('private-4');
              mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText().then(function(text){
                console.log("expand 4 = "+text);
              });
            });
          });
        }
      });

//vehicle 5 temperature
      describe('when secound last vehicle clicked ', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getOverviewGridRow(count -2)));
          overViewPanelPage.getOverviewGridRow(count -2).click();
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipName()));
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipAddress()));
          browser.wait(function() {
            return mainMapPage.getMapTooltipName().getAttribute('innerHTML').then(function(text) {
              return (text != "");
            });
          });
          browser.wait(function() {
            return mainMapPage.getMapTooltipAddress().getAttribute('innerHTML').then(function(text) {
              return (text != "");
            });
          });
        });

        it('name should be temperature ', function() {
          expect(mainMapPage.getMapTooltipName().getText()).toBe('temperature');
          mainMapPage.getMapTooltipName().getText().then(function(text){
            console.log("vehicle4 name = "+text);
          });
        });

        it('status should be stopped', function() {
          expect(mainMapPage.getMapTooltipStatus().getText()).toBe('Driving');
          mainMapPage.getMapTooltipStatus().isPresent().then(function(isPresent){
            if(isPresent){
              mainMapPage.getMapTooltipStatus().getText().then(function(text) {
                console.log("status of vehicle4 " + text);
              });
            }
          });
        });

        it('status color should be displayed', function() {
          expect(mainMapPage.getMapTooltipStatusColor().getCssValue('background-color')).toBe('rgb(0, 107, 179)');
          mainMapPage.getMapTooltipStatus().isPresent().then(function(isPresent){
            if(isPresent){
              mainMapPage.getMapTooltipStatusColor().getCssValue('background-color').then(function(text) {
                console.log("vehicle4 status color = " + text);
              });
            }
          });

        });

        it('category icon should be car icon', function() {
          expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('icon-lf_car');
        });

        it('category should be car', function() {
          expect(mainMapPage.getMapTooltipCategory().getText()).toBe('car');
        });

        it('should have speed', function() {
          expect(mainMapPage.getMapTooltipSpeed().getText()).toBe("112 km/h");
          mainMapPage.getMapTooltipSpeed().getText().then(function(text) {
            console.log("speed of withdriver " + text);
          });
        });

        it('address should be Morges', function() {
      
          mainMapPage.getMapTooltipAddress().isPresent().then(function(isPresent){
            if(isPresent){
          mainMapPage.getMapTooltipAddress().getText().then(function(text) {
            console.log("address of private " + text);
            expect(text).toContain("8645 Jona SG, CH");
          });
        }
      });
        });

        it('temperature should be presented ', function() {
          expect(mainMapPage.getOverlayMapTemperatureIcon().isPresent()).toBe(true);
        });

        it('temperature icon should have temperature', function() {
          expect(mainMapPage.getOverlayMapTemperatureIcon().getAttribute('class')).toContain('fi-thermometer');
        });

        it('should have temperature number', function() {
          mainMapPage.getOverlayMapTemperatureNumber().isPresent().then(function(isPresent){
            if(isPresent){
              mainMapPage.getOverlayMapTemperatureNumber().getText().then(function(txt){
                console.log("temperature number = "+txt);
              });

              mainMapPage.getOverlayMapTemperatureTime().getText().then(function(text){
                console.log("temperature time = "+text);
              });
            }
          });
        });

        it('expand list should have temperature reference', function() {
          browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getMapTooltipShowDetals()));
          mainMapPage.clickMapTooltipShowDetails();
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipInfoExpandList()));
          browser.wait(function() {
            return mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.small-6.ng-binding')).getText().then(function(text) {
              return text != '';
            });
          });

          expect(mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText()).toBe('temperature-5');
          mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText().then(function(text){
            console.log("expand 4 = "+text);
          });
        });
      });
//vehicle 6
      describe('when last vehicle clicked ', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getOverviewGridRow(count -1)));
          overViewPanelPage.getOverviewGridRow(count -1).click();
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipName()));
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipAddress()));
          browser.wait(function() {
            return mainMapPage.getMapTooltipName().getAttribute('innerHTML').then(function(text) {
              return (text != "");
            });
          });
          browser.wait(function() {
            return mainMapPage.getMapTooltipAddress().getAttribute('innerHTML').then(function(text) {
              return (text != "");
            });
          });
        });

        it('name should be with driver ', function() {
          expect(mainMapPage.getMapTooltipName().getText()).toBe('temperature');
          mainMapPage.getMapTooltipName().getText().then(function(text){
            console.log("vehicles5 = "+text);
          });
        });

        it('status should be stopped', function() {
          expect(mainMapPage.getMapTooltipStatus().getText()).toBe('Driving');
          mainMapPage.getMapTooltipStatus().getText().then(function(text) {
            console.log("status of vehicles5 " + text);
          });
        });

        it('temperature icon should be car icon', function() {
          expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('icon-lf_car');
        });

        it('category should be car', function() {
          expect(mainMapPage.getMapTooltipCategory().getText()).toBe('car');
        });

        it('status color should be displayed', function() {
          expect(mainMapPage.getMapTooltipStatusColor().getCssValue('background-color')).toBe('rgb(0, 107, 179)');
          mainMapPage.getMapTooltipStatusColor().getCssValue('background-color').then(function(text) {
            console.log("vehicles5 status color = " + text);
          });
        });

        it('address should be Spreitenbach', function() {
          expect(mainMapPage.getMapTooltipAddress().getText()).toBe("Industriestrasse 3, 5624 Bünzen, CH");
          mainMapPage.getMapTooltipAddress().isPresent().then(function(isPresent){
            if(isPresent){
          mainMapPage.getMapTooltipAddress().getText().then(function(text) {
            console.log("address of vehicles5 " + text);
          });
        }
      });
        });

        it('should have speed', function() {
          mainMapPage.getMapTooltipSpeed().isPresent().then(function(isPresent){
            if(isPresent){
              mainMapPage.getMapTooltipSpeed().getText().then(function(text) {
                console.log("speed of vehicle5 " + text);
                text = text.replace(/\D/g, ' ');
                  text = text.replace(/\s+/g, " ");
                  text = text.replace(/^\s+|\s+$/g, "");
                  expect(parseInt(text)).toBeGreaterThan(0);
              });
            }
          });
          mainMapPage.getMapTooltipSpeed().isPresent().then(function(isPresent){
            if(isPresent){
              mainMapPage.getMapTooltipSpeed().getText().then(function(text) {
                console.log("speed of vehicles5 " + text);
              });
            }
          });

        });

        it('with driver ', function() {
          mainMapPage.getOverlayMapDriverIcon().isPresent().then(function(isPresent){
            if(isPresent){
              mainMapPage.getOverlayMapDriver().getText().then(function(driver){
                console.log("driver name = "+driver);
              });
            }
          });
        });

        it('should have temperature number', function() {
          expect(mainMapPage.getOverlayMapTemperatureNumber().getText()).toBe("18.0 °C");
          mainMapPage.getOverlayMapTemperatureNumber().isPresent().then(function(isPresent){
            if(isPresent){
              mainMapPage.getOverlayMapTemperatureNumber().getText().then(function(temp){
                console.log("temperature number = "+temp);
              });
            }
          });
        });

        it('expand list should have withdriver reference', function() {
          browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getMapTooltipShowDetals()));
          mainMapPage.clickMapTooltipShowDetails();
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipInfoExpandList()));
          browser.wait(function() {
            return mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.small-6.ng-binding')).getText().then(function(text) {
              return text != '';
            });
          });
          expect(mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText()).toBe('temperature-5');
        });
      });

    describe('when vehicles grid row 6 clicked ', function() {
      beforeAll(function() {
        console.log("=================================================================");
        browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getOverviewGridRow(6)));
        overViewPanelPage.getOverviewGridRow(6).click();
        browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipName()));
        browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipAddress()));
        browser.wait(function() {
          return mainMapPage.getMapTooltipName().getAttribute('innerHTML').then(function(text) {
            return (text != "");
          });
        });
        browser.wait(function() {
          return mainMapPage.getMapTooltipAddress().getAttribute('innerHTML').then(function(text) {
            return (text != "") && (text != "Address not found");
          });
        });
      });



      it('name should be withdriver ', function() {
        expect(mainMapPage.getMapTooltipName().getText()).toBe('with driver');
        mainMapPage.getMapTooltipName().getText().then(function(text){
          console.log("withdriver = "+text);
        });
      });

      it('status should be stopped', function() {
        expect(mainMapPage.getMapTooltipStatus().getText()).toBe('Driving');
        mainMapPage.getMapTooltipStatus().getText().then(function(text) {
          console.log("status of withdriver " + text);
        });
      });

      it('status color should be displayed', function() {
        expect(mainMapPage.getMapTooltipStatusColor().getCssValue('background-color')).toBe('rgb(255, 152, 1)');
        mainMapPage.getMapTooltipStatusColor().getCssValue('background-color').then(function(text) {
          console.log("classc status color = " + text);
        });
      });

      it('category icon should be car icon', function() {
        expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('icon-lf_car');
      });

      it('category should be car', function() {
        expect(mainMapPage.getMapTooltipCategory().getText()).toBe('car');
      });

      it('address should be Spreitenbach', function() {
        expect(mainMapPage.getMapTooltipAddress().getText()).toBe("Stocki 181, 3534 Signau, CH");
        mainMapPage.getMapTooltipAddress().getText().then(function(text) {
          console.log("address of withdriver " + text);
        });
      });

      it('driver icon should be presented ', function() {
        expect(mainMapPage.getOverlayMapDriverIcon().isPresent()).toBe(true);
      });

      it('should have speed', function() {
        expect(mainMapPage.getMapTooltipSpeed().getText()).toBe("112 km/h");
        mainMapPage.getMapTooltipSpeed().isPresent().then(function(isPresent){
          if(isPresent){
            mainMapPage.getMapTooltipSpeed().getText().then(function(text) {
              console.log("speed of withdriver " + text);
            });
          }
        });
      });

      it('driver icon should have driver', function() {
        expect(mainMapPage.getOverlayMapDriverIcon().getAttribute('class')).toContain('icon-steering-wheel');
        mainMapPage.getOverlayMapDriverIcon().getAttribute('class').then(function(drivericon){
          console.log("driver icon = "+drivericon);
        });
      });

      it('should have driver name', function() {
        expect(mainMapPage.getOverlayMapDriver().getText()).toBe("Valentin Fournier");
        mainMapPage.getOverlayMapDriver().getText().then(function(text){
          console.log("driver name = "+text);
        });
      });

      it('expand list should have temperature-5 reference', function() {
        browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getMapTooltipShowDetals()));
        mainMapPage.clickMapTooltipShowDetails();
        browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipInfoExpandList()));
        browser.wait(function() {
          return mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.small-6.ng-binding')).getText().then(function(text) {
            console.log("expand list = "+text);
            return text != '';
          });
        });

        expect(mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText()).toBe('withdriver-6');
      });
    });

    });
  });
})();
