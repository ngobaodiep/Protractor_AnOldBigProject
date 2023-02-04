/*jshint -W033 */
(function() {
  'use strict';
var fs = require('fs'),
testUtils = require('./TestUtils'),
glob = require("glob");
  var ExportPage = function() {
    var pageObj ;
    var loading_mask = element(by.css('.lf-loader-overlay'));
    var pathFolder = process.cwd() + "/resources/test/export_file",
      extention="",
      fileName="",
      files,
      filesArray;

    this.export = function(_extention,elm) {
      var _elm = elm();
      try {
        if (_extention.localeCompare('excel') == 0) {
          extention = 'xlsx';
        } else {
          extention = 'pdf';
        }
        files = fs.readdirSync(pathFolder);
        for (var i = 0; i < files.length; i++) {
          if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
            fs.unlinkSync(pathFolder + "/" + files[i]);
          }
        }

        browser.wait(testUtils.until.elementToBeClickable(_elm));
        browser.executeScript("arguments[0].click();",elm() );
        browser.driver.wait(function() {
          filesArray = glob.sync(pathFolder + "/*." + extention);
          if ((typeof filesArray != 'undefined') && (filesArray.length > 0)) {
            return filesArray;
          }
        }).then(function(arr) {
          fileName = arr[0];
          return fileName;
        });
        browser.wait(testUtils.until.stalenessOf(this.getLoadingMask()),5000,"ab");
      } catch (e) {
        console.log(e);
        return;
      }
    };

    this.getLoadingMask = function(){
      return loading_mask;
    };

    this.getExportedFileName = function() {
      return fileName;
    };

    this.getStr = function(str){
      return str[0].toLowerCase()+str.subString(1);
    };
  };
  module.exports = new ExportPage();
})();
