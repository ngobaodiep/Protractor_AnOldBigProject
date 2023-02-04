/*
    MainMapPage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/

(function() {
  'use strict';

  var MainMapPage = function() {
    var tracking_map = element(by.css('.map')),
      geozone_cluster = element(by.css('.map div.lf-clusterer.lf-geozone-clusterer')),
      element_header = element(by.css('.map div.map-element-tooltip map-element-tooltip-header .map-element-tooltip-header ')),
      element_list = element.all(by.css('.map .map-element-tooltip map-element-info cluster-elements .cluster-elements > div.row.ng-scope')),
      map_element_tooltip = element(by.css('.map .gm-style-iw div.map-element-tooltip')),
      tracking_object_cluster_list = element.all(by.css('.map .lf-clusterer.lf-tracking-object-clusterer')),
      close_map_element_tooltip_button = element(by.css('.map .map-element-tooltip .map-element-tooltip-header span.fi-x-thin')),
      geozone_icon = element(by.css('.map .map-element-tooltip map-element-info .cluster-elements .row:nth-of-type(1) span.fi-map-marker')),

      show_cluster_menu_button = element(by.css('.map lf-map-button a.toggle-lf-map-button')),
      vehicle_cluster_button = element(by.css('.button-cluster-vehicle:not(.button-cluster-active)')),
      machine_cluster_button = element(by.css('.button-cluster-machine:not(.button-cluster-active)')),
      standalone_cluster_button = element(by.css('.button-cluster-standalone:not(.button-cluster-active)')),
      worker_cluster_button = element(by.css('.button-cluster-worker:not(.button-cluster-active)')),
      mobileasset_cluster_button = element(by.css('.button-cluster-mobileasset:not(.button-cluster-active)')),
      geozone_cluster_button = element(by.css('.button-cluster-geozone:not(.button-cluster-active)')),
      show_legend_button = element(by.css('.map lf-map-button[on-click="manageLegend()"] button')),
      zoom_in_button = element(by.css('.map .gmnoprint.gm-bundled-control .gmnoprint button[title="Zoom in"]')),
      zoom_out_button = element(by.css('div.gmnoprint.gm-bundled-control div.gmnoprint button[aria-label="Zoom out"]')),
      show_geozones_label_button = element(by.css('.lf-map-button-animation[on-click="toggleGeozoneslabels()"]  button')),
      geozone_cluster_circle = element.all(by.css('.overlay-components svg.geozone-clusterer circle[fill="#9933FF"]')),
      geozone_label = element(by.css('.lf-map-button-animation[on-click="manageGeozoneCluster()"]>div>a')),
      div_stranform = element(by.css('.tracking-view .map  >div:nth-of-type(1)  >div:nth-of-type(1)  >div:nth-of-type(1)  >div:nth-of-type(1) >div:nth-of-type(1) >div:nth-of-type(1) >div:nth-of-type(1)')),
      //OverviewPage
      map_tooltip_name = map_element_tooltip.element(by.css('map-element-tooltip-header .small-12:not(.tooltip-title) span.ng-binding')),
      map_tooltip_close_btn = map_element_tooltip.element(by.css('span.fi-x-thin.iconic-md')),
      map_tooltip_status = map_element_tooltip.element(by.css('.status-field div:nth-child(1).tooltip-status strong.ng-binding')),
      map_tooltip_status_color = map_element_tooltip.element(by.css('.small-12.tooltip-title')),
      map_tooltip_status_time = map_element_tooltip.element(by.css('status-field div.ng-binding.ng-scope')),
      map_tooltip_category_icon = map_element_tooltip.element(by.css('.rfid-category-field .small-2 .iconic-md')),
      map_tooltip_category = map_element_tooltip.element(by.css('.rfid-category-field .small-10.ng-binding')),
      map_tooltip_address = map_element_tooltip.element(by.css('address-field div:nth-child(1).small-12 .small-10 .ng-binding')),
      map_tooltip_address_icon = map_element_tooltip.element(by.css('address-field div:nth-child(1).small-12 .small-2 span.iconic-md')),
      map_tooltip_last_seen = map_element_tooltip.element(by.css('.last-seen-by .small-10.ng-binding')),
      map_tooltip_show_details_btn = map_element_tooltip.element(by.css('map-element-info-expand a[ng-click="toggleDetails()"]')),
      map_tooltip_routing_from_btn = map_element_tooltip.element(by.css('.map-element-tooltip-button.button-from')),
      map_tooltip_routing_to_btn = map_element_tooltip.element(by.css('.map-element-tooltip-button.button-to')),
      map_tooltip_share_btn = map_element_tooltip.element(by.css('div[ng-click="useAsNearestAssetDestination()"]')),
      map_tooltip_history_btn = map_element_tooltip.element(by.css('.map-element-tooltip-button.ng-scope')),
      map_tooltip_last_message_icon = map_element_tooltip.element(by.css('.tooltip-time span.fi-clock.iconic-md')),
      map_tooltip_last_message = map_element_tooltip.element(by.css('.tooltip-time div.small-10.ng-binding')),
      map_tooltip_driver_icon = map_element_tooltip.element(by.css('driver-field span.icon-steering-wheel.iconic-md')),
      map_tooltip_driver = map_element_tooltip.element(by.css('driver-field div.small-10 span:nth-child(2).ng-binding')),
      map_tooltip_info_expand_list = map_element_tooltip.all(by.css('.info-expand:not(.ng-hide) div.small-12.ng-scope')),
      map_tooltip_temperature_icon = map_element_tooltip.element(by.css('temperature-tags-field span.iconic-md:not(.tags-unknown).fi-thermometer')),
      map_tooltip_temperature_number = map_element_tooltip.element(by.css("temperature-tags-field .small-10 .small-3")),
      map_tooltip_temperature_description = map_element_tooltip.element(by.css("temperature-tags-field .small-10 .small-9")),

      //ListViewPage
      overlay_map_tooltip = element(by.css('.reveal-overlay .map div.gm-style-iw div.map-element-tooltip')),
      overlay_map_name = overlay_map_tooltip.element(by.css('map-element-tooltip-header .small-12:not(.tooltip-title) span.ng-binding')),
      overlay_map_cross_btn = overlay_map_tooltip.element(by.css('span.fi-x-thin.iconic-md')),
      overlay_map_status = overlay_map_tooltip.element(by.css('.status-field div:nth-child(1).tooltip-status strong.ng-binding')),
      overlay_map_status_time = overlay_map_tooltip.element(by.css('status-field div.ng-binding.ng-scope')),
      overlay_map_category_icon = overlay_map_tooltip.element(by.css('.rfid-category-field .small-2 .iconic-md')),
      overlay_map_category = overlay_map_tooltip.element(by.css('.rfid-category-field .small-10.ng-binding')),
      overlay_map_address = overlay_map_tooltip.element(by.css('address-field div:nth-child(1).small-12 .small-10 .ng-binding')),
      overlay_map_address_icon = overlay_map_tooltip.element(by.css('address-field div.small-12:nth-child(1) .small-2 span.iconic-md')),
      overlay_map_last_seen = overlay_map_tooltip.element(by.css('.last-seen-by .small-10.ng-binding')),
      overlay_map_show_details_btn = overlay_map_tooltip.element(by.css('map-element-info-expand a[ng-click="toggleDetails()"]')),
      
      overlay_map_last_message_icon = overlay_map_tooltip.element(by.css('.tooltip-time span.fi-clock.iconic-md')),
      overlay_map_last_message = overlay_map_tooltip.element(by.css('.tooltip-time div.small-10.ng-binding')),
      overlay_map_driver_icon = overlay_map_tooltip.element(by.css('driver-field span.icon-steering-wheel.iconic-md')),
      overlay_map_driver = overlay_map_tooltip.element(by.css('driver-field div.small-10 span:nth-child(2).ng-binding')),
      overlay_map_temperature_number = overlay_map_tooltip.element(by.css('temperature-tags-field div.small-3.ng-binding')),
      overlay_map_temperature_icon = overlay_map_tooltip.element(by.css('temperature-tags-field .small-2 .fi-thermometer.iconic-md:not(.tags-unknown)')),
      overlay_map_temperature_time = overlay_map_tooltip.element(by.css('temperature-tags-field .small-9.ng-binding')),
      overlay_map_unknown_temperature_icon = overlay_map_tooltip.element(by.css('temperature-tags-field .small-2 .iconic-md.tags-unknown')),
      overlay_map_unknown_temperature_description = overlay_map_tooltip.element(by.css('temperature-tags-field .small-10.unknown')),
      overlay_map_nosignal_temperature = overlay_map_tooltip.element(by.css('temperature-tags-field .small-10 div.ng-binding')),

      overlay_map_close_btn = element(by.css('.reveal-overlay div:nth-child(3).medium-12 button[ng-click="close()"]')),
      overlay_map_info_expand_list = overlay_map_tooltip.all(by.css('.info-expand:not(.ng-hide) div.small-12.ng-scope')),

      map_button = element(by.css('.tracking-view .map div:nth-child(1).gm-style-mtc div[role="button"]')),

      map_get_people_location = element(by.css('.tracking-view .map div.gm-svpc[title="Drag Pegman onto the map to open Street View"]')),
      map_satellite_button = element(by.css('.tracking-view .map div:nth-child(2).gm-style-mtc div[title="Show satellite imagery"]'));

    this.getTrackingMap = function() {
      return tracking_map;
    };

    this.getMapStreetStyleBtn = function() {
      return map_button;
    };

    this.getMapPeopleLocationBtn = function() {
      return map_get_people_location;
    };

    this.getZoomInBtn = function() {
      return zoom_in_button;
    };

    this.getZoomOutBtn = function() {
      return zoom_out_button;
    };

    this.getMapSatelliteBtn = function() {
      return map_satellite_button;
    };

    this.getMapElementPopup = function() {
      return map_element_tooltip;
    };

    this.getMapTooltipName = function() {
      return map_tooltip_name;
    };

    this.getMapTooltipCloseBtn = function() {
      return map_tooltip_close_btn;
    };

    this.getMapTooltipStatus = function() {
      return map_tooltip_status;
    };

    this.getMapTooltipStatusTime = function() {
      return map_tooltip_status_time;
    };

    this.getMapTooltipStatusColor = function() {
      return map_tooltip_status_color;
    };

    this.getMapTooltipCategory = function() {
      return map_tooltip_category;
    };

    this.getMapTooltipCategoryIcon = function() {
      return map_tooltip_category_icon;
    };

    this.getMapTooltipAddress = function() {
      return map_tooltip_address;
    };

    this.getMapTooltipAddressIcon = function() {
      return map_tooltip_address_icon;
    };

    this.getMapTooltipGeozonesList = function() {
      return map_element_tooltip.all(by.css('div[ng-repeat="geozone in geozones"]'));
    };

    this.getMapTooltipTemperatureIcon = function() {
      return map_tooltip_temperature_icon;
    };

    this.getMapTooltipTemperatureNumber = function() {
      return map_tooltip_temperature_number;
    };

    this.getMapTooltipTemperatureDescription = function() {
      return map_tooltip_temperature_description;
    };

    this.getMapTooltipUnknownTemperatureIcon = function() {
      return map_element_tooltip.element(by.css('temperature-tags-field span.iconic-md.tags-unknown'));
    };

    this.getMapTooltipUnknownTemperature = function() {
      return map_element_tooltip.element(by.css('temperature-tags-field div.small-10.unknown.ng-binding'));
    };

    this.getMapTooltipOpenNotificationsBell = function() {
      return map_element_tooltip.element(by.css('open-notifications span.fi-bell.iconic-md'));
    };

    this.getMapTooltipOpenNotificationsAlert = function() {
      return map_element_tooltip.element(by.css('open-notifications span.alert-notifications.ng-binding'));
    };

    this.getMapTooltipOpenNotificationsWarning = function() {
      return map_element_tooltip.element(by.css('open-notifications span.warning-notifications.ng-binding'));
    };

    this.getMapTooltipOpenNotificationsNoti = function() {
      return map_element_tooltip.element(by.css('open-notifications span.notification-notifications.ng-binding'));
    };

    this.getMapTooltipOpenNotificationsCrossBell = function() {
      return map_element_tooltip.element(by.css('open-notifications span.icon-bell-cross'));
    };

    this.getMapTooltipOpenNotificationsEyes = function() {
      return map_element_tooltip.element(by.css('open-notifications span.fi-eye-open.iconic-md'));
    };

    this.getMapTooltipEquipmentsList = function() {
      return map_element_tooltip.all(by.css('equipments div[ng-repeat="equipment in equipments"]'));
    };

    this.getMapTooltipLastMessageIcon = function() {
      return map_tooltip_last_message_icon;
    };

    this.getMapTooltipLastMessage = function() {
      return map_tooltip_last_message;
    };

    this.getMapTooltipSpeedIcon = function() {
      return map_element_tooltip.element(by.css('div.small-12.tooltip-speed span.iconic-md'));
    };

    this.getMapTooltipSpeed = function() {
      return map_element_tooltip.element(by.css('div.small-12.tooltip-speed div.small-10.ng-binding'));
    };

    this.getMapTooltipLastSeen = function() {
      return map_tooltip_last_seen;
    };

    this.getMapTooltipShowDetals = function() {
      return map_tooltip_show_details_btn;
    };

    this.getMapTooltipRoutingFrom = function() {
      return map_tooltip_routing_from_btn;
    };

    this.getMapTooltipRoutingTo = function() {
      return map_tooltip_routing_to_btn;
    };

    this.getMapTooltipShareBtn = function() {
      return map_tooltip_share_btn;
    };

    this.getMapTooltipHistoryBtn = function() {
      return map_tooltip_history_btn;
    };

    this.getMapTooltipDriverIcon = function() {
      return map_tooltip_driver_icon;
    };

    this.getMapTooltipDriver = function() {
      return map_tooltip_driver;
    };

    this.getMapTooltipInfoExpandList = function() {
      return map_tooltip_info_expand_list;
    };

    this.getGeozoneClusterList = function(n) {
      return element(by.css('.map div.lf-clusterer.lf-geozone-clusterer:nth-of-type(' + n + ')'));
    };

    this.getGeozoneCluster = function() {
      return geozone_cluster;
    };

    this.getPopupTitle = function() {
      return element_header.element(by.css('.tooltip-title.cluster span.ng-binding'));
    };

    this.getNameElementOnPopup = function() {
      return element_header.element(by.css('div.small-12:not(.tooltip-title):nth-of-type(1) span.ng-binding'));
    };

    this.getPopupTitleColor = function() {
      return element_header.element(by.css('.tooltip-title'));
    };

    this.getElementListRow = function(n) {
      return element(by.css('.map .map-element-tooltip map-element-info cluster-elements .cluster-elements > div.row.ng-scope:nth-of-type(' + n + ')'));
    };

    this.getGeozoneIcon = function() {
      return geozone_icon;
    };

    this.getElementList = function() {
      return element_list;
    };

    this.getCloseButton = function() {
      return close_button;
    };

    this.getDivTransform = function() {
      return div_stranform;
    };

    this.getTrackingObjectClusterList = function() {
      return tracking_object_cluster_list;
    };

    this.getOverlayMapTooltip = function() {
      return overlay_map_tooltip;
    };

    this.getOverlayMapName = function() {
      return overlay_map_name;
    };

    this.getOverlayMapStatus = function() {
      return overlay_map_status;
    };

    this.getOverlayMapStatusTime = function() {
      return overlay_map_status_time;
    };

    this.getOverlayMapCategoryIcon = function() {
      return overlay_map_category_icon;
    };

    this.getOverlayMapCategory = function() {
      return overlay_map_category;
    };

    this.getOverlayMapAddress = function() {
      return overlay_map_address;
    };

    this.getOverlayMapAddressIcon = function() {
      return overlay_map_address_icon;
    };

    this.getOverlayMapLastSeen = function() {
      return overlay_map_last_seen;
    };

    this.getOverlayMapShowDetailsBtn = function() {
      return overlay_map_show_details_btn;
    };

    this.getOverlayMapLastMessage = function() {
      return overlay_map_last_message;
    };

    this.getOverlayMapLastMessageIcon = function() {
      return overlay_map_last_message_icon;
    };

    this.getOverlayMapDriver = function() {
      return overlay_map_driver;
    };

    this.getOverlayMapDriverIcon = function() {
      return overlay_map_driver_icon;
    };

    this.getOverlayMapExpandList = function() {
      return overlay_map_info_expand_list;
    };

    this.getOverlayMapGeozonesList = function() {
      return overlay_map_tooltip.all(by.css('div[ng-repeat="geozone in geozones"]'));
    };

    this.getOverlayMapSpeed = function() {
      return overlay_map_tooltip.element(by.css('.tooltip-speed div.ng-binding.small-10'));
    };

    this.getOverlayMapSpeedIcon = function() {
      return overlay_map_tooltip.element(by.css('.tooltip-speed div.small-2 span.iconic-md'));
    };

    this.getOverlayMapEquipments = function() {
      return overlay_map_tooltip.all(by.css('div[ng-repeat="equipment in equipments"]'));
    };

    this.getOverlayMapTemperatureIcon = function() {
      return overlay_map_temperature_icon;
    };

    this.getOverlayMapUnknownTemperatureIcon = function() {
      return overlay_map_unknown_temperature_icon;
    };

    this.getOverlayMapUnknownTemperatureDescription = function() {
      return overlay_map_unknown_temperature_description;
    };

    this.getOverlayMapNoSignalTemparature = function() {
      return overlay_map_nosignal_temperature;
    };

    this.getOverlayMapTemperatureNumber = function() {
      return overlay_map_temperature_number;
    };

    this.getOverlayMapTemperatureTime = function() {
      return overlay_map_temperature_time;
    };

    this.getOverlayMapCloseBtn = function() {
      return overlay_map_close_btn;
    };

    this.clickOverlayMapCloseBtn = function() {
      browser.executeScript("arguments[0].click();", overlay_map_close_btn.getWebElement());
    };

    this.clickGeozoneCluster = function() {
      browser.executeScript("arguments[0].click();", element(by.css('.map div.lf-clusterer.lf-geozone-clusterer:nth-of-type(2)')).getWebElement());
    };

    this.clickClosePopup = function() {
      browser.executeScript("arguments[0].click();", close_map_element_tooltip_button.getWebElement());
    };

    this.clickElementListRow = function(n) {
      browser.executeScript("arguments[0].click();", this.getElementListRow(n).getWebElement());
    };

    this.clickMapTooltipShowDetails = function() {
      browser.executeScript("arguments[0].click();", map_tooltip_show_details_btn.getWebElement());
    };

    this.clickOverlayMapShowDetailsBtn = function() {
      browser.executeScript("arguments[0].click();", overlay_map_show_details_btn.getWebElement());
    };

    this.getShowClusterMenuButton = function() {
      return show_cluster_menu_button;
    };

    this.getClusterVehicleButton = function() {
      return vehicle_cluster_button;
    };

    this.getMachineClusterButton = function() {
      return machine_cluster_button;
    };

    this.getStandaloneClusterButton = function() {
      return standalone_cluster_button;
    };

    this.getWorkerClusterButton = function() {
      return worker_cluster_button;
    };

    this.getMobileassetClusterButton = function() {
      return mobileasset_cluster_button;
    };

    this.getGeozoneClusterButton = function() {
      return geozone_cluster_button;
    };

    this.getGeozoneLabel = function() {
      return geozone_label;
    };

    this.getGeozoneClusterCircle = function() {
      return geozone_cluster_circle;
    };

    this.getShowGeozoneLabelButton = function() {
      return show_geozones_label_button;
    };

    this.getShowLegendButton = function() {
      return show_legend_button;
    };

    this.clickVehicleClusterButton = function() {
      browser.executeScript("arguments[0].click();", vehicle_cluster_button.getWebElement());
    };

    this.clickMachineClusterButton = function() {
      browser.executeScript("arguments[0].click();", machine_cluster_button.getWebElement());
    };

    this.clickStandaloneClusterButton = function() {
      browser.executeScript("arguments[0].click();", standalone_cluster_button.getWebElement());
    };

    this.clickWorkerClusterButton = function() {
      browser.executeScript("arguments[0].click();", worker_cluster_button.getWebElement());
    };

    this.clickMobileassetClusterButton = function() {
      browser.executeScript("arguments[0].click();", mobileasset_cluster_button.getWebElement());
    };

    this.clickGeozoneClusterButton = function() {
      browser.executeScript("arguments[0].click();", geozone_cluster_button.getWebElement());
    };

    this.clickShowClusterMenuButton = function() {
      browser.executeScript("arguments[0].click();", show_cluster_menu_button.getWebElement());
    };

    this.clickShowGeozoneLabelButton = function() {
      browser.executeScript("arguments[0].click();", show_geozones_label_button.getWebElement());
    };

    this.clickZoomInButton = function() {
      browser.executeScript("arguments[0].click();", zoom_in_button.getWebElement());
    };

    this.clickZoomOutButton = function() {
      browser.executeScript("arguments[0].click();", zoom_out_button.getWebElement());
    };

    this.clickShowLegendButton = function() {
      browser.executeScript("arguments[0].click();", show_legend_button.getWebElement());
    };
  };
  module.exports = new MainMapPage();
})();
