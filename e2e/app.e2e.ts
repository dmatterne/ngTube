import { NgtubePage } from './app.po';

describe('ngtube App', function() {
  let page: NgtubePage;

  beforeEach(() => {
    page = new NgtubePage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ngtube works!');
  });
});
