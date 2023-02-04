/*
    SettingsRolePage page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';
  var SettingsRolePage = function() {
  var  roles_list = element(by.css('.settings-view .panel .roles-list')),
      column_name_list = roles_list.all(by.css('.k-grid-header thead[role="rowgroup"] tr:nth-of-type(1) th a')),
      content_rows = roles_list.all(by.css('.k-grid-content tbody[role="rowgroup"] tr'));

      this.getColumnName = function(){
        return column_name_list.get(0);
      };

      this.getColumnGroups = function(){
        return column_name_list.get(1);
      };

      this.getColumnVehicles = function(){
        return column_name_list.get(2);
      };

      this.getColumnGeozones = function(){
        return column_name_list.get(3);
      };

      this.getColumnBussinessRules = function(){
        return column_name_list.get(4);
      };

      this.getColumnUsers = function(){
        return column_name_list.get(5);
      };

      this.getColumnSettingsModule = function(){
        return column_name_list.get(6);
      };

      this.getColumnTrackingModule = function(){
        return column_name_list.get(7);
      };

      this.getColumnReportsModule = function(){
        return column_name_list.get(8);
      };

      this.getColumnHistoryModule = function(){
        return column_name_list.get(9);
      };

      this.getGridRow = function(n){
        return content_rows.get((n-1));
      };
  };
  module.exports = new SettingsRolePage();
})();
