/*
    Shared functions and values
    using Page objects in a single, easy way (if needed, we will use proper Page Objects)
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  "use strict";

  var TestUtils = function() {
    var nameInput = element(by.model("yourName"));
    var greeting = element(by.binding("yourName"));

    this.waitUrl = function(myUrl) {
      return function() {
        return browser.getCurrentUrl().then(function(url) {
          return myUrl.test(url);
        });
      };
    };

    this.clearString = function(elem, length) {
      length = length || 25;
      var backspaceSeries = "";
      backspaceSeries = Array(length).join(protractor.Key.BACK_SPACE);
      elem.sendKeys(backspaceSeries);
      // deleteSeries = Array(length).join(protractor.Key.DELETE);
      // elem.sendKeys(deleteSeries);
    };

    this.clearString = function(elem) {
      elem.getAttribute("value").then(function(text) {
        var len = text.length || 25;
        var backspaceSeries = Array(len + 1).join(protractor.Key.BACK_SPACE);
        elem.sendKeys(backspaceSeries);
      });
    };

    this.getFullDayString = function(last_friday) {
      return (
        (last_friday.getUTCDate() < 10 ? "0" + last_friday.getUTCDate() :
          last_friday.getUTCDate()) +
        "/" +
        (last_friday.getUTCMonth() < 9 ? "0" + (last_friday.getUTCMonth() + 1) :
          last_friday.getUTCMonth() + 1) +
        "/" +
        last_friday.getUTCFullYear()
      );
    };

    this.getFullDayString2 = function(last_friday) {
      return (
        (last_friday.getUTCMonth() < 9 ?
          "0" + (last_friday.getUTCMonth() + 1) :
          last_friday.getUTCMonth() + 1) +
        "/" + (last_friday.getUTCDate() < 10 ?
          "0" + last_friday.getUTCDate() :
          last_friday.getUTCDate()) +
        "/" +
        last_friday.getUTCFullYear()
      );
    };

    this.getFullDayString3 = function(last_friday) {
      return (
        last_friday.getUTCMonth() +
        1 +
        "/" +
        last_friday.getUTCDate() +
        "/" +
        last_friday.getUTCFullYear().toString().slice(-2)
      );
    };

    this.getNumberArrayFromString = function(string) {
      return string.match(/\d+/g).map(Number);
    };

    this.timestrToSec = function(timestr) {
      //hh:mm:ss
      var parts = timestr.split(":");
      return (parts[0] * 3600) +
        (parts[1] * 60) +
        (+parts[2]);
    };

    this.timestrToSec2 = function(timestr) {
      //hh:mm
      var parts = timestr.split(":");
      return (parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60);
    };

    this.pad = function(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return "" + num;
      }
    };

    this.formatTime = function(seconds) {
      /*
      time1 = "02:32:12";
      time2 = "12:42:12";
      formatTime(timestrToSec(time1) + timestrToSec(time2));
      // => "15:14:24"
      */
      return [this.pad(Math.floor(seconds / 3600)),
        this.pad(Math.floor(seconds / 60) % 60),
        this.pad(seconds % 60),
      ].join(":");
    };

    this.formatTimeMinutes = function(seconds) {
      /*
      time1 = "02:32:12";
      time2 = "12:42:12";
      formatTime(timestrToSec(time1) + timestrToSec(time2));
      // => "15:14"
      */
      return [this.pad(Math.floor(seconds / 3600)),
        this.pad(Math.floor(seconds / 60) % 60),
      ].join(":");
    };

    this.until = protractor.ExpectedConditions;
  };
  module.exports = new TestUtils();
})();
