/*
    settingsPersonsPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';
  var testUtils = require('./TestUtils');
  var settingsPersonsPage = function() {
    var users_list = element(by.className('users-list')),
      create_modal = element(by.css('.reveal-overlay .reveal .create-modal')),
      createModalForm = create_modal.element(by.className('create-modal-form')),
      create_person_button = users_list.element(by.css('a[ng-click="createPerson()"]')),
      user_checkbox = createModalForm.element(by.css('.checkbox input[ng-model="person.user"]')),
      worker_checkbox = createModalForm.element(by.css('.checkbox input[ng-model="person.worker"]')),
      driver_checkbox = createModalForm.element(by.css('.checkbox input[ng-model="person.driver"]')),

      selectors_title = createModalForm.element(by.css('.row div:nth-of-type(3) .k-input')),
      title_list_entry = element(by.css('.k-animation-container ul[aria-hidden="false"] li[data-offset-index="1"]')),

      first_name = createModalForm.element(by.name('firstname')),
      last_name = createModalForm.element(by.name('lastname')),
      picture = createModalForm.element(by.name('files')),
      dropdown = element(by.css('.k-animation-container ul[aria-hidden="false"]')),
      phone = createModalForm.element(by.name('phoneNumber')),
      email = createModalForm.element(by.name('email')),
      reference = createModalForm.element(by.name('reference')),

      login = createModalForm.element(by.name('userName')),
      password = createModalForm.element(by.name('password')),
      confirm_password = createModalForm.element(by.name('password2')),
      language_button = createModalForm.element(by.css('.row div:nth-of-type(13) div[ng-show="person.user"] span.k-icon')),

      selectors_role = create_modal.element(by.css('div:nth-child(12) div:nth-child(2) span.k-dropdown-wrap')),
      livetracking_list_entry = element(by.css('ul[aria-hidden="false"] li[data-offset-index="1"]')),

      selectors_group = create_modal.element(by.css('.row div:nth-of-type(14) div[ng-show="person.user"] drop-group-tree span.k-dropdown-wrap')),

      selectors_group_worker_driver = create_modal.element(by.css('.row :nth-of-type(18) div[ng-show="person.worker || person.driver"] drop-group-tree span.k-dropdown-wrap')),
      category_worker = create_modal.element(by.css('.row div:nth-of-type(17) div[ng-show="person.worker"] span.k-dropdown-wrap')),
      k_grid = users_list.element(by.className('k-grid')),
      k_grid_header = k_grid.element(by.className('k-grid-header')),
      k_grid_content = k_grid.element(by.className('k-grid-content')),
      worker_connect_filter = k_grid_header.element(by.css('.k-filter-row th:nth-of-type(14) .k-dropdown-wrap')),
      worker_list = k_grid_content.all(by.tagName('tr')),

      loading_mask = element(by.className('k-loading-mask')),
      create_modal_save_btn = create_modal.element(by.css('[ng-click="savePerson(personCreationForm)"]')),

      search_login_input = k_grid_header.element(by.css('.k-filter-row th:nth-child(2) input.k-textbox')),
      search_name_input = k_grid_header.element(by.css('.k-filter-row th:nth-child(3) input.k-textbox')),

      edit_active_switcher = createModalForm.element(by.css('.switch.small .switch-paddle[for="userActive"]')),
      search_login_clear_btn = k_grid_header.element(by.css('.k-filter-row th:nth-child(2) button.k-button')),
      search_name_clear_btn = k_grid_header.element(by.css('.k-filter-row th:nth-child(3) button.k-button')),

      path = require('path'),
      fileToImport,
      absolutePath,
      remote = require('selenium-webdriver/remote');

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getCreatePersonButton = function(){
      return create_person_button;
    };

    this.getSearchLoginClearBtn = function() {
      return search_login_clear_btn;
    };

    this.getSearchLoginInput = function() {
      return search_login_input;
    };

    this.getSearchNameInput = function() {
      return search_name_input;
    };

    this.getPersonListRow = function(n) {
      return k_grid_content.element(by.css('tr:nth-child(' + n + ')'));
    };

    this.getEditButtonOfGridRow = function(n) {
      return k_grid_content.element(by.css('tr:nth-child(' + n + ') a.fi-pencil.editUser'));
    };

    this.getDeleteButtonOfGridRow = function(n) {
      return k_grid_content.element(by.css('tr:nth-child(' + n + ') a.fi-trash.deleteUser'));
    };

    this.getDropdown = function() {
      return dropdown;
    };

    this.getSearchNameDeleteBtn = function() {
      return search_name_clear_btn;
    };

    this.getSelectorsRole = function() {
      return selectors_role;
    };

    this.getWorkerList = function() {
      return worker_list;
    };

    this.getCreateModalSaveBtn = function() {
      return create_modal_save_btn;
    };

    this.clickCreateModalSaveBtn = function() {
      browser.executeScript("arguments[0].click();", create_modal_save_btn.getWebElement());
    };

    this.clickUserCheckbox = function() {
      browser.executeScript("arguments[0].click();", user_checkbox.getWebElement());
    };

    this.clickWorkerCheckbox = function() {
      browser.executeScript("arguments[0].click();", worker_checkbox.getWebElement());
    };

    this.clickDriverCheckbox = function() {
      browser.executeScript("arguments[0].click();", driver_checkbox.getWebElement());
    };

    this.clickSearchLoginDeleteBtn = function() {
      browser.executeScript("arguments[0].click();", search_login_clear_btn.getWebElement());
    };

    this.clickSearchNameDeleteBtn = function() {
      browser.executeScript("arguments[0].click();", search_name_clear_btn.getWebElement());
    };

    this.clickEditActiveSwitcher = function() {
      browser.executeScript("arguments[0].click();", edit_active_switcher.getWebElement());
    };

    this.clickEditButtonOfGridRow = function(n) {
      browser.wait(testUtils.until.elementToBeClickable(this.getEditButtonOfGridRow(n)));
      browser.executeScript("arguments[0].click();", users_list.element(by.css('.k-grid .k-grid-content tr:nth-child(' + n + ') a.fi-pencil.editUser')).getWebElement());
    };

    this.clickDeleteButtonOfGridRow = function(n) {
      browser.wait(testUtils.until.elementToBeClickable(this.getDeleteButtonOfGridRow(n)));
      browser.executeScript("arguments[0].click();", users_list.element(by.css('.k-grid .k-grid-content tr:nth-child(' + n + ') a.fi-trash.deleteUser')).getWebElement());
    };

    this.clickLoginInput = function() {
      browser.executeScript("arguments[0].click();", login.getWebElement());
    };

    this.clickPassword = function() {
      browser.executeScript("arguments[0].click();", password.getWebElement());
    };

    this.clickConfirmPassword = function() {
      browser.executeScript("arguments[0].click();", confirm_password.getWebElement());
    };

    this.clickFirstNameInput = function() {
      browser.executeScript("arguments[0].click();", first_name.getWebElement());
    };

    this.clickLastName = function() {
      browser.executeScript("arguments[0].click();", last_name.getWebElement());
    };

    this.clickPhone = function() {
      browser.executeScript("arguments[0].click();", phone.getWebElement());
    };

    this.clickEmailInput = function() {
      browser.executeScript("arguments[0].click();", email.getWebElement());
    };

    this.clickLanguageButton = function() {
      browser.executeScript("arguments[0].click();", language_button.getWebElement());
    };

    this.clickListElementOfRow = function(n) {
      browser.executeScript("arguments[0].click();", element(by.css('.k-animation-container ul[aria-hidden="false"] li[data-offset-index="' + (n - 1) + '"]')).getWebElement());
    };

    this.clickCreatePersonButton = function() {
      browser.executeScript("arguments[0].click();", create_person_button.getWebElement());
    };

    this.fillLoginInput = function(string) {
      this.clickLoginInput();
      login.clear().sendKeys(string);
    };

    this.fillSearchLoginInput = function(string) {
      search_login_input.click();
      search_login_input.clear().sendKeys(string);
    };

    this.fillSearchNameInput = function(string) {
      search_name_input.click();
      search_name_input.clear().sendKeys(string);
    };

    this.fillPasswordInput = function(string) {
      this.clickPassword();
      password.clear().sendKeys(string);
    };

    this.fillConfirmPassword = function(string) {
      this.clickConfirmPassword();
      confirm_password.clear().sendKeys(string);
    };

    this.fillFirstNameInput = function(string) {
      this.clickFirstNameInput();
      first_name.clear().sendKeys(string);
    };

    this.fillLastNameInput = function(string) {
      this.clickLastName();
      last_name.clear().sendKeys(string);
    };

    this.fillPhoneInput = function(string) {
      this.clickPhone();
      phone.clear().sendKeys(string);
    };

    this.fillEmailInput = function(string) {
      this.clickEmailInput();
      email.clear().sendKeys(string);
    };

    this.fillReferenceInput = function(string) {
      browser.executeScript("arguments[0].click();", reference.getWebElement());
      reference.clear().sendKeys(string);
    };

    this.upLoadPicture = function() {
      browser.setFileDetector(new remote.FileDetector());
      fileToImport = '../../resources/test/settings_person/image_mrs.png';
      absolutePath = path.resolve(__dirname, fileToImport);
      browser.wait(testUtils.until.presenceOf(picture));
      picture.sendKeys(absolutePath);
      // browser.executeScript("arguments[0].style.vis,ibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", picture.getWebElement());
    };

    this.selectTitle = function() {
      browser.executeScript("arguments[0].click();", selectors_title.getWebElement());
      browser.wait(testUtils.until.presenceOf(title_list_entry));
      browser.executeScript("arguments[0].click();", title_list_entry.getWebElement());
    };

    this.selectRole = function() {
      browser.wait(testUtils.until.elementToBeClickable(selectors_role));
      browser.executeScript("arguments[0].click();", selectors_role.getWebElement());
      browser.wait(testUtils.until.visibilityOf(livetracking_list_entry));
      browser.executeScript("arguments[0].click();", livetracking_list_entry.getWebElement());
    };

    this.selectGroupVisibility = function() {
      selectors_group.element(by.css('.k-input')).getText().then(function(text) {
        if (text == "None") {
          browser.wait(testUtils.until.elementToBeClickable(selectors_group));
          browser.executeScript("arguments[0].click();", selectors_group.getWebElement());
          browser.wait(testUtils.until.presenceOf(element(by.css('div:nth-of-type(14) group-tree li.k-item div.ng-scope.k-top span.k-in'))));
          browser.executeScript("arguments[0].click();", element(by.css('div:nth-of-type(14) group-tree li.k-item div.ng-scope.k-top span.k-in')).getWebElement());
        }
      });
    };

    this.editGroupVisibility = function() {
      browser.wait(testUtils.until.elementToBeClickable(selectors_group));
      browser.executeScript("arguments[0].click();", selectors_group.getWebElement());
      browser.executeScript("arguments[0].click();", element(by.css('div:nth-of-type(14) group-tree li.k-item div.k-top.ng-scope span.k-in')).getWebElement());
    };

    this.ViewRole = function(n) {
      browser.wait(testUtils.until.visibilityOf(selectors_role));
      browser.wait(testUtils.until.elementToBeClickable(selectors_role));
      browser.executeScript("arguments[0].click();", selectors_role.getWebElement());
      browser.wait(testUtils.until.visibilityOf(element(by.css('.k-list-container ul[aria-hidden="false"] li.k-item[data-offset-index="' + n + '"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('.k-list-container ul[aria-hidden="false"] li.k-item[data-offset-index="' + n + '"]')).getWebElement());
      browser.wait(testUtils.until.stalenessOf(element(by.css('.k-list-container ul[aria-hidden="false"]'))));
    };

    this.selectGroupWorkerDriver = function() {
      browser.wait(testUtils.until.visibilityOf(selectors_group_worker_driver));
      browser.executeScript("arguments[0].click();", selectors_group_worker_driver.getWebElement());
      browser.wait(testUtils.until.presenceOf(element(by.css('div:nth-of-type(18) group-tree li.k-item div.ng-scope span.k-in'))));
      browser.executeScript("arguments[0].click();", element(by.css('div:nth-of-type(18) group-tree li.k-item div.ng-scope span.k-in')).getWebElement());
    };

    this.selectCategoryWorker = function() {
      browser.executeScript("arguments[0].click();", category_worker.getWebElement());
      browser.wait(testUtils.until.presenceOf(element(by.css('.k-animation-container ul[aria-hidden="false"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('.k-animation-container ul[aria-hidden="false"] li[data-offset-index="1"]')).getWebElement());
    };

    this.getWorkerConnectFilter = function() {
      return worker_connect_filter;
    };

    this.selectActiveWorker = function() {
      // browser.executeScript("arguments[0].click();", worker_connect_filter.getWebElement());
      worker_connect_filter.click();
      browser.wait(testUtils.until.presenceOf(element(by.css('.k-animation-container ul[aria-hidden="false"] li[data-offset-index="1"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('.k-animation-container ul[aria-hidden="false"] li[data-offset-index="1"]')).getWebElement());
      browser.wait(testUtils.until.stalenessOf(element(by.css('.k-animation-container ul[aria-hidden="false"]'))));

    };

    this.selectPendingWorker = function() {
      browser.executeScript("arguments[0].click();", worker_connect_filter.getWebElement());
      browser.wait(testUtils.until.presenceOf(element(by.css('.k-animation-container ul[aria-hidden="false"]'))));
      browser.executeScript("arguments[0].click();", element(by.css('.k-animation-container ul[aria-hidden="false"] li[data-offset-index="0"]')).getWebElement());
      browser.wait(testUtils.until.stalenessOf(element(by.css('.k-animation-container ul[aria-hidden="false"]'))));
    };

    this.createNewUser = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.clickUserCheckbox();
      this.selectTitle();
      this.fillFirstNameInput('firstname');
      this.fillLastNameInput('lastname');
      // this.upLoadPicture();
      this.fillPhoneInput('0123456788');
      this.fillEmailInput('test@bitnemo.vn');
      this.selectGroupVisibility();
      this.fillReferenceInput('user reference');
      this.fillLoginInput('test' + random_number);
      this.fillPasswordInput('password');
      this.fillConfirmPassword('password');
      this.clickLanguageButton();
      browser.wait(testUtils.until.presenceOf(this.getDropdown()));
      this.clickListElementOfRow(1);
      this.selectRole();
      browser.wait(testUtils.until.elementToBeClickable(create_modal_save_btn));
      this.clickCreateModalSaveBtn();
      browser.wait(testUtils.until.stalenessOf(create_modal));
    };

    this.editUser = function(random_number) {
      browser.wait(testUtils.until.presenceOf(login));
      this.fillLoginInput('editeduser' + random_number);
      this.clickEditActiveSwitcher();
      this.fillFirstNameInput('edited-fisrtname');
      this.fillLastNameInput('edited-lastname');
      browser.wait(testUtils.until.elementToBeClickable(create_modal_save_btn));
      this.clickCreateModalSaveBtn();
      browser.wait(testUtils.until.stalenessOf(create_modal), 20000, "Can't close create modal when editting person");
    };

    this.createNewWorker = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.clickWorkerCheckbox();
      this.selectTitle();
      this.fillFirstNameInput('worker');
      this.fillLastNameInput(random_number);
      this.fillPhoneInput('0123456788');
      this.fillEmailInput('test@bitnemo.vn');
      this.selectGroupWorkerDriver();
      this.selectCategoryWorker();
      this.fillReferenceInput('worker reference');
      browser.wait(testUtils.until.elementToBeClickable(create_modal_save_btn));
      this.clickCreateModalSaveBtn();
      browser.wait(testUtils.until.stalenessOf(create_modal));
    };

    this.editWorker = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.fillFirstNameInput('editedworker');
      this.fillLastNameInput(random_number);
      browser.wait(testUtils.until.elementToBeClickable(create_modal_save_btn));
      this.clickCreateModalSaveBtn();
      browser.wait(testUtils.until.stalenessOf(create_modal));
    };

    this.createNewDriver = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.clickDriverCheckbox();
      this.selectTitle();
      this.fillFirstNameInput('driver');
      this.fillLastNameInput(random_number);
      this.fillPhoneInput('0123456788');
      this.fillEmailInput('test@bitnemo.vn');
      this.selectGroupWorkerDriver();
      this.fillReferenceInput('driver reference');
      browser.wait(testUtils.until.elementToBeClickable(create_modal_save_btn));
      this.clickCreateModalSaveBtn();
      browser.wait(testUtils.until.stalenessOf(create_modal));
    };

    this.editDriver = function(random_number) {
      browser.wait(testUtils.until.presenceOf(create_modal));
      this.fillFirstNameInput('editeddriver');
      this.fillLastNameInput(random_number);
      browser.wait(testUtils.until.elementToBeClickable(create_modal_save_btn));
      this.clickCreateModalSaveBtn();
      browser.wait(testUtils.until.stalenessOf(create_modal));
    };
  };

  module.exports = new settingsPersonsPage();
})();
