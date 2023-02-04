// TODO: redo with data
describe('Check elements on Overview panel', function() {
    var user_input,
        password_input,
        login_button,
        lf_loader_overlay,
        until = protractor.ExpectedConditions,
        overview_panel;

    function waitUrl (myUrl) {
        return function () {
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

        user_input.clear().sendKeys('test-user');
        password_input.clear().sendKeys('password');
        login_button.click();

        browser.wait(waitUrl(/lfr3/));

        lf_loader_overlay = element(by.css('.lf-loader-overlay'));
        browser.wait(until.stalenessOf(lf_loader_overlay));

        var tracking_overview_button = element(by.css('.tracking-view .lf-toolbar .fi-list-rich.iconic-md'));
        tracking_overview_button.click();

        browser.wait(until.presenceOf(overview_panel));
    });

    describe('Check Workers on Overview panel', function() {
      it('', function() {
        var pre_object_name = '';
        var cssSelectorForIcon = 'rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-person-genderless.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-person-female.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-person-male.iconic-md';
        browser.waitForAngularEnabled(true);
        var count_worker_list = 0;
        element.all(by.css('.overview-panel > .k-grid > .k-grid-content > table > tbody > tr')).each(function(this_element) {
          this_element.element(by.css(cssSelectorForIcon)).isPresent().then(function(isWorker) {
            if(isWorker){
              this_element.element(by.css('.map-element-name')).getText().then(function(object_name){
                browser.executeScript("arguments[0].scrollIntoView();", this_element.getWebElement());
                browser.executeScript("arguments[0].click();", this_element.getWebElement());
                console.log('Checking worker: '+object_name);

                var status_icon = this_element.element(by.css('.tooltip-icon-status-row .fi-shape-circle.iconic-md'));
                var primary_status = this_element.element(by.css('.tooltip-icon-status-row > div > .small-10.columns status-field .status-field .small-12.columns .tooltip-status .small-4.columns.ng-binding'));
                var second_status = this_element.element(by.css('.tooltip-icon-status-row > div > .small-10.columns .tooltip-status div[ng-if="element.inTracking"] > span.ng-binding'));
                var rfid_category_field_icon = this_element.element(by.css('map-element-info rfid-category-field .rfid-category-field span.iconic-md'));
                var rfid_category_field_name = this_element.element(by.css('map-element-info rfid-category-field .rfid-category-field .row .columns.ng-binding'));
                var address_field_or_geozone_list = this_element.element(by.css('address-field .address-field div[ng-if="isValid(address) && !geozonesValid(geozones)"] div.ng-binding, address-field .address-field div[ng-repeat="geozone in geozones"] div.ng-binding'));
                var last_seen_by = this_element.element(by.css('last-seen-by .last-seen-by > div.row > div.columns.ng-binding '));
                var brought_by = this_element.element(by.css('who-brought-it .who-brought-it > div.row > div.columns.ng-binding '));

                if(pre_object_name!=='') {
                  expect(pre_object_name <= object_name ).toBeTruthy();
                }

                expect(status_icon.isPresent()).toBeTruthy();
                expect(primary_status.isPresent()).toBeTruthy();
                expect(primary_status.getText()).not.toBe('');
                expect(second_status.isPresent()).toBeTruthy();
                expect(rfid_category_field_icon.isPresent()).toBeTruthy();
                expect(rfid_category_field_name.isPresent()).toBeTruthy();
                expect(last_seen_by.isPresent()).toBeTruthy();
                expect(address_field_or_geozone_list.isPresent()).toBeTruthy();

                primary_status.getText().then(function(primary_status_text){
                  if(primary_status_text=='On site'){
                    expect(brought_by.isPresent()).toBeTruthy();
                    brought_by.isPresent().then(function(is_brought_by_present){
                      if(!is_brought_by_present){
                        console.log('brought_by didn\'t appear for ' + object_name);
                      }
                    });
                  }
                });

                last_seen_by.isPresent().then(function(is_last_seen_by_present){
                  if(!is_last_seen_by_present){
                      console.log('last_seen_by didn\'t appear for ' + object_name );
                  }
                });

                second_status.getText().then(function(second_status_text){
                  var second_status_is_valid = /since [0-9]{1,2} days [0-9]{1,2} Hours [0-9]{1,2} Min [0-9]{1,2} sec./.test(second_status_text);
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} weeks [0-9]{1,2} days/.test(second_status_text));
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} Hours/.test(second_status_text));
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} Min/.test(second_status_text));
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} Hours [0-9]{1,2} Min/.test(second_status_text));
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} days [0-9]{1,2} Hours/.test(second_status_text));
                  if(!second_status_is_valid){
                    console.log('Second status invalid for: ' + object_name +' : ' + second_status_text);
                  }
                  expect(second_status_is_valid).toBeTruthy();
                });

                address_field_or_geozone_list.isPresent().then(function(is_present){
                  if(is_present){

                  } else {
                    console.log('Adress or geozone of ' + object_name + ' did\'nt appear ');
                    }
                });

                pre_object_name = object_name;
                count_worker_list++;
              });
            }
          });
        });
      });
    });

    describe('Check Objects on Overview panel', function() {
      it('', function() {
        var pre_object_name = '';
        var cssSelectorForIcon = 'rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-radiation.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-tags.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-map-marker.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-pin.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-tools.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-hammer.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-shape-square.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-shape-hexagon.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-shape-circle.iconic-md';
        browser.waitForAngularEnabled(true);

        element.all(by.css('.overview-panel > .k-grid > .k-grid-content > table > tbody > tr')).each(function(this_element) {
          this_element.element(by.css(cssSelectorForIcon)).isPresent().then(function(is_mobile_asset) {
            if(is_mobile_asset){
              this_element.element(by.css('.map-element-name')).getText().then(function(object_name){
                browser.executeScript("arguments[0].click();", this_element.getWebElement());
                console.log('Checking Mobileasset: '+object_name);

                var status_icon = this_element.element(by.css('.tooltip-icon-status-row .fi-shape-circle.iconic-md'));
                var primary_status = this_element.element(by.css('.tooltip-icon-status-row > div > .small-10.columns status-field .status-field .small-12.columns .tooltip-status .small-4.columns.ng-binding'));
                var second_status = this_element.element(by.css('.tooltip-icon-status-row > div > .small-10.columns .tooltip-status div[ng-if="element.inTracking"] > span.ng-binding'));
                var rfid_category_field_icon = this_element.element(by.css('map-element-info rfid-category-field .rfid-category-field span.iconic-md'));
                var rfid_category_field_name = this_element.element(by.css('map-element-info rfid-category-field .rfid-category-field .row .columns.ng-binding'));
                var address_field_or_geozone_list = this_element.element(by.css('address-field .address-field div[ng-if="isValid(address) && !geozonesValid(geozones)"] div.ng-binding, address-field .address-field div[ng-repeat="geozone in geozones"] div.ng-binding'));
                var last_seen_by = this_element.element(by.css('last-seen-by .last-seen-by > div.row > div.columns.ng-binding '));
                var brought_by = this_element.element(by.css('who-brought-it .who-brought-it > div.row > div.columns.ng-binding '));

                if(pre_object_name!=='') {
                  expect(pre_object_name <= object_name ).toBeTruthy();
                }

                expect(status_icon.isPresent()).toBeTruthy();
                expect(primary_status.isPresent()).toBeTruthy();
                expect(primary_status.getText()).not.toBe('');
                expect(second_status.isPresent()).toBeTruthy();
                expect(rfid_category_field_icon.isPresent()).toBeTruthy();
                expect(rfid_category_field_name.isPresent()).toBeTruthy();
                expect(last_seen_by.isPresent()).toBeTruthy();
                expect(address_field_or_geozone_list.isPresent()).toBeTruthy();

                primary_status.getText().then(function(primary_status_text){
                  if(primary_status_text=='On site'){
                    expect(brought_by.isPresent()).toBeTruthy();
                    brought_by.isPresent().then(function(is_brought_by_present){
                      if(!is_brought_by_present){
                        console.log('brought_by didn\'t appear for ' + object_name);
                      }
                    });
                  }
                });

                second_status.getText().then(function(second_status_text){
                  var second_status_is_valid = /since [0-9]{1,2} days [0-9]{1,2} Hours [0-9]{1,2} Min [0-9]{1,2} sec./.test(second_status_text);
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} weeks [0-9]{1,2} days/.test(second_status_text));
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} Hours/.test(second_status_text));
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} Min/.test(second_status_text));
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} Hours [0-9]{1,2} Min/.test(second_status_text));
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} days [0-9]{1,2} Hours/.test(second_status_text));
                  if(!second_status_is_valid){
                    console.log('Second status invalid for: ' + object_name +' : ' + second_status_text);
                  }
                  expect(second_status_is_valid).toBeTruthy();
                });

                address_field_or_geozone_list.isPresent().then(function(is_present){
                  if(is_present){

                  } else {
                    console.log('Adress or geozone of ' + object_name + ' did\'nt appear ');
                  }
                });

                pre_object_name = object_name;
              });
            }
          });
        });
      });
    });

    describe('Check Vehicles on Overview panel', function() {
      it('', function() {
        var pre_object_name = '';
        var cssSelectorForIcon = 'rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"]';

        element.all(by.css('.overview-panel > .k-grid > .k-grid-content > table > tbody > tr')).each(function(this_element) {
          this_element.element(by.css(cssSelectorForIcon)).isPresent().then(function(is_worker_or_mobile_asset) {
            if(!is_worker_or_mobile_asset){
              this_element.element(by.css('.map-element-name')).getText().then(function(object_name){
                browser.executeScript("arguments[0].click();", this_element.getWebElement());
                console.log('Checking vehicle: '+object_name);

                var status_icon = this_element.element(by.css('.tooltip-icon-status-row .fi-shape-circle.iconic-md'));
                var primary_status = this_element.element(by.css('.tooltip-icon-status-row > div > .small-10.columns status-field .status-field .small-12.columns .tooltip-status .small-4.columns.ng-binding'));
                var second_status = this_element.element(by.css('.tooltip-icon-status-row > div > .small-10.columns .tooltip-status div[ng-if="element.inTracking"] > span.ng-binding'));
                var address_field_or_geozone_list = this_element.element(by.css('address-field .address-field'));

                if(pre_object_name!=='') {
                  expect(pre_object_name <= object_name ).toBeTruthy();
                }

                expect(status_icon.isPresent()).toBeTruthy();
                expect(primary_status.isPresent()).toBeTruthy();
                expect(primary_status.getText()).not.toBe('');
                expect(second_status.isPresent()).toBeTruthy();
                expect(address_field_or_geozone_list.isPresent()).toBeTruthy();

                second_status.getText().then(function(second_status_text){
                  var second_status_is_valid = /since [0-9]{1,2} days [0-9]{1,2} Hours [0-9]{1,2} Min [0-9]{1,2} sec./.test(second_status_text);
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} weeks [0-9]{1,2} days/.test(second_status_text));
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} Hours/.test(second_status_text));
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} Min/.test(second_status_text));
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} Hours [0-9]{1,2} Min/.test(second_status_text));
                  second_status_is_valid = second_status_is_valid||(/since [0-9]{1,2} days [0-9]{1,2} Hours/.test(second_status_text));
                  if(!second_status_is_valid){
                    console.log('Second status invalid for: ' + object_name);
                  }
                  expect(second_status_is_valid).toBeTruthy();
                });

                address_field_or_geozone_list.isPresent().then(function(is_present){
                  if(is_present){

                  } else {
                    console.log('Adress or geozone of ' + object_name + ' did\'nt appear ');
                  }
                });

                pre_object_name = object_name;
              });
            }
          });
        });
      });
    });
});
