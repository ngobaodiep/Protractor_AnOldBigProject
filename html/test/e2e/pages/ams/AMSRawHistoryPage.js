(function(){
  'use strict';
  var AMSRawHistoryPage = function(){
    var accountSelector = element(by.css('.raw-history-view .control-panel div:nth-child(1).medium-4 .k-header')),
    deviceSelector = element(by.css('.raw-history-view .control-panel div:nth-child(3).medium-4 .k-header'));

    this.getAccountSelector = function(){
      return accountSelector;
    };

    this.getDeviceSelector = function(){
      return deviceSelector;
    };
  };
  module.exports = new AMSRawHistoryPage();
})();
