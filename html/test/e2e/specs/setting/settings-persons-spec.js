(function() {
  'use strict';
  var testUtils = require('./TestUtils'),
    settingsPersonsPage = require('./SettingsPersonsPage'),
    warnModal = require('./WarnModal'),
    mainSettingsPage = require('./MainSettingsPage');

  describe('on settings persons', function() {
    var random_number;
    beforeAll(function() {
      mainSettingsPage.clickSettingsPersonsButton();
      browser.wait(testUtils.until.presenceOf(mainSettingsPage.getSettingsPersonsView()));
    });

    describe('when an user created', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        settingsPersonsPage.clickCreatePersonButton();
        settingsPersonsPage.createNewUser(random_number);
        browser.wait(testUtils.until.elementToBeClickable(settingsPersonsPage.getSearchLoginInput()));
        settingsPersonsPage.fillSearchLoginInput('user' + random_number);
        browser.wait(testUtils.until.stalenessOf(settingsPersonsPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(settingsPersonsPage.getPersonListRow(1)));
      });

      it('new user should be found on list', function() {
        expect(settingsPersonsPage.getPersonListRow(1).element(by.css('td:nth-child(2) span')).getText()).toBe('user' + random_number);
      });

      it('edit button should be found on list', function() {
        expect(settingsPersonsPage.getEditButtonOfGridRow(1).isPresent()).toBe(true);
      });

      it('delete button should be found on list', function() {
        expect(settingsPersonsPage.getDeleteButtonOfGridRow(1).isPresent()).toBe(true);
      });
    });

    describe('when an user edited', function() {
      beforeAll(function() {
        settingsPersonsPage.clickEditButtonOfGridRow(1);
        settingsPersonsPage.editUser(random_number);
        browser.wait(testUtils.until.elementToBeClickable(settingsPersonsPage.getSearchLoginClearBtn()));
        settingsPersonsPage.clickSearchLoginDeleteBtn();
        settingsPersonsPage.fillSearchLoginInput('editeduser' + random_number);
        browser.wait(testUtils.until.stalenessOf(settingsPersonsPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(settingsPersonsPage.getPersonListRow(1)));
        browser.wait(testUtils.until.presenceOf(settingsPersonsPage.getPersonListRow(1).element(by.cssContainingText("tr td:nth-child(2) span.ng-binding", 'editeduser' + random_number))));
        browser.wait(testUtils.until.visibilityOf(settingsPersonsPage.getPersonListRow(1).element(by.cssContainingText("tr td:nth-child(2) span.ng-binding", 'editeduser' + random_number))));
      });

      it('new user should be found on list', function() {
        expect(settingsPersonsPage.getPersonListRow(1).element(by.css('td:nth-child(2) span')).getText()).toBe('editeduser' + random_number);
      });
    });

    describe('when user deleted', function() {
      beforeAll(function() {
        settingsPersonsPage.clickDeleteButtonOfGridRow(1);
        browser.wait(testUtils.until.presenceOf(warnModal.getWarnModal()));
      });

      describe('on warn modal', function() {
        it('should have warn modal', function() {
          expect(warnModal.getWarnModal().isPresent()).toBe(true);
        });

        it('should have warn confirmation', function() {
          expect(warnModal.getWarnModalConfirmation().isPresent()).toBe(true);
        });

        it('should have warn message', function() {
          expect(warnModal.getWarnModalMessage().isPresent()).toBe(true);
        });

        it('should have warn confirm button', function() {
          expect(warnModal.getWarnModalConfirmBtn().isPresent()).toBe(true);
        });

        it('should have warn cancel button', function() {
          expect(warnModal.getWarnModalCancelBtn().isPresent()).toBe(true);
        });

        it('warn title should have text', function() {
          expect(warnModal.getWarnModalTitle().getText()).toBe("Delete person");
        });

        it('warn confirmation should have text', function() {
          expect(warnModal.getWarnModalConfirmation().getText()).toBe("You are about to delete a person.");
        });

        it('warn message should have text', function() {
          expect(warnModal.getWarnModalMessage().getText()).toBe("Are you sure you want to continue ?");
        });
      });

      describe('when confirm button clicked', function() {
        beforeAll(function() {
          warnModal.clickWarnModalConfirmBtn();
          warnModal.getWarnModalConfirmBtn().isPresent().then(function(isPresent) {
            if (isPresent) {
              warnModal.clickWarnModalConfirmBtn();
            }
          });
          browser.wait(testUtils.until.stalenessOf(settingsPersonsPage.getLoadingMask()));
          browser.wait(testUtils.until.stalenessOf(settingsPersonsPage.getPersonListRow(1)));
        });
        it('user should not be found on list', function() {
          expect(settingsPersonsPage.getPersonListRow(1).isPresent()).toBe(false);
        });
      });
    });

    describe('when new worker created', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        settingsPersonsPage.clickSearchLoginDeleteBtn();
        browser.wait(testUtils.until.presenceOf(settingsPersonsPage.getPersonListRow(1)));
        settingsPersonsPage.clickCreatePersonButton();
        settingsPersonsPage.createNewWorker(random_number);
        browser.wait(testUtils.until.stalenessOf(settingsPersonsPage.getLoadingMask()));
        browser.wait(testUtils.until.visibilityOf(settingsPersonsPage.getSearchNameInput()));
        settingsPersonsPage.fillSearchNameInput('worker ' + random_number);
        browser.wait(testUtils.until.presenceOf(settingsPersonsPage.getPersonListRow(1)));
      });
    
      it('new worker should be found on list', function() {
        expect(settingsPersonsPage.getPersonListRow(1).element(by.css('td:nth-child(3) span')).getText()).toBe('worker ' + random_number);
      });
    
      it('edit button should be found on list', function() {
        expect(settingsPersonsPage.getEditButtonOfGridRow(1).isPresent()).toBe(true);
      });
    
      it('delete button should be found on list', function() {
        expect(settingsPersonsPage.getDeleteButtonOfGridRow(1).isPresent()).toBe(true);
      });
    });
    
    describe('when worker edited', function() {
      beforeAll(function() {
        settingsPersonsPage.clickEditButtonOfGridRow(1);
        settingsPersonsPage.editWorker(random_number);
        settingsPersonsPage.clickSearchNameDeleteBtn();
        settingsPersonsPage.fillSearchNameInput('editedworker ' + random_number);
        browser.wait(testUtils.until.stalenessOf(settingsPersonsPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(settingsPersonsPage.getPersonListRow(1)));
      });
    
      it('new worker should be found on list', function() {
        expect(settingsPersonsPage.getPersonListRow(1).element(by.css('td:nth-child(3) span')).getText()).toBe('editedworker ' + random_number);
      });
    });
    
    describe('when worker deleted', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(settingsPersonsPage.getDeleteButtonOfGridRow(1)));
        browser.executeScript("arguments[0].click();", settingsPersonsPage.getDeleteButtonOfGridRow(1).getWebElement());
        browser.wait(testUtils.until.presenceOf(settingsPersonsPage.getWarnModal()));
        settingsPersonsPage.clickWarningDeleteButton();
        browser.wait(testUtils.until.stalenessOf(settingsPersonsPage.getLoadingMask()));
        browser.wait(testUtils.until.stalenessOf(settingsPersonsPage.getPersonListRow(1)));
      });
    
      it('worker should not be found on list', function() {
        expect(settingsPersonsPage.getPersonListRow(1).isPresent()).toBe(false);
      });
    });
    
    describe('when new driver created', function() {
      beforeAll(function() {
        random_number = new Date().getTime();
        settingsPersonsPage.clickSearchNameDeleteBtn();
        browser.wait(testUtils.until.presenceOf(settingsPersonsPage.getPersonListRow(1)));
        settingsPersonsPage.clickCreatePersonButton();
        settingsPersonsPage.createNewDriver(random_number);
        browser.wait(testUtils.until.stalenessOf(settingsPersonsPage.getLoadingMask()));
        browser.wait(testUtils.until.visibilityOf(settingsPersonsPage.getSearchNameInput()));
        settingsPersonsPage.fillSearchNameInput('driver ' + random_number);
        browser.wait(testUtils.until.presenceOf(settingsPersonsPage.getPersonListRow(1)));
      });
    
      it('new driver should be found on list', function() {
        expect(settingsPersonsPage.getPersonListRow(1).element(by.css('td:nth-child(3) span')).getText()).toBe('driver ' + random_number);
      });
    
      it('edit button should be found on list', function() {
        expect(settingsPersonsPage.getEditButtonOfGridRow(1).isPresent()).toBe(true);
      });
    
      it('delete button should be found on list', function() {
        expect(settingsPersonsPage.getDeleteButtonOfGridRow(1).isPresent()).toBe(true);
      });
    });
    
    describe('when driver deleted', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.presenceOf(settingsPersonsPage.getDeleteButtonOfGridRow(1)));
        browser.executeScript("arguments[0].click();", settingsPersonsPage.getDeleteButtonOfGridRow(1).getWebElement());
        browser.wait(testUtils.until.presenceOf(settingsPersonsPage.getWarnModal()));
        settingsPersonsPage.clickWarningDeleteButton();
        browser.wait(testUtils.until.stalenessOf(settingsPersonsPage.getLoadingMask()));
        browser.wait(testUtils.until.stalenessOf(settingsPersonsPage.getPersonListRow(1)));
      });
    
      it('driver should not be found on list', function() {
        expect(settingsPersonsPage.getPersonListRow(1).isPresent()).toBe(false);
      });
    });

  });
})();
