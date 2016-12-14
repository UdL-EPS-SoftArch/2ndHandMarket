import { element, by } from 'protractor';
import Promise = webdriver.promise.Promise;

export class NavigationBar {

  private myaccount;
  private signin;
  private home;
  private publishButton;

  constructor() {
    this.myaccount = element(by.id('myaccount'));
    this.signin = element(by.id('signin'));
    this.home = element(by.id('home'));
  }

  clickMyAccount(): Promise<string> {
    return this.myaccount.click();
  }

  clickSignin(): Promise<string> {
    return this.signin.click();
  }

  goToHome(): Promise<void> {
    return this.home.click();
  }
}
