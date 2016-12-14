import { binding, given, when, then } from 'cucumber-tsflow';
import { browser, element, by } from 'protractor';
import { AdvertisementFormPage } from '../../ad-form.page';
import { NavigationBar } from '../../navbar.page';
import { LoginForm } from '../../login-form.page';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

@binding()
class ListAdsSteps {
  private adForm = new AdvertisementFormPage();
  private navBar = new NavigationBar();
  private loginForm = new LoginForm();

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

  @then(/^I see (\d+) advertisements$/)
  public iSeeAds(count: string, callback): void {
    expect(element.all(by.css('div.card-container')).count())
      .to.eventually.equal(parseInt(count)).and.notify(callback);
  };
}

export = ListAdsSteps;
