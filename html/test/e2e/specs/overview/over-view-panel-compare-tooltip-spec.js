// TODO: redo with data
describe('Compare the content of elements on Overview panel with Tooltip', function() {
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
        var cssSelectorForIcon = 'rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-person-genderless.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-person-female.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-person-male.iconic-md';
        browser.waitForAngularEnabled(true);
        element.all(by.css('.overview-panel > .k-grid > .k-grid-content > table > tbody > tr')).each(function(this_element) {
          this_element.element(by.css(cssSelectorForIcon)).isPresent().then(function(is_worker) {
            if(is_worker){
              this_element.element(by.css('.map-element-name')).getText().then(function(object_name){
                browser.executeScript("arguments[0].click();", this_element.getWebElement());
                browser.wait(until.visibilityOf(element(by.cssContainingText('lf-map .map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div.row > div.tooltip-title > div.columns > span:nth-of-type(1)', object_name))));
                console.log('Checking worker: '+object_name);

                var primary_status = this_element.element(by.css('.tooltip-icon-status-row > div > .small-10.columns status-field .status-field .small-12.columns .tooltip-status .small-4.columns.ng-binding'));
                var second_status = this_element.element(by.css('.tooltip-icon-status-row > div > .small-10.columns .tooltip-status div[ng-if="element.inTracking"] > span.ng-binding'));
                var rfid_category_field_name = this_element.element(by.css('map-element-info rfid-category-field .rfid-category-field .row .columns.ng-binding'));
                var address_field = this_element.element(by.css('address-field .address-field div[ng-if="isValid(address) && !geozonesValid(geozones)"] div.ng-binding'));
                var geozone_list = this_element.all(by.css('address-field .address-field div[ng-repeat="geozone in geozones"]'));
                var last_seen_by = this_element.element(by.css('last-seen-by .last-seen-by > div.row > div.columns.ng-binding'));
                var brought_by = this_element.element(by.css('who-brought-it .who-brought-it > div.row > div.columns.ng-binding '));

                var tool_tip_name = element(by.css('lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > div > span:nth-of-type(1).ng-binding'));
                var tool_tip_status = element(by.css('lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > status-field > div.status-field > div > div.tooltip-status > div:nth-of-type(1)'));
                var tool_tip_second_status = element(by.css('lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > status-field > div.status-field > div > div.tooltip-status > div:nth-of-type(2)[ng-if="element.inTracking"] span.ng-binding'));
                var tool_tip_category_name = element(by.css('lf-map map-element-info div.map-element-info rfid-category-field .rfid-category-field > div.row > div.columns.ng-binding'));
                var tool_tip_address = element(by.css('lf-map map-element-info div.map-element-info address-field .address-field div[ng-if="isValid(address) && !geozonesValid(geozones)"] > div.columns.ng-binding'));
                var tool_tip_brought_by = element(by.css('lf-map map-element-info div.map-element-info who-brought-it .who-brought-it .columns.ng-binding'));
                var tool_tip_last_seen_by = element(by.css('lf-map map-element-info div.map-element-info last-seen-by .last-seen-by .columns.ng-binding'));

                expect(tool_tip_name.getText()).toBe(object_name);

                tool_tip_name.getText().then(function(tool_tip_name_text){
                  if(tool_tip_name_text!=object_name){
                    console.log('Name is not the same for worker ' + object_name + ' - List/Tooltip : ' + object_name + '/' + tool_tip_name_text);
                  }
                });

                primary_status.getText().then(function(primary_status_text){
                  tool_tip_status.getText().then(function(tool_tip_status_text){
                    if(primary_status_text!=tool_tip_status_text){
                      console.log('Primary status is not the same for worker ' + object_name + ' - List/Tooltip : ' + primary_status_text + '/' + tool_tip_status_text);
                    }
                  });
                  expect(tool_tip_status.getText()).toBe(primary_status_text);
                });

                second_status.getText().then(function(second_status_text){
                  tool_tip_second_status.getText().then(function(tool_tip_second_status_text){

                    var second_status_text_removed_min_sec = second_status_text.replace(/[0-9]{1,2} Min/i,"").replace(/[0-9]{1,2} sec/i,"");
                    var tool_tip_second_status_text_removed_min_sec = tool_tip_second_status_text.replace(/[0-9]{1,2} Min/i,"").replace(/[0-9]{1,2} sec/i,"");

                    if((/[0-9]{1,2} Min/.test(second_status_text))&&(/[0-9]{1,2} Min/.test(tool_tip_second_status_text))){
                      var second_status_text_min = second_status_text.match(/[0-9]{1,2} Min/);
                      var tool_tip_second_status_text_min = tool_tip_second_status_text.match(/[0-9]{1,2} Min/);
                      second_status_text_min = second_status_text_min[0];
                      tool_tip_second_status_text_min = tool_tip_second_status_text_min[0];
                      second_status_text_min = second_status_text_min.replace(/ Min/,"");
                      tool_tip_second_status_text_min = tool_tip_second_status_text_min.replace(/ Min/,"");

                      second_status_text_min = parseInt(second_status_text_min);
                      tool_tip_second_status_text_min = parseInt(tool_tip_second_status_text_min);

                      if(second_status_text_min!=tool_tip_second_status_text_min){
                        console.log('Second status Min is not the same for worker ' + object_name + ' - List/Tooltip : ' + second_status_text_min + '/' + tool_tip_second_status_text_min);
                      }
                      expect( (Math.abs(tool_tip_second_status_text_min - second_status_text_min) < 3 ) ).toBeTruthy();
                    } else if((((!(/[0-9]{1,2} Min/.test(second_status_text)))&&(/[0-9]{1,2} Min/.test(tool_tip_second_status_text))))||(((/[0-9]{1,2} Min/.test(second_status_text))&&(!(/[0-9]{1,2} Min/.test(tool_tip_second_status_text)))))){
                        console.log('Second status Min missing for worker ' + object_name + ' - List/Tooltip : ' + second_status_text + '/' + tool_tip_second_status_text);
                    }

                      if(second_status_text_removed_min_sec!=tool_tip_second_status_text_removed_min_sec){
                        console.log('Second status is not the same for worker ' + object_name + ' - List/Tooltip : ' + second_status_text + '/' + tool_tip_second_status_text);
                      }
                      expect(second_status_text_removed_min_sec == tool_tip_second_status_text_removed_min_sec).toBeTruthy();
                  });
                });

                last_seen_by.isPresent().then(function(is_last_seen_by_present){
                  if(is_last_seen_by_present){
                    last_seen_by.getText().then(function(last_seen_by_text){
                      tool_tip_last_seen_by.getText().then(function(tool_tip_last_seen_by_text){
                        if(tool_tip_last_seen_by_text!=last_seen_by_text){
                          console.log('Last seen is not the same for worker ' + object_name + ' - List/Tooltip : ' + last_seen_by_text + '/' + tool_tip_last_seen_by_text);
                        }
                      });
                      expect(tool_tip_last_seen_by.getText()).toBe(last_seen_by_text);
                    });
                  }
                });

                rfid_category_field_name.isPresent().then(function(is_rfid_category_field_name_present){
                  if(is_rfid_category_field_name_present){
                    rfid_category_field_name.getText().then(function(rfid_category_field_name_text){
                      tool_tip_category_name.getText().then(function(tool_tip_category_name_text){
                        if(tool_tip_category_name_text!=rfid_category_field_name_text){
                          console.log('Category name is not the same for worker ' + object_name + ' - List/Tooltip : ' + rfid_category_field_name_text + '/' + tool_tip_category_name_text);
                        }
                      });
                      expect(tool_tip_category_name.getText()).toBe(rfid_category_field_name_text);
                    });
                  }
                });

                brought_by.isPresent().then(function(is_brought_by_present){
                  if(is_brought_by_present){
                    brought_by.getText().then(function(brought_by_text){
                      tool_tip_brought_by.getText().then(function(tool_tip_brought_by_text){
                        if(tool_tip_brought_by_text!=brought_by_text){
                          console.log('Brought by is not the same for worker ' + object_name + ' - List/Tooltip : ' + brought_by_text + '/' + tool_tip_brought_by_text);
                        }
                      });
                      expect(tool_tip_brought_by.getText()).toBe(brought_by_text);
                    });
                  }
                });

                address_field.isPresent().then(function(is_address_field_present){
                  if(is_address_field_present){
                    expect(tool_tip_address.isPresent()).toBeTruthy();
                    address_field.getText().then(function(address_field_text){
                      tool_tip_address.getText().then(function(tool_tip_address_text){
                        if(tool_tip_address_text!=address_field_text){
                          console.log('Address is not the same for worker ' + object_name + ' - List/Tooltip : ' + address_field_text + '/' + tool_tip_address_text);
                        }
                      });
                      expect(tool_tip_address.getText()).toBe(address_field_text);
                    });
                  }
                });

                geozone_list.count().then(function(geozone_list_count){
                  if(geozone_list_count > 0){
                    var check_geozone_is_equal_between_list_and_tooltip = function(geozone_in_over_view_list_text){
                      geozone_in_tool_tip.getText().then(function(geozone_in_tool_tip_text){
                        if(geozone_in_tool_tip_text!=geozone_in_over_view_list_text){
                          console.log('Geozone is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + geozone_in_over_view_list_text + '/' + geozone_in_tool_tip_text);
                        }
                      });
                      expect(geozone_in_tool_tip.getText()).toBe(geozone_in_over_view_list_text);
                    };
                    for (var i = 1; i < (geozone_list_count + 1); i++) {
                      var geozone_in_over_view_list = this_element.element(by.css('address-field .address-field div[ng-repeat="geozone in geozones"]:nth-of-type('+i+') div.columns.ng-binding'));
                      var geozone_in_tool_tip = element(by.css('lf-map map-element-info div.map-element-info address-field .address-field div[ng-repeat="geozone in geozones"]:nth-of-type('+i+') div.columns.ng-binding'));
                      geozone_in_over_view_list.getText().then(check_geozone_is_equal_between_list_and_tooltip);
                    }
                  }
                });
              });
            }
          });
        });
      });
    });

    describe('Check Mobileassets on Overview panel', function() {
      it('', function() {
        var cssSelectorForIcon = 'rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-radiation.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-tags.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-map-marker.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-pin.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-tools.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-hammer.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-shape-square.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-shape-hexagon.iconic-md,';
        cssSelectorForIcon += ' rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"] .rfid-category-field .fi-shape-circle.iconic-md';

        element.all(by.css('.overview-panel > .k-grid > .k-grid-content > table > tbody > tr')).each(function(this_element) {
          this_element.element(by.css(cssSelectorForIcon)).isPresent().then(function(is_mobile_asset) {
            if(is_mobile_asset){
              this_element.element(by.css('.map-element-name')).getText().then(function(object_name){
                browser.executeScript("arguments[0].click();", this_element.getWebElement());
                browser.wait(until.visibilityOf(element(by.cssContainingText('lf-map .map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div.row > div.tooltip-title > div.columns > span:nth-of-type(1)', object_name))));
                console.log('Checking Mobileasset: '+object_name);

                var primary_status = this_element.element(by.css('.tooltip-icon-status-row > div > .small-10.columns status-field .status-field .small-12.columns .tooltip-status .small-4.columns.ng-binding'));
                var second_status = this_element.element(by.css('.tooltip-icon-status-row > div > .small-10.columns .tooltip-status div[ng-if="element.inTracking"] > span.ng-binding'));
                var rfid_category_field_name = this_element.element(by.css('map-element-info rfid-category-field .rfid-category-field .row .columns.ng-binding'));
                var address_field = this_element.element(by.css('address-field .address-field div[ng-if="isValid(address) && !geozonesValid(geozones)"] div.ng-binding'));
                var geozone_list = this_element.all(by.css('address-field .address-field div[ng-repeat="geozone in geozones"]'));
                var last_seen_by = this_element.element(by.css('last-seen-by .last-seen-by > div.row > div.columns.ng-binding'));
                var brought_by = this_element.element(by.css('who-brought-it .who-brought-it > div.row > div.columns.ng-binding '));

                var tool_tip_name = element(by.css('lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > div > span:nth-of-type(1).ng-binding'));
                var tool_tip_status = element(by.css('lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > status-field > div.status-field > div > div.tooltip-status > div:nth-of-type(1)'));
                var tool_tip_second_status = element(by.css('lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > status-field > div.status-field > div > div.tooltip-status > div:nth-of-type(2)[ng-if="element.inTracking"] span.ng-binding'));
                var tool_tip_category_name = element(by.css('lf-map map-element-info div.map-element-info rfid-category-field .rfid-category-field > div.row > div.columns.ng-binding'));
                var tool_tip_address = element(by.css('lf-map map-element-info div.map-element-info address-field .address-field div[ng-if="isValid(address) && !geozonesValid(geozones)"] > div.columns.ng-binding'));
                var tool_tip_brought_by = element(by.css('lf-map map-element-info div.map-element-info who-brought-it .who-brought-it .columns.ng-binding'));
                var tool_tip_last_seen_by = element(by.css('lf-map map-element-info div.map-element-info last-seen-by .last-seen-by .columns.ng-binding'));

                expect(tool_tip_name.getText()).toBe(object_name);

                tool_tip_name.getText().then(function(tool_tip_name_text){
                  if(tool_tip_name_text!=object_name){
                    console.log('Name is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + object_name + '/' + tool_tip_name_text);
                  }
                });

                primary_status.getText().then(function(primary_status_text){
                  tool_tip_status.getText().then(function(tool_tip_status_text){
                    if(primary_status_text!=tool_tip_status_text){
                      console.log('Primary status is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + primary_status_text + '/' + tool_tip_status_text);
                    }
                  });
                  expect(tool_tip_status.getText()).toBe(primary_status_text);
                });

                second_status.getText().then(function(second_status_text){
                  tool_tip_second_status.getText().then(function(tool_tip_second_status_text){

                    var second_status_text_removed_min_sec = second_status_text.replace(/[0-9]{1,2} Min/i,"").replace(/[0-9]{1,2} sec/i,"");
                    var tool_tip_second_status_text_removed_min_sec = tool_tip_second_status_text.replace(/[0-9]{1,2} Min/i,"").replace(/[0-9]{1,2} sec/i,"");

                    if((/[0-9]{1,2} Min/.test(second_status_text))&&(/[0-9]{1,2} Min/.test(tool_tip_second_status_text))){
                      var second_status_text_min = second_status_text.match(/[0-9]{1,2} Min/);
                      var tool_tip_second_status_text_min = tool_tip_second_status_text.match(/[0-9]{1,2} Min/);
                      second_status_text_min = second_status_text_min[0];
                      tool_tip_second_status_text_min = tool_tip_second_status_text_min[0];
                      second_status_text_min = second_status_text_min.replace(/ Min/,"");
                      tool_tip_second_status_text_min = tool_tip_second_status_text_min.replace(/ Min/,"");

                      second_status_text_min = parseInt(second_status_text_min);
                      tool_tip_second_status_text_min = parseInt(tool_tip_second_status_text_min);

                      if(second_status_text_min!=tool_tip_second_status_text_min){
                        console.log('Second status Min is not the same for worker ' + object_name + ' - List/Tooltip : ' + second_status_text_min + '/' + tool_tip_second_status_text_min);
                      }
                      expect( (Math.abs(tool_tip_second_status_text_min - second_status_text_min) < 3 ) ).toBeTruthy();
                    } else if((((!(/[0-9]{1,2} Min/.test(second_status_text)))&&(/[0-9]{1,2} Min/.test(tool_tip_second_status_text))))||(((/[0-9]{1,2} Min/.test(second_status_text))&&(!(/[0-9]{1,2} Min/.test(tool_tip_second_status_text)))))){
                        console.log('Second status Min missing for worker ' + object_name + ' - List/Tooltip : ' + second_status_text + '/' + tool_tip_second_status_text);
                    }

                      if(second_status_text_removed_min_sec!=tool_tip_second_status_text_removed_min_sec){
                        console.log('Second status is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + second_status_text + '/' + tool_tip_second_status_text);
                      }
                      expect(second_status_text_removed_min_sec == tool_tip_second_status_text_removed_min_sec).toBeTruthy();
                  });
                });

                last_seen_by.isPresent().then(function(is_last_seen_by_present){
                  if(is_last_seen_by_present){
                    last_seen_by.getText().then(function(last_seen_by_text){
                      tool_tip_last_seen_by.getText().then(function(tool_tip_last_seen_by_text){
                        if(tool_tip_last_seen_by_text!=last_seen_by_text){
                          console.log('Last seen is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + last_seen_by_text + '/' + tool_tip_last_seen_by_text);
                        }
                      });
                      expect(tool_tip_last_seen_by.getText()).toBe(last_seen_by_text);
                    });
                  }
                });

                rfid_category_field_name.isPresent().then(function(is_rfid_category_field_name_present){
                  if(is_rfid_category_field_name_present){
                    rfid_category_field_name.getText().then(function(rfid_category_field_name_text){
                      tool_tip_category_name.getText().then(function(tool_tip_category_name_text){
                        if(tool_tip_category_name_text!=rfid_category_field_name_text){
                          console.log('Category name is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + rfid_category_field_name_text + '/' + tool_tip_category_name_text);
                        }
                      });
                      expect(tool_tip_category_name.getText()).toBe(rfid_category_field_name_text);
                    });
                  }
                });

                brought_by.isPresent().then(function(is_brought_by_present){
                  if(is_brought_by_present){
                    brought_by.getText().then(function(brought_by_text){
                      tool_tip_brought_by.getText().then(function(tool_tip_brought_by_text){
                        if(tool_tip_brought_by_text!=brought_by_text){
                          console.log('Brought by is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + brought_by_text + '/' + tool_tip_brought_by_text);
                        }
                      });
                      expect(tool_tip_brought_by.getText()).toBe(brought_by_text);
                    });
                  }
                });

                address_field.isPresent().then(function(is_address_field_present){
                  if(is_address_field_present){
                    expect(tool_tip_address.isPresent()).toBeTruthy();
                    address_field.getText().then(function(address_field_text){
                      tool_tip_address.getText().then(function(tool_tip_address_text){
                        if(tool_tip_address_text!=address_field_text){
                          console.log('Address is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + address_field_text + '/' + tool_tip_address_text);
                        }
                      });
                      expect(tool_tip_address.getText()).toBe(address_field_text);
                    });
                  }
                });

                geozone_list.count().then(function(geozone_list_count){
                  if(geozone_list_count > 0){
                    var check_geozone_is_equal_between_list_and_tooltip = function(geozone_in_over_view_list_text){
                      geozone_in_tool_tip.getText().then(function(geozone_in_tool_tip_text){
                        if(geozone_in_tool_tip_text!=geozone_in_over_view_list_text){
                          console.log('Geozone is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + geozone_in_over_view_list_text + '/' + geozone_in_tool_tip_text);
                        }
                      });
                      expect(geozone_in_tool_tip.getText()).toBe(geozone_in_over_view_list_text);
                    };
                    for (var i = 1; i < (geozone_list_count + 1); i++) {
                      var geozone_in_over_view_list = this_element.element(by.css('address-field .address-field div[ng-repeat="geozone in geozones"]:nth-of-type('+i+') div.columns.ng-binding'));
                      var geozone_in_tool_tip = element(by.css('lf-map map-element-info div.map-element-info address-field .address-field div[ng-repeat="geozone in geozones"]:nth-of-type('+i+') div.columns.ng-binding'));
                      geozone_in_over_view_list.getText().then(check_geozone_is_equal_between_list_and_tooltip);
                    }
                  }
                });

              });
            }
          });
        });
      });
    });

    describe('Check Vehicles on Overview panel', function() {
      it('', function() {
        var cssSelectorForIcon = 'rfid-category-field[ng-if="element.trackingObjectType === \'worker\' || element.trackingObjectType === \'mobileasset\'"]';

        element.all(by.css('.overview-panel > .k-grid > .k-grid-content > table > tbody > tr')).each(function(this_element) {
          this_element.element(by.css(cssSelectorForIcon)).isPresent().then(function(is_worker_or_mobile_asset) {
            if(!is_worker_or_mobile_asset){
              this_element.element(by.css('.map-element-name')).getText().then(function(object_name){
                browser.executeScript("arguments[0].click();", this_element.getWebElement());
                browser.wait(until.visibilityOf(element(by.cssContainingText('lf-map .map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div.row > div.tooltip-title > div.columns > span:nth-of-type(1)', object_name))));
                console.log('Checking Vehicle: '+object_name);

                var primary_status = this_element.element(by.css('.tooltip-icon-status-row > div > .small-10.columns status-field .status-field .small-12.columns .tooltip-status .small-4.columns.ng-binding'));
                var second_status = this_element.element(by.css('.tooltip-icon-status-row > div > .small-10.columns .tooltip-status div[ng-if="element.inTracking"] > span.ng-binding'));
                var address_field = this_element.element(by.css('address-field .address-field div[ng-if="isValid(address) && !geozonesValid(geozones)"] div.ng-binding'));
                var geozone_list = this_element.all(by.css('address-field .address-field div[ng-repeat="geozone in geozones"]'));

                var tool_tip_name = element(by.css('lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > div > span:nth-of-type(1).ng-binding'));
                var tool_tip_status = element(by.css('lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > status-field > div.status-field > div > div.tooltip-status > div:nth-of-type(1)'));
                var tool_tip_second_status = element(by.css('lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > status-field > div.status-field > div > div.tooltip-status > div:nth-of-type(2)[ng-if="element.inTracking"] span.ng-binding'));
                var tool_tip_address = element(by.css('lf-map map-element-info div.map-element-info address-field .address-field div[ng-if="isValid(address) && !geozonesValid(geozones)"] > div.columns.ng-binding'));

                expect(tool_tip_name.getText()).toBe(object_name);

                tool_tip_name.getText().then(function(tool_tip_name_text){
                  if(tool_tip_name_text!=object_name){
                    console.log('Name is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + object_name + '/' + tool_tip_name_text);
                  }
                });

                primary_status.getText().then(function(primary_status_text){
                  tool_tip_status.getText().then(function(tool_tip_status_text){
                    if(primary_status_text!=tool_tip_status_text){
                      console.log('Primary status is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + primary_status_text + '/' + tool_tip_status_text);
                    }
                  });
                  expect(tool_tip_status.getText()).toBe(primary_status_text);
                });

                second_status.getText().then(function(second_status_text){
                  tool_tip_second_status.getText().then(function(tool_tip_second_status_text){

                      var second_status_text_removed_min_sec = second_status_text.replace(/[0-9]{1,2} Min/i,"").replace(/[0-9]{1,2} sec/i,"");
                      var tool_tip_second_status_text_removed_min_sec = tool_tip_second_status_text.replace(/[0-9]{1,2} Min/i,"").replace(/[0-9]{1,2} sec/i,"");

                      if((/[0-9]{1,2} Min/.test(second_status_text))&&(/[0-9]{1,2} Min/.test(tool_tip_second_status_text))){
                        var second_status_text_min = second_status_text.match(/[0-9]{1,2} Min/);
                        var tool_tip_second_status_text_min = tool_tip_second_status_text.match(/[0-9]{1,2} Min/);
                        second_status_text_min = second_status_text_min[0];
                        tool_tip_second_status_text_min = tool_tip_second_status_text_min[0];
                        second_status_text_min = second_status_text_min.replace(/ Min/,"");
                        tool_tip_second_status_text_min = tool_tip_second_status_text_min.replace(/ Min/,"");

                        second_status_text_min = parseInt(second_status_text_min);
                        tool_tip_second_status_text_min = parseInt(tool_tip_second_status_text_min);

                        if(second_status_text_min!=tool_tip_second_status_text_min){
                          console.log('Second status Min is not the same for worker ' + object_name + ' - List/Tooltip : ' + second_status_text_min + '/' + tool_tip_second_status_text_min);
                        }
                        expect( (Math.abs(tool_tip_second_status_text_min - second_status_text_min) < 3 ) ).toBeTruthy();
                      } else if((((!(/[0-9]{1,2} Min/.test(second_status_text)))&&(/[0-9]{1,2} Min/.test(tool_tip_second_status_text))))||(((/[0-9]{1,2} Min/.test(second_status_text))&&(!(/[0-9]{1,2} Min/.test(tool_tip_second_status_text)))))){
                          console.log('Second status Min missing for worker ' + object_name + ' - List/Tooltip : ' + second_status_text + '/' + tool_tip_second_status_text);
                      }

                      if(second_status_text_removed_min_sec!=tool_tip_second_status_text_removed_min_sec){
                        console.log('Second status is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + second_status_text + '/' + tool_tip_second_status_text);
                      }
                      expect(second_status_text_removed_min_sec == tool_tip_second_status_text_removed_min_sec).toBeTruthy();
                  });
                });

                address_field.isPresent().then(function(is_address_field_present){
                  if(is_address_field_present){
                    expect(tool_tip_address.isPresent()).toBeTruthy();
                    address_field.getText().then(function(address_field_text){
                      tool_tip_address.getText().then(function(tool_tip_address_text){
                        if(tool_tip_address_text!=address_field_text){
                          console.log('Address is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + address_field_text + '/' + tool_tip_address_text);
                        }
                      });
                      expect(tool_tip_address.getText()).toBe(address_field_text);
                    });
                  }
                });

                geozone_list.count().then(function(geozone_list_count){
                  if(geozone_list_count > 0){
                    var check_geozone_is_equal_between_list_and_tooltip = function(geozone_in_over_view_list_text){
                      geozone_in_tool_tip.getText().then(function(geozone_in_tool_tip_text){
                        if(geozone_in_tool_tip_text!=geozone_in_over_view_list_text){
                          console.log('Geozone is not the same for mobile asset ' + object_name + ' - List/Tooltip : ' + geozone_in_over_view_list_text + '/' + geozone_in_tool_tip_text);
                        }
                      });
                      expect(geozone_in_tool_tip.getText()).toBe(geozone_in_over_view_list_text);
                    };
                    for (var i = 1; i < (geozone_list_count + 1); i++) {
                      var geozone_in_over_view_list = this_element.element(by.css('address-field .address-field div[ng-repeat="geozone in geozones"]:nth-of-type('+i+') div.columns.ng-binding'));
                      var geozone_in_tool_tip = element(by.css('lf-map map-element-info div.map-element-info address-field .address-field div[ng-repeat="geozone in geozones"]:nth-of-type('+i+') div.columns.ng-binding'));
                      geozone_in_over_view_list.getText().then(check_geozone_is_equal_between_list_and_tooltip);
                    }
                  }
                });
              });
            }
          });
        });
      });
    });

});
