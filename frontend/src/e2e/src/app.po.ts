import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo = () => browser.get(browser.baseUrl);

  getTitleText = () => element(by.css('app-root .content span'))
    .getText();
}
