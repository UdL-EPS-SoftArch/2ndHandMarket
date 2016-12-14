import { binding, given, when, then } from 'cucumber-tsflow';
import { browser, element, by } from 'protractor';
import { AdvertisementFormPage } from "../../ad-form.page";

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

@binding()
class ListAdsSteps {

  @given(/^I sign in as "([^"]*)" with password "([^"]*)"$/)
  public iSignInAsWithPassword (username: string, password: string, callback): void {
    browser.get('http://localhost:4200');
    element(by.id('myaccount')).click();
    element(by.id('signin')).click();

    let loginForm = element(by.css('form.form-signin'));
    element(by.id('username')).sendKeys(username);
    element(by.id('password')).sendKeys(password);
    loginForm.element(by.tagName('button')).click();
    browser.waitForAngular();
    callback();
  }

  @when(/^I create an advertisement with title "([^"]*)" and price (\d+)$/)
  public createAdWithTitleAndPrice (title: string, price: number, callback): void {
    element(by.linkText('Create one')).click();
    let adForm = new AdvertisementFormPage();
    adForm.setTitle(title);
    adForm.setPrice(price);
    adForm.submitForm();
    browser.waitForAngular();
    callback();
  }

  @when(/^I list all available advertisements$/)
  public iListAllAvailableAds(callback): void {
    browser.get('http://localhost:4200/advertisements');
    callback();
  };

  @when(/^I go back to home$/)
  public iGoBackToHome(callback): void {
    element(by.id('home')).click();
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
