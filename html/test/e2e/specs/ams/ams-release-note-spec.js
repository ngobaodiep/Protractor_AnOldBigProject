(function() {
  'use strict';
  var testUtils = require('../TestUtils'),
    amsReleaseNoteViewPage = require('./AMSReleaseNoteViewPage'),
    amsMainPage = require('./AMSMainPage');

  describe("on release note view", function() {
    var random_number = new Date().getTime();
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(amsMainPage.getReleaseNoteViewTab()));
      amsMainPage.clickReleaseNoteViewTab();
      browser.wait(testUtils.until.presenceOf(amsReleaseNoteViewPage.getCreateReleaseNoteBtn()));
    });

    describe("check elements", function() {
      it("should have create button", function() {
        expect(amsReleaseNoteViewPage.getCreateReleaseNoteBtn().isPresent()).toBe(true);
      });
    });

    describe("when new release note is created", function() {
      beforeAll(function() {
        amsReleaseNoteViewPage.clickCreateReleaseNoteBtn();
        browser.wait(testUtils.until.presenceOf(amsReleaseNoteViewPage.getCreationForm()));
        amsReleaseNoteViewPage.fillReleaseNoteName("test release note");
        amsReleaseNoteViewPage.fillReleaseNoteVersion("" + random_number);
        amsReleaseNoteViewPage.fillIframeText("created test release note");
        amsReleaseNoteViewPage.clickSaveBtn();
        browser.wait(testUtils.until.stalenessOf(amsReleaseNoteViewPage.getCreateModal()));
        amsReleaseNoteViewPage.fillSearchNameInput("test release note");
        amsReleaseNoteViewPage.fillSearchVersionInput(random_number);
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.release-note-list .k-grid-content tr:nth-of-type(1) td:nth-of-type(2) span', '' + random_number))));
      });

      it("should have release note name", function() {
        expect(amsReleaseNoteViewPage.getGridRow(1).element(by.css('td:nth-of-type(1) span')).getText()).toBe("test release note");
      });

      it("should have release note version", function() {
        expect(amsReleaseNoteViewPage.getGridRow(1).element(by.css('td:nth-of-type(2) span')).getText()).toBe("" + random_number);
      });
    });

    describe("when release note is edited", function() {
      beforeAll(function() {
        browser.executeScript("arguments[0].click();", amsReleaseNoteViewPage.getGridRow(1).element(by.css('a.fi-pencil')).getWebElement());
        browser.wait(testUtils.until.presenceOf(amsReleaseNoteViewPage.getCreateModal()));
        amsReleaseNoteViewPage.fillReleaseNoteName("edited release note");
        amsReleaseNoteViewPage.fillIframeText("edited release note");
        amsReleaseNoteViewPage.clickSaveBtn();
        amsReleaseNoteViewPage.clickCloseSearchColumn(1);
        amsReleaseNoteViewPage.clickCloseSearchColumn(2);
        browser.wait(testUtils.until.stalenessOf(amsReleaseNoteViewPage.getCreateModal()));
        amsReleaseNoteViewPage.fillSearchNameInput("edited release note");
        amsReleaseNoteViewPage.fillSearchVersionInput("" + random_number);
        browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.release-note-list .k-grid-content tr:nth-of-type(1) td:nth-of-type(2) span', '' + random_number))));
      });

      it("should have edited release note name", function() {
        expect(amsReleaseNoteViewPage.getGridRow(1).element(by.css('td:nth-of-type(1) span')).getText()).toBe("edited release note");
      });

      it("should have edited release note version", function() {
        expect(amsReleaseNoteViewPage.getGridRow(1).element(by.css('td:nth-of-type(2) span')).getText()).toBe("" + random_number);
      });
    });

    describe("when eye button is clicked", function() {
      beforeAll(function() {
        browser.executeScript("arguments[0].click();", amsReleaseNoteViewPage.getGridRow(1).element(by.css('a.icon-file-eye')).getWebElement());
        browser.wait(testUtils.until.presenceOf(amsReleaseNoteViewPage.getOkBtn()));
      });

      it("should have ok button", function() {
        expect(amsReleaseNoteViewPage.getOkBtn().isPresent()).toBe(true);
      });

      it("should show release note name & version preview", function() {
        expect(amsReleaseNoteViewPage.getPreviewNameVersion().getText()).toBe("edited release note   " + random_number);
      });

      it("should have like button", function() {
        expect(amsReleaseNoteViewPage.getLikeBtn().isPresent()).toBe(true);
      });

      it("should have dislike button", function() {
        expect(amsReleaseNoteViewPage.getDislikeBtn().isPresent()).toBe(true);
      });
    });

    describe("when release note is deleted", function() {
      beforeAll(function() {
        amsReleaseNoteViewPage.clickCancelPreviewBtn();
        browser.wait(testUtils.until.stalenessOf(element(by.css('.preview-modal'))));
        browser.executeScript("arguments[0].click();", amsReleaseNoteViewPage.getGridRow(1).element(by.css('a.fi-trash')).getWebElement());
        browser.wait(testUtils.until.presenceOf(amsReleaseNoteViewPage.getWarnModal()));
        amsReleaseNoteViewPage.clickWarnDeleteBtn();
        browser.wait(testUtils.until.stalenessOf(amsReleaseNoteViewPage.getWarnModal()));
        browser.wait(testUtils.until.stalenessOf(amsReleaseNoteViewPage.getGridRow(1)));
      });

      it("check after deleting", function() {
        expect(amsReleaseNoteViewPage.getGridRow(1).isPresent()).toBe(false);
      });
    });
  });

})();
