import React from 'react';
import ReactDOM from 'react-dom';
import { client } from './index';
import View from 'view';
import Storage from 'storage';

import SearchArticles from './components/SearchArticles';

const MAX_HEIGHT = 375;

class TicketSidebar {
  constructor(data) {
    this._metadata = data.metadata;
    this._context = data.context;

    this.storage = new Storage(this._metadata.installationId);
    this.view = new View({ afterRender: () => {
      let newHeight = Math.min($('html').height(), MAX_HEIGHT);
      client.invoke('resize', { height: newHeight, width: '100%' });
    }});

    // this.getCurrentUser().then(this.renderMain.bind(this));

    this.view.switchTo('main');

    ReactDOM.render(
      <SearchArticles />,
      document.getElementById('app-container')
    );
  }

  // getCurrentUser() {
  //   return client.request({ url: '/api/v2/users/me.json' });
  // }

  // renderMain(data) {
  //   this.view.switchTo('main', data.user);
  // }
}

export default TicketSidebar;
