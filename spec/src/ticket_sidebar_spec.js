// import client from '../../src/javascripts/zafClient';
import TicketSidebar from '../../src/javascripts/ticket_sidebar';

/**
 * TODO: implement unit/snapshot tests
 */

describe('TicketSidebar', () => {
  let app;

  beforeEach(() => {
    app = new TicketSidebar({ metadata: {}, context: {} });
  });

  describe('#renderMain', () => {
    beforeEach(() => {
      // spyOn(app.view, 'switchTo');
    });

    it('switches to the main template', () => {
      // var data = { user: 'Mikkel' };
      // app.renderMain(data);
      // expect(app.view.switchTo).toHaveBeenCalledWith('main', data.user);
    });
  });
});
