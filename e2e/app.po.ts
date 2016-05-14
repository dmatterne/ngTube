export class NgtubePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ngtube-app h1')).getText();
  }
}
