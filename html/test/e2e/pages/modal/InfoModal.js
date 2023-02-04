(function(){
  'use strict';

  var InfoModal = function(){
  var  infoModal = element(by.className('info-modal')),
  infoModalText = element(by.className('modal-text')),
  infoModalTitle = element(by.className('modal-title')),
  infoModalConfirmBtn = infoModal.element(by.css('button[ng-click="cancel()"]'));

  this.getInfoModal = function(){
    return infoModal;
  };

  this.getInfoModalText = function(){
    return infoModalText.element(by.css('span'));
  };

  this.getInfoModalTitle = function(){
    return infoModalTitle.element(by.css("span"));
  };

  this.getInfoModalConfirmBtn = function(){
    return infoModalConfirmBtn;
  };

  this.clickInfoModalConfirmBtn = function(){
    infoModalConfirmBtn.click();
  };
  };

  module.exports = new InfoModal();
})();
