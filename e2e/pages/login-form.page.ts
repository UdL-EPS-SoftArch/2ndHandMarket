import { element, by } from 'protractor';
import Promise = webdriver.promise.Promise;

export class LoginForm {

  private form;
  private usernameInput;
  private passwordInput;

  constructor() {
    this.form = element(by.css('form.form-signin'));
    this.usernameInput = element(by.id('username'));
    this.passwordInput = element(by.id('password'));
  }

  typeUsername(username: string): Promise<string> {
    return this.usernameInput.sendKeys(username);
  }

  typePassword(password: string): Promise<string> {
    return this.passwordInput.sendKeys(password);
  }

  submitForm(): Promise<void> {
    return this.form.submit();
  }
}
