(function(){
  'use strict';

  var WarnModal = function(){
  var warnModal = element(by.css('.warn-modal')),
  warnModalTitle = element(by.css('.modal-title')),
  warnModalConfirmation = element(by.css('.modal-confirmation')),
  warnModalMessage = element(by.css('.modal-warning')),
  warnModalCrossBtn = warnModal.element(by.css("a[ng-click=\"cancel()\"]")),
  warnModalCancel = warnModal.element(by.className('desktop-secondary-action-button')),
  warnModalConfirmButton = warnModal.element(by.css('.desktop-action-button'));

this.getWarnModal = function(){
  return warnModal;
};

this.getWarnModalCrossBtn = function () {
  return warnModalCrossBtn;
};

this.getWarnModalTitle = function(){
  return warnModalTitle.element(by.css('span'));
};

this.getWarnModalConfirmation = function(){
  return warnModalConfirmation.element(by.css('span'));
};

this.getWarnModalMessage = function(){
  return warnModalMessage.element(by.css('span'));
};

this.getWarnModalConfirmBtn = function(){
  return warnModalConfirmButton;
};

this.getWarnModalCancelBtn = function(){
  return warnModalCancel;
};

this.clickWarnModalConfirmBtn = function() {
  warnModalConfirmButton.click();
};
  };

  module.exports = new WarnModal();
})();
