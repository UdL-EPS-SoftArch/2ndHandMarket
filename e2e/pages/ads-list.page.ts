import {element, by, ElementArrayFinder, ElementFinder} from 'protractor';
import Promise = webdriver.promise.Promise;

export class AdvertisementsListPage {

  private advertisements: ElementArrayFinder;

  constructor() {
    this.advertisements = this.getAdvertisements();
  }

  getAdvertisements(): ElementArrayFinder {
    return element.all(by.css('div.card-container'));
  }

  getAdvertisementInPosition(position: number): ElementFinder {
    return this.advertisements.get(position - 1);
  }

  clickAdInPosition(position: number): Promise<void> {
    let ad = this.getAdvertisementInPosition(position);
    return ad.element(by.css('a.buy')).click();
  }

  getAdvertisementsCount(): Promise<number> {
    return this.advertisements.count();
  }
}
