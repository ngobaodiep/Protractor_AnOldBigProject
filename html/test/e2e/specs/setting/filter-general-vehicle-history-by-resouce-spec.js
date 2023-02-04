(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    mainPage = require('../MainPage'),
    historyPanelPage = require('./HistoryPanelPage'),
    filterPanelPage = require('../FilterPanelPage');

  describe('check filter panel and history panel ', function() {
    var today,
      yesterday,
      last7day,
      text_arc,
      text_column,

      driving_time,
      stopped_time,
      idle_time,

      driving_arc,
      stopped_arc,
      idle_arc,

      driving_column,
      stopped_column,
      idle_column,

      statistics_trips_number,

      from_time,
      to_time;

    beforeAll(function() {
      today = new Date();
      yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      last7day = new Date();
      last7day.setDate(last7day.getDate() - 7);
      mainPage.clickTrackingViewTab();
      browser.wait(testUtils.until.presenceOf(mainPage.getFilterButton()));
      browser.wait(testUtils.until.elementToBeClickable(mainPage.getFilterButton()));
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.visibilityOf(filterPanelPage.getFilterPanel()));
      browser.wait(testUtils.until.presenceOf(element(by.css('.filter-panel ul.tabs li:nth-child(1).tabs-title.is-active a'))));
      browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getFilterClearButton()));
      filterPanelPage.clickFilterClearButton();
      browser.wait(testUtils.until.presenceOf(element(by.css('#showVehicles.ng-not-empty'))));
      filterPanelPage.clickMachinesSwitcher();
      filterPanelPage.clickStandalonesSwitcher();
      filterPanelPage.clickWorkersSwitcher();
      filterPanelPage.clickMobileassetsSwitcher();
      filterPanelPage.clickGeozonesSwitcher();
      mainPage.clickFilterButton();
      browser.wait(testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel()));
      mainPage.clickHistoryButton();
      browser.wait(testUtils.until.presenceOf(historyPanelPage.getHistoryPanel()));
    });

    describe('when today radio clicked', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.presenceOf(historyPanelPage.getTimeFrameToday()));
        browser.executeScript("arguments[0].click();", historyPanelPage.getTimeFrameToday().getWebElement());
        historyPanelPage.getFromTimeInput().getAttribute('value').then(function(text) {
          from_time = new Date(historyPanelPage.convertDateString(text));
        });
        historyPanelPage.getToTimeInput().getAttribute('value').then(function(text) {
          to_time = new Date(historyPanelPage.convertDateString(text));
        });
      });

      it('should have date same as calendar', function() {
        expect(from_time.getDate()).toBe(today.getDate());
      });

      it('should have date between from time input and to time input', function() {
        expect(from_time.getDate()).toBe(to_time.getDate());
      });

      it('should be invisibility editing from time input', function() {
        expect(historyPanelPage.getFromTimeInput().getAttribute('aria-disabled')).toBe('true');
      });

      it('should be invisibility editing to time input', function() {
        expect(historyPanelPage.getToTimeInput().getAttribute('aria-disabled')).toBe('true');
      });
    });

    describe('when yesterday radio clicked ', function() {
      beforeAll(function() {
        browser.executeScript("arguments[0].click();", historyPanelPage.getTimeFrameYesterday().getWebElement());
        historyPanelPage.getFromTimeInput().getAttribute('value').then(function(text) {
          from_time = new Date(historyPanelPage.convertDateString(text));
        });
        historyPanelPage.getToTimeInput().getAttribute('value').then(function(text) {
          to_time = new Date(historyPanelPage.convertDateString(text));
        });
      });

      it('should have date between to time input and current time ', function() {
        expect(to_time.getDate()).toBe(today.getDate());
      });

      it('should be date of yesterday in from time input ', function() {
        expect(from_time.getDate()).toBe(yesterday.getDate());
      });

      it('should be invisibility editing from time input ', function() {
        expect(historyPanelPage.getFromTimeInput().getAttribute('aria-disabled')).toBe('true');
      });

      it('should be invisibility editing to time input ', function() {
        expect(historyPanelPage.getToTimeInput().getAttribute('aria-disabled')).toBe('true');
      });
    });

    describe('when last7day radio clicked ', function() {
      beforeAll(function() {
        browser.executeScript("arguments[0].click();", historyPanelPage.getTimeFrameLast7days().getWebElement());
        historyPanelPage.getFromTimeInput().getAttribute('value').then(function(text) {
          from_time = new Date(historyPanelPage.convertDateString(text));
        });
        historyPanelPage.getToTimeInput().getAttribute('value').then(function(text) {
          to_time = new Date(historyPanelPage.convertDateString(text));
        });
      });

      it('should have date between to time input and current time', function() {
        expect(to_time.getDate()).toBe(today.getDate());
      });

      it('should be date of last7days in from time input', function() {
        expect(from_time.getDate()).toBe(last7day.getDate());
      });

      it('should be invisibility editing from time input', function() {
        expect(historyPanelPage.getFromTimeInput().getAttribute('aria-disabled')).toBe('true');
      });

      it('should be invisibility editing to time input', function() {
        expect(historyPanelPage.getToTimeInput().getAttribute('aria-disabled')).toBe('true');
      });
    });

    describe('when custom radio clicked ', function() {
      beforeAll(function() {
        browser.executeScript("arguments[0].click();", historyPanelPage.getTimeFrameCustom().getWebElement());
      });

      describe('when check visibility of inputs ', function() {
        it('from time input should not be disable', function() {
          expect(historyPanelPage.getFromTimeInput().getAttribute('aria-disabled')).toBe("false");
        });

        it('to time input should not be disable', function() {
          expect(historyPanelPage.getToTimeInput().getAttribute('aria-disabled')).toBe("false");
        });
      });
    });

    describe('when show button clicked ', function() {
      beforeAll(function() {
        browser.executeScript("arguments[0].click();", historyPanelPage.getTimeFrameYesterday().getWebElement());
        historyPanelPage.chooseTemperatureTrackingObject();
        historyPanelPage.clickShowButton();
        browser.wait(testUtils.until.stalenessOf(historyPanelPage.getLoadingOverlay()));
        browser.wait(testUtils.until.presenceOf(historyPanelPage.getHistoryNoActivityLable2()));
        historyPanelPage.getHistoryNoActivityLable(1).isPresent().then(function(isPresent) {
          if (!isPresent) {
          //   have_no_activity = true;
          // } else {
            // have_no_activity = false;
            browser.wait(testUtils.until.visibilityOf(element(by.css('.history-stats-panel'))));
            browser.wait(testUtils.until.presenceOf(historyPanelPage.getHistoryMap()));
            browser.wait(testUtils.until.presenceOf(historyPanelPage.getHistoryMap().all(by.css('div img'))));
            browser.wait(testUtils.until.presenceOf(historyPanelPage.getTimeLine()));
          }
        });
      });

      it('to check history ', function() {
        if ((today.getDay()) == 1) {
          describe('if have history no activity label ', function() {
            it('should have warning label', function() {
              expect(historyPanelPage.getHistoryNoActivityLable(0).isPresent()).toBe(false);
              expect(historyPanelPage.getHistoryStatsPanel().isDisplayed()).toBe(false);
              expect(historyPanelPage.getHistoryStatsPanel().getAttribute('class')).toContain('ng-hide');
              expect(historyPanelPage.getHistoryNoActivityLable2().isDisplayed()).toBe(true);
              expect(historyPanelPage.getHistoryNoActivityLable2().getText()).not.toBe('');
            });
          });
        } else {
          describe('if have  activity on yesterday', function() {
            beforeAll(function() {
              browser.wait(testUtils.until.stalenessOf(element(by.css('.history-stats-panel.medium-12.ng-animate.ng-hide-animate.ng-hide-remove.ng-hide-remove-active'))));
              browser.wait(testUtils.until.visibilityOf(historyPanelPage.getHistoryStatsPanel()));
            });

            describe('and ', function() {
              it('should have history stats panel ', function() {
                expect(historyPanelPage.getHistoryNoActivityLable(0).isPresent()).toBe(true);
                expect(historyPanelPage.getHistoryStatsPanel().isDisplayed()).toBe(true);
                expect(historyPanelPage.getHistoryStatsPanel().getAttribute('class')).not.toContain('ng-hide');
              });
            });

            describe('when on Map tab ', function() {
              beforeAll(function() {
                browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getTemperature()));
                historyPanelPage.clickTemperature();
                browser.wait(testUtils.until.visibilityOf(historyPanelPage.getTemperatureLine()));
                historyPanelPage.getFromTimeInput().getAttribute('value').then(function(text) {
                  from_time = new Date(historyPanelPage.convertDateString(text));
                });
                historyPanelPage.getToTimeInput().getAttribute('value').then(function(text) {
                  to_time = new Date(historyPanelPage.convertDateString(text));
                });
              });

              it('should have temperature', function() {
                expect(historyPanelPage.getTemperature().isPresent()).toBe(true);
              });

              it('should have temperature line', function() {
                expect(historyPanelPage.getTemperatureLine().isPresent()).toBe(true);
              });

              it('should have time line', function() {
                expect(historyPanelPage.getTimeLine().isPresent()).toBe(true);
              });

              it('should have time line reset button', function() {
                expect(element(by.css('ul.accordion li:nth-child(2) .accordion-title history-control-button-reset a')).isPresent()).toBe(true);
              });

              it('should have time line backward button', function() {
                expect(element(by.css('ul.accordion li:nth-child(2) .accordion-title history-control-button-backward a')).isPresent()).toBe(true);
              });

              it('should have time line step backward button', function() {
                expect(element(by.css('ul.accordion li:nth-child(2) .accordion-title history-control-button-step-backward a')).isPresent()).toBe(true);
              });

              it('should have time line play button', function() {
                expect(element(by.css('ul.accordion li:nth-child(2) .accordion-title history-control-button-play a')).isPresent()).toBe(true);
              });

              it('should have time line step forward button', function() {
                expect(element(by.css('ul.accordion li:nth-child(2) .accordion-title history-control-button-step-forward a')).isPresent()).toBe(true);
              });

              it('should have time line forward button', function() {
                expect(element(by.css('ul.accordion li:nth-child(2) .accordion-title history-control-button-forward a')).isPresent()).toBe(true);
              });

              it('should have time line content', function() {
                expect(element(by.css('ul.accordion li:nth-child(2) .accordion-content')).isPresent()).toBe(true);
              });
            });

            describe('when on Statistics tab ', function() {
              beforeAll(function() {
                historyPanelPage.clickTemperature();
                browser.wait(testUtils.until.invisibilityOf(historyPanelPage.getTemperatureLine()));
                browser.wait(testUtils.until.elementToBeClickable(historyPanelPage.getStatisticsTab()));
                historyPanelPage.clickStatisticsTab();
                browser.wait(testUtils.until.presenceOf(historyPanelPage.getNumberOfTrips()));
                browser.wait(testUtils.until.presenceOf(element(by.css('div#history-barchart g:nth-child(3)')))); //rect:nth-child(2)

              });

              afterAll(function() {
                historyPanelPage.getNumberOfTrips().element(by.css('span')).getText().then(function(number) {
                  statistics_trips_number = parseInt(number, 10);
                });
              });

              describe('check displayed elements ', function() {
                it('should have driving time title', function() {
                  expect(historyPanelPage.getDrivingTime().element(by.css('h6')).isPresent()).toBe(true);
                });

                it('should have driving time value', function() {
                  expect(historyPanelPage.getDrivingTime().element(by.css('span')).isPresent()).toBe(true);
                });

                it('should have stopped time title', function() {
                  expect(historyPanelPage.getStoppedTime().element(by.css('h6')).isPresent()).toBe(true);
                });

                it('should have stopped time value', function() {
                  expect(historyPanelPage.getStoppedTime().element(by.css('span')).isPresent()).toBe(true);
                });

                it('should have idle time title', function() {
                  expect(historyPanelPage.getIdleTime().element(by.css('h6')).isPresent()).toBe(true);
                });

                it('should have idle time value', function() {
                  expect(historyPanelPage.getIdleTime().element(by.css('span')).isPresent()).toBe(true);
                });

                it('should have engagement time title', function() {
                  expect(historyPanelPage.getEngagementTime().element(by.css('h6')).isPresent()).toBe(true);
                });

                it('should have engagement time value', function() {
                  expect(historyPanelPage.getEngagementTime().element(by.css('span')).isPresent()).toBe(true);
                });

                it('should have equipment time title', function() {
                  expect(historyPanelPage.getEquipmentTime().element(by.css('h6')).isPresent()).toBe(true);
                });

                it('should have equipment time value', function() {
                  expect(historyPanelPage.getEquipmentTime().element(by.css('span')).isPresent()).toBe(true);
                });

                it('should have private time title', function() {
                  expect(historyPanelPage.getPrivateTime().element(by.css('h6')).isPresent()).toBe(true);
                });

                it('should have private time value', function() {
                  expect(historyPanelPage.getPrivateTime().element(by.css('span')).isPresent()).toBe(true);
                });

                it('should have total distance title', function() {
                  expect(historyPanelPage.getTotalDistance().element(by.css('h6')).isPresent()).toBe(true);
                });

                it('should have total distance value', function() {
                  expect(historyPanelPage.getTotalDistance().element(by.css('span')).isPresent()).toBe(true);
                });

                it('should have total business distance title', function() {
                  expect(historyPanelPage.getTotalBusinessDistance().element(by.css('h6')).isPresent()).toBe(true);
                });

                it('should have total business distance value', function() {
                  expect(historyPanelPage.getTotalBusinessDistance().element(by.css('span')).isPresent()).toBe(true);
                });

                it('should have total private distance title', function() {
                  expect(historyPanelPage.getTotalPrivateDistance().element(by.css('h6')).isPresent()).toBe(true);
                });

                it('should have total private distance value', function() {
                  expect(historyPanelPage.getTotalPrivateDistance().element(by.css('span')).isPresent()).toBe(true);
                });

                it('should have number of trips title', function() {
                  expect(historyPanelPage.getNumberOfTrips().element(by.css('h6')).isPresent()).toBe(true);
                });

                it('should have number of trips value', function() {
                  expect(historyPanelPage.getNumberOfTrips().element(by.css('span')).isPresent()).toBe(true);
                });

                it('should have pie chart', function() {
                  expect(element(by.css('div#history-piechart')).isPresent()).toBe(true);
                });


                it('should have bar chart', function() {
                  expect(element(by.css('div#history-barchart')).isPresent()).toBe(true);
                });

                it('column text should exist ', function() {
                  expect(historyPanelPage.getTextColumn().isPresent()).toBe(true);
                });

                it('column text should be none firstly', function() {
                  expect(historyPanelPage.getTextColumn().getAttribute('innerHTML')).toBe("");
                });
              });

              describe('when info checked ', function() {

                it('if driving time is not 0h0m', function() {
                  historyPanelPage.getDrivingTime().element(by.css('span')).getText().then(function(txt) {
                    if (txt != "0h0m") {
                      describe('when driving arc clicked ', function() {
                        beforeAll(function() {
                          historyPanelPage.getDrivingTime().element(by.css('span')).getText().then(function(txt) {
                            driving_time = txt;
                          });
                          browser.executeScript('arguments[0].scrollIntoView(true)', historyPanelPage.getDrivingLabel().getWebElement());
                          historyPanelPage.makeMouseEnterEvent(historyPanelPage.getDrivingLabel());
                          browser.wait(testUtils.until.presenceOf(historyPanelPage.getTextArcWithColor('#006bb3')));
                          browser.wait(testUtils.until.visibilityOf(historyPanelPage.getTextArc().element(by.css('tspan:nth-child(2)'))));
                          historyPanelPage.getTextArc().element(by.css('tspan:nth-child(2)')).getText().then(function(text) {
                            text_arc = text;
                          });
                          browser.executeScript("var element = arguments[0]; var mouseEventObj = document.createEvent('MouseEvents'); mouseEventObj.initEvent( 'mouseout', true, false ); element.dispatchEvent(mouseEventObj);", historyPanelPage.getDrivingLabel().getWebElement());
                          browser.wait(testUtils.until.stalenessOf(historyPanelPage.getTextArcWithColor('#006bb3')));
                        });

                        it('text arc should be same as driving time', function() {
                          expect(driving_time).toBe(text_arc);
                        });
                      });
                    }
                  });
                });

                it('if stopped time is not 0h0m', function() {
                  historyPanelPage.getStoppedTime().element(by.css('span')).getText().then(function(txt) {
                    stopped_time = txt;
                    if (txt != "0h0m") {
                      describe('when stopped arc clicked ', function() {
                        beforeAll(function() {
                          historyPanelPage.makeMouseEnterEvent(historyPanelPage.getStoppedLabel());
                          browser.wait(testUtils.until.presenceOf(historyPanelPage.getTextArcWithColor('#9e9e9e')));
                          browser.wait(testUtils.until.visibilityOf(historyPanelPage.getTextArc().element(by.css('tspan:nth-child(2)'))));
                          historyPanelPage.getTextArc().element(by.css('tspan:nth-child(2)')).getText().then(function(text) {
                            text_arc = text;
                          });
                          browser.executeScript("var element = arguments[0]; var mouseEventObj = document.createEvent('MouseEvents'); mouseEventObj.initEvent( 'mouseout', true, false ); element.dispatchEvent(mouseEventObj);", historyPanelPage.getStoppedLabel().getWebElement());
                          browser.wait(testUtils.until.stalenessOf(historyPanelPage.getTextArcWithColor('#9e9e9e')));
                        });

                        it('text arc should be same as stopped time', function() {
                          expect(stopped_time).toBe(text_arc);
                        });
                      });
                    }
                  });
                });

                it('if idle time is not 0h0m', function() {
                  historyPanelPage.getIdleTime().element(by.css('span')).getText().then(function(txt) {
                    idle_time = txt;
                    if (txt != "0h0m") {
                      describe('when idle arc clicked ', function() {
                        beforeAll(function() {
                          historyPanelPage.makeMouseEnterEvent(historyPanelPage.getIdleLabel());
                          browser.wait(testUtils.until.presenceOf(historyPanelPage.getTextArcWithColor('#ff9801')));
                          browser.wait(testUtils.until.visibilityOf(historyPanelPage.getTextArc().element(by.css('tspan:nth-child(2)'))));
                          historyPanelPage.getTextArc().element(by.css('tspan:nth-child(2)')).getText().then(function(text) {
                            text_arc = text;
                          });
                          browser.executeScript("var element = arguments[0]; var mouseEventObj = document.createEvent('MouseEvents'); mouseEventObj.initEvent( 'mouseout', true, false ); element.dispatchEvent(mouseEventObj);", historyPanelPage.getIdleLabel().getWebElement());
                          browser.wait(testUtils.until.stalenessOf(historyPanelPage.getTextArcWithColor('#ff9801')));
                        });

                        it('text arc should be same as stopped time', function() {
                          expect(idle_time).toBe(text_arc);
                        });
                      });
                    }
                  });
                });

                it('chart column text should display when column clicked ', function() {
                  describe('when column clicked ', function() {
                    beforeAll(function() {
                      element.all(by.css('div#history-barchart .g rect')).each(function(elem) {
                        elem.isDisplayed().then(function(isDisplayed) {
                          if (isDisplayed) {
                            historyPanelPage.makeMouseEnterEvent(elem);
                            browser.wait(testUtils.until.visibilityOf(historyPanelPage.getTextColumn()));
                            historyPanelPage.makeMouseOutEvent(elem);
                          }
                        });
                      });
                    });

                    it('text should be displayed', function() {
                      expect(historyPanelPage.getTextColumn().isDisplayed()).toBe(true);
                    });
                  });

                });
              });
            });

            describe('when on Activity logs tab ', function() {
              beforeAll(function() {
                historyPanelPage.clickActivityLogsTab();
              });

              it('should have Ignition On Off on each trip', function() {
                element.all(by.css('.history-stats-panel .tabs-panel.is-active .history-stats-panel-activity-log-tab history-activity-logs .activity-journey ul.k-treeview-lines li.k-item:not(.ng-scope)')).each(function(elm){
                  browser.executeScript("arguments[0].click();", elm.element(by.css('span.k-icon')).getWebElement());
                  browser.wait(testUtils.until.presenceOf(elm.element(by.css('ul li.k-last'))));
              
                  elm.all(by.css('ul li:nth-child(1) div.medium-5:nth-child(2) span')).count().then(function(count){
                    console.log(count+"L");
                  });
                  elm.all(by.css('ul li:nth-child(1) div.medium-5:nth-child(2)')).count().then(function(count){
                    console.log(count+"H");
                  });
                  elm.all(by.css('ul li:nth-child(1)')).count().then(function(count){
                    console.log(count+"K");
                  });
                  expect(elm.element(by.css('ul li:nth-child(1) div.medium-5:nth-child(2) span')).getText()).toBe('Driving Ignition on');
                  expect(elm.element(by.css('ul li:nth-child(1) div.medium-2:nth-child(3) span')).getText()).toBe('0 km/h');
                  expect(elm.element(by.css('ul li.k-last div.medium-5:nth-child(2) span')).getText()).toBe('Stopped Ignition off');
                  expect(elm.element(by.css('ul li.k-last div.medium-2:nth-child(3) span')).getText()).toBe('0 km/h');
                });
              });

              it('should have number of trips same as Statistics tab ', function() {

                expect(element.all(by.css('.history-stats-panel-activity-log-tab .activity-journey ul.k-treeview-lines li.k-item:not(.ng-scope)')).count()).toBe(statistics_trips_number);
              });
            });

            describe('when on journeys tab', function() {
              beforeAll(function() {
                historyPanelPage.clickJourneysTab();
                browser.wait(testUtils.until.visibilityOf(historyPanelPage.getJourneysSummaryInfo().element(by.css('div:nth-child(3).small-4 div:nth-child(2)'))));
              });

              afterAll(function() {
                mainPage.clickHistoryButton();
                browser.wait(testUtils.until.stalenessOf(historyPanelPage.getHistoryPanel()));
                mainPage.clickFilterButton();
                browser.wait(testUtils.until.visibilityOf(filterPanelPage.getFilterPanel()));
                browser.wait(testUtils.until.visibilityOf(filterPanelPage.getFilterClearButton()));
                browser.wait(testUtils.until.elementToBeClickable(filterPanelPage.getFilterClearButton()));
                filterPanelPage.clickFilterClearButton();
                mainPage.clickFilterButton();
                browser.wait(testUtils.until.invisibilityOf(filterPanelPage.getFilterPanel()));
              });
              it('number of trips should be same as Statistics tab ', function() {
                expect(historyPanelPage.getJourneysSummaryInfo().element(by.css('div:nth-child(3).small-4 div:nth-child(2)')).getText()).toBe(statistics_trips_number + "");
              });
            });
          });
        }
      });




    });
  });
})();
