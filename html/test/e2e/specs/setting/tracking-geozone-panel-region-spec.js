(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    geozonePanelPage = require('./GeozonePanelPage'),
    mainMapPage = require('./MainMapPage'),
    mainReportPage = require("./MainReportPage"),
    reportListPage = require("./ReportListPage"),

    mainSettingsPage = require("./MainSettingsPage"),
    historyPanelPage = require('./HistoryPanelPage'),
    warnModal = require('./WarnModal'),
    settingsBusinessRulesPage = require('./SettingsBusinessRulesPage'),
    mainPage = require('./MainPage');

  describe('on tracking geozone panel', function() {

    var address = ["Oberburg 60, 3280 Murten, Switzerland", "Leimera 97, 3280 Murten, Switzerland"],
      checked = false,
      random = new Date().getTime();

    beforeAll(function() {

      browser.wait(testUtils.until.elementToBeClickable(mainPage.getTrackingGeozoneButton()));
      mainPage.clickTrackingGeozoneButton();
      browser.wait(testUtils.until.presenceOf(geozonePanelPage.getGeozonePanel()));
    });

    describe('when region geozone created', function() {

      beforeAll(function() {

        browser.wait(testUtils.until.elementToBeClickable(geozonePanelPage.getCreateGeozoneButton()));
        geozonePanelPage.clickCreateGeozoneButton();
        geozonePanelPage.createRegionGeozone(address[0], random);
        browser.wait(testUtils.until.invisibilityOf(geozonePanelPage.getGeozoneForm()));
        browser.wait(testUtils.until.elementToBeClickable(geozonePanelPage.getSearchNameInput()));

        geozonePanelPage.getSearchNameInput().click();
        geozonePanelPage.getSearchNameInput().sendKeys("RegionGeozone" + random);
        browser.wait(function() {
          return geozonePanelPage.getGeozoneList().count().then(function(cou) {
            return cou == 1;
          });
        });
      });

      it('should have RegionGeozone' + random, function() {
        expect(geozonePanelPage.getNameGeozoneGridRow(1).isPresent()).toBe(true);
        expect(geozonePanelPage.getNameGeozoneGridRow(1).getText()).toBe("RegionGeozone" + random);
      });

      it('should have category', function() {
        expect(geozonePanelPage.getCateroryGeozoneGridRow(1).isPresent()).toBe(true);
        expect(geozonePanelPage.getCateroryGeozoneGridRow(1).isDisplayed()).toBe(true);
      });

      it('should have edit button', function() {
        expect(geozonePanelPage.getEditButtonOfGridRow(1).isPresent()).toBe(true);
        expect(geozonePanelPage.getEditButtonOfGridRow(1).isDisplayed()).toBe(true);
      });

      it('should have edit button', function() {
        expect(geozonePanelPage.getEditButtonOfGridRow(1).isPresent()).toBe(true);
        expect(geozonePanelPage.getEditButtonOfGridRow(1).isDisplayed()).toBe(true);
      });

      it('should have delete button', function() {
        expect(geozonePanelPage.GetDeleteButtonOnList(1).isPresent()).toBe(true);
        expect(geozonePanelPage.GetDeleteButtonOnList(1).isDisplayed()).toBe(true);
      });

      it('should have show geozone button', function() {
        expect(geozonePanelPage.GetSeeButtonOnList(1).isPresent()).toBe(true);
        expect(geozonePanelPage.GetSeeButtonOnList(1).isDisplayed()).toBe(true);
      });

      it('should have no history button', function() {
        expect(geozonePanelPage.GetShowHistoryButtonOnList(1).isDisplayed()).toBe(false);
      });

      it('should have no time spent button', function() {
        expect(geozonePanelPage.GetShowReportButtonOnList(1).isDisplayed()).toBe(false);
      });

      describe('and clicked', function() {

        beforeAll(function() {

          browser.wait(testUtils.until.elementToBeClickable(geozonePanelPage.GetSeeButtonOnList(1)));
          geozonePanelPage.GetSeeButtonOnList(1).click();
          browser.wait(testUtils.until.presenceOf(geozonePanelPage.getGeozoneTooltipOnMap()));
          browser.wait(testUtils.until.presenceOf(geozonePanelPage.getTooltipTittle().element(by.css("div.small-12:nth-child(2) span.ng-binding"))));

          browser.wait(function() {
            return geozonePanelPage.getTooltipTittle().element(by.css("div.small-12:nth-child(1) span.ng-binding")).getText().then(function(text) {
              return text === "RegionGeozone" + random;
            });
          });

          browser.wait(testUtils.until.elementToBeClickable(geozonePanelPage.getTooltipCloseBtn()));
        });

        it('should have geozone tooltip', function() {
          expect(geozonePanelPage.getGeozoneTooltipOnMap().isPresent()).toBe(true);
        });

        it('tooltip name should be same as geozone name', function() {
          expect(geozonePanelPage.getNameGeozoneGridRow(1).getText()).toBe(geozonePanelPage.getTooltipTittle().element(by.css("div.small-12:nth-child(1) span.ng-binding")).getText());
        });

        it('tooltip category should be same as geozone category', function() {
          expect(geozonePanelPage.getCateroryGeozoneGridRow(1).getText()).toBe(geozonePanelPage.getTooltipTittle().element(by.css("div:nth-child(2).small-12 .ng-binding")).getText());
        });

        it('tooltip should have close button', function() {
          expect(geozonePanelPage.getTooltipCloseBtn().isPresent()).toBe(true);
        });

        it('tooltip should have no history button', function() {
          expect(geozonePanelPage.getButtonHistoryPopup().isPresent()).toBe(false);
        });

        it('tooltip should have no last7day button', function() {
          expect(geozonePanelPage.getButtonLast7DaysPopup().isPresent()).toBe(false);
        });
      });

      describe('and checked', function() {

        describe('on settings business rule', function() {

          beforeAll(function() {
            checked = false;
            browser.wait(testUtils.until.elementToBeClickable(mainPage.getSettingsTab()));
            mainPage.getSettingsTab().click();
            browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsBusinessRulesButton()));
            mainSettingsPage.getSettingsBusinessRulesButton().click();

            settingsBusinessRulesPage.getBusinessRuleList();
            browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getCreateBusinessRuleBtn()));
            settingsBusinessRulesPage.getCreateBusinessRuleBtn().click();
            browser.wait(testUtils.until.presenceOf(settingsBusinessRulesPage.getCreateModal()));
            browser.wait(testUtils.until.presenceOf(settingsBusinessRulesPage.getConditionTab()));

            settingsBusinessRulesPage.getConditionTab().click();
            browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getGeozoneConditionBtn()));
            settingsBusinessRulesPage.getGeozoneConditionBtn().click();
            browser.wait(testUtils.until.presenceOf(settingsBusinessRulesPage.getGeozoneCondition()));
            browser.wait(testUtils.until.presenceOf(settingsBusinessRulesPage.getGeozoneCondition().element(by.css("div:nth-child(3).medium-6 .k-multiselect-wrap"))));

            browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getGeozoneCondition().element(by.css("div:nth-child(3).medium-6 .k-multiselect-wrap"))));
            settingsBusinessRulesPage.getGeozoneCondition().element(by.css("div:nth-child(3).medium-6 .k-multiselect-wrap")).click();
            browser.wait(testUtils.until.presenceOf(settingsBusinessRulesPage.getDropDown()));

            settingsBusinessRulesPage.getDropDown().all(by.css("li")).each(function(elm) {
              elm.getText().then(function(text) {
                if (text.includes("RegionGeozone") == true) {
                  checked = true;
                }
              });
            });
          });

          describe('when geozone conditions checked', function() {

            afterAll(function() {

              browser.wait(testUtils.until.elementToBeClickable(settingsBusinessRulesPage.getCreateModalCancelBtn()));
              settingsBusinessRulesPage.getCreateModalCancelBtn().click();
              browser.wait(testUtils.until.stalenessOf(settingsBusinessRulesPage.getCreateModal()));
            });

            it('should have no region geozone on geozone selector', function() {
              expect(checked).toBe(false);
            });
          });
        });
      });

      describe('when region geozone edited', function() {

        beforeAll(function() {

          browser.wait(testUtils.until.elementToBeClickable(mainPage.getTrackingTab()));
          mainPage.getTrackingTab().click();
          browser.wait(testUtils.until.presenceOf(mainPage.getTrackingGeozoneButton()));
          mainPage.getTrackingGeozoneButton().click();
          browser.wait(testUtils.until.elementToBeClickable(geozonePanelPage.getSearchNameInput()));

          geozonePanelPage.fillSearchNameInput("RegionGeozone" + random);
          browser.wait(function() {
            return geozonePanelPage.getGeozoneList().count().then(function(cou) {
              return cou == 1;
            });
          });

          browser.wait(testUtils.until.elementToBeClickable(geozonePanelPage.getEditButtonOfGridRow(1)));
          geozonePanelPage.getEditButtonOfGridRow(1).click();
          geozonePanelPage.editRegionGeozone(address[1], random);
          browser.wait(testUtils.until.invisibilityOf(geozonePanelPage.getGeozoneForm()));
          browser.wait(testUtils.until.elementToBeClickable(geozonePanelPage.getClearSearchButton()));

          geozonePanelPage.getClearSearchButton().click();
          browser.wait(testUtils.until.elementToBeClickable(geozonePanelPage.getSearchNameInput()));
          geozonePanelPage.getSearchNameInput().click();
          geozonePanelPage.getSearchNameInput().sendKeys("EditRegionGeozone" + random);

          browser.wait(function() {
            return geozonePanelPage.getGeozoneList().count().then(function(cou) {
              return cou == 1;
            });
          });
        });

        it('should have edited region geozone', function() {
          expect(geozonePanelPage.getNameGeozoneGridRow(1).isPresent()).toBe(true);
          expect(geozonePanelPage.getNameGeozoneGridRow(1).getText()).toBe("EditRegionGeozone" + random);
        });
      });

      describe('when region geozone deleted', function() {

        beforeAll(function() {

          browser.wait(testUtils.until.elementToBeClickable(geozonePanelPage.GetDeleteButtonOnList(1)));
          geozonePanelPage.GetDeleteButtonOnList(1).click();
          browser.wait(testUtils.until.presenceOf(warnModal.getWarnModal()));
        });

        it('should have warn modal', function() {
          expect(warnModal.getWarnModal().isPresent()).toBe(true);
        });

        it('should have warning title', function() {
          expect(warnModal.getWarnModalTitle().isPresent()).toBe(true);
          expect(warnModal.getWarnModalTitle().getText()).toBe("Delete");
        });

        it('should have warning confirmation', function() {
          expect(warnModal.getWarnModalConfirmation().isPresent()).toBe(true);
          expect(warnModal.getWarnModalConfirmation().getText()).toContain("delete");
          expect(warnModal.getWarnModalConfirmation().getText()).toContain("geozone");
        });

        it('should have warning message', function() {
          expect(warnModal.getWarnModalMessage().isPresent()).toBe(true);
          expect(warnModal.getWarnModalMessage().getText()).toBe("Are you sure you want to continue ?");
        });

        it('should have warning cancel button', function() {
          expect(warnModal.getWarnModalCancelBtn().isPresent()).toBe(true);
        });

        it('should have warning confirm button', function() {
          expect(warnModal.getWarnModalConfirmBtn().isPresent()).toBe(true);
        });

        describe('and warning confirm button clicked', function() {

          beforeAll(function() {

            browser.wait(testUtils.until.elementToBeClickable(warnModal.getWarnModalConfirmBtn()));
            warnModal.getWarnModalConfirmBtn().click();
            browser.wait(testUtils.until.stalenessOf(warnModal.getWarnModal()));
            browser.wait(testUtils.until.stalenessOf(geozonePanelPage.getNameGeozoneGridRow(1)));
          });

          it('should have no region geozone', function() {
            expect(geozonePanelPage.getNameGeozoneGridRow(1).isPresent()).toBe(false);
          });
        });
      });
    });
  });
})();
