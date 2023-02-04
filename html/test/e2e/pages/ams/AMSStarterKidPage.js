(function(){
  'use strict';
  var testUtils = require('./TestUtils');
  var AMSStarterKidPage = function(){
    var   starter_kit_configure_panel = element(by.css('starter-kit-configure-popup-panel div.starter-kit-configure-panel')),
      configure_container = starter_kit_configure_panel.element(by.css('.starter-kit-configure-container .configure-container')),
      language_english = element(by.css('.starter-kit-configure-container .configure-container.first-step .step-1 .cell .language.language-en-EN')),
      language_german = configure_container.element(by.css('.step-1 div.cell:nth-child(1) .language-de-DE')),
      language_franch = configure_container.element(by.css('.step-1 div.cell:nth-child(2) .language-fr-FR')),
      language_Italian = configure_container.element(by.css('.step-1 div.cell:nth-child(3) .language-it-IT')),
      step1_start = configure_container.element(by.css('div.buttons button[ng-click="step1Finished()"]')),
      step2_next = configure_container.element(by.css('div.buttons button[ng-click="step2Finished()"]')),
      step3_save_next = configure_container.element(by.css('div.buttons button[ng-click="step3Finished()"]')),
      step4_save_next = configure_container.element(by.css('div.buttons button[ng-click="step4Finished()"]')),
      configure_header = starter_kit_configure_panel.element(by.css('.starter-kit-configure-header')),
      vehicle_update_form = configure_container.element(by.css('form[name="vehicleUpdateForm"]')),
      person_creation_form = configure_container.element(by.css('form[name="personCreationForm"]')),
      person_title_label = person_creation_form.element(by.css('div.medium-12:nth-child(1) label')),
      person_title_warning = person_creation_form.element(by.css('div.medium-12:nth-child(1) span.invalid-field')),
      person_title_selector = person_creation_form.element(by.css('div.medium-12:nth-child(1) span.k-dropdown .k-dropdown-wrap')),
      first_name_label = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(1) label')),
      first_name_warning = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(1) .invalid-field')),
      first_name_input = element(by.css('input[ng-model="person.firstName"]')),
      last_name_label = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(2) label')),
      last_name_warning = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(2) .invalid-field')),
      last_name_input = element(by.css('input[ng-model="person.lastName"]')),
      phone_label = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(3) label')),
      phone_warning = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(3) .invalid-field')),
      phone_input = element(by.css('input[ng-model="person.phone"]')),
      login_label = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(4) label')),
      login_warning = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(4) span:nth-child(1).invalid-field')),
      login_input = element(by.css('input[ng-model="person.email"]')),
      password_label = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(5) label')),
      password_warning = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(5) span:nth-child(1).invalid-field')),
      password_input = element(by.css('input[ng-model="person.password"]')),
      confirm_password_label = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(6) label')),
      confirm_password_warning = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(6) span:nth-child(1).invalid-field')),
      confirm_password_input = element(by.css('input[ng-model="person.password2"]')),
      company_label = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(7) label')),
      company_warning = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(7) .invalid-field')),
      company_input = element(by.css('input[ng-model="person.companyName"]')),
      street_label = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(8) label')),
      street_warning = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(8) .invalid-field')),
      street_input = element(by.css('input[ng-model="person.addressStreet"]')),
      zipcode_city_label = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(9) label')),
      zipcode_city_warning = person_creation_form.element(by.css('div.medium-12:nth-child(2) div.medium-6:nth-child(9) .invalid-field')),
      zipcode_input = element(by.css('input[ng-model="person.addressPostCode"]')),
      city_input = element(by.css('input[ng-model="person.addressCity"]')),
      country_label = element(by.css('div.medium-12:nth-child(2)  div:nth-child(10) label')),
      country_selecotr = element(by.css('div.medium-12:nth-child(2) div:nth-child(10) label .k-widget .k-dropdown-wrap')),
      hello_name = vehicle_update_form.element(by.css('div.columns-hello span')),
      geobox_1_label = vehicle_update_form.element(by.css('div.vehicle-update:nth-child(3)')),
      vehicle_1_label = vehicle_update_form.element(by.css('div.geobox:nth-child(4) .medium-6 label')),
      vehicle_1_increase_mileage = vehicle_update_form.element(by.css('div:nth-child(4).geobox div:nth-child(2).medium-2 span.k-select span.k-link-increase')),
      vehicle_1_input = element(by.css('input[ng-model="vehicle1.name"]')),
      vehicle_1_warning = vehicle_update_form.element(by.css('div.geobox:nth-child(4) .medium-6 label .invalid-field')),
      step4_text = vehicle_update_form.element(by.css('div:nth-child(2).medium-12 span')),
      vehicle_1_mileage = vehicle_update_form.element(by.css('input[ng-model="vehicle1.mileage"]')),
      vehicle_1_mileage_label = vehicle_update_form.element(by.css('div.geobox:nth-child(4) .medium-2 label')),
      vehicle_1_image_label = vehicle_update_form.element(by.css('div.geobox:nth-child(4) .medium-4 label')),
      vehicle_1_image_warning = vehicle_update_form.element(by.css('div.geobox:nth-child(4) .medium-4 label span.invalid-field')),
      vehicle_1_image_selector = vehicle_update_form.element(by.css('div.geobox:nth-child(4) .medium-4 span.k-widget span.k-dropdown-wrap')),
      geobox_2_label = vehicle_update_form.element(by.css('div:nth-child(5).medium-12 span.geobox-text')),
      vehicle_2_label = vehicle_update_form.element(by.css('div:nth-child(6).geobox div.medium-6 label')),
      vehicle_2_increase_mileage = vehicle_update_form.element(by.css('div:nth-child(6) div:nth-child(2).medium-2 span.k-select span.k-link-increase')),
      vehicle_2_input = element(by.css('input[ng-model="vehicle2.name"]')),
      vehicle_2_warning = vehicle_update_form.element(by.css('div.geobox:nth-child(6) .medium-6 label .invalid-field')),
      vehicle_2_mileage = vehicle_update_form.element(by.css('input[ng-model="vehicle2.mileage"]')),
      vehicle_2_mileage_label = vehicle_update_form.element(by.css('div.geobox:nth-child(6) .medium-2 label')),
      vehicle_2_image_label = vehicle_update_form.element(by.css('div.geobox:nth-child(6) .medium-4 label')),
      vehicle_2_image_warning = vehicle_update_form.element(by.css('div.geobox:nth-child(6) .medium-4 label span.invalid-field')),
      vehicle_2_image_selector = vehicle_update_form.element(by.css('div.geobox:nth-child(6) .medium-4 span.k-widget span.k-dropdown-wrap')),
      step_5_text_left = configure_container.element(by.css('.text-left span')),
      step_5_start_btn = element(by.css('button[ng-click="step5Finished()"]')),
      step_5_video = configure_container.element(by.css('.text-center iframe')),
      release_note_container = element(by.css('release-note-popup-panel .release-note-container')),
      check_all_release_notes = element(by.css('a[ng-click="goToReleaseNotes()"]')),
      release_notes_header = release_note_container.element(by.css('.header')),
      release_notes_like = release_note_container.element(by.css('.buttons span:nth-child(2)')),
      release_notes_dislike = release_note_container.element(by.css('.buttons span:nth-child(4)')),
      release_notes_ok_button = element(by.css('button[ng-click="ok()"]'))
      ;

      this.getStep2Next = function(){
        return step2_next;
      };

      this.getStarterkidConfigurePanel = function(){
        return starter_kit_configure_panel;
      };

      this.getReleaseNotesOKButton = function(){
        return release_notes_ok_button;
      };

      this.getReleaseNotesHeader = function(){
        return release_notes_header;
      };

      this.getReleaseNotesDislikeBtn = function(){
        return release_notes_dislike;
      };

      this.getReleaseNotesLikeBtn = function(){
        return release_notes_like;
      };

      this.getCheckAllReleaseNotes = function(){
        return check_all_release_notes;
      };

      this.getReleaseNoteContainer = function(){
        return release_note_container;
      };

      this.getStep5Video = function(){
        return step_5_video;
      };

      this.getStep5StartBtn = function(){
        return step_5_start_btn;
      };

      this.getStep5TextLeft = function(){
        return step_5_text_left;
      };

      this.getStep4SaveAndNext = function(){
        return step4_save_next;
      };

      this.getVehicle2ImageSelector = function(){
        return vehicle_2_image_selector;
      };

      this.getVehicle2ImageWarning = function(){
        return vehicle_2_image_warning;
      };

      this.getVehicle2ImageLabel = function(){
        return vehicle_2_image_label;
      };

      this.getVehicle2MileageLabel = function(){
        return vehicle_2_mileage_label;
      };

      this.getVehicle2MileageInput = function(){
        return vehicle_2_mileage;
      };

      this.getVehicle2Warning = function(){
        return vehicle_2_warning;
      };

      this.getVehicle2Input = function(){
        return vehicle_2_input;
      };

      this.getVehicle2Label = function(){
        return vehicle_2_label;
      };

      this.getGeobox2Label = function(){
        return geobox_2_label;
      };

      this.getVehicle1ImageSelector = function(){
        return vehicle_1_image_selector;
      };

      this.getVehicle1ImageLabel = function(){
        return vehicle_1_image_label;
      };

      this.getVehicle1ImageWarning = function(){
        return vehicle_1_image_warning;
      };

      this.getVehicle1MileageInput = function(){
        return vehicle_1_mileage;
      };

      this.getVehicle1MileageLabel = function(){
        return vehicle_1_mileage_label;
      };

      this.getVehicle1Warning = function(){
        return vehicle_1_warning;
      };

      this.getVehicle1Input = function(){
        return vehicle_1_input;
      };

      this.getVehicle1Label = function(){
        return vehicle_1_label;
      };

      this.getGeobox1Label = function(){
        return geobox_1_label;
      };

      this.getStep4Text = function(){
        return step4_text;
      };

      this.getHelloName = function(){
        return hello_name;
      };

      this.getVehicleUpdateForm = function(){
        return vehicle_update_form;
      };

      this.getStep3SaveNext = function(){
        return step3_save_next;
      };

      this.getZipcodeInput = function(){
        return zipcode_input;
      };

      this.getCityInput = function(){
        return city_input;
      };

      this.getCountryLabel = function(){
        return country_label;
      };

      this.getCountrySelector = function(){
        return country_selecotr;
      };

      this.getZipCodeCityLabel = function(){
        return zipcode_city_label;
      };

      this.getZipCodeCityWarning = function(){
        return zipcode_city_warning;
      };

      this.getStreetLabel = function(){
        return street_label;
      };

      this.getStreetWarning = function(){
        return street_warning;
      };

      this.getStreetInput = function(){
        return street_input;
      };

      this.getCompanyLabel = function(){
        return company_label;
      };

      this.getCompanyWarning = function(){
        return company_warning;
      };

      this.getCompanyInput = function(){
        return company_input;
      };

      this.getConfirmPasswordLabel = function(){
        return confirm_password_label;
      };

      this.getPasswordWarning = function(){
        return password_warning;
      };

      this.getConfirmPasswordWarning = function(){
        return confirm_password_warning;
      };

      this.getConfirmPasswordInput = function(){
        return confirm_password_input;
      };

      this.getPasswordLabel = function(){
        return password_label;
      };

      this.getPasswordInput = function(){
        return password_input;
      };

      this.getLoginLabel = function(){
        return login_label;
      };

      this.getLoginWarning = function(){
        return login_warning;
      };

      this.getLoginInput = function(){
        return login_input;
      };

      this.getPhoneLabel = function(){
        return phone_label;
      };

      this.getPhoneWarning = function(){
        return phone_warning;
      };

      this.getPhoneInput = function(){
        return phone_input;
      };

      this.getFirstNameWarning = function(){
        return first_name_warning;
      };

      this.getFirstNameInput = function(){
        return first_name_input;
      };

      this.getFirstNameLabel = function(){
        return first_name_label;
      };

      this.getLastNameWarning = function(){
        return last_name_warning;
      };

      this.getLastnameInput = function(){
        return last_name_input;
      };

      this.getLastNameLabel = function(){
        return last_name_label;
      };

      this.getPersonTitleLabel = function(){
        return person_title_label;
      };

      this.getPersonTitleWarning = function(){
        return person_title_warning;
      };

      this.getPersonTitleSelector = function(){
        return person_title_selector;
      };

      this.getPersonCreationForm = function(){
        return person_creation_form;
      };

      this.getConfigureContainer = function(){
        return configure_container;
      };

      this.getConfigureHeader = function(){
        return configure_header;
      };

      this.getLanguageEN = function(){
        return language_english;
      };

      this.getLanguageDE = function(){
        return language_german;
      };

      this.getLanguageFR = function(){
        return language_franch;
      };

      this.getLanguageIT = function(){
        return language_Italian;
      };

      this.getStep1Start = function(){
        return step1_start;
      };

      this.clickStep1Start = function(){
        step1_start.click();
      };

      this.clickStep2Next = function(){
        step2_next.click();
      };

      this.clickLanguageEN = function(){
        // language_english.click();
        browser.executeScript("arguments[0].click();", language_english.getWebElement());
      };

      this.clickPersonTitleSelector = function(){
        person_title_selector.click();
      };

      this.clickFirstNameInput = function(){
        first_name_input.click();
      };

      this.clickLastNameInput = function(){
        last_name_input.click();
      };

      this.clickPhoneInput = function(){
        phone_input.click();
      };

      this.clickStep5StartBtn = function(){
        step_5_start_btn.click();
      };

      this.clickStep3SaveNext = function(){
        step3_save_next.click();
      };

      this.clickConfirmPassword = function(){
        confirm_password_input.click();
      };

      this.clickLoginInput = function(){
        login_input.click();
      };

      this.clickReleaseNotesOkButton = function(){
        release_notes_ok_button.click();
      };

      this.clickPasswordInput = function(){
        password_input.click();
      };

      this.clickCompanyInput = function(){
        company_input.click();
      };

      this.clickStreetInput = function(){
        street_input.click();
      };

      this.clickZipcode = function(){
        zipcode_input.click();
      };

      this.clickCityInput = function(){
        city_input.click();
      };

      this.clickCountrySelector = function(){
        country_selecotr.click();
      };

      this.clickSaveAndNext = function(){
        step3_save_next.click();
      };

      this.clickStep4SaveAndNext = function(){
        step4_save_next.click();
      };

      this.clickVehicle1ImageSelector = function(){
        vehicle_1_image_selector.click();
      };

      this.clickVehicle2ImageSelector = function(){
        vehicle_2_image_selector.click();
      };

      this.selectTitle = function(){
        browser.wait(testUtils.until.elementToBeClickable(this.getPersonTitleSelector()));
        this.clickPersonTitleSelector();
        browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(2)'))));
        browser.wait(testUtils.until.elementToBeClickable(element(by.css('ul[aria-hidden="false"] li:nth-child(2)'))));
        element(by.css('ul[aria-hidden="false"] li:nth-child(2)')).click();
        browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"] li:nth-child(2)'))));
      };

      this.fillFirstName = function(string){
        browser.wait(testUtils.until.elementToBeClickable(this.getFirstNameInput()));
        this.clickFirstNameInput();
        first_name_input.sendKeys(string);
      };

      this.fillLastName = function(string){
        browser.wait(testUtils.until.elementToBeClickable(this.getLastnameInput()));
        this.clickLastNameInput();
        last_name_input.sendKeys(string);
      };

      this.fillPhone = function(string){
        browser.wait(testUtils.until.elementToBeClickable(this.getPhoneInput()));
        this.clickPhoneInput();
        phone_input.sendKeys(string);
      };

      this.fillLogin = function(string){
        browser.wait(testUtils.until.elementToBeClickable(this.getLoginInput()));
        this.clickLoginInput();
        login_input.clear().sendKeys(string);
      };

      this.fillPassword = function(string){
        browser.wait(testUtils.until.elementToBeClickable(this.getPasswordInput()));
        this.clickPasswordInput();
        password_input.clear().sendKeys(string);
      };

      this.fillConfirmPassword = function(string){
        browser.wait(testUtils.until.elementToBeClickable(this.getConfirmPasswordInput()));
        this.clickConfirmPassword();
        confirm_password_input.clear().sendKeys(string);
      };

      this.fillCompany = function(string){
        browser.wait(testUtils.until.elementToBeClickable(this.getCompanyInput()));
        this.clickCompanyInput();
        company_input.clear().sendKeys(string);
      };

      this.fillStreet = function(string){
        browser.wait(testUtils.until.elementToBeClickable(this.getStreetInput()));
        this.clickStreetInput();
        street_input.clear().sendKeys(string);
      };

      this.fillZipCode = function(string){
        browser.wait(testUtils.until.elementToBeClickable(this.getZipcodeInput()));
        this.clickZipcode();
        zipcode_input.clear().sendKeys(string);
      };

      this.fillCity = function(string){
        browser.wait(testUtils.until.elementToBeClickable(this.getCityInput()));
        this.clickCityInput();
        city_input.clear().sendKeys(string);
      };

      this.fillVehicle1Name = function(string){
        browser.wait(testUtils.until.elementToBeClickable(this.getVehicle1Input()));
        this.getVehicle1Input().clear().sendKeys(string);
      };

      this.fillVehicle2Name = function(string){
        browser.wait(testUtils.until.elementToBeClickable(this.getVehicle2Input()));
        this.getVehicle2Input().clear().sendKeys(string);
      };

      this.fillVehicle2MileageInput = function(string){
        browser.wait(testUtils.until.elementToBeClickable(vehicle_2_increase_mileage));
        vehicle_2_increase_mileage.click();
        vehicle_2_increase_mileage.click();
        vehicle_2_increase_mileage.click();
      };

      this.fillVehicle1MileageInput = function(string){
        browser.wait(testUtils.until.elementToBeClickable(vehicle_1_increase_mileage));
        vehicle_1_increase_mileage.click();
        vehicle_1_increase_mileage.click();
        vehicle_1_increase_mileage.click();
      };

      this.selectVehicle1Image = function(){
        browser.wait(testUtils.until.elementToBeClickable(this.getVehicle1ImageSelector()));
        this.clickVehicle1ImageSelector();
        browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(1) span'))));
        browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(1) span')).getWebElement());
        browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"] li:nth-child(1) span'))));
      };

      this.selectVehicle2Image = function(){
        browser.wait(testUtils.until.elementToBeClickable(this.getVehicle2ImageSelector()));
        this.clickVehicle2ImageSelector();
        browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(2) span'))));
        browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(2) span')).getWebElement());
        browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"] li:nth-child(2)'))));
      };

      this.selectCountry = function(){
        browser.wait(testUtils.until.elementToBeClickable(this.getCountrySelector()));
        this.clickCountrySelector();
        browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(2)'))));
           element.all(by.css('ul[aria-hidden="false"] li')).each(function(elm){
            elm.getText().then(function(txt){
                if(txt.includes("Viet Nam") == true){
                  browser.executeScript("arguments[0].click();", elm.getWebElement());
                  browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"]'))));
                }
            });
          });
      };
  };
  module.exports = new AMSStarterKidPage();
})();
