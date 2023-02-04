(function () {
  'use strict';

  var ReportTemperaturePage = function () {
    var reportWeekRow = element(by.css(".report-week-row")),

    lastReportDayRow = reportWeekRow.all(by.css(".report-day-row")).last();

    this.getReportWeekRow = function () {
      return reportWeekRow;
    };

    this.getLastReportDayRow = function () {
      return lastReportDayRow;
    };

    this.getLastDataRowOfLastDayRow = function () {
      return lastReportDayRow.all(by.css(".report-data-row")).last();
    };

    this.getAllDataRowOfLastDayRow = function () {
      return lastReportDayRow.all(by.css(".report-data-row"));
    };
  };

  module.exports = new ReportTemperaturePage();
})();
