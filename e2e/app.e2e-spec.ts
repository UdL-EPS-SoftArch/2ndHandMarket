import { Softarch1617ClientPage } from './app.po';

describe('softarch-1617-client App', function() {
  let page: Softarch1617ClientPage;

  beforeEach(() => {
    page = new Softarch1617ClientPage();
  });

  it('should display about message in main page', () => {
    page.navigateTo('/');
    expect(page.getParagraphText()).toEqual('About');
  });
});
