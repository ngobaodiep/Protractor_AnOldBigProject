/*
    LegendPanelPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/

(function() {
  'use strict';

  var LegendPanelPage = function() {
    var legend_panel = element(by.css('.legend-panel')),
      legend_list_title = element.all(by.css('.legend-panel .row  div.columns.legend-title span.ng-binding')),
      legend_statuses_title = legend_list_title.get(0),
      legend_vehicles_title = legend_list_title.get(1),
      legend_workers_title = legend_list_title.get(2),
      legend_objects_title = legend_list_title.get(3),
      legend_geozones_title = legend_list_title.get(4),
      legend_clusters_title = legend_list_title.get(5),
      legend_icons_title = legend_list_title.get(6),
      hide_legend_button = element(by.css('.legend-panel .row  div.columns.legend-title span.icon-arrow-right3')),
      status_driving = element(by.css('.legend-panel .row .small-12:nth-of-type(2) .small-10 span.ng-binding')),
      status_nosignal = element(by.css('.legend-panel .row .small-12:nth-of-type(3) .small-10 span.ng-binding')),
      status_idle = element(by.css('.legend-panel .row .small-12:nth-of-type(4) .small-10 span.ng-binding')),
      status_stopped = element(by.css('.legend-panel .row .small-12:nth-of-type(5) .small-10 span.ng-binding')),
      status_private = element(by.css('.legend-panel .row .small-12:nth-of-type(6) .small-10 span.ng-binding')),
      status_towed = element(by.css('.legend-panel .row .small-12:nth-of-type(7) .small-10 span.ng-binding')),
      status_equipment_active = element(by.css('.legend-panel .row .small-12:nth-of-type(8) .small-10 span.ng-binding')),
      status_equipment_inactive = element(by.css('.legend-panel .row .small-12:nth-of-type(9) .small-10 span.ng-binding')),
      status_euipment_unknow = element(by.css('.legend-panel .row .small-12:nth-of-type(10) .small-10 span.ng-binding'));

    this.getLegendPanel = function() {
      return legend_panel;
    };

    this.getLegendStatusesTitle = function() {
      return legend_statuses_title;
    };

    this.getLegendVehiclesTitle = function() {
      return legend_vehicles_title;
    };

    this.getLegendWorkersTitle = function() {
      return legend_workers_title;
    };

    this.getLegendObjectsTitle = function() {
      return legend_objects_title;
    };

    this.getLegendGeozonesTitle = function() {
      return legend_geozones_title;
    };

    this.getLegendClustersTitle = function() {
      return legend_clusters_title;
    };

    this.getLegendIconsTitle = function() {
      return legend_icons_title;
    };

    this.getStatusDriving = function() {
      return status_driving;
    };

    this.getStatusNosignal = function() {
      return status_nosignal;
    };

    this.getStatusIdle = function() {
      return status_idle;
    };

    this.getStatusStopped = function() {
      return status_stopped;
    };

    this.getStatusPrivate = function() {
      return status_private;
    };

    this.getStatusTowed = function() {
      return status_towed;
    };

    this.getStatusEquipmentActive = function() {
      return status_equipment_active;
    };

    this.getStatusEquipmentInactive = function() {
      return status_equipment_inactive;
    };

    this.getStatusEquipmentUnknow = function() {
      return status_euipment_unknow;
    };

    this.clickHideLegendButton = function() {
      browser.executeScript("arguments[0].click();", hide_legend_button.getWebElement());
    };

  };
  module.exports = new LegendPanelPage();
})();
