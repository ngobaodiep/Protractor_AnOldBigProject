(function(){
  'use strict';
  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainMapPage = require('./MainMapPage'),
    filterPanelPage = require('./FilterPanelPage'),
    overViewPanelPage = require('./OverViewPanelPage.js');

    describe('check time since status ',function(){
      describe('when filter is only on at objects switcher ', function() {
        beforeAll(function(){
          browser.wait(testUtils.until.presenceOf(mainPage.getTrackingView()));
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
          browser.wait(testUtils.until.visibilityOf(overViewPanelPage.getOverviewGridRow(1)),3000,"a");
          browser.wait(testUtils.until.presenceOf(element(by.css('.filter-panel.ng-hide'))),3000,"b");
          // browser.wait(testUtils.until.presenceOf(overViewPanelPage.getMapElementStatusTime(1)),3000,"c");
          browser.wait(testUtils.until.elementToBeClickable(overViewPanelPage.getOverviewGridRow(1)),3000,"d");
          overViewPanelPage.getOverviewGridRow(1).click();
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapElementPopup()),3000,"e");
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipName()),3000,"f");
          browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipAddress()),3000,"g");
          browser.wait(function() {
            return mainMapPage.getMapTooltipName().getAttribute('innerHTML').then(function(text) {
              return (text != "");
            });
          });
          // browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipStatusTime()));
          browser.wait(function() {
            return mainMapPage.getMapTooltipAddress().getAttribute('innerHTML').then(function(text) {
              return (text != "") && (text != "Address not found");
            });
          });
        });

        afterAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()),3000,"ak");
          mainPage.clickOverViewButton();
          browser.wait(testUtils.until.stalenessOf(overViewPanelPage.getOverviewPanel()),3000,"bj");
        });

        it('timesince should be found on web', function () {
          overViewPanelPage.getMapElementStatusTime(1).isPresent().then(function(isPresent){
            if(isPresent){
              overViewPanelPage.getMapElementStatusTime(1).getText().then(function(text){
                console.log("overview.object.timesince: "+text);
              });
            }else {
              console.log("overview.object.timestatus: Notfound");
            }
          });
        });

        it('timesince should be found on map', function () {
          mainMapPage.getMapTooltipStatusTime().isPresent().then(function(isPresent){
            if(isPresent){
              mainMapPage.getMapTooltipStatusTime().getText().then(function(text){
                console.log("map.object.timesince: "+text);
              });
            }else {
              console.log("map.object.timestatus: Notfound");
            }
          });
        });
      });

      describe('when filter is only on at machines switcher ', function() {
        beforeAll(function(){
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
          browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()));
          mainPage.clickOverViewButton();
          browser.wait(testUtils.until.presenceOf(overViewPanelPage.getOverviewPanel()),3000,"ac3");
          browser.wait(testUtils.until.visibilityOf(overViewPanelPage.getOverviewGridRow(1)),3000,"ac2");
          browser.wait(testUtils.until.presenceOf(element(by.css('.filter-panel.ng-hide'))),3000,"ac1");
          // browser.wait(testUtils.until.presenceOf(overViewPanelPage.getMapElementStatusTime(1)));
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
          // browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipStatusTime()));
          browser.wait(function() {
            return mainMapPage.getMapTooltipAddress().getAttribute('innerHTML').then(function(text) {
              return (text != "") && (text != "Address not found");
            });
          });
        });

        afterAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()),3000,"ak2");
          mainPage.clickOverViewButton();
          browser.wait(testUtils.until.stalenessOf(overViewPanelPage.getOverviewPanel()),3000,"ak21");
        });

        it('timesince should be found on web', function () {
          overViewPanelPage.getMapElementStatusTime(1).isPresent().then(function(isPresent){
            if(isPresent){
              overViewPanelPage.getMapElementStatusTime(1).getText().then(function(text){
                console.log("overview.machine.timesince: "+text);
              });
            }else {
              console.log("overview.machine.timestatus: Notfound");
            }
          });
        });

        it('timesince should be found on map', function () {
          mainMapPage.getMapTooltipStatusTime().isPresent().then(function(isPresent){
            if(isPresent){
              mainMapPage.getMapTooltipStatusTime().getText().then(function(text){
                console.log("map.machine.timesince: "+text);
              });
            }else {
              console.log("map.machine.timestatus: Notfound");
            }
          });
        });
      });

      describe('when filter is only on at vehicles switcher ', function() {
        beforeAll(function(){
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
          browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()));
          mainPage.clickOverViewButton();
          browser.wait(testUtils.until.presenceOf(overViewPanelPage.getOverviewPanel()));
          browser.wait(testUtils.until.visibilityOf(overViewPanelPage.getOverviewGridRow(1)));
          browser.wait(testUtils.until.presenceOf(element(by.css('.filter-panel.ng-hide'))));
          // browser.wait(testUtils.until.presenceOf(overViewPanelPage.getMapElementStatusTime(1)));
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
          // browser.wait(testUtils.until.presenceOf(mainMapPage.getMapTooltipStatusTime()));
          browser.wait(function() {
            return mainMapPage.getMapTooltipAddress().getAttribute('innerHTML').then(function(text) {
              return (text != "") && (text != "Address not found");
            });
          });
        });

        afterAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(mainPage.getOverviewBtn()),3000,"ak1");
          mainPage.clickOverViewButton();
          browser.wait(testUtils.until.stalenessOf(overViewPanelPage.getOverviewPanel()));
        });

        it('timesince should be found on web', function () {
          overViewPanelPage.getMapElementStatusTime(1).isPresent().then(function(isPresent){
            if(isPresent){
              overViewPanelPage.getMapElementStatusTime(1).getText().then(function(text){
                console.log("overview.vehicle.timesince: "+text);
              });
            }else {
              console.log("overview.vehicle.timestatus: Notfound");
            }
          });
        });

        it('timesince should be found on map', function () {
          mainMapPage.getMapTooltipStatusTime().isPresent().then(function(isPresent){
            if(isPresent){
              mainMapPage.getMapTooltipStatusTime().getText().then(function(text){
                console.log("map.vehicle.timesince: "+text);
              });
            }else {
              console.log("map.vehicle.timestatus: Notfound");
            }
          });
        });
      });
    });
})();
