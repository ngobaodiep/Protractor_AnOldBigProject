(function() {
  'use strict';

  var testUtils = require('./TestUtils'),
    fs = require('fs'),
    glob = require("glob"),
    pdfjsLib = require("pdfjs-dist/es5/build/pdf.js"),
    amsDevicesPage = require('./AMSDevicesPage'),
    amsStarterKidPage = require('./AMSStarterKidPage'),
    amsAccountsViewPage = require('./AMSAccountsViewPage'),
    amsMainPage = require('./AMSMainPage'),
    loginPage = require('./LoginPage'),
    mainPage = require('./MainPage');

  var today = new Date(),
    date = today.getUTCFullYear() + '-' +
    ((today.getUTCMonth() < 9) ? ("0" + (today.getUTCMonth() + 1)) : (today.getUTCMonth() + 1)) + '-' +
    (today.getUTCDate() < 10 ? ('0' + today.getUTCDate()) : today.getUTCDate()),
    random_number = new Date().getTime(),
    sk_array = [],
    loadingTask,
    loadPage,
    pdfPath,
    pathFolder,
    filesArray = [],
    files = [],
    imei1 = "359739072527773",
    imei2 = "359739077221927",
    options = {
      lastPage: 1
    },
    pass = "",
    user = "";
  describe('at ams system', function() {
    describe('on account tab', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.presenceOf(amsMainPage.getAccountsTab()));
        browser.wait(testUtils.until.elementToBeClickable(amsMainPage.getAccountsTab()));
        amsMainPage.clickAccountsViewTab();
        //create starterkid
        browser.wait(testUtils.until.elementToBeClickable(amsAccountsViewPage.getCreateStartKidAccountBtn()));
        amsAccountsViewPage.clickCreateStarterKidBtn();
        browser.wait(testUtils.until.presenceOf(amsAccountsViewPage.getCreateModalForm()));
        amsAccountsViewPage.createStarterKid();
        browser.wait(testUtils.until.elementToBeClickable(amsAccountsViewPage.getSaveButton()));
        amsAccountsViewPage.clickSaveButton();
        browser.wait(testUtils.until.stalenessOf(amsAccountsViewPage.getCreateModalForm()));

        date = "2020-06-05";
        browser.wait(testUtils.until.elementToBeClickable(amsAccountsViewPage.getCompanyNameFilter()));
        amsAccountsViewPage.clickCompanyNameFilter();
        amsAccountsViewPage.fillCompanyNameFilter("sk");
        browser.wait(testUtils.until.elementToBeClickable(amsAccountsViewPage.getCreatedDateFilter()));
        amsAccountsViewPage.clickCreatedDateFilter();
        amsAccountsViewPage.fillCreatedDateFilter(date);
        amsAccountsViewPage.fillCreatedDateFilter(protractor.Key.ENTER);
        browser.wait(testUtils.until.stalenessOf(amsAccountsViewPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(amsAccountsViewPage.getAccountsGrid().all(by.css('.k-grid-content tbody tr td:nth-child(1) b'))));
        amsAccountsViewPage.clickCompanyNameHeader();
        browser.wait(testUtils.until.presenceOf(amsAccountsViewPage.getCompanyNameSortAsc()));
        amsAccountsViewPage.clickCompanyNameHeader();
        browser.wait(testUtils.until.presenceOf(amsAccountsViewPage.getCompanyNameSortDesc()));
        browser.wait(testUtils.until.elementToBeClickable(amsAccountsViewPage.getGridRow(9)));
        amsAccountsViewPage.getCompanyNameSortDesc().isPresent().then(function(isPresent) {
          if (isPresent) {
            amsAccountsViewPage.getAccountsGrid().all(by.css('.k-grid-content tbody tr td:nth-child(1) b')).each(function(elm) {
              elm.getText().then(function(txt) {
                sk_array.push(txt);
              });
            });
          }
        });
      });
      it('should have starterkid accounts on grid content', function() {
        expect(sk_array.length).toBeGreaterThan(0);
      });
    });
    describe('when on devices tab ', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(amsMainPage.getDevicesTab()));
        amsMainPage.clickDevicesViewTab();
        browser.wait(testUtils.until.presenceOf(amsDevicesPage.getDevicesList()));
        browser.wait(testUtils.until.elementToBeClickable(amsDevicesPage.getImeiFilter()));
        amsDevicesPage.clickImeiFilter();
        amsDevicesPage.fillImeiFilter(imei1);
        amsDevicesPage.fillImeiFilter(protractor.Key.ENTER);
        browser.wait(testUtils.until.stalenessOf(amsDevicesPage.getLoadingMask()));
        browser.wait(testUtils.until.presenceOf(element(by.css('.k-grid .k-grid-content table tr.ng-scope:nth-child(1)'))));
        browser.wait(testUtils.until.presenceOf(amsDevicesPage.getAllGridRow()));
        browser.wait(function() {
          return amsDevicesPage.getAllGridRow().count().then(function(count) {
            return count == 1;
          });
        });
        browser.wait(testUtils.until.visibilityOf(amsDevicesPage.getGridRow(1).element(by.css('td:nth-child(4)'))));
      });
      it('should have first imei device', function() {
        expect(amsDevicesPage.getGridRow(1).isDisplayed()).toBe(true);
      });
      describe('when first imei linked company', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.stalenessOf(amsDevicesPage.getLoadingMask()));
          browser.wait(testUtils.until.elementToBeClickable(amsDevicesPage.getGridRow(1).element(by.css('td:nth-child(14) a.editDevice'))));
          amsDevicesPage.getGridRow(1).element(by.css('td:nth-child(14) a.editDevice')).click();
          browser.wait(testUtils.until.presenceOf(amsDevicesPage.getDevicesCreationForm()));
          browser.wait(testUtils.until.elementToBeClickable(amsDevicesPage.getLinkedCompany()));
          amsDevicesPage.clickLinkedCompany();
          browser.wait(testUtils.until.presenceOf(amsDevicesPage.getLinkedCompanyFilter()));
          browser.wait(testUtils.until.elementToBeClickable(amsDevicesPage.getLinkedCompanyFilter()));
          amsDevicesPage.clickLinkedCompanyFilter();
          amsDevicesPage.fillLinkedCompanyFilter(sk_array[0]);
          browser.wait(testUtils.until.presenceOf(element.all(by.css('.k-animation-container .k-list-scroller ul[aria-hidden="false"] li'))));
          browser.wait(function() {
            return element.all(by.css('.k-animation-container .k-list-scroller ul[aria-hidden="false"] li')).count().then(function(count) {
              return count == 1;
            });
          },20000,"Can not load linked company name "+sk_array[0]);
          element(by.css('.k-animation-container .k-list-scroller ul[aria-hidden="false"] li:nth-child(1)')).click();
          browser.wait(testUtils.until.stalenessOf(element(by.css('.k-animation-container .k-list-scroller ul[aria-hidden="false"]'))));
          browser.wait(function() {
            return amsDevicesPage.getLinkedCompany().element(by.css('.k-dropdown-wrap .k-input')).getText().then(function(txt) {
              return txt.includes(sk_array[0]) == true;
            });
          });
          amsDevicesPage.clickSaveButton();
          browser.waitForAngular();
          browser.wait(testUtils.until.stalenessOf(amsDevicesPage.getDevicesCreateModal()));
          browser.wait(testUtils.until.stalenessOf(amsDevicesPage.getLoadingMask()));
          browser.wait(testUtils.until.presenceOf(amsDevicesPage.getGridRow(1)));
          browser.wait(testUtils.until.presenceOf(amsDevicesPage.getGridRow(1).element(by.css('td:nth-child(8)'))));
          browser.wait(testUtils.until.elementToBeClickable(amsDevicesPage.getGridRow(1).element(by.css('td:nth-child(8)'))));
          browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.k-grid-content table tr:nth-child(1) td:nth-child(8)', '' + sk_array[0]))));
          browser.wait(testUtils.until.elementToBeClickable(element(by.cssContainingText('.k-grid-content table tr:nth-child(1) td:nth-child(8)', '' + sk_array[0]))));
        });
        it('should be have company name', function() {
          expect(amsDevicesPage.getGridRow(1).element(by.css('td:nth-child(8)')).getText()).toContain(sk_array[0]);
        });
      });
      describe('when second imei filtered', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.stalenessOf(amsDevicesPage.getLoadingMask()));
          browser.wait(testUtils.until.visibilityOf(amsDevicesPage.getImeiFilterClearBtn()));
          browser.wait(testUtils.until.elementToBeClickable(amsDevicesPage.getImeiFilterClearBtn()));
          amsDevicesPage.clickImeiFilterClearBtn();
          amsDevicesPage.clickImeiFilter();
          amsDevicesPage.fillImeiFilter(imei2);
          amsDevicesPage.fillImeiFilter(protractor.Key.ENTER);
          browser.wait(testUtils.until.presenceOf(amsDevicesPage.getAllGridRow()));
          browser.wait(function() {
            return amsDevicesPage.getAllGridRow().count().then(function(count) {
              return count == 1;
            });
          });
          browser.wait(testUtils.until.presenceOf(amsDevicesPage.getGridRow(1).element(by.css('td:nth-child(14) a.fi-pencil.editDevice'))));
          browser.wait(testUtils.until.elementToBeClickable(amsDevicesPage.getGridRow(1).element(by.css('td:nth-child(14) a.fi-pencil.editDevice'))));
          amsDevicesPage.getGridRow(1).element(by.css('td:nth-child(14) a.editDevice')).click();
          browser.wait(testUtils.until.presenceOf(amsDevicesPage.getDevicesCreationForm()));
          browser.wait(testUtils.until.elementToBeClickable(amsDevicesPage.getLinkedCompany()));
          amsDevicesPage.clickLinkedCompany();
          browser.wait(testUtils.until.presenceOf(amsDevicesPage.getLinkedCompanyFilter()));
          browser.wait(testUtils.until.elementToBeClickable(amsDevicesPage.getLinkedCompanyFilter()));
          amsDevicesPage.clickLinkedCompanyFilter();
          amsDevicesPage.fillLinkedCompanyFilter(sk_array[0]);
          browser.wait(testUtils.until.presenceOf(element.all(by.css('.k-animation-container .k-list-scroller ul[aria-hidden="false"] li'))));
          browser.wait(function() {
            return element.all(by.css('ul[aria-hidden="false"] li')).count().then(function(count) {
              return count == 1;
            });
          },20000,"Can not load linked company name "+sk_array[0]);
          // browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.k-animation-container .k-list-scroller ul[aria-hidden="false"] li:nth-child(1)',""+sk_array[0]))));
          element(by.css('ul[aria-hidden="false"] li:nth-child(1)')).click();
          browser.wait(testUtils.until.stalenessOf(element(by.css('ul[aria-hidden="false"] li'))));
          browser.wait(function() {
            return amsDevicesPage.getLinkedCompany().element(by.css('span:nth-child(1).k-input')).getText().then(function(txt) {
              return txt.includes(sk_array[0]) == true;
            });
          });
          amsDevicesPage.clickSaveButton();
          browser.waitForAngular();
          browser.wait(testUtils.until.stalenessOf(amsDevicesPage.getDevicesCreateModal()));
          browser.wait(testUtils.until.stalenessOf(amsDevicesPage.getLoadingMask()));
          browser.wait(testUtils.until.presenceOf(amsDevicesPage.getGridRow(1)));
          browser.wait(testUtils.until.presenceOf(amsDevicesPage.getGridRow(1).element(by.css('td:nth-child(8)'))));
          browser.wait(testUtils.until.elementToBeClickable(amsDevicesPage.getGridRow(1).element(by.css('td:nth-child(8)'))));
          browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.k-grid-content table tr:nth-child(1) td:nth-child(8)', '' + sk_array[0]))));
          browser.wait(testUtils.until.elementToBeClickable(element(by.cssContainingText('.k-grid-content table tr:nth-child(1) td:nth-child(8)', '' + sk_array[0]))));
        });
        it('should have company name', function() {
          expect(amsDevicesPage.getGridRow(1).element(by.css('td:nth-child(8)')).getText()).toContain(sk_array[0]);
        });
      });
    });
    describe('on accounts tab ', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.elementToBeClickable(amsMainPage.getAccountsTab()));
        amsMainPage.clickAccountsViewTab();
        browser.wait(testUtils.until.presenceOf(amsMainPage.getAccountsView()));
        browser.wait(testUtils.until.elementToBeClickable(amsAccountsViewPage.getCompanyNameFilter()));
        amsAccountsViewPage.clickCompanyNameFilter();
        amsAccountsViewPage.fillCompanyNameFilter(sk_array[0] + "");
        amsAccountsViewPage.fillCompanyNameFilter(protractor.Key.ENTER);
        amsAccountsViewPage.clickCompanyNameHeader();
        browser.wait(testUtils.until.presenceOf(amsAccountsViewPage.getCompanyNameSortAsc()));
        amsAccountsViewPage.clickCompanyNameHeader();
        browser.wait(testUtils.until.presenceOf(amsAccountsViewPage.getCompanyNameSortDesc()));
        browser.wait(testUtils.until.stalenessOf(amsAccountsViewPage.getLoadingMask()));
        browser.wait(testUtils.until.visibilityOf(amsAccountsViewPage.getGridRow(1).element(by.css('tr td:nth-child(1) b'))));
        browser.wait(function() {
          return amsAccountsViewPage.getGridRow(1).element(by.css('tr td:nth-child(1) b')).getText().then(function(text) {
            return text.includes(sk_array[0]) == true;
          });
        });
      });
      it('should have newest starterkid account', function() {
        expect(amsAccountsViewPage.getGridRow(1).element(by.css('tr td:nth-child(1) b')).getText()).toBe(sk_array[0]);
      });
      describe('when exported starterkid', function() {
        beforeAll(function() {
          pathFolder = process.cwd() + "/resources/test/export_file";
          pdfPath = pathFolder + "/*.pdf";
          try {
            files = fs.readdirSync(pathFolder);
            for (var i = 0; i < files.length; i++) {
              if (fs.statSync(pathFolder + "/" + files[i]).isFile()) {
                fs.unlinkSync(pathFolder + "/" + files[i]);
              }
            }
            browser.wait(testUtils.until.elementToBeClickable(amsAccountsViewPage.getGridRow(1).element(by.css('tr td:nth-child(13) a.fi-file-pdf.getPDF'))));
            amsAccountsViewPage.getGridRow(1).element(by.css('tr td:nth-child(13) a.fi-file-pdf.getPDF')).click();
            browser.driver.wait(function() {
              filesArray = glob.sync(pathFolder + "/*.pdf");
              if ((typeof filesArray != 'undefined') && (filesArray.length > 0)) {
                return filesArray;
              }
            }).then(function(arr) {
              pdfPath = arr[0];
            });
          } catch (e) {
            return console.error(e);
          }
        });
        it("file should be in download directory ", function() {
          expect(fs.existsSync(pdfPath)).toBe(true);
        });
        describe('in active pdf', function() {
          beforeAll(function() {
            pathFolder = process.cwd() + "/resources/test/export_file";
            files = fs.readdirSync(pathFolder);
            pdfPath = pathFolder + "/" + files[0];
            loadingTask = pdfjsLib.getDocument(pdfPath);
            loadPage =
              loadingTask.promise.then(function(doc) {
                return doc.getPage(1).then(function(page) {
                  return page
                    .getTextContent()
                    .then(function(content) {
                      var items = content.items;
                      var temp_arr = [];
                      for (var i = items.length - 1; i >= 0; i--) {
                        if (items[i].str.includes("Mot de passe:") == true) {
                          temp_arr.push(items[i - 1].str);
                          temp_arr.push(items[i + 1].str);
                          break;
                        }
                      }
                      return temp_arr;
                    });
                });
              });
          });
          afterAll(function() {
            browser.wait(testUtils.until.elementToBeClickable(amsMainPage.getLogoutButton()));
            amsMainPage.clickLogout();
            browser.wait(testUtils.until.stalenessOf(amsMainPage.getAccountsView()));
            browser.wait(testUtils.until.stalenessOf(element(by.css('.ams-module'))));
          });
          it('should have user', function() {
            loadPage.then(function(data) {
              expect(data[0]).not.toBe(null);
            });
          });
          it('should have password', function() {
            loadPage.then(function(data) {
              expect(data[1]).not.toBe(null);
            });
          });
        });
      });
    });
    describe('when starterkid account started to active', function() {
      beforeAll(function() {
        browser.wait(testUtils.until.presenceOf(element(by.css('.login-view'))));
        browser.wait(testUtils.until.presenceOf(loginPage.getUserInput()));
        browser.wait(testUtils.until.presenceOf(loginPage.getPasswordInput()));
        browser.wait(testUtils.until.presenceOf(loginPage.getLoginButton()));
        loadPage.then(function(data) {
          loginPage.setUserInput(data[0]);
          loginPage.setPasswordInput(data[1]);
          browser.wait(testUtils.until.elementToBeClickable(loginPage.getLoginButton()));
          loginPage.clickLogin();
        });
        browser.wait(testUtils.waitUrl(/tracking/));
        browser.wait(testUtils.until.stalenessOf(mainPage.getLoaderOverlay()), 30000, "loader spinner startterkid after login");
      });
      describe('in step 1', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(loginPage.getUserInput()));
          browser.wait(testUtils.until.elementToBeClickable(loginPage.getPasswordInput()));
          loadPage.then(function(data) {
            loginPage.setUserInput(data[0]);
            loginPage.setPasswordInput(data[1]);
            loginPage.clickLogin();
          });
          browser.wait(testUtils.waitUrl(/tracking/),3000,"c5");
          browser.wait(testUtils.until.stalenessOf(mainPage.getLoaderOverlay()));
          browser.wait(testUtils.until.presenceOf(amsStarterKidPage.getStarterkidConfigurePanel()),3000,"c1");
          browser.wait(testUtils.until.presenceOf(amsStarterKidPage.getConfigureContainer()),3000,"c12");
          browser.wait(testUtils.until.presenceOf(amsStarterKidPage.getLanguageEN()),3000,"c2");
          // browser.wait(testUtils.until.presenceOf(mainPage.getTrackingView()));
          browser.wait(testUtils.until.presenceOf(amsStarterKidPage.getStep1Start()),3000,"c");

          browser.wait(testUtils.until.presenceOf(element(by.cssContainingText('.starter-kit-configure-container .configure-container .step-1 div.cell:nth-child(4) .language .language-text',"Welcome on Logifleet 360°! Please click here to start in English."))),3000,"English text");
          amsStarterKidPage.getLanguageEN().element(by.css('.language-text')).getText().then(function(txt){
            console.log("****************"+txt);
          });
          browser.wait(function(){
            return amsStarterKidPage.getLanguageEN().getAttribute("ng-click").then(function(txt){
              console.log(txt);
              return txt == "selectLanguage('en-EN')";
            });
          });
        });
        it('should have language EN', function() {
          expect(amsStarterKidPage.getLanguageEN().isPresent()).toBe(true);
        });
        it('should have language DE', function() {
          expect(amsStarterKidPage.getLanguageDE().isPresent()).toBe(true);
        });
        it('should have language FR', function() {
          expect(amsStarterKidPage.getLanguageFR().isPresent()).toBe(true);
        });
        it('should have language IT', function() {
          expect(amsStarterKidPage.getLanguageIT().isPresent()).toBe(true);
        });
        it('should have start button', function() {
          expect(amsStarterKidPage.getStep1Start().isPresent()).toBe(true);
        });
      });
      describe('in step 2', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(amsStarterKidPage.getLanguageEN().element(by.css("img"))), 5000, "click en wait");
          amsStarterKidPage.getLanguageEN().element(by.css('img')).click();
          browser.wait(testUtils.until.elementToBeClickable(amsStarterKidPage.getStep1Start()), 5000, "not clickable start 1");
          amsStarterKidPage.clickStep1Start();
          browser.wait(testUtils.until.presenceOf(amsStarterKidPage.getStep2Next()));
        });
        it('should have next button', function() {
          expect(amsStarterKidPage.getStep2Next().isPresent()).toBe(true);
        });
        it('should have configure header', function() {
          expect(amsStarterKidPage.getConfigureHeader().element(by.css('span')).isPresent()).toBe(true);
        });
        it('should have top text', function() {
          expect(amsStarterKidPage.getConfigureContainer().element(by.css('div:nth-child(1).cell span')).isPresent()).toBe(true);
        });
        it('should have video', function() {
          expect(amsStarterKidPage.getConfigureContainer().element(by.css('div:nth-child(2).cell iframe')).isPresent()).toBe(true);
        });
        it('should have bot text', function() {
          expect(amsStarterKidPage.getConfigureContainer().element(by.css('div:nth-child(3).cell span')).isPresent()).toBe(true);
        });
      });
      describe('in step 3', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(amsStarterKidPage.getStep2Next()));
          amsStarterKidPage.clickStep2Next();
          browser.wait(testUtils.until.presenceOf(amsStarterKidPage.getPersonCreationForm()));
        });
        it('should have configure header', function() {
          expect(amsStarterKidPage.getConfigureHeader().element(by.css('span')).isPresent()).toBe(true);
        });
        it('should have person title label', function() {
          expect(amsStarterKidPage.getPersonTitleLabel().isPresent()).toBe(true);
        });
        it('should have person title warning', function() {
          expect(amsStarterKidPage.getPersonTitleWarning().isDisplayed()).toBe(true);
        });
        it('should have person title selector', function() {
          expect(amsStarterKidPage.getPersonTitleSelector().isPresent()).toBe(true);
        });
        it('should have first name label', function() {
          expect(amsStarterKidPage.getFirstNameLabel().isPresent()).toBe(true);
        });
        it('should have first name warning', function() {
          expect(amsStarterKidPage.getFirstNameWarning().isDisplayed()).toBe(true);
        });
        it('should have first name input', function() {
          expect(amsStarterKidPage.getFirstNameInput().isPresent()).toBe(true);
        });
        it('should have last name label', function() {
          expect(amsStarterKidPage.getLastNameLabel().isPresent()).toBe(true);
        });
        it('should have last name warning', function() {
          expect(amsStarterKidPage.getLastNameWarning().isDisplayed()).toBe(true);
        });
        it('should have last name input', function() {
          expect(amsStarterKidPage.getLastnameInput().isPresent()).toBe(true);
        });
        it('should have phone label', function() {
          expect(amsStarterKidPage.getPhoneLabel().isPresent()).toBe(true);
        });
        it('should have phone warning', function() {
          expect(amsStarterKidPage.getPhoneWarning().isDisplayed()).toBe(true);
        });
        it('should have phone input', function() {
          expect(amsStarterKidPage.getPhoneInput().isPresent()).toBe(true);
        });
        it('should have login label', function() {
          expect(amsStarterKidPage.getLoginLabel().isPresent()).toBe(true);
        });
        it('should have login warning', function() {
          expect(amsStarterKidPage.getLoginWarning().isDisplayed()).toBe(true);
        });
        it('should have login input', function() {
          expect(amsStarterKidPage.getLoginInput().isPresent()).toBe(true);
        });
        it('should have password label', function() {
          expect(amsStarterKidPage.getPasswordLabel().isPresent()).toBe(true);
        });
        it('should have password input', function() {
          expect(amsStarterKidPage.getPasswordInput().isPresent()).toBe(true);
        });
        it('should have confirm password label', function() {
          expect(amsStarterKidPage.getConfirmPasswordLabel().isPresent()).toBe(true);
        });
        it('should have confirm password warning', function() {
          expect(amsStarterKidPage.getConfirmPasswordWarning().isDisplayed()).toBe(true);
        });
        it('should have confirm password input', function() {
          expect(amsStarterKidPage.getConfirmPasswordInput().isPresent()).toBe(true);
        });
        it('should have company label', function() {
          expect(amsStarterKidPage.getCompanyLabel().isPresent()).toBe(true);
        });
        it('should have company warning', function() {
          expect(amsStarterKidPage.getCompanyWarning().isDisplayed()).toBe(true);
        });
        it('should have company input', function() {
          expect(amsStarterKidPage.getCompanyInput().isPresent()).toBe(true);
        });
        it('should have street label', function() {
          expect(amsStarterKidPage.getStreetLabel().isPresent()).toBe(true);
        });
        it('should have street warning', function() {
          expect(amsStarterKidPage.getStreetWarning().isDisplayed()).toBe(true);
        });
        it('should have street input', function() {
          expect(amsStarterKidPage.getStreetInput().isPresent()).toBe(true);
        });
        it('should have zipcode label', function() {
          expect(amsStarterKidPage.getZipCodeCityLabel().isPresent()).toBe(true);
        });
        it('should have zipcode warning', function() {
          expect(amsStarterKidPage.getZipCodeCityWarning().isDisplayed()).toBe(true);
        });
        it('should have zipcode input', function() {
          expect(amsStarterKidPage.getZipcodeInput().isPresent()).toBe(true);
        });
        it('should have city input', function() {
          expect(amsStarterKidPage.getCityInput().isPresent()).toBe(true);
        });
        it('should have country label', function() {
          expect(amsStarterKidPage.getCountryLabel().isPresent()).toBe(true);
        });
        it('should have country selector', function() {
          expect(amsStarterKidPage.getCountrySelector().isPresent()).toBe(true);
        });
        describe("when user's settings filled", function() {
          beforeAll(function() {
            amsStarterKidPage.selectTitle();
            amsStarterKidPage.fillLastName('nobel');
            amsStarterKidPage.fillFirstName('alex');
            amsStarterKidPage.fillPhone('0353221074');
            amsStarterKidPage.fillLogin('alexnobel' + random_number + '@gmail.com');
            amsStarterKidPage.fillPassword('alex_nobel');
            amsStarterKidPage.fillConfirmPassword('alex_nobel');
            amsStarterKidPage.fillCompany('Bitnemo');
            amsStarterKidPage.fillStreet('Khuc Thua Du');
            amsStarterKidPage.fillZipCode(10000);
            amsStarterKidPage.fillCity('Hanoi');
            amsStarterKidPage.selectCountry();
          });
          it('should not have first name warning', function() {
            expect(amsStarterKidPage.getFirstNameWarning().getAttribute('class')).toContain('ng-hide');
          });
          it('should not have last name warning', function() {
            expect(amsStarterKidPage.getLastNameWarning().getAttribute('class')).toContain('ng-hide');
          });
          it('should not have phone warning', function() {
            expect(amsStarterKidPage.getPhoneWarning().getAttribute('class')).toContain('ng-hide');
          });
          it('should not have login warning', function() {
            expect(amsStarterKidPage.getLoginWarning().getAttribute('class')).toContain('ng-hide');
          });
          it('should not have password warning', function() {
            expect(amsStarterKidPage.getPasswordWarning().getAttribute('class')).toContain('ng-hide');
          });
          it('should not have confirm password warning', function() {
            expect(amsStarterKidPage.getConfirmPasswordWarning().getAttribute('class')).toContain('ng-hide');
          });
          it('should not have company warning', function() {
            expect(amsStarterKidPage.getCompanyWarning().getAttribute('class')).toContain('ng-hide');
          });
          it('should not have street warning', function() {
            expect(amsStarterKidPage.getStreetWarning().getAttribute('class')).toContain('ng-hide');
          });
          it('should not have zipcode city warning', function() {
            expect(amsStarterKidPage.getZipCodeCityWarning().getAttribute('class')).toContain('ng-hide');
          });
        });
      });
      describe('in step 4', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(amsStarterKidPage.getStep3SaveNext()));
          amsStarterKidPage.clickStep3SaveNext();
          browser.wait(testUtils.until.presenceOf(amsStarterKidPage.getVehicleUpdateForm()));
        });
        it('should have hello name', function() {
          expect(amsStarterKidPage.getHelloName().getText()).toContain("alex");
        });
        it('should have configure header', function() {
          expect(amsStarterKidPage.getConfigureHeader().isPresent()).toBe(true);
        });
        it('should have step 4 text', function() {
          expect(amsStarterKidPage.getStep4Text().isPresent()).toBe(true);
        });
        it('should have geobox number 1 label', function() {
          expect(amsStarterKidPage.getGeobox1Label().isPresent()).toBe(true);
        });
        it('should have vehicle 1 label', function() {
          expect(amsStarterKidPage.getVehicle1Label().isPresent()).toBe(true);
        });
        it('should have vehicle 1 warning', function() {
          expect(amsStarterKidPage.getVehicle1Warning().isDisplayed()).toBe(true);
        });
        it('should have vehicle 1 input', function() {
          expect(amsStarterKidPage.getVehicle1Input().isPresent()).toBe(true);
        });
        it('should have vehicle 1 mileage label', function() {
          expect(amsStarterKidPage.getVehicle1MileageLabel().isPresent()).toBe(true);
        });
        it('should have vehicle 1 mileage', function() {
          expect(amsStarterKidPage.getVehicle1MileageInput().isPresent()).toBe(true);
        });
        it('should have vehicle 1 image label', function() {
          expect(amsStarterKidPage.getVehicle1ImageLabel().isPresent()).toBe(true);
        });
        it('should have vehicle 1 image warning', function() {
          expect(amsStarterKidPage.getVehicle1ImageWarning().isDisplayed()).toBe(true);
        });
        it('should have vehicle 1 image selector', function() {
          expect(amsStarterKidPage.getVehicle1ImageSelector().isPresent()).toBe(true);
        });

        it('should have geobox number 2 label', function() {
          expect(amsStarterKidPage.getGeobox2Label().isPresent()).toBe(true);
        });
        it('should have vehicle 2 label', function() {
          expect(amsStarterKidPage.getVehicle2Label().isPresent()).toBe(true);
        });
        it('should have vehicle 2 warning', function() {
          expect(amsStarterKidPage.getVehicle2Warning().isDisplayed()).toBe(true);
        });
        it('should have vehicle 2 input', function() {
          expect(amsStarterKidPage.getVehicle2Input().isPresent()).toBe(true);
        });
        it('should have vehicle 2 mileage label', function() {
          expect(amsStarterKidPage.getVehicle2MileageLabel().isPresent()).toBe(true);
        });
        it('should have vehicle 2 mileage', function() {
          expect(amsStarterKidPage.getVehicle2MileageInput().isPresent()).toBe(true);
        });

        it('should have vehicle 2 image label', function() {
          expect(amsStarterKidPage.getVehicle2ImageLabel().isPresent()).toBe(true);
        });
        it('should have vehicle 2 image warning', function() {
          expect(amsStarterKidPage.getVehicle2ImageWarning().isDisplayed()).toBe(true);
        });
        it('should have vehicle 2 image selector', function() {
          expect(amsStarterKidPage.getVehicle2ImageSelector().isPresent()).toBe(true);
        });
        describe('when fields filled', function() {
          beforeAll(function() {
            amsStarterKidPage.fillVehicle1Name('vehicle1');
            amsStarterKidPage.fillVehicle1MileageInput(10);
            amsStarterKidPage.selectVehicle1Image();
            amsStarterKidPage.fillVehicle2Name('vehicle2');
            amsStarterKidPage.fillVehicle2MileageInput(10);
            amsStarterKidPage.selectVehicle2Image();
          });
          it('vehicle 1 name warning should not display', function() {
            expect(amsStarterKidPage.getVehicle1Warning().isDisplayed()).toBe(false);
          });
          it('vehicle 1 image warning should not display', function() {
            expect(amsStarterKidPage.getVehicle1ImageWarning().isDisplayed()).toBe(false);
          });
          it('vehicle 2 name warning should not display', function() {
            expect(amsStarterKidPage.getVehicle2Warning().isDisplayed()).toBe(false);
          });
          it('vehicle 2 image warning should not display', function() {
            expect(amsStarterKidPage.getVehicle2ImageWarning().isDisplayed()).toBe(false);
          });
        });
      });
      describe('in step 5', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(amsStarterKidPage.getStep4SaveAndNext()));
          amsStarterKidPage.clickStep4SaveAndNext();
          browser.wait(testUtils.until.presenceOf(amsStarterKidPage.getStep5StartBtn()));
        });
        it('should have step 5 text left', function() {
          expect(amsStarterKidPage.getStep5TextLeft().isPresent()).toBe(true);
        });
        it('should have step 5 video', function() {
          expect(amsStarterKidPage.getStep5Video().isPresent()).toBe(true);
        });
        it('should have step 5 start btn', function() {
          expect(amsStarterKidPage.getStep5StartBtn().isPresent()).toBe(true);
        });
      });
      describe('in release notes', function() {
        beforeAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(amsStarterKidPage.getStep5StartBtn()));
          amsStarterKidPage.clickStep5StartBtn();
          browser.wait(testUtils.until.stalenessOf(mainPage.getLoaderSpinner()));
          browser.wait(testUtils.until.presenceOf(amsStarterKidPage.getReleaseNoteContainer()));
        });
        afterAll(function() {
          browser.wait(testUtils.until.elementToBeClickable(amsStarterKidPage.getReleaseNotesOKButton()));
          amsStarterKidPage.clickReleaseNotesOkButton();
          browser.wait(testUtils.until.stalenessOf(amsStarterKidPage.getReleaseNoteContainer()));
          browser.wait(testUtils.until.visibilityOf(mainPage.getTrackingView()));
          browser.wait(testUtils.until.elementToBeClickable(mainPage.getLogoutButton()));
          mainPage.clickLogout();
          browser.wait(testUtils.until.presenceOf(loginPage.getLoginButton()));
          browser.wait(testUtils.until.elementToBeClickable(loginPage.getUserInput()));
          browser.wait(testUtils.until.elementToBeClickable(loginPage.getPasswordInput()));
          loginPage.setUserInput('test-user');
          loginPage.setPasswordInput('password');
          loginPage.clickLogin();
          browser.wait(testUtils.waitUrl(/accounts/));
          browser.wait(testUtils.until.stalenessOf(amsMainPage.getLoadingMask()));
        });
        it('should have release notes header', function() {
          expect(amsStarterKidPage.getReleaseNotesHeader().isPresent()).toBe(true);
        });
        it('should have release notes like button', function() {
          expect(amsStarterKidPage.getReleaseNotesLikeBtn().isPresent()).toBe(true);
        });
        it('should have release notes dislike button', function() {
          expect(amsStarterKidPage.getReleaseNotesDislikeBtn().isPresent()).toBe(true);
        });
        it('should have release notes ok button', function() {
          expect(amsStarterKidPage.getReleaseNotesDislikeBtn().isPresent()).toBe(true);
        });
      });
    });
  });
})();
