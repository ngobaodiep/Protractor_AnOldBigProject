(function() {
  var testUtils = require('../../TestUtils'),
    mainPage = require('../../MainPage'),
    settingsAccountPage = require('../../pages/setting/SettingsAccountPage');

  describe('on settings account', function() {
    beforeAll(function() {
      browser.wait(testUtils.until.presenceOf(mainPage.getSettingsTab()));
      mainPage.clickSettingsTab();
      browser.wait(testUtils.until.presenceOf(settingsAccountPage.getSettingsAccount()));
      browser.wait(testUtils.until.presenceOf(settingsAccountPage.getGeneralSelectedCountry()));
    });

    describe('on account general tab', function() {
      it('should have a name field', function() {
        expect(settingsAccountPage.getGeneralNameInput().isPresent()).toBe(true);
        expect(settingsAccountPage.getGeneralNameInput().isDisplayed()).toBe(true);
      });

      it('should have a select logo button', function() {
        expect(settingsAccountPage.getGeneralUploadButton().isPresent()).toBe(true);
      });

      it('should have an address1 field', function() {
        expect(settingsAccountPage.getGeneralAddress1Input().isPresent()).toBe(true);
        expect(settingsAccountPage.getGeneralAddress1Input().isDisplayed()).toBe(true);
      });

      it('should have an address2 field', function() {
        expect(settingsAccountPage.getGeneralAddress2Input().isPresent()).toBe(true);
        expect(settingsAccountPage.getGeneralAddress2Input().isDisplayed()).toBe(true);
      });

      it('should have a zip code field', function() {
        expect(settingsAccountPage.getGeneralZipcodeInput().isDisplayed()).toBe(true);
        expect(settingsAccountPage.getGeneralZipcodeInput().isPresent()).toBe(true);
      });

      it('should have selected country field', function() {
        expect(settingsAccountPage.getGeneralSelectedCountry().isPresent()).toBe(true);
        expect(settingsAccountPage.getGeneralSelectedCountry().isDisplayed()).toBe(true);
      });
    });

    describe('in settings tab', function() {
      beforeAll(function() {
        settingsAccountPage.clickAccountSettingsTab();
        browser.wait(testUtils.until.presenceOf(settingsAccountPage.getLanguage()));
      });

      describe('check', function() {
        it('should have elements', function() {
          expect(settingsAccountPage.getTimezone().isPresent()).toBe(true);
          expect(settingsAccountPage.getLanguage().isPresent()).toBe(true);
          expect(settingsAccountPage.getDateTimeFormat().isPresent()).toBe(true);
          expect(settingsAccountPage.getStartWeek().isPresent()).toBe(true);

          expect(settingsAccountPage.getTimezone().isDisplayed()).toBe(true);
          expect(settingsAccountPage.getLanguage().isDisplayed()).toBe(true);
          expect(settingsAccountPage.getDateTimeFormat().isDisplayed()).toBe(true);
          expect(settingsAccountPage.getStartWeek().isDisplayed()).toBe(true);
        });
      });
      describe('when english US language selected', function() {
        beforeAll(function() {
          settingsAccountPage.selectLangugeEnglishUS();
          browser.wait(testUtils.until.presenceOf(settingsAccountPage.getWarningInfoModal()));
          settingsAccountPage.clickWarningOkButton();
          browser.wait(testUtils.until.stalenessOf(settingsAccountPage.getWarningInfoModal()));
        });

        it('all parameters should be changed', function() {
          expect(settingsAccountPage.getTimezone().all(by.css('select option')).last().getAttribute('innerText')).toBe(settingsAccountPage.arrUS(0));
          expect(settingsAccountPage.getStartWeek().element(by.css('span.k-dropdown-wrap span.k-input')).getAttribute('innerText')).toBe(settingsAccountPage.arrUS(2));
          expect(settingsAccountPage.getDateTimeFormat().getAttribute('innerText')).toBe(settingsAccountPage.arrUS(10));
        });
      });

      describe('when english UK language selected', function() {
        beforeAll(function() {
          settingsAccountPage.selectLangugeEnglishUK();
        });

        it('all parameters should be changed', function() {
          expect(settingsAccountPage.getTimezone().all(by.css('select option')).last().getAttribute('innerText')).toBe(settingsAccountPage.arrUK(0));
          expect(settingsAccountPage.getStartWeek().element(by.css('span.k-dropdown-wrap span.k-input')).getAttribute('innerText')).toBe(settingsAccountPage.arrUK(2));
          expect(settingsAccountPage.getDateTimeFormat().getAttribute('innerText')).toBe(settingsAccountPage.arrUK(10));
        });
      });

      describe('when french france language selected', function() {
        beforeAll(function() {
          settingsAccountPage.selectLangugeFrenchFrance();
          browser.wait(testUtils.until.presenceOf(settingsAccountPage.getWarningInfoModal()));
          settingsAccountPage.clickWarningOkButton();
          browser.wait(testUtils.until.stalenessOf(settingsAccountPage.getWarningInfoModal()));
        });

        it('all parameters should be changed', function() {
          expect(settingsAccountPage.getTimezone().all(by.css('select option')).last().getAttribute('innerText')).toBe(settingsAccountPage.arrFF(0));
          expect(settingsAccountPage.getStartWeek().element(by.css('span.k-dropdown-wrap span.k-input')).getAttribute('innerText')).toBe(settingsAccountPage.arrFF(2));
          expect(settingsAccountPage.getDateTimeFormat().getAttribute('innerText')).toBe(settingsAccountPage.arrFF(10));
        });
      });

      describe('when french switzerland language selected', function() {
        beforeAll(function() {
          settingsAccountPage.selectLangugeFrenchSwitzland();
        });

        it('all parameters should be changed', function() {
          expect(settingsAccountPage.getTimezone().all(by.css('select option')).last().getAttribute('innerText')).toBe(settingsAccountPage.arrFS(0));
          expect(settingsAccountPage.getStartWeek().element(by.css('span.k-dropdown-wrap span.k-input')).getAttribute('innerText')).toBe(settingsAccountPage.arrFS(2));
          expect(settingsAccountPage.getDateTimeFormat().getAttribute('innerText')).toBe(settingsAccountPage.arrFS(10));
        });
      });

      describe('when german switzerland language selected', function() {
        beforeAll(function() {
          settingsAccountPage.selectLangugeGermanSwitzland();
        });

        it('all parameters should be changed', function() {
          expect(settingsAccountPage.getTimezone().all(by.css('select option')).last().getAttribute('innerText')).toBe(settingsAccountPage.arrGS(0));
          expect(settingsAccountPage.getStartWeek().element(by.css('span.k-dropdown-wrap span.k-input')).getAttribute('innerText')).toBe(settingsAccountPage.arrGS(2));
          expect(settingsAccountPage.getDateTimeFormat().getAttribute('innerText')).toBe(settingsAccountPage.arrGS(10));
        });
      });

      describe('when german germany language selected', function() {
        beforeAll(function() {
          settingsAccountPage.selectLangugeGermanGermany();
        });
        it('all parameters should be changed', function() {
          expect(settingsAccountPage.getTimezone().all(by.css('select option')).last().getAttribute('innerText')).toBe(settingsAccountPage.arrGG(0));
          expect(settingsAccountPage.getStartWeek().element(by.css('span.k-dropdown-wrap span.k-input')).getAttribute('innerText')).toBe(settingsAccountPage.arrGG(2));
          expect(settingsAccountPage.getDateTimeFormat().getAttribute('innerText')).toBe(settingsAccountPage.arrGG(10));
        });
      });
    });

    describe('check account advanced communication tab', function() {
      beforeAll(function() {
        settingsAccountPage.clickAdvancedCommunicationTab();
      });

      it('should have a monitor tracked vehicles switcher', function() {
        expect(settingsAccountPage.getMonitorTracked().isPresent()).toBeTruthy();
        expect(settingsAccountPage.getMonitorTracked().isDisplayed()).toBeTruthy();
      });

      it('should have a reset button', function() {
        expect(settingsAccountPage.getResetButton().isPresent()).toBeTruthy();
        expect(settingsAccountPage.getResetButton().isDisplayed()).toBeTruthy();
      });

      it('should have a save button', function() {
        expect(settingsAccountPage.getSaveButton().isPresent()).toBeTruthy();
        expect(settingsAccountPage.getSaveButton().isDisplayed()).toBeTruthy();
      });
    });
  });
})();
