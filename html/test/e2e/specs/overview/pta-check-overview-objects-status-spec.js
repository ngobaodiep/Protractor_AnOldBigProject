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
      describe('when Objet 1 clicked', function() {
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

        it('on the map name should be objet 1', function() {
          expect(mainMapPage.getMapTooltipName().getText()).toBe('Objet 1');
        });

        it('on overview status should be "On site"', function() {
          expect(['On site']).toContain(overViewPanelPage.getMapElementStatus(1).getText());
        });

        it('on map status should be "On site"', function() {
          expect(['On site']).toContain(mainMapPage.getMapTooltipStatus().getText());
        });

        it('on overview status color should be displayed', function() {
          expect(["rgb(158, 158, 158)"]).toContain(overViewPanelPage.getMapElementStatusIcon(1).getCssValue('color'));
        });

        it('on map status color should be displayed', function() {
          expect(["rgb(158, 158, 158)"]).toContain(mainMapPage.getMapTooltipStatusColor().getCssValue('background-color'));
        });

        it('on overview category icon should be dumpster icon', function() {
          expect(overViewPanelPage.getMapElementCategoryFieldIcon(1).getAttribute('class')).toContain('fi-shape-square');
        });

        it('on map category icon should be dumpster icon', function() {
          expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('fi-shape-square');
        });

        it('on overview category should be default category', function() {
          expect(mainMapPage.getMapTooltipCategory().getText()).toBe('default category');
        });

        it('on map category should be default category', function() {
          expect(overViewPanelPage.getMapElementCategoryField(1).getText()).toBe('default category');
        });

        it('on overview address should contain Bern/Berne, CH', function() {
          overViewPanelPage.getMapElementAddress(1).isPresent().then(function(isPresent) {
            if (isPresent) {
              overViewPanelPage.getMapElementAddress(1).getText().then(function(address) {
                expect(address).toContain('Bern/Berne, CH');
              });
            }
          });
        });

        it('on map address should be Seestrasse 26, 3855 Brienz (BE), Bern/Berne, CH', function() {
          mainMapPage.getMapTooltipAddress().isPresent().then(function(isPresent) {
            if (isPresent) {
              mainMapPage.getMapTooltipAddress().getText().then(function(address) {
                expect(address).toContain('Seestrasse 26, 3855 Brienz (BE), Bern/Berne, CH');
              });
            }
          });
        });

        it('expand list should have group name', function() {
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

        it('on overview name should be Objet 2', function() {
          expect(overViewPanelPage.getMapElementName(2).getText()).toBe('Objet 2');
        });

        it('on map name should be Objet 2', function() {
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
            expect(['rgb(158, 158, 158)']).toContain(text);
          });
        });

        it('on map status color should be displayed', function() {
          mainMapPage.getMapTooltipStatusColor().getCssValue('background-color').then(function(text) {
            expect(['rgb(158, 158, 158)']).toContain(text);
          });
        });

        it('on overview category icon should be tool icon', function() {
          expect(overViewPanelPage.getMapElementCategoryFieldIcon(2).getAttribute('class')).toContain('fi-shape-square');
        });

        it('on map category icon should be tool icon', function() {
          expect(mainMapPage.getMapTooltipCategoryIcon().getAttribute('class')).toContain('fi-shape-square');
        });

        it('category should be default category', function() {
          expect(mainMapPage.getMapTooltipCategory().getText()).toBe('default category');
        });

        it('on map category should be default category', function() {
          expect(overViewPanelPage.getMapElementCategoryField(2).getText()).toBe('default category');
        });

        it('expand list should have group name', function() {
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
