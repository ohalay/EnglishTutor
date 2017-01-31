import { EnglishTutorPage } from './app.po';

describe('english-tutor App', function() {
  let page: EnglishTutorPage;

  beforeEach(() => {
    page = new EnglishTutorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
