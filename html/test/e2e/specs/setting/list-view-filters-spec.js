describe('Check Filters on three tabs of Listview', function() {
  var user_input,
    password_input,
    login_button,
    lf_loader_overlay,
    until = protractor.ExpectedConditions,
    expanded_panel;

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

    var tracking_listview_button = element(by.css('.tracking-view .lf-toolbar .fi-spreadsheet.iconic-md'));
    tracking_listview_button.click();

    browser.wait(until.presenceOf(expanded_panel));
  });

  describe('Check filters on 3 tab', function() {
    it('Check filters on Vehicles tab', function() {
      browser.waitForAngularEnabled(true);
      var columns = [];
      element.all(by.css('div[kendo-grid="grids.vehiclesGrid"] div.k-grid-header-wrap table thead tr.k-filter-row th')).each(function(th){
        var input_textbox = th.element(by.css('input.k-textbox'));
        var input_select = th.element(by.css('input[data-role="dropdownlist"]:not(.k-dropdown-operator)'));
        var input_formatted = th.element(by.css('input.k-formatted-value'));
          input_textbox.isPresent().then(function(is_input_textbox_presented){
            if(is_input_textbox_presented){
              input_textbox.getAttribute('aria-label').then(function(column_name){
                columns.push({
                  type : 'TEXBOX',
                  name : column_name,
                  haveData : false,
                  data : null
                });
              });

            }
          });

          input_select.isPresent().then(function(is_input_select_presented){
            if(is_input_select_presented){
              input_select.getAttribute('aria-label').then(function(column_name){
                columns.push({
                  type : 'SELECT',
                  name : column_name,
                  haveData : false,
                  data : null
                });
              });
            }
          });

          input_formatted.isPresent().then(function(is_input_formatted_presented){
            if(is_input_formatted_presented){
              input_formatted.getAttribute('title').then(function(column_name){
                columns.push({
                  type : 'FORMATTED',
                  name : column_name,
                  haveData : false,
                  data : null
                });
              });
            }
          });

      }).then(function(){
        element.all(by.css('div[kendo-grid="grids.vehiclesGrid"] div.k-grid-content > table[role="grid"] > tbody > tr')).each(function(dataRow){
          var column_count = 0;
          dataRow.all(by.css('td[role="gridcell"]')).each(function(dataCell){
            dataCell.getText().then(function(cellText){
              if((cellText !== null )&&(cellText !== '')){
                if(!columns[column_count].haveData){
                  if(cellText.indexOf('\n')){
                    cellText = cellText.split('\n')[0];
                  }
                  columns[column_count].data = cellText;
                  columns[column_count].haveData = true;
                }
              }
            }).then(function(){
              column_count++;
            });
          }).then(function(){
            //
          });
        });
      }).then(function(){
        //Check sample data last time
        columns.forEach(function(item,index){
          if((item.type=='FORMATTED')||(item.data=='Temperature')){
            item.data = '0';
            item.haveData = true;
          }
          if(!item.haveData){
            item.data = '';
            item.haveData = true;
          }
        });
      }).then(function(){
        var column_count = 0;
        element.all(by.css('div[kendo-grid="grids.vehiclesGrid"] div.k-grid-header-wrap table thead tr.k-filter-row th')).each(function(th){
          var input_textbox = th.element(by.css('input.k-textbox'));
          var input_select = th.element(by.css('input[data-role="dropdownlist"]:not(.k-dropdown-operator)'));
          var input_formatted = th.element(by.css('input.k-formatted-value'));
          var clear_filter_button= th.element(by.css('span.k-icon.k-i-close'));
          var filter_success = true;
            input_textbox.isPresent().then(function(is_input_textbox_presented){
              if(is_input_textbox_presented){
                input_textbox.isDisplayed().then(function(is_input_textbox_displayed){
                  if(is_input_textbox_displayed){
                    input_textbox.clear().sendKeys(columns[column_count].data).then(function(){
                        element.all(by.css('div[kendo-grid="grids.vehiclesGrid"] div.k-grid-content > table[role="grid"] > tbody > tr')).each(function(dataRow){
                          dataRow.element(by.css('td:nth-of-type('+(column_count+1)+')')).getText().then(function(dataCell){
                            if(dataCell.indexOf(columns[column_count].data)<0){
                              filter_success = false;
                            }
                          });
                        }).then(function(){
                          if(!filter_success){
                            console.log('Filter fail for column ' + columns[column_count].name + ' with filter value : ' + columns[column_count].data);
                          }
                          expect(filter_success).toBeTruthy();
                        });
                    }).then(function(){
                      clear_filter_button.isPresent().then(function(is_clear_filter_button_presented){
                        if(is_clear_filter_button_presented){
                          clear_filter_button.isDisplayed().then(function(is_clear_filter_button_displayed){
                            if(is_clear_filter_button_displayed){
                              clear_filter_button.click();
                            }
                          });
                        }
                      });
                    }).then(function(){
                      column_count++;
                    });
                  }
                });
              }
            });

            input_select.isPresent().then(function(is_input_select_presented){
              if(is_input_select_presented){
                browser.executeScript("arguments[0].click();", th.element(by.css('span.k-filtercell span.k-operator-hidden span.k-select')).getWebElement()).then(function(){
                  var list_to_select = element(by.css('div.k-state-border-up.k-list-container div.k-list-scroller > ul[aria-hidden="false"]'));
                  var isClicked = false;
                  list_to_select.all(by.css('li')).each(function(li){
                    li.getText().then(function(option){
                      if((columns[column_count].data.indexOf(option)>=0)&&(!isClicked)){
                        isClicked = true;
                        browser.executeScript("arguments[0].click();", li.getWebElement());
                      }
                    });
                  }).then(function(){
                    element.all(by.css('div[kendo-grid="grids.vehiclesGrid"] div.k-grid-content > table[role="grid"] > tbody > tr')).each(function(dataRow){
                      dataRow.element(by.css('td:nth-of-type('+(column_count+1)+')')).getText().then(function(dataCell){
                        if(dataCell.indexOf(columns[column_count].data)<0){
                          filter_success = false;
                        }
                      });
                    }).then(function(){
                      if(!filter_success){
                        console.log('Filter fail for column ' + columns[column_count].name + ' with filter value : ' + columns[column_count].data);
                      }
                      expect(filter_success).toBeTruthy();
                    });
                  }).then(function(){
                    clear_filter_button.isPresent().then(function(is_clear_filter_button_presented){
                      if(is_clear_filter_button_presented){
                        clear_filter_button.isDisplayed().then(function(is_clear_filter_button_displayed){
                          if(is_clear_filter_button_displayed){
                            clear_filter_button.click();
                          }
                        });
                      }
                    });
                  });
                }).then(function(){
                  column_count++;
                });
              }
            });

            input_formatted.isPresent().then(function(is_input_formatted_presented){
              if(is_input_formatted_presented){
                input_formatted.isDisplayed().then(function(is_input_formatted_displayed){
                  if(is_input_formatted_displayed){
                    browser.executeScript("$(arguments[0]).val('"+columns[column_count].data+"');", input_formatted.getWebElement());
                    browser.executeScript("$(arguments[0]).keypress();", input_formatted.getWebElement()).then(function(){
                      element.all(by.css('div[kendo-grid="grids.vehiclesGrid"] div.k-grid-content > table[role="grid"] > tbody > tr')).each(function(dataRow){
                        dataRow.element(by.css('td:nth-of-type('+(column_count+1)+')')).getText().then(function(dataCell){
                          if(columns[column_count].name=='Temperature'){
                            if((columns[column_count].data=='0')&&(dataCell.indexOf('Unknown')<0)){
                              if(dataCell !== ''){
                                filter_success = false;
                                dataCell.split('\n').forEach(function(index,item){
                                  var intValue = parseInt(item)||-1;
                                  if(intValue >= 0){
                                    filter_success = true;
                                  }
                                });
                              }
                            } else {
                              filter_success = false;
                              var filterIntValue = parseInt(columns[column_count].data)||-1;
                              dataCell.split('\n').forEach(function(index,item){
                                var intValue = parseInt(item)||-1;
                                if(intValue >= filterIntValue){
                                  filter_success = true;
                                }
                              });
                            }
                          }
                        });
                      }).then(function(){
                        if(!filter_success){
                          console.log('Filter fail for column ' + columns[column_count].name + ' with filter value : ' + columns[column_count].data);
                        }
                        expect(filter_success).toBeTruthy();
                      });
                    }).then(function(){
                      clear_filter_button.isPresent().then(function(is_clear_filter_button_presented){
                        if(is_clear_filter_button_presented){
                          clear_filter_button.isDisplayed().then(function(is_clear_filter_button_displayed){
                            if(is_clear_filter_button_displayed){
                              clear_filter_button.click();
                            } else {
                              browser.executeScript("$(arguments[0]).val('');", input_formatted.getWebElement());
                            }
                          });
                        }
                      });
                    }).then(function(){
                      column_count++;
                    });
                  }
                });
              }
            });
        });
      });
    });

    it('Check filters on Workers tab', function() {
      element(by.css('.expanded-panel ul.tabs li.tabs-title:nth-of-type(2) > a')).click();

      var columns = [];
      element.all(by.css('div[kendo-grid="grids.workersGrid"] div.k-grid-header-wrap table thead tr.k-filter-row th')).each(function(th){
        var input_textbox = th.element(by.css('input.k-textbox'));
        var input_select = th.element(by.css('input[data-role="dropdownlist"]:not(.k-dropdown-operator)'));
        var input_formatted = th.element(by.css('input.k-formatted-value'));
          input_textbox.isPresent().then(function(is_input_textbox_presented){
            if(is_input_textbox_presented){
              input_textbox.getAttribute('aria-label').then(function(column_name){
                columns.push({
                  type : 'TEXBOX',
                  name : column_name,
                  haveData : false,
                  data : null
                });
              });

            }
          });

          input_select.isPresent().then(function(is_input_select_presented){
            if(is_input_select_presented){
              input_select.getAttribute('aria-label').then(function(column_name){
                columns.push({
                  type : 'SELECT',
                  name : column_name,
                  haveData : false,
                  data : null
                });
              });
            }
          });

          input_formatted.isPresent().then(function(is_input_formatted_presented){
            if(is_input_formatted_presented){
              input_formatted.getAttribute('title').then(function(column_name){
                columns.push({
                  type : 'FORMATTED',
                  name : column_name,
                  haveData : false,
                  data : null
                });
              });
            }
          });

      }).then(function(){
        element.all(by.css('div[kendo-grid="grids.workersGrid"] div.k-grid-content > table[role="grid"] > tbody > tr')).each(function(dataRow){
          var column_count = 0;
          dataRow.all(by.css('td[role="gridcell"]')).each(function(dataCell){
            dataCell.getText().then(function(cellText){
              if((cellText !== null )&&(cellText !== '')){
                if(!columns[column_count].haveData){
                  if(cellText.indexOf('\n')){
                    cellText = cellText.split('\n')[0];
                  }
                  columns[column_count].data = cellText;
                  columns[column_count].haveData = true;
                }
              }
            }).then(function(){
              column_count++;
            });
          }).then(function(){
            //
          });
        });
      }).then(function(){
        //Check sample data last time
        columns.forEach(function(item,index){
          if((item.type=='FORMATTED')||(item.data=='Temperature')){
            item.data = '0';
            item.haveData = true;
          }
          if(!item.haveData){
            item.data = '';
            item.haveData = true;
          }
        });
      }).then(function(){
        var column_count = 0;
        element.all(by.css('div[kendo-grid="grids.workersGrid"] div.k-grid-header-wrap table thead tr.k-filter-row th')).each(function(th){
          var input_textbox = th.element(by.css('input.k-textbox'));
          var input_select = th.element(by.css('input[data-role="dropdownlist"]:not(.k-dropdown-operator)'));
          var input_formatted = th.element(by.css('input.k-formatted-value'));
          var clear_filter_button= th.element(by.css('span.k-icon.k-i-close'));
          var filter_success = true;
            input_textbox.isPresent().then(function(is_input_textbox_presented){
              if(is_input_textbox_presented){
                input_textbox.isDisplayed().then(function(is_input_textbox_displayed){
                  if(is_input_textbox_displayed){
                    input_textbox.clear().sendKeys(columns[column_count].data).then(function(){
                        element.all(by.css('div[kendo-grid="grids.workersGrid"] div.k-grid-content > table[role="grid"] > tbody > tr')).each(function(dataRow){
                          dataRow.element(by.css('td:nth-of-type('+(column_count+1)+')')).getText().then(function(dataCell){
                            if(dataCell.indexOf(columns[column_count].data)<0){
                              filter_success = false;
                            }
                          });
                        }).then(function(){
                          if(!filter_success){
                            console.log('Filter fail for column ' + columns[column_count].name + ' with filter value : ' + columns[column_count].data);
                          }
                          expect(filter_success).toBeTruthy();
                        });
                    }).then(function(){
                      clear_filter_button.isPresent().then(function(is_clear_filter_button_presented){
                        if(is_clear_filter_button_presented){
                          clear_filter_button.isDisplayed().then(function(is_clear_filter_button_displayed){
                            if(is_clear_filter_button_displayed){
                              clear_filter_button.click();
                            }
                          });
                        }
                      });
                    }).then(function(){
                      column_count++;
                    });
                  }
                });
              }
            });

            input_select.isPresent().then(function(is_input_select_presented){
              if(is_input_select_presented){
                browser.executeScript("arguments[0].click();", th.element(by.css('span.k-filtercell span.k-operator-hidden span.k-select')).getWebElement()).then(function(){
                  var list_to_select = element(by.css('div.k-state-border-up.k-list-container div.k-list-scroller > ul[aria-hidden="false"]'));
                  var isClicked = false;
                  list_to_select.all(by.css('li')).each(function(li){
                    li.getText().then(function(option){
                      if((columns[column_count].data.indexOf(option)>=0)&&(!isClicked)){
                        isClicked = true;
                        browser.executeScript("arguments[0].click();", li.getWebElement());
                      }
                    });
                  }).then(function(){
                    element.all(by.css('div[kendo-grid="grids.workersGrid"] div.k-grid-content > table[role="grid"] > tbody > tr')).each(function(dataRow){
                      dataRow.element(by.css('td:nth-of-type('+(column_count+1)+')')).getText().then(function(dataCell){
                        if(dataCell.indexOf(columns[column_count].data)<0){
                          filter_success = false;
                        }
                      });
                    }).then(function(){
                      if(!filter_success){
                        console.log('Filter fail for column ' + columns[column_count].name + ' with filter value : ' + columns[column_count].data);
                      }
                      expect(filter_success).toBeTruthy();
                    });
                  }).then(function(){
                    clear_filter_button.isPresent().then(function(is_clear_filter_button_presented){
                      if(is_clear_filter_button_presented){
                        clear_filter_button.isDisplayed().then(function(is_clear_filter_button_displayed){
                          if(is_clear_filter_button_displayed){
                            clear_filter_button.click();
                          }
                        });
                      }
                    });
                  });
                }).then(function(){
                  column_count++;
                });
              }
            });

            input_formatted.isPresent().then(function(is_input_formatted_presented){
              if(is_input_formatted_presented){
                input_formatted.isDisplayed().then(function(is_input_formatted_displayed){
                  if(is_input_formatted_displayed){
                    browser.executeScript("$(arguments[0]).val('"+columns[column_count].data+"');", input_formatted.getWebElement());
                    browser.executeScript("$(arguments[0]).keypress();", input_formatted.getWebElement()).then(function(){
                      element.all(by.css('div[kendo-grid="grids.workersGrid"] div.k-grid-content > table[role="grid"] > tbody > tr')).each(function(dataRow){
                        dataRow.element(by.css('td:nth-of-type('+(column_count+1)+')')).getText().then(function(dataCell){
                          if(columns[column_count].name=='Temperature'){
                            if((columns[column_count].data=='0')&&(dataCell.indexOf('Unknown')<0)){
                              if(dataCell !== ''){
                                filter_success = false;
                                dataCell.split('\n').forEach(function(index,item){
                                  var intValue = parseInt(item)||-1;
                                  if(intValue >= 0){
                                    filter_success = true;
                                  }
                                });
                              }
                            } else {
                              filter_success = false;
                              var filterIntValue = parseInt(columns[column_count].data)||-1;
                              dataCell.split('\n').forEach(function(index,item){
                                var intValue = parseInt(item)||-1;
                                if(intValue >= filterIntValue){
                                  filter_success = true;
                                }
                              });
                            }
                          }
                        });
                      }).then(function(){
                        if(!filter_success){
                          console.log('Filter fail for column ' + columns[column_count].name + ' with filter value : ' + columns[column_count].data);
                        }
                        expect(filter_success).toBeTruthy();
                      });
                    }).then(function(){
                      clear_filter_button.isPresent().then(function(is_clear_filter_button_presented){
                        if(is_clear_filter_button_presented){
                          clear_filter_button.isDisplayed().then(function(is_clear_filter_button_displayed){
                            if(is_clear_filter_button_displayed){
                              clear_filter_button.click();
                            } else {
                              browser.executeScript("$(arguments[0]).val('');", input_formatted.getWebElement());
                            }
                          });
                        }
                      });
                    }).then(function(){
                      column_count++;
                    });
                  }
                });
              }
            });
        });
      });
    });

    it('Check filters on Objects tab', function() {
      element(by.css('.expanded-panel ul.tabs li.tabs-title:nth-of-type(3) > a')).click();

      var columns = [];
      element.all(by.css('div[kendo-grid="grids.mobileassetsGrid"] div.k-grid-header-wrap table thead tr.k-filter-row th')).each(function(th){
        var input_textbox = th.element(by.css('input.k-textbox'));
        var input_select = th.element(by.css('input[data-role="dropdownlist"]:not(.k-dropdown-operator)'));
        var input_formatted = th.element(by.css('input.k-formatted-value'));
          input_textbox.isPresent().then(function(is_input_textbox_presented){
            if(is_input_textbox_presented){
              input_textbox.getAttribute('aria-label').then(function(column_name){
                columns.push({
                  type : 'TEXBOX',
                  name : column_name,
                  haveData : false,
                  data : null
                });
              });

            }
          });

          input_select.isPresent().then(function(is_input_select_presented){
            if(is_input_select_presented){
              input_select.getAttribute('aria-label').then(function(column_name){
                columns.push({
                  type : 'SELECT',
                  name : column_name,
                  haveData : false,
                  data : null
                });
              });
            }
          });

          input_formatted.isPresent().then(function(is_input_formatted_presented){
            if(is_input_formatted_presented){
              input_formatted.getAttribute('title').then(function(column_name){
                columns.push({
                  type : 'FORMATTED',
                  name : column_name,
                  haveData : false,
                  data : null
                });
              });
            }
          });

      }).then(function(){
        element.all(by.css('div[kendo-grid="grids.mobileassetsGrid"] div.k-grid-content > table[role="grid"] > tbody > tr')).each(function(dataRow){
          var column_count = 0;
          dataRow.all(by.css('td[role="gridcell"]')).each(function(dataCell){
            dataCell.getText().then(function(cellText){
              if((cellText !== null )&&(cellText !== '')){
                if(!columns[column_count].haveData){
                  if(cellText.indexOf('\n')){
                    cellText = cellText.split('\n')[0];
                  }
                  columns[column_count].data = cellText;
                  columns[column_count].haveData = true;
                }
              }
            }).then(function(){
              column_count++;
            });
          }).then(function(){
            //
          });
        });
      }).then(function(){
        //Check sample data last time
        columns.forEach(function(item,index){
          if((item.type=='FORMATTED')||(item.data=='Temperature')){
            item.data = '0';
            item.haveData = true;
          }
          if(!item.haveData){
            item.data = '';
            item.haveData = true;
          }
        });
      }).then(function(){
        var column_count = 0;
        element.all(by.css('div[kendo-grid="grids.mobileassetsGrid"] div.k-grid-header-wrap table thead tr.k-filter-row th')).each(function(th){
          var input_textbox = th.element(by.css('input.k-textbox'));
          var input_select = th.element(by.css('input[data-role="dropdownlist"]:not(.k-dropdown-operator)'));
          var input_formatted = th.element(by.css('input.k-formatted-value'));
          var clear_filter_button= th.element(by.css('span.k-icon.k-i-close'));
          var filter_success = true;
            input_textbox.isPresent().then(function(is_input_textbox_presented){
              if(is_input_textbox_presented){
                input_textbox.isDisplayed().then(function(is_input_textbox_displayed){
                  if(is_input_textbox_displayed){
                    input_textbox.clear().sendKeys(columns[column_count].data).then(function(){
                        element.all(by.css('div[kendo-grid="grids.mobileassetsGrid"] div.k-grid-content > table[role="grid"] > tbody > tr')).each(function(dataRow){
                          dataRow.element(by.css('td:nth-of-type('+(column_count+1)+')')).getText().then(function(dataCell){
                            if(dataCell.indexOf(columns[column_count].data)<0){
                              filter_success = false;
                            }
                          });
                        }).then(function(){
                          if(!filter_success){
                            console.log('Filter fail for column ' + columns[column_count].name + ' with filter value : ' + columns[column_count].data);
                          }
                          expect(filter_success).toBeTruthy();
                        });
                    }).then(function(){
                      clear_filter_button.isPresent().then(function(is_clear_filter_button_presented){
                        if(is_clear_filter_button_presented){
                          clear_filter_button.isDisplayed().then(function(is_clear_filter_button_displayed){
                            if(is_clear_filter_button_displayed){
                              clear_filter_button.click();
                            }
                          });
                        }
                      });
                    }).then(function(){
                      column_count++;
                    });
                  }
                });
              }
            });

            input_select.isPresent().then(function(is_input_select_presented){
              if(is_input_select_presented){
                browser.executeScript("arguments[0].click();", th.element(by.css('span.k-filtercell span.k-operator-hidden span.k-select')).getWebElement()).then(function(){
                  var list_to_select = element(by.css('div.k-state-border-up.k-list-container div.k-list-scroller > ul[aria-hidden="false"]'));
                  var isClicked = false;
                  list_to_select.all(by.css('li')).each(function(li){
                    li.getText().then(function(option){
                      if((columns[column_count].data.indexOf(option)>=0)&&(!isClicked)){
                        isClicked = true;
                        browser.executeScript("arguments[0].click();", li.getWebElement());
                      }
                    });
                  }).then(function(){
                    element.all(by.css('div[kendo-grid="grids.mobileassetsGrid"] div.k-grid-content > table[role="grid"] > tbody > tr')).each(function(dataRow){
                      dataRow.element(by.css('td:nth-of-type('+(column_count+1)+')')).getText().then(function(dataCell){
                        if(dataCell.indexOf(columns[column_count].data)<0){
                          filter_success = false;
                        }
                      });
                    }).then(function(){
                      if(!filter_success){
                        console.log('Filter fail for column ' + columns[column_count].name + ' with filter value : ' + columns[column_count].data);
                      }
                      expect(filter_success).toBeTruthy();
                    });
                  }).then(function(){
                    clear_filter_button.isPresent().then(function(is_clear_filter_button_presented){
                      if(is_clear_filter_button_presented){
                        clear_filter_button.isDisplayed().then(function(is_clear_filter_button_displayed){
                          if(is_clear_filter_button_displayed){
                            clear_filter_button.click();
                          }
                        });
                      }
                    });
                  });
                }).then(function(){
                  column_count++;
                });
              }
            });

            input_formatted.isPresent().then(function(is_input_formatted_presented){
              if(is_input_formatted_presented){
                input_formatted.isDisplayed().then(function(is_input_formatted_displayed){
                  if(is_input_formatted_displayed){
                    browser.executeScript("$(arguments[0]).val('"+columns[column_count].data+"');", input_formatted.getWebElement());
                    browser.executeScript("$(arguments[0]).keypress();", input_formatted.getWebElement()).then(function(){
                      element.all(by.css('div[kendo-grid="grids.mobileassetsGrid"] div.k-grid-content > table[role="grid"] > tbody > tr')).each(function(dataRow){
                        dataRow.element(by.css('td:nth-of-type('+(column_count+1)+')')).getText().then(function(dataCell){
                          if(columns[column_count].name=='Temperature'){
                            if((columns[column_count].data=='0')&&(dataCell.indexOf('Unknown')<0)){
                              if(dataCell !== ''){
                                filter_success = false;
                                dataCell.split('\n').forEach(function(index,item){
                                  var intValue = parseInt(item)||-1;
                                  if(intValue >= 0){
                                    filter_success = true;
                                  }
                                });
                              }
                            } else {
                              filter_success = false;
                              var filterIntValue = parseInt(columns[column_count].data)||-1;
                              dataCell.split('\n').forEach(function(index,item){
                                var intValue = parseInt(item)||-1;
                                if(intValue >= filterIntValue){
                                  filter_success = true;
                                }
                              });
                            }
                          }
                        });
                      }).then(function(){
                        if(!filter_success){
                          console.log('Filter fail for column ' + columns[column_count].name + ' with filter value : ' + columns[column_count].data);
                        }
                        expect(filter_success).toBeTruthy();
                      });
                    }).then(function(){
                      clear_filter_button.isPresent().then(function(is_clear_filter_button_presented){
                        if(is_clear_filter_button_presented){
                          clear_filter_button.isDisplayed().then(function(is_clear_filter_button_displayed){
                            if(is_clear_filter_button_displayed){
                              clear_filter_button.click();
                            } else {
                              browser.executeScript("$(arguments[0]).val('');", input_formatted.getWebElement());
                            }
                          });
                        }
                      });
                    }).then(function(){
                      column_count++;
                    });
                  }
                });
              }
            });
        });
      });
    });

  });
});
