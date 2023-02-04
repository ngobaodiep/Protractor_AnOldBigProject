(function(){
  'use-strict';

  var SettingsPaymentPage = function(){
      var paymentsList = element(by.className("payments-list")),
      paymentInfo = paymentsList.element(by.className("paymentInfo")),
      paymentCardInfo = paymentsList.element(by.className("payment-info ")),
      paymentInfoHeader = paymentInfo.element(by.className("payment-header")),
      paymentBrand = paymentInfo.element(by.className("paymentBrand")),
      paymentCardNumber = paymentInfo.element(by.className("paymentCardNumber")),
      paymentExpirationDate = paymentInfo.element(by.className("paymentExpirationDate")),
      paymentName = paymentInfo.element(by.className("paymentName")),
      paymentButton = paymentInfo.element(by.className("payment-button")),
      paymentEditButton = paymentButton.element(by.css('[ng-click="editPayment()"]')),
      paymentDeleteButton = paymentButton.element(by.css('[ng-click="deletePayment()"]')),
      invoiceHeader = paymentsList.element(by.className("invoiceHeader")),
      k_grid = paymentsList.element(by.className("k-grid")),
      k_grid_header = k_grid.element(by.className("k-grid-header")),
      k_grid_content = k_grid.element(by.className("k-grid-content")),
      status_search = k_grid_header.element(by.css('tr.k-filter-row th:nth-child(1) .k-textbox')),
      status_search_clear_button = k_grid_header.element(by.css('tr.k-filter-row th:nth-child(1) .k-button')),
      loading_mask = element(by.className('k-loading-mask'));

      this.getStatusSearchFilter = function(){
        return status_search;
      };

      this.getStatusSearchClearBtn = function(){
        return status_search_clear_button;
      };

      this.getPaymentCardInfo = function(){
        return paymentCardInfo;
      };

      this.getInvoiceHeader = function(){
        return invoiceHeader;
      };

      this.getPaymentDeleteButton = function(){
        return paymentDeleteButton;
      };

      this.getPaymentEditButton = function(){
        return paymentEditButton;
      };

      this.getPaymentName = function(){
        return paymentName;
      };

      this.getPaymentExpirationDate = function(){
        return paymentExpirationDate;
      };

      this.getPaymentCardNumber = function(){
        return paymentCardNumber;
      };

      this.getPaymentBrand = function(){
        return paymentBrand;
      };

      this.getPaymentInfoHeader = function(){
        return paymentInfoHeader;
      };

      this.getPaymentList = function(){
        return paymentsList;
      };

      this.getPaymentInfo = function(){
        return paymentInfo;
      };

      this.getPaymentGridRow = function(n){
        return k_grid_content.element(by.css('tbody tr:nth-child('+n+')'));
      };

      this.getPaymentGetPdfGridRow = function(n){
        return k_grid_content.element(by.className("downloadPdf"));
      };

      this.getPaymentEmissionDateGridRow = function(n){
        return this.getPaymentGridRow(n).element(by.css("td:nth-child(5) span"));
      };

      this.getPaymentTotalAmountGridRow = function(n){
        return this.getPaymentGridRow(n).element(by.css("td:nth-child(4)"));
      };

      this.getPaymentDescriptionGridRow = function(n){
        return this.getPaymentGridRow(n).element(by.css("td:nth-child(3) span"));
      };

      this.getPaymentStatusGridRow = function(n){
        return this.getPaymentGridRow(n).element(by.css("td:nth-child(1) span"));
      };

      this.getPaymentInvoiceNumberGridRow = function(n){
        return this.getPaymentGridRow(n).element(by.className("invoiceNumber"));
      };

      this.getLoadingMask = function(){
        return loading_mask;
      };

      this.clickStatusSearchFilter = function(){
        status_search.click();
      };

      this.fillStatusSearch = function(string){
        status_search.clear().sendKeys(string);
      };
  };
  module.exports = new SettingsPaymentPage();
})();
