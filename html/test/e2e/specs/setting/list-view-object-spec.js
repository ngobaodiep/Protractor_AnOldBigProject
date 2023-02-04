(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    mainPage = require('./MainPage'),
    mainMapPage = require('./MainMapPage'),
    mainSettingsPage = require('./MainSettingsPage'),
    settingsObjectsPage = require('./SettingsObjectsPage'),
    listViewPage = require('./ListViewPage');

  describe('on list view', function() {
    var map_cla,
      web_cla,
      object_name,
      info_expand_list;

    beforeAll(function() {
      info_expand_list = new Map();
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getTrackingTab()));
      mainPage.clickTrackingViewTab();
      browser.wait(testUtils.until.presenceOf(mainPage.getListViewButton()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getListViewButton()));
      mainPage.clickListViewButton();
      browser.wait(testUtils.until.presenceOf(listViewPage.getListView()));
      browser.wait(testUtils.until.stalenessOf(listViewPage.getLoadingMask()));
      browser.wait(testUtils.until.presenceOf(listViewPage.getMobileassetsTab()));
      browser.wait(testUtils.until.elementToBeClickable(listViewPage.getMobileassetsTab()));
      listViewPage.clickMobileassetsTab();
      browser.wait(testUtils.until.stalenessOf(listViewPage.getLoadingMask()));
      browser.wait(testUtils.until.presenceOf(listViewPage.getMobileassetsGridRow(1)));
      browser.wait(testUtils.until.visibilityOf(listViewPage.getMobileassetsGridRow(1).element(by.css('td:nth-child(4) .small-10 span.ng-binding'))));
      browser.wait(testUtils.until.elementToBeClickable(listViewPage.getMobileassetsGridRow(1).element(by.css('td:nth-child(4) .small-10 span.ng-binding'))));
      browser.wait(function(){
        return listViewPage.getMobileassetsGridRow(1).element(by.css('td:nth-child(4) .small-10 span.ng-binding')).getAttribute('innerHTML').then(function(text){
          return text != "";
        });
      });
      listViewPage.getMobileassetsGridRow(1).element(by.css('td:nth-child(1) span.ng-binding')).click();
      browser.wait(testUtils.until.presenceOf(mainMapPage.getOverlayMapAddress()));
      browser.wait(function() {
        return mainMapPage.getOverlayMapAddress().getAttribute('innerHTML').then(function(text) {
          return (text != "")&&(text != "Address not found");
          // return (text != "");
        });
      });
    });

    describe('when object element tooltip of object is shown', function() {
      //name
      it('should have object name same as web element', function() {
        expect(listViewPage.getMobileassetsGridRow(1).element(by.css('td:nth-child(1) span.ng-binding')).getText()).toBe(mainMapPage.getOverlayMapName().getText());
      });
      //status
      it('should have object status same as web element', function() {
        expect(listViewPage.getMobileassetsGridRow(1).element(by.css('td:nth-child(2) .medium-10 strong.ng-binding')).getText()).toBe(mainMapPage.getOverlayMapStatus().getText());
      });

      //status color
      it('should have object status color same as web element', function() {
        expect(listViewPage.getMobileassetsGridRow(1).element(by.css('td:nth-child(2) div.medium-2 span.iconic-md')).getCssValue('color')).toBe(mainMapPage.getOverlayMapTooltip().element(by.css('.map-element-tooltip-header .tooltip-title')).getCssValue('background-color'));
      });
      //category
      it('should have category icon', function() {
        expect(mainMapPage.getOverlayMapCategoryIcon().isPresent()).toBe(true);
      });

      it('should have category same as web element', function() {
        mainMapPage.getOverlayMapCategory().getText().then(function(text) {
          info_expand_list.set('category name', text);
          expect(text).toBe(listViewPage.getMobileassetsGridRow(1).element(by.css('td:nth-child(3) div.medium-11.ng-binding')).getAttribute('innerHTML'));
        });
      });

      it('should have category icon same as web element', function() {
        map_cla = mainMapPage.getOverlayMapCategoryIcon().getAttribute('class').then(function(cla) {
          cla = cla.replace("iconic-md", "");
          return cla.replace(/\s/g, '');
        });
        web_cla = listViewPage.getMobileassetsGridRow(1).element(by.css('td:nth-child(3) span.iconic-md')).getAttribute('class').then(function(cla) {
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
            expect(listViewPage.getMobileassetsGridRow(1).element(by.css('td:nth-child(4) div.small-2 span.iconic-md')).isPresent()).toBe(true);
            expect(listViewPage.getMobileassetsGridRow(1).element(by.css('td:nth-child(4) div.small-10 span.ng-binding')).isPresent()).toBe(true);
            expect(mainMapPage.getOverlayMapAddress().isPresent()).toBe(true);
            expect(listViewPage.getMobileassetsGridRow(1).element(by.css('td:nth-child(4) div.small-10 span.ng-binding')).getText()).toBe(mainMapPage.getOverlayMapAddress().getText());
            map_cla = mainMapPage.getOverlayMapAddressIcon().getAttribute('class').then(function(cla) {
              cla = cla.replace("iconic-md", "");
              return cla.replace(/\s/g, '');
            });
            web_cla = listViewPage.getMobileassetsGridRow(1).element(by.css('td:nth-child(4) div.small-2 span.iconic-md')).getAttribute('class').then(function(cla) {
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
              expect(listViewPage.getMobileassetsGridRow(1).all(by.css('td:nth-child(4) div[ng-repeat="geozone in geozones"]')).get(index).element(by.css('div.small-2 span.iconic-md')).isPresent()).toBe(true);
              expect(listViewPage.getMobileassetsGridRow(1).all(by.css('td:nth-child(4) div[ng-repeat="geozone in geozones"]')).get(index).element(by.css('div.small-10 span.ng-binding')).isPresent()).toBe(true);
              expect(listViewPage.getMobileassetsGridRow(1).all(by.css('td:nth-child(4) div[ng-repeat="geozone in geozones"]')).get(index).element(by.css('div.small-10 span.ng-binding')).getText()).toBe(elem.element(by.css('div.small-10 span.ng-binding')).getText());
              map_cla = elem.element(by.css('div.small-2 span.iconic-md')).getAttribute('class').then(function(cla) {
                cla = cla.replace("iconic-md", "");
                return cla.replace(/\s/g, '');
              });
              web_cla = listViewPage.getMobileassetsGridRow(1).all(by.css('td:nth-child(4) div[ng-repeat="geozone in geozones"]')).get(index).element(by.css('div.small-2 span.iconic-md')).getAttribute('class').then(function(cla) {
                cla = cla.replace("iconic-md", "");
                return cla.replace(/\s/g, '');
              });
              expect(map_cla).toBe(web_cla);
            });
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
            object_name = name;
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
    describe('when on settings object', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(mainPage.getSettingsTab()));
        mainPage.clickSettingsTab();
        browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsMobileassetsButton()));
        mainSettingsPage.clickSettingsMobileassetsButton();
        browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsMobileassetsView()));
        browser.wait(testUtils.until.elementToBeClickable(settingsObjectsPage.getSearchNameInput()));
        settingsObjectsPage.fillSearchNameInput(object_name);
        browser.wait(testUtils.until.stalenessOf(settingsObjectsPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(5) span'))));
        browser.wait(function(){
          return settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(5) span')).getText().then(function(text){
            return text != "";
          });
        });
        browser.wait(function(){
          return settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(3) div.ng-binding')).getText().then(function(txt){
            return txt != "";
          });
        });
        browser.wait(testUtils.until.visibilityOf(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(3) span.iconic-md'))));
        browser.wait(testUtils.until.visibilityOf(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(3) div.ng-binding.medium-11'))));
        browser.wait(testUtils.until.elementToBeClickable(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(3) div.ng-binding.medium-11'))));
      });

      describe('compared with tracking listview object', function() {
        describe('on setting object panel', function() {
          it('should have same reference', function() {
            if ((info_expand_list.has('Reference')) == true) {
              expect(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(1) span.ng-binding')).getText()).toBe(info_expand_list.get('Reference'));
            }
          });

          it('should have same group', function() {
            if ((info_expand_list.has('Group name')) == true) {
              expect(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(5) span.ng-binding')).getText()).toBe(info_expand_list.get('Group name'));
            }
          });

          it('should have same category icon', function() {

            expect(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(3) span.iconic-md')).getAttribute('class')).toContain(info_expand_list.get('category icon'));
          });

          describe('object category ', function() {
            beforeAll(function(){
              browser.wait(testUtils.until.visibilityOf(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(3) div.ng-binding.medium-11'))));
              browser.wait(testUtils.until.elementToBeClickable(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(3) div.ng-binding.medium-11'))));
            });
            it('should have same category name', function() {
              expect(settingsObjectsPage.getGridRow(1).element(by.css('td:nth-child(3) div.ng-binding')).getText()).toBe(info_expand_list.get('category name'));
            });
          });
        });
      });
    });
  });
})();
