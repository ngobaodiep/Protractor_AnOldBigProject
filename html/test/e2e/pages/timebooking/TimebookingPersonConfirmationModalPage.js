(function(){
  'use strict';
  var TimebookingPersonConfirmationModalPage = function(){
    var timebookingPersonConfirmationModal = element(by.className("timebooking-person-confirmation-modal")),
    giveRevokeTimebookingPersonConfirmationModal = timebookingPersonConfirmationModal.element(by.className("give-revoke-timebooking-person-confirmation-modal")),
    contentNotice = giveRevokeTimebookingPersonConfirmationModal.element(by.className("contentNotice")),
    confirmText = contentNotice.element(by.css(".modal-confirmation:not(.ng-hide)")),
    confirmButton = timebookingPersonConfirmationModal.element(by.css("button.desktop-action-button:not(.ng-hide)")),
    cancelButton = timebookingPersonConfirmationModal.element(by.css("button.desktop-secondary-action-button"));

    this.getTimebookingPersonConfirmationModal = function(){
      return timebookingPersonConfirmationModal;
    };

    this.getGiveRevokeTimebookingPersonConfirmationModal = function(){
      return giveRevokeTimebookingPersonConfirmationModal;
    };

    this.getContentNotice = function(){
      return contentNotice;
    };

    this.getConfirmText = function(){
      return confirmText;
    };

    this.getConfirmButton = function(){
      return confirmButton;
    };

    this.getCancelButton = function(){
      return cancelButton;
    };
  };
module.exports = new TimebookingPersonConfirmationModalPage();
})();
