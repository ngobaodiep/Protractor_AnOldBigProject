/*
    SettingsAccountPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';
  var testUtils = require('./TestUtils');
  var SettingsAccountPage = function() {
    var settings_account = element(by.css('.settings-view .panel .settings-account')),
      active_tab_content = settings_account.element(by.css('.tabbable .tabs-content .tabs-panel.is-active')),
      account_general_tab = settings_account.element(by.css('.tabbable li:nth-child(1) a')),
      account_settings_tab = settings_account.element(by.css('.tabbable li:nth-child(2) a')),
      account_advanced_tab = settings_account.element(by.css('.tabbable li:nth-child(3) a')),

      general_name_input = active_tab_content.element(by.css('input[ng-model="account.displayName"]')),
      general_upload_button = active_tab_content.element(by.css('.row div:nth-child(2) label .k-upload input[model="account.accountLogo"]')),
      general_description_input = active_tab_content.element(by.css('input[ng-model="account.description"]')),
      general_address1_input = active_tab_content.element(by.css('input[ng-model="account.address1"]')),
      general_address2_input = active_tab_content.element(by.css('input[ng-model="account.address2"]')),
      general_zipcode_input = active_tab_content.element(by.css('input[ng-model="account.postCode"]')),
      general_city_input = active_tab_content.element(by.css('input[ng-model="account.city"]')),
      general_selected_country = active_tab_content.element(by.css('div.row div:nth-of-type(8) >label > span.k-dropdown span.k-dropdown-wrap span.k-input')),

      contact_admin_name_input = active_tab_content.element(by.css('input[ng-model="account.adminContact"]')),
      contact_admin_phone_input = active_tab_content.element(by.css('.row div.medium-4:nth-child(2) input[ng-model="element"]')),
      contact_admin_email_input = active_tab_content.element(by.css('input[ng-model="account.adminEmail"]')),
      account_bcontact_name_input = active_tab_content.element(by.css('input[ng-model="account.bcontact"]')),
      account_bcontact_phone_input = active_tab_content.element(by.css('.row div.medium-4:nth-child(5) input[ng-model="element"]')),
      account_bcontact_email_input = active_tab_content.element(by.css('input[ng-model="account.bmail"]')),
      account_itcontact_name_input = active_tab_content.element(by.css('input[ng-model="account.iTcontact"]')),
      account_itcontact_phone_input = active_tab_content.element(by.css('.row div.medium-4:nth-child(8) input[ng-model="element"]')),
      account_itcontact_email_input = active_tab_content.element(by.css(' input[ng-model="account.iTmail"]')),

      settings_timezone = active_tab_content.element(by.css('.row div:nth-of-type(1) >label> span  ')),
      english_us_list_entry = element(by.css('ul[aria-hidden="false"] li[data-offset-index="0"]')),
      english_uk_list_entry = element(by.css('ul[aria-hidden="false"] li[data-offset-index="1"]')),
      french_france_list_entry = element(by.css('ul[aria-hidden="false"] li[data-offset-index="2"]')),
      french_switzerland_list_entry = element(by.css('ul[aria-hidden="false"] li[data-offset-index="3"]')),
      german_switzerland_list_entry = element(by.css('ul[aria-hidden="false"] li[data-offset-index="4"]')),
      german_germany_list_entry = element(by.css('ul[aria-hidden="false"] li[data-offset-index="5"]')),
      settings_language_locale = active_tab_content.element(by.css('.row div:nth-of-type(2) >label > span.k-widget')),
      settings_date_time_format = active_tab_content.element(by.css('.row div:nth-of-type(3) .medium-6.columns > span > b ')),
      settings_start_week = active_tab_content.element(by.css('.row div:nth-of-type(4) .ng-binding .k-widget')),
      settings_volume_unit = active_tab_content.element(by.css('.row div:nth-of-type(11) >label >span.k-widget')),
      settings_default_intervention_time =  active_tab_content.element(by.css('input[k-options="journeyOptmizerDefaultInterventionTimeOptions"]')),

      advanced_tracked_monitor = active_tab_content.element(by.css('.row .switch.small .switch-paddle[for="monitorVehicleTrackedInBusinessRules"] ')),

      warning_info_modal = element(by.css('.reveal-overlay .reveal.dialog-modal .info-modal')),
      warning_ok_button = warning_info_modal.element(by.css('button.ok')),

      save_button = settings_account.element(by.css('button.desktop-action-button')),
      reset_button = settings_account.element(by.css('button.desktop-secondary-action-button')),
      /*
      TO-DO var arr = ['TimeZone','Currency','Start of the week','Distance unit'
                            'Speed unit','Volume','Fuel consumption','Pressure unit',
                            'Temperature unit','Latiude/Longtiude','Date And Time Format'
                            ]
      */
      arrUS = ['America/New_York', '$ USD', 'Sunday', 'mi',
        'mph', 'gal US', 'gal US', 'psi',
        '°F', 'decimal', 'MM/dd/yyyy h:mm a'
      ],
      arrUK = ['Europe/London', '£ GBP', 'Monday', 'mi',
        'mph', 'gal UK', 'gal UK', 'psi',
        '°F', 'decimal', 'dd/MM/yyyy h:mm a'
      ],
      arrFF = ['Europe/Zurich', '€ EUR', 'Monday', 'km',
        'km/h', 'l', 'l', 'bar',
        '°C', 'decimal', 'dd/MM/yyyy HH:mm'
      ],
      arrGG = ['Europe/Zurich', '€ EUR', 'Monday', 'km',
        'km/h', 'l', 'l', 'bar',
        '°C', 'decimal', 'dd/MM/yyyy HH:mm'
      ],
      arrFS = ['Europe/Zurich', 'CHF', 'Monday', 'km',
        'km/h', 'l', 'l', 'bar',
        '°C', 'decimal', 'dd/MM/yyyy HH:mm'
      ],
      arrGS = ['Europe/Zurich', 'SFR', 'Monday', 'km',
        'km/h', 'l', 'l', 'bar',
        '°C', 'decimal', 'dd/MM/yyyy HH:mm'
      ];

    this.getSettingsAccount = function() {
      return settings_account;
    };

    this.getGeneralNameInput = function() {
      return general_name_input;
    };

    this.getGeneralUploadButton = function() {
      return general_upload_button;
    };

    this.getGeneralDescriptionInput = function() {
      return general_description_input;
    };

    this.getGeneralAddress1Input = function() {
      return general_address1_input;
    };

    this.getGeneralAddress2Input = function() {
      return general_address2_input;
    };

    this.getGeneralZipcodeInput = function() {
      return general_zipcode_input;
    };

    this.getGeneralCityInput = function() {
      return general_city_input;
    };

    this.getGeneralSelectedCountry = function() {
      return general_selected_country;
    };

    this.getAdminName = function() {
      return contact_admin_name_input;
    };

    this.getAdminPhone = function() {
      return contact_admin_phone_input;
    };

    this.getAdminEmail = function() {
      return contact_admin_email_input;
    };

    this.getBusinessContactName = function() {
      return account_bcontact_name_input;
    };

    this.getBusinessContactPhone = function() {
      return account_bcontact_phone_input;
    };

    this.getBusinessContactEmail = function() {
      return account_bcontact_email_input;
    };

    this.getTechnicalContactName = function() {
      return account_itcontact_name_input;
    };

    this.getTechnicalContactPhone = function() {
      return account_itcontact_phone_input;
    };

    this.getTechnicalContactEmail = function() {
      return account_itcontact_email_input;
    };

    this.getTimezone = function() {
      return settings_timezone;
    };

    this.getLanguage = function() {
      return settings_language_locale;
    };

    this.selectLangugeEnglishUS = function() {
      browser.executeScript("arguments[0].click();", settings_language_locale.getWebElement());
      browser.executeScript("arguments[0].click();", english_us_list_entry.getWebElement());
    };

    this.selectLangugeEnglishUK = function() {
      browser.executeScript("arguments[0].click();", settings_language_locale.getWebElement());
      browser.executeScript("arguments[0].click();", english_uk_list_entry.getWebElement());
    };

    this.selectLangugeFrenchFrance = function() {
      browser.executeScript("arguments[0].click();", settings_language_locale.getWebElement());
      browser.executeScript("arguments[0].click();", french_france_list_entry.getWebElement());
    };

    this.selectLangugeFrenchSwitzland = function() {
      browser.executeScript("arguments[0].click();", settings_language_locale.getWebElement());
      browser.executeScript("arguments[0].click();", french_switzerland_list_entry.getWebElement());
    };

    this.selectLangugeGermanSwitzland = function() {
      browser.executeScript("arguments[0].click();", settings_language_locale.getWebElement());
      browser.executeScript("arguments[0].click();", german_switzerland_list_entry.getWebElement());
    };

    this.selectLangugeGermanGermany = function() {
      browser.executeScript("arguments[0].click();", settings_language_locale.getWebElement());
      browser.executeScript("arguments[0].click();", german_germany_list_entry.getWebElement());
    };

    this.getDateTimeFormat = function() {
      return settings_date_time_format;
    };

    this.getStartWeek = function() {
      return settings_start_week;
    };

    this.getVolumeUnit = function() {
      return settings_volume_unit;
    };

    this.getDefaultInterventionTime = function() {
      return settings_default_intervention_time;
    };

    this.arrFF = function(n) {
      return arrFF[n];
    };

    this.arrGG = function(n) {
      return arrGG[n];
    };

    this.arrGS = function(n) {
      return arrGS[n];
    };

    this.arrUK = function(n) {
      return arrUK[n];
    };

    this.arrUS = function(n) {
      return arrUS[n];
    };

    this.arrFS = function(n) {
      return arrFS[n];
    };

    this.getWarningInfoModal = function() {
      return warning_info_modal;
    };

    this.getWarningOkButton = function() {
      return warning_ok_button;
    };

    this.getMonitorTracked = function() {
      return advanced_tracked_monitor;
    };

    this.getResetButton = function() {
      return reset_button;
    };

    this.getSaveButton = function() {
      return save_button;
    };

    this.clickAdvancedTrackedMonitor = function() {
      browser.executeScript("arguments[0].click();", advanced_tracked_monitor.getWebElement());
    };

    this.clickAdvancedCommunicationTab = function() {
      browser.executeScript("arguments[0].click();", account_advanced_tab.getWebElement());
    };

    this.clickWarningOkButton = function() {
      browser.executeScript("arguments[0].click();", warning_ok_button.getWebElement());
    };

    this.clickSettingsTimezone = function() {
      browser.executeScript("arguments[0].click();", settings_timezone.getWebElement());
    };

    this.clickSettingsLanguageLocale = function() {
      browser.executeScript("arguments[0].click();", settings_language_locale.getWebElement());
    };

    this.clickSettingsStartWeek = function() {
      browser.executeScript("arguments[0].click();", settings_start_week.getWebElement());
    };

    this.clickSettingsVolumeUnit = function() {
      browser.executeScript("arguments[0].click();", settings_volume_unit.getWebElement());
    };

    this.clickAccountSettingsTab = function() {
      browser.executeScript("arguments[0].click();", account_settings_tab.getWebElement());
    };
  };

  module.exports = new SettingsAccountPage();
})();
