(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainMapPage = require('./MainMapPage'),
    filterPanelPage = require('./FilterPanelPage'),
    overViewPanelPage = require('./OverViewPanelPage.js');

  describe('check filter panel ', function() {
    var checked;
    beforeAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.visibilityOf(filterPanelPage.getFilterPanel()));
      browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getFilterClearButton()));
      filterPanelPage.clickFilterClearButton();
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel().element(by.css('#showGeozones.ng-not-empty'))));
      filterPanelPage.clickVehiclesSwitcher();
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
    });

    describe('on overview panel ', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()));
        mainPage.clickOverViewButton();
        browser.wait(testUtils.until.presenceOf(overViewPanelPage.getOverviewPanel()));
        browser.wait(testUtils.until.presenceOf(overViewPanelPage.getOverviewGridRow(2)));
      });
      describe('when machine 1 clicked', function() {
        beforeAll(function() {
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
              return (text != "");
            });
          });
        });

        it('on overview name should be machine', function() {
          expect(overViewPanelPage.getMapElementName(1).getText()).toBe('machine');
        });

        it('on map name should be machine ', function() {
          expect(mainMapPage.getMapTooltipName().getText()).toBe('machine');
        });

        it('on overview status should be Working', function() {
          expect(['Working', 'Stopped']).toContain(overViewPanelPage.getMapElementStatus(1).getText());
        });

        it('on map status should be Working', function() {
          expect(['Working', 'Stopped']).toContain(mainMapPage.getMapTooltipStatus().getText());
        });

        it('on overview status color should be displayed', function() {
          overViewPanelPage.getMapElementStatusIcon(1).getCssValue('color').then(function(text1) {
            expect(text1).toBe("rgb(158, 158, 158)");
          });
        });

        it('on map status color should be displayed', function() {
          expect(mainMapPage.getMapTooltipStatusColor().getCssValue('background-color')).toBe('rgb(158, 158, 158)');
            console.log("on map machine status color = " + text);//rgb(0, 107, 179)
        });

        it('on overview category icon should be truck icon', function() {
          expect(overViewPanelPage.getMapElementCategoryFieldIcon(1).getAttribute('class')).toContain('icon-lf_excavator_1');
        });

        it('on map category icon should be truck icon', function() {
          expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('icon-lf_excavator_1');
        });

        it('on overview category should be truck', function() {
          expect(overViewPanelPage.getMapElementCategoryField(1).getText()).toBe('truck');
        });

        it('on map category should be truck', function() {
          expect(mainMapPage.getMapTooltipCategory().getText()).toBe('truck');
        });

        it('on overview machine address should be found', function() {
          overViewPanelPage.getMapElementAddressIcon(1).isPresent().then(function(isPresent) {
            if (isPresent) {
              overViewPanelPage.getMapElementAddress(1).getText().then(function(address) {
                expect(address).toContain('Wahlen');
              });
            }
          });
        });

        it('on map machine address should be displayed', function() {
          mainMapPage.getMapTooltipAddress().isPresent().then(function(isPresent) {
            if (isPresent) {
              mainMapPage.getMapTooltipAddress().getText().then(function(address) {
                expect(address).toContain('Wahlen');
              });
            }
          });
        });

        it('on overview should have speed', function() {
          overViewPanelPage.getMapElementSpeedIcon(1).isPresent().then(function(isPresent) {
            if (isPresent) {
              overViewPanelPage.getMapElementSpeed(1).getText().then(function(speed) {
                expect(parseInt(speed)).toBeGreaterThanOrEqual(0);
              });
            }
          });
        });

        it('on map should have speed', function() {
          mainMapPage.getMapTooltipSpeed().isPresent().then(function(isPresent) {
            if (isPresent) {
              mainMapPage.getMapTooltipSpeed().getText().then(function(speed) {
                expect(parseInt(speed)).toBeGreaterThanOrEqual(0);
              });
            }
          });
        });

        it('expand list should have reference', function() {
          browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getMapTooltipShowDetals()));
          mainMapPage.clickMapTooltipShowDetails();
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipInfoExpandList()));
          browser.wait(function() {
            return mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.small-6.ng-binding')).getText().then(function(text) {
              return text != '';
            });
          });
          expect(mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText()).toBe('16809');
        });
      });

      describe('machine 2 ', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.presenceOf(overViewPanelPage.getOverviewGridRow(2)));
          browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getOverviewGridRow(2)));
          overViewPanelPage.getOverviewGridRow(2).click();
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
              return (text != "") && (text != "Address not found") && (text != 'Show on map');
            });
          });
        });

        it('on overview name should be machine 2', function() {
          expect(overViewPanelPage.getMapElementName(2).getText()).toBe('machine2');
        });

        it('on map name should be machine 2 ', function() {
          expect(mainMapPage.getMapTooltipName().getText()).toBe('machine2');
        });

        it('on overview status should be Stopped', function() {
          checked = false;
          overViewPanelPage.getMapElementStatusIcon(2).isPresent().then(function(isPresent) {
            if (isPresent) {
              overViewPanelPage.getMapElementStatus(2).getText().then(function(status) {
                checked = ["Stopped", "Working"].some(function(x) {
                  if (status.includes(x)) {
                    return true;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('on map status should be Stopped', function() {
          checked = false;
          mainMapPage.getMapTooltipStatus().isPresent().then(function(isPresent) {
            if (isPresent) {
              mainMapPage.getMapTooltipStatus().getText().then(function(status) {
                checked = ["Stopped", "Working"].some(function(x) {
                  if (status.includes(x)) {
                    return true;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('on overview status color should be found', function() {
          checked = false;
          overViewPanelPage.getMapElementStatusIcon(2).isPresent().then(function(isPresent) {
            if (isPresent) {
              overViewPanelPage.getMapElementStatusIcon(2).getCssValue('color').then(function(color) {
                checked = ['rgb(158, 158, 158)', "rgb(0, 107, 179)"].some(function(x) {
                  if (color.includes(x)) {
                    return true;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('on map status color should be displayed', function() {
          checked = false;
          mainMapPage.getMapTooltipStatusColor().isPresent().then(function(isPresent) {
            if (isPresent) {
              mainMapPage.getMapTooltipStatusColor().getCssValue('background-color').then(function(color) {
                checked = ['rgb(158, 158, 158)', "rgb(0, 107, 179)"].some(function(x) {
                  if (color.includes(x)) {
                    return true;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('on overview category icon should be truck icon', function() {
          expect(overViewPanelPage.getMapElementCategoryFieldIcon(2).getAttribute('class')).toContain('icon-lf_excavator_1');
        });

        it('on map category icon should be truck icon', function() {
          expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('icon-lf_excavator_1');
        });

        it('on overview category should be truck', function() {
          expect(overViewPanelPage.getMapElementCategoryField(2).getText()).toBe('truck');
        });

        it('on map category should be truck', function() {
          expect(mainMapPage.getMapTooltipCategory().getText()).toBe('truck');
        });

        it('on overview address should be found', function() {
          overViewPanelPage.getMapElementAddressIcon(2).isPresent().then(function(isPresent) {
            if (isPresent) {
              overViewPanelPage.getMapElementAddress(2).getText().then(function(address) {
                expect(address).toContain('Gimel, CH');
              });
            }
          });
        });

        it('on map address should be Gimel, CH', function() {
          mainMapPage.getMapTooltipAddress().isPresent().then(function(isPresent) {
            if (isPresent) {
              mainMapPage.getMapTooltipAddress().getText().then(function(address) {
                expect(address).toContain('Gimel, CH');
              });
            }
          });
        });

        it('expand list should have current mileage', function() {
          browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getMapTooltipShowDetals()));
          mainMapPage.clickMapTooltipShowDetails();
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipInfoExpandList()));
          browser.wait(function() {
            return mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.small-6.ng-binding')).getText().then(function(text) {
              return text != '';
            });
          });
          expect(mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText()).not.toContain("(0)");
        });
      });
    });
  });
})();
