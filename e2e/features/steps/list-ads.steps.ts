import { binding, given, when, then } from 'cucumber-tsflow';
import { browser, element, by } from 'protractor';
import { AdvertisementFormPage } from '../../pages/ad-form.page';
import { NavigationBar } from '../../pages/navbar.page';
import { LoginForm } from '../../pages/login-form.page';
import { AdvertisementsListPage } from '../../pages/ads-list.page';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

@binding()
class ListAdsSteps {
  private adForm = new AdvertisementFormPage();
  private navBar = new NavigationBar();
  private loginForm = new LoginForm();
  private adsList = new AdvertisementsListPage();

  @given(/^I'm in the home page$/)
  public iMInHomePage(callback): void {
    browser.get('http://localhost:4200');
    callback();
  };

  @given(/^I sign in as "([^"]*)" with password "([^"]*)"$/)
  public iSignInAsWithPassword (username: string, password: string, callback): void {
    this.navBar.clickMyAccount();
    this.navBar.clickSignin();
    this.loginForm.typeUsername(username);
    this.loginForm.typePassword(password);
    this.loginForm.submitForm();
    browser.waitForAngular();
    callback();
  };

  @given(/^I'm signed in as "([^"]*)"$/)
  public iMSignedInAs (username: string, callback): void {
    let currentUser = this.navBar.getCurrentUser();
    expect(currentUser)
      .to.eventually.equal(username.toUpperCase()).and.notify(callback);
  }

  @when(/^I create an advertisement with title "([^"]*)" and price (\d+)$/)
  public createAdWithTitleAndPrice (title: string, price: number, callback): void {
    element(by.linkText('Create one')).click();
    this.adForm.setTitle(title);
    this.adForm.setPrice(price);
    this.adForm.submitForm();
    browser.waitForAngular();
    callback();
  };

  @when(/^I go back to home$/)
  public iGoBackToHome(callback): void {
    this.navBar.goToHome();
    browser.waitForAngular();
    callback();
  };

  @when(/^I browse details for advertisement listed in position (\d+)$/)
  public iBroseDetailsForAdListesInPosition (position: number, callback): void {
    this.adsList.clickAdInPosition(position);
    browser.waitForAngular();
    callback();
  }

  @when(/^I delete the advertisement$/)
  public iDeleteTheAd (callback): void {
    element(by.css('a.deleteButton')).click();
    browser.waitForAngular();
    callback();
  }

  @then(/^I see (\d+) advertisements$/)
  public iSeeAds(count: string, callback): void {
    expect(this.adsList.getAdvertisementsCount())
      .to.eventually.equal(parseInt(count, 10)).and.notify(callback);
  };
}

export = ListAdsSteps;
