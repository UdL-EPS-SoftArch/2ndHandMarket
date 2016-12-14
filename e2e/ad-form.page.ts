import { element, by, protractor, ElementArrayFinder } from 'protractor';
import Promise = webdriver.promise.Promise;

export class AdvertisementFormPage {

  private form;
  private titleInput;
  private priceInput;
  private publishButton;

  constructor() {
    this.form = element(by.css('section.postAdvertisement form'));
    this.titleInput = element(by.id('inputTitle'));
    this.priceInput = element(by.id('inputPrice'));
    this.publishButton = this.form.element(by.tagName('button'));
  }

  getTitle(): Promise<string> {
    return this.titleInput.getText();
  }

  getPrice(): Promise<string> {
    return this.priceInput.getText();
  }

  setTitle(value: string): Promise<void> {
    return this.titleInput.clear().sendKeys(value);
  }

  setPrice(value: number): Promise<void> {
    return this.priceInput.clear().sendKeys(value);
  }

  submitForm(): Promise<void> {
    return this.publishButton.click();
  }
}
