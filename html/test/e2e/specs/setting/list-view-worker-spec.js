describe('Check elements on Worker panel of Listview', function() {
  var user_input,
    password_input,
    login_button,
    lf_loader_overlay,
    until = protractor.ExpectedConditions,
    expanded_panel,
    account_date_time_fomart;

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

    expanded_panel = element(by.css('.expanded-panel'));

    user_input.clear().sendKeys('test-user');
    password_input.clear().sendKeys('password');
    login_button.click();

    browser.wait(waitUrl(/lfr3/));

    lf_loader_overlay = element(by.css('.lf-loader-overlay'));
    browser.wait(until.stalenessOf(lf_loader_overlay));

    var filter_panel = element(by.css('.filter-panel'));
    var filter_clear_button = filter_panel.element(by.css('button[ng-click="clearAllAdvancedFilters()"]'));
    var tracking_filter_button = element(by.css('.tracking-view .lf-toolbar .fi-funnel.iconic-md'));
    tracking_filter_button.click();

    browser.wait(until.presenceOf(filter_panel)).then(function(){
      browser.executeScript("arguments[0].click();", filter_clear_button.getWebElement());
      element(by.css('#widemenu .top-bar-right a[ui-sref="Root.Settings.Account"] .fi-cog.iconic-md')).click();

      browser.wait(until.presenceOf(element(by.css('.settings-view'))));

      element(by.css('div.settings-account div.tabbable ul.tabs > li:nth-of-type(3) a')).click();

      element(by.css('div.date-format-example-row .medium-6.columns span b')).getText().then(function(date_time_fomart_text){
        account_date_time_fomart = date_time_fomart_text;
      });

      element(by.css('#widemenu .top-bar-left a[ui-sref="Root.Tracking"] .fi-map.iconic-lg')).click();

      var tracking_listview_button = element(by.css('.tracking-view .lf-toolbar .fi-spreadsheet.iconic-md'));
      tracking_listview_button.click();

      browser.wait(until.presenceOf(expanded_panel));
    });

  });

  describe('Check sortable and event of Workers tab', function() {

    it('Check sortable A > Z', function() {
      browser.waitForAngularEnabled(true);
      var columnCount = 1;
      var is_name_column_sorted = true;
      var previous_data = '';
      element(by.cssContainingText('.expanded-panel .tabbable .tabs li > a', 'Workers')).click();
      browser.wait(until.presenceOf(element(by.css('.expanded-panel .tabs-panel.is-active div.k-grid[kendo-grid="grids.workersGrid"][k-options="workersGridOptions"]'))));

      element.all(by.css('.expanded-panel .tabs-panel.is-active table[role="grid"] thead[role="rowgroup"] tr[role="row"] th')).each(function(column){
        column.isDisplayed().then(function(is_column_displayed){
          if(is_column_displayed){
            browser.executeScript("arguments[0].click();", column.getWebElement());

            column.getText().then(function(column_name){
              is_name_column_sorted = true;
              previous_data = null;
              element.all(by.css('.expanded-panel .tabs-panel.is-active table[role="grid"] tbody[role="rowgroup"] > tr:not(:first-of-type)')).each(function(row) {
                var tooltip_status = row.element(by.css('td:nth-of-type('+columnCount+') div.tooltip-status'));
                var last_seen_by = row.element(by.css('td:nth-of-type('+columnCount+') div.last-seen-by'));
                var who_brought_it = row.element(by.css('td:nth-of-type('+columnCount+') div.who-brought-it'));

                tooltip_status.isPresent().then(function(is_tooltip_status_presented){
                  if(is_tooltip_status_presented){
                    tooltip_status.getText().then(function(tooltip_status_text){
                      if(tooltip_status_text.toLowerCase().indexOf('on site')>=0){
                        row.element(by.css('div.who-brought-it')).isPresent().then(function(is_brought_it_presented){
                          if(!is_brought_it_presented){
                            row.element(by.css('td:nth-of-type(1)')).getText().then(function(worker_name){
                              console.log('Fail : Worker '+worker_name+' have On site status but don\'t have Who Brought It');
                            });
                          }
                        });
                      }
                    });
                  } else {
                    last_seen_by.isPresent().then(function(is_last_seen_by_presented){
                      if(is_last_seen_by_presented){
                        last_seen_by.getText().then(function(last_seen_by_text){
                          var lastSeenDevice = last_seen_by_text.split('on')[0].trim().toLowerCase();
                          var lastSeenTime = last_seen_by_text.split('on')[1].trim();

                          var stringDateToparse = lastSeenTime;
                          if(account_date_time_fomart=='dd/MM/yyyy HH:mm'){
                            stringDateToparse = stringDateToparse.split(' ')[0].split('/')[1] + '/' + stringDateToparse.split(' ')[0].split('/')[0] + '/' + stringDateToparse.split(' ')[0].split('/')[2] +' ' + stringDateToparse.split(' ')[1];
                          }
                          var currentDateTimeEpoch = Math.round(Date.parse(stringDateToparse) / 1000);

                          if(previous_data !== null){
                            var prevLastSeenDevice = previous_data.split('on')[0].trim().toLowerCase();
                            var prevLastSeenTime = previous_data.split('on')[1].trim();
                            stringDateToparse = prevLastSeenTime;
                            if(account_date_time_fomart=='dd/MM/yyyy HH:mm'){
                              stringDateToparse = stringDateToparse.split(' ')[0].split('/')[1] + '/' + stringDateToparse.split(' ')[0].split('/')[0] + '/' + stringDateToparse.split(' ')[0].split('/')[2] +' ' + stringDateToparse.split(' ')[1];
                            }
                            var prevDateTimeEpoch = Math.round(Date.parse(stringDateToparse) / 1000);

                            if(prevDateTimeEpoch>currentDateTimeEpoch){
                              is_name_column_sorted = false;
                              console.log('Fail: sort by ascending for '+column_name+'/'+columnCount+' : \'' + last_seen_by_text + '\' after  \'' + previous_data+ '\'');
                            }
                          }
                          previous_data = last_seen_by_text;
                        });
                      } else {
                        if(column_name=='Who brought it'){
                          row.element(by.css('td:nth-of-type('+columnCount+')')).getText().then(function(who_brought_it_text){
                            if(who_brought_it_text===''){
                              who_brought_it_text = 'AAAAAAAAAAA on 01/01/1970 00:00';
                            }
                            var whoBroughtItDevice = who_brought_it_text.split('on')[0].trim().toLowerCase();
                            var whoBroughtItTime = who_brought_it_text.split('on')[1].trim();
                            var currentDateTime = new Date(whoBroughtItTime);
                            var currentDateTimeEpoch = Math.round(currentDateTime.getTime() / 1000);

                            if((previous_data!==null)&&(previous_data!=='')){
                              var prevWhoBroughtDevice = previous_data.split('on')[0].trim().toLowerCase();
                              var prevWhoBroughtTime = previous_data.split('on')[1].trim();
                              var prevDateTime = new Date(prevWhoBroughtTime);
                              var prevDateTimeEpoch = Math.round(prevDateTime.getTime() / 1000);
                              if(prevDateTimeEpoch>currentDateTimeEpoch){
                                is_name_column_sorted = false;
                                console.log('Fail: sort by ascending for '+column_name+'/'+columnCount+' : \'' + who_brought_it_text + '\' after  \'' + previous_data+ '\'');
                              }
                            }
                            previous_data = who_brought_it_text;
                          });
                        } else {
                          row.element(by.css('td:nth-of-type('+columnCount+')')).getText().then(function(row_normal_text){
                            if(previous_data!==null){
                              if ((row_normal_text >= previous_data)) {

                              }else{
                                is_name_column_sorted = false;
                                console.log('Fail: sort by ascending for '+column_name+'/'+columnCount+' : \'' + row_normal_text + '\' after  \'' + previous_data+ '\'');
                              }
                            }
                            previous_data = row_normal_text;
                          });
                        }
                      }
                    });
                  }
                });
              }).then(function() {
                expect(is_name_column_sorted).toBeTruthy();
                if(!is_name_column_sorted){
                  console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
                }
                columnCount++;
              });
            });
          }
        });
      });
    });

    it('Check sortable Z > A', function() {
      var columnCount = 1;
      var is_name_column_sorted = true;
      var previous_data = '';
      element(by.cssContainingText('.expanded-panel .tabbable .tabs li > a', 'Workers')).click();
      browser.wait(until.presenceOf(element(by.css('.expanded-panel .tabs-panel.is-active div.k-grid[kendo-grid="grids.workersGrid"][k-options="workersGridOptions"]'))));

      element.all(by.css('.expanded-panel .tabs-panel.is-active table[role="grid"] thead[role="rowgroup"] tr[role="row"] th')).each(function(column){
        column.isDisplayed().then(function(is_column_displayed){
          if(is_column_displayed){
            browser.executeScript("arguments[0].click();", column.getWebElement());
            browser.executeScript("arguments[0].click();", column.getWebElement());
            column.getText().then(function(column_name){
              is_name_column_sorted = true;
              previous_data = null;
              element.all(by.css('.expanded-panel .tabs-panel.is-active table[role="grid"] tbody[role="rowgroup"] > tr:not(:first-of-type)')).each(function(row) {
                var tooltip_status = row.element(by.css('td:nth-of-type('+columnCount+') div.tooltip-status'));
                var last_seen_by = row.element(by.css('td:nth-of-type('+columnCount+') div.last-seen-by'));
                tooltip_status.isPresent().then(function(is_tooltip_status_presented){
                  if(is_tooltip_status_presented){
                    tooltip_status.getText().then(function(tooltip_status_text){
                      //console.log(tooltip_status_text);
                    });
                  } else {
                    last_seen_by.isPresent().then(function(is_last_seen_by_presented){
                      if(is_last_seen_by_presented){
                        last_seen_by.getText().then(function(last_seen_by_text){
                          var lastSeenDevice = last_seen_by_text.split('on')[0].trim().toLowerCase();
                          var lastSeenTime = last_seen_by_text.split('on')[1].trim();

                          var stringDateToparse = lastSeenTime;
                          if(account_date_time_fomart=='dd/MM/yyyy HH:mm'){
                            stringDateToparse = stringDateToparse.split(' ')[0].split('/')[1] + '/' + stringDateToparse.split(' ')[0].split('/')[0] + '/' + stringDateToparse.split(' ')[0].split('/')[2] +' ' + stringDateToparse.split(' ')[1];
                          }
                          var currentDateTimeEpoch = Math.round(Date.parse(stringDateToparse) / 1000);

                          if(previous_data!==null){
                            var prevLastSeenDevice = previous_data.split('on')[0].trim().toLowerCase();
                            var prevLastSeenTime = previous_data.split('on')[1].trim();
                            stringDateToparse = prevLastSeenTime;
                            if(account_date_time_fomart=='dd/MM/yyyy HH:mm'){
                              stringDateToparse = stringDateToparse.split(' ')[0].split('/')[1] + '/' + stringDateToparse.split(' ')[0].split('/')[0] + '/' + stringDateToparse.split(' ')[0].split('/')[2] +' ' + stringDateToparse.split(' ')[1];
                            }
                            var prevDateTimeEpoch = Math.round(Date.parse(stringDateToparse) / 1000);

                            if(prevDateTimeEpoch<currentDateTimeEpoch){
                              is_name_column_sorted = false;
                              console.log('Fail: sort by descending for '+column_name+'/'+columnCount+' : \'' + last_seen_by_text + '\' before  \'' + previous_data+ '\'');
                            }
                          }
                          previous_data = last_seen_by_text;
                        });
                      } else {
                        if(column_name=='Who brought it'){
                          row.element(by.css('td:nth-of-type('+columnCount+')')).getText().then(function(who_brought_it_text){
                            if(who_brought_it_text===''){
                              who_brought_it_text = 'AAAAAAAAAAA on 01/01/1970 00:00';
                            }
                            var whoBroughtItDevice = who_brought_it_text.split('on')[0].trim().toLowerCase();
                            var whoBroughtItTime = who_brought_it_text.split('on')[1].trim();
                            var currentDateTime = new Date(whoBroughtItTime);
                            var currentDateTimeEpoch = Math.round(currentDateTime.getTime() / 1000);

                            if((previous_data!==null)&&(previous_data!=='')){
                              var prevWhoBroughtDevice = previous_data.split('on')[0].trim().toLowerCase();
                              var prevWhoBroughtTime = previous_data.split('on')[1].trim();
                              var prevDateTime = new Date(prevWhoBroughtTime);
                              var prevDateTimeEpoch = Math.round(prevDateTime.getTime() / 1000);
                              if(prevDateTimeEpoch<currentDateTimeEpoch){
                                is_name_column_sorted = false;
                                console.log('Fail: sort by descending for '+column_name+'/'+columnCount+' : \'' + who_brought_it_text + '\' before  \'' + previous_data+ '\'');
                              }
                            }
                            previous_data = who_brought_it_text;
                          });
                        } else {
                          row.element(by.css('td:nth-of-type('+columnCount+')')).getText().then(function(row_normal_text){
                            if(previous_data!==null){
                              if ((row_normal_text <= previous_data)) {

                              }else{
                                is_name_column_sorted = false;
                                console.log('Fail: sort by descending for '+column_name+'/'+columnCount+' : \'' + row_normal_text + '\' before  \'' + previous_data+ '\'');
                              }
                            }
                            previous_data = row_normal_text;
                          });
                        }
                      }
                    });
                  }
                });
              }).then(function() {
                expect(is_name_column_sorted).toBeTruthy();
                if(!is_name_column_sorted){
                  console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
                }
                columnCount++;
              });
            });
          }
        });
      });
    });

    it('The map will be shown when click on a row of workers', function() {
      element.all(by.css('.expanded-panel .tabs-panel.is-active table[role="grid"] tbody[role="rowgroup"] > tr')).each(function(row) {
        row.isPresent().then(function(is_row_presented){
          if(is_row_presented){
            var dataToCheck = {
              name : {
                isExit : false,
                value : ''
              },
              driverName : {
                isExit : false,
                value : ''
              },
              firstStatus : {
                isExit : false,
                value : ''
              },
              secondStatus : {
                isExit : false,
                value : ''
              },
              temperature : {
                isExit : false,
                value : ''
              },
              equipment : {
                isExit : false,
                value : ''
              },
              speed : {
                isExit : false,
                value : ''
              },
              location : {
                isExit : false,
                value : ''
              },
              lastmessage : {
                isExit : false,
                value : ''
              }
            };

            var elementName = row.element(by.css('td span[ng-bind="dataItem.name"]'));
            var statusElement = row.element(by.css('td status-field'));
            var driverElement = row.element(by.css('td .driver-field'));
            var temperatureElement = row.all(by.css('td temperature-tags-field div.tooltip-temperature div[ng-if="tag.temperature != null"],div[ng-if="tag.temperature === null"]'));
            var equipmentsElement = row.all(by.css('td equipments div.equipments > div'));
            var addressElement = row.element(by.css('td address-field .address-field'));
            var lastMessageElement = row.element(by.css('span[ng-bind="dataItem.timestampFormatted"]'));


            elementName.getText().then(function(name_of_element){
              dataToCheck.name.isExit = true;
              dataToCheck.name.value = name_of_element;

              driverElement.isPresent().then(function(is_driverElement_presented){
                if(is_driverElement_presented){
                  driverElement.getText().then(function(driverElement_text){
                    if(driverElement_text!==''){
                      dataToCheck.driverName.isExit = true;
                      dataToCheck.driverName.value = driverElement_text;
                    }
                  });
                }
              }).then(function(){
                statusElement.isPresent().then(function(is_statusElement_presented){
                  if(is_statusElement_presented){
                    var firstStatus = statusElement.element(by.css('.tooltip-status div:nth-of-type(1)'));
                    var secondStatus = statusElement.element(by.css('.tooltip-status div:nth-of-type(2) span'));
                    firstStatus.getText().then(function(firstStatusText){
                      secondStatus.getText().then(function(secondStatusText){
                        firstStatusText = firstStatusText.replace('&nbsp;',' ');
                        secondStatusText = secondStatusText.replace('&nbsp;',' ');

                        dataToCheck.firstStatus.isExit = true;
                        dataToCheck.firstStatus.value = firstStatusText;

                        dataToCheck.secondStatus.isExit = true;
                        dataToCheck.secondStatus.value = secondStatusText.replace(/[0-9]{1,2} sec/i,'');

                      }).then(function(){
                        temperatureElement.count().then(function(count_temperatureElement){
                          if(count_temperatureElement > 0){
                            dataToCheck.temperature.isExit = true;
                            temperatureElement.each(function(temp_display){
                              temp_display.getText().then(function(all_temp_display_text){
                                dataToCheck.temperature.value += all_temp_display_text+'|';
                              });
                            }).then(function(){
                              dataToCheck.temperature.value = dataToCheck.temperature.value.slice(0,-1);
                            });
                          }
                        }).then(function(){
                          equipmentsElement.count().then(function(count_equipment){
                            if(count_equipment>0){
                              dataToCheck.equipment.isExit = true;
                              equipmentsElement.each(function(equipment_element){
                                equipment_element.getText().then(function(equipment_element_text){
                                  dataToCheck.equipment.value += equipment_element_text+'|';
                                });
                              });
                            }
                          }).then(function(){
                            addressElement.getText().then(function(addressElement_text){
                              dataToCheck.location.isExit = true;
                              dataToCheck.location.value = addressElement_text;
                            }).then(function(){
                              lastMessageElement.isPresent().then(function(is_lastMessageElement_presented){
                                if(is_lastMessageElement_presented){
                                  lastMessageElement.getText().then(function(lastMessageElement_text){
                                    if(lastMessageElement_text!==''){
                                      dataToCheck.lastmessage.isExit = true;
                                      dataToCheck.lastmessage.value = lastMessageElement_text;
                                    }
                                  });
                                }
                              }).then(function(){
                                browser.executeScript("arguments[0].click();", row.getWebElement());

                                browser.wait(until.presenceOf(element(by.css('.show-vehicle-on-map .map-element-tooltip'))));

                                var tool_tip_name = element(by.css('.show-vehicle-on-map lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > div > span:nth-of-type(1).ng-binding'));
                                var tool_tip_primary_status = element(by.css('.show-vehicle-on-map lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > status-field > div.status-field > div > div.tooltip-status > div:nth-of-type(1)'));
                                var tool_tip_second_status = element(by.css('.show-vehicle-on-map lf-map map-element-tooltip map-element-tooltip-header .map-element-tooltip-header > div > div > status-field > div.status-field > div > div.tooltip-status > div:nth-of-type(2)[ng-if="element.inTracking"] span.ng-binding'));
                                var tool_tip_time = element(by.css('.show-vehicle-on-map lf-map map-element-info div.map-element-info > div > div.tooltip-time'));
                                var adress_or_geozone = element(by.css('.show-vehicle-on-map lf-map map-element-info div.map-element-info div[ng-if="isValid(address) && !geozonesValid(geozones)"] div.ng-binding,.show-vehicle-on-map lf-map map-element-info div.map-element-info address-field div[ng-repeat="geozone in geozones"] div.ng-binding'));

                                //browser.wait(until.presenceOf(adress_or_geozone));

                                expect(tool_tip_name.isPresent()).toBeTruthy();
                                expect(tool_tip_primary_status.isPresent()).toBeTruthy();
                                expect(tool_tip_second_status.isPresent()).toBeTruthy();
                                expect(tool_tip_time.isPresent()).toBeTruthy();

                                tool_tip_name.getText().then(function(tool_tip_name_text){
                                  adress_or_geozone.isPresent().then(function(is_adress_or_geozone_presented){
                                    if(!is_adress_or_geozone_presented){
                                      console.log('Address or Geozone of '+tool_tip_name_text+' is missing on the map');
                                    }

                                    if(dataToCheck.name.isExit){
                                      expect(tool_tip_name_text==dataToCheck.name.value).toBeTruthy();
                                      if(tool_tip_name_text!=dataToCheck.name.value){
                                        console.log('Worker '+ tool_tip_name_text +' name on listview is different from map : ' + tool_tip_name_text + '/' + dataToCheck.name.value);
                                      }
                                    }

                                    if(dataToCheck.firstStatus.isExit){
                                      tool_tip_primary_status.getText().then(function(tool_tip_primary_status_text){
                                        expect(tool_tip_primary_status_text==dataToCheck.firstStatus.value).toBeTruthy();
                                        if(tool_tip_primary_status_text!=dataToCheck.firstStatus.value){
                                          console.log('Worker '+ tool_tip_name_text +' primary status on listview is different from map : ' + tool_tip_primary_status_text + '/' + dataToCheck.firstStatus.value);
                                        }
                                      });
                                    }

                                    if(dataToCheck.secondStatus.isExit){
                                      tool_tip_second_status.getText().then(function(tool_tip_second_status_text){
                                        var tool_tip_second_status_text_removed_sec = tool_tip_second_status_text.replace(/[0-9]{1,2} sec/i,'');
                                        expect(tool_tip_second_status_text_removed_sec==dataToCheck.secondStatus.value).toBeTruthy();
                                        if(tool_tip_second_status_text_removed_sec!=dataToCheck.secondStatus.value){
                                          console.log('Worker '+tool_tip_name_text+' second status on listview is different from map : ' + tool_tip_second_status_text_removed_sec + '/' + dataToCheck.secondStatus.value);
                                        }
                                      });
                                    }
                                    element(by.css('.show-vehicle-on-map button[ng-click="close()"]')).click();
                                    browser.wait(until.stalenessOf(element(by.css('.show-vehicle-on-map'))));
                                  });
                                });

                              });
                            });
                          });
                        });
                      });
                    });
                  }
                });
              });
            });
          }
        });
      });
    });

  });

});
