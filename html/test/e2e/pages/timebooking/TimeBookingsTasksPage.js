/*
    TimeBookingsTasksPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/

(function() {
  "use strict";
  var testUtils = require("./TestUtils");
  var TimeBookingsTasksPage = function() {
    var activitiesView = element(by.css(".settings-timebooking .tasks-list")),
      activitiesTab = element(by.css(".settings-timebooking li:nth-child(2) > a")),
      task_list = element(by.css(".settings-view .panel div:nth-child(3).is-active .tasks-list")),
      gridHeader = task_list.element(by.css(".header")),
      create_modal = element(by.css(".create-report-modal")),

      createModalTitle = create_modal.element(by.css(".create-modal-title")),
      create_task_button = task_list.element(by.css('button[ng-click="createTask()"]')),
      activitiesFields = create_modal.element(by.css('.activity-fields')),
      optionalSwichTitle = activitiesFields.element(by.css('.optional-switch-title')),
      absenceSwitcher = activitiesFields.element(by.css('label[for="taskAbsence"]')),

      reference = activitiesFields.element(by.css('input[ng-model="task.reference"]')),
      name = create_modal.element(by.css('input[ng-model="task.name"]')),
      description = create_modal.element(by.css('textarea[ng-model="task.description"]')),
      task_color_button = activitiesFields.element(by.css('.color-field .k-select .k-icon')),
      selected_row_color = element(by.css(".k-colorpalette.k-state-border-up .k-palette tr:nth-of-type(2)")),

      loading_mask = task_list.element(by.css(".k-grid .k-grid-content .k-loading-mask .k-loading-image")),
      loading_spinner = task_list.element(by.css(".lf-loader-overlay .lf-spinner")),
      save_button = element(by.css('button.desktop-action-button[ng-click="save(creationForm)"]')),
      search_name_input = task_list.element(by.css(".header .name input")),
      search_name_clear_btn = task_list.element(by.css(".header .name button.k-button:not(.ng-hide)")),

      pagination_label = task_list.element(by.css(".k-pager-info.k-label")),
      taskOptionsButton = element(by.css('[ng-click="toogleOptions()"]')),
      taskTitle = element(by.css(".tab-content-title")),
      dropdownOptionsContent = element(by.css(".dropdown-content:not(.ng-hide)")),
      import_button = dropdownOptionsContent.element(by.css("span.download-button")),

      downloadExcelTemplate = dropdownOptionsContent.element(by.css("a:nth-child(1)")),
      exportButton = dropdownOptionsContent.element(by.css('a[ng-click="exportTask()"]')),
      remote = require("selenium-webdriver/remote"),
      path = require("path"),
      fileToImport = "../../resources/test/timebooking_task/import_file/template_import_tasks.xlsx",

      updateFileToImport = "../../resources/test/timebooking_task/import_file/template_update_import_tasks.xlsx",
      absolutePath,
      infor_modal = element(by.css(".reveal-overlay .info-modal ")),
      warn_modal = element(by.css(".reveal-overlay .warn-modal button.desktop-action-button"));

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getOptionalAbsenceTitle = function() {
      return optionalSwichTitle;
    };

    this.getAbsenceSwitcher = function() {
      return absenceSwitcher;
    };

    this.getCreateModalTitle = function() {
      return createModalTitle;
    };

    this.getActivitiesFields = function() {
      return activitiesFields;
    };

    this.getDropdownOptionsContent = function() {
      return dropdownOptionsContent;
    };

    this.getTaskTitle = function() {
      return taskTitle;
    };

    this.getExportBtn = function() {
      return exportButton;
    };

    this.getTemplateDownloadButton = function() {
      return downloadExcelTemplate;
    };

    this.getGridHeader = function() {
      return gridHeader;
    };

    this.getTaskOptionsButton = function() {
      return taskOptionsButton;
    };

    this.getLoaderSpinner = function() {
      return loading_spinner;
    };

    this.getCreateModal = function() {
      return create_modal;
    };

    this.getCreateTaskButton = function() {
      return create_task_button;
    };

    this.getImportButton = function() {
      return import_button;
    };

    this.getSearchNameInput = function() {
      return search_name_input;
    };

    this.clickSearchNameClearBtn = function() {
      browser.executeScript("arguments[0].click();", search_name_clear_btn.getWebElement());
    };

    this.getTaskListRow = function(n) {
      return task_list.element(by.css(".results-contain div:nth-child(" + n + ").elements"));
    };

    this.getAllTaskListRow = function() {
      return task_list.all(by.css(".results-contain div.elements .activity-element"));
    };

    this.getGridRow = function(n) {
      return this.getTaskListRow(n).element(by.css("td:nth-child(1)"));
    };

    this.getEditButtonOfGridRow = function(n) {
      return task_list.element(by.css(".results-contain div:nth-child(" + n + ").elements td button.fi-pencil"));
    };

    this.getDeleteButtonOfGridRow = function(n) {
      return task_list.element(by.css(".results-contain div:nth-child(" + n + ").elements td button.fi-trash"));
    };

    this.getPaginationLabel = function(n) {
      return pagination_label;
    };

    this.getWarnModal = function() {
      return warn_modal;
    };

    this.getActivitiesView = function() {
      return activitiesView;
    };

    this.getActivitiesTab = function() {
      return activitiesTab;
    };

    this.clickActivitiesTab = function() {
      browser.executeScript("arguments[0].click();",
        activitiesTab.getWebElement()
      );
    };

    this.clickCreateTaskButton = function(n) {
      browser.executeScript("arguments[0].click();",
        create_task_button.getWebElement()
      );
    };

    this.clickImportButton = function() {
      browser.executeScript("arguments[0].click();", import_button.getWebElement());
    };

    this.clickEditButtonOfGridRow = function(n) {
      browser.executeScript("arguments[0].click();", task_list.element(by.css(".results-contain div:nth-child(" + n + ").elements .buttons button.fi-pencil")).getWebElement());
    };

    this.clickDeleteButtonOfGridRow = function(n) {
      browser.executeScript("arguments[0].click();", task_list.element(by.css(".results-contain div:nth-child(" + n + ").elements .buttons button.fi-trash")).getWebElement());
    };

    this.clickNameInput = function() {
      browser.executeScript("arguments[0].click();", name.getWebElement());
    };

    this.clickReference = function() {
      browser.executeScript("arguments[0].click();", reference.getWebElement());
    };

    this.clickDescription = function() {
      browser.executeScript("arguments[0].click();", description.getWebElement());
    };

    this.clickTaskColorButton = function() {
      browser.executeScript("arguments[0].click();", task_color_button.getWebElement());
    };

    this.clickWarnModalDeleteBtn = function() {
      browser.executeScript("arguments[0].click();", warn_modal.getWebElement());
    };

    this.clickSelectedColor = function(n) {
      browser.executeScript("arguments[0].click();", this.getSelectedColor(n).getWebElement());
    };

    this.clickSearchNameInput = function() {
      browser.executeScript("arguments[0].click();", search_name_input.getWebElement());
    };

    this.clickSaveButton = function() {
      browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };

    this.getSelectedColor = function(n) {
      return selected_row_color.element(by.css("td:nth-of-type(" + n + ")"));
    };

    this.fillNameInput = function(string) {
      this.clickNameInput();
      name.clear().sendKeys(string);
    };

    this.fillReferenceInput = function(string) {
      this.clickReference();
      reference.clear().sendKeys(string);
    };

    this.fillDescriptionInput = function(string) {
      this.clickDescription();
      description.clear().sendKeys(string);
    };

    this.fillSearchNameInput = function(string) {
      this.clickSearchNameInput();
      search_name_input.clear().sendKeys(string);
    };

    this.clickInfoModalOkBtn = function() {
      infor_modal.element(by.css('button[ng-click="cancel()"]')).click();
    };

    this.createNewTask = function(random_number) {
      this.fillNameInput("task" + random_number);
      this.fillReferenceInput("reference" + random_number);
      this.fillDescriptionInput("description");
      this.clickTaskColorButton();
      this.clickSelectedColor(3);
      browser.wait(testUtils.until.elementToBeClickable(save_button));
      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(create_modal));
    };

    this.editTask = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.fillNameInput("editedTask" + random_number);
      this.fillReferenceInput("editedReference" + random_number);
      this.fillDescriptionInput("edit description");
      this.clickTaskColorButton();
      this.clickSelectedColor(4);
      browser.wait(testUtils.until.elementToBeClickable(save_button));
      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(create_modal));
    };

    this.importFile = function() {
      browser.setFileDetector(new remote.FileDetector());
      absolutePath = path.resolve(__dirname, fileToImport);
      import_button.element(by.css('input:nth-child(1)[type="file"]')).sendKeys(absolutePath);
      browser.wait(testUtils.until.stalenessOf(loading_spinner));
      browser.wait(testUtils.until.presenceOf(infor_modal));
      this.clickInfoModalOkBtn();
      browser.wait(testUtils.until.stalenessOf(infor_modal));
      browser.wait(testUtils.until.stalenessOf(loading_spinner));
    };

    this.importFileUpdate = function() {
      browser.setFileDetector(new remote.FileDetector());
      absolutePath = path.resolve(__dirname, updateFileToImport);
      import_button.element(by.css('input:nth-child(1)[type="file"]')).sendKeys(absolutePath);
      browser.wait(testUtils.until.stalenessOf(loading_spinner));
      browser.wait(testUtils.until.presenceOf(infor_modal));
      this.clickInfoModalOkBtn();
      browser.wait(testUtils.until.stalenessOf(infor_modal));
      browser.wait(testUtils.until.stalenessOf(loading_spinner));
    };
  };
  module.exports = new TimeBookingsTasksPage();
})();
