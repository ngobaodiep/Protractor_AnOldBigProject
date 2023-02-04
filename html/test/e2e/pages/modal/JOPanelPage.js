/*
    this page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';
  var testUtils = require('./TestUtils');
  var JOPanelPage = function() {
    var journey_optimization_panel = element(by.css('.tracking-view .journey-optimization-panel')),
      itineary_tab = journey_optimization_panel.element(by.css('.tabbable .tabs li:nth-child(1) > a')),
      near_by_tab = journey_optimization_panel.element(by.css('.tabbable .tabs li:nth-child(2) > a')),
      search_address_tab = journey_optimization_panel.element(by.css('.tabbable .tabs li:nth-child(3) > a')),
      active_tab_content = journey_optimization_panel.element(by.css('.tabs-content .tabs-panel.is-active')),

      working_time = active_tab_content.all(by.css('input.k-formatted-value.k-input')).get(0),
      itinerary_address_input_list = active_tab_content.all(by.css('input[ng-model="controls.itineraries[$index]"]')),
      startingPoint_input = itinerary_address_input_list.get(0),
      waypoint_input1 = itinerary_address_input_list.get(1),
      destination_input = itinerary_address_input_list.get(2),
      destination_input_cleared = itinerary_address_input_list.get(1),
      add_location_button = journey_optimization_panel.element(by.css('.button.addDestination .fi-plus-thin')),
      estimated_duration = active_tab_content.element(by.css('ul.journey-optimization-table li:nth-child(1) itinerary-field .journey-optimization-estimated-time span:nth-child(2)')),
      time_arrival = active_tab_content.element(by.css('ul.journey-optimization-table li:nth-child(1) itinerary-field .journey-optimization-eta span:nth-child(2)')),
      distance = active_tab_content.element(by.css('ul.journey-optimization-table li:nth-child(1) itinerary-field .journey-optimization-distance span:nth-child(2)')),
      optimize_switcher = active_tab_content.element(by.css('.switch-paddle[for="optimum"]')),
      specify_arrival_time = active_tab_content.element(by.css('.switch-paddle[for="specifyArrivalTime"]')),

      itineraries = active_tab_content.all(by.css('div.row.itineraries.ng-scope div:nth-child(2).medium-12 ul.journey-optimization-table li')),

      reset_button = active_tab_content.element(by.css('button.cancel')),
      calculate_button = active_tab_content.element(by.css('button.ok')),

      search_address_position = active_tab_content.element(by.css('input[ng-model="controls.searchAddress"]')),
      search_button = active_tab_content.element(by.css('[ng-click="searchAddress()"]')),

      map_element_tooltip = element(by.css('.map .gm-style-iw .map-element-tooltip')),
      map_tooltip_address = map_element_tooltip.element(by.css('address-field .small-10 span')),
      tooltip_routing_from = map_element_tooltip.element(by.css('div[ng-click="useAsItineraryFrom()"]')),
      tooltip_routing_to = map_element_tooltip.element(by.css('div[ng-click="useAsItineraryTo()"]')),
      tooltip_add_waypoint = map_element_tooltip.element(by.css('div[ng-click="useAsWaypoint()"]')),
      tooltip_near_assets = map_element_tooltip.element(by.css('div[ng-click="useAsNearestAssetDestination()"]'));

    this.getJourneyOptimizationPanel = function() {
      return journey_optimization_panel;
    };

    this.getItinearyTab = function() {
      return itineary_tab;
    };

    this.getSpecifyArrivalTimeSwitch = function() {
      return specify_arrival_time;
    };

    this.getItineraries = function() {
      return itineraries;
    };

    this.getNearByTab = function() {
      return near_by_tab;
    };

    this.getSeachAddressTab = function() {
      return search_address_tab;
    };

    this.getWorkingTime = function() {
      return working_time;
    };

    this.getStartingPoint = function() {
      return startingPoint_input;
    };

    this.getDestination = function() {
      return destination_input;
    };

    this.getDestinationCleared = function() {
      return destination_input_cleared;
    };

    this.getCalculateButton = function() {
      return calculate_button;
    };

    this.getOptimizeSwitcher = function() {
      return optimize_switcher;
    };

    this.getEstimatedDuration = function() {
      return estimated_duration;
    };

    this.getTimeArrival = function() {
      return time_arrival;
    };

    this.getDistance = function() {
      return distance;
    };

    this.getSearchButton = function() {
      return search_button;
    };

    this.getSearchPositionInput = function() {
      return search_address_position;
    };

    this.getMapElementTooltip = function() {
      return map_element_tooltip;
    };

    this.getMapTooltipAddress = function() {
      return map_tooltip_address;
    };

    this.getTooltipRoutingFrom = function() {
      return tooltip_routing_from;
    };

    this.getTooltipRoutingTo = function() {
      return tooltip_routing_to;
    };

    this.getTooltipAddWaypoint = function() {
      return tooltip_add_waypoint;
    };

    this.getTooltipNearAssets = function() {
      return tooltip_near_assets;
    };

    this.getItineraryAddressInputList = function() {
      return itinerary_address_input_list;
    };

    this.clickCalculateButton = function() {
      browser.executeScript("arguments[0].click();", calculate_button.getWebElement());
    };

    this.clickResetButton = function() {
      browser.executeScript("arguments[0].click();", reset_button.getWebElement());
    };

    this.clickOptimizeSwitcher = function() {
      browser.executeScript("arguments[0].click();", optimize_switcher.getWebElement());
    };

    this.clickSpecifyArrivalTime = function() {
      browser.executeScript("arguments[0].click();", specify_arrival_time.getWebElement());
    };

    this.clickItinearyTab = function() {
      browser.executeScript("arguments[0].click();", itineary_tab.getWebElement());
    };

    this.clickSearchAddressTab = function() {
      browser.executeScript("arguments[0].click();", search_address_tab.getWebElement());
    };

    this.fillAddress = function() {
      browser.executeScript("arguments[0].click();", add_location_button.getWebElement());
      browser.wait(testUtils.until.visibilityOf(waypoint_input1));
      browser.wait(testUtils.until.visibilityOf(startingPoint_input));
      browser.executeScript("arguments[0].click();", startingPoint_input.getWebElement());
      startingPoint_input.clear().sendKeys('Ha Noi, Viet Nam');
      browser.executeScript("arguments[0].click();", waypoint_input1.getWebElement());
      waypoint_input1.clear().sendKeys('Hai Duong, Viet Nam');
      browser.executeScript("arguments[0].click();", destination_input.getWebElement());
      destination_input.clear().sendKeys('Hai Phong, Viet Nam');
    };

    this.fillAddress2 = function() {
      this.clickSpecifyArrivalTime();
      browser.wait(testUtils.until.visibilityOf(this.getSpecifyArrivalTimeSwitch()));
      browser.executeScript("arguments[0].click();", add_location_button.getWebElement());
      browser.wait(testUtils.until.visibilityOf(waypoint_input1));
      browser.wait(testUtils.until.visibilityOf(startingPoint_input));
      browser.executeScript("arguments[0].click();", startingPoint_input.getWebElement());
      startingPoint_input.clear().sendKeys('Route de Divonne 24, 1260 Nyon, CH');
      browser.executeScript("arguments[0].click();", waypoint_input1.getWebElement());
      waypoint_input1.clear().sendKeys('Rue du Levant 137, 1920 Martigny, CH');
      browser.executeScript("arguments[0].click();", destination_input.getWebElement());
      destination_input.clear().sendKeys('11023 Chambave, Aosta Valley, IT');
    };

    this.fillSearchAddressInput = function(string) {
      browser.executeScript("arguments[0].click();", search_address_position.getWebElement());
      search_address_position.clear().sendKeys(string);
    };

    this.convertTime = function(string) {
      var str1 = string.split(" ");
      var str2 = str1[0].split("/");
      return str2[1] + "/" + str2[0] + "/" + str2[2] + " " + str1[1];
    };
  };
  module.exports = new JOPanelPage();
})();
