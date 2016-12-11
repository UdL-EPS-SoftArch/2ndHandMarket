import {binding, given, when, then} from 'cucumber-tsflow';
import {browser, element, by} from 'protractor';

@binding()
class ListAdsSteps {

  @when(/^I list all available advertisements$/)
  private iListAllAvailableAds(): void {
    browser.get('http://localhost:4200');
  };

  @then(/^I see (\d+) advertisements$/)
  private iSeeAds(count: number): void {
    //browser.waitForExist('section.advertisement div.row');
    expect(browser.findElements('section.advertisement div.row div.card-container'))
      .toBe(count);
  };
}

export = ListAdsSteps;
