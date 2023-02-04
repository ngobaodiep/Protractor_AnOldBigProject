/*
    SettingsBusinessRulesPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/

(function() {
  'use strict';

  var testUtils = require('./TestUtils');

  var SettingsBusinessRulesPage = function() {
    var business_rule = element(by.className('businessrules-list')),
    create_business_rule = business_rule.element(by.className('fi-plus-thin')),
      pagination_label = business_rule.element(by.className('k-pager-info')),
      k_grid_header = business_rule.element(by.className('k-grid-header')),
      k_grid_content = business_rule.element(by.className('k-grid-content')),

      createModal = element(by.className('create-modal')),
      targets_tab = createModal.element(by.css('li.tabs-title:nth-child(2) a')),
      conditions_tab = element(by.css('li.tabs-title:nth-child(3) a')),
      notifications_tab = element(by.css('li.tabs-title:nth-child(4) a')),

      tabsContent = createModal.element(by.className('tabs-content')),
      active_tab_content = tabsContent.element(by.className('is-active')),
      advanced_toggle = active_tab_content.element(by.className('businessrules-advanced-communication-toggle')),
      business_rule_name = active_tab_content.element(by.name('name')),
      description = active_tab_content.element(by.name('description')),
      severity = active_tab_content.element(by.css('.row div:nth-child(3).medium-6 .k-dropdown-wrap')),
      active_switcher = active_tab_content.element(by.css('.switch.small .switch-paddle[for="businessruleActive"]')),

      businessrules_advanced_communication = active_tab_content.element(by.className('businessrules-advanced-communication')),
      track_notifications = businessrules_advanced_communication.element(by.css('.switch.small .switch-paddle[for="businessruleTransient"]')),
      auto_close = businessrules_advanced_communication.element(by.css('.switch.small .switch-paddle[for="autoclose"]')),
      notify_ack = businessrules_advanced_communication.element(by.css('.switch.small .switch-paddle[for="notifyAck"]')),
      notify_close = businessrules_advanced_communication.element(by.css('.switch.small .switch-paddle[for="notifyClose"]')),

      valid_from = businessrules_advanced_communication.element(by.css('div.medium-6:nth-child(2)')),
      valid_from_label = valid_from.element(by.css('label')),
      valid_to = businessrules_advanced_communication.element(by.css('div.medium-6:nth-child(3)')),

      target_vehicles = active_tab_content.element(by.css('div.medium-6:nth-child(2) div.medium-12:nth-child(1) div.k-multiselect-wrap')),
      target_machines = active_tab_content.element(by.css('div.medium-6:nth-child(2) div.medium-12:nth-child(2) div.k-multiselect-wrap')),
      target_first_parent_group = active_tab_content.element(by.css('.k-treeview-lines>li>div>span:nth-child(3)')),
      target_first_child_group = active_tab_content.element(by.css('.k-treeview-lines>li:nth-child(1)>ul:nth-child(2)>li:nth-child(1)>div>.k-in')),

      driver = browser.driver,
      search_business_input = k_grid_header.element(by.css('.k-filter-row th:nth-child(2) input.k-textbox')),
      loading_mask = business_rule.element(by.className('k-loading-mask')),

      search_business_clear_btn = k_grid_header.element(by.css('.k-filter-row th:nth-of-type(2) button.k-button')),
      pager_numbers = business_rule.element(by.className('k-pager-numbers')),
      preview_button = element(by.css('button[ng-click="previewMessage();"].play-audio-button')),
      notifications_container_preview = element(by.className('notifications-container-preview')),
      notification_popup = notifications_container_preview.element(by.css('ul > li')),
      notification_popup_close_btn = notification_popup.element(by.css('a.fi-x-thin')),
      notifications_buttons = active_tab_content.element(by.className('notifications-buttons')),
      notification_app_button = notifications_buttons.element(by.className('icon-bubble-notification2')),

      speedCondition = active_tab_content.element(by.css('[ng-click="addCondition(\'speed\')"]')),
      geozoneCondition = active_tab_content.element(by.css('[ng-click="addCondition(\'geozone\')"]')),
      timeIntervalCondition = active_tab_content.element(by.css('[ng-click="addCondition(\'time_interval\')"]')),
      temperatureCondition = active_tab_content.element(by.css('[ng-click="addCondition(\'temperature\')"]')),
      maintenanceCondition = active_tab_content.element(by.css('[ng-click="addCondition(\'maintenance\')"]')),
      dropdown = element(by.css('[aria-hidden="false"]')),

      save_button = createModal.element(by.className('desktop-action-button'));

    this.getCreateBusinessRuleBtn = function() {
      return create_business_rule;
    };

    this.getDropDown = function(){
      return dropdown;
    };

    this.getBusinessRuleList = function(){
      return business_rule;
    };

    this.getCreateModal = function(){
      return createModal;
    };

    this.getNotificationsApp = function(){
      return notification_app_button;
    };

    this.getNotificationPopup = function(){
      return notification_popup;
    };

    this.getNotificationPopupCloseBtn = function(){
      return notification_popup_close_btn;
    };

    this.getPreviewBtn = function(){
      return preview_button;
    };

    this.getNotificationsTab = function(){
      return notifications_tab;
    };

    this.getConditionTab = function() {
      return conditions_tab;
    };

    this.getSpeedConditionBtn = function() {
      return active_tab_content.element(by.css('button.button.add-speed'));
    };

    this.getGeozoneConditionBtn = function() {
      return active_tab_content.element(by.css('button.button.add-geozone'));
    };

    this.getTimeConditionBtn = function() {
      return active_tab_content.element(by.css('button.button.add-time-interval'));
    };

    this.getTemperatureConditionBtn = function() {
      return active_tab_content.element(by.css('button.button.add-temperature'));
    };

    this.getMaintanceConditionBtn = function() {
      return active_tab_content.element(by.css('button.button.add-maintenance'));
    };

    this.getStatusConditionBtn = function() {
      return active_tab_content.element(by.css('button.button.add-status'));
    };

    this.getCreateModalCancelBtn = function() {
      return createModal.element(by.className('desktop-secondary-action-button'));
    };

    this.getPaginationLabel = function() {
      return pagination_label;
    };

    this.getDay = function(index) {
      return element.all(by.css('.businessrule-module.time-interval label.k-checkbox-label.ng-scope')).get(index);
    };

    this.getSearchBusinessInput = function() {
      return search_business_input;
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getGridRow = function(index) {
      return k_grid_content.element(by.css('tbody[role="rowgroup"] tr:nth-of-type(' + index + ')'));
    };

    this.getSearchBusinessClearBtn = function() {
      return search_business_clear_btn;
    };

    this.getTemperatureCondition = function() {
      return active_tab_content.element(by.css('.businessrule-module.temperature'));
    };

    this.getTimeCondition = function() {
      return active_tab_content.element(by.css('.businessrule-module.time-interval'));
    };

    this.getGeozoneCondition = function() {
      return active_tab_content.element(by.css('.businessrule-module.geozone'));
    };

    this.getSpeedCondition = function() {
      return active_tab_content.element(by.css('.businessrule-module.speed'));
    };

    this.getStatusCondition = function() {
      return active_tab_content.element(by.css('.businessrule-module.status'));
    };

    this.getAudioNoti = function() {
      return active_tab_content.element(by.css('div.notifications-list .businessrule-module.audio'));
    };

    this.getHTTPNoti = function() {
      return active_tab_content.element(by.css('div.notifications-list .businessrule-module.http'));
    };

    this.getSMSNoti = function() {
      return active_tab_content.element(by.css('div.notifications-list .businessrule-module.sms'));
    };

    this.getAppNoti = function() {
      return active_tab_content.element(by.css('div.notifications-list .businessrule-module.frontend'));
    };

    this.getEmailNoti = function() {
      return active_tab_content.element(by.css('div.notifications-list .businessrule-module.email'));
    };

    this.getPagerNumber = function() {
      return pager_numbers;
    };

    this.clickSearchBusinessClearBtn = function() {
      browser.executeScript("arguments[0].click();", search_business_clear_btn.getWebElement());
    };

    this.clickNotificationButtons = function() {
      browser.wait(testUtils.until.presenceOf(notifications_buttons.element(by.css('.fi-envelope-closed.iconic-sm'))));
      browser.executeScript("arguments[0].click();", notifications_buttons.element(by.css('.fi-envelope-closed.iconic-sm')).getWebElement());
      browser.executeScript("arguments[0].click();", notifications_buttons.element(by.css('.icon-bubble-notification2.iconic-sm')).getWebElement());
      browser.executeScript("arguments[0].click();", notifications_buttons.element(by.css('.icon-mobile.iconic-sm')).getWebElement());
      browser.executeScript("arguments[0].click();", notifications_buttons.element(by.css('.fi-code.iconic-sm')).getWebElement());
      browser.executeScript("arguments[0].click();", notifications_buttons.element(by.css('.icon-volume-low.iconic-sm')).getWebElement());
    };

    this.clickDay = function(index) {
      browser.executeScript("arguments[0].click();", this.getDay(index).getWebElement());
    };

    this.clickCreateBusinessRuleBtn = function() {
      browser.executeScript("arguments[0].click();", create_business_rule.getWebElement());
    };

    this.clickSpeedCondition = function() {
      browser.wait(testUtils.until.presenceOf(speedCondition));
      browser.executeScript("arguments[0].click();", speedCondition.getWebElement());
    };

    this.clickGeozoneCondition = function() {
      browser.executeScript("arguments[0].click();", geozoneCondition.getWebElement());
    };

    this.clickTemperatureCondition = function() {
      browser.executeScript("arguments[0].click();", temperatureCondition.getWebElement());
    };

    this.clickTimeCondition = function() {
      browser.executeScript("arguments[0].click();", timeIntervalCondition.getWebElement());
    };

    this.clickSaveButton = function() {
      browser.wait(testUtils.until.elementToBeClickable(save_button));
      browser.executeScript("arguments[0].click();", save_button.getWebElement());
    };

    this.clickPaginationLabel = function() {
      browser.executeScript("arguments[0].click();", pagination_label.getWebElement());
    };

    // this.clickSearchNameClearBtn = function() {
    //   browser.executeScript("arguments[0].click();", k_grid_header.element(by.css('.k-filter-row th:nth-child(2) .k-button')).getWebElement());
    // };

    this.createBusinessRule = function(random_number, index) {
      browser.wait(testUtils.until.presenceOf(createModal));
      this.fillBusinessRuleName('br ' + random_number);
      this.createGeneralTab(random_number, index);
      this.createTargetTab();
      this.createConditions();
      this.createNotificationsTab(index);
      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(createModal));
    };

    this.createGeneralTab = function(random_number, index) {
      browser.executeScript("arguments[0].click();", advanced_toggle.element(by.css('a:not(.ng-hide)')).getWebElement());
      this.fillDescription('description ' + random_number);
      this.selectSeverity(index);
      browser.executeScript("arguments[0].click();", active_switcher.getWebElement());
      browser.executeScript("arguments[0].click();", track_notifications.getWebElement());
      browser.executeScript("arguments[0].scrollIntoView();", valid_from_label.getWebElement());
      browser.executeScript("arguments[0].click();", auto_close.getWebElement());
      browser.executeScript("arguments[0].click();", notify_ack.getWebElement());
      browser.executeScript("arguments[0].click();", notify_close.getWebElement());
      this.selectDate(valid_from);
      this.selectDate(valid_to);
      this.selectHours(valid_from, index);
      this.selectHours(valid_to, (index + 2));
    };

    this.createTargetTab = function() {
      browser.executeScript("arguments[0].click();", targets_tab.getWebElement());
      this.selectTargetMachines(1);
      this.selectTargetGroup();
      this.selectTargetVehicles(1);
    };

    this.createConditions = function() {
      browser.executeScript("arguments[0].click();", conditions_tab.getWebElement());
      this.clickSpeedCondition();
      this.clickGeozoneCondition();
      this.clickTimeCondition();
      this.clickTemperatureCondition();
      browser.wait(testUtils.until.presenceOf(this.getStatusCondition()));
      this.selectTemperature();
      this.selectTimeIntervals();
      this.selectGeozoneCondition();
      this.selectSpeedCondition();
      this.selectStatusCondition();
    };

    this.createNotificationsTab = function(index) {
      browser.executeScript("arguments[0].click();", notifications_tab.getWebElement());
      this.clickNotificationButtons();
      this.selectAudio(index);
      this.selectHttpNotification('https://int.logifleet360.ch/');
      this.selectSmsNotification(index);
      this.selectAppNotification('frontend');
      this.selectEmailNotification('subject', 'email content', index);
    };

    this.editBusinessRule = function(random_number, index) {
      browser.wait(testUtils.until.presenceOf(element(by.css('.create-modal form .businessrule-form'))));
      this.fillBusinessRuleName('edited br ' + random_number);
      this.createGeneralTab(random_number, index);
      this.editTargetsTab();
      this.editConditionTab();
      this.editNotificationsTab(index);
      this.clickSaveButton();
      browser.wait(testUtils.until.stalenessOf(element(by.css('.create-modal'))));
    };

    this.editTargetsTab = function() {
      browser.wait(testUtils.until.elementToBeClickable(targets_tab));
      browser.executeScript("arguments[0].click();", targets_tab.getWebElement());
      this.selectTargetMachines(2);
      this.editTargetGroup();
      this.selectTargetVehicles(2);
    };

    this.editConditionTab = function() {
      browser.executeScript("arguments[0].click();", conditions_tab.getWebElement());
      browser.wait(testUtils.until.presenceOf(this.getSpeedCondition()));
      browser.executeScript("arguments[0].click();", this.getSpeedCondition().element(by.css('span.fi-circle-x.iconic-sm')).getWebElement());
      browser.executeScript("arguments[0].click();", this.getGeozoneCondition().element(by.css('span.fi-circle-x.iconic-sm')).getWebElement());
      browser.executeScript("arguments[0].click();", this.getTimeCondition().element(by.css('span.fi-circle-x.iconic-sm')).getWebElement());
      browser.executeScript("arguments[0].click();", this.getTemperatureCondition().element(by.css('span.fi-circle-x.iconic-sm')).getWebElement());
      browser.executeScript("arguments[0].click();", this.getStatusCondition().element(by.css('label.k-radio-label.ng-binding:nth-of-type(2)')).getWebElement());
      browser.executeScript("arguments[0].click();", this.getStatusCondition().all(by.css('span.k-i-arrow-60-down')).get(0).getWebElement());
      this.selectListElement(1);
      browser.wait(testUtils.until.elementToBeClickable(this.getStatusCondition().all(by.css('span.k-i-arrow-60-up')).get(0)));
      this.setIncreaseStatusDuration();
      this.setIncreaseStatusDuration();
      this.setDecreaseStatusDuration();
    };

    this.editNotificationsTab = function(index) {
      browser.executeScript("arguments[0].click();", notifications_tab.getWebElement());
      this.selectAudio(index);
      this.selectSmsNotification(index);
      this.selectAppNotification('edited frontend');
      this.selectEmailNotification('edited subject', 'edited email', index);
    };

    this.fillBusinessRuleName = function(string) {
      browser.executeScript("arguments[0].click();", business_rule_name.getWebElement());
      business_rule_name.clear().sendKeys(string);
    };

    this.fillDescription = function(string) {
      browser.executeScript("arguments[0].click();", description.getWebElement());
      description.clear().sendKeys(string);
    };

    this.selectSeverity = function(index) {
      browser.executeScript("arguments[0].click();", severity.getWebElement());
      this.selectListElement(index);
    };

    this.selectDate = function(object) {
      browser.executeScript("arguments[0].click();", object.element(by.css('span.k-i-calendar')).getWebElement());
      browser.wait(testUtils.until.presenceOf(element(by.css('.k-animation-container .k-calendar-container'))));
      browser.executeScript("arguments[0].click();", element(by.css('.k-calendar-container[aria-hidden="false"] tbody tr:nth-child(6) td:nth-child(7)')).getWebElement());
    };

    this.selectHours = function(object, index) {
      browser.executeScript("arguments[0].click();", object.element(by.css('span.k-i-clock')).getWebElement());
      this.selectListElement(index);
    };

    this.selectTargetVehicles = function(n) {
      browser.wait(testUtils.until.elementToBeClickable(target_vehicles));
      target_vehicles.click();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')')).getWebElement());
    };

    this.selectTargetMachines = function(n) {
      browser.wait(testUtils.until.elementToBeClickable(target_machines));
      target_machines.click();
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(' + n + ')')).getWebElement());
    };

    this.selectTargetGroup = function() {
      browser.executeScript("arguments[0].click();", target_first_parent_group.getWebElement());
    };

    this.editTargetGroup = function() {
      browser.wait(testUtils.until.elementToBeClickable(target_first_child_group));
      browser.executeScript("arguments[0].click();", target_first_child_group.getWebElement());
    };

    this.selectListElement = function(index) {
      browser.wait(testUtils.until.presenceOf(element(by.css('ul[aria-hidden="false"] li:nth-child(' + index + ')'))));
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li:nth-child(' + index + ')')).getWebElement());
    };

    this.selectStatusCondition = function() {
      this.getStatusCondition().element(by.css('div.k-widget.k-multiselect')).click();
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li[data-offset-index="1"]')).getWebElement());
    };

    this.selectSpeedCondition = function() {
      browser.executeScript("arguments[0].scrollIntoView();", this.getSpeedCondition().element(by.css('span.fi-dashboard.iconic-sm')).getWebElement());
      this.getSpeedCondition().element(by.css('span.k-i-arrow-60-up')).click();
      this.getSpeedCondition().element(by.css('span.k-i-arrow-60-up')).click();
      this.getSpeedCondition().element(by.css('span.k-i-arrow-60-down')).click();
    };

    this.selectGeozoneCondition = function() {
      browser.executeScript("arguments[0].scrollIntoView();", this.getGeozoneCondition().element(by.css('span.fi-map-marker.iconic-sm')).getWebElement());
      browser.wait(testUtils.until.elementToBeClickable(this.getGeozoneCondition().all(by.css('.k-widget.k-multiselect')).get(1)));
      this.getGeozoneCondition().all(by.css('.k-widget.k-multiselect')).get(1).click();
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li[data-offset-index="0"]')).getWebElement());
      browser.executeScript("arguments[0].click();", this.getGeozoneCondition().element(by.css('.switch.small .switch-paddle[for="exclude-geozone"]')).getWebElement());
      browser.wait(testUtils.until.elementToBeClickable(this.getGeozoneCondition().all(by.css('.k-widget.k-multiselect')).get(0)));
      this.getGeozoneCondition().all(by.css('.k-widget.k-multiselect')).get(0).click();
      browser.executeScript("arguments[0].click();", element(by.css('ul[aria-hidden="false"] li[data-offset-index="0"]')).getWebElement());
    };

    this.selectTimeIntervals = function() {
      browser.executeScript("arguments[0].scrollIntoView();", this.getTimeCondition().element(by.css('span.fi-clock.iconic-sm')).getWebElement());
      this.clickDay(0);
      this.clickDay(1);
      this.clickDay(2);
      this.clickDay(3);
      this.clickDay(4);
      this.clickDay(5);
      this.clickDay(6);
      browser.executeScript("arguments[0].click();", this.getTimeCondition().element(by.css('label.k-checkbox-label.ng-binding')).getWebElement());
      browser.executeScript("arguments[0].click();", this.getTimeCondition().all(by.css('.k-i-clock')).get(0).getWebElement());
      this.selectListElement(1);
      browser.executeScript("arguments[0].click();", this.getTimeCondition().all(by.css('.k-i-clock')).get(1).getWebElement());
      this.selectListElement(2);
    };

    this.selectTemperature = function() {
      this.getTemperatureCondition().all(by.css('.k-i-arrow-60-up')).get(1).click();
      this.getTemperatureCondition().all(by.css('.k-i-arrow-60-up')).get(1).click();
      this.getTemperatureCondition().all(by.css('.k-i-arrow-60-up')).get(1).click();
      this.getTemperatureCondition().all(by.css('.k-i-arrow-60-up')).get(0).click();
    };

    this.selectAudio = function(index) {
      browser.wait(testUtils.until.presenceOf(element(by.css('div.notifications-list .businessrule-module.audio'))));
      browser.executeScript("arguments[0].click();", this.getAudioNoti().element(by.css('.k-i-arrow-60-down')).getWebElement());
      this.selectListElement(index);
      browser.executeScript("arguments[0].click();", this.getAudioNoti().element(by.css('button.play-audio-button')).getWebElement());
    };

    this.selectHttpNotification = function(string) {
      browser.executeScript("arguments[0].click();", this.getHTTPNoti().element(by.css('input[ng-model="notification.url"]')).getWebElement());
      this.getHTTPNoti().element(by.css('input[ng-model="notification.url"]')).clear().sendKeys(string);
    };

    this.selectSmsNotification = function(index) {
      browser.executeScript("arguments[0].scrollIntoView();", this.getSMSNoti().element(by.css('span.icon-mobile.iconic-sm')).getWebElement());
      this.getSMSNoti().element(by.css('div.k-widget.k-multiselect')).click();
      this.selectListElement(index);
    };

    this.selectAppNotification = function(string) {
      browser.switchTo().frame(this.getAppNoti().element(by.tagName("iframe")).getWebElement());
      element(by.tagName('body')).clear().sendKeys(string);
      browser.switchTo().defaultContent();
    };

    this.selectEmailNotification = function(subject_string, email_content, index) {
      browser.executeScript("arguments[0].scrollIntoView();", this.getEmailNoti().element(by.css('span.fi-envelope-closed.iconic-sm')).getWebElement());

      browser.executeScript("arguments[0].click();", this.getEmailNoti().element(by.css('input[ng-model="notification.subject"]')).getWebElement());
      this.getEmailNoti().element(by.css('input[ng-model="notification.subject"]')).clear().sendKeys(subject_string);
      this.getEmailNoti().element(by.css('div.k-widget.k-multiselect')).click();
      this.selectListElement(index);
      browser.switchTo().frame(this.getEmailNoti().element(by.tagName("iframe")).getWebElement());
      element(by.tagName('body')).clear().sendKeys(email_content);
      browser.switchTo().defaultContent();
    };

    this.fillSearchBusinessInput = function(string) {
      browser.executeScript("arguments[0].click();", search_business_input.getWebElement());
      search_business_input.clear().sendKeys(string);
    };

    this.setIncreaseStatusDuration = function() {
      this.getStatusCondition().all(by.css('span.k-i-arrow-60-up')).get(0).click();
      this.getStatusCondition().all(by.css('span.k-i-arrow-60-up')).get(2).click();
      this.getStatusCondition().all(by.css('span.k-i-arrow-60-up')).get(1).click();
    };

    this.setDecreaseStatusDuration = function() {
      this.getStatusCondition().all(by.css('span.k-i-arrow-60-down')).get(1).click();
      this.getStatusCondition().all(by.css('span.k-i-arrow-60-down')).get(2).click();
      this.getStatusCondition().all(by.css('span.k-i-arrow-60-down')).get(3).click();
    };
  };

  module.exports = new SettingsBusinessRulesPage();
})();
