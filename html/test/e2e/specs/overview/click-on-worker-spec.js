describe('Click on a Worker on the map', function() {
  // TODO: redo with data

  var user_input,
    password_input,
    login_button,
    lf_loader_overlay,
    until = protractor.ExpectedConditions,
    overview_panel;
  
  function waitUrl(myUrl) {
    return function() {
      return browser.getCurrentUrl().then(function(url) {
        return myUrl.test(url);
      });
    };
  }
  
  beforeAll(function() {
  
    browser.manage().window().maximize();
    browser.waitForAngularEnabled(false);
    browser.get('');
    user_input = element(by.css('#user-input'));
    password_input = element(by.css('#password-input'));
    login_button = element(by.css('.login-button'));
  
    overview_panel = element(by.css('.overview-panel'));
  
  
    browser.wait(waitUrl(/lfr3/));
  
    lf_loader_overlay = element(by.css('.lf-loader-overlay'));
    browser.wait(until.stalenessOf(lf_loader_overlay));
  
    var filter_panel = element(by.css('.filter-panel'));
    var filter_clear_button = filter_panel.element(by.css('button[ng-click="clearAllAdvancedFilters()"]'));
    var tracking_filter_button = element(by.css('.tracking-view .lf-toolbar .fi-funnel.iconic-md'));
  
    browser.wait(until.presenceOf(filter_panel)).then(function(){
      browser.executeScript("arguments[0].click();", filter_clear_button.getWebElement());
  
      var active_tab = element(by.css('.filter-panel .tabbable div.tabs-content div.tabs-panel.is-active'));
      var general_tab_vehicles = active_tab.element(by.css('.columns.vehicles'));
      var vehicles_switcher = general_tab_vehicles.element(by.css('.switch.small label.switch-paddle[for="showVehicles"]'));
      var general_tab_workers = active_tab.element(by.css('.columns.workers'));
      var workers_switcher = general_tab_workers.element(by.css('.switch.small label.switch-paddle[for="showWorkers"]'));
      var general_tab_mobileassets = active_tab.element(by.css('.columns.mobileassets'));
      var mobileassets_switcher = general_tab_mobileassets.element(by.css('.switch.small label.switch-paddle[for="showMobileassets"]'));
      var general_tab_geozones = active_tab.element(by.css('.columns.geozones'));
      var geozones_switcher = general_tab_geozones.element(by.css('.switch.small label.switch-paddle[for="showGeozones"]'));
      var general_tab_machines = active_tab.element(by.css('.columns.machines'));
      var machiness_switcher = general_tab_machines.element(by.css('.switch.small label.switch-paddle[for="showMachines"]'));
  
      browser.executeScript("arguments[0].click();", vehicles_switcher.getWebElement());
      browser.executeScript("arguments[0].click();", machiness_switcher.getWebElement());
      browser.executeScript("arguments[0].click();", mobileassets_switcher.getWebElement());
      browser.executeScript("arguments[0].click();", geozones_switcher.getWebElement());
  
      var tracking_overview_button = element(by.css('.tracking-view .lf-toolbar .fi-list-rich.iconic-md'));
      tracking_overview_button.click();
  
      browser.wait(until.presenceOf(overview_panel));
  
      browser.wait(until.presenceOf(element(by.css('.overview-panel > .k-grid > .k-grid-content > table > tbody > tr > td .map-element-info'))),5000,'No vehicle, worker, object show in overview panel after 5 second');
    });
  
  });
  
  describe('Click on Worker', function() {
    it('Element tool tip will be shown when click on a worker on the map', function() {
      browser.waitForAngularEnabled(true);
      var current_object_name = '';
      element.all(by.css('.overview-panel > .k-grid > .k-grid-content > table > tbody > tr > td .map-element-info')).each(function(thisElement) {
        current_object_name = '';
        var cssSelectorForIcon = 'tracking-object-category-field .rfid-category-field .fi-person-genderless';
        cssSelectorForIcon += ',tracking-object-category-field .rfid-category-field .fi-person-female';
        cssSelectorForIcon += ',tracking-object-category-field .rfid-category-field .fi-person-male';
  
        thisElement.element(by.css(cssSelectorForIcon)).isPresent().then(function(isWorker) {
          if (isWorker) {
            thisElement.element(by.css('.map-element-name')).getText().then(function(objectName) {
              browser.executeScript("arguments[0].click();", thisElement.getWebElement());
              browser.wait(until.visibilityOf(element(by.cssContainingText('lf-map .map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div.row > div.tooltip-title > div.columns > span:nth-of-type(1)', objectName))));
              console.log('Checking worker name '+objectName);
  
              var tool_tip_name = element(by.css('lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > div > span:nth-of-type(1).ng-binding'));
              var tool_tip_primary_status = element(by.css('lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > status-field > div.status-field > div > div.tooltip-status > div:nth-of-type(1)'));
              var tool_tip_second_status = element(by.css('lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > status-field > div.status-field > div > div.tooltip-status > div:nth-of-type(2)[ng-if="element.inTracking"] span.ng-binding'));
              var tool_tip_category_icon = element(by.css('lf-map map-element-info div.map-element-info tracking-object-category-field .rfid-category-field > div.row > div.columns > span.iconic-md'));
              var tool_tip_category_name = element(by.css('lf-map map-element-info div.map-element-info tracking-object-category-field .rfid-category-field > div.row > div.columns.ng-binding'));
              var tool_tip_localtion = element(by.css('lf-map map-element-info div.map-element-info address-field .address-field'));
              var tool_tip_brought_by = element(by.css('lf-map map-element-info div.map-element-info who-brought-it .who-brought-it .columns.ng-binding'));
              var tool_tip_last_seen_by = element(by.css('lf-map map-element-info div.map-element-info last-seen-by .last-seen-by .columns.ng-binding'));
              var tool_tip_button_route_from = element(by.css('lf-map map-element-tooltip map-element-tooltip-buttons div.map-element-tooltip-buttons div.map-element-tooltip-button[tooltip="Routing from"]'));
              var tool_tip_button_add_waypoint = element(by.css('lf-map map-element-tooltip map-element-tooltip-buttons div.map-element-tooltip-buttons div.map-element-tooltip-button[tooltip="Add waypoint"]'));
              var tool_tip_button_route_to = element(by.css('lf-map map-element-tooltip map-element-tooltip-buttons div.map-element-tooltip-buttons div.map-element-tooltip-button[tooltip="Routing to"]'));
              var tool_tip_button_near_access = element(by.css('lf-map map-element-tooltip map-element-tooltip-buttons div.map-element-tooltip-buttons div.map-element-tooltip-button[tooltip="Near assets"]'));
              var tool_tip_button_history = element(by.css('lf-map map-element-tooltip map-element-tooltip-buttons div.map-element-tooltip-buttons div.map-element-tooltip-button[tooltip="History"]'));
  
              expect(tool_tip_name.isPresent()).toBeTruthy();
              expect(tool_tip_name.getText()).toEqual(objectName);
              expect(tool_tip_primary_status.isPresent()).toBeTruthy();
              expect(tool_tip_second_status.isPresent()).toBeTruthy();
              expect(tool_tip_category_icon.isPresent()).toBeTruthy();
              expect(tool_tip_category_name.isPresent()).toBeTruthy();
              expect(tool_tip_localtion.isPresent()).toBeTruthy();
              expect(tool_tip_button_route_from.isPresent()).toBeTruthy();
              expect(tool_tip_button_route_to.isPresent()).toBeTruthy();
              expect(tool_tip_button_near_access.isPresent()).toBeTruthy();
              expect(tool_tip_button_add_waypoint.isPresent()).toBeTruthy();
              expect(tool_tip_button_history.isPresent()).toBeTruthy();
  
              tool_tip_primary_status.getText().then(function(tool_tip_primary_status_private){
                if(tool_tip_primary_status_private=='Private'){
                  expect(tool_tip_last_seen_by.isPresent()).toBeFalsy();
                }
                else {
                  tool_tip_last_seen_by.isPresent().then(function(is_tool_tip_last_seen_by_present){
                    if(!is_tool_tip_last_seen_by_present){
                      console.log('tool_tip_last_seen_by didn\'t appear for ' + objectName);
                    }
                  });
                }
              });
  
              tool_tip_primary_status.getText().then(function(tool_tip_primary_status_text){
                if(tool_tip_primary_status_text=='On site'){
                  expect(tool_tip_brought_by.isPresent()).toBeTruthy();
                  tool_tip_brought_by.isPresent().then(function(is_tool_tip_brought_by_present){
                    if(!is_tool_tip_brought_by_present){
                      console.log('tool_tip_brought_by didn\'t appear for ' + objectName);
                    }
                  });
                }
              });
  
                tool_tip_second_status.getText().then(function(tool_tip_second_status_text){
                var second_status_is_valid = /since [0-9]{1,2} days [0-9]{1,2} hours [0-9]{1,2} min [0-9]{1,2} sec./.test(tool_tip_second_status_text);
                second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} days 00 hour [0-9]{1,2} min [0-9]{1,2} sec/.test(tool_tip_second_status_text));
                second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} days 01 hour [0-9]{1,2} min [0-9]{1,2} sec/.test(tool_tip_second_status_text));
                second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} weeks [0-9]{1,2} days/.test(tool_tip_second_status_text));
                second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} hours/.test(tool_tip_second_status_text));
                second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} min/.test(tool_tip_second_status_text));
                second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} hours [0-9]{1,2} min/.test(tool_tip_second_status_text));
                second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} days [0-9]{1,2} hours/.test(tool_tip_second_status_text));
                second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} weeks/.test(tool_tip_second_status_text));
                if(!second_status_is_valid){
                  console.log('Second status invalid for ' + objectName + ' : ' + tool_tip_second_status_text);
                }
                expect(second_status_is_valid).toBeTruthy();
              });
            });
  
          } else {
  
          }
        });
      });
  
    });
  });
});
