(function () {
  "use strict";
  var CheckMailPage = function () {
    var logInModal = element(by.className("login-modal")),
      loginForm = element(by.tagName("form")),
      emailInput = loginForm.element(by.id("loginUsernameBox")),
      passwordInput = loginForm.element(by.id("loginPasswordBox")),
      loginButton = loginForm.element(by.css('[type="submit"]')),
      mailContainer = element(by.css("#mail-section-controller")),
      mailOverview = mailContainer.element(by.css("#mailOverview")),
      searchTextBox = mailOverview.element(by.css("#searchBoxText")),
      mailPanelGrid = element(by.css("#MailPanelGrid")),
      mailList = mailPanelGrid.all(by.css(".panel-grid-list .panel-item")),
      messageSubject = element(by.css(".message-subject")),
      messageHeaderTimeline = element(by.css("#messageHeaderSecondLine #date")),
      emailAddressFrom = element(
        by.css("#addresses #from .emailUserContainer")
      ),
      emailAddressTo = element(by.css("#addresses #to .emailUserContainer")),
      mailTabs = element(by.css(".mail-message-tabs")),
      messageTab = mailTabs.element(
        by.css(".message-tabs-wrapper div:nth-child(1).mail-tab")
      ),
      attachmentsTab = mailTabs.element(
        by.css(".message-tabs-wrapper div:nth-child(2).mail-tab")
      ),
      messageNotLoaded = element(by.css("#messageNotLoaded")),
      messageBody = element(by.css("#messageBody")),
      filteredMail = element(by.css("div:nth-child(2).panel-item.selected")),
      messageContent = element(by.css("p:nth-child(3).MsoNormal")),
      searchMailButton = element(by.css('button[ng-click="onSearch()"]')),
      avatar = element(by.css('.avatar[ng-click="$mdMenu.open()"]')),
      logoutButton = element(by.css('[ng-click="$ctrl.logout($event)"]')),
      emailAttachments = element(by.css(".emailAttachments"));

    this.getLoginForm = function () {
      return loginForm;
    };

    this.getMessageNotLoaded = function () {
      return messageNotLoaded;
    };

    this.getMessageHeaderTimeLine = function () {
      return messageHeaderTimeline;
    };

    this.getLogoutButton = function () {
      return logoutButton;
    };

    this.getAvatar = function () {
      return avatar;
    };

    this.getFilteredMail = function () {
      return filteredMail;
    };

    this.getSearchMailButton = function () {
      return searchMailButton;
    };

    this.getAttachmentTab = function () {
      return attachmentsTab;
    };

    this.getEmailAttachmentGrid = function (n) {
      return emailAttachments.element(
        by.css("a:nth-child(" + n + ").emailAttachment")
      );
    };

    this.getMessageContent = function () {
      return messageContent;
    };

    this.getEmailTo = function () {
      return emailAddressTo;
    };

    this.getEmailFrom = function () {
      return emailAddressFrom;
    };

    this.getMessageHeaderTitle = function () {
      return element(by.id("subject"));
    };

    this.getMailOverView = function () {
      return mailOverview;
    };

    this.getSearchTextBox = function () {
      return searchTextBox;
    };

    this.getMailList = function () {
      return mailList;
    };

    this.getMailListGrid = function (n) {
      return mailPanelGrid.element(
        by.css("div:nth-child(" + (n + 1) + ").panel-item")
      );
    };

    this.getMessageFirstLineMailListGrid = function (n) {
      return this.getMailListGrid(n).element(by.css(".inboxMessageFirstLine"));
    };

    this.getMessageSubjectMailListGrid = function (n) {
      return this.getMailListGrid(n).element(by.css(".inboxMessageSubject"));
    };

    this.getMessageLastLineMailListGrid = function (n) {
      return this.getMailListGrid(n).element(by.css(".inboxMessageLastLine"));
    };

    this.getMailMessageTimeGrid = function(n){
      return this.getMessageFirstLineMailListGrid(n).element(by.css(".inboxMessageDate"));
    };

    this.getMessageTimeGridMailList = function(){
      return mailPanelGrid.all(by.css(".panel-grid-list .panel-item .inboxMessageDate"));
    };

    this.getEmailInput = function () {
      return emailInput;
    };

    this.getPasswordInput = function () {
      return passwordInput;
    };

    this.getLoginButton = function () {
      return loginButton;
    };

    this.fillEmailInput = function (string) {
      emailInput.click();
      emailInput.clear().sendKeys(string);
    };

    this.fillPasswordInput = function (string) {
      passwordInput.click();
      passwordInput.clear().sendKeys(string);
    };

    this.fillSearchTextBox = function (string) {
      searchTextBox.click();
      searchTextBox.clear().sendKeys(string);
    };
  };
  module.exports = new CheckMailPage();
})();
