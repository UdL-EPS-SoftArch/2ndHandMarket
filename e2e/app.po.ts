import { browser, element, by } from 'protractor';

export class Softarch1617ClientPage {
  navigateTo(uri: string) {
    return browser.get(uri);
  }

  getParagraphText() {
    return element(by.css('app-intro div h1')).getText();
  }
}
