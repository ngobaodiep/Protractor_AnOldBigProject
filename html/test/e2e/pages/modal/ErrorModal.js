/*
    ErrorModal page object for e2e tests
    https://github.com/angular/protractor/blob/master/docs/page-objects.md
*/
(function() {
  'use strict';
  var ErrorModal = function() {
    var errorModal = element(by.css(".error-modal")),
      errorModalTitle = errorModal.element(by.css('.modal-title')),
      errorModalMessage = errorModal.element(by.css('.modal-error')),
      errorModalCrossButton = errorModal.element(by.css('a[ng-click="confirm()"]')),
      errorModalConfirmBtn = errorModal.element(by.css('button[ng-click="confirm()"]'));

    this.getErrorModal = function() {
      return errorModal;
    };

    this.getErrorModalConfirmButton = function() {
      return errorModalConfirmBtn;
    };

    this.getErrorModalCrossButton = function() {
      return errorModalCrossButton;
    };

    this.getErrorModalMessage = function() {
      return errorModalMessage;
    };

    this.getErrorModalTitle = function() {
      return errorModalTitle;
    };
  };

  module.exports = new ErrorModal();
})();
