(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainMapPage = require('./MainMapPage'),
    filterPanelPage = require('./FilterPanelPage'),
    overViewPanelPage = require('./OverViewPanelPage.js');

  describe('check filter panel', function() {
    var checked = false;
    beforeAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.visibilityOf(filterPanelPage.getFilterPanel()));
      browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getFilterClearButton()));
      filterPanelPage.clickFilterClearButton();
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel().element(by.css('#showMobileassets.ng-not-empty'))));
      filterPanelPage.clickVehiclesSwitcher();
      filterPanelPage.clickMachinesSwitcher();
      filterPanelPage.clickStandalonesSwitcher();
      filterPanelPage.clickWorkersSwitcher();
      filterPanelPage.clickGeozonesSwitcher();
      browser.wait(testUtils.until.presenceOf(filterPanelPage.getFilterPanel().element(by.css('#showGeozones.ng-empty'))));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()));
      mainPage.clickOverViewButton();
      browser.wait(testUtils.until.presenceOf(overViewPanelPage.getOverviewPanel()));
      browser.wait(testUtils.until.visibilityOf(overViewPanelPage.getOverviewGridRow(1)));
    });

    afterAll(function() {
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()));
      mainPage.clickOverViewButton();
      browser.wait(testUtils.until.stalenessOf(overViewPanelPage.getOverviewPanel()));
    });

    describe('on overview panel', function() {
      describe('when objet 1 clicked', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.presenceOf(element(by.css('.filter-panel.ng-hide'))));
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
            });
          });
        });

        it('on overview name should be objet 1', function() {
          expect(overViewPanelPage.getMapElementName(1).getText()).toBe('Objet 1');
        });

        it('on map name should be objet 1', function() {
          expect(mainMapPage.getMapTooltipName().getText()).toBe('Objet 1');
        });

        it('on overview status should be On site', function() {
          expect(['On site']).toContain(overViewPanelPage.getMapElementStatus(1).getText());
        });

        it('on map status should be On site', function() {
          expect(['On site']).toContain(mainMapPage.getMapTooltipStatus().getText());
        });

        it('on overview status color should be displayed', function() {
          expect(["rgb(158, 158, 158)"]).toContain(overViewPanelPage.getMapElementStatusIcon(1).getCssValue('color'));
        });

        it('on map status color should be displayed', function() {
          expect(["rgb(158, 158, 158)"]).toContain(mainMapPage.getMapTooltipStatusColor().getCssValue('background-color')); //
        });

        it('on overview category icon should be tool icon', function() {
          expect(overViewPanelPage.getMapElementCategoryFieldIcon(1).getAttribute('class')).toContain('fi-tools');
        });

        it('on map category icon should be tool icon', function() {
          expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('fi-tools');
        });

        it('on overview category should be tool', function() {
          expect(mainMapPage.getMapTooltipCategory().getText()).toBe('tool');
        });

        it('on map category should be tool', function() {
          expect(overViewPanelPage.getMapElementCategoryField(1).getText()).toBe('tool');
        });

        it('on overview address should be Oron-la-Ville', function() {
          checked = false;
          overViewPanelPage.getMapElementAddress(1).isPresent().then(function(isPresent) {
            if (isPresent) {
              overViewPanelPage.getMapElementAddress(1).getText().then(function(address) {
                // console.log("overview objet1 address = " + address);
                checked = ['3855 Brienz (BE), Bern/Berne, CH',
                  '3800 Interlaken, Bern/Berne, CH'
                ].some(function(x) {
                  if (address.includes(x)) {
                    return true;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('on map address should be Oron-la-Ville', function() {
          checked = false;
          mainMapPage.getMapTooltipAddress().isPresent().then(function(isPresent) {
            if (isPresent) {
              mainMapPage.getMapTooltipAddress().getText().then(function(address) {
                // console.log("map objet1 address = " + address);
                checked = ['3855 Brienz (BE), Bern/Berne, CH',
                  '3800 Interlaken, Bern/Berne, CH'
                ].some(function(x) {
                  if (address.includes(x)) {
                    return true;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('expand list should have objet-1 reference', function() {
          browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getMapTooltipShowDetals()), 5000);
          mainMapPage.clickMapTooltipShowDetails();
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipInfoExpandList()), 5000);
          browser.wait(function() {
            return mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.small-6.ng-binding')).getText().then(function(text) {
              return text != '';
            });
          });
          expect(mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText()).toBe('Demo account');
        });
      });

      describe("when objet 2 clicked", function() {
        beforeAll(function() {
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
              return (text != "") && (text != "Address not found");
            });
          });
        });

        it('on overview name should be objet 2', function() {
          expect(overViewPanelPage.getMapElementName(2).getText()).toBe('Objet 2');
        });

        it('on map name should be objet 2', function() {
          expect(mainMapPage.getMapTooltipName().getText()).toBe('Objet 2');
        });

        it('on overview status should be On site', function() {
          expect(overViewPanelPage.getMapElementStatus(2).getText()).toBe('On site');
        });

        it('on map status should be On site', function() {
          expect(mainMapPage.getMapTooltipStatus().getText()).toBe('On site');
        });

        it('on overview status color should be displayed', function() {
          overViewPanelPage.getMapElementStatusIcon(2).getCssValue('color').then(function(text) {
            // console.log("on overview objet2 status color = " + text);
            expect(['rgb(158, 158, 158)']).toContain(text);
          });
        });

        it('on map status color should be displayed', function() {
          mainMapPage.getMapTooltipStatusColor().getCssValue('background-color').then(function(text) {
            // console.log("on map objet2 status color = " + text);
            expect(['rgb(158, 158, 158)']).toContain(text);
          });
        });

        it('on overview category icon should be tool icon', function() {
          expect(overViewPanelPage.getMapElementCategoryFieldIcon(2).getAttribute('class')).toContain('fi-tools');
          //   console.log("objet2 category icon class = " + text);
        });

        it('on map category icon should be tool icon', function() {
          expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('fi-tools');
          //   console.log("objet2 category icon class = " + text);
        });

        it('category should be tool', function() {
          expect(mainMapPage.getMapTooltipCategory().getText()).toBe('tool');
        });

        it('on map category should be tool', function() {
          expect(overViewPanelPage.getMapElementCategoryField(2).getText()).toBe('tool');
        });

        it('overview address should be Oron-la-Ville', function() {
          checked = false;
          overViewPanelPage.getMapElementAddress(2).isPresent().then(function(isPresent) {
            if (isPresent) {
              overViewPanelPage.getMapElementAddress(2).getText().then(function(address) {
                // console.log("objet2 = " + address);
                checked = ["8903 Birmensdorf (ZH), Zürich, CH", "6343 Risch-Rotkreuz, Zug, CH"].some(function(x) {
                  if (address.includes(x)) {
                    return true;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('address should be Oron-la-Ville', function() {
          checked = false;
          mainMapPage.getMapTooltipAddress().isPresent().then(function(isPresent) {
            if (isPresent) {
              mainMapPage.getMapTooltipAddress().getText().then(function(address) {
                //checked = ["Sonnenbüel, 6343 Risch-Rotkreuz, Zug, CH","Sonnenbüel 6343 Risch-Rotkreuz, Zug, CH", "Stallikonerstrasse 8903 Birmensdorf (ZH), Zürich, CH"]
                checked = ["8903 Birmensdorf (ZH), Zürich, CH", "6343 Risch-Rotkreuz, Zug, CH"].some(function(x) {
                  if (address.includes(x)) {
                    return true;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('expand list should have objet-2 reference', function() {
          browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getMapTooltipShowDetals()));
          mainMapPage.clickMapTooltipShowDetails();
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipInfoExpandList()));
          browser.wait(function() {
            return mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.small-6.ng-binding')).getText().then(function(text) {
              return text != '';
            });
          });
          expect(mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText()).toBe('Demo account');
        });
      });

      describe('when objet 3 clicked', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getOverviewGridRow(3)));
          overViewPanelPage.getOverviewGridRow(3).click();
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
            });
          });
        });

        it('on overview name should be objet 3', function() {
          expect(overViewPanelPage.getMapElementName(3).getText()).toBe('Objet 3');
        });

        it('on map name should be objet 3', function() {
          expect(mainMapPage.getMapTooltipName().getText()).toBe('Objet 3');
        });

        it('on overview status should be On site', function() {
          expect(['On site']).toContain(overViewPanelPage.getMapElementStatus(3).getText());
        });

        it('on map status should be On site', function() {
          expect(mainMapPage.getMapTooltipStatus().getText()).toBe('On site');
        });

        it('on overview status color should be displayed', function() {
          expect(['rgb(158, 158, 158)']).toContain(overViewPanelPage.getMapElementStatusIcon(3).getCssValue('color'));
        });

        it('on map status color should be displayed', function() {
          expect(['rgb(158, 158, 158)']).toContain(mainMapPage.getMapTooltipStatusColor().getCssValue('background-color'));
        });

        it('on overview category icon should be tool icon', function() {
          expect(overViewPanelPage.getMapElementCategoryFieldIcon(3).getAttribute('class')).toContain('fi-tools');
        });

        it('on map category icon should be tool icon', function() {
          expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('fi-tools');
        });

        it('on overview category should be tool', function() {
          expect(overViewPanelPage.getMapElementCategoryField(3).getText()).toBe('tool');
        });

        it('on map category should be tool', function() {
          expect(mainMapPage.getMapTooltipCategory().getText()).toBe('tool');
        });

        it('on overview address should be found', function() {
          checked = false;
          overViewPanelPage.getMapElementAddress(3).isPresent().then(function(isPresent) {
            if (isPresent) {
              overViewPanelPage.getMapElementAddress(3).getText().then(function(address) {
                checked = ['1992 Sion, Valais/Wallis, CH', "Place de la Gare 4, 1950 Sion, Valais/Wallis, CH"].some(function(x) {
                  if (address.includes(x)) {
                    return true;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('on map address should be Oron-la-Ville', function() {
          checked = false;
          mainMapPage.getMapTooltipAddress().isPresent().then(function(isPresent) {
            if (isPresent) {
              mainMapPage.getMapTooltipAddress().getText().then(function(address) {
                checked = ['1992 Sion, Valais/Wallis, CH', "Place de la Gare 4, 1950 Sion, Valais/Wallis, CH"].some(function(x) {
                  if (address.includes(x)) {
                    return true;
                  }
                });
                expect(checked).toBe(true);
              });
            }
          });
        });

        it('expand list should have objet-3 reference', function() {
          browser.wait(testUtils.until.elementToBeClickable(mainMapPage.getMapTooltipShowDetals()));
          mainMapPage.clickMapTooltipShowDetails();
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipInfoExpandList()));
          browser.wait(function() {
            return mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.small-6.ng-binding')).getText().then(function(text) {
              return text != '';
            });
          });

          expect(mainMapPage.getMapTooltipInfoExpandList().get(0).element(by.css('div.ng-binding')).getText()).toBe('Demo account');
        });
      });
    });
  });
})();
