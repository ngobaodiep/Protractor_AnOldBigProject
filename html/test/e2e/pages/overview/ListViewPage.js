/*
    ListViewPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';
  
  var ListViewPage = function() {
    var list_view_button = element(by.css('.tracking-view .lf-toolbar .fi-spreadsheet.iconic-md')),
      vehicles_tab = element(by.css('.expanded-panel .tabbable .tabs li:nth-child(1) > a')),
      machines_tab = element(by.css('.expanded-panel .tabbable .tabs li:nth-child(2) > a')),
      standalones_tab = element(by.css('.expanded-panel .tabbable .tabs li:nth-child(3) > a')),
      workers_tab = element(by.css('.expanded-panel .tabbable .tabs li:nth-child(4) > a')),
      mobileassets_tab = element(by.css('.expanded-panel .tabbable .tabs li:nth-child(5) > a')),
      list_view_pager = element(by.css('.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap')),
      list_view = element(by.css('.tracking-view .expanded-panel')),
      vehicles_grid = element(by.css('.expanded-panel .tabs-panel.is-active div.k-grid[kendo-grid="grids.vehiclesGrid"][k-options="vehiclesGridOptions"]')),
      loading_mask = element(by.css('.k-loading-mask')),

      name_vehicle_column = vehicles_grid.element(by.css('th[data-field="name"]')),
      status_vehicle_column = vehicles_grid.element(by.css('th[data-field="status"]')),
      category_vehicle_column = vehicles_grid.element(by.css('th[data-field="vehicleCategoryName"]')),
      speed_vehicle_column = vehicles_grid.element(by.css('th[data-field="speed"]')),
      location_vehicle_column = vehicles_grid.element(by.css('th[data-field="location"]')),
      last_message_vehicle_column = vehicles_grid.element(by.css('th[data-field="timestampFormatted"]')),

      machines_grid = element(by.css('.expanded-panel .tabs-panel.is-active div.k-grid[kendo-grid="grids.machinesGrid"][k-options="machinesGridOptions"]')),

      name_machine_column = machines_grid.element(by.css('th[data-field="name"]')),
      driver_machine_column = machines_grid.element(by.css('th[data-field="fullName"]')),
      status_machine_column = machines_grid.element(by.css('th[data-field="status"]')),
      category_machine_column = machines_grid.element(by.css('th[data-field="machineCategoryName"]')),
      speed_machine_column = machines_grid.element(by.css('th[data-field="speed"]')),
      location_machine_column = machines_grid.element(by.css('th[data-field="location"]')),
      last_message_machine_column = machines_grid.element(by.css('th[data-field="timestampFormatted"]')),

      standalones_grid = element(by.css('.expanded-panel .tabs-panel.is-active div.k-grid[kendo-grid="grids.standalonesGrid"][k-options="standalonesGridOptions"]')),

      name_standalone_column = standalones_grid.element(by.css('th[data-field="name"]')),
      status_standalone_column = standalones_grid.element(by.css('th[data-field="status"]')),
      category_standalone_column = standalones_grid.element(by.css('th[data-field="standaloneCategoryName"]')),
      location_standalone_column = standalones_grid.element(by.css('th[data-field="location"]')),
      last_message_standalone_column = standalones_grid.element(by.css('th[data-field="timestampFormatted"]')),

      workers_grid = element(by.css('.expanded-panel .tabs-panel.is-active div.k-grid[kendo-grid="grids.workersGrid"][k-options="workersGridOptions"]')),

      name_worker_column = workers_grid.element(by.css('th[data-field="name"]')),
      status_worker_column = workers_grid.element(by.css('th[data-field="status"]')),
      category_worker_column = workers_grid.element(by.css('th[data-field="workerCategoryName"]')),
      location_worker_column = workers_grid.element(by.css('th[data-field="location"]')),
      who_brought_it_worker_column = workers_grid.element(by.css('th[data-field="whoBroughtItName"]')),
      last_seen_by_worker_column = workers_grid.element(by.css('th[data-field="lastSeenBy"]')),

      mobileassets_grid = element(by.css('.expanded-panel .tabs-panel.is-active div.k-grid[kendo-grid="grids.mobileassetsGrid"][k-options="mobileassetsGridOptions"]')),

      name_mobileasset_column = mobileassets_grid.element(by.css('th[data-field="name"]')),
      status_mobileasset_column = mobileassets_grid.element(by.css('th[data-field="status"]')),
      category_mobileasset_column = mobileassets_grid.element(by.css('th[data-field="mobileAssetCategoryName"]')),
      location_mobileasset_column = mobileassets_grid.element(by.css('th[data-field="location"]')),
      who_brought_it_mobileasset_column = mobileassets_grid.element(by.css('th[data-field="whoBroughtItName"]')),
      last_seen_by_mobileasset_column = mobileassets_grid.element(by.css('th[data-field="lastSeenBy"]'));

    this.getListView = function() {
      return list_view;
    };

    this.clickListView = function() {
      browser.executeScript("arguments[0].click();", list_view_button.getWebElement());
    };

    this.getListViewButton = function() {
      return list_view_button;
    };

    this.getVehiclesTab = function() {
      return vehicles_tab;
    };

    this.getMachinesTab = function() {
      return machines_tab;
    };

    this.getStandalonesTab = function() {
      return standalones_tab;
    };

    this.getWorkersTab = function() {
      return workers_tab;
    };

    this.getMobileassetsTab = function() {
      return mobileassets_tab;
    };

    this.getListViewPager = function() {
      return list_view_pager;
    };

    this.clickVehiclesTab = function() {
      browser.executeScript("arguments[0].click();", vehicles_tab.getWebElement());
    };

    this.clickMachinesTab = function() {
      browser.executeScript("arguments[0].click();", machines_tab.getWebElement());
    };

    this.clickStandalonesTab = function() {
      browser.executeScript("arguments[0].click();", standalones_tab.getWebElement());
    };

    this.clickWorkersTab = function() {
      browser.executeScript("arguments[0].click();", workers_tab.getWebElement());
    };

    this.clickMobileassetsTab = function() {
      browser.executeScript("arguments[0].click();", mobileassets_tab.getWebElement());
    };

    this.getVehiclesGrid = function() {
      return vehicles_grid;
    };

    this.getVehiclesGridRow = function(n) {
      return vehicles_grid.element(by.css('.k-grid-content.k-auto-scrollable tbody tr:nth-child(' + n + ')'));
    };

    this.getMachinesGrid = function() {
      return machines_grid;
    };

    this.getMachinesGridRow = function(n) {
      return machines_grid.element(by.css('.k-grid-content.k-auto-scrollable tbody tr:nth-of-type(' + n + ')'));
    };

    this.getStandalonesGrid = function() {
      return standalones_grid;
    };

    this.getWorkersGrid = function() {
      return workers_grid;
    };

    this.getMobileassetsGrid = function() {
      return mobileassets_grid;
    };

    this.getMobileassetsGridRow = function(n) {
      return mobileassets_grid.element(by.css('.k-grid-content.k-auto-scrollable tbody tr:nth-of-type(' + n + ')'));
    };

    this.getNameVehiclesColumn = function() {
      return name_vehicle_column;
    };

    this.getStatusVehiclesColumn = function() {
      return status_vehicle_column;
    };

    this.getCategoryVehiclesColumn = function() {
      return category_vehicle_column;
    };

    this.getSpeedVehiclesColumn = function() {
      return speed_vehicle_column;
    };

    this.getLoadingMask = function() {
      return loading_mask;
    };

    this.getLocationVehiclesColumn = function() {
      return location_vehicle_column;
    };

    this.getLastMessageVehiclesColumn = function() {
      return last_message_vehicle_column;
    };

    this.getNameMachinesColumn = function() {
      return name_machine_column;
    };

    this.getDriverMachinesColumn = function() {
      return driver_machine_column;
    };

    this.getStatusMachinesColumn = function() {
      return status_machine_column;
    };

    this.getCategoryMachinesColumn = function() {
      return category_machine_column;
    };

    this.getSpeedMachinesColumn = function() {
      return speed_machine_column;
    };

    this.getLocationMachinesColumn = function() {
      return location_machine_column;
    };

    this.getLastMessageMachinesColumn = function() {
      return last_message_machine_column;
    };

    this.getNameStandalonesColumn = function() {
      return name_standalone_column;
    };

    this.getStatusStandalonesColumn = function() {
      return status_standalone_column;
    };

    this.getCategoryStandalonesColumn = function() {
      return category_standalone_column;
    };

    this.getLocationStandalonesColumn = function() {
      return location_standalone_column;
    };

    this.getLastMessageStandalonesColumn = function() {
      return last_message_standalone_column;
    };

    this.getNameWorkersColumn = function() {
      return name_worker_column;
    };

    this.getStatusWorkersColumn = function() {
      return status_worker_column;
    };

    this.getCategoryWorkersColumn = function() {
      return category_worker_column;
    };

    this.getLocationWorkersColumn = function() {
      return location_worker_column;
    };

    this.getWhoBroughtItWorkersColumn = function() {
      return who_brought_it_worker_column;
    };

    this.getLastSeenWorkersColumn = function() {
      return last_seen_by_worker_column;
    };

    this.getNameMobileassetsColumn = function() {
      return name_mobileasset_column;
    };

    this.getStatusMobileassetsColumn = function() {
      return status_mobileasset_column;
    };

    this.getCategoryMobileassetsColumn = function() {
      return category_mobileasset_column;
    };

    this.getLocationMobileassetsColumn = function() {
      return location_mobileasset_column;
    };

    this.getWhoBroughtItMobileassetsColumn = function() {
      return who_brought_it_mobileasset_column;
    };

    this.getLastSeenMobileassetsColumn = function() {
      return last_seen_by_mobileasset_column;
    };

    this.convertTimeStringToSeconds = function(string) {
      //string = 'since 10 hours 57 min 33 sec.'
      var txt = string;
      var time = [];
      txt = txt.replace(/\D/g, ' ');
      txt = txt.replace(/\s+/g, " ");
      txt = txt.replace(/^\s+|\s+$/g, "");
      time = txt.split(" ");
      if (time.length == 1) {
        return parseInt(time[0], 10);
      } else {
        if (time.length == 2) {
          return parseInt(time[0], 10) * 60 + parseInt(time[1], 10);
        } else {
          return parseInt(time[0], 10) * 60 * 60 + parseInt(time[1], 10) * 60 + parseInt(time[2], 10);
        }
      }
    };
  };
  module.exports = new ListViewPage();
})();
