(function() {
  "use strict";

  var testUtils = require("./TestUtils"),
    fs = require("fs"),
    glob = require("glob"),
    mainPage = require("./MainPage"),
    mainSettingsPage = require("./MainSettingsPage"),
    timeBookingsTasksPage = require("./TimeBookingsTasksPage");

  describe("on settings time booking,", function() {

    var random_number;
    var fileName;
    var pathFolder;
    var files = [];
    var filesArray = [];

    beforeAll(function() {

      browser.wait(testUtils.until.presenceOf(timeBookingsTasksPage.getActivitiesTab()));
      timeBookingsTasksPage.clickActivitiesTab();
      browser.wait(testUtils.until.presenceOf(timeBookingsTasksPage.getActivitiesView()));
    });

    describe("check list of task elements,", function() {

      it("should have a create new task button", function() {
        expect(timeBookingsTasksPage.getCreateTaskButton().isPresent()).toBe(true);
        expect(timeBookingsTasksPage.getCreateTaskButton().isDisplayed()).toBe(true);
      });

      it("should have task options button", function() {
        expect(timeBookingsTasksPage.getTaskOptionsButton().isPresent()).toBe(true);
      });

      it("should have table header name title", function() {
        expect(
          timeBookingsTasksPage.getGridHeader().element(by.css("div:nth-child(1).columns label"))
          .isPresent()
        ).toBe(true);
      });

      it("should have table header reference title", function() {
        expect(
          timeBookingsTasksPage.getGridHeader().element(by.css("div:nth-child(2).columns label"))
          .isPresent()
        ).toBe(true);
      });

      it("should have table header description title", function() {
        expect(
          timeBookingsTasksPage.getGridHeader().element(by.css("div:nth-child(3).columns label"))
          .isPresent()
        ).toBe(true);
      });

      it("should have table header color title", function() {
        expect(
          timeBookingsTasksPage.getGridHeader().element(by.css("div:nth-child(4).columns .control-filter"))
          .isPresent()
        ).toBe(true);
      });

      it("should have table header absence title", function() {
        expect(
          timeBookingsTasksPage.getGridHeader().element(by.css("div:nth-child(5) label"))
          .isPresent()
        ).toBe(true);
      });

      it("should have table header name search", function() {
        expect(
          timeBookingsTasksPage.getGridHeader().element(by.css("div:nth-child(1) .control-filter input"))
          .isPresent()
        ).toBe(true);
      });

      it("should have table header reference search", function() {
        expect(
          timeBookingsTasksPage.getGridHeader().element(by.css("div:nth-child(2) .control-filter input"))
          .isPresent()
        ).toBe(true);
      });

      it("should have table header description search", function() {
        expect(
          timeBookingsTasksPage.getGridHeader().element(by.css("div:nth-child(3) .control-filter input"))
          .isPresent()
        ).toBe(true);
      });

      it("should have table header color search", function() {
        expect(
          timeBookingsTasksPage.getGridHeader().element(by.css("div:nth-child(4) .control-filter .k-header"))
          .isPresent()
        ).toBe(true);
      });

      it("should have table header absence search", function() {
        expect(
          timeBookingsTasksPage.getGridHeader().element(by.css("div:nth-child(5) label.switch-paddle"))
          .isPresent()
        ).toBe(true);
      });

      describe("on options dropdown,", function() {

        beforeAll(function() {

          browser.wait(testUtils.until.elementToBeClickable(timeBookingsTasksPage.getTaskOptionsButton()));
          timeBookingsTasksPage.getTaskOptionsButton().click();
          browser.wait(testUtils.until.presenceOf(timeBookingsTasksPage.getDropdownOptionsContent()));
        });

        afterAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(timeBookingsTasksPage.getTaskOptionsButton()));
          timeBookingsTasksPage.getTaskOptionsButton().click();
          browser.wait(testUtils.until.stalenessOf(timeBookingsTasksPage.getDropdownOptionsContent()));
        });

        it("should have download template button", function() {
          expect(
            timeBookingsTasksPage.getTemplateDownloadButton().isPresent()
          ).toBe(true);
        });

        it("should have import button", function() {
          expect(timeBookingsTasksPage.getImportButton().isPresent()).toBe(true);
        });

        it("should have export button", function() {
          expect(timeBookingsTasksPage.getExportBtn().isPresent()).toBe(true);
        });
      });
    });

    describe("check form of task creation,", function() {

      beforeAll(function() {

        timeBookingsTasksPage.clickCreateTaskButton();
        browser.wait(testUtils.until.presenceOf(timeBookingsTasksPage.getCreateModal()));
        browser.wait(testUtils.until.presenceOf(timeBookingsTasksPage.getActivitiesFields().element(by.css('.reference-field span.invalid-field.ng-binding'))));
      });

      it('should have create modal title', function() {
        expect(timeBookingsTasksPage.getCreateModalTitle().isPresent()).toBe(true);
        expect(timeBookingsTasksPage.getCreateModalTitle().getText()).toBe("Define your activity");
      });

      it('should have absence switcher', function() {
        expect(timeBookingsTasksPage.getAbsenceSwitcher().isPresent()).toBe(true);
      });

      it('should have optional absence title', function() {
        expect(timeBookingsTasksPage.getOptionalAbsenceTitle().isPresent()).toBe(true);
        expect(timeBookingsTasksPage.getOptionalAbsenceTitle().isDisplayed()).toBe(true);
      });

      it('should have optional absence title description', function() {
        expect(timeBookingsTasksPage.getOptionalAbsenceTitle().element(by.css('.switch-text')).isPresent()).toBe(true);
      });

      it('should have optional absence title icon', function() {
        expect(timeBookingsTasksPage.getOptionalAbsenceTitle().element(by.css('.icon-info2')).isPresent()).toBe(true);
      });

      it("reference field should be required", function() {
        expect(timeBookingsTasksPage.getActivitiesFields().element(by.css('.reference-field span.invalid-field.ng-binding:not(.ng-hide)')).isPresent()).toBe(true);
        expect(timeBookingsTasksPage.getActivitiesFields().element(by.css('.reference-field span.invalid-field.ng-binding:not(.ng-hide)')).getText()).toContain("This field has errors or is required");
      });

      it("name should be required", function() {
        expect(timeBookingsTasksPage.getActivitiesFields().element(by.css(".name-field span.invalid-field:not(.ng-hide)")).isPresent()).toBe(true);
        expect(timeBookingsTasksPage.getActivitiesFields().element(by.css(".name-field span.invalid-field:not(.ng-hide)")).getText()).toContain("This field has errors or is required");
      });

      it('should have name label', function() {
        expect(timeBookingsTasksPage.getActivitiesFields().element(by.css(".name-field .medium-10 label")).isPresent()).toBe(true);
        expect(timeBookingsTasksPage.getActivitiesFields().element(by.css(".name-field .medium-10 label")).getText()).toContain("Activity name");
      });

      it('should have reference label', function() {
        expect(timeBookingsTasksPage.getActivitiesFields().element(by.css(".reference-field label")).isPresent()).toBe(true);
        expect(timeBookingsTasksPage.getActivitiesFields().element(by.css(".reference-field label")).getText()).toContain("Reference");
      });

      it('should have description label', function() {
        expect(timeBookingsTasksPage.getActivitiesFields().element(by.css(".description-field label")).isPresent()).toBe(true);
        expect(timeBookingsTasksPage.getActivitiesFields().element(by.css(".description-field label")).getText()).toContain("Description");
      });
    });

    describe("when a task created,", function() {

      beforeAll(function() {

        random_number = new Date().getTime();
        timeBookingsTasksPage.createNewTask(random_number);
        browser.wait(testUtils.until.stalenessOf(timeBookingsTasksPage.getLoaderSpinner()));

      });

      describe('on the list,', function() {

beforeAll(function () {

  browser.wait(testUtils.until.visibilityOf(timeBookingsTasksPage.getSearchNameInput()));
  timeBookingsTasksPage.fillSearchNameInput("task" + random_number);
  browser.wait(function () {
    return timeBookingsTasksPage.getAllTaskListRow().count().then(function (count) {
      return count == 1;
    });
  });
});

it("should be found on list", function() {
  expect(
    timeBookingsTasksPage
    .getTaskListRow(1)
    .element(by.css(".name span"))
    .getText()
  ).toEqual("task" + random_number);
});

it("should have edit button", function() {
  expect(
    timeBookingsTasksPage
    .getTaskListRow(1)
    .element(by.css(".buttons button.fi-pencil"))
    .isPresent()
  ).toBe(true);
});

it("should have delete button", function() {
  expect(
    timeBookingsTasksPage
    .getTaskListRow(1)
    .element(by.css(".buttons button.fi-trash"))
    .isPresent()
  ).toBe(true);
});
      });
    });

    describe("when task edited,", function() {

      beforeAll(function() {

        timeBookingsTasksPage.getTaskListRow(1).element(by.css(".buttons button.fi-pencil")).click();
        timeBookingsTasksPage.editTask(random_number);
        browser.wait(testUtils.until.stalenessOf(timeBookingsTasksPage.getCreateModal()));
        browser.wait(testUtils.until.stalenessOf(timeBookingsTasksPage.getLoaderSpinner()));
      });

      describe('and on the list,', function() {
        beforeAll(function () {
          browser.wait(testUtils.until.visibilityOf(timeBookingsTasksPage.getSearchNameInput()));
          timeBookingsTasksPage.fillSearchNameInput("editedTask" + random_number);
          browser.wait(function () {
            return timeBookingsTasksPage.getAllTaskListRow().count().then(function (count) {
              return count == 1;
            });
          });
        });

        it("new task should be found on list", function() {
          expect(
            timeBookingsTasksPage
            .getTaskListRow(1)
            .element(by.css(".name span"))
            .getText()
          ).toEqual("editedTask" + random_number);
        });
      });


    });

    describe("when task deleted", function() {

      beforeAll(function() {

        browser.wait(testUtils.until.elementToBeClickable(timeBookingsTasksPage.getTaskListRow(1).element(by.css(".buttons button.fi-trash"))));
        browser.executeScript("arguments[0].click();",
          timeBookingsTasksPage.getTaskListRow(1).element(by.css(".buttons button.fi-trash"))
          .getWebElement()
        );

        browser.wait(testUtils.until.presenceOf(timeBookingsTasksPage.getWarnModal()));
        timeBookingsTasksPage.clickWarnModalDeleteBtn();
        browser.wait(testUtils.until.stalenessOf(timeBookingsTasksPage.getWarnModal()));
        browser.wait(testUtils.until.stalenessOf(timeBookingsTasksPage.getGridRow(1)));
      });

      it("task should not be found on list", function() {
        expect(timeBookingsTasksPage.getGridRow(1).isPresent()).toBe(false);
      });
    });

    describe("when task from file imported,", function() {

      beforeAll(function() {

        browser.wait(testUtils.until.elementToBeClickable(timeBookingsTasksPage.getTaskOptionsButton()));
        timeBookingsTasksPage.getTaskOptionsButton().click();
        browser.wait(testUtils.until.presenceOf(timeBookingsTasksPage.getDropdownOptionsContent()));
        timeBookingsTasksPage.importFile();

      });

      describe('on the list,', function() {
        beforeAll(function () {
          browser.wait(testUtils.until.visibilityOf(timeBookingsTasksPage.getSearchNameInput()));
          timeBookingsTasksPage.clickSearchNameClearBtn();
          timeBookingsTasksPage.fillSearchNameInput("task 123456789");

          browser.wait(function () {
            return timeBookingsTasksPage.getAllTaskListRow().count().then(function (count) {
              return count == 1;
            });
          });
        });

        it("new task should be found on list", function() {
          expect(
            timeBookingsTasksPage
            .getTaskListRow(1)
            .element(by.css(".name span"))
            .getText()
          ).toEqual("task 123456789");
        });
      });


    });

    describe("when task from import file updated,", function() {

      beforeAll(function() {

        timeBookingsTasksPage.importFileUpdate();
        browser.wait(testUtils.until.visibilityOf(timeBookingsTasksPage.getSearchNameInput()));
        timeBookingsTasksPage.clickSearchNameClearBtn();
        timeBookingsTasksPage.fillSearchNameInput("task 987654321");

        browser.wait(function () {
          return timeBookingsTasksPage.getAllTaskListRow().count().then(function (count) {
            return count == 1;
          });
        });
      });

      it("updated task should be found on list", function() {
        expect(
          timeBookingsTasksPage
          .getTaskListRow(1)
          .element(by.css(".name span"))
          .getText()
        ).toEqual("task 987654321");
      });
    });

    describe("when task from import file deleted,", function() {

      beforeAll(function() {

        timeBookingsTasksPage.clickDeleteButtonOfGridRow(1);
        browser.wait(testUtils.until.presenceOf(timeBookingsTasksPage.getWarnModal()));
        timeBookingsTasksPage.clickWarnModalDeleteBtn();
        browser.wait(testUtils.until.stalenessOf(timeBookingsTasksPage.getGridRow(1)));
      });

      it("task should not be found on list", function() {
        expect(timeBookingsTasksPage.getGridRow(1).isPresent()).toBe(false);
      });
    });

    describe("when task file exported,", function() {

      beforeAll(function() {

        timeBookingsTasksPage.getDropdownOptionsContent().isPresent().then(function(isPresent) {
          if (isPresent != true) {
            timeBookingsTasksPage.getTaskOptionsButton().click();
          }
        }).then(function() {

          pathFolder = process.cwd() + "/resources/test/export_file";
          fileName = pathFolder + "/*.xlsx";

          try {
            files = fs.readdirSync(pathFolder);
            for (var i = 0; i < files.length; i++) {
              if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
                fs.unlinkSync(pathFolder + "/" + files[i]);
              }
            }

          } catch (e) {
            return;
          }

          browser.wait(testUtils.until.elementToBeClickable(timeBookingsTasksPage.getExportBtn()));
          browser.executeScript(
            "arguments[0].click();",
            timeBookingsTasksPage.getExportBtn().getWebElement()
          );

          browser.driver.wait(function() {
              filesArray = glob.sync(pathFolder + "/*.xlsx");
              if (typeof filesArray != "undefined" && filesArray.length > 0) {
                return filesArray;
              }
            })

            .then(function(arr) {
              fileName = arr[0];
            });
          browser.wait(testUtils.until.stalenessOf(element(by.css(".lf-loader-overlay.import-loader"))));
        });

      });

      it("file should be in download directory ", function() {
        expect(fs.existsSync(fileName)).toBe(true);
      });
    });
  });
})();
