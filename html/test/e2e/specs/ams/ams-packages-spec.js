(function() {
  "use strict";

  var amsPackagesViewPage = require("../AMSPackagesViewPage"),
    amsMainPage = require("./AMSMainPage"),
    testUtils = require("../TestUtils");

  describe("On AMS packages view", function() {
    var random_number,
      number = 2;
    describe("check", function() {
      beforeAll(function() {
        // click on packages view tab
        browser.wait(testUtils.until.presenceOf(amsMainPage.getPackagesViewTab()));
        amsMainPage.clickPackagesViewTab();
        browser.wait(testUtils.until.visibilityOf(amsPackagesViewPage.getPackagesGrid()));
      });

      it("packages view should be present", function() {
        expect(amsMainPage.getPackagesView().isDisplayed()).toBeTruthy();
      });

      it("packages grid should be present", function() {
        expect(amsPackagesViewPage.getPackagesGrid().isDisplayed()).toBeTruthy();
      });

      it("create button should be present", function() {
        expect(amsPackagesViewPage.getPackageCreateButton().isDisplayed()).toBeTruthy();
      });
    });

    describe("when create button is clicked", function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        amsPackagesViewPage.clickCreateButton();
        browser.wait(testUtils.until.visibilityOf(amsPackagesViewPage.getPackageCreationForm()));
        browser.wait(testUtils.until.visibilityOf(amsPackagesViewPage.getGeneralTab()));
        browser.wait(testUtils.until.visibilityOf(amsPackagesViewPage.getMapTab()));
        browser.wait(testUtils.until.visibilityOf(amsPackagesViewPage.getReportsTab()));
        browser.wait(testUtils.until.visibilityOf(amsPackagesViewPage.getSettingsTab()));
      });

      describe("check", function() {
        it("create form should be displayed", function() {
          expect(amsPackagesViewPage.getPackageCreationForm().isDisplayed()).toBeTruthy();
        });

        it("package info tab should be displayed", function() {
          expect(amsPackagesViewPage.getPackageInfoTab().isDisplayed()).toBeTruthy();
        });

        it("general tab should be displayed", function() {
          expect(amsPackagesViewPage.getGeneralTab().isDisplayed()).toBeTruthy();
        });

        it("map tab should be displayed", function() {
          expect(amsPackagesViewPage.getMapTab().isPresent()).toBeTruthy();
        });

        it("reports tab should be displayed", function() {
          expect(amsPackagesViewPage.getReportsTab().isDisplayed()).toBeTruthy();
        });

        it("settings tab should be displayed", function() {
          expect(amsPackagesViewPage.getSettingsTab().isDisplayed()).toBeTruthy();
        });

        it("WoC tab should be displayed", function() {
          expect(amsPackagesViewPage.getWorkerConnectTab().isDisplayed()).toBeTruthy();
        });

        it("form save button should be displayed", function() {
          expect(amsPackagesViewPage.getFormSaveButton().isDisplayed()).toBeTruthy();
        });

        it("form cancel button should be displayed", function() {
          expect(amsPackagesViewPage.getFormCancelButton().isDisplayed()).toBeTruthy();
        });
      });

      describe("check creating a new package", function() {
        beforeAll(function() {
          browser.wait(testUtils.until.visibilityOf(element(by.css('input[ng-model="packaging.name"]'))));
          amsPackagesViewPage.fillPackageInfoTab(random_number);
          amsPackagesViewPage.clickGeneralTab();
          amsPackagesViewPage.fillGeneralTab();
          amsPackagesViewPage.clickMapTab();
          amsPackagesViewPage.fillMapTab();
          amsPackagesViewPage.clickReportsTab();
          amsPackagesViewPage.fillReportsTab();
          amsPackagesViewPage.clickSettingsTab();
          amsPackagesViewPage.fillSettingsTab();
          amsPackagesViewPage.clickWoCTab();
          amsPackagesViewPage.fillWoCTab();
          amsPackagesViewPage.clickFormSaveButton();
          browser.wait(testUtils.until.visibilityOf(amsPackagesViewPage.getPackageName("package " + random_number)));
          amsPackagesViewPage.getPackageHeaders().each(function(elem, index) {
            elem.element(by.css("span")).isPresent().then(function(present) {
              if (present) {
                elem.element(by.css("span")).getText().then(function(text) {
                  if (text.localeCompare("package " + random_number) == 0) {
                    number = index + 1;
                  }
                });
              }
            });
          });
          browser.wait(testUtils.until.stalenessOf(amsPackagesViewPage.getLoadingMask()));
        });

        describe("check", function() {
          it("new package should be present on the list", function() {
            expect(amsPackagesViewPage.getPackageName("package " + random_number).isDisplayed()).toBeTruthy();
          });

          it("package list element edit button must be present", function() {
            expect(amsPackagesViewPage.getPackageHeaders().get(number - 1).element(by.css("button.fi-pencil")).isPresent()).toBeTruthy();
          });

          it("package list element delete button must be present", function() {
            expect(amsPackagesViewPage.getPackageHeaders().get(number - 1).element(by.css("button.fi-trash")).isPresent()).toBeTruthy();
          });

          it("history days value", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(2, number).getText()).toBe("3");
          });

          it("Lora messages number value", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(3, number).getText()).toBe("12");
          });

          it("api state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(4, number).getText()).toBe("true");
          });

          it("journey calculation state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(7, number).getText()).toBe("true");
          });

          it("nearest assets state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(8, number).getText()).toBe("true");
          });

          it("address search state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(9, number).getText()).toBe("false");
          });

          it("who was there state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(11, number).getText()).toBe("true");
          });

          it("map state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(12, number).getText()).toBe("true");
          });

          it("statistics state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(13, number).getText()).toBe("true");
          });

          it("activity logs state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(14, number).getText()).toBe("true");
          });

          it("journeys state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(15, number).getText()).toBe("false");
          });

          it("export state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(17, number).getText()).toBe("false");
          });

          it("subscriptions state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(18, number).getText()).toBe("false");
          });

          it("advanced filters state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(19, number).getText()).toBe("false");
          });

          it("journeys value", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(20, number).getText()).toBe("true");
          });

          it("geozones value", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(21, number).getText()).toBe("true");
          });

          it("notifications value", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(22, number).getText()).toBe("true");
          });

          it("woking time value", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(23, number).getText()).toBe("true");
          });

          it("temperature details value", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(24, number).getText()).toBe("true");
          });

          it("equipment value", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(25, number).getText()).toBe("true");
          });

          it("machine value", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(26, number).getText()).toBe("true");
          });

          it("packages.fields.tool value", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(27, number).getText()).toBe("true");
          });

          it("Export/Import state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(29, number).getText()).toBe("true");
          });

          it("Groups state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(30, number).getText()).toBe("true");
          });

          it("Geozone categories state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(31, number).getText()).toBe("true");
          });

          it("Account sharing state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(32, number).getText()).toBe("true");
          });

          it("Max. number of geozones state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(33, number).getText()).toBe("3");
          });

          it("Max. maintenance per vehicle state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(35, number).getText()).toBe("3");
          });

          it("Max. number of business rules state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(36, number).getText()).toBe("3");
          });

          it("Advanced business rules settings state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(37, number).getText()).toBe("true");
          });

          it("SMS alert state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(38, number).getText()).toBe("true");
          });

          it("Activate WoC state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(40, number).getText()).toBe("true");
          });

          it("Unit Price value", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(41, number).getText()).toBe("40");
          });

          it("Validation report state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(42, number).getText()).toBe("true");
          });

          it("Edit TB state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(43, number).getText()).toBe("true");
          });

          it("Delete TB state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(44, number).getText()).toBe("true");
          });

          it("Export excel state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(45, number).getText()).toBe("true");
          });

          it("Export PDF state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(46, number).getText()).toBe("true");
          });

          it("Create site state", function() {
            expect(amsPackagesViewPage.getFieldOfGrid(47, number).getText()).toBe("true");
          });
        });
      });
    });

    describe("when updating a new package", function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        browser.executeScript("arguments[0].click();", amsPackagesViewPage.getPackageHeaders().get(number - 1).element(by.css("button.fi-pencil")).getWebElement());
        browser.wait(testUtils.until.presenceOf(amsPackagesViewPage.getPackageCreationForm()));

        browser.wait(testUtils.until.visibilityOf(element(by.css('input[ng-model="packaging.name"]'))));
        amsPackagesViewPage.fillPackageInfoTab(random_number);
        amsPackagesViewPage.clickGeneralTab();
        amsPackagesViewPage.editGeneralTab();
        amsPackagesViewPage.clickMapTab();
        amsPackagesViewPage.editMapTab();
        amsPackagesViewPage.clickReportsTab();
        amsPackagesViewPage.fillReportsTab();
        amsPackagesViewPage.clickSettingsTab();
        amsPackagesViewPage.editSettingsTab();
        amsPackagesViewPage.clickWoCTab();
        amsPackagesViewPage.editWoCTab();
        amsPackagesViewPage.clickFormSaveButton();
        browser.wait(testUtils.until.visibilityOf(amsPackagesViewPage.getPackageName("package " + random_number)));
        browser.wait(testUtils.until.stalenessOf(amsPackagesViewPage.getLoadingMask()));

        amsPackagesViewPage.getPackageHeaders().each(function(elem, indexx) {
          elem.element(by.css("span")).isPresent().then(function(present) {
            if (present) {
              elem.element(by.css("span")).getText().then(function(text) {
                if (text.localeCompare("package " + random_number) == 0) {
                  number = indexx + 1;
                }
              });
            }
          });
        });
      });

      it("new package should be present on the list", function() {
        expect(amsPackagesViewPage.getPackageName("package " + random_number).isDisplayed()).toBeTruthy();
      });

      it("package list element edit button must be present", function() {
        expect(amsPackagesViewPage.getPackageHeaders().get(number - 1).element(by.css("button.fi-pencil")).isPresent()).toBeTruthy();
      });

      it("package list element delete button must be present", function() {
        expect(amsPackagesViewPage.getPackageHeaders().get(number - 1).element(by.css("button.fi-trash")).isPresent()).toBeTruthy();
      });

      it("history days value", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(2, number).getText()).toBe("6");
      });

      it("Lora messages number value", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(3, number).getText()).toBe("12");
      });

      it("api state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(4, number).getText()).toBe("false");
      });

      it("journey calculation state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(7, number).getText()).toBe("true");
      });

      it("nearest assets state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(8, number).getText()).toBe("true");
      });

      it("address search state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(9, number).getText()).toBe("false");
      });

      it("who was there state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(11, number).getText()).toBe("false");
      });

      it("map state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(12, number).getText()).toBe("true");
      });

      it("statistics state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(13, number).getText()).toBe("true");
      });

      it("check activity logs state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(14, number).getText()).toBe("false");
      });

      it("journeys state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(15, number).getText()).toBe("false");
      });

      it("export state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(17, number).getText()).toBe("true");
      });

      it("subscriptions state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(18, number).getText()).toBe("true");
      });

      it("advanced filters state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(19, number).getText()).toBe("true");
      });

      it("journeys state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(20, number).getText()).toBe("true");
      });

      it("geozones state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(21, number).getText()).toBe("true");
      });

      it("notifications state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(22, number).getText()).toBe("true");
      });

      it("working time state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(23, number).getText()).toBe("true");
      });

      it("temperature details state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(24, number).getText()).toBe("true");
      });

      it("equipment state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(25, number).getText()).toBe("true");
      });

      it("machine state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(26, number).getText()).toBe("true");
      });

      it("packages.fields.tool value", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(27, number).getText()).toBe("true");
      });

      it("Export/Import state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(29, number).getText()).toBe("true");
      });

      it("Groups state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(30, number).getText()).toBe("true");
      });

      it("Geozone categories state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(31, number).getText()).toBe("false");
      });

      it("Account sharing state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(32, number).getText()).toBe("false");
      });

      it("Max. number of geozones state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(33, number).getText()).toBe("1");
      });

      it("Max. maintenance per vehicle state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(35, number).getText()).toBe("1");
      });

      it("Max. number of business rules state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(36, number).getText()).toBe("1");
      });

      it("Advanced business rules settings state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(37, number).getText()).toBe("true");
      });

      it("SMS alert state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(38, number).getText()).toBe("true");
      });

      it("Activate WoC state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(40, number).getText()).toBe("true");
      });

      it("Unit Price value", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(41, number).getText()).toBe("40");
      });

      it("validation report state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(42, number).getText()).toBe("true");
      });

      it("Edit TB state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(43, number).getText()).toBe("false");
      });

      it("Delete TB state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(44, number).getText()).toBe("false");
      });

      it("Export excel state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(45, number).getText()).toBe("false");
      });

      it("Export PDF state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(46, number).getText()).toBe("false");
      });

      it("Create site state", function() {
        expect(amsPackagesViewPage.getFieldOfGrid(47, number).getText()).toBe("false");
      });
    });

    describe("when deleting a package", function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(amsPackagesViewPage.getPackageHeaders().get(number - 1).element(by.css("button.fi-trash"))));
        browser.executeScript("arguments[0].click();", amsPackagesViewPage.getPackageHeaders().get(number - 1).element(by.css("button.fi-trash")).getWebElement());
        browser.wait(testUtils.until.presenceOf(element(by.css(".warn-modal"))));
        amsPackagesViewPage.clickWarningDeleteButton();
        browser.wait(testUtils.until.stalenessOf(element(by.css(".warn-modal"))));
        browser.wait(testUtils.until.stalenessOf(amsPackagesViewPage.getPackageName("package " + random_number)));
        browser.wait(testUtils.until.stalenessOf(amsPackagesViewPage.getLoadingMask()));
      });

      it("package should not be present on the list", function() {
        expect(amsPackagesViewPage.getPackageName("package " + random_number).isPresent()).toBe(false);
      });
    });
  });
})();
