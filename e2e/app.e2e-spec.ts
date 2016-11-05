import { EzUpdatePage } from './app.po';

describe('ez-update App', function() {
  let page: EzUpdatePage;

  beforeEach(() => {
    page = new EzUpdatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
